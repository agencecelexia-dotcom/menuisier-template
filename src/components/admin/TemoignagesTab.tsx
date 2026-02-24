"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Star,
  RefreshCw,
  MessageSquare,
  Save,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  projectSlug: string;
}

const EMPTY: Testimonial = {
  id: "",
  name: "",
  location: "",
  text: "",
  rating: 5,
  projectSlug: "",
};

export default function TemoignagesTab() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    const item = {
      ...editing,
      id: editing.id || `testi-${Date.now()}`,
    };
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: item }),
    });
    setEditing(null);
    setIsNew(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    setDeleting(null);
    fetchData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw size={32} className="text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">
            Témoignages
          </h1>
          <p className="text-text-muted">
            Gérez les avis clients affichés sur le site
          </p>
        </div>
        <button
          onClick={() => {
            setEditing({ ...EMPTY });
            setIsNew(true);
          }}
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors"
        >
          <Plus size={16} />
          Ajouter
        </button>
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-5 shadow-premium border border-border/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-heading font-semibold text-primary">
                    {item.name}
                  </h3>
                  <span className="text-text-muted text-sm">
                    — {item.location}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < item.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
                {item.projectSlug && (
                  <p className="text-xs text-accent mt-2">
                    Projet : {item.projectSlug}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditing({ ...item });
                    setIsNew(false);
                  }}
                  className="p-2 rounded-lg hover:bg-surface transition-colors"
                  title="Modifier"
                >
                  <Pencil size={16} className="text-primary" />
                </button>
                <button
                  onClick={() => setDeleting(item.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <MessageSquare
              size={48}
              className="mx-auto mb-4 text-text-muted/30"
            />
            <p>Aucun témoignage pour le moment</p>
          </div>
        )}
      </div>

      {/* Modal édition */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setEditing(null);
            setIsNew(false);
          }}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-premium-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
              <h3 className="font-heading text-xl font-bold text-primary">
                {isNew ? "Ajouter un témoignage" : "Modifier le témoignage"}
              </h3>
              <button
                onClick={() => {
                  setEditing(null);
                  setIsNew(false);
                }}
                className="p-1.5 rounded-lg hover:bg-surface transition-colors"
              >
                <X size={20} className="text-text-muted" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Nom du client
                </label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: Sophie Dubois"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Ville
                </label>
                <input
                  type="text"
                  value={editing.location}
                  onChange={(e) =>
                    setEditing({ ...editing, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: Dinan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Témoignage
                </label>
                <textarea
                  value={editing.text}
                  onChange={(e) =>
                    setEditing({ ...editing, text: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                  placeholder="L'avis du client..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Note
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() =>
                        setEditing({
                          ...editing,
                          rating: n as 1 | 2 | 3 | 4 | 5,
                        })
                      }
                      className="p-1"
                    >
                      <Star
                        size={24}
                        className={
                          n <= editing.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 hover:text-amber-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Slug du projet associé
                </label>
                <input
                  type="text"
                  value={editing.projectSlug}
                  onChange={(e) =>
                    setEditing({ ...editing, projectSlug: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: cuisine-dinan (optionnel)"
                />
              </div>
            </div>
            <div className="p-6 pt-2 flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors"
              >
                <Save size={18} />
                {isNew ? "Ajouter" : "Enregistrer"}
              </button>
              <button
                onClick={() => {
                  setEditing(null);
                  setIsNew(false);
                }}
                className="px-6 py-3 rounded-xl font-medium bg-surface text-primary hover:bg-surface/80 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal suppression */}
      {deleting && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setDeleting(null)}
        >
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-premium-lg w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-lg font-bold text-primary mb-2">
              Supprimer ce témoignage ?
            </h3>
            <p className="text-text-muted text-sm mb-6">
              Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleting)}
                className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Supprimer
              </button>
              <button
                onClick={() => setDeleting(null)}
                className="flex-1 bg-surface text-primary px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-surface/80 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
