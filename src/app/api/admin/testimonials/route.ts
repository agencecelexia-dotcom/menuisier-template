import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readData, writeData } from "@/lib/storage";
import { testimonials as defaultTestimonials } from "@/data/testimonials";
import { Testimonial } from "@/lib/types";

const FILE = "testimonials.json";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("adminAuth")?.value === "true";
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const data = readData<Testimonial[]>(FILE, defaultTestimonials);
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await request.json();
  const items = readData<Testimonial[]>(FILE, defaultTestimonials);

  if (body.action === "delete") {
    const filtered = items.filter((item) => item.id !== body.id);
    writeData(FILE, filtered);
    return NextResponse.json({ success: true });
  }

  const existing = items.findIndex((item) => item.id === body.data?.id);
  if (existing >= 0) {
    items[existing] = body.data;
  } else {
    items.push(body.data);
  }
  writeData(FILE, items);
  return NextResponse.json({ success: true });
}
