import React, { useEffect, useState } from 'react';
import { Upload, Download } from 'lucide-react';

interface UploadedDoc {
  id: number;
  document_type: string;
  file_path: string;
  uploaded_at: string;
}

const Documents: React.FC = () => {
  const [passport, setPassport] = useState<File | null>(null);
  const [aadhar, setAadhar] = useState<File | null>(null);
  const [pan, setPan] = useState<File | null>(null);
  const [bank, setBank] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);

  const empId = JSON.parse(localStorage.getItem('user') || '{}')?.employeeId;

  const handleUpload = async () => {
  if (!empId) {
    setMessage('❌ Login required.');
    return;
  }

  const formData = new FormData();
  formData.append('empId', empId);

  // Append only selected files
  if (passport) formData.append('passport', passport);
  if (aadhar) formData.append('aadhar', aadhar);
  if (pan) formData.append('pan', pan);
  if (bank) formData.append('bank', bank);

  // If no file selected
  if (!passport && !aadhar && !pan && !bank) {
    setMessage('❌ Please select at least one document to upload.');
    return;
  }

  try {
    setIsUploading(true);
    setMessage('');
    const response = await fetch('https://leadinfo.site/employee/upload_documents.php', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      setMessage('✅ Documents uploaded successfully!');
      setPassport(null);
      setAadhar(null);
      setPan(null);
      setBank(null);
      fetchUploadedDocs(); // Refresh uploaded docs
    } else {
      setMessage(`❌ Upload failed: ${result.message}`);
    }
  } catch (error) {
    setMessage('❌ Network error or server unavailable.');
  } finally {
    setIsUploading(false);
  }
};


  const fetchUploadedDocs = async () => {
    try {
      const res = await fetch(`https://leadinfo.site/employee/get_documents.php?empId=${empId}`);
      const result = await res.json();
      if (result.success) {
        setUploadedDocs(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch documents');
    }
  };

  useEffect(() => {
    if (empId) fetchUploadedDocs();
  }, [empId]);

  const renderUploadCard = (
    title: string,
    inputId: string,
    file: File | null,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Upload a valid document file</p>
        </div>
        <label
          htmlFor={inputId}
          className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Upload className="h-4 w-4 mr-2" />
          Browse
        </label>
        <input
          type="file"
          id={inputId}
          className="hidden"
          onChange={(e) => setter(e.target.files?.[0] || null)}
        />
      </div>
      <p className="text-sm text-gray-700 mt-1">
        {file?.name || 'No file selected'}
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload and view your personal documents.
        </p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderUploadCard('Passport Size Photo', 'passport', passport, setPassport)}
        {renderUploadCard('Aadhar Card', 'aadhar', aadhar, setAadhar)}
        {renderUploadCard('PAN Card', 'pan', pan, setPan)}
        {renderUploadCard('Bank Details', 'bank', bank, setBank)}
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition disabled:opacity-50"
        >
          <Upload className="inline w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Submit Documents'}
        </button>
        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>

      {/* Display Uploaded Documents */}
      {uploadedDocs.length > 0 && (
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Uploaded Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {uploadedDocs.map((doc) => (
              <div key={doc.id} className="border rounded-md p-3 shadow hover:shadow-lg transition">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold capitalize">{doc.document_type}</span>
                  <a
                    href={`http://leadinfo.site/employee/uploads/${doc.file_path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    <Download className="w-4 h-4 inline" />
                  </a>
                </div>
                <img
                  src={`http://leadinfo.site/employee/uploads/${doc.file_path}`}
                  alt={doc.document_type}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="text-xs text-gray-400 mt-1">{new Date(doc.uploaded_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
