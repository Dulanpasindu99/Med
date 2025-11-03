import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (query.trim().length === 0) {
    return NextResponse.json([]);
  }

  try {
    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: query, mode: "insensitive" } },
          { lastName: { contains: query, mode: "insensitive" } },
          { nic: { contains: query, mode: "insensitive" } },
        ],
      },
      take: 8, // limit results
      select: {
        id: true,
        firstName: true,
        lastName: true,
        nic: true,
      },
    });

    return NextResponse.json(patients);
  } catch (err) {
    console.error("Patient search error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}