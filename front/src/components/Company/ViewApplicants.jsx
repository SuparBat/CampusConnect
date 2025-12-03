import React from 'react';

const ViewApplicants = ({ job, onBack }) => {
  const applicants = job.applicants || [];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Applicants for: {job.title}</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Back
        </button>
      </div>

      {/* Applicants list */}
      {applicants.length === 0 ? (
        <p className="text-gray-600">No applicants yet.</p>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <p className="font-semibold">{applicant.name || "Unknown Name"}</p>
                <p className="text-gray-600 text-sm">{applicant.email || "No email"}</p>
              </div>
              {/* Add buttons or actions here if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;
