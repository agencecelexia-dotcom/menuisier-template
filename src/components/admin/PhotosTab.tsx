"use client";

import { useState } from "react";
import {
  ImageIcon,
  Eye,
  FolderOpen,
  Plus,
  Pencil,
  Trash2,
  Upload,
  Database,
  Cloud,
  X,
  Lock,
  CloudUpload,
  Tag,
  FileImage,
} from "lucide-react";
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
      { name: "cuisine-dinan-avant.jpg", path: "/images/portfolio/cuisine-dinan-avant.jpg", description: "Cuisine Dinan — Avant" },
      { name: "cuisine-dinan-apres.jpg", path: "/images/portfolio/cuisine-dinan-apres.jpg", description: "Cuisine Dinan — Après" },
      { name: "escalier-avant.jpg", path: "/images/portfolio/escalier-avant.jpg", description: "Escalier St-Brieuc — Avant" },
      { name: "escalier-apres.jpg", path: "/images/portfolio/escalier-apres.jpg", description: "Escalier St-Brieuc — Après" },
      { name: "dressing-avant.jpg", path: "/images/portfolio/dressing-avant.jpg", description: "Dressing Ploërmel — Avant" },
      { name: "dressing-apres.jpg", path: "/images/portfolio/dressing-apres.jpg", description: "Dressing Ploërmel — Après" },
      { name: "bibliotheque-avant.jpg", path: "/images/portfolio/bibliotheque-avant.jpg", description: "Bibliothèque Vannes — Avant" },
      { name: "bibliotheque-apres.jpg", path: "/images/portfolio/bibliotheque-apres.jpg", description: "Bibliothèque Vannes — Après" },
      { name: "sdb-avant.jpg", path: "/images/portfolio/sdb-avant.jpg", description: "Salle de bain Lannion — Avant" },
      { name: "sdb-apres.jpg", path: "/images/portfolio/sdb-apres.jpg", description: "Salle de bain Lannion — Après" },
      { name: "bureau-avant.jpg", path: "/images/portfolio/bureau-avant.jpg", description: "Bureau Guingamp — Avant" },
      { name: "bureau-apres.jpg", path: "/images/portfolio/bureau-apres.jpg", description: "Bureau Guingamp — Après" },
    ],
  },
  {
    title: "Services",
    folder: "/images/services/",
    photos: [
      { name: "cuisine-moderne.jpg", path: "/images/services/cuisine-moderne.jpg", description: "Service — Cuisines sur mesure" },
      { name: "escalier-bois.jpg", path: "/images/services/escalier-bois.jpg", description: "Service — Menuiseries & Agencements" },
      { name: "dressing-lumineux.jpg", path: "/images/services/dressing-lumineux.jpg", description: "Service — Rénovation & Restauration" },
    ],
  },
];

type ModalType = "preview" | "not-connected" | "upload-mockup" | "edit-mockup";

interface ModalState {
  type: ModalType;
  photo?: { path: string; description: string; name: string };
}

