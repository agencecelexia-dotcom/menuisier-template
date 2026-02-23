# Atelier Le Gall — Menuiserie Haut de Gamme

Vitrine web premium pour **Michaël Le Gall**, menuisier artisan en Côtes-d'Armor, Bretagne.

**URL Live** : `https://atelielegall.fr` (Vercel)  
**Contact Client** : 06 73 01 62 37 | atelier.legall22450@gmail.com

---

## 📖 Documentation

| Fichier | Description |
|---------|-------------|
| **[PRD.md](./PRD.md)** | Product Requirements Document — Objectifs, design, stratégie |
| **[CLAUDE.md](./CLAUDE.md)** | Conventions de code, stack technique, structure projet |
| **[IMAGES-PROMPTS.md](./IMAGES-PROMPTS.md)** | Prompts IA détaillés pour les 15 images (1800×1200 et 1200×900) |
| **[IMAGES-TRACKING.csv](./IMAGES-TRACKING.csv)** | Checklist de suivi génération images |

---

## 🚀 Quick Start

### Installation

```bash
# Cloner le repo
git clone https://github.com/agencecelexia-dotcom/atelielegall.git
cd atelielegall

# Installer dépendances
npm install

# Créer .env.local
cat > .env.local << EOF
NEXT_PUBLIC_N8N_WEBHOOK=https://your-n8n-instance.com/webhook/contact
ADMIN_PASSWORD=1234
EOF

# Lancer dev server
npm run dev
```

**URL** : http://localhost:3000

### Build & Deploy

```bash
# Build production
npm run build

# Lancer serveur production local
npm start

# Deploy sur Vercel (préconfiguré)
git push origin main
# Auto-déploie sur Vercel (webhook GitHub)
```

---

## 🎨 Design System

### Couleurs — Bois & Bretagne

```css
Primary:        #3D2B1F  (Chêne profond)
Secondary:      #F5F5DC  (Crème papyrus)
Accent:         #4A7C59  (Vert forêt breton)
Accent Alt:     #B8860B  (Laiton doré)
Surface:        #FAFAF5  (Blanc chaleureux)
```

### Typographie

- **Titres** : Playfair Display (Serif élégante)
- **Corps** : Inter (Sans-serif moderne)

---

## 📸 Images — Workflow

### 1️⃣ Générer les 15 images

Utiliser le fichier `IMAGES-PROMPTS.md` pour les **15 prompts IA détaillés** :
- **3 images** services (1800×1200)
- **12 images** portfolio avant/après (1200×900)

```bash
# Options IA : Midjourney, DALL-E 3, Flux, Leonardo, etc.
# → Générer 15 images avec les prompts fournis
```

### 2️⃣ Organiser les fichiers

```bash
mkdir -p public/images/{services,portfolio}

# Renommer & placer selon IMAGES-TRACKING.csv:
public/images/
├── services/
│   ├── cuisine-moderne.jpg
│   ├── escalier-bois.jpg
│   └── dressing-lumineux.jpg
└── portfolio/
    ├── cuisine-dinan-avant.jpg
    ├── cuisine-dinan-apres.jpg
    ├── escalier-avant.jpg
    ├── escalier-apres.jpg
    ├── dressing-avant.jpg
    ├── dressing-apres.jpg
    ├── bibliotheque-avant.jpg
    ├── bibliotheque-apres.jpg
    ├── sdb-avant.jpg
    ├── sdb-apres.jpg
    ├── bureau-avant.jpg
    └── bureau-apres.jpg
```

### 3️⃣ Optimiser & Commiter

```bash
# Compresser images (optionnel mais recommandé)
# → Garder JPEG, qualité 80-85%, <500KB par image

# Ajouter au git
git add public/images/
git commit -m "feat: add 15 AI-generated images for portfolio"
git push origin main
```

---

## 🔐 Panel Admin

### Accès

```
URL:      http://localhost:3000/admin/login
Password: 1234
```

### Fonctionnalités

- **Statistiques temps réel** : visites, conversions, trafic
- **Pages visitées** : top pages, tendances
- **Formulaires** : soumissions contact, devis
- **Export** : données analytics (CSV)

### Données stockées

`storage/analytics.json` — Suivi :
- `page_view` — Visite page
- `cta_click` — Clic CTA "Devis"
- `form_submit` — Soumission formulaire contact

---

## 📝 Pages & Contenu

