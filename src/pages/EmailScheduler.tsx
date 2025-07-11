import React, { useEffect, useState } from 'react';

const convertToIST = (time: string, fromTimeZone: string): string => {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  date.setSeconds(0);

  const localTimeInIST = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  );
  localTimeInIST.setHours(hour);
  localTimeInIST.setMinutes(minute);

  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(localTimeInIST);
};

const countryTimeSlots = [
  { country: 'USA (EST)', timezone: 'America/New_York', morningStart: '08:00', morningEnd: '11:00' },
  { country: 'UK', timezone: 'Europe/London', morningStart: '08:00', morningEnd: '11:00' },
  { country: 'India', timezone: 'Asia/Kolkata', morningStart: '08:00', morningEnd: '11:00' },
  { country: 'Australia', timezone: 'Australia/Sydney', morningStart: '08:00', morningEnd: '11:00' }
];

const EmailScheduler: React.FC = () => {
  const [slots, setSlots] = useState<any[]>([]);

  useEffect(() => {
    const converted = countryTimeSlots.map(item => {
      const istStart = convertToIST(item.morningStart, item.timezone);
      const istEnd = convertToIST(item.morningEnd, item.timezone);

      return {
        ...item,
        istSlot: `${istStart} - ${istEnd}`
      };
    });

    setSlots(converted);
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow max-w-5xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-gray-800">📧 Email Timing Guide (IST)</h2>
      
      <table className="w-full table-auto border-collapse text-sm mb-8">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600">
            <th className="p-2">🌍 Country</th>
            <th className="p-2">⏰ Morning Time (Local)</th>
            <th className="p-2 text-blue-600">📨 Send Between (IST)</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{slot.country}</td>
              <td className="p-2">{slot.morningStart} - {slot.morningEnd}</td>
              <td className="p-2 font-medium text-blue-600">{slot.istSlot}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🌐 Email Marketing Guide Section */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📌 Email Marketing Strategies</h3>
        
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
          <li><strong>Personalization:</strong> Use the recipient's name and location for higher engagement.</li>
          <li><strong>Segmentation:</strong> Divide your contact list by country, interest, or behavior to send targeted campaigns.</li>
          <li><strong>Timing Matters:</strong> Schedule emails based on the recipient’s local morning time (use above chart).</li>
          <li><strong>Strong Subject Lines:</strong> Write attention-grabbing subject lines to improve open rates.</li>
          <li><strong>Clear CTA (Call to Action):</strong> Every email should drive an action—click, signup, buy, etc.</li>
          <li><strong>Mobile Optimization:</strong> Ensure your email looks great on mobile devices.</li>
          <li><strong>A/B Testing:</strong> Experiment with different versions of subject lines and content to see what performs better.</li>
          <li><strong>Use Analytics:</strong> Track open rates, click-through rates (CTR), and bounce rates regularly.</li>
        </ul>

        <div className="mt-5">
          <h4 className="text-md font-semibold text-gray-800 mb-2">🕓 Best Days to Send Emails:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li><strong>Tuesday:</strong> Best overall day for engagement.</li>
            <li><strong>Thursday:</strong> Great for follow-ups and B2B.</li>
            <li><strong>Wednesday:</strong> Balanced engagement for most industries.</li>
            <li><strong>Sunday:</strong> Good for retail/personal promotions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailScheduler;
