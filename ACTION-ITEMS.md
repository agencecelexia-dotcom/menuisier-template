# 🚀 ACTION ITEMS — Prochaines Étapes Atelier Le Gall

## ✅ Statut Actuel

**Documentation complète** ✓
- PRD.md → Spécifications produit détaillées
- CLAUDE.md → Stack technique & conventions
- IMAGES-PROMPTS.md → 15 prompts IA (3:2 + 4:3)
- DATA-CONTENU.md → Projets, avis, services
- README.md → Guide complet
- IMAGES-TRACKING.csv → Checklist images

**Analyses** ✓
- ✓ Repo maçonnerie (Le Pober) → Structure, admin panel, analytics
- ✓ Repo menuisier (L'Art du Bois) → Design, couleurs, typographie
- ✓ Fusion optimale → Disposition maçon + palette menuisier

---

## 📸 PHASE 1 — Générer Images (PRIORITÉ 1)

### À faire tout de suite

**Générer 15 images IA** via Midjourney / DALL-E 3 / Flux / Leonardo :

```
3 Images Services (1800×1200 3:2)
✓ cuisine-moderne.jpg
✓ escalier-bois.jpg
✓ dressing-lumineux.jpg

12 Images Portfolio (1200×900 4:3)
✓ cuisine-dinan-avant.jpg
✓ cuisine-dinan-apres.jpg
✓ escalier-avant.jpg
✓ escalier-apres.jpg
✓ dressing-avant.jpg
✓ dressing-apres.jpg
✓ bibliotheque-avant.jpg
✓ bibliotheque-apres.jpg
✓ sdb-avant.jpg
✓ sdb-apres.jpg
✓ bureau-avant.jpg
✓ bureau-apres.jpg
```

**Utiliser fichier** : `IMAGES-PROMPTS.md` (prompts détaillés pour chaque image)

**Résultats attendus** :
- Format : JPEG qualité 80-85%
- Taille : < 500KB par image
- Aucun texte/watermark
- Même angle avant/après (paires)

**Temps estimé** : 1-2 jours (selon vitesse génération IA)

---

## 💻 PHASE 2 — Créer Structure Next.js (PRIORITÉ 2)

### Setup initial

```bash
# Créer repo GitHub
git init
git remote add origin https://github.com/agencecelexia-dotcom/atelielegall.git

# Initialiser Next.js 16
npx create-next-app@latest atelielegall --typescript --tailwind

# Installer dépendances
npm install lucide-react zod react-hook-form

# Créer structure dossiers
mkdir -p src/{app,components,data,lib}
mkdir -p public/images/{services,portfolio}
```

### Fichiers clés à créer

```
src/app/
├── layout.tsx           (Navbar, Footer, Metadata)
├── page.tsx             (Accueil)
├── globals.css          (Design system, couleurs)
├── fonts.ts             (Playfair + Inter)
├── api/
│   ├── contact/route.ts
│   └── admin/login/route.ts
├── services/page.tsx
├── realisations/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── a-propos/page.tsx
├── contact/page.tsx
├── admin/
│   ├── login/page.tsx
│   └── dashboard/page.tsx
└── [autres pages légales]

src/components/
├── layout/Navbar.tsx
├── layout/Footer.tsx
├── home/HeroSection.tsx
├── home/ValuesSection.tsx
├── home/ServicesPreview.tsx
├── home/FeaturedProjects.tsx
├── home/TestimonialsSection.tsx
├── home/CtaSection.tsx
└── [autres composants UI]

src/data/
├── projects.ts          (6 réalisations)
├── testimonials.ts      (4 avis)
├── services.ts          (3 services)
└── team.ts              (Bio Michaël)
```

**Temps estimé** : 3-4 jours

---

## 🎨 PHASE 3 — Intégrer Images & Contenus (PRIORITÉ 3)

### Organisation fichiers images

```bash
# Placer images dans structure
public/images/
├── services/
│   ├── cuisine-moderne.jpg
│   ├── escalier-bois.jpg
│   └── dressing-lumineux.jpg
└── portfolio/
    ├── cuisine-dinan-avant.jpg
    ├── cuisine-dinan-apres.jpg
    ├── [... 10 autres ...]
    └── bureau-apres.jpg

# Commit
git add public/images/
git commit -m "feat: add 15 AI-generated images for portfolio"
```

### Intégrer data

Copier contenus de `DATA-CONTENU.md` dans :
- `src/data/projects.ts`
- `src/data/testimonials.ts`
- `src/data/services.ts`
- `src/data/team.ts`

**Temps estimé** : 1 jour

---

## 🔐 PHASE 4 — Panel Admin & Analytics (PRIORITÉ 4)

### Créer système admin

```typescript
// src/app/admin/login/page.tsx
// - Page login avec password: 1234
// - Stockage session localStorage

// src/app/admin/dashboard/page.tsx
// - Affichage statistiques temps réel
// - Données de /storage/analytics.json
// - Filtres date, export CSV
```

### Tracking analytics

```typescript
// src/app/api/analytics/route.ts
// Enregistrer events:
- page_view (toutes les pages)
- cta_click (clics "Devis")
- form_submit (contact form)
// → /storage/analytics.json
```

**Temps estimé** : 2 jours

---

## 📝 PHASE 5 — SEO & Métadonnées (PRIORITÉ 5)

### Pour chaque page

```typescript
// generateMetadata()
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '...',
    description: '...',
    openGraph: { ... },
    twitter: { ... }
  };
}
```

### Fichiers SEO

```typescript
// src/app/sitemap.ts → Sitemap dynamique
// src/app/robots.ts → robots.txt
// src/components/seo/JsonLd.tsx → Schema.org LocalBusiness
```

**Temps estimé** : 1 jour

---

## 🔗 PHASE 6 — Intégrations & Déploiement (PRIORITÉ 6)

### n8n Webhook (Contact form)

```typescript
// src/app/api/contact/route.ts
POST /api/contact
→ Envoyer à webhook n8n
→ Email client + CRM
```

**Action client** : Créer webhook n8n et fournir URL

```env
NEXT_PUBLIC_N8N_WEBHOOK=https://your-n8n.com/webhook/contact
```

### Vercel Deployment

```bash
# Push code GitHub
git push origin main

# Auto-déploie sur Vercel
# → Configure via dashboard Vercel
# → Domaine : atelielegall.fr (achat / transfert)
```

**Temps estimé** : 1 jour

---

## ✨ PHASE 7 — Optimisation & Polish (PRIORITÉ 7)

### Performance Lighthouse

```bash
npm run build
npm start
# → Test Lighthouse
# Target: > 90 Performance, 100 SEO
```

### Mobile Responsive

- Tester sur iPhone SE / 12 / 13+
- Tester sur Android (Galaxy S20+)
- Vérifier boutons, formes, images

### Tests Fonctionnels

- [ ] Admin login (password: 1234)
- [ ] Admin dashboard stats
- [ ] Form contact submit
- [ ] Before/After gallery (scroll révèle)
- [ ] Testimonials carousel auto-rotate
- [ ] CTA buttons → form
- [ ] Lien contact WhatsApp/mail

**Temps estimé** : 2 jours

---

## 📅 Timeline Complète Estimée

| Phase | Jours | Statut |
|-------|-------|--------|
| 1. Images IA | 1-2 | ⏳ À démarrer |
| 2. Setup Next.js | 3-4 | ⏳ À démarrer |
| 3. Images + Contenus | 1 | ⏳ Après Phase 1 |
| 4. Admin + Analytics | 2 | ⏳ En parallèle Phase 2 |
| 5. SEO + Métadonnées | 1 | ⏳ Après Phase 2 |
| 6. Intégrations + Deploy | 1 | ⏳ Après Phase 5 |
| 7. Polish + Tests | 2 | ⏳ Final |
| **TOTAL** | **11-13 jours** | — |

**Chemin critique** : Images → Next.js → Admin → Deploy

---

## 🎯 Objectifs Post-Lancement

### Immédiat (Semaine 1)
- [ ] Site live sur atelielegall.fr
- [ ] Admin actif (collecte stats)
- [ ] Contact form → n8n webhook
- [ ] Google Analytics configuré
- [ ] Google Search Console

### Court terme (Mois 1)
- [ ] 50+ visites/jour
- [ ] SEO rank "menuisier Côtes-d'Armor"
- [ ] 5+ demandes devis
- [ ] Blog 2-3 articles SEO

### Moyen terme (Mois 3)
- [ ] 200+ visites/jour
- [ ] Top 3 Google local "menuisier 22450"
- [ ] Google Business Profile optimisé
- [ ] 15+ demandes devis/mois
- [ ] Lancer LSA complémentaire

---

## 🛠 Ressources Disponibles

**Repos Templates Existants** :
- Maçonnerie (Le Pober) → `https://github.com/agencecelexia-dotcom/macon`
- Menuisier (L'Art du Bois) → `https://github.com/agencecelexia-dotcom/menuisier`

**Réutiliser** :
- Système analytics (structure identical)
- Panel admin login & dashboard
- Components UI (Button, Card, etc.)
- API routes structure

---

## 👥 Contacts & Support

**Client Michaël Le Gall**
- 📞 06 73 01 62 37
- 📧 atelier.legall22450@gmail.com

**Agence Celexia**
- Thomas Rousseau
- 📧 agence.celexia@gmail.com

**Documentation Centrale**
- 📄 [PRD.md](./PRD.md)
- 📄 [CLAUDE.md](./CLAUDE.md)
- 📄 [IMAGES-PROMPTS.md](./IMAGES-PROMPTS.md)
- 📄 [DATA-CONTENU.md](./DATA-CONTENU.md)
- 📄 [README.md](./README.md)

---

## ✅ Checklist Finale Pré-Dev

- [ ] **Lire PRD.md** — Comprendre vision complète
- [ ] **Lire CLAUDE.md** — Stack tech & conventions
- [ ] **Lire IMAGES-PROMPTS.md** — Tous les 15 prompts IA
- [ ] **Vérifier repos templates** (macon + menuisier)
- [ ] **Générer 15 images IA** (semaine 1)
- [ ] **Créer repo GitHub** `agencecelexia-dotcom/atelielegall`
- [ ] **Setup Next.js** avec dossier structure (semaine 1-2)
- [ ] **Intégrer data & images** (semaine 2)
- [ ] **Créer admin panel** (semaine 2)
- [ ] **Deploy Vercel** (semaine 3)
- [ ] **Tests final + polish** (semaine 3)

---

**Prêt à commencer ? 🚀**

Thomas, la documentation est prête ! Tu peux :

1. ✅ Générer les 15 images IA (utilise les prompts dans IMAGES-PROMPTS.md)
2. ✅ Créer le repo GitHub `atelielegall`
3. ✅ Commencer le développement Next.js

Besoin de clarification sur un point ? Je suis là ! 💪

---

**Document créé le** : 20/02/2026  
**Version** : 1.0  
**Status** : Prêt pour développement
