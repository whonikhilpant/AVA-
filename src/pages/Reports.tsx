import React, { useState, useEffect } from 'react';

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState({
    events: '',
    mails: '',
    leads: '',
  });
  const [reports, setReports] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setReportData(prev => ({ ...prev, [field]: value }));
  };

  const fetchReports = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const res = await fetch(`https://leadinfo.site/employee/get_reports.php?employeeId=${user.employeeId}`);

      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setReports(json.data);
      }
    } catch (err) {
      console.error('Failed to fetch reports:', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const employeeId = user.employeeId;

    if (!employeeId) {
      setMessage('❌ User not logged in or employeeId missing.');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await fetch('https://leadinfo.site/employee/submit_report.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          events: parseInt(reportData.events),
          mails: parseInt(reportData.mails),
          leads: parseInt(reportData.leads),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage('✅ Report submitted successfully!');
        setReportData({ events: '', mails: '', leads: '' });
        fetchReports(); // refresh the report list
      } else {
        setMessage(`❌ ${result.message || 'Submission failed'}`);
      }
    } catch (err) {
      setMessage('❌ Network or server error');
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Submit Report Section */}
      <div className="bg-white shadow rounded-lg p-5">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Submit Report Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No of Mails</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No of Leads</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={reportData.events}
                    onChange={e => handleInputChange('events', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
                    value={reportData.mails}
                    onChange={e => handleInputChange('mails', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    className="border rounded px-2 py-1 w-full"
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
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {message && (
          <p className="mt-3 text-center text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>

      {/* Submitted Reports Table */}
      <div className="bg-white shadow rounded-lg p-5">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Submitted Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No of Mails</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No of Leads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.employeeId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.events}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.mails}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.leads}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{report.submitted_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No reports submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
