import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

interface PatientPageProps {
  params: {
    id: string;
  };
}

export default async function PatientProfilePage({ params }: PatientPageProps) {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
    include: {
      allergies: true,
      visits: {
        include: {
          prescriptions: true,
          tests: true,
        },
      },
    },
  });

  if (!patient) return notFound();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#f9fafb",
        fontFamily: "system-ui",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#111827",
          color: "#fff",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            🩺 MedLink
          </h2>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.8rem",
            }}
          >
            <a href="/" style={{ color: "#e5e7eb", textDecoration: "none" }}>
              🏠 Dashboard
            </a>
            <a
              href="/patients"
              style={{ color: "#e5e7eb", textDecoration: "none" }}
            >
              👨‍⚕️ Patients
            </a>
          </nav>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#9ca3af", marginTop: "2rem" }}>
          v1.0.0
        </p>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: "2rem" }}>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          {patient.firstName} {patient.lastName}
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>
          Patient ID: {patient.id}
        </p>

        {/* Basic Info */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.2rem",
            marginBottom: "2rem",
          }}
        >
          <div style={cardStyle}>
            <h3 style={cardTitle}>NIC</h3>
            <p style={cardValue}>{patient.nic}</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Phone</h3>
            <p style={cardValue}>{patient.phone || "-"}</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Address</h3>
            <p style={cardValue}>{patient.address || "-"}</p>
          </div>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Blood Group</h3>
            <p style={cardValue}>{patient.bloodGroup || "Unknown"}</p>
          </div>
        </section>

        <a
  href={`/patients/${patient.id}/new-visit`}
  style={{
    display: "inline-block",
    background: "#111827",
    color: "#fff",
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    textDecoration: "none",
    marginBottom: "1.5rem",
  }}
>
  ➕ Add New Visit
</a>


        {/* Allergies */}
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Allergies</h2>
          {patient.allergies.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No known allergies.</p>
          ) : (
            <ul>
              {patient.allergies.map((a) => (
                <li key={a.id} style={{ color: "#374151" }}>
                  ⚠️ {a.name} — {a.description || ""}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Visits */}
<section style={{ marginTop: "2rem" }}>
  <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Visits</h2>

  {patient.visits.length === 0 ? (
    <p>No visits recorded yet.</p>
  ) : (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {patient.visits.map((v) => (
        <li key={v.id} style={{ marginBottom: "0.8rem" }}>
          <a
            href={`/visits/${v.id}`}
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            {v.reason || "Visit"} — {new Date(v.visitTime).toLocaleDateString()}
          </a>
        </li>
      ))}
    </ul>
  )}
</section>

      </main>
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  borderRadius: "8px",
  padding: "1.2rem",
  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
};

const cardTitle = {
  fontSize: "0.9rem",
  color: "#6b7280",
  marginBottom: "0.3rem",
};

const cardValue = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#111827",
};