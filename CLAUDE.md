# CLAUDE.md — Conventions & Setup du projet Atelier Le Gall

## Stack technique

- **Framework** : Next.js 16 (App Router)
- **React** : 19.2 (React Compiler activated)
- **Language** : TypeScript 5
- **Styling** : Tailwind CSS v4 (CSS-first config)
- **Icons** : lucide-react
- **Forms** : React `useActionState` + zod v4
- **Package manager** : npm
- **Node** : v24.x
- **Deployment** : Vercel

## Structure du projet

```
atelielegall/
├── src/
│   ├── app/                          # App Router (pages, layouts, API)
│   │   ├── layout.tsx                # Root layout (Navbar, Footer, JSON-LD)
│   │   ├── page.tsx                  # Accueil
│   │   ├── globals.css               # Tailwind + design system
│   │   ├── fonts.ts                  # Playfair Display + Inter
│   │   ├── api/
│   │   │   ├── contact/route.ts      # Form contact → n8n webhook
│   │   │   └── admin/login/route.ts  # Auth pour panel admin
│   │   ├── services/                 # Page services
│   │   ├── realisations/             # Portfolio filtrable
│   │   │   └── [slug]/page.tsx       # Détail projet (SSG)
│   │   ├── a-propos/                 # À propos de Michaël
│   │   ├── contact/                  # Formulaire + infos
│   │   ├── mentions-legales/
│   │   ├── politique-confidentialite/
│   │   ├── admin/
│   │   │   ├── login/page.tsx        # Page auth (password: 1234)
│   │   │   └── dashboard/page.tsx    # Stats temps réel
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts                # Sitemap dynamique
│   │   └── robots.ts                 # robots.txt
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer, SectionWrapper
│   │   ├── home/                     # HeroSection, ValuesSection, etc.
│   │   ├── realisations/             # ProjectsGrid, ProjectCard
│   │   ├── ui/                       # Button, Card, Badge, etc.
│   │   ├── forms/                    # ContactForm
│   │   └── seo/                      # JsonLd, MetaTags
│   ├── data/
│   │   ├── projects.ts               # 6 réalisations avec détails
│   │   ├── testimonials.ts           # 4 avis clients
│   │   ├── services.ts               # Services + descriptions
│   │   └── team.ts                   # Bio Michaël
│   └── lib/
│       ├── utils.ts                  # cn(), formatPhone()
│       └── types.ts                  # TypeScript interfaces
├── public/
│   ├── images/
│   │   ├── services/                 # 3 images (1800×1200)
│   │   └── portfolio/                # 12 images avant/après (1200×900)
│   └── robots.txt
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── CLAUDE.md                         # Ce fichier
├── PRD.md                            # Product Requirements
└── IMAGES-PROMPTS.md                 # Prompts IA pour les 15 images
```

## Design System

### Couleurs (Bois & Bretagne)

```css
@theme inline {
  /* Primary: Chêne/Noyer profond */
  --color-primary-50: #F4EEE8;
  --color-primary-100: #E9DDD2;
  --color-primary-200: #D3BBA4;
  --color-primary-300: #BD9977;
  --color-primary: #3D2B1F;
  --color-primary-600: #351D12;
  --color-primary-700: #2D150B;
  --color-primary-800: #250D04;

  /* Secondary: Crème */
  --color-secondary: #F5F5DC;

  /* Accent: Vert Forêt Breton */
  --color-accent-50: #E8EFEA;
  --color-accent-100: #D1DDD5;
  --color-accent-200: #A3BBAB;
  --color-accent-300: #759981;
  --color-accent: #4A7C59;
  --color-accent-600: #3A6447;
  --color-accent-700: #2A4C35;
  --color-accent-800: #1A3423;

  /* Accent Alt: Laiton */
  --color-accent-alt: #B8860B;

  /* Surface */
  --color-surface: #FAFAF5;
  --color-surface-2: #F0EDE4;
  --color-text-muted: #7A6658;
  --color-border: #E0D9CE;

  /* Fonts */
  --font-heading: var(--font-playfair), system-ui, serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
}
```

### Typographie

- **Titres** (h1–h6): `Playfair Display` (Bold, Serif)
- **Corps**: `Inter` (Regular, Sans-Serif)
- **Mobile base**: 16px
- **Desktop base**: 18px

### Ombres & Effets

```css
.shadow-premium {
  box-shadow: 0 1px 2px rgba(61, 43, 31, 0.04),
              0 4px 8px rgba(61, 43, 31, 0.06),
              0 16px 32px rgba(61, 43, 31, 0.08);
}

.shadow-premium-lg {
  box-shadow: 0 2px 4px rgba(61, 43, 31, 0.06),
              0 8px 16px rgba(61, 43, 31, 0.08),
              0 24px 48px rgba(61, 43, 31, 0.12);
}

.glass {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
}
```

## Conventions de code

### TypeScript

- Toujours typer les props avec interface
- Pas de `any` — utiliser `unknown` si nécessaire
- Named exports pour les composants, default exports pour les pages
- Strict mode activé

```typescript
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  backgroundImage: string;
}
```

### React Composants

- Un composant = un fichier en `PascalCase.tsx`
- `"use client"` **uniquement** si nécessaire (hooks, handlers)
- Composants serveur par défaut → meilleure perf
- Props déstructurées

```typescript
export default function Button({ label, variant = "primary" }: ButtonProps) {
  return <button className={`btn-${variant}`}>{label}</button>;
}
```

### Tailwind CSS v4

