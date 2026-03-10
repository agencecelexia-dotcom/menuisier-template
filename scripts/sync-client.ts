/**
 * sync-client.ts — Template Menuisier
 * Lit CLIENT.md, genere src/config/client.config.ts,
 * puis remplace toutes les valeurs hardcodees du template dans les fichiers .ts/.tsx
 * Usage: npm run sync-client
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
const CLIENT_MD = path.join(ROOT, "CLIENT.md");
const OUTPUT = path.join(ROOT, "src", "config", "client.config.ts");
const SRC_DIR = path.join(ROOT, "src");

/* ------------------------------------------------------------------ */
/*  Utilitaires                                                        */
/* ------------------------------------------------------------------ */

function extractNumber(s: string): number {
  const match = s.match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function phoneToHref(phone: string): string {
  const digits = phone.split(" ").join("");
  if (digits.startsWith("0")) return "tel:+33" + digits.slice(1);
  return "tel:" + digits;
}

function phoneToIntl(phone: string): string {
  const digits = phone.split(" ").join("");
  if (digits.startsWith("0")) return "+33" + digits.slice(1);
  return digits;
}

function phoneToCompact(phone: string): string {
  return phone.split(" ").join("");
}

/** Escape for use inside double-quoted TS strings — uses split/join (no regex) */
function esc(s: string): string {
  return s.split("\\").join("\\\\").split('"').join('\\"');
}

/** Replace all occurrences of `search` with `replace` in `text` using split/join */
function replaceAll(text: string, search: string, replace: string): string {
  if (!search || search === replace) return text;
  return text.split(search).join(replace);
}

/* ------------------------------------------------------------------ */
/*  Parse CLIENT.md                                                    */
/* ------------------------------------------------------------------ */

function parseClientMd(): Map<string, string> {
  const content = fs.readFileSync(CLIENT_MD, "utf-8");
  const rawLines = content.split(/\r?\n/);
  const vars = new Map<string, string>();

  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^([A-Z_0-9]+):\s*"(.*)"$/);
    if (match) vars.set(match[1], match[2]);
  }

  return vars;
}

/* ------------------------------------------------------------------ */
/*  Phase 1: Generate client.config.ts                                 */
/* ------------------------------------------------------------------ */

function generateConfig(vars: Map<string, string>): void {
  const get = (key: string) => vars.get(key) ?? "";

  const telephone = get("TELEPHONE");
  const telephoneHref = phoneToHref(telephone);
  const anneesExperience = extractNumber(get("ANNEES_EXPERIENCE")) || 15;
  const nombreInterventions = extractNumber(get("NOMBRE_INTERVENTIONS")) || 500;
  const noteGoogle = extractNumber(get("NOTE_GOOGLE")) || 4.8;
  const nombreAvis = extractNumber(get("NOMBRE_AVIS")) || 45;
  const tauxSatisfaction = get("TAUX_SATISFACTION").split("%").join("").trim() || "98";
  const anneeCreation = extractNumber(get("ANNEE_CREATION")) || 2010;

  const out: string[] = [];
  out.push("// FICHIER AUTO-GENERE - ne pas modifier manuellement");
  out.push("// Modifie CLIENT.md puis relance : npm run sync-client");
  out.push("");
  out.push("export const clientConfig = {");
  out.push('  NOM_ENTREPRISE: "' + esc(get("NOM_ENTREPRISE")) + '",');
  out.push('  NOM_DIRIGEANT: "' + esc(get("NOM_DIRIGEANT")) + '",');
  out.push('  PRENOM_DIRIGEANT: "' + esc(get("PRENOM_DIRIGEANT")) + '",');
  out.push('  GENRE_DIRIGEANT: "' + esc(get("GENRE_DIRIGEANT") || "masculin") + '",');
  out.push('  TELEPHONE: "' + esc(telephone) + '",');
  out.push('  TELEPHONE_HREF: "' + esc(telephoneHref) + '",');
  out.push('  EMAIL: "' + esc(get("EMAIL")) + '",');
  out.push('  ADRESSE: "' + esc(get("ADRESSE")) + '",');
  out.push('  VILLE: "' + esc(get("VILLE")) + '",');
  out.push('  CODE_POSTAL: "' + esc(get("CODE_POSTAL")) + '",');
  out.push('  DEPARTEMENT: "' + esc(get("DEPARTEMENT")) + '",');
  out.push('  REGION: "' + esc(get("REGION")) + '",');
  out.push('  HORAIRES_SEMAINE: "' + esc(get("HORAIRES_SEMAINE") || "8h - 18h") + '",');
  out.push('  HORAIRES_SAMEDI: "' + esc(get("HORAIRES_SAMEDI") || "9h - 12h") + '",');
  out.push('  HORAIRES_DIMANCHE: "' + esc(get("HORAIRES_DIMANCHE") || "Ferme") + '",');
  out.push("  ANNEES_EXPERIENCE: " + anneesExperience + ",");
  out.push("  NOMBRE_INTERVENTIONS: " + nombreInterventions + ",");
  out.push("  NOTE_GOOGLE: " + noteGoogle + ",");
  out.push("  NOMBRE_AVIS: " + nombreAvis + ",");
  out.push('  TAUX_SATISFACTION: "' + tauxSatisfaction + '",');
  out.push("  ANNEE_CREATION: " + anneeCreation + ",");
  out.push('  SLOGAN: "' + esc(get("SLOGAN")) + '",');
  out.push('  DESCRIPTION_ENTREPRISE: "' + esc(get("DESCRIPTION_ENTREPRISE")) + '",');
  out.push('  META_TITLE: "' + esc(get("META_TITLE")) + '",');
  out.push('  META_DESCRIPTION: "' + esc(get("META_DESCRIPTION")) + '",');
  out.push('  FACEBOOK_URL: "' + esc(get("FACEBOOK_URL")) + '",');
  out.push('  INSTAGRAM_URL: "' + esc(get("INSTAGRAM_URL")) + '",');
  out.push('  GOOGLE_URL: "' + esc(get("GOOGLE_URL")) + '",');
  out.push('  SIRET: "' + esc(get("SIRET")) + '",');
  out.push('  ZONE_INTERVENTION: "' + esc(get("ZONE_INTERVENTION")) + '",');
  out.push('  ZONE_KM: "' + esc(get("ZONE_KM") || "30") + '",');
  out.push("} as const;");
  out.push("");
  out.push("export type ClientConfig = typeof clientConfig;");

  const dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(OUTPUT, out.join("\n"), "utf-8");
  console.log("  [Phase 1] client.config.ts genere -> " + OUTPUT);
}

