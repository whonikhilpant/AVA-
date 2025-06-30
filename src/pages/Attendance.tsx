import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import Calendar from '../components/Attendance/Calendar';
import { format } from 'date-fns';

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock attendance data for the current month
  const mockAttendanceData: { [key: string]: 'present' | 'absent' | 'late' | 'half-day' } = {
    '2024-12-01': 'present',
    '2024-12-02': 'present',
    '2024-12-03': 'late',
    '2024-12-04': 'present',
    '2024-12-05': 'absent',
    '2024-12-06': 'present',
    '2024-12-07': 'present',
    '2024-12-08': 'present',
    '2024-12-09': 'present',
    '2024-12-10': 'half-day',
    '2024-12-11': 'present',
    '2024-12-12': 'present',
    '2024-12-13': 'late',
    '2024-12-14': 'present',
    '2024-12-15': 'present',
    '2024-12-16': 'present',
    '2024-12-17': 'present',
    '2024-12-18': 'absent',
    '2024-12-19': 'present',
    '2024-12-20': 'present',
    '2024-12-21': 'present',
    '2024-12-22': 'present',
    '2024-12-23': 'present',
    '2024-12-24': 'late',
    '2024-12-25': 'present',
    '2024-12-26': 'present',
    '2024-12-27': 'present',
    '2024-12-28': 'present',
    '2024-12-29': 'present',
    '2024-12-30': 'present',
    '2024-12-31': 'present',
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
            Details for {format(selectedDate, 'MMMM dd, yyyy')}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">N</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Nikhil Pant</p>
                  <p className="text-sm text-gray-500">NK2710IN</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">09:00 AM</p>
                <p className="text-sm text-gray-500">Check In</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">J</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">EMP001</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">09:15 AM</p>
                <p className="text-sm text-gray-500">Check In</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">J</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Jane Smith</p>
                  <p className="text-sm text-gray-500">EMP002</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">08:45 AM</p>
                <p className="text-sm text-gray-500">Check In</p>
              </div>
            </div>
          </div>
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
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-700">J</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">EMP001</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  09:15 AM
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  06:00 PM
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Late
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