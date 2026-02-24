import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readData, writeData } from "@/lib/storage";

const FILE = "content.json";

interface SiteContent {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  aboutTitle: string;
  aboutDescription: string;
  metaTitle: string;
  metaDescription: string;
  footerText: string;
  openingHours: string;
}

const DEFAULT_CONTENT: SiteContent = {
  siteName: "Atelier Le Gall",
  phone: "06 73 01 62 37",
  email: "atelier.legall22450@gmail.com",
  address: "Côtes-d'Armor, Bretagne",
  heroTitle: "Menuisier Artisan d'Exception",
  heroSubtitle:
    "Cuisines sur mesure, escaliers, dressings et agencements intérieurs haut de gamme en Bretagne",
  heroCta: "Demander un Devis Gratuit",
  aboutTitle: "Mickaël Le Gall — Menuisier Artisan",
  aboutDescription:
    "Plus de 20 ans d'expérience dans la menuiserie haut de gamme. Chaque projet est unique, conçu et réalisé avec passion.",
  metaTitle: "Atelier Le Gall | Menuisier Artisan en Bretagne",
  metaDescription:
    "Menuisier artisan en Côtes-d'Armor. Cuisines sur mesure, escaliers, dressings, bibliothèques. Devis gratuit.",
  footerText:
    "Menuiserie artisanale d'exception en Bretagne. Chaque projet est unique.",
  openingHours: "Lun-Ven: 8h-18h | Sam: Sur RDV",
};

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("adminAuth")?.value === "true";
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const data = readData<SiteContent>(FILE, DEFAULT_CONTENT);
  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const body = await request.json();
  writeData(FILE, body.data);
  return NextResponse.json({ success: true });
}
