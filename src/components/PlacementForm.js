import React, { useState, useEffect } from 'react';
import './PlacementForm.css';

const PlacementForm = ({ fetchPlacements, editingPlacement, setEditingPlacement }) => {
  const [studentName, setStudentName] = useState('');
  const [studentDepartment, setStudentDepartment] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [placementStatus, setPlacementStatus] = useState('');
  const [interviewDate, setInterviewDate] = useState('');

  useEffect(() => {
    if (editingPlacement) {
      setStudentName(editingPlacement.studentName);
      setStudentDepartment(editingPlacement.studentDepartment);
      setCompanyName(editingPlacement.companyName);
      setJobRole(editingPlacement.jobRole);
      setPlacementStatus(editingPlacement.placementStatus);
      setInterviewDate(editingPlacement.interviewDate);
    } else {
      resetForm();
    }
  }, [editingPlacement]);

  const resetForm = () => {
    setStudentName('');
    setStudentDepartment('');
    setCompanyName('');
    setJobRole('');
    setPlacementStatus('');
    setInterviewDate('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const placement = {
      studentName,
      studentDepartment,
      companyName,
      jobRole,
      placementStatus,
      interviewDate,
    };

    try {
      if (editingPlacement) {
        await fetch(`http://localhost:8080/PlacementService/${editingPlacement.placementId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(placement),
        });
      } else {
        await fetch('http://localhost:8080/PlacementService', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(placement),
        });
      }
      fetchPlacements();
      setEditingPlacement(null);
      resetForm();
    } catch (error) {
      console.error('Error saving placement:', error);
    }
  };

  const handleCancel = () => {
    setEditingPlacement(null);
    resetForm();
  };

  return (
    <div className="form-container">
      <h2>{editingPlacement ? 'Edit Placement' : 'Add Placement'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
          required
        />
        <input
          type="text"
          value={studentDepartment}
          onChange={(e) => setStudentDepartment(e.target.value)}
          placeholder="Department"
          required
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          value={jobRole}
          onChange={(e) => setJobRole(e.target.value)}
          placeholder="Job Role"
          required
        />
        <select
          value={placementStatus}
          onChange={(e) => setPlacementStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
        <input
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          placeholder="Interview Date"
          required
        />
        <div className="form-buttons">
          <button type="submit">{editingPlacement ? 'Update Placement' : 'Add Placement'}</button>
          {editingPlacement && (
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlacementForm;
