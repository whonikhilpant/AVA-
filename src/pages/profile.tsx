import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const employeeId = localStorage.getItem('employeeId');
  console.log(employeeId);
  fetch('https://leadinfo.site/employee/get_user.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeId }),
  })
    .then((res) => res.json())
    .then((data) => {
      setUser(data?.user || null);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching profile:', error);
      setLoading(false);
    });
}, []);


  if (loading) {
    return <div className="text-center py-20 font-semibold text-gray-600">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-20 font-semibold text-red-500">Failed to load profile</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-0">
      <h2 className="text-2xl font-bold text-primary-700 mb-6 border-b pb-2">Profile Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
        <ProfileField label="Employee ID" value={user.employeeId} />
        <ProfileField label="Name" value={user.employee_name} />
        <ProfileField label="Email ID" value={user.email} />
        <ProfileField label="Mobile Number" value={user.phone_number} />
        <ProfileField label="Date of Joining" value={user.date_of_joining} />
        <ProfileField label="Designation" value={user.designation} />
        <ProfileField label="Department" value={user.department} />
        <ProfileField label="Location" value={user.location} />
        <ProfileField label="Bank Name" value={user.bank_name} />
        <ProfileField label="Bank Account No." value={user.bank_account_no} />
        <ProfileField label="IFSC Code" value={user.ifsc_code} />
        <ProfileField label="PAN No." value={user.pan_no} />
        <ProfileField label="Aadhar No." value={user.aadhar_no} />
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800">{value || '—'}</span>
  </div>
);

export default Profile;
