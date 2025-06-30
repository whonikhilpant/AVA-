# 🎯 AVA CRM - Demo Instructions

## 🚀 **Quick Start**

1. **Open your browser** and go to: http://localhost:3000
2. **You'll see the login page** with demo credentials displayed
3. **Click on any demo credential** to auto-fill the form
4. **Click "Sign in"** to access the dashboard

## 👥 **Demo Users**

| Role | Employee ID | Password | Department |
|------|-------------|----------|------------|
| **Manager** | `NK2710IN` | `password123` | Sales |
| **Employee** | `EMP001` | `password123` | Marketing |
| **Admin** | `EMP002` | `password123` | IT |

## 🎨 **Features to Explore**

### **Dashboard**
- ✅ Attendance percentage (90.9%)
- ✅ Total leads (45)
- ✅ Active events (3)
- ✅ Email activity (156 sent, 142 read)

### **Navigation**
- 📊 **Dashboard** - Overview and stats
- 📅 **Attendance** - Track employee attendance with **interactive calendar**
- 📈 **Reports** - Generate various reports
- 📁 **Documents** - File management
- 👥 **Leads** - Lead management (coming soon)
- 📧 **Email Log** - Email activity (coming soon)

### **🎯 NEW: Interactive Attendance Calendar**
- 🟢 **Green** - Present days
- 🔴 **Red** - Absent days  
- 🟡 **Yellow** - Late days
- 🟠 **Orange** - Half-day
- ⚪ **Gray** - No record
- 🔘 **Light Gray** - Upcoming days
- 📅 **Click any date** to view details
- ⬅️➡️ **Navigate months** with arrow buttons
- 📊 **Real-time statistics** update based on calendar data

### **Interactive Elements**
- 🔄 **Real-time data** updates
- 📱 **Responsive design** (try resizing browser)
- 🎨 **Modern UI** with smooth transitions
- 🔐 **Secure authentication** flow
- 📅 **Interactive calendar** with color-coded attendance

## 🛠 **Technical Details**

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **State Management**: React Context + React Query
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Date Handling**: date-fns library
- **Calendar**: Custom interactive component

## 🔧 **Development**

```bash
# Start development server
npm start

# The app will be available at:
# http://localhost:3000
```

## 📝 **Notes**

- All data is **mock data** for demonstration
- No backend required for demo
- Session persists in localStorage
- Logout clears all session data
- Calendar shows realistic attendance patterns
- **90.9% attendance rate** with 2 absent days and 3 late days

## 🎯 **Demo Calendar Data**

The attendance calendar shows:
- **27 Present days** (green)
- **2 Absent days** (red) - Dec 5 & 18
- **3 Late days** (yellow) - Dec 3, 13 & 24  
- **1 Half-day** (orange) - Dec 10
- **Future dates** (light gray)

---

**Enjoy exploring your AVA CRM!** 🎉 