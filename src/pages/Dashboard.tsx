import React from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Calendar,
  Mail,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import StatCard from '../components/Dashboard/StatCard';
import { DashboardStats } from '../types';
import { dashboardService } from '../services/dashboardService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  console.log("📌 Dashboard - employeeId:", user?.employeeId);
  const employeeName = localStorage.getItem('employee_name');

  const {
    data: stats,
    isLoading,
    error
  } = useQuery<DashboardStats>(
    'dashboardStats',
    dashboardService.getStats,
    {
      refetchInterval: 30000,
      enabled: !!user?.employeeId
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">Error loading dashboard</h3>
        <p className="mt-1 text-sm text-gray-500">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back <strong>{employeeName}</strong>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
  title="Attendance"
  value={`${stats?.attendance?.attendancePercentage || 0}%`}
  icon={CheckCircle}
  color="green"
/>
        <StatCard
          title="Leads in 30 days"
          value={stats.totalLeads || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Events in 30 days"
          value={stats.activeEvents || 0}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="Sent Mails in 30 days"
          value={stats.emailsSent || 0}
          icon={Mail}
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Attendance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Present Days</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.attendance?.presentDays || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Absent Days</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.attendance?.absentDays || 0}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Late Days</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.attendance?.lateDays || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Email sent to client</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Attendance marked</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">New lead added</p>
                <p className="text-sm text-gray-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
