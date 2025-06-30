import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState({
    events: '',
    mails: '',
    leads: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          Generate and view various reports and analytics.
        </p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Attendance Report</h3>
              <p className="text-sm text-gray-500">Monthly attendance summary</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Lead Analytics</h3>
              <p className="text-sm text-gray-500">Lead conversion metrics</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
            Generate Report
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Email Activity</h3>
              <p className="text-sm text-gray-500">Email communication logs</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Recent Reports (Editable Table) */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Submit Report Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Mails</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No of Leads</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    placeholder="Events"
                    value={reportData.events}
                    onChange={e => handleInputChange('events', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    placeholder="No of Mails"
                    value={reportData.mails}
                    onChange={e => handleInputChange('mails', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    placeholder="No of Leads"
                    value={reportData.leads}
                    onChange={e => handleInputChange('leads', e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports; 