"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPrescriptionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [type, setType] = useState("CLINICAL");
  const [note, setNote] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleFileUpload() {
    if (!file) return null;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setUploading(false);
    return data.fileUrl;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setSaving(true);

    const fileUrl = await handleFileUpload();

    const res = await fetch("/api/prescriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitId: params.id,
        type,
        note,
        fileUrl,
      }),
    });

    setSaving(false);

    if (res.ok) {
      alert("✅ Prescription added successfully!");
      router.push(`/visits/${params.id}`);
    } else {
      alert("❌ Failed to add prescription");
    }
  }

  return (
    <div style={container}>
      <h1 style={title}>Add New Prescription</h1>

      <form onSubmit={handleSubmit} style={card}>
        <label style={label}>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
          <option value="CLINICAL">Clinical</option>
          <option value="REGULAR">Regular</option>
          <option value="OUTSIDE">Outside</option>
        </select>

        <label style={label}>Note</label>
        <textarea
          placeholder="Prescription details..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={textarea}
        />

        <label style={label}>Attach File (PDF or Image)</label>
        <input
          type="file"
          accept=".pdf,image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
          style={input}
        />

        {preview && (
          <div style={previewBox}>
            {file?.type.includes("pdf") ? (
              <iframe src={preview} width="100%" height="200px" title="preview" />
            ) : (
              <img src={preview} alt="preview" style={{ width: "100%", borderRadius: "8px" }} />
            )}
          </div>
        )}

        <button type="submit" style={submitBtn} disabled={uploading || saving}>
          {uploading
            ? "Uploading..."
            : saving
            ? "Saving..."
            : "💾 Save Prescription"}
        </button>
      </form>

      <a href={`/visits/${params.id}`} style={backBtn}>
        ⬅ Back to Visit
      </a>
    </div>
  );
}

// ---------- Styles ----------
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
  maxWidth: "500px",
};

const label = {
  display: "block",
  fontWeight: "600",
  marginTop: "1rem",
  marginBottom: "0.3rem",
};

const input = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
};

const textarea = {
  width: "100%",
  padding: "0.6rem",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  height: "100px",
};

const previewBox = {
  marginTop: "1rem",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  overflow: "hidden",
};

const submitBtn = {
  marginTop: "1.5rem",
  width: "100%",
  background: "#2563eb",
  color: "#fff",
  padding: "0.8rem",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  cursor: "pointer",
};

const backBtn = {
  display: "inline-block",
  background: "#111827",
  color: "#fff",
  padding: "0.7rem 1.2rem",
  borderRadius: "6px",
  textDecoration: "none",
  marginTop: "1.5rem",
};
