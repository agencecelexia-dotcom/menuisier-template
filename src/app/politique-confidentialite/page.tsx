import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité du site Atelier Le Gall.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Politique de Confidentialité
          </h1>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2 className="font-heading text-2xl font-bold mb-4">Collecte des données</h2>
          <p className="text-text-muted mb-6">
            Les informations personnelles collectées via le formulaire de contact
            (nom, email, téléphone, message) sont utilisées uniquement pour
            répondre à vos demandes et ne sont jamais transmises à des tiers.
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Utilisation des données</h2>
          <p className="text-text-muted mb-6">
            Vos données sont utilisées pour :<br />
            — Répondre à vos demandes de devis<br />
            — Vous recontacter concernant votre projet<br />
            — Améliorer nos services
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Conservation</h2>
          <p className="text-text-muted mb-6">
            Vos données personnelles sont conservées pour une durée maximale de
            3 ans à compter de votre dernier contact, conformément au RGPD.
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Vos droits</h2>
          <p className="text-text-muted mb-6">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de
            suppression et de portabilité de vos données. Pour exercer ces
            droits, contactez-nous à : atelier.legall22450@gmail.com
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Cookies</h2>
          <p className="text-text-muted mb-6">
            Ce site utilise des cookies techniques nécessaires à son
            fonctionnement. Aucun cookie publicitaire n&apos;est utilisé sans
            votre consentement préalable.
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Contact</h2>
          <p className="text-text-muted">
            Pour toute question relative à la protection de vos données :<br />
            Mickaël Le Gall — atelier.legall22450@gmail.com<br />
            Téléphone : 06 73 01 62 37
          </p>
        </div>
      </section>
    </>
  );
}
