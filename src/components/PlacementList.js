import React from 'react';
import './PlacementList.css';

const PlacementList = ({ placements, fetchPlacements, setEditingPlacement }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this placement record?')) {
      try {
        await fetch(`http://localhost:8080/PlacementService/${id}`, { method: 'DELETE' });
        fetchPlacements();
      } catch (error) {
        console.error('Error deleting placement:', error);
      }
    }
  };

  return (
    <div className="placement-list-container">
      <h2>Placement Records</h2>
      {placements.length === 0 ? (
        <p className="no-data">No placement records available.</p>
      ) : (
        <div className="placement-grid">
          {placements.map((placement) => (
            <div key={placement.placementId} className="placement-card">
              <div className="placement-header">
                <h3>{placement.studentName}</h3>
             <span className={'status-badge status-' + placement.placementStatus.toLowerCase()}>
                  {placement.placementStatus}
                </span>
              </div>
              <div className="placement-details">
                <p><strong>Department:</strong> {placement.studentDepartment}</p>
                <p><strong>Company:</strong> {placement.companyName}</p>
                <p><strong>Job Role:</strong> {placement.jobRole}</p>
                <p><strong>Interview Date:</strong> {placement.interviewDate}</p>
              </div>
              <div className="card-buttons">
                <button className="edit-btn" onClick={() => setEditingPlacement(placement)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(placement.placementId)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacementList;