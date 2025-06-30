import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  attendanceData: {
    [key: string]: 'present' | 'absent' | 'late' | 'half-day';
  };
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, onDateChange, attendanceData }) => {
  const [selectedMonth, setSelectedMonth] = React.useState(currentDate);

  const monthStart = startOfMonth(selectedMonth);
  const monthEnd = endOfMonth(selectedMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get the first day of the month to calculate padding
  const firstDayOfMonth = monthStart.getDay();
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const goToPreviousMonth = () => {
    setSelectedMonth(subMonths(selectedMonth, 1));
  };

  const goToNextMonth = () => {
    setSelectedMonth(addMonths(selectedMonth, 1));
  };

  const getAttendanceColor = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const status = attendanceData[dateKey];
    
    if (date > new Date()) {
      return 'bg-gray-100 text-gray-400'; // Future dates
    }
    
    switch (status) {
      case 'present':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'absent':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'late':
        return 'bg-yellow-500 text-white hover:bg-yellow-600';
      case 'half-day':
        return 'bg-orange-500 text-white hover:bg-orange-600';
      default:
        return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
    }
  };

  const getAttendanceTooltip = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const status = attendanceData[dateKey];
    
    if (date > new Date()) {
      return 'Upcoming';
    }
    
    switch (status) {
      case 'present':
        return 'Present';
      case 'absent':
        return 'Absent';
      case 'late':
        return 'Late';
      case 'half-day':
        return 'Half Day';
      default:
        return 'No Record';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">
          {format(selectedMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}

        {/* Padding Days */}
        {paddingDays.map((_, index) => (
          <div key={`padding-${index}`} className="h-12" />
        ))}

        {/* Calendar Days */}
        {daysInMonth.map((day) => (
          <button
            key={day.toISOString()}
            onClick={() => onDateChange(day)}
            className={`
              h-12 flex items-center justify-center text-sm font-medium rounded-md transition-colors
              ${getAttendanceColor(day)}
              ${isToday(day) ? 'ring-2 ring-blue-500' : ''}
            `}
            title={`${format(day, 'MMM dd, yyyy')} - ${getAttendanceTooltip(day)}`}
          >
            {format(day, 'd')}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Late</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span>Half Day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span>No Record</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 rounded"></div>
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar; 