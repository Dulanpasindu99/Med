import React from "react";

async function getPatients() {
  const res = await fetch("http://localhost:3000/api/patients", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export default async function PatientsPage() {
  const patients = await getPatients();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>👩‍⚕️ Patient List</h1>
      <p>Connected directly to your Supabase database via Prisma</p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1.5rem",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                borderBottom: "2px solid #ddd",
                padding: "0.5rem",
              }}
            >
              NIC
            </th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "0.5rem" }}>
              First Name
            </th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "0.5rem" }}>
              Last Name
            </th>
            <th style={{ borderBottom: "2px solid #ddd", padding: "0.5rem" }}>
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: "1rem", textAlign: "center" }}>
                No patients found
              </td>
            </tr>
          )}
          {patients.map((p: any) => (
            <tr key={p.id}>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {p.nic}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {p.firstName}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {p.lastName || "-"}
              </td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #eee" }}>
                {p.phone || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
