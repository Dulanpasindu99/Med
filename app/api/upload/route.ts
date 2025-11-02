import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    // Create uploads folder if missing
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = path.extname(file.name);
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(uploadDir, filename);

    // Save the file
    await fs.promises.writeFile(filepath, buffer);

    // Return the file URL
    const fileUrl = `/uploads/${filename}`;
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}