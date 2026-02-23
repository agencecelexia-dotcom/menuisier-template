import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChefHat, LayoutGrid, Hammer, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Nos Services",
  description:
    "Cuisines sur mesure, menuiseries & agencements, rénovation et restauration. Découvrez les services de menuiserie haut de gamme d'Atelier Le Gall.",
};

const iconMap: Record<string, React.ReactNode> = {
  ChefHat: <ChefHat size={32} />,
  LayoutGrid: <LayoutGrid size={32} />,
  Hammer: <Hammer size={32} />,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-200 text-sm font-medium tracking-widest uppercase mb-4">
            Nos Expertises
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Services Sur Mesure
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            De la conception à la pose, nous vous accompagnons dans chaque étape
            de votre projet de menuiserie d&apos;excellence.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative h-80 lg:h-[450px] rounded-2xl overflow-hidden shadow-premium-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent-50 text-accent mb-4">
                    {iconMap[service.icon] || <Hammer size={32} />}
                  </div>
                  <h2 className="font-heading text-3xl font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-text-muted leading-relaxed mb-6">
                    {service.longDescription}
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-accent shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
                  >
                    Demander un Devis
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">
              Notre Méthode
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Comment Nous Travaillons
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Écoute", desc: "Nous comprenons vos besoins, votre style et votre budget lors d'un premier rendez-vous." },
              { step: "02", title: "Conception", desc: "Plans 3D détaillés, choix des matériaux et validation ensemble de chaque détail." },
              { step: "03", title: "Fabrication", desc: "Réalisation artisanale dans notre atelier avec des matériaux sélectionnés avec soin." },
              { step: "04", title: "Pose", desc: "Installation soignée chez vous avec respect des délais et finitions impeccables." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white font-heading text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-surface-2 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Prêt à transformer votre intérieur ?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Contactez-nous pour discuter de votre projet et obtenir un devis gratuit.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 transition-colors shadow-lg"
          >
            <Phone size={20} />
            Demander un Devis Gratuit
          </Link>
        </div>
      </section>
    </>
  );
}
