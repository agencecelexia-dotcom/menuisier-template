import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-sm mb-6">
          <Link href="/services" className="text-white/70 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/realisations" className="text-white/70 hover:text-white transition-colors">
            Réalisations
          </Link>
          <Link href="/a-propos" className="text-white/70 hover:text-white transition-colors">
            À Propos
          </Link>
          <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
            Contact
          </Link>
          <a href="tel:0673016237" className="text-white/70 hover:text-white transition-colors">
            06 73 01 62 37
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} Atelier Le Gall</p>
          <Link href="/mentions-legales" className="hover:text-white/60 transition-colors">
            Mentions légales
          </Link>
          <Link href="/politique-confidentialite" className="hover:text-white/60 transition-colors">
            Confidentialité
          </Link>
          <Link href="/admin/login" className="hover:text-white/60 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
