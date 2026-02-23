# DATA — Projets, Services & Avis pour Atelier Le Gall

## À intégrer dans `src/data/`

---

## 📁 projects.ts

```typescript
export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  year: number;
  category: 'cuisine' | 'escalier' | 'dressing' | 'bibliotheque' | 'sdb' | 'bureau';
  beforeImage: string;
  afterImage: string;
  challenges: string[];
  solutions: string[];
  materials: string[];
  timeline: string;
  budget: string;
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    slug: 'cuisine-dinan',
    title: 'Cuisine Contemporaine — Dinan',
    shortDescription: 'Transformation d\'une cuisine fermée années 90 en espace ouvert lumineux',
    fullDescription: `
      Projet ambitieux de rénovation complète d'une cuisine fermée datant des années 1990.
      L'objectif était de créer un espace ouvert, lumineux et moderne, intégré au salon.
      
      Michaël a conçu une cuisine sur mesure combinant bois massif clair, façades blanches
      laquées et un îlot central fonctionnel. Chaque détail a été pensé : poignées laiton,
      éclairage LED intégré, rangements optimisés.
      
      Résultat : un espace de vie principal transformé, augmentant considérablement la
      valeur et l'agrément de la maison.
    `,
    location: 'Dinan, Côtes-d\'Armor',
    year: 2023,
    category: 'cuisine',
    beforeImage: '/images/portfolio/cuisine-dinan-avant.jpg',
    afterImage: '/images/portfolio/cuisine-dinan-apres.jpg',
    challenges: [
      'Ouverture du mur porteur → nécessité IPN',
      'Espace limité pour îlot central',
      'Liaison avec salon nécessitant harmonie de style'
    ],
    solutions: [
      'Étude structurelle + ingénieur',
      'Conception îlot optimisé 1.2×2m',
      'Intégration harmonieuse bois/blanc'
    ],
    materials: [
      'Chêne massif clair (îlot + plan travail)',
      'Laque blanc brillant (façades)',
      'Marbre Calacatta (plan travail)',
      'Laiton brossé (poignées)',
      'Béton ciré (crédence)'
    ],
    timeline: '3 mois pose incluse',
    budget: '€€€ (Sur devis)',
  },

  {
    id: 'proj-002',
    slug: 'escalier-saintbrieuc',
    title: 'Escalier Artisanal — Saint-Brieuc',
    shortDescription: 'Création d\'un escalier hélicoïdal design remplaçant escalier droit classique',
    fullDescription: `
      Remplacement complet d'un escalier droit années 1980 par une structure hélicoïdale
      épurée et moderne. Michaël a conçu chaque marche avec précision géométrique.

      La rampe épurée mélange bois clair (chêne) et acier noir mat pour un rendu contemporain
      premium. Les marches parfaitement alignées et poncées mettent en valeur les veines du bois.
      
      Un project de haute complexité technique transformant complètement l'espace intérieur.
    `,
    location: 'Saint-Brieuc, Côtes-d\'Armor',
    year: 2022,
    category: 'escalier',
    beforeImage: '/images/portfolio/escalier-avant.jpg',
    afterImage: '/images/portfolio/escalier-apres.jpg',
    challenges: [
      'Calcul géométrie hélicoïdale complexe',
      'Dimensions pièce contraignantes',
      'Intégration acier + bois'
    ],
    solutions: [
      'Logiciel CAO 3D pour calculs précis',
      'Menuiserie + ferronnerie coordonnée',
      'Montage par étapes'
    ],
    materials: [
      'Chêne massif foncé (marches)',
      'Acier noir mat (rampe structure)',
      'Finition vernis matte (bois)',
      'Quincaillerie acier brossé'
    ],
    timeline: '2.5 mois',
    budget: '€€€€ (Structure complexe)',
  },

  {
    id: 'proj-003',
    slug: 'dressing-ploermel',
    title: 'Dressing Luxe — Ploërmel',
    shortDescription: 'Création d\'un dressing mural sur toute la hauteur d\'une chambre',
    fullDescription: `
      Aménagement d'une chambre vide avec création d'un dressing de luxe sur mesure.
      
      Portes coulissantes miroir (80% du mur), intérieur en chêne massif avec étagères
      ajustables, systèmes de rangement intégrés, LED discrètes créant ambiance douce.
      
      Résultat : espace extrêmement organisé, gain de place et esthétique haut de gamme.
    `,
    location: 'Ploërmel, Morbihan',
    year: 2023,
    category: 'dressing',
    beforeImage: '/images/portfolio/dressing-avant.jpg',
    afterImage: '/images/portfolio/dressing-apres.jpg',
    challenges: [
      'Optimiser espace limité',
      'Portes coulissantes de grande taille',
      'Éclairage LED intégré'
    ],
    solutions: [
      'Design modulaire adaptable',
      'Systèmes coulissants premium Blum/Hettich',
      'LED intégrées discrètement'
    ],
    materials: [
      'Miroir teinté + cadre chêne',
      'Chêne massif (intérieur)',
      'Systèmes coulissants Hettich',
      'LED blanc chaud dimmable'
    ],
    timeline: '2 mois',
    budget: '€€€',
  },

  {
    id: 'proj-004',
    slug: 'bibliotheque-vannes',
    title: 'Bibliothèque Modulable — Vannes',
    shortDescription: 'Installation d\'une bibliothèque murale sol-plafond personnalisée',
    fullDescription: `
      Création d'une bibliothèque murale intégrée du sol au plafond dans un salon.
      
      Bois massif mixte (chêne clair + placages contrastants) créant pattern géométrique.
      Étagères variables, certaines ouvertes d'autres fermées, LED intégrée subtilement.
      
      Projet complètement transformant la pièce : ajout de caractère, organisation,
      et création d'une vraie pièce "maîtresse" du salon.
    `,
    location: 'Vannes, Morbihan',
    year: 2022,
    category: 'bibliotheque',
    beforeImage: '/images/portfolio/bibliotheque-avant.jpg',
    afterImage: '/images/portfolio/bibliotheque-apres.jpg',
    challenges: [
      'Géométrie exacte sol-plafond',
      'Motif bois complexe à précalculer',
      'Charge / fixation structures'
    ],
    solutions: [
      'Mesure laser 3D sur site',
      'CAO pour pattern bois',
      'Structure acier cachée'
    ],
    materials: [
      'Chêne massif clair + foncé',
      'Verre teinté (certaines portes)',
      'Structure acier peinte blanc',
      'LED blanc chaud 3000K'
    ],
    timeline: '3 mois',
    budget: '€€€€',
  },

  {
    id: 'proj-005',
    slug: 'sdb-lannion',
    title: 'Salle de Bain Artisanale — Lannion',
    shortDescription: 'Aménagement haut de gamme salle de bain avec meuble vasque sur mesure',
    fullDescription: `
      Transformation complète d'une salle de bain basique en espace spa de luxe.
      
      Meuble vasque sur mesure en chêne massif (2 vasques), miroir bois épuré, étagères
      bois pour rangement décor, éclairage LED subtil, marbre/béton ciré.
      
      Ambiance zen et haut de gamme. Chaque élément pensé pour durabilité et esthétique.
    `,
    location: 'Lannion, Côtes-d\'Armor',
    year: 2023,
    category: 'sdb',
    beforeImage: '/images/portfolio/sdb-avant.jpg',
    afterImage: '/images/portfolio/sdb-apres.jpg',
    challenges: [
      'Humidité salle de bain → traitement bois spécial',
      'Plomberie existante à intégrer',
      'Petit espace à maximiser'
    ],
    solutions: [
      'Vernis marin haute protection',
      'Adaptation meuble vasque existant',
      'Rangements verticaux optimisés'
    ],
    materials: [
      'Chêne massif traité marin',
      'Marbre blanc Calacatta',
      'Béton ciré gris clair',
      'Robinetterie laiton brossé',
      'LED blanc chaud'
    ],
    timeline: '1.5 mois',
    budget: '€€€',
  },

  {
    id: 'proj-006',
    slug: 'bureau-guingamp',
    title: 'Bureau à Domicile Premium — Guingamp',
    shortDescription: 'Création bureau intégré élégant pour télétravail productif',
    fullDescription: `
      Aménagement d'une chambre d'amis en bureau à domicile professionnel et inspirant.
      
      Bureau intégré largeur mur (2.5m) en chêne massif + marbre, caisson rangement blanc
      laqué, étagères flottantes, éclairage LED intégré, repose-pieds cuir/bois.
      
      Espace devenant véritable lieu de travail productif et plaisant où on aime passer
      du temps.
    `,
    location: 'Guingamp, Côtes-d\'Armor',
    year: 2023,
    category: 'bureau',
    beforeImage: '/images/portfolio/bureau-avant.jpg',
    afterImage: '/images/portfolio/bureau-apres.jpg',
    challenges: [
      'Adapter prise électrique existante',
      'Passage câbles discrets',
      'Ergonomie travail optimal'
    ],
    solutions: [
      'Passage câbles intégré au meuble',
      'Électrification complète discrète',
      'Plan travail hauteur réglable optionnelle'
    ],
    materials: [
      'Chêne massif clair (bureau)',
      'Laque blanc (caisson)',
      'Marbre gris clair (plan)',
      'Cuir noir (repose-pieds)',
      'LED blanc froid 4000K'
    ],
    timeline: '2 mois',
    budget: '€€€',
  },
];
```

