"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPatientPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nic: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save patient");

      await res.json();
      router.push("/"); // ✅ Redirect to dashboard
    } catch (err) {
      console.error("Error adding patient:", err);
      setError("Failed to save patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f9fafb",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          width: "400px",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "bold", textAlign: "center" }}>
          ➕ Add New Patient
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {["nic", "firstName", "lastName", "phone", "address"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
              value={(formData as any)[field]}
              onChange={handleChange}
              required={["nic", "firstName"].includes(field)}
              style={{
                padding: "0.75rem",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                outline: "none",
                fontSize: "0.95rem",
              }}
            />
          ))}
        </div>

        {error && (
          <p style={{ color: "red", fontSize: "0.85rem", marginTop: "0.5rem" }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1.5rem",
            background: loading ? "#9ca3af" : "#111827",
            color: "#fff",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "none",
            width: "100%",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save Patient"}
        </button>
      </form>
    </div>
  );
}