- Utiliser classes utilitaires en priorité
- Design tokens dans `globals.css` via `@theme inline { }`
- Pas de `tailwind.config.ts` (v4 = CSS-first)
- BEM naming pour composants complexes

```tsx
<div className="flex items-center justify-between gap-4 px-6 py-4 rounded-lg bg-surface border border-border">
  <h2 className="text-xl font-heading text-primary">Titre</h2>
  <button className="btn btn-primary">Action</button>
</div>
```

## API Routes

### `/api/contact`

**Method**: POST  
**Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "06 12 34 56 78",
  "subject": "Devis menuiserie",
  "message": "Je souhaite discuter d'un projet de cuisine...",
  "service": "cuisine"
}
```

**Response**:
- Success: `{ success: true, message: "Message envoyé" }`
- Error: `{ success: false, error: "Validation error" }`

**Action**: Envoyer vers webhook n8n (variable `NEXT_PUBLIC_N8N_WEBHOOK`)

### `/api/admin/login`

**Method**: POST  
**Body**:
```json
{ "password": "1234" }
```

**Response**:
- Success: Set cookie `adminAuth=true`, `{ success: true }`
- Error: `{ success: false, error: "Invalid password" }`

## Images — 15 au total

Tous les prompts détaillés dans `IMAGES-PROMPTS.md`.

### Format & Style

- **Format** : JPEG
- **Style** : Photographie professionnelle, éclairage naturel, ultra-réaliste
- **Aucun texte, logo, watermark** sur les images
- **Localisation** : Côtes-d'Armor, Bretagne (architecture locale, lumière naturelle)

### Services (3 images, 1800×1200 3:2)

| Fichier | Description |
|---------|-------------|
| `cuisine-moderne.jpg` | Cuisine ouverte sur living, bois clair, comptoir marbre |
| `escalier-bois.jpg` | Escalier hélicoïdal en bois massif, design épuré |
| `dressing-lumineux.jpg` | Dressing blanc et bois, portes coulissantes miroir |

### Portfolio (12 images, 1200×900 4:3)

#### Projet 1 : Cuisine Contemporaine (Dinan)
| Fichier | Description |
|---------|-------------|
| `cuisine-dinan-avant.jpg` | Cuisine fermée années 1990, éléments vieillis |
| `cuisine-dinan-apres.jpg` | Cuisine ouverte bois/blanc, îlot central, moderne |

#### Projet 2 : Escalier Artisanal (Saint-Brieuc)
| Fichier | Description |
|---------|-------------|
| `escalier-avant.jpg` | Escalier droit bois foncé, rampe classique |
| `escalier-apres.jpg` | Escalier courbe minimaliste, rampe design acier/bois |

#### Projet 3 : Dressing Luxe (Ploërmel)
| Fichier | Description |
|---------|-------------|
| `dressing-avant.jpg` | Chambre sans agencement, placard standard |
| `dressing-apres.jpg` | Dressing sur mesure, portes coulissantes, LED intégrées |

#### Projet 4 : Bibliothèque Murale (Vannes)
| Fichier | Description |
|---------|-------------|
| `bibliotheque-avant.jpg` | Mur vide épuré dans salon |
| `bibliotheque-apres.jpg` | Bibliothèque modulable sol-plafond, bois mixte |

#### Projet 5 : Agencement Salle de Bain (Lannion)
| Fichier | Description |
|---------|-------------|
| `sdb-avant.jpg` | Salle de bain basique, carrelage simple |
| `sdb-apres.jpg` | Meuble vasque sur mesure, miroir bois, aménagement optimisé |

#### Projet 6 : Espace Bureau à Domicile (Guingamp)
| Fichier | Description |
|---------|-------------|
| `bureau-avant.jpg` | Chambre vide, cloison placo |
| `bureau-apres.jpg` | Bureau intégré, étagères murales, chaise design |

---

## Commandes

```bash
npm run dev          # Dev server (Turbopack) → localhost:3000
npm run build        # Build production + sitemap
npm run lint         # ESLint
npm run type-check   # TypeScript strict check
```

## Workflow Git

- Commits conventionnels : `feat:`, `fix:`, `style:`, `refactor:`, `chore:`, `docs:`
- Git config : Thomas Rousseau / agence.celexia@gmail.com
- Branch: `main` (production)
- Backup branches: `dev` (staging), `claude/feature-name`

## Environment Variables

```env
NEXT_PUBLIC_N8N_WEBHOOK=https://your-n8n-instance.com/webhook/contact
ADMIN_PASSWORD=1234
DATABASE_URL=optional_for_future_db
```

## SEO & Accessibility

- `generateMetadata` sur toutes les pages
- `sitemap.ts` auto-génère sitemap complet
- `robots.ts` pour crawler directives
- Schema.org `LocalBusiness` JSON-LD en root layout
- Language: `lang="fr"`
- WCAG 2.1 AA compliance — aria labels, semantic HTML, color contrast

## Performance

- **Next.js Image Optimization** : WebP + AVIF
- **Font Loading** : `font-display: swap`
- **Code Splitting** : Dynamic imports pour heavy components
- **Target Lighthouse** : > 90 all metrics

## Future Roadmap

- **Sprint 2** : Intégration Supabase DB pour formulaires
- **Sprint 3** : Gallery lightbox avec Framer Motion
- **Sprint 4** : Blog intégré + articles SEO
- **Sprint 5** : Chatbot IA pour devis automatisé

---

**Document créé le** : 20/02/2026  
**Version** : 1.0  
**Mainteneur** : Claude + Thomas (Agence Celexia)