---

## 💬 testimonials.ts

```typescript
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
  projectSlug: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testi-001',
    name: 'Sophie Dubois',
    location: 'Dinan',
    text: 'Michaël a transformé notre cuisine en espace de vie principal. Son écoute, sa précision et sa créativité nous ont séduits. Un vrai artisan, passionné par son métier. Nous recommandons vivement!',
    rating: 5,
    projectSlug: 'cuisine-dinan',
  },
  {
    id: 'testi-002',
    name: 'Jean-Pierre Leblanc',
    location: 'Saint-Brieuc',
    text: 'L\'escalier que Michaël a créé est une œuvre d\'art. Chaque détail témoigne de son savoir-faire. Au-delà du résultat magnifique, son professionnalisme et sa ponctualité sont exemplaires.',
    rating: 5,
    projectSlug: 'escalier-saintbrieuc',
  },
  {
    id: 'testi-003',
    name: 'Anne Mercier',
    location: 'Ploërmel',
    text: 'Le dressing que nous avons commandé dépasse nos attentes. Chaque compartiment est pensé, c\'est une organisation impeccable dans un cadre haut de gamme. Merci Michaël!',
    rating: 5,
    projectSlug: 'dressing-ploermel',
  },
  {
    id: 'testi-004',
    name: 'Marc & Céline Beaumont',
    location: 'Vannes',
    text: 'La bibliothèque transforme complètement notre salon. C\'est à la fois fonctionnel et magnifique. Michaël a su traduire notre vision en réalité. Très satisfaits!',
    rating: 5,
    projectSlug: 'bibliotheque-vannes',
  },
];
```

