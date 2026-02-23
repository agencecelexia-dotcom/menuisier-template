import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">
            Portfolio
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Nos Réalisations
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Découvrez nos transformations avant/après et laissez-vous inspirer
            par le savoir-faire artisanal de Mickaël.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((project) => (
            <Link
              key={project.id}
              href={`/realisations/${project.slug}`}
              className="group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.afterImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">
                      {project.category === "cuisine"
                        ? "Cuisine"
                        : project.category === "escalier"
                        ? "Escalier"
                        : project.category === "dressing"
                        ? "Dressing"
                        : project.category === "bibliotheque"
                        ? "Bibliothèque"
                        : project.category === "sdb"
                        ? "Salle de Bain"
                        : "Bureau"}
                    </span>
                  </div>
                </div>
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
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-lg font-medium hover:bg-primary-700 transition-all duration-300"
          >
            Voir toutes les réalisations
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
