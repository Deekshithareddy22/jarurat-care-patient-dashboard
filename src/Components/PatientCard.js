import React from "react";

export default function PatientCard({ patient, onView }) {
  return (
    <div className="card">
      <h4>{patient.name}</h4>
      <p>Age: {patient.age}</p>
      <p>Contact: {patient.contact}</p>
      <button onClick={onView}>View Details</button>
    </div>
  );
}
