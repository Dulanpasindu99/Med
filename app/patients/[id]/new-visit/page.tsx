"use client";
import { useState } from "react";

export default function NewVisitPage({ params }: { params: { id: string } }) {
  const [form, setForm] = useState({
    reason: "",
    notes: "",
    vitals: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: params.id,
          reason: form.reason,
          notes: form.notes,
          vitalsJson: form.vitals ? JSON.parse(form.vitals) : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to create visit");
      setMessage("✅ Visit added successfully!");
      setForm({ reason: "", notes: "", vitals: "" });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create visit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={container}>
      <h1 style={title}>🩺 Add New Visit</h1>
      <form onSubmit={handleSubmit} style={formBox}>
        <label style={label}>Reason</label>
        <input
          style={input}
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          required
        />
        <label style={label}>Notes</label>
        <textarea
          style={{ ...input, height: "100px" }}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <label style={label}>Vitals (JSON optional)</label>
        <textarea
          style={{ ...input, height: "80px" }}
          placeholder='{"bp":"120/80","temp":"98.6"}'
          value={form.vitals}
          onChange={(e) => setForm({ ...form, vitals: e.target.value })}
        />
        <button type="submit" style={button} disabled={loading}>
          {loading ? "Saving..." : "Save Visit"}
        </button>
      </form>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

const container = {
  background: "#f9fafb",
  minHeight: "100vh",
  fontFamily: "system-ui",
  padding: "2rem",
};

const title = {
  fontSize: "1.6rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const formBox = {
  background: "#fff",
  padding: "1.5rem",
  borderRadius: "10px",
  maxWidth: "500px",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
};

const label = { display: "block", marginTop: "1rem", marginBottom: "0.3rem" };
const input = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #ddd",
};
const button = {
  marginTop: "1rem",
  background: "#111827",
  color: "#fff",
  padding: "0.7rem 1.2rem",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};