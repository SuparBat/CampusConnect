import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Award, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    url: '',
    description: ''
  });

  const handleAdd = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: '',
      description: ''
    });
  };

  const handleEdit = (certificate) => {
    setEditingId(certificate.id);
    setFormData(certificate);
  };

  const handleSave = () => {
    if (isAdding) {
      setCertificates([...certificates, { ...formData, id: Date.now() }]);
      setIsAdding(false);
    } else {
      setCertificates(certificates.map(cert => 
        cert.id === editingId ? { ...formData, id: editingId } : cert
      ));
      setEditingId(null);
    }
    resetForm();
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    resetForm();
  };

  const handleDelete = (id) => {
    setCertificates(certificates.filter(cert => cert.id !== id));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      url: '',
      description: ''
    });
  };

  const isExpired = (expiryDate) => expiryDate && new Date(expiryDate) < new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Certificates</h2>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          <span>Add Certificate</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="border border-gray-200 rounded-lg p-6">
            {editingId === certificate.id ? (
              <CertificateForm 
                formData={formData} 
                handleChange={handleChange} 
                handleSave={handleSave} 
                handleCancel={handleCancel} 
              />
            ) : (
              <CertificateCard 
                certificate={certificate} 
                handleEdit={handleEdit} 
                handleDelete={handleDelete} 
                isExpired={isExpired} 
              />
            )}
          </div>
        ))}

        {isAdding && (
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Certificate</h3>
            <CertificateForm 
              formData={formData} 
              handleChange={handleChange} 
              handleSave={handleSave} 
              handleCancel={handleCancel} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

const CertificateForm = ({ formData, handleChange, handleSave, handleCancel }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputField label="Certificate Name" name="name" value={formData.name} onChange={handleChange} />
      <InputField label="Issuing Organization" name="issuer" value={formData.issuer} onChange={handleChange} />
      <InputField label="Issue Date" name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} />
      <InputField label="Expiry Date" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} />
      <InputField label="Credential ID" name="credentialId" value={formData.credentialId} onChange={handleChange} />
      <InputField label="Verification URL" name="url" type="url" value={formData.url} onChange={handleChange} />
    </div>
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <div className="flex space-x-2">
      <button
        onClick={handleSave}
        className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        <Save size={14} />
        <span>Save</span>
      </button>
      <button
        onClick={handleCancel}
        className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
      >
        <X size={14} />
        <span>Cancel</span>
      </button>
    </div>
  </div>
);

const CertificateCard = ({ certificate, handleEdit, handleDelete, isExpired }) => (
  <div className="flex items-start justify-between">
    <div className="flex items-start space-x-3">
      <div className="bg-yellow-100 rounded-full p-2">
        <Award className="text-yellow-600" size={20} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{certificate.name}</h3>
        <p className="text-blue-600 font-medium">{certificate.issuer}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
          <span>Issued: {certificate.issueDate}</span>
          {certificate.expiryDate && (
            <span className={isExpired(certificate.expiryDate) ? 'text-red-600' : ''}>
              Expires: {certificate.expiryDate}{isExpired(certificate.expiryDate) && ' (Expired)'}
            </span>
          )}
        </div>
        {certificate.credentialId && <p className="text-sm text-gray-600 mt-1">ID: {certificate.credentialId}</p>}
        {certificate.description && <p className="text-gray-700 mt-2">{certificate.description}</p>}
        {certificate.url && (
          <a href={certificate.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800 mt-2 text-sm">
            <ExternalLink size={14} />
            <span>Verify Certificate</span>
          </a>
        )}
      </div>
    </div>
    <div className="flex space-x-2">
      <button onClick={() => handleEdit(certificate)} className="p-2 text-gray-400 hover:text-blue-600">
        <Edit2 size={16} />
      </button>
      <button onClick={() => handleDelete(certificate.id)} className="p-2 text-gray-400 hover:text-red-600">
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

const InputField = ({ label, name, type = 'text', value, onChange }) => (
  <div>
    <label className="text-sm font-medium text-gray-700 mb-1 block">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default Certificates;
