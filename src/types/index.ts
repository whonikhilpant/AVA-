// User types
export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'manager';
  department: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication types
export interface LoginCredentials {
  employeeId: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Attendance types
export interface AttendanceRecord {
  id: string;
  userId: string;
  date: Date;
  checkIn: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'late' | 'half-day';
  notes?: string;
}

export interface AttendanceStats {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  attendancePercentage: number;
}

// Lead types
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';
  source: string;
  assignedTo: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  attendees: string[];
  organizer: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Email activity types
export interface EmailActivity {
  id: string;
  userId: string;
  recipient: string;
  subject: string;
  content: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: Date;
  readAt?: Date;
}

// Document types
export interface Document {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
  isPublic: boolean;
}

// Dashboard types
export interface DashboardStats {
  attendance: AttendanceStats;
  totalLeads: number;
  activeLeads: number;
  totalEvents: number;
  upcomingEvents: number;
  emailsSent: number;
  emailsRead: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 