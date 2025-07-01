import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const monthWiseLeads = [
  { month: 'Jan', leads: 30 },
  { month: 'Feb', leads: 45 },
  { month: 'Mar', leads: 60 },
  { month: 'Apr', leads: 50 },
  { month: 'May', leads: 80 },
  { month: 'Jun', leads: 65 },
  { month: 'Jul', leads: 90 },
  { month: 'Aug', leads: 70 },
  { month: 'Sep', leads: 55 },
  { month: 'Oct', leads: 75 },
  { month: 'Nov', leads: 60 },
  { month: 'Dec', leads: 85 },
];

const dailyLeads = [
  { date: '2024-06-01', leads: 5 },
  { date: '2024-06-02', leads: 8 },
  { date: '2024-06-03', leads: 6 },
  { date: '2024-06-04', leads: 10 },
  { date: '2024-06-05', leads: 7 },
];

function getDayOfWeek(dateString: string) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  return days[date.getDay()];
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <TrendingUp className="text-accent-orange w-7 h-7" /> Leads
      </h1>
      <div className="mb-8 bg-gradient-to-br from-primary-50 via-accent-orange/10 to-white p-6 rounded-2xl shadow-lg border border-primary-100">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary-700">
          <TrendingUp className="w-5 h-5 text-accent-orange" /> Month-wise Leads
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <AreaChart data={monthWiseLeads} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLeadsArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.25}/>
                <stop offset="50%" stopColor="#ff7c2b" stopOpacity={0.15}/>
                <stop offset="100%" stopColor="#1fa2ff" stopOpacity={0.08}/>
              </linearGradient>
              <linearGradient id="colorLeadsLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ec4899"/>
                <stop offset="50%" stopColor="#ff7c2b"/>
                <stop offset="100%" stopColor="#1fa2ff"/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#fbcfe8" />
            <XAxis dataKey="month" tick={{ fill: '#ec4899', fontWeight: 500 }} axisLine={{ stroke: '#ec4899' }} tickLine={false} />
            <YAxis tick={{ fill: '#ff7c2b', fontWeight: 500 }} axisLine={{ stroke: '#ff7c2b' }} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#ec4899', fillOpacity: 0.05 }} />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ color: '#be185d', fontWeight: 600 }} />
            <Area type="monotone" dataKey="leads" stroke="url(#colorLeadsLine)" fill="url(#colorLeadsArea)" strokeWidth={3} dot={{ r: 7, fill: '#fff', stroke: '#ff7c2b', strokeWidth: 3, filter: 'drop-shadow(0 2px 6px #ff7c2b33)' }} activeDot={{ r: 10, fill: '#1fa2ff', stroke: '#fff', strokeWidth: 2 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
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
            {dailyLeads.map((row, idx) => (
              <tr key={idx} className="hover:bg-primary-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-700 font-medium border-l-4 border-transparent hover:border-accent-orange transition">{row.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-orange font-semibold">{getDayOfWeek(row.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-accent-blue font-bold">{row.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads; 