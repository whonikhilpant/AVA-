import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import Calendar from '../components/Attendance/Calendar';
import { format, subDays } from 'date-fns';

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-30'));

  // Mock attendance data based on user request for June 2025
  const mockAttendanceData: { [key: string]: 'present' | 'absent' | 'late' | 'half-day' } = {
    // 3 Late
    '2025-06-03': 'late',
    '2025-06-13': 'late',
    '2025-06-20': 'late',

    // 2 Absent
    '2025-06-05': 'absent',
    '2025-06-18': 'absent',

    // 25 Present
    '2025-06-01': 'present',
    '2025-06-02': 'present',
    '2025-06-04': 'present',
    '2025-06-06': 'present',
    '2025-06-07': 'present',
    '2025-06-08': 'present',
    '2025-06-09': 'present',
    '2025-06-10': 'present',
    '2025-06-11': 'present',
    '2025-06-12': 'present',
    '2025-06-14': 'present',
    '2025-06-15': 'present',
    '2025-06-16': 'present',
    '2025-06-17': 'present',
    '2025-06-19': 'present',
    '2025-06-21': 'present',
    '2025-06-22': 'present',
    '2025-06-23': 'present',
    '2025-06-24': 'present',
    '2025-06-25': 'present',
    '2025-06-26': 'present',
    '2025-06-27': 'present',
    '2025-06-28': 'present',
    '2025-06-29': 'present',
    '2025-06-30': 'present',
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  // Calculate attendance statistics
  const attendanceStats = Object.values(mockAttendanceData).reduce(
    (acc, status) => {
      switch (status) {
        case 'present':
          acc.present++;
          break;
        case 'absent':
          acc.absent++;
          break;
        case 'late':
          acc.late++;
          break;
        case 'half-day':
          acc.halfDay++;
          break;
      }
      return acc;
    },
    { present: 0, absent: 0, late: 0, halfDay: 0 }
  );

  const totalDays = Object.keys(mockAttendanceData).length;
  const attendancePercentage = Math.round((attendanceStats.present / totalDays) * 100);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage employee attendance records.
        </p>
      </div>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Present</p>
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.present}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Absent</p>
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.absent}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Late</p>
              <p className="text-2xl font-semibold text-gray-900">{attendanceStats.late}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Attendance %</p>
              <p className="text-2xl font-semibold text-gray-900">{attendancePercentage}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar and Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Calendar
          currentDate={selectedDate}
          onDateChange={handleDateChange}
          attendanceData={mockAttendanceData}
        />

        {/* Selected Date Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Details for This Week
          </h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 7 })
                .map((_, i) => subDays(selectedDate, 6 - i))
                .filter(date => {
                  const day = date.getDay();
                  return day !== 0 && day !== 6; // Exclude Sunday (0) and Saturday (6)
                })
                .map(date => (
                  <tr key={date.toISOString()}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{format(date, 'MMMM dd, yyyy')}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Present
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Today's Attendance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">N</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Nikhil Pant</div>
                      <div className="text-sm text-gray-500">NK2710IN</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  09:00 AM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  06:00 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Present
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance; 