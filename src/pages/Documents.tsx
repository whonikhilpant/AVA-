import React from 'react';
import { FolderOpen, Upload, Search, Download, Trash2 } from 'lucide-react';

const Documents: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and organize your documents and files.
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
            <p className="text-sm text-gray-500">Drag and drop files or click to browse</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
          <option>All Types</option>
          <option>PDF</option>
          <option>Word</option>
          <option>Excel</option>
          <option>Images</option>
        </select>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <FolderOpen className="h-8 w-8 text-blue-500" />
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-blue-600">
                <Download className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Project Proposal.pdf</h4>
          <p className="text-sm text-gray-500 mb-2">2.5 MB • Updated 2 days ago</p>
          <div className="flex items-center text-xs text-gray-400">
            <span>Uploaded by: Nikhil Pant</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <FolderOpen className="h-8 w-8 text-green-500" />
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-blue-600">
                <Download className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Meeting Notes.docx</h4>
          <p className="text-sm text-gray-500 mb-2">1.2 MB • Updated 1 week ago</p>
          <div className="flex items-center text-xs text-gray-400">
            <span>Uploaded by: Nikhil Pant</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <FolderOpen className="h-8 w-8 text-purple-500" />
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-blue-600">
                <Download className="h-4 w-4" />
              </button>
              <button className="text-gray-400 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <h4 className="font-medium text-gray-900 mb-1">Budget Report.xlsx</h4>
          <p className="text-sm text-gray-500 mb-2">3.1 MB • Updated 3 days ago</p>
          <div className="flex items-center text-xs text-gray-400">
            <span>Uploaded by: Nikhil Pant</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">New document uploaded</p>
                <p className="text-xs text-gray-500">Project Proposal.pdf • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Download className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Document downloaded</p>
                <p className="text-xs text-gray-500">Meeting Notes.docx • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents; 