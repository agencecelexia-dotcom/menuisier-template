import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/images/services/cuisine-moderne.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-accent-200 text-sm md:text-base font-medium tracking-widest uppercase mb-4">
          Menuiserie Artisanale en Bretagne
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Menuiserie
          <br />
          <span className="text-white">d&apos;Excellence</span>
        </h1>
        <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Mickaël Le Gall transforme vos espaces en créant des meubles et
          agencements uniques, adaptés à vos besoins et à votre style.
          Plus de 20 ans de savoir-faire artisanal.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-accent-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Phone size={20} />
            Demander un Devis
          </Link>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white/10 transition-all duration-300"
          >
            Voir nos Réalisations
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
