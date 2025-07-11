import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DocumentPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentPromptModal: React.FC<DocumentPromptModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Upload Documents Required</h2>
        <p className="text-sm text-gray-600 mb-6">
          You haven't uploaded your necessary documents yet. Please upload them to continue using the portal.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Later
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/documents');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upload Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentPromptModal;
