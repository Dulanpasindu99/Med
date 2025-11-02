"use client";
import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState<any[]>([]);

  async function fetchPatients() {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f9fafb", fontFamily: "system-ui" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111827",
          color: "#fff",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "bold", marginBottom: "1.5rem" }}>🩺 MedLink</h2>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <a href="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>🏠 Dashboard</a>
            <a href="/patients" style={{ color: "#e5e7eb", textDecoration: "none" }}>👨‍⚕️ Patients</a>
            <a href="#" style={{ color: "#e5e7eb", textDecoration: "none" }}>💊 Prescriptions</a>
            <a href="#" style={{ color: "#e5e7eb", textDecoration: "none" }}>🧪 Tests</a>
          </nav>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "2rem" }}>v1.0.0</p>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: "2rem" }}>
        {/* Add New Patient Button */}
        <a
          href="/patients/new"
          style={{
            display: "inline-block",
            marginBottom: "1rem",
            background: "#111827",
            color: "#fff",
            padding: "0.6rem 1rem",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          ➕ Add New Patient
        </a>

        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>Doctor Dashboard</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Welcome back, Doctor 👋 — here's your daily overview.
        </p>

        {/* Statistic cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.2rem",
            marginBottom: "2rem",
          }}
        >
          <div style={cardStyle}>
            <h3 style={cardTitle}>Total Patients</h3>
            <p style={cardValue}>{patients.length}</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Today's Visits</h3>
            <p style={cardValue}>4</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Pending Tests</h3>
            <p style={cardValue}>2</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Prescriptions</h3>
            <p style={cardValue}>7</p>
          </div>
        </section>

        {/* Patient Queue */}
        <section>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Patient Queue</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={thStyle}>NIC</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", padding: "1rem", color: "#6b7280" }}>
                    No patients yet.
                  </td>
                </tr>
              ) : (
                patients.map((p) => (
                  <tr key={p.id}>
                    <td style={tdStyle}>{p.nic}</td>

                    {/* 👇 Clickable Name Cell */}
                    <td style={tdStyle}>
  <a
    href={`/patients/${p.id}`}
    style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500" }}
  >
    {`${p.firstName} ${p.lastName || ""}`}
  </a>
</td>


                    <td style={tdStyle}>{p.phone || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

/* ---------- STYLES ---------- */
const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  padding: "1.2rem",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
};

const cardTitle = {
  fontSize: "0.9rem",
  color: "#6b7280",
  marginBottom: "0.3rem",
};

const cardValue = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#111827",
};

const thStyle = {
  textAlign: "left" as const,
  padding: "0.8rem",
  borderBottom: "2px solid #e5e7eb",
};

const tdStyle = {
  padding: "0.8rem",
  borderBottom: "1px solid #f3f4f6",
};