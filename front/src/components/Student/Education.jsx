import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, GraduationCap } from 'lucide-react';

// Reusable Education Form Component
const EducationForm = ({ formData, onChange, onSave, onCancel }) => (
  <div className="border border-gray-200 rounded-lg p-4 space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Institution</label>
        <input
          type="text"
          name="institution"
          value={formData.institution}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Degree</label>
        <input
          type="text"
          name="degree"
          value={formData.degree}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Field of Study</label>
        <input
          type="text"
          name="field"
          value={formData.field}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">GPA</label>
        <input
          type="text"
          name="gpa"
          value={formData.gpa}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Start Year</label>
        <input
          type="text"
          name="startYear"
          value={formData.startYear}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">End Year</label>
        <input
          type="text"
          name="endYear"
          value={formData.endYear}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div className="flex space-x-2">
      <button
        onClick={onSave}
        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        <Save size={14} />
        <span>Save</span>
      </button>
      <button
        onClick={onCancel}
        className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        <X size={14} />
        <span>Cancel</span>
      </button>
    </div>
  </div>
);

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    gpa: '',
    description: ''
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      gpa: '',
      description: ''
    });
  };

  const handleEdit = (education) => {
    setEditingId(education.id);
    setFormData(education);
  };

  const handleSave = () => {
    if (isAdding) {
      setEducations([...educations, { ...formData, id: Date.now() }]);
      setIsAdding(false);
    } else if (editingId) {
      setEducations(educations.map(edu => edu.id === editingId ? { ...formData, id: editingId } : edu));
      setEditingId(null);
    }
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      gpa: '',
      description: ''
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
      gpa: '',
      description: ''
    });
  };

  const handleDelete = (id) => {
    setEducations(educations.filter(edu => edu.id !== id));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Education</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {educations.map((education) => (
          <div key={education.id}>
            {editingId === education.id ? (
              <EducationForm
                formData={formData}
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <GraduationCap className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{education.institution}</h3>
                    <p className="text-blue-600 font-medium">{education.degree} in {education.field}</p>
                    <p className="text-gray-600">{education.startYear} - {education.endYear}</p>
                    {education.gpa && <p className="text-gray-600">GPA: {education.gpa}</p>}
                    {education.description && <p className="text-gray-700 mt-2">{education.description}</p>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(education)} className="p-2 text-gray-400 hover:text-blue-600">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(education.id)} className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <EducationForm
            formData={formData}
            onChange={handleChange}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default Education;
