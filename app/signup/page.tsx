"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Account created successfully!");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(`❌ ${data.error || "Signup failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated">
      <div className="glass-card glass-gradient p-10 w-full max-w-md transition-all duration-500 hover:scale-[1.01]">
        <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
          Doctor Signup 🩺
        </h1>
        <p className="text-center text-slate-600 mb-6">
          Create your MedLink account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-sky-400 to-blue-500 text-white py-3 rounded-xl font-semibold 
                       hover:opacity-90 transition-all shadow-md hover:shadow-lg"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {message && (
          <p className="text-center text-slate-700 mt-4 font-medium">{message}</p>
        )}

        <p className="text-center text-slate-600 mt-6 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-sky-600 hover:underline font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}