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
        fetchReports();
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
    <div className="space-y-6 p-4 md:p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">Generate and view various reports and analytics.</p>
      </div>

      {/* Submit Report Section */}
      <div className="bg-white shadow sm:w-28 md:w-full rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Submit Report Data</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Events"
            className="border rounded px-3 py-2 w-full"
            value={reportData.events}
            onChange={e => handleInputChange('events', e.target.value)}
          />
          <input
            type="number"
            placeholder="No of Mails"
            className="border rounded px-3 py-2 w-full"
            value={reportData.mails}
            onChange={e => handleInputChange('mails', e.target.value)}
          />
          <input
            type="number"
            placeholder="No of Leads"
            className="border rounded px-3 py-2 w-full"
            value={reportData.leads}
            onChange={e => handleInputChange('leads', e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 w-full sm:w-auto"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
        {message && (
          <p className="mt-3 text-center text-sm font-medium text-gray-700">{message}</p>
        )}
      </div>

      {/* Submitted Reports Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">All Submitted Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-2">Employee ID</th>
                <th className="px-4 py-2">Events</th>
                <th className="px-4 py-2">Mails</th>
                <th className="px-4 py-2">Leads</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y text-gray-800">
              {reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{report.employeeId}</td>
                    <td className="px-4 py-2">{report.events}</td>
                    <td className="px-4 py-2">{report.mails}</td>
                    <td className="px-4 py-2">{report.leads}</td>
                    <td className="px-4 py-2">{report.submitted_at}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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
