import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// ✅ CREATE Prescription
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newPrescription = await prisma.prescription.create({
      data: {
        visitId: data.visitId,
        type: data.type,
        note: data.note,
        items: {
          create: data.fileUrl ? [{ fileUrl: data.fileUrl }] : [],
        },
      },
      include: { items: true },
    });
    return NextResponse.json(newPrescription);
  } catch (error) {
    console.error("Error creating prescription:", error);
    return NextResponse.json(
      { error: "Failed to create prescription" },
      { status: 500 }
    );
  }
}

// 📝 UPDATE Prescription
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const updatedPrescription = await prisma.prescription.update({
      where: { id: data.id },
      data: {
        type: data.type,
        note: data.note,
        items: {
          deleteMany: {}, // Remove old file entries
          create: data.fileUrl ? [{ fileUrl: data.fileUrl }] : [],
        },
      },
      include: { items: true },
    });
    return NextResponse.json(updatedPrescription);
  } catch (error) {
    console.error("Error updating prescription:", error);
    return NextResponse.json(
      { error: "Failed to update prescription" },
      { status: 500 }
    );
  }
}

// ❌ DELETE Prescription
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.prescription.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Prescription deleted successfully" });
  } catch (error) {
    console.error("Error deleting prescription:", error);
    return NextResponse.json(
      { error: "Failed to delete prescription" },
      { status: 500 }
    );
  }
}