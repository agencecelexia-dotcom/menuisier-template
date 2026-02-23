import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site Atelier Le Gall, menuiserie artisanale en Côtes-d'Armor.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white">
            Mentions Légales
          </h1>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
          <h2 className="font-heading text-2xl font-bold mb-4">Éditeur du site</h2>
          <p className="text-text-muted mb-6">
            <strong>Atelier Le Gall</strong><br />
            Mickaël Le Gall — Menuisier Artisan<br />
            22450, Côtes-d&apos;Armor, Bretagne<br />
            Téléphone : 06 73 01 62 37<br />
            Email : atelier.legall22450@gmail.com
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Hébergement</h2>
          <p className="text-text-muted mb-6">
            Ce site est hébergé par <strong>Vercel Inc.</strong><br />
            440 N Baxter St, Covina, CA 91723, États-Unis<br />
            Site : vercel.com
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Conception</h2>
          <p className="text-text-muted mb-6">
            Site conçu et développé par <strong>Agence Celexia</strong><br />
            Thomas Rousseau — agence.celexia@gmail.com
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Propriété intellectuelle</h2>
          <p className="text-text-muted mb-6">
            L&apos;ensemble du contenu de ce site (textes, images, vidéos, etc.) est la
            propriété exclusive d&apos;Atelier Le Gall, sauf mention contraire. Toute
            reproduction, même partielle, est interdite sans autorisation préalable.
          </p>

          <h2 className="font-heading text-2xl font-bold mb-4">Responsabilité</h2>
          <p className="text-text-muted">
            Les informations fournies sur ce site le sont à titre indicatif. Atelier
            Le Gall ne saurait être tenu responsable des erreurs, d&apos;une absence de
            disponibilité des informations ou de la présence de virus sur son site.
          </p>
        </div>
      </section>
    </>
  );
}
