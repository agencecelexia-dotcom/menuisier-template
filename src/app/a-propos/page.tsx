import type { Metadata } from "next";
import { Phone, Mail, MapPin, Award, Hammer, TreePine, Clock, Users } from "lucide-react";
import { team } from "@/data/team";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "À Propos",
  description:
    "Découvrez Mickaël Le Gall, menuisier artisan depuis plus de 20 ans en Côtes-d'Armor. Son parcours, ses valeurs et son savoir-faire d'excellence.",
};

export default function AProposPage() {
  const michael = team[0];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-200 text-sm font-medium tracking-widest uppercase mb-4">
            Notre Histoire
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            À Propos de l&apos;Atelier
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Plus de 20 ans de passion, de précision et de créativité au service
            de vos projets.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-surface-2 rounded-2xl h-80 lg:h-[450px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <Users size={48} className="text-primary" />
                </div>
                <p className="text-text-muted text-sm">Photo de Mickaël</p>
              </div>
            </div>
            <div>
              <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">
                Fondateur & Artisan
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                {michael.name}
              </h2>
              <p className="text-accent-alt font-medium mb-6">{michael.role}</p>
              <p className="text-text-muted leading-relaxed mb-6">{michael.bio}</p>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-accent" />
                  <a href={`tel:${michael.phone.replace(/\s/g, "")}`} className="hover:text-accent transition-colors">
                    {michael.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent" />
                  <a href={`mailto:${michael.email}`} className="hover:text-accent transition-colors">
                    {michael.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-accent" />
                  <span>22450, Côtes-d&apos;Armor, Bretagne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 md:py-24 bg-surface-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Domaines d&apos;Expertise
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {michael.expertise.map((skill) => (
              <div
                key={skill}
                className="bg-white rounded-xl p-5 text-center shadow-premium hover:shadow-premium-lg transition-all duration-300"
              >
                <Award size={24} className="text-accent mx-auto mb-2" />
                <p className="font-medium text-sm">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">
              Ce qui nous guide
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Nos Valeurs
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.id} className="bg-white rounded-xl p-6 text-center shadow-premium">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent-50 text-accent mb-4">
                  {value.icon === "Hammer" && <Hammer size={28} />}
                  {value.icon === "TreePine" && <TreePine size={28} />}
                  {value.icon === "Brush" && <Award size={28} />}
                  {value.icon === "Clock" && <Clock size={28} />}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-text-muted text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
