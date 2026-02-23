# PRD — Atelier Le Gall - Menuiserie Haut de Gamme

## 📋 Vue d'ensemble

**Projet** : Site vitrine premium pour Atelier Le Gall, menuisier d'excellence en Côtes-d'Armor  
**Client** : Michaël Le Gall  
**Localisation** : 22450 (Côtes-d'Armor, Bretagne)  
**Contact** : 06 73 01 62 37 | atelier.legall22450@gmail.com  
**URL Production** : `atelielegall.fr` (Vercel)  
**Status** : Specification v1.0

---

## 🎯 Objectifs

1. **Présenter l'expertise artisanale** de Michaël Le Gall dans la menuiserie haut de gamme
2. **Générer des demandes de devis** qualifiées via formulaire intégré
3. **Showcase du portfolio** : avant/après de 6 projets emblématiques
4. **Établir la confiance** via avis clients, témoignages et panel admin transparent
5. **Optimisation SEO** pour "menuisier Côtes-d'Armor", "menuiserie Bretagne", "menuiserie sur mesure"

---

## 🎨 Design Strategy

### Inspiration & Fusion

**Maçonnerie (Le Pober)** → Structure, disposition, panel admin
- Architecture modulaire des sections
- Panel admin avec statistiques en temps réel (code: 1234)
- Palette de couleurs professionnelle

**Menuisier (L'Art du Bois)** → Couleurs premium, typographie élégante
- Palette bois-naturel (chêne, noyer, laiton)
- Typographie Playfair Display (titres) + Inter (corps)
- Ambiance luxe et sobriété

### Couleurs Atelier Le Gall

```css
/* Bois & Nature */
--color-primary:      #3D2B1F  /* Chêne profond / Noyer */
--color-secondary:    #F5F5DC  /* Crème / Papyrus */
--color-accent:       #4A7C59  /* Vert Forêt Breton */
--color-accent-alt:   #B8860B  /* Laiton doré */

/* Surfaces */
--color-surface:      #FAFAF5  /* Blanc chaleureux */
--color-surface-2:    #F0EDE4  /* Teinté clair */
--color-text-muted:   #7A6658  /* Texte secondaire */
--color-border:       #E0D9CE  /* Bordures */
```

### Typographie

- **Titres** : `Playfair Display` (Google Fonts, Serif élégante)
- **Corps** : `Inter` (Google Fonts, Sans-Serif moderne)
- Mobile base: 16px | Desktop base: 18px

---

## 📱 Pages & Structure

```
Root Layout
├── Navbar (fixed, transparent hero, état scrollé)
├── [Page]
└── Footer (4 colonnes)

Pages:
├── / (Accueil)
├── /services (Services + process)
├── /realisations (Portfolio avec filtres)
├── /realisations/[slug] (Détail projet)
├── /a-propos (À propos + bio)
├── /contact (Formulaire + infos)
├── /mentions-legales
├── /politique-confidentialite
├── /admin/login (Authentification)
└── /admin/dashboard (Panel statistiques)
```

---

## 🏠 Page d'Accueil — Structure Hero

```
[Fixed Navbar]
┌─────────────────────────────────────┐
│  HERO SECTION                       │
│  Bg: Image artisan au travail       │
│  Overlay: gradient dark/transparent │
│  Contenu:                           │
│  - Titre: "Menuiserie d'Excellence" │
│  - Sous-titre: Michaël Le Gall      │
│  - CTA: "Demander un Devis"         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  4 VALUE CARDS                      │
│  - Savoir-faire artisanal           │
│  - Matériaux premium sélectionnés   │
│  - Sur mesure adapté à votre projet │
│  - Respect des délais garantis      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  SERVICES PREVIEW (3 images)        │
│  - Cuisine sur mesure               │
│  - Menuiseries intérieures          │
│  - Agencements & mobilier           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  FEATURED PROJECTS                  │
│  3 réalisations avec avant/après    │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  TESTIMONIALS CAROUSEL              │
│  Auto-rotate 4 avis clients         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  CTA BANNER                         │
│  "Parlons de votre projet"          │
│  → Formulaire contact               │
└─────────────────────────────────────┘

[Footer]
```

---

## 📸 Images — 15 totales

Ratio & dimensions standardisées:
- **3:2** → 1800×1200px
- **4:3** → 1200×900px

### Répartition

| Section | Qty | Ratio | Dossier |
|---------|-----|-------|---------|
| Services | 3 | 3:2 | `public/images/services/` |
| Portfolio (6×2) | 12 | 4:3 | `public/images/portfolio/` |
| **TOTAL** | **15** | — | — |

---

## 🔐 Admin Panel

### Accès

- URL: `/admin/login`
- Mot de passe: `1234`
- Redirect: `/admin/dashboard`

### Données affichées

```
┌────────────────────────────────┐
│ STATISTIQUES EN TEMPS RÉEL      │
├────────────────────────────────┤
│ Total visites                  │
│ Aujourd'hui                    │
│ Cette semaine                  │
│ Ce mois                        │
├────────────────────────────────┤
│ PAGES LES PLUS VISITÉES        │
│ Accueil                        │
│ Services                       │
│ Réalisations                   │
│ Contact                        │
├────────────────────────────────┤
│ CONVERSIONS                    │
│ Clics CTA (devis)             │
│ Soumissions formulaire         │
│ Taux conversion               │
├────────────────────────────────┤
│ TRAFIC                         │
│ Google (organic)              │
│ Direct                        │
│ Referrer                      │
└────────────────────────────────┘
```

---

## 📊 Analytics & Tracking

- Enregistrement `page_view`, `cta_click`, `form_submit` dans `/storage/analytics.json`
- Dashboard temps réel avec filtres date
- Export CSV optionnel

---

## 🔍 SEO

- Meta tags & Open Graph sur chaque page
- `sitemap.ts` auto-généré
- `robots.ts` pour crawler directives
- Schema.org `LocalBusiness` JSON-LD
- French language (`lang="fr"`)
- WCAG 2.1 accessible

---

## 🚀 Contenu & Messaging

### Tonalité

- **Premium** mais accessible
- **Artisanal** et **authentique**
- Valorisation du **savoir-faire breton**
- Confiance via **transparence**

### Propositions clés

> Menuiserie d'excellence depuis plus de 20 ans. Michaël Le Gall transforme vos espaces en créant des meubles et agencements uniques, adaptés à vos besoins et à votre style.

> Chaque projet est une collaboration. Du concept à la pose, nous vous accompagnons pour que votre vision devienne réalité.

---

## 🛠 Stack Technique

- **Framework** : Next.js 16 (App Router)
- **React** : 19.2 (Compiler activé)
- **TypeScript** : 5
- **Styling** : Tailwind CSS v4
- **Icons** : Lucide React
- **Forms** : React `useActionState` + Zod
- **Deployment** : Vercel

---

## 📁 Deliverables

1. ✅ Code source complet (GitHub repo)
2. ✅ `CLAUDE.md` — conventions & setup
3. ✅ `IMAGES-PROMPTS.md` — 15 prompts IA
4. ✅ `PRD.md` — ce document
5. ✅ Panel admin avec code 1234
6. ✅ Formulaire contact intégré
7. ✅ Mobile-first responsive design
8. ✅ SEO optimisé (meta, sitemap, robots)
9. ✅ Analytics & tracking

---

## 🎬 Next Steps

1. **Générer les 15 images** via IA (voir IMAGES-PROMPTS.md)
2. **Organiser fichiers** selon structure dossiers
3. **Mettre en place n8n webhook** pour contact form
4. **Deploy** sur Vercel
5. **Configurer Google Business Profile** pour SEO local
6. **Lancer campagne LSA** pour artisans menuisiers Bretagne

---

## 📞 Contact Michaël

- **Nom** : Michaël Le Gall
- **Métier** : Menuisier artisan
- **Téléphone** : 06 73 01 62 37
- **Email** : atelier.legall22450@gmail.com
- **Code postal** : 22450 (Côtes-d'Armor)
- **Spécialités** : Menuiserie sur mesure, cuisines, agencements

---

**Document créé le** : 20/02/2026  
**Version** : 1.0  
**Auteur** : Claude + Thomas (Agence Celexia)
