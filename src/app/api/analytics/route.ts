import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const ANALYTICS_FILE = path.join(process.cwd(), "storage", "analytics.json");

async function ensureFile() {
  try {
    await fs.access(ANALYTICS_FILE);
  } catch {
    await fs.mkdir(path.dirname(ANALYTICS_FILE), { recursive: true });
    await fs.writeFile(ANALYTICS_FILE, JSON.stringify([]));
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureFile();
    const event = await request.json();

    const data = JSON.parse(await fs.readFile(ANALYTICS_FILE, "utf-8"));
    data.push({
      ...event,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || "",
      referrer: request.headers.get("referer") || "",
    });

    await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check admin auth
    const adminCookie = request.cookies.get("adminAuth");
    if (!adminCookie || adminCookie.value !== "true") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    await ensureFile();
    const data = JSON.parse(await fs.readFile(ANALYTICS_FILE, "utf-8"));

    return NextResponse.json({ success: true, events: data });
  } catch {
    return NextResponse.json({ success: false, events: [] }, { status: 500 });
  }
}
