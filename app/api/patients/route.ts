import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Get all patients
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 });
  }
}

// Create new patient
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const newPatient = await prisma.patient.create({
      data: {
        nic: data.nic,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
      },
    });

    return NextResponse.json(newPatient);
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 });
  }
}