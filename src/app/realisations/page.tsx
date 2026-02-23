import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Nos Réalisations",
  description:
    "Découvrez nos projets de menuiserie haut de gamme : cuisines, escaliers, dressings et plus. Avant/après de transformations en Bretagne.",
};

const categoryLabels: Record<string, string> = {
  cuisine: "Cuisine",
  escalier: "Escalier",
  dressing: "Dressing",
  bibliotheque: "Bibliothèque",
  sdb: "Salle de Bain",
  bureau: "Bureau",
};

export default function RealisationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent-200 text-sm font-medium tracking-widest uppercase mb-4">
            Portfolio
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Réalisations
          </h1>
          <p className="text-white/75 text-lg max-w-2xl mx-auto">
            Chaque projet raconte une histoire de transformation. Découvrez nos
            créations avant/après.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/realisations/${project.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Before/After Images */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.afterImage}
                      alt={`${project.title} — Après`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-white/90 text-primary text-xs font-medium px-3 py-1 rounded-full">
                        Avant / Après
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-semibold mb-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-sm mb-3">
                      {project.location} — {project.year}
                    </p>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-sm text-text-muted">{project.timeline}</span>
                      <span className="text-border">|</span>
                      <span className="text-sm text-accent-alt font-medium">{project.budget}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