---

## 🔧 services.ts

```typescript
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string; // Lucide icon name
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'svc-001',
    slug: 'cuisine',
    title: 'Cuisines Sur Mesure',
    description: 'Cuisines design et fonctionnelles, adaptées à votre espace et style',
    longDescription: `
      Michaël crée des cuisines uniques, combinant esthétique premium et fonctionnalité.
      Du design initial aux finitions, chaque élément est pensé pour vous.
      
      Bois massifs sélectionnés, quincaillerie premium, éclairage intégré, rangements
      optimisés — une cuisine qui devient cœur de la maison.
    `,
    icon: 'ChefHat',
    image: '/images/services/cuisine-moderne.jpg',
    features: [
      'Design personnalisé',
      'Bois massifs premium',
      'Équipements intégrés',
      'Éclairage LED',
      'Rangements optimisés',
      'Garantie 10 ans'
    ],
  },
  {
    id: 'svc-002',
    slug: 'menuiseries',
    title: 'Menuiseries & Agencements',
    description: 'Escaliers, dressings, bibliothèques, bureaux — tout sur mesure',
    longDescription: `
      Au-delà des cuisines, Michaël conçoit l'intégralité de votre intérieur.
      
      Escaliers architecturaux, dressings de luxe, bibliothèques modulables, bureaux
      ergonomiques — chaque pièce de votre maison peut devenir exceptional.
      
      Menuiserie d'excellence, adapté à votre style et à vos besoins.
    `,
    icon: 'LayoutGrid',
    image: '/images/services/escalier-bois.jpg',
    features: [
      'Escaliers design',
      'Dressings modulables',
      'Bibliothèques',
      'Bureaux intégrés',
      'Agencements complets',
      'Finitions premium'
    ],
  },
  {
    id: 'svc-003',
    slug: 'renovation',
    title: 'Rénovation & Restauration',
    description: 'Transformer vos espaces existants en lieux de vie inspirants',
    longDescription: `
      Votre maison mérite une seconde vie. Michaël intervient sur la globalité :
      ouvertures de cloisons, restructuration d'étages, restauration de bois ancien.
      
      Chaque projet de rénovation est une nouvelle opportunité de créer l'espace
      dont vous rêvez.
    `,
    icon: 'Hammer',
    image: '/images/services/dressing-lumineux.jpg',
    features: [
      'Diagnostique complet',
      'Plans 3D',
      'Ouvertures murs',
      'Restructurations',
      'Restauration bois ancien',
      'Coordination tous corps'
    ],
  },
];
```

---

## 👤 team.ts

```typescript
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  phone: string;
  email: string;
  expertise: string[];
}

export const team: TeamMember[] = [
  {
    id: 'team-001',
    name: 'Michaël Le Gall',
    role: 'Menuisier Artisan & Fondateur',
    bio: `
      Michaël Le Gall est menuisier artisan depuis plus de 20 ans, avec un passion
      inébranlable pour son métier.
      
      Formé aux techniques traditionnelles et aux outils numériques modernes (CAO, FAO),
      il crée des meubles et agencements d'exception pour des clients exigeants.
      
      Chaque projet est une collaboration : écoute, créativité, précision. C'est cette
      approche qui fait la différence.
      
      Situé en Côtes-d'Armor (Bretagne), Michaël intervient sur toute la région et
      accueille des projets nationaux pour sa clientèle d'exception.
    `,
    phone: '06 73 01 62 37',
    email: 'atelier.legall22450@gmail.com',
    expertise: [
      'Menuiserie massif',
      'CAO 3D',
      'Escaliers design',
      'Agencements intérieurs',
      'Restauration patrimoine',
      'Gestion projet complète'
    ],
  },
];
```

---

## 📋 values.ts (Optionnel)

```typescript
export interface Value {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon
}

export const values: Value[] = [
  {
    id: 'val-001',
    title: 'Savoir-faire Artisanal',
    description: 'Plus de 20 ans d\'expérience, technique et passion pour chaque détail.',
    icon: 'Hammer',
  },
  {
    id: 'val-002',
    title: 'Matériaux Premium',
    description: 'Sélection rigoureuse de bois massifs et matériaux haut de gamme.',
    icon: 'TreePine',
  },
  {
    id: 'val-003',
    title: 'Personnalisation Complète',
    description: 'Chaque projet est sur mesure, adapté exactement à votre vision.',
    icon: 'Brush',
  },
  {
    id: 'val-004',
    title: 'Respect des Délais',
    description: 'Ponctualité et professionnalisme garantis du devis à la finition.',
    icon: 'Clock',
  },
];
```

---

## 🎯 Notes d'intégration

Ces données doivent être importées dans `src/data/` et utilisées par :

```typescript
// Accueil
import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { services } from '@/data/services';

// Portfolio
import { projects } from '@/data/projects';
for (const project of projects) {
  // Générer page `/realisations/[slug]`
}

// À propos
import { team } from '@/data/team';
import { values } from '@/data/values';
```

---

**Document créé le** : 20/02/2026  
**Version** : 1.0
