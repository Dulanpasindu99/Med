import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function VisitDetailPage({ params }: { params: { id: string } }) {
  const visit = await prisma.visit.findUnique({
    where: { id: params.id },
    include: {
      patient: true,
      doctor: true,
      prescriptions: {
        include: { items: true },
      },
    },
  });

  if (!visit) return notFound();

  const { patient, doctor } = visit;

  return (
    <div style={container}>
      <h1 style={title}>Visit Details</h1>

      {/* Doctor */}
      <section style={card}>
        <h2 style={cardTitle}>🧑‍⚕️ Doctor</h2>
        <p><strong>Name:</strong> {doctor?.name || "Unknown"}</p>
        <p><strong>Email:</strong> {doctor?.email || "N/A"}</p>
      </section>

      {/* Patient */}
      <section style={card}>
        <h2 style={cardTitle}>👩‍🦰 Patient</h2>
        <p><strong>Name:</strong> {patient?.firstName} {patient?.lastName}</p>
        <p><strong>NIC:</strong> {patient?.nic}</p>
        <p><strong>Phone:</strong> {patient?.phone}</p>
      </section>

      {/* Add Prescription Button */}
      <section style={card}>
        <a
          href={`/visits/${params.id}/new-prescription`}
          style={addButton}
        >
          ➕ Add Prescription
        </a>

        <h2 style={cardTitle}>🩺 Visit Information</h2>
        <p><strong>Visit Date:</strong> {new Date(visit.visitTime).toLocaleString()}</p>
        <p><strong>Reason:</strong> {visit.reason || "No reason provided"}</p>
        <p><strong>Notes:</strong> {visit.notes || "No notes provided"}</p>
      </section>

      {/* Prescriptions Section */}
      <section style={card}>
        <h2 style={cardTitle}>💊 Prescriptions</h2>
        {visit.prescriptions.length === 0 ? (
          <p>No prescriptions added yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {visit.prescriptions.map((p) => (
              <li key={p.id} style={prescriptionItem}>
                <p><strong>Type:</strong> {p.type}</p>
                <p><strong>Note:</strong> {p.note || "No note"}</p>

                {p.items.length > 0 && (
                  <>
                    {p.items.map((item) => {
                      const fileUrl = item.fileUrl || "";
                      const ext = fileUrl.split(".").pop()?.toLowerCase();

                      if (ext === "pdf") {
                        return (
                          <div key={item.id} style={fileBox}>
                            <p>📎 Attached PDF:</p>
                            <iframe
                              src={fileUrl}
                              width="100%"
                              height="300px"
                              style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                marginTop: "0.5rem",
                              }}
                            ></iframe>
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={linkStyle}
                            >
                              🔗 Open PDF in new tab
                            </a>
                          </div>
                        );
                      } else if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
                        return (
                          <div key={item.id} style={fileBox}>
                            <p>🖼️ Attached Image:</p>
                            <Image
                              src={fileUrl}
                              alt="Prescription"
                              width={400}
                              height={300}
                              style={{
                                borderRadius: "10px",
                                objectFit: "contain",
                                marginTop: "0.5rem",
                              }}
                            />
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={linkStyle}
                            >
                              🔗 View Full Image
                            </a>
                          </div>
                        );
                      } else {
                        return (
                          <p key={item.id}>
                            📎 <a href={fileUrl} style={linkStyle}>Download File</a>
                          </p>
                        );
                      }
                    })}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Vitals */}
      {visit.vitalsJson && (
        <section style={card}>
          <h2 style={cardTitle}>❤️ Vitals</h2>
          <pre style={vitalsBox}>
            {JSON.stringify(visit.vitalsJson, null, 2)}
          </pre>
        </section>
      )}

      {/* Back Button */}
      <a href={`/patients/${patient.id}`} style={backButton}>
        ⬅ Back to Patient
      </a>
    </div>
  );
}

/* 🎨 Styling */
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
};

const cardTitle = {
  fontSize: "1.2rem",
  fontWeight: "600",
  marginBottom: "0.5rem",
  color: "#111827",
};

const vitalsBox = {
  background: "#f3f4f6",
  padding: "0.8rem",
  borderRadius: "6px",
  fontSize: "0.9rem",
  overflowX: "auto" as const,
};

const addButton = {
  display: "inline-block",
  background: "#2563eb",
  color: "#fff",
  padding: "0.7rem 1rem",
  borderRadius: "6px",
  textDecoration: "none",
  marginBottom: "1.2rem",
};

const prescriptionItem = {
  background: "#f9fafb",
  padding: "1rem",
  borderRadius: "8px",
  marginBottom: "1rem",
  border: "1px solid #e5e7eb",
};

const linkStyle = {
  display: "inline-block",
  color: "#2563eb",
  textDecoration: "none",
  fontWeight: "500",
  marginTop: "0.5rem",
};

const fileBox = {
  marginTop: "1rem",
  background: "#f3f4f6",
  padding: "1rem",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const backButton = {
  display: "inline-block",
  background: "#111827",
  color: "#fff",
  padding: "0.7rem 1.2rem",
  borderRadius: "6px",
  textDecoration: "none",
  marginTop: "1.5rem",
};