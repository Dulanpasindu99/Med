export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Doctor Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <section className="glass p-5">
          <h2 className="font-medium mb-3">Patient Queue</h2>
          <p className="text-sm text-slate-600">Patients assigned to you will appear here.</p>
        </section>
        <section className="glass p-5">
          <h2 className="font-medium mb-3">Search Patients</h2>
          <form className="flex gap-2">
            <input className="flex-1 border rounded-md px-3 py-2" placeholder="Search by NIC / Name / Mobile" />
            <button className="px-4 py-2 rounded-md bg-sky-500 text-white">Search</button>
          </form>
        </section>
      </div>
    </main>
  );
}
