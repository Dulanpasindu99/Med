"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 42,
    visits: 8,
    prescriptions: 17,
    tests: 3,
  });

  return (
    <div className="min-h-screen flex bg-animated font-[system-ui]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-10 space-y-8 bg-white/40 backdrop-blur-xl rounded-l-3xl shadow-soft m-4 overflow-y-auto">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">
            Welcome back, Doctor 👨‍⚕️
          </h1>
          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg">
            ➕ New Visit
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-soft hover:scale-[1.02] transition-all cursor-pointer"
            >
              <p className="text-slate-500 capitalize">{key}</p>
              <p className="text-3xl font-bold text-slate-800">{value}</p>
            </div>
          ))}
        </section>

        {/* Today’s Patients */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Today’s Patients</h2>
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-soft p-6">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-600 border-b">
                  <th className="py-2">Name</th>
                  <th className="py-2">NIC</th>
                  <th className="py-2">Reason</th>
                  <th className="py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-slate-50 transition">
                  <td className="py-2">Amali Perera</td>
                  <td>982345678V</td>
                  <td>Fever</td>
                  <td>09:30 AM</td>
                </tr>
                <tr className="border-b hover:bg-slate-50 transition">
                  <td className="py-2">Kavindu Silva</td>
                  <td>200054785V</td>
                  <td>Headache</td>
                  <td>10:15 AM</td>
                </tr>
                <tr>
                  <td className="py-2">Nimali Fernando</td>
                  <td>993654321V</td>
                  <td>Cough</td>
                  <td>11:00 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}