import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-2 border-t border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
          Parlons de votre projet
        </h2>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Chaque projet commence par une conversation. Contactez Mickaël pour
          discuter de vos envies et obtenir un devis personnalisé gratuit.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 transition-all duration-300 shadow-lg"
          >
            <Phone size={20} />
            Demander un Devis Gratuit
          </Link>
          <a
            href="tel:0673016237"
            className="inline-flex items-center gap-2 border-2 border-primary/20 text-primary px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/5 transition-all duration-300"
          >
            06 73 01 62 37
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