### Structure Pages

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Hero + services preview + portfolio + CTA |
| Services | `/services` | Détail 3 services + process |
| Portfolio | `/realisations` | Galerie filtrable 6 projets |
| Projet Détail | `/realisations/[slug]` | Avant/après + description |
| À Propos | `/a-propos` | Bio Michaël + valeurs + équipe |
| Contact | `/contact` | Formulaire + carte + infos |
| Mentions Légales | `/mentions-legales` | Legal |
| Politique Confidentialité | `/politique-confidentialite` | Privacy |

### Contenu Clés

**6 Projets Portfolio** :
1. Cuisine Contemporaine (Dinan)
2. Escalier Artisanal (Saint-Brieuc)
3. Dressing Luxe (Ploërmel)
4. Bibliothèque Murale (Vannes)
5. Agencement Salle de Bain (Lannion)
6. Bureau à Domicile (Guingamp)

**4 Avis Clients** (à adapter avec vrais témoignages) :
```typescript
// src/data/testimonials.ts
{
  name: "Sophie Dubois",
  role: "Propriétaire, Dinan",
  text: "Michaël a transformé notre cuisine. Un artisan vrai, à l'écoute.",
  rating: 5
}
```

---

## 🔗 Intégrations

### Contact Form → n8n

```typescript
// src/app/api/contact/route.ts
POST /api/contact
{
  name, email, phone, subject, message, service
}
→ Webhook n8n (env: NEXT_PUBLIC_N8N_WEBHOOK)
→ Email Michaël + CRM
```

### SEO & Analytics

- **Sitemap** : `/sitemap.xml` (auto-généré)
- **Robots** : `robots.txt` (Crawl directives)
- **JSON-LD** : Schema.org LocalBusiness
- **Open Graph** : Social sharing images

---

## 🛠 Commandes

```bash
npm run dev          # Dev server + Turbopack → localhost:3000
npm run build        # Build production optimisé
npm run start        # Lancer serveur prod
npm run lint         # ESLint check
npm run type-check   # TypeScript strict
```

---

## 📁 Structure Projet

```
src/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Accueil
│   ├── globals.css             # Design system
│   ├── fonts.ts                # Playfair + Inter
│   ├── api/
│   │   ├── contact/route.ts    # Form contact
│   │   └── admin/login/route.ts
│   ├── services/page.tsx
│   ├── realisations/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── a-propos/page.tsx
│   ├── contact/page.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   └── dashboard/page.tsx
│   └── [autres pages]
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CtaSection.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   └── seo/
│       └── JsonLd.tsx
├── data/
│   ├── projects.ts             # 6 réalisations
│   ├── testimonials.ts         # 4 avis
│   ├── services.ts             # Services
│   └── team.ts                 # Bio Michaël
└── lib/
    ├── utils.ts
    └── types.ts

public/
├── images/
│   ├── services/               # 3 images
│   └── portfolio/              # 12 images avant/après
└── robots.txt
```

---

## 🌐 Environnements

### Development

```bash
npm run dev
```

- Turbopack enabled
- Hot reload
- Debug logs
- Localhost:3000

### Production (Vercel)

```bash
npm run build && npm start
```

- Optimized build
- Image compression (WebP/AVIF)
- Sitemap generation
- SEO headers

---

## 🚨 Checklist Pré-Deployment

- [ ] Générer 15 images IA
- [ ] Placer images dans `public/images/{services,portfolio}`
- [ ] Configurer webhook n8n pour contact form
- [ ] Ajouter vraies données testimonials clients
- [ ] Mettre à jour photos Michaël sur `/a-propos`
- [ ] Vérifier liens sociaux (si applicable)
- [ ] Test Lighthouse > 90 tous metrics
- [ ] Test mobile responsive
- [ ] Test form submission
- [ ] Test admin login (password: 1234)
- [ ] Commit & push → auto-deploy Vercel

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 90 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | > 95 |
| Core Web Vitals | Green ✅ |
| Page Load | < 2s |
| Image optimization | AVIF/WebP |

---

## 🔄 Git Workflow

```bash
# Feature branch
git checkout -b feat/new-feature

# Commit conventionnel
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "style: format code"

# Push & PR
git push origin feat/new-feature
# → Create PR on GitHub
# → Review & merge
# → Auto-deploy Vercel
```

---

## 📞 Support & Contact

**Client**  
Michaël Le Gall  
📞 06 73 01 62 37  
📧 atelier.legall22450@gmail.com  

**Agence Celexia**  
Thomas Rousseau  
📧 agence.celexia@gmail.com  
🌐 https://agencecelexia.fr

---

## 📜 License

Propriétaire — Agence Celexia × Atelier Le Gall  
Tous droits réservés 2026

---

**v1.0 — 20/02/2026**
