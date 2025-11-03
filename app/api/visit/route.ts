import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { patientId, reason, visitTime } = await req.json();

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID required" }, { status: 400 });
    }

    // 👇 Fetch first doctor (temporary)
    // Later, this will be replaced with session-based doctor ID.
    const doctor = await prisma.user.findFirst({
      where: { role: "DOCTOR" },
      select: { id: true },
    });

    if (!doctor) {
      return NextResponse.json(
        { error: "No doctor found in database. Please create one first." },
        { status: 404 }
      );
    }

    const newVisit = await prisma.visit.create({
      data: {
        patientId,
        doctorId: doctor.id, // ✅ use real doctor
        reason,
        visitTime: new Date(visitTime),
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    return NextResponse.json(newVisit, { status: 201 });
  } catch (err: any) {
    console.error("🔥 Prisma Visit Error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
