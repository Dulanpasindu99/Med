export default function Sidebar() {
  return (
    <aside className="w-64 bg-white/40 backdrop-blur-xl shadow-soft p-6 flex flex-col justify-between border-r border-white/20">
      <div>
        <h2 className="text-2xl font-extrabold text-sky-600 mb-10">🩺 MedLink</h2>
        <nav className="space-y-3">
          <a href="/dashboard" className="block text-slate-700 font-medium hover:text-sky-600 transition">🏠 Dashboard</a>
          <a href="/patients" className="block text-slate-700 font-medium hover:text-sky-600 transition">👨‍⚕️ Patients</a>
          <a href="/visits" className="block text-slate-700 font-medium hover:text-sky-600 transition">📅 Visits</a>
          <a href="/prescriptions" className="block text-slate-700 font-medium hover:text-sky-600 transition">💊 Prescriptions</a>
          <a href="/tests" className="block text-slate-700 font-medium hover:text-sky-600 transition">🧪 Tests</a>
        </nav>
      </div>

      <footer className="text-slate-500 text-sm mt-10">
        v1.0.0 <br /> © MedLink 2025
      </footer>
    </aside>
  );
}