"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  Wrench,
  Save,
} from "lucide-react";

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  image: string;
  features: string[];
}

const EMPTY: Service = {
  id: "",
  slug: "",
  title: "",
  description: "",
  longDescription: "",
  icon: "Wrench",
  image: "",
  features: [],
};

export default function ServicesTab() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [featuresText, setFeaturesText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/services");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEdit = (item: Service) => {
    setEditing({ ...item });
    setFeaturesText(item.features.join("\n"));
    setIsNew(false);
  };

  const openNew = () => {
    setEditing({ ...EMPTY });
    setFeaturesText("");
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    const item = {
      ...editing,
      id: editing.id || `svc-${Date.now()}`,
      slug:
        editing.slug ||
        editing.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-+$/, ""),
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: item }),
    });
    setEditing(null);
    setIsNew(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/services", {
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
            Services
          </h1>
          <p className="text-text-muted">
            Gérez les services proposés sur le site
          </p>
        </div>
        <button
          onClick={openNew}
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
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Wrench size={16} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(item)}
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
            <Wrench size={48} className="mx-auto mb-4 text-text-muted/30" />
            <p>Aucun service pour le moment</p>
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
                {isNew ? "Ajouter un service" : "Modifier le service"}
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
                  Titre
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: Cuisines Sur Mesure"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Slug
                </label>
                <input
                  type="text"
                  value={editing.slug}
                  onChange={(e) =>
                    setEditing({ ...editing, slug: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: cuisine (auto-généré si vide)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Description courte
                </label>
                <input
                  type="text"
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Description longue
                </label>
                <textarea
                  value={editing.longDescription}
                  onChange={(e) =>
                    setEditing({ ...editing, longDescription: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Image (chemin)
                </label>
                <input
                  type="text"
                  value={editing.image}
                  onChange={(e) =>
                    setEditing({ ...editing, image: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: /images/services/cuisine-moderne.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Icône (nom Lucide)
                </label>
                <input
                  type="text"
                  value={editing.icon}
                  onChange={(e) =>
                    setEditing({ ...editing, icon: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  placeholder="Ex: ChefHat, LayoutGrid, Hammer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Caractéristiques (une par ligne)
                </label>
                <textarea
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                  placeholder={"Design personnalisé\nBois massifs premium\nGarantie 10 ans"}
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
              Supprimer ce service ?
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
