import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-surface">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="text-8xl font-heading font-bold text-primary-100 mb-4">404</p>
        <h1 className="font-heading text-3xl font-bold mb-4">
          Page introuvable
        </h1>
        <p className="text-text-muted mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent-700 transition-colors"
          >
            <Home size={18} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
