import axios from 'axios';
import { DashboardStats } from '../types';

const API_BASE_URL = 'https://leadinfo.site/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach token (if using auth in future)
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const empId = user?.employeeId;
    console.log("📌 Dashboard - employeeId:", user?.employeeId);
    if (!empId) {
      throw new Error('Missing empId');
    }

    try {
      const response = await axios.get(
        `https://leadinfo.site/employee/dashboard_stats.php?employeeId=${empId}`
      );
      return response.data.data; // assuming { success: true, data: { ... } }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Unable to fetch dashboard stats');
    }
  },
};

