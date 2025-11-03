import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Count totals
    const patients = await prisma.patient.count();
    const visits = await prisma.visit.count();
    const prescriptions = await prisma.prescription.count();
    const tests = await prisma.test.count();

    // Get today's patients
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayVisits = await prisma.visit.findMany({
      where: {
        visitTime: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        patient: true,
      },
    });

    return NextResponse.json({
      stats: { patients, visits, prescriptions, tests },
      todayVisits,
    });
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}