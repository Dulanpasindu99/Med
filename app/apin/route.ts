import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Handle GET request - fetch all patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
      take: 20, // optional: limit results
    });

    return NextResponse.json(patients);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Handle POST request - add a new patient
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const patient = await prisma.patient.create({ data });
    return NextResponse.json(patient);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
