import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChefHat, LayoutGrid, Hammer } from "lucide-react";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  ChefHat: <ChefHat size={24} />,
  LayoutGrid: <LayoutGrid size={24} />,
  Hammer: <Hammer size={24} />,
};

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-2">
            Nos Expertises
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Services Sur Mesure
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            De la conception à la pose, nous vous accompagnons dans chaque étape
            de votre projet de menuiserie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  {iconMap[service.icon] || <Hammer size={24} />}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:gap-2 transition-all"
                >
                  En savoir plus
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
