export default function AssistantPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Assistant Intake</h1>
      <section className="glass p-5">
        <form className="grid md:grid-cols-2 gap-4">
          <input className="border rounded-md px-3 py-2" placeholder="NIC" />
          <input className="border rounded-md px-3 py-2" placeholder="First name" />
          <input className="border rounded-md px-3 py-2" placeholder="Last name" />
          <input className="border rounded-md px-3 py-2" placeholder="Mobile" />
          <input className="border rounded-md px-3 py-2" placeholder="Blood group" />
          <input className="border rounded-md px-3 py-2" placeholder="Allergies" />
          <button className="px-4 py-2 rounded-md bg-sky-500 text-white md:col-span-2">Create / Update</button>
        </form>
      </section>
    </main>
  );
}
