export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Atelier Le Gall",
    description:
      "Menuiserie artisanale haut de gamme. Cuisines sur mesure, escaliers, dressings, agencements en Côtes-d'Armor, Bretagne.",
    url: "https://atelielegall.fr",
    telephone: "+33673016237",
    email: "atelier.legall22450@gmail.com",
    address: {
      "@type": "PostalAddress",
      postalCode: "22450",
      addressRegion: "Côtes-d'Armor",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.711302,
      longitude: -3.285685,
    },
    hasMap: "https://www.google.com/maps/place/Atelier+Le+Gall+menuisier/@48.711302,-3.2882653,17z",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    priceRange: "€€€",
    image: "https://atelielegall.fr/images/services/cuisine-moderne.jpg",
    founder: {
      "@type": "Person",
      name: "Mickaël Le Gall",
      jobTitle: "Menuisier Artisan",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 48.711302,
        longitude: -3.285685,
      },
      geoRadius: "100000",
    },
    knowsAbout: [
      "Menuiserie sur mesure",
      "Cuisines haut de gamme",
      "Escaliers design",
      "Dressings",
      "Agencements intérieurs",
      "Rénovation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
