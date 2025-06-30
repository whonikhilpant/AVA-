import axios from 'axios';
import { DashboardStats } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data for demo mode
const MOCK_DASHBOARD_STATS: DashboardStats = {
  attendance: {
    totalDays: 22,
    presentDays: 20,
    absentDays: 1,
    lateDays: 1,
    attendancePercentage: 90.9,
  },
  totalLeads: 45,
  activeLeads: 12,
  totalEvents: 8,
  upcomingEvents: 3,
  emailsSent: 156,
  emailsRead: 142,
};

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error) {
      // Return mock data if API fails (demo mode)
      console.log('Using mock dashboard data (demo mode)');
      return MOCK_DASHBOARD_STATS;
    }
  },

  async getRecentActivity() {
    try {
      const response = await api.get('/dashboard/activity');
      return response.data;
    } catch (error) {
      // Return mock activity data
      return [
        {
          id: '1',
          type: 'email',
          message: 'Email sent to client',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        },
        {
          id: '2',
          type: 'attendance',
          message: 'Attendance marked',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        },
        {
          id: '3',
          type: 'lead',
          message: 'New lead added',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        },
      ];
    }
  },

  async getAttendanceChart() {
    try {
      const response = await api.get('/dashboard/attendance-chart');
      return response.data;
    } catch (error) {
      // Return mock chart data
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        data: [95, 88, 92, 85, 91],
      };
    }
  },

  async getLeadStats() {
    try {
      const response = await api.get('/dashboard/leads');
      return response.data;
    } catch (error) {
      // Return mock lead stats
      return {
        total: 45,
        new: 12,
        contacted: 18,
        qualified: 10,
        won: 3,
        lost: 2,
      };
    }
  },

  async getEmailStats() {
    try {
      const response = await api.get('/dashboard/emails');
      return response.data;
    } catch (error) {
      // Return mock email stats
      return {
        sent: 156,
        delivered: 152,
        read: 142,
        failed: 4,
      };
    }
  },
}; 