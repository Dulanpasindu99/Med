"use client";
import { useState, useEffect } from "react";

export default function NewVisitModal({ open, onClose, onSave }: any) {
  const [form, setForm] = useState({
    patientId: "",
    reason: "",
    visitTime: new Date().toISOString().slice(0, 16),
  });
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) {
      setPatients([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/patients/search?q=${query}`);
        const data = await res.json();
        setPatients(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 400); // debounce typing delay

    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Visit created successfully!");
        onSave();
        setTimeout(() => onClose(), 1000);
      } else {
        setMessage(`❌ ${data.error || "Failed to save visit"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          ➕ New Visit
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative">
          {/* Patient Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search patient by name or NIC"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="p-3 w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-400 outline-none"
              onFocus={() => query && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              required
            />

            {showDropdown && patients.length > 0 && (
              <ul className="absolute bg-white/90 backdrop-blur-lg border border-slate-200 rounded-lg shadow-lg mt-1 w-full max-h-56 overflow-y-auto z-10">
                {patients.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => {
                      setForm({ ...form, patientId: p.id });
                      setQuery(`${p.firstName} ${p.lastName} (${p.nic})`);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 hover:bg-sky-50 cursor-pointer text-slate-700"
                  >
                    <span className="font-medium">{p.firstName} {p.lastName}</span> — <span className="text-slate-500 text-sm">{p.nic}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="text"
            placeholder="Reason for visit"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          <input
            type="datetime-local"
            value={form.visitTime}
            onChange={(e) => setForm({ ...form, visitTime: e.target.value })}
            className="p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Create Visit"}
          </button>
        </form>

        {message && (
          <p className="text-center text-slate-700 mt-4 font-medium">{message}</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-slate-500 hover:text-slate-700 font-medium block mx-auto"
        >
          ✖ Cancel
        </button>
      </div>
    </div>
  );
}
