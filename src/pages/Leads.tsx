import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp } from 'lucide-react';

function getDayOfWeek(dateString: string) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateString).getDay()];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded shadow border border-primary-100">
        <p className="font-semibold text-primary-500">{label}</p>
        <p className="text-sm">Leads: <span className="font-bold text-accent-orange">{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

const Leads: React.FC = () => {
  const [dailyLeads, setDailyLeads] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const employeeId = user?.employeeId;
  const month = new Date().toISOString().slice(0, 7); // e.g., "2025-07"

  useEffect(() => {
    if (!employeeId) return;

    fetch(`https://leadinfo.site/employee/get_reports_by_day.php?month=${month}&employeeId=${employeeId}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          setDailyLeads(json.data);
        }
      });
  }, [employeeId, month]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-accent-orange w-7 h-7" /> Leads
      </h1>

      {/* Month-wise Area Chart */}
      <div className="mb-8 bg-gradient-to-br from-primary-50 via-accent-orange/10 to-white p-6 rounded-2xl shadow-lg border border-primary-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary-700">
          <TrendingUp className="w-5 h-5 text-accent-orange" /> Day-wise Leads (This Month)
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={dailyLeads} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeadsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.25} />
                <stop offset="50%" stopColor="#ff7c2b" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#1fa2ff" stopOpacity={0.08} />
              </linearGradient>
              <linearGradient id="colorLeadsLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#ff7c2b" />
                <stop offset="100%" stopColor="#1fa2ff" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#fbcfe8" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Area type="monotone" dataKey="leads" stroke="url(#colorLeadsLine)" fill="url(#colorLeadsArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Leads Table */}
      <div className="bg-white p-4 rounded-2xl shadow border border-primary-100">
        <h2 className="text-lg font-semibold mb-4 text-primary-700">Daily Leads</h2>
        <table className="min-w-full divide-y divide-primary-100">
          <thead className="bg-primary-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-primary-700 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-accent-orange uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-accent-blue uppercase tracking-wider">No of Leads</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-primary-100">
            {dailyLeads.map((row: any, idx: number) => (
              <tr key={idx} className="hover:bg-primary-50 transition">
                <td className="px-6 py-4">{row.date}</td>
                <td className="px-6 py-4">{getDayOfWeek(row.date)}</td>
                <td className="px-6 py-4">{row.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
