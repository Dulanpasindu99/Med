import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "medlink", ts: new Date().toISOString() });
}