/* ------------------------------------------------------------------ */
/*  Modale "non connecté" avec aperçu de ce que ça donnerait          */
/* ------------------------------------------------------------------ */
function NotConnectedModal({
  action,
  onClose,
}: {
  action: "upload" | "edit" | "delete";
  onClose: () => void;
}) {
  const labels = {
    upload: { title: "Ajouter une photo", icon: <CloudUpload size={28} className="text-accent" /> },
    edit:   { title: "Modifier la photo",  icon: <Pencil size={28} className="text-accent" /> },
    delete: { title: "Supprimer la photo", icon: <Trash2 size={28} className="text-accent" /> },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-premium-lg w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            {labels[action].icon}
            <h3 className="font-heading text-xl font-bold text-primary">
              {labels[action].title}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface transition-colors">
            <X size={20} className="text-text-muted" />
          </button>
        </div>

        {/* Bandeau "non connecté" */}
        <div className="mx-6 mt-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <Lock size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Site non connecté à une base de données
            </p>
            <p className="text-sm text-amber-700 mt-1 leading-relaxed">
              La gestion des photos en ligne nécessite un service de stockage.
              L&apos;interface ci-dessous est un aperçu de ce que permettrait
              l&apos;intégration.
            </p>
          </div>
        </div>

        {/* Aperçu désactivé de l'UI d'upload */}
        <div className="p-6 pt-4 space-y-4 opacity-50 pointer-events-none select-none">
          {action === "upload" && (
            <>
              {/* Zone drag & drop */}
              <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center gap-3 bg-surface">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
                  <Upload size={24} className="text-accent" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-primary">Glissez vos photos ici</p>
                  <p className="text-sm text-text-muted">ou cliquez pour sélectionner</p>
                </div>
                <p className="text-xs text-text-muted">JPEG, PNG, WebP — max 5 Mo</p>
              </div>
              {/* Champs */}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5 flex items-center gap-1.5">
                  <Tag size={13} /> Nom / description
                </label>
                <div className="w-full h-10 rounded-lg border border-border bg-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5 flex items-center gap-1.5">
                  <FolderOpen size={13} /> Catégorie
                </label>
                <div className="w-full h-10 rounded-lg border border-border bg-surface" />
              </div>
            </>
          )}

          {action === "edit" && (
            <>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5 flex items-center gap-1.5">
                  <FileImage size={13} /> Remplacer l&apos;image
                </label>
                <div className="border-2 border-dashed border-border rounded-xl p-5 flex items-center gap-4 bg-surface">
                  <div className="w-16 h-16 rounded-lg bg-border/30 flex items-center justify-center">
                    <ImageIcon size={20} className="text-text-muted" />
                  </div>
                  <div>
                    <p className="text-sm text-primary font-medium">Choisir un nouveau fichier</p>
                    <p className="text-xs text-text-muted mt-0.5">Laisser vide pour conserver l&apos;actuelle</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Description</label>
                <div className="w-full h-10 rounded-lg border border-border bg-surface" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Catégorie</label>
                <div className="w-full h-10 rounded-lg border border-border bg-surface" />
              </div>
            </>
          )}

          {action === "delete" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-center">
              <Trash2 size={32} className="text-red-400 mx-auto mb-3" />
              <p className="font-medium text-red-700">Supprimer cette photo définitivement ?</p>
              <p className="text-sm text-red-600 mt-1">
                Elle sera retirée du site et du stockage cloud.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <div className="flex-1 h-11 bg-accent rounded-xl" />
            <div className="flex-1 h-11 bg-surface border border-border rounded-xl" />
          </div>
        </div>

        {/* Bloc "Pour activer" */}
        <div className="px-6 pb-6">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Pour activer cette fonctionnalité
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Database size={16} />, name: "Supabase", desc: "Storage + DB" },
              { icon: <Cloud size={16} />, name: "Cloudinary", desc: "CDN images" },
              { icon: <Cloud size={16} />, name: "AWS S3", desc: "Stockage cloud" },
            ].map((s) => (
              <div key={s.name} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-surface border border-border/50 text-center">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  {s.icon}
                </div>
                <p className="text-xs font-semibold text-primary">{s.name}</p>
                <p className="text-xs text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="w-full mt-4 py-2.5 rounded-xl text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Compris
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function PhotosTab() {
  const [preview, setPreview] = useState<{ path: string; description: string } | null>(null);
  const [notConnectedAction, setNotConnectedAction] = useState<"upload" | "edit" | "delete" | null>(null);
  const totalPhotos = PHOTO_GROUPS.reduce((acc, g) => acc + g.photos.length, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Photos</h1>
          <p className="text-text-muted">Galerie des images utilisées sur le site</p>
        </div>
        <button
          onClick={() => setNotConnectedAction("upload")}
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={16} />
          Ajouter une photo
        </button>
      </div>

      {/* Groupes de photos */}
      {PHOTO_GROUPS.map((group) => (
        <div key={group.folder} className="mb-8">
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-heading text-lg font-semibold text-primary flex items-center gap-2">
                <FolderOpen size={18} className="text-accent" />
                {group.title}
              </h2>
              <button
                onClick={() => setNotConnectedAction("upload")}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-accent/5"
              >
                <Plus size={14} />
                Ajouter dans ce dossier
              </button>
            </div>
            <p className="text-text-muted text-sm mb-5">
              Dossier :{" "}
              <code className="bg-surface px-1.5 py-0.5 rounded text-xs">
                {group.folder}
              </code>{" "}
              — {group.photos.length} images
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {group.photos.map((photo) => (
                <div
                  key={photo.path}
                  className="group relative aspect-square rounded-lg overflow-hidden border border-border/50 hover:border-accent/50 transition-all hover:shadow-md"
                >
                  <Image
                    src={photo.path}
                    alt={photo.description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />

                  {/* Overlay au survol */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all" />

                  {/* Boutons d'action */}
                  <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setPreview({ path: photo.path, description: photo.description })}
                      className="p-1.5 bg-white/90 hover:bg-white rounded-lg transition-colors"
                      title="Voir"
                    >
                      <Eye size={14} className="text-primary" />
                    </button>
                    <button
                      onClick={() => setNotConnectedAction("edit")}
                      className="p-1.5 bg-white/90 hover:bg-white rounded-lg transition-colors"
                      title="Modifier"
                    >
                      <Pencil size={14} className="text-primary" />
                    </button>
                    <button
                      onClick={() => setNotConnectedAction("delete")}
                      className="p-1.5 bg-white/90 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>

                  {/* Nom en bas */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs truncate">{photo.name}</p>
                  </div>
                </div>
              ))}

              {/* Carte "Ajouter" */}
              <button
                onClick={() => setNotConnectedAction("upload")}
                className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-accent/50 bg-surface hover:bg-accent/5 transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-border/50 group-hover:bg-accent/10 flex items-center justify-center transition-colors">
                  <Plus size={18} className="text-text-muted group-hover:text-accent transition-colors" />
                </div>
                <span className="text-xs text-text-muted group-hover:text-accent transition-colors">
                  Ajouter
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Compteur total */}
      <div className="text-center mb-4">
        <span className="text-sm text-text-muted">
          {totalPhotos} images au total sur le site
        </span>
      </div>

      {/* Modale preview */}
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
                <p className="font-medium text-primary">{preview.description}</p>
                <p className="text-text-muted text-sm">{preview.path}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setPreview(null); setNotConnectedAction("edit"); }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium bg-surface rounded-lg hover:bg-surface-2 text-primary transition-colors border border-border/50"
                >
                  <Pencil size={14} />
                  Modifier
                </button>
                <button
                  onClick={() => setPreview(null)}
                  className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale "non connecté" */}
      {notConnectedAction && (
        <NotConnectedModal
          action={notConnectedAction}
          onClose={() => setNotConnectedAction(null)}
        />
      )}
    </div>
  );
}
