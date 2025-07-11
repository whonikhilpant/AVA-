import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  Users,
} from 'lucide-react';
import Calendar from '../components/Attendance/Calendar';
import { format, subDays } from 'date-fns';

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date('2025-06-30'));

  const mockAttendanceData: { [key: string]: 'present' | 'absent' | 'late' | 'half-day' } = {
    '2025-06-03': 'late',
    '2025-06-13': 'late',
    '2025-06-20': 'late',
    '2025-06-05': 'absent',
    '2025-06-18': 'absent',
    '2025-06-07': 'half-day',
    '2025-06-01': 'present',
    '2025-06-02': 'present',
    '2025-06-04': 'present',
    '2025-06-06': 'present',
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
  const attendancePercentage = Math.round(
    (attendanceStats.present / totalDays) * 100
  );

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Present" value={attendanceStats.present} icon={CheckCircle} color="text-green-500" />
        <StatCard label="Absent" value={attendanceStats.absent} icon={XCircle} color="text-red-500" />
        <StatCard label="Late" value={attendanceStats.late} icon={Clock} color="text-yellow-500" />
        <StatCard label="Attendance %" value={`${attendancePercentage}%`} icon={Users} color="text-blue-500" />
      </div>

      {/* Calendar & Week Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Calendar
          currentDate={selectedDate}
          onDateChange={handleDateChange}
          attendanceData={mockAttendanceData}
        />

        {/* Selected Week Summary */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Details for This Week</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 7 })
                .map((_, i) => subDays(selectedDate, 6 - i))
                .filter(date => {
                  const day = date.getDay();
                  return day !== 0 && day !== 6;
                })
                .map(date => {
                  const formatted = format(date, 'yyyy-MM-dd');
                  const status = mockAttendanceData[formatted] || 'absent';

                  const statusMap = {
                    present: { text: 'Present', bg: 'bg-green-100', textColor: 'text-green-800' },
                    late: { text: 'Late', bg: 'bg-yellow-100', textColor: 'text-yellow-800' },
                    absent: { text: 'Absent', bg: 'bg-red-100', textColor: 'text-red-800' },
                    'half-day': { text: 'Half Day', bg: 'bg-purple-100', textColor: 'text-purple-800' },
                  };

                  const { text, bg, textColor } = statusMap[status];

                  return (
                    <tr key={formatted}>
                      <td className="px-4 py-2 text-sm text-gray-900">{format(date, 'MMM dd, yyyy')}</td>
                      <td className="px-4 py-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${bg} ${textColor}`}>
                          {text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color }) => (
  <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
    <Icon className={`h-8 w-8 ${color}`} />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Attendance;
