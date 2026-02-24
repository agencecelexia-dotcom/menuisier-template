"use client";

import { useState } from "react";
import { ImageIcon, Eye, FolderOpen } from "lucide-react";
import Image from "next/image";

interface PhotoGroup {
  title: string;
  folder: string;
  photos: { name: string; path: string; description: string }[];
}

const PHOTO_GROUPS: PhotoGroup[] = [
  {
    title: "Portfolio — Avant/Après",
    folder: "/images/portfolio/",
    photos: [
      {
        name: "cuisine-dinan-avant.jpg",
        path: "/images/portfolio/cuisine-dinan-avant.jpg",
        description: "Cuisine Dinan — Avant",
      },
      {
        name: "cuisine-dinan-apres.jpg",
        path: "/images/portfolio/cuisine-dinan-apres.jpg",
        description: "Cuisine Dinan — Après",
      },
      {
        name: "escalier-avant.jpg",
        path: "/images/portfolio/escalier-avant.jpg",
        description: "Escalier St-Brieuc — Avant",
      },
      {
        name: "escalier-apres.jpg",
        path: "/images/portfolio/escalier-apres.jpg",
        description: "Escalier St-Brieuc — Après",
      },
      {
        name: "dressing-avant.jpg",
        path: "/images/portfolio/dressing-avant.jpg",
        description: "Dressing Ploërmel — Avant",
      },
      {
        name: "dressing-apres.jpg",
        path: "/images/portfolio/dressing-apres.jpg",
        description: "Dressing Ploërmel — Après",
      },
      {
        name: "bibliotheque-avant.jpg",
        path: "/images/portfolio/bibliotheque-avant.jpg",
        description: "Bibliothèque Vannes — Avant",
      },
      {
        name: "bibliotheque-apres.jpg",
        path: "/images/portfolio/bibliotheque-apres.jpg",
        description: "Bibliothèque Vannes — Après",
      },
      {
        name: "sdb-avant.jpg",
        path: "/images/portfolio/sdb-avant.jpg",
        description: "Salle de bain Lannion — Avant",
      },
      {
        name: "sdb-apres.jpg",
        path: "/images/portfolio/sdb-apres.jpg",
        description: "Salle de bain Lannion — Après",
      },
      {
        name: "bureau-avant.jpg",
        path: "/images/portfolio/bureau-avant.jpg",
        description: "Bureau Guingamp — Avant",
      },
      {
        name: "bureau-apres.jpg",
        path: "/images/portfolio/bureau-apres.jpg",
        description: "Bureau Guingamp — Après",
      },
    ],
  },
  {
    title: "Services",
    folder: "/images/services/",
    photos: [
      {
        name: "cuisine-moderne.jpg",
        path: "/images/services/cuisine-moderne.jpg",
        description: "Service — Cuisines sur mesure",
      },
      {
        name: "escalier-bois.jpg",
        path: "/images/services/escalier-bois.jpg",
        description: "Service — Menuiseries & Agencements",
      },
      {
        name: "dressing-lumineux.jpg",
        path: "/images/services/dressing-lumineux.jpg",
        description: "Service — Rénovation & Restauration",
      },
    ],
  },
];

export default function PhotosTab() {
  const [preview, setPreview] = useState<{
    path: string;
    description: string;
  } | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Photos
          </h1>
          <p className="text-text-muted">
            Galerie des images utilisées sur le site
          </p>
        </div>
        <div className="text-sm text-text-muted bg-white px-4 py-2 rounded-lg border border-border/50">
          {PHOTO_GROUPS.reduce((acc, g) => acc + g.photos.length, 0)} images au
          total
        </div>
      </div>

      {PHOTO_GROUPS.map((group) => (
        <div key={group.folder} className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <h2 className="font-heading text-lg font-semibold text-primary mb-2 flex items-center gap-2">
              <FolderOpen size={18} className="text-accent" />
              {group.title}
            </h2>
            <p className="text-text-muted text-sm mb-5">
              Dossier : <code className="bg-surface px-1.5 py-0.5 rounded text-xs">{group.folder}</code> — {group.photos.length} images
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {group.photos.map((photo) => (
                <button
                  key={photo.path}
                  onClick={() =>
                    setPreview({
                      path: photo.path,
                      description: photo.description,
                    })
                  }
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border/50 hover:border-accent/50 transition-all hover:shadow-md"
                >
                  <Image
                    src={photo.path}
                    alt={photo.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all flex items-center justify-center">
                    <Eye
                      size={24}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white text-xs truncate">
                      {photo.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
        <div className="flex items-start gap-3">
          <ImageIcon size={20} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              Gestion des images
            </p>
            <p className="text-sm text-amber-700 mt-1">
              Pour ajouter ou remplacer des images, placez-les dans le dossier{" "}
              <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">
                public/images/
              </code>{" "}
              de votre projet. Les images seront automatiquement disponibles
              sur le site.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-premium-lg max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={preview.path}
                alt={preview.description}
                fill
                className="object-contain bg-surface"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-primary">
                  {preview.description}
                </p>
                <p className="text-text-muted text-sm">{preview.path}</p>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 text-sm font-medium bg-surface rounded-lg hover:bg-surface text-primary transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
