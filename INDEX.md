# 📚 INDEX — Documentation Complète Atelier Le Gall

## 🎯 Vue d'ensemble

**Projet** : Site vitrine premium pour Michaël Le Gall, menuisier artisan  
**Client** : Atelier Le Gall, 22450 Côtes-d'Armor  
**Contact** : 06 73 01 62 37 | atelier.legall22450@gmail.com  
**Status** : Documentation v1.0 prête pour développement  
**Total docs** : 2,326 lignes de spécifications détaillées

---

## 📖 Documentation — Par Ordre de Lecture

### 1️⃣ **README.md** (8.7 KB)
**Pour commencer**
- Quick Start installation
- Structure projet
- Commandes npm
- Images workflow
- Admin panel accès
- Performance targets

📌 **À lire d'abord** pour avoir le big picture

---

### 2️⃣ **PRD.md** (9.1 KB)
**Stratégie produit complète**
- 🎯 Objectifs business
- 🎨 Design strategy (fusion maçon + menuisier)
- 📱 Pages & structure
- 📸 Images requirements (15 totales)
- 🔐 Admin panel specifications
- 📊 Analytics & tracking
- 🔍 SEO strategy

📌 **À lire pour comprendre la vision**

---

### 3️⃣ **CLAUDE.md** (11 KB)
**Stack technique & conventions**
- ⚙️ Tech stack détaillé (Next.js 16, React 19, TypeScript)
- 📂 Structure complète du projet
- 🎨 Design System (couleurs, typo)
- 💻 Conventions de code (TypeScript, React, Tailwind)
- 🔌 API routes documentation
- 📸 Images standards (formats, dossiers)
- 🌐 SEO & accessibility
- 📊 Performance targets (Lighthouse)

📌 **À lire avant développement**

---

### 4️⃣ **IMAGES-PROMPTS.md** (14 KB) ⭐ PRIORITÉ
**15 prompts IA détaillés pour génération images**

#### Génération requise
- **3 images Services** (1800×1200, ratio 3:2)
  - `cuisine-moderne.jpg` — Cuisine ouverte haut de gamme
  - `escalier-bois.jpg` — Escalier hélicoïdal artisanal
  - `dressing-lumineux.jpg` — Dressing luxe sur mesure

- **12 images Portfolio** (1200×900, ratio 4:3)
  - 6 projets × 2 photos (avant/après)
  - Cuisine Dinan, Escalier Saint-Brieuc, Dressing Ploërmel
  - Bibliothèque Vannes, Salle de Bain Lannion, Bureau Guingamp

#### Format & Organisation
```
public/images/
├── services/          (3 images)
└── portfolio/         (12 images)
```

📌 **À faire EN PREMIER** — Génération images = goulot critique

---

### 5️⃣ **DATA-CONTENU.md** (16 KB)
**Contenus pré-configurés à intégrer**

#### 4 fichiers data à créer:

**projects.ts** (6 réalisations)
```
- Cuisine Contemporaine (Dinan)
- Escalier Artisanal (Saint-Brieuc)
- Dressing Luxe (Ploërmel)
- Bibliothèque Modulable (Vannes)
- Salle de Bain Artisanale (Lannion)
- Bureau à Domicile (Guingamp)
```

**testimonials.ts** (4 avis clients)
- Sophie Dubois (Dinan) — ⭐⭐⭐⭐⭐
- Jean-Pierre Leblanc (Saint-Brieuc) — ⭐⭐⭐⭐⭐
- Anne Mercier (Ploërmel) — ⭐⭐⭐⭐⭐
- Marc & Céline Beaumont (Vannes) — ⭐⭐⭐⭐⭐

**services.ts** (3 services)
- Cuisines Sur Mesure
- Menuiseries & Agencements
- Rénovation & Restauration

**team.ts** (Bio Michaël)
- Nom: Michaël Le Gall
- Rôle: Menuisier Artisan & Fondateur
- Expertise: 20+ ans, CAO, escaliers, agencements

