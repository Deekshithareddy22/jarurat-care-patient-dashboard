import React, { useState } from "react";

export default function AddPatientForm({ onAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return alert("Please enter a name");
    onAdd({ name, age: Number(age), contact, address, notes });
    setName("");
    setAge("");
    setContact("");
    setAddress("");
    setNotes("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button type="submit">Add Patient</button>
    </form>
  );
}
