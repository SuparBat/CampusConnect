import React, { useState, useEffect } from "react";
import { UploadCloud, FileText, X, CheckCircle, AlertTriangle, Save } from "lucide-react";

const Resume = ({ user }) => {
  const [file, setFile] = useState(null);
  const [resumePath, setResumePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (user?.resume) {
      // Prepend server URL for resumes stored on the backend
      const serverUrl = 'http://localhost:5000/';
      setResumePath(serverUrl + user.resume.replace(/\\/g, '/'));
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      setError("File size cannot exceed 5MB.");
      return;
    }
    if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
      setError("Invalid file type. Please upload a PDF or DOCX file.");
      return;
    }
    
    setFile(selectedFile);
    setError("");
    setSuccess("");
  };

  const handleSave = () => {
    if (!file) {
      setError("Please select a file to preview.");
      return;
    }

    // Create a temporary URL for the selected file for frontend preview
    const previewUrl = URL.createObjectURL(file);
    setResumePath(previewUrl);

    setSuccess("Resume preview updated. This is a temporary preview and is not saved to your profile.");
    // We keep the file in state in case the user wants to upload it later.
    // To clear it, you would uncomment the next line:
    // setFile(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900">My Resume</h2>
        <p className="text-slate-600 mt-1">Manage your resume for job applications.</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
          <div className="flex justify-center items-center">
            <UploadCloud className="w-12 h-12 text-slate-400 mb-3" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">
            {file ? "File selected" : "Select a resume to preview"}
          </h3>
          <p className="text-slate-500 text-sm mt-1">PDF or DOCX, up to 5MB</p>
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="sr-only"
          />
          <label
            htmlFor="resume-upload"
            className="mt-4 inline-block px-5 py-2.5 bg-white text-blue-600 rounded-lg shadow-sm border border-slate-300 font-semibold cursor-pointer hover:bg-slate-50 transition-colors"
          >
            Browse File
          </label>
          {file && (
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-700">
              <FileText size={16} />
              <span className="font-medium">{file.name}</span>
              <button onClick={() => setFile(null)} className="text-red-500 hover:text-red-700">
                <X size={18} />
              </button>
            </div>
          )}
        </div>

        {error && <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"><AlertTriangle size={18} />{error}</div>}
        {success && <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg"><CheckCircle size={18} />{success}</div>}

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!file || loading}
            className="flex items-center justify-center gap-2 w-48 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            <span>Preview File</span>
          </button>
        </div>

        {resumePath && (
          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Current Resume</h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <iframe
                src={resumePath}
                title="Resume Preview"
                width="100%"
                height="600px"
                className="w-full"
              >
                Your browser does not support PDFs. Please download the PDF to view it.
              </iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;
