import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1️⃣ Find or create a demo doctor (temporary placeholder)
    let doctor = await prisma.user.findFirst({
      where: { email: "demo@doctor.com" },
    });

    if (!doctor) {
      doctor = await prisma.user.create({
        data: {
          email: "demo@doctor.com",
          name: "Demo Doctor",
          role: "DOCTOR",
        },
      });
    }

    // 2️⃣ Create the visit safely
    const newVisit = await prisma.visit.create({
      data: {
        patientId: data.patientId,
        reason: data.reason,
        notes: data.notes,
        vitalsJson: data.vitalsJson,
        doctorId: doctor.id,
      },
    });

    return NextResponse.json(newVisit);
  } catch (error) {
    console.error("Error creating visit:", error);
    return NextResponse.json(
      { error: "Failed to create visit" },
      { status: 500 }
    );
  }
}