/* ------------------------------------------------------------------ */
/*  Phase 2: Search-and-replace hardcoded template values              */
/* ------------------------------------------------------------------ */

/** Recursively find all .ts and .tsx files under dir */
function findTsTsxFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, .next, etc.
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "dist") continue;
      results.push(...findTsTsxFiles(fullPath));
    } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Template default values (from menuisier-template).
 * These are the hardcoded values that MUST be replaced with CLIENT.md values.
 */
const TEMPLATE_DEFAULTS = {
  NOM_ENTREPRISE: "Atelier Le Gall",
  PRENOM_DIRIGEANT: "Mickaël",
  NOM_DIRIGEANT: "Le Gall",
  FULL_NAME: "Mickaël Le Gall",
  TELEPHONE: "06 73 01 62 37",
  TELEPHONE_COMPACT: "0673016237",
  TELEPHONE_INTL: "+33673016237",
  EMAIL: "atelier.legall22450@gmail.com",
  CODE_POSTAL: "22450",
  DEPARTEMENT: "Côtes-d'Armor",
  REGION: "Bretagne",
  DOMAIN: "atelielegall.fr",
};

function performReplacements(vars: Map<string, string>): void {
  const get = (key: string) => vars.get(key) ?? "";

  const nomEntreprise = get("NOM_ENTREPRISE");
  const prenomDirigeant = get("PRENOM_DIRIGEANT");
  const nomDirigeant = get("NOM_DIRIGEANT");
  const fullName = prenomDirigeant + " " + nomDirigeant;
  const telephone = get("TELEPHONE");
  const telephoneCompact = phoneToCompact(telephone);
  const telephoneIntl = phoneToIntl(telephone);
  const email = get("EMAIL");
  const codePostal = get("CODE_POSTAL");
  const departement = get("DEPARTEMENT");
  const region = get("REGION");
  const ville = get("VILLE");

  // Build replacement pairs — ORDER MATTERS (longer/more specific first)
  // We replace full name before first name to avoid partial matches
  const replacements: Array<[string, string]> = [];

  // Company name
  if (nomEntreprise && nomEntreprise !== TEMPLATE_DEFAULTS.NOM_ENTREPRISE) {
    replacements.push([TEMPLATE_DEFAULTS.NOM_ENTREPRISE, nomEntreprise]);
  }

  // Full name (before individual first/last names)
  if (fullName.trim() && fullName !== TEMPLATE_DEFAULTS.FULL_NAME) {
    replacements.push([TEMPLATE_DEFAULTS.FULL_NAME, fullName]);
  }

  // Phone variants (specific first)
  if (telephoneIntl && telephoneIntl !== TEMPLATE_DEFAULTS.TELEPHONE_INTL) {
    replacements.push([TEMPLATE_DEFAULTS.TELEPHONE_INTL, telephoneIntl]);
  }
  if (telephoneCompact && telephoneCompact !== TEMPLATE_DEFAULTS.TELEPHONE_COMPACT) {
    replacements.push([TEMPLATE_DEFAULTS.TELEPHONE_COMPACT, telephoneCompact]);
  }
  if (telephone && telephone !== TEMPLATE_DEFAULTS.TELEPHONE) {
    replacements.push([TEMPLATE_DEFAULTS.TELEPHONE, telephone]);
  }

  // Email
  if (email && email !== TEMPLATE_DEFAULTS.EMAIL) {
    replacements.push([TEMPLATE_DEFAULTS.EMAIL, email]);
  }

  // Location - department (includes apostrophe variant)
  if (departement && departement !== TEMPLATE_DEFAULTS.DEPARTEMENT) {
    replacements.push([TEMPLATE_DEFAULTS.DEPARTEMENT, departement]);
    // Also handle HTML entity variant: Côtes-d&apos;Armor -> new dept
    const deptHtmlEntity = TEMPLATE_DEFAULTS.DEPARTEMENT.split("'").join("&apos;");
    const newDeptHtmlEntity = departement.split("'").join("&apos;");
    if (deptHtmlEntity !== TEMPLATE_DEFAULTS.DEPARTEMENT) {
      replacements.push([deptHtmlEntity, newDeptHtmlEntity]);
    }
  }

  // Region
  if (region && region !== TEMPLATE_DEFAULTS.REGION) {
    replacements.push([TEMPLATE_DEFAULTS.REGION, region]);
  }

  // Postal code
  if (codePostal && codePostal !== TEMPLATE_DEFAULTS.CODE_POSTAL) {
    replacements.push([TEMPLATE_DEFAULTS.CODE_POSTAL, codePostal]);
  }

  // First name (standalone — applied AFTER full name replacement)
  if (prenomDirigeant && prenomDirigeant !== TEMPLATE_DEFAULTS.PRENOM_DIRIGEANT) {
    replacements.push([TEMPLATE_DEFAULTS.PRENOM_DIRIGEANT, prenomDirigeant]);
  }

  // Last name — be careful, "Le Gall" is specific enough
  if (nomDirigeant && nomDirigeant !== TEMPLATE_DEFAULTS.NOM_DIRIGEANT) {
    replacements.push([TEMPLATE_DEFAULTS.NOM_DIRIGEANT, nomDirigeant]);
  }

  if (replacements.length === 0) {
    console.log("  [Phase 2] Aucun remplacement necessaire (valeurs identiques au template).");
    return;
  }

  console.log("  [Phase 2] Remplacements a effectuer :");
  for (const [from, to] of replacements) {
    console.log("    " + JSON.stringify(from) + "  ->  " + JSON.stringify(to));
  }

  // Find all .ts/.tsx files
  const files = findTsTsxFiles(SRC_DIR);
  let totalReplacements = 0;
  let filesModified = 0;

  for (const filePath of files) {
    // Skip client.config.ts (already generated)
    if (filePath === OUTPUT) continue;

    let content = fs.readFileSync(filePath, "utf-8");
    const originalContent = content;

    for (const [from, to] of replacements) {
      content = replaceAll(content, from, to);
    }

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, "utf-8");
      filesModified++;
      // Count changes
      const relPath = path.relative(ROOT, filePath);
      // Rough count: compare lengths and occurrences
      let changes = 0;
      for (const [from] of replacements) {
        let idx = 0;
        let searchIn = originalContent;
        while (true) {
          const found = searchIn.indexOf(from, idx);
          if (found === -1) break;
          changes++;
          idx = found + from.length;
        }
      }
      totalReplacements += changes;
      console.log("    Modifie: " + relPath + " (" + changes + " remplacements)");
    }
  }

  console.log("  [Phase 2] Termine: " + filesModified + " fichiers modifies, " + totalReplacements + " remplacements au total.");
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

function main() {
  console.log("sync-client.ts — Template Menuisier");
  console.log("====================================");

  if (!fs.existsSync(CLIENT_MD)) {
    console.warn("CLIENT.md introuvable - conserve config existante.");
    if (fs.existsSync(OUTPUT)) {
      console.log("client.config.ts existant conserve.");
    }
    process.exit(0);
  }

  const vars = parseClientMd();
  console.log("CLIENT.md lu (" + vars.size + " variables)");

  // Phase 1: Generate client.config.ts
  generateConfig(vars);

  // Phase 2: Replace all hardcoded template values in src/**/*.{ts,tsx}
  performReplacements(vars);

  console.log("====================================");
  console.log("Sync termine avec succes !");
}

main();