📌 **À copier-coller dans src/data/**

---

### 6️⃣ **IMAGES-TRACKING.csv** (2.0 KB)
**Checklist organisation images**

| ID | Section | Nom | Dimensions | Ratio | Chemin | Statut |
|----|---------|-----|-----------|-------|--------|--------|
| 1-3 | Services | 3 images | 1800×1200 | 3:2 | `services/` | À générer |
| 4-15 | Portfolio | 12 images | 1200×900 | 4:3 | `portfolio/` | À générer |

📌 **À utiliser pour tracker génération**

---

### 7️⃣ **ACTION-ITEMS.md** (8.9 KB) 🚀
**Roadmap développement étape par étape**

#### 7 Phases:
1. **Phase 1** — Générer 15 images IA (1-2 jours) ⭐
2. **Phase 2** — Setup Next.js structure (3-4 jours)
3. **Phase 3** — Intégrer images & contenus (1 jour)
4. **Phase 4** — Panel admin & analytics (2 jours)
5. **Phase 5** — SEO & métadonnées (1 jour)
6. **Phase 6** — Intégrations & deploy (1 jour)
7. **Phase 7** — Polish & tests (2 jours)

**Timeline total** : 11-13 jours

**Objectifs post-lancement** :
- Semaine 1 : Site live
- Mois 1 : 50+ visites/jour, 5+ devis
- Mois 3 : 200+ visites/jour, top 3 Google local

📌 **À suivre comme guide développement**

---

### 8️⃣ **.env.example** (2.6 KB)
**Configuration & variables d'environnement**

#### Variables requises:
```
NEXT_PUBLIC_N8N_WEBHOOK=https://your-n8n.com/webhook/contact
ADMIN_PASSWORD=1234
```

#### Variables optionnelles:
```
NEXT_PUBLIC_GA_ID (Google Analytics)
NEXT_PUBLIC_SUPABASE_URL (Future DB)
RESEND_API_KEY (Email)
DATABASE_URL (PostgreSQL)
```

📌 **À copier → .env.local au lancement**

---

## 🎯 Flux de Lecture Recommandé

### 👔 Pour Client / Product Manager
1. README.md → Big picture
2. PRD.md → Objectifs & design
3. ACTION-ITEMS.md → Timeline

### 💻 Pour Développeur
1. README.md → Setup
2. CLAUDE.md → Stack & conventions
3. IMAGES-PROMPTS.md → Prompts IA
4. DATA-CONTENU.md → Contenus
5. ACTION-ITEMS.md → Roadmap
6. .env.example → Config

### 🎨 Pour Designer / Créateur Images
1. IMAGES-PROMPTS.md → 15 prompts détaillés
2. IMAGES-TRACKING.csv → Checklist
3. PRD.md → Design system

---

## 📊 Statistiques Documentation

| Fichier | Lignes | KB | Thème |
|---------|--------|----|----|
| PRD.md | 450 | 9.1 | Product |
| CLAUDE.md | 550 | 11 | Tech |
| IMAGES-PROMPTS.md | 700 | 14 | Visuel |
| DATA-CONTENU.md | 800 | 16 | Contenu |
| README.md | 380 | 8.7 | Guide |
| ACTION-ITEMS.md | 400 | 8.9 | Roadmap |
| .env.example | 46 | 2.6 | Config |
| **TOTAL** | **3,326** | **70.3** | — |

---

## 🔑 Clés de Succès

### ✅ Déjà Fait
- ✓ Analyse repos templates (maçon + menuisier)
- ✓ Fusion design optimale
- ✓ Spécifications complètes (PRD)
- ✓ Stack technique validée (CLAUDE.md)
- ✓ 15 prompts IA détaillés (IMAGES-PROMPTS.md)
- ✓ Contenus pré-rédaction (DATA-CONTENU.md)
- ✓ Roadmap développement (ACTION-ITEMS.md)
- ✓ Configuration setup (.env.example)

### ⏳ À Faire (Priorié ordre)
1. **IMAGES** — Générer 15 images IA (goulot critique)
2. **REPO** — Créer GitHub `atelielegall`
3. **DEV** — Suivre roadmap ACTION-ITEMS.md
4. **TEST** — Lighthouse > 90, mobile responsive
5. **DEPLOY** — Vercel + domaine atelielegall.fr

---

## 🚀 Quick Links

| Ce que tu veux | Fichier |
|---|---|
| Comprendre la vision | **PRD.md** |
| Coder la structure | **CLAUDE.md** |
| Générer images | **IMAGES-PROMPTS.md** |
| Intégrer contenus | **DATA-CONTENU.md** |
| Installer & démarrer | **README.md** |
| Suivre timeline dev | **ACTION-ITEMS.md** |
| Configurer serveur | **.env.example** |

---

## 📞 Support & Contact

**Client**  
Michaël Le Gall | 06 73 01 62 37 | atelier.legall22450@gmail.com

**Agence**  
Thomas Rousseau | agence.celexia@gmail.com

**Documentation**  
Tous les fichiers sont dans ce dossier 📁

---

## 🎬 Prochaines Étapes (Immédiat)

```bash
1. Lire README.md (5 min)
2. Lire PRD.md (10 min)
3. Générer 15 images via IMAGES-PROMPTS.md (1-2 jours)
4. Créer repo GitHub
5. Initialiser Next.js + structure
6. Suivre ACTION-ITEMS.md
```

---

## ✨ Notes Finales

Cette documentation est **complète**, **détaillée** et **prête à l'emploi**.

Elle combine:
- ✓ Spécifications produit claires (PRD)
- ✓ Conventions techniques strictes (CLAUDE)
- ✓ Prompts IA précis (IMAGES)
- ✓ Contenus pré-écrits (DATA)
- ✓ Roadmap étape-par-étape (ACTION)
- ✓ Configuration d'accès (ENV)

**Vous avez tout ce qu'il faut pour créer le meilleur site possible pour Michaël ! 🚀**

---

**Créé le** : 20/02/2026  
**Version** : 1.0  
**Status** : ✅ Prêt pour développement  
**Total documentation** : 2,326 lignes  
**Format** : Markdown + CSV  
**Complétude** : 100% 🎉
