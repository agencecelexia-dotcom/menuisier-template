/**
 * sync-client.ts -- Template Menuisier
 * Lit CLIENT.md et genere src/config/client.config.ts
 * + remplace les valeurs par defaut dans tous les fichiers source
 * Usage: npm run sync-client
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const CLIENT_MD = path.join(ROOT, "CLIENT.md");
const OUTPUT = path.join(ROOT, "src", "config", "client.config.ts");

function extractNumber(s: string): number {
  const m = s.match(/[\d.]+/);
  return m ? Number(m[0]) : 0;
}

function phoneToHref(phone: string): string {
  const digits = phone.replace(/\s+/g, "");
  if (digits.startsWith("0")) return "tel:+33" + digits.slice(1);
  return "tel:" + digits;
}

function esc(s: string): string {
  return s.split("\\").join("\\\\").split('"').join('\\"').split("\n").join("\\n");
}

function replaceInFile(filePath: string, replacements: [string, string][]) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf-8");
  let changed = false;
  for (const [from, to] of replacements) {
    if (from && to && content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log("  Updated: " + path.relative(ROOT, filePath));
  }
}

function walkFiles(dir: string, ext: string[]): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      results.push(...walkFiles(fullPath, ext));
    } else if (entry.isFile() && ext.some(e => entry.name.endsWith(e))) {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  if (!fs.existsSync(CLIENT_MD)) {
    console.warn("CLIENT.md introuvable - conserve config existante.");
    process.exit(0);
  }

  const content = fs.readFileSync(CLIENT_MD, "utf-8");
  const rawLines = content.split(/\r?\n/);
  const vars = new Map<string, string>();
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Z_0-9]+):\s*"(.*)"$/);
    if (match) vars.set(match[1], match[2]);
  }
  console.log("CLIENT.md lu (" + vars.size + " variables)");
  const get = (key: string, fb = "") => vars.get(key) || fb;

  const telephone = get("TELEPHONE", "00 00 00 00 00");
  const telephoneHref = phoneToHref(telephone);
  const anneesExperience = extractNumber(get("ANNEES_EXPERIENCE")) || 15;
  const nombreInterventions = extractNumber(get("NOMBRE_INTERVENTIONS")) || 500;
  const noteGoogle = extractNumber(get("NOTE_GOOGLE")) || 4.8;
  const nombreAvis = extractNumber(get("NOMBRE_AVIS")) || 45;
  const tauxSatisfaction = get("TAUX_SATISFACTION").replace(/%/g, "").trim() || "98";
  const anneeCreation = extractNumber(get("ANNEE_CREATION")) || 2010;
  const nom = get("NOM_ENTREPRISE", "Mon Entreprise");
  const prenom = get("PRENOM_DIRIGEANT", "Prenom");
  const nomDir = get("NOM_DIRIGEANT", "Nom");
  const ville = get("VILLE", "Paris");
  const dept = get("DEPARTEMENT", "Paris");
  const regionVal = get("REGION", "Ile-de-France");
  const email = get("EMAIL", "contact@example.com");
  const cp = get("CODE_POSTAL", "75001");
  const adresse = get("ADRESSE", "1 rue Exemple");

  // 1. Generate client.config.ts
  const configDir = path.dirname(OUTPUT);
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  const out: string[] = [];
  out.push("// FICHIER AUTO-GENERE - ne pas modifier manuellement");
  out.push("// Modifie CLIENT.md puis relance : npm run sync-client");
  out.push("");
  out.push("export const clientConfig = {");
  out.push(`  NOM_ENTREPRISE: "${esc(nom)}",`);
  out.push(`  NOM_DIRIGEANT: "${esc(nomDir)}",`);
  out.push(`  PRENOM_DIRIGEANT: "${esc(prenom)}",`);
  out.push(`  GENRE_DIRIGEANT: "${esc(get("GENRE_DIRIGEANT", "masculin"))}",`);
  out.push(`  TELEPHONE: "${esc(telephone)}",`);
  out.push(`  TELEPHONE_HREF: "${esc(telephoneHref)}",`);
  out.push(`  EMAIL: "${esc(email)}",`);
  out.push(`  ADRESSE: "${esc(adresse)}",`);
  out.push(`  VILLE: "${esc(ville)}",`);
  out.push(`  CODE_POSTAL: "${esc(cp)}",`);
  out.push(`  DEPARTEMENT: "${esc(dept)}",`);
  out.push(`  REGION: "${esc(regionVal)}",`);
  out.push(`  HORAIRES_SEMAINE: "${esc(get("HORAIRES_SEMAINE", "8h - 18h"))}",`);
  out.push(`  HORAIRES_SAMEDI: "${esc(get("HORAIRES_SAMEDI", "9h - 12h"))}",`);
  out.push(`  HORAIRES_DIMANCHE: "${esc(get("HORAIRES_DIMANCHE", "Ferme"))}",`);
  out.push(`  ANNEES_EXPERIENCE: ${anneesExperience},`);
  out.push(`  NOMBRE_INTERVENTIONS: ${nombreInterventions},`);
  out.push(`  NOTE_GOOGLE: ${noteGoogle},`);
  out.push(`  NOMBRE_AVIS: ${nombreAvis},`);
  out.push(`  TAUX_SATISFACTION: "${tauxSatisfaction}",`);
  out.push(`  ANNEE_CREATION: ${anneeCreation},`);
  out.push(`  SLOGAN: "${esc(get("SLOGAN", "Votre artisan de confiance"))}",`);
  out.push(`  DESCRIPTION_ENTREPRISE: "${esc(get("DESCRIPTION_ENTREPRISE", "Entreprise artisanale."))}",`);
  out.push(`  META_TITLE: "${esc(get("META_TITLE", "Artisan - Devis Gratuit"))}",`);
  out.push(`  META_DESCRIPTION: "${esc(get("META_DESCRIPTION", "Artisan professionnel. Devis gratuit."))}",`);
  out.push(`  FACEBOOK_URL: "${esc(get("FACEBOOK_URL"))}",`);
  out.push(`  INSTAGRAM_URL: "${esc(get("INSTAGRAM_URL"))}",`);
  out.push(`  GOOGLE_URL: "${esc(get("GOOGLE_REVIEWS_URL") || get("GOOGLE_URL"))}",`);
  out.push("} as const;");
  out.push("export type ClientConfig = typeof clientConfig;");
  fs.writeFileSync(OUTPUT, out.join("\n") + "\n", "utf-8");
  console.log("client.config.ts genere -> " + OUTPUT);

  // 2. Global search-and-replace for hardcoded template defaults
  console.log("\nRemplacement des valeurs par defaut...");

  // Template defaults for menuisier-template (Atelier Le Gall)
  const fullName = prenom + " " + nomDir;
  const phoneDigits = telephone.replace(/\s+/g, "");
  const phoneHrefClean = telephoneHref.replace("tel:", "");
  const domain = nom.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "").replace(/^-|-$/g, "") + ".fr";

  const replacements: [string, string][] = [
    // Company name
    ["Atelier Le Gall", nom],
    // Owner name
    ["Micka\u00ebl Le Gall", fullName],
    ["Micka\u00ebl", prenom],
    // Phone
    ["0673016237", phoneDigits],
    ["06 73 01 62 37", telephone],
    ["tel:0673016237", telephoneHref],
    // Email
    ["atelier.legall22450@gmail.com", email],
    // Location
    ["C\u00f4tes-d'Armor", dept],
    ["C\u00f4tes-d&apos;Armor", dept],
    ["Cotes-d'Armor", dept],
    ["22450", cp],
    ["Bretagne", regionVal],
    // Domain
    ["atelielegall.fr", domain],
    // Pommerit-le-Vicomte (if present)
    ["Pommerit-le-Vicomte", ville],
    ["Pommerit", ville],
  ];

  const allFiles = walkFiles(path.join(ROOT, "src"), [".tsx", ".ts"]);
  for (const file of allFiles) {
    // Skip the generated config file
    if (file === OUTPUT) continue;
    replaceInFile(file, replacements);
  }

  console.log("\nSynchronisation terminee !");
}

main();