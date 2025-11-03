"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      setMessage("✅ Logged in successfully!");
      router.push("/dashboard");
    } else {
      setMessage("❌ Invalid email or password!");
    }

    setLoading(false);
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-animated">
  <div className="glass-card glass-gradient p-10 w-full max-w-md transition-all duration-500 hover:scale-[1.01]">
    <h1 className="text-3xl font-extrabold text-slate-800 text-center mb-2">
      Doctor Login 💧
    </h1>
    <p className="text-center text-slate-600 mb-6">
      Sign in to access your MedLink dashboard
    </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
  {loading ? "Signing in..." : "Sign In"}
</button>

        </form>

        {message && (
          <p className="text-center text-slate-700 mt-4 font-medium">{message}</p>
        )}

        <p className="text-center text-slate-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-sky-600 hover:underline font-semibold">
            Sign up
          </a>
        </p>

        <footer className="text-center text-slate-400 text-sm mt-8">
          © 2025 MedLink • Designed with 💙
        </footer>
      </div>
    </div>
  );
}