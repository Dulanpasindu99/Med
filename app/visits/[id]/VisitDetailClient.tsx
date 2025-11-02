"use client";

import { useState } from "react";

export default function VisitDetailClient({ visit }: { visit: any }) {
  const { patient, doctor } = visit;
  const [status, setStatus] = useState("");

  async function handleEditPrescription(p: any) {
    const newNote = prompt("Enter updated note:", p.note);
    const newType = prompt("Enter type (REGULAR / CLINICAL / OUTSIDE):", p.type);
    const newFileUrl = prompt("Enter new file URL (optional):", p.items[0]?.fileUrl || "");

    if (!newNote && !newType) return;
    setStatus("Updating...");

    const res = await fetch("/api/prescriptions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: p.id,
        note: newNote,
        type: newType,
        fileUrl: newFileUrl,
      }),
    });

    if (res.ok) {
      alert("✅ Prescription updated");
      location.reload();
    } else {
      alert("❌ Failed to update");
    }
  }

  async function handleDeletePrescription(id: string) {
    if (!confirm("Are you sure you want to delete this prescription?")) return;
    setStatus("Deleting...");

    const res = await fetch("/api/prescriptions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert("🗑️ Prescription deleted");
      location.reload();
    } else {
      alert("❌ Failed to delete");
    }
  }

  return (
    <div style={container}>
      <h1 style={title}>Visit Details</h1>

      <section style={card}>
        <h2 style={cardTitle}>🧑‍⚕️ Doctor</h2>
        <p><strong>Name:</strong> {doctor?.name || "Unknown"}</p>
        <p><strong>Email:</strong> {doctor?.email || "N/A"}</p>
      </section>

      <section style={card}>
        <h2 style={cardTitle}>👩‍🦰 Patient</h2>
        <p><strong>Name:</strong> {patient?.firstName} {patient?.lastName}</p>
        <p><strong>NIC:</strong> {patient?.nic}</p>
        <p><strong>Phone:</strong> {patient?.phone}</p>
      </section>

      <section style={card}>
        <a
          href={`/visits/${visit.id}/new-prescription`}
          style={addBtn}
        >
          ➕ Add Prescription
        </a>

        <h2 style={cardTitle}>🩺 Visit Information</h2>
        <p><strong>Visit Date:</strong> {new Date(visit.visitTime).toLocaleString()}</p>
        <p><strong>Reason:</strong> {visit.reason || "No reason provided"}</p>
        <p><strong>Notes:</strong> {visit.notes || "No notes provided"}</p>
      </section>

      {/* Prescriptions */}
      <section style={card}>
        <h2 style={cardTitle}>💊 Prescriptions</h2>

        {visit.prescriptions.length === 0 ? (
          <p>No prescriptions added yet.</p>
        ) : (
          visit.prescriptions.map((p: any) => (
            <div key={p.id} style={prescriptionItem}>
              <p><strong>Type:</strong> {p.type}</p>
              <p><strong>Note:</strong> {p.note || "No note"}</p>
              {p.items.length > 0 && (
                <a
                  href={p.items[0].fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  📄 View File
                </a>
              )}

              <div style={{ marginTop: "0.6rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleEditPrescription(p)} style={editBtn}>✏️ Edit</button>
                <button onClick={() => handleDeletePrescription(p.id)} style={deleteBtn}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </section>

      {visit.vitalsJson && (
        <section style={card}>
          <h2 style={cardTitle}>❤️ Vitals</h2>
          <pre style={vitalsBox}>
            {JSON.stringify(visit.vitalsJson, null, 2)}
          </pre>
        </section>
      )}

      <a href={`/patients/${patient.id}`} style={backButton}>
        ⬅ Back to Patient
      </a>
    </div>
  );
}

// ---------- STYLES ----------
const container = {
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "system-ui",
  padding: "2rem",
};

const title = {
  fontSize: "1.8rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
};

const card = {
  background: "#fff",
  padding: "1.5rem",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  marginBottom: "1.2rem",
};

const cardTitle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#111827",
};

const addBtn = {
  display: "inline-block",
  background: "#2563eb",
  color: "#fff",
  padding: "0.7rem 1rem",
  borderRadius: "6px",
  textDecoration: "none",
  marginBottom: "1rem",
};

const vitalsBox = {
  background: "#f3f4f6",
  padding: "0.8rem",
  borderRadius: "6px",
  fontSize: "0.9rem",
  overflowX: "auto" as const,
};

const backButton = {
  display: "inline-block",
  background: "#111827",
  color: "#fff",
  padding: "0.7rem 1.2rem",
  borderRadius: "6px",
  textDecoration: "none",
  marginTop: "1.5rem",
};

const prescriptionItem = {
  background: "#f9fafb",
  padding: "0.8rem",
  borderRadius: "6px",
  marginBottom: "0.8rem",
};

const linkStyle = {
  display: "inline-block",
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: "500",
  marginTop: "0.5rem",
};

const editBtn = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "5px",
  cursor: "pointer",
};