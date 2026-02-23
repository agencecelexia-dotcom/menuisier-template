import { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: 'svc-001',
    slug: 'cuisine',
    title: 'Cuisines Sur Mesure',
    description: 'Cuisines design et fonctionnelles, adaptées à votre espace et style',
    longDescription: "Mickaël crée des cuisines uniques, combinant esthétique premium et fonctionnalité. Du design initial aux finitions, chaque élément est pensé pour vous. Bois massifs sélectionnés, quincaillerie premium, éclairage intégré, rangements optimisés — une cuisine qui devient cœur de la maison.",
    icon: 'ChefHat',
    image: '/images/services/cuisine-moderne.jpg',
    features: ['Design personnalisé', 'Bois massifs premium', 'Équipements intégrés', 'Éclairage LED', 'Rangements optimisés', 'Garantie 10 ans'],
  },
  {
    id: 'svc-002',
    slug: 'menuiseries',
    title: 'Menuiseries & Agencements',
    description: 'Escaliers, dressings, bibliothèques, bureaux — tout sur mesure',
    longDescription: "Au-delà des cuisines, Mickaël conçoit l'intégralité de votre intérieur. Escaliers architecturaux, dressings de luxe, bibliothèques modulables, bureaux ergonomiques — chaque pièce de votre maison peut devenir exceptionnelle. Menuiserie d'excellence, adaptée à votre style et à vos besoins.",
    icon: 'LayoutGrid',
    image: '/images/services/escalier-bois.jpg',
    features: ['Escaliers design', 'Dressings modulables', 'Bibliothèques', 'Bureaux intégrés', 'Agencements complets', 'Finitions premium'],
  },
  {
    id: 'svc-003',
    slug: 'renovation',
    title: 'Rénovation & Restauration',
    description: 'Transformer vos espaces existants en lieux de vie inspirants',
    longDescription: "Votre maison mérite une seconde vie. Mickaël intervient sur la globalité : ouvertures de cloisons, restructuration d'étages, restauration de bois ancien. Chaque projet de rénovation est une nouvelle opportunité de créer l'espace dont vous rêvez.",
    icon: 'Hammer',
    image: '/images/services/dressing-lumineux.jpg',
    features: ['Diagnostic complet', 'Plans 3D', 'Ouvertures murs', 'Restructurations', 'Restauration bois ancien', 'Coordination tous corps'],
  },
];
