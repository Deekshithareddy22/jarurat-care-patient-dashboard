import React from "react";

export default function PatientModal({ patient, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h3>{patient.name}</h3>
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Contact:</strong> {patient.contact}
        </p>
        <p>
          <strong>Address:</strong> {patient.address}
        </p>
        <p>
          <strong>Notes:</strong> {patient.notes}
        </p>
      </div>
    </div>
  );
}
