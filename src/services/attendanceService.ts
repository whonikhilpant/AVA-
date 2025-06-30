import axios from 'axios';
import { AttendanceRecord, AttendanceStats } from '../types';

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

// Mock attendance data for demo mode
const MOCK_ATTENDANCE_DATA: { [key: string]: 'present' | 'absent' | 'late' | 'half-day' } = {
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

export const attendanceService = {
  async getAttendanceData(month: string, year: string): Promise<{ [key: string]: 'present' | 'absent' | 'late' | 'half-day' }> {
    try {
      const response = await api.get(`/attendance/monthly?month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      // Return mock data if API fails (demo mode)
      console.log('Using mock attendance data (demo mode)');
      return MOCK_ATTENDANCE_DATA;
    }
  },

  async getAttendanceStats(): Promise<AttendanceStats> {
    try {
      const response = await api.get('/attendance/stats');
      return response.data;
    } catch (error) {
      // Return mock stats
      const attendanceStats = Object.values(MOCK_ATTENDANCE_DATA).reduce(
        (acc, status) => {
          switch (status) {
            case 'present':
              acc.presentDays++;
              break;
            case 'absent':
              acc.absentDays++;
              break;
            case 'late':
              acc.lateDays++;
              break;
          }
          return acc;
        },
        { totalDays: 31, presentDays: 0, absentDays: 0, lateDays: 0, attendancePercentage: 0 }
      );
      
      attendanceStats.attendancePercentage = Math.round((attendanceStats.presentDays / attendanceStats.totalDays) * 100);
      return attendanceStats;
    }
  },

  async getTodayAttendance(): Promise<AttendanceRecord[]> {
    try {
      const response = await api.get('/attendance/today');
      return response.data;
    } catch (error) {
      // Return mock today's attendance
      return [
        {
          id: '1',
          userId: '1',
          date: new Date(),
          checkIn: new Date(new Date().setHours(9, 0, 0, 0)),
          checkOut: new Date(new Date().setHours(18, 0, 0, 0)),
          status: 'present',
          notes: '',
        },
        {
          id: '2',
          userId: '2',
          date: new Date(),
          checkIn: new Date(new Date().setHours(9, 15, 0, 0)),
          checkOut: new Date(new Date().setHours(18, 0, 0, 0)),
          status: 'late',
          notes: '',
        },
      ];
    }
  },

  async markAttendance(attendanceData: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    try {
      const response = await api.post('/attendance/mark', attendanceData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to mark attendance');
    }
  },
}; 