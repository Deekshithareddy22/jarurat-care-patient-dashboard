import React, { useEffect, useReducer, useState } from "react";
import PatientCard from "./Components/PatientCard";
import PatientModal from "./Components/PatientModal";
import AddPatientForm from "./Components/AddPatientForm";
import "./App.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, patients: action.payload };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_PATIENT":
      return { ...state, patients: [action.payload, ...state.patients] };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    patients: [],
    loading: false,
    error: null,
  });
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    fetch("/patients.json")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((err) =>
        dispatch({ type: "FETCH_FAILURE", payload: err.message })
      );
  }, []);

  const filtered = state.patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (patient) => {
    const id = Date.now();
    dispatch({ type: "ADD_PATIENT", payload: { ...patient, id } });
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand">Jarurat Care</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#patients">Patients</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main className="container">
        <section id="home" className="hero">
          <h1>Welcome to Jarurat Care</h1>
          <p>Your patient records dashboard made simple.</p>
        </section>

        <section id="patients" className="patients-section">
          <div className="patients-header">
            <h2>Patients</h2>
            <input
              placeholder="Search patients by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {state.loading && <p>Loading...</p>}
          {state.error && <p style={{ color: "red" }}>Error: {state.error}</p>}

          <div className="grid">
            {filtered.map((p) => (
              <PatientCard
                key={p.id}
                patient={p}
                onView={() => setSelected(p)}
              />
            ))}
          </div>
        </section>

        <section className="add-section">
          <h3>Add New Patient</h3>
          <AddPatientForm onAdd={handleAdd} />
        </section>

        <section id="about" className="about">
          <h2>About</h2>

          <p>
            Jarurat Care is a simple and efficient Patient Records Dashboard .
            It helps healthcare providers manage patient information, view
            details, and add new records easily.
          </p>

          <p>
            This dashboard is designed to improve workflow in clinics by
            allowing quick access to patient data, supporting better
            decision-making, and ensuring no information is lost. Users can
            search patients by name, view detailed records in a modal, and add
            new patients without any backend setup.
          </p>

          <p>
            Jarurat Care is fully responsive, meaning it works seamlessly on
            both desktops and mobile devices. This flexibility allows healthcare
            providers to manage patient records anywhere, anytime.
          </p>
        </section>
      </main>

      {selected && (
        <PatientModal patient={selected} onClose={() => setSelected(null)} />
      )}

      <footer className="footer">© Jarurat Care</footer>
    </div>
  );
}

export default App;
