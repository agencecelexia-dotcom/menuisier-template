"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  RefreshCw,
  FolderOpen,
  Save,
  MapPin,
  Calendar,
} from "lucide-react";

interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  year: number;
  category: string;
  beforeImage: string;
  afterImage: string;
  challenges: string[];
  solutions: string[];
  materials: string[];
  timeline: string;
  budget: string;
}

const CATEGORIES = [
  { value: "cuisine", label: "Cuisine" },
  { value: "escalier", label: "Escalier" },
  { value: "dressing", label: "Dressing" },
  { value: "bibliotheque", label: "Bibliothèque" },
  { value: "sdb", label: "Salle de bain" },
  { value: "bureau", label: "Bureau" },
];

const EMPTY: Project = {
  id: "",
  slug: "",
  title: "",
  shortDescription: "",
  fullDescription: "",
  location: "",
  year: new Date().getFullYear(),
  category: "cuisine",
  beforeImage: "",
  afterImage: "",
  challenges: [],
  solutions: [],
  materials: [],
  timeline: "",
  budget: "",
};

export default function ProjetsTab() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [challengesText, setChallengesText] = useState("");
  const [solutionsText, setSolutionsText] = useState("");
  const [materialsText, setMaterialsText] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    if (data.success) setItems(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEdit = (item: Project) => {
    setEditing({ ...item });
    setChallengesText(item.challenges.join("\n"));
    setSolutionsText(item.solutions.join("\n"));
    setMaterialsText(item.materials.join("\n"));
    setIsNew(false);
  };

  const openNew = () => {
    setEditing({ ...EMPTY });
    setChallengesText("");
    setSolutionsText("");
    setMaterialsText("");
    setIsNew(true);
  };

  const handleSave = async () => {
    if (!editing) return;
    const item = {
      ...editing,
      id: editing.id || `proj-${Date.now()}`,
      slug:
        editing.slug ||
        editing.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/-+$/, ""),
      challenges: challengesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      solutions: solutionsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      materials: materialsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: item }),
    });
    setEditing(null);
    setIsNew(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", id }),
    });
    setDeleting(null);
    fetchData();
  };

  const getCategoryLabel = (cat: string) =>
    CATEGORIES.find((c) => c.value === cat)?.label ?? cat;

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
            Projets
          </h1>
          <p className="text-text-muted">
            Gérez le portfolio de réalisations
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
                  <h3 className="font-heading font-semibold text-primary">
                    {item.title}
                  </h3>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  {item.shortDescription}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {item.year}
                  </span>
                  <span>{item.timeline}</span>
                  <span className="font-medium">{item.budget}</span>
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
            <FolderOpen
              size={48}
              className="mx-auto mb-4 text-text-muted/30"
            />
            <p>Aucun projet pour le moment</p>
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
            className="relative bg-white rounded-2xl shadow-premium-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-4 border-b border-border/50">
              <h3 className="font-heading text-xl font-bold text-primary">
                {isNew ? "Ajouter un projet" : "Modifier le projet"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="Ex: Cuisine Contemporaine — Dinan"
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
                    placeholder="Auto-généré si vide"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Catégorie
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) =>
                      setEditing({ ...editing, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Localisation
                  </label>
                  <input
                    type="text"
                    value={editing.location}
                    onChange={(e) =>
                      setEditing({ ...editing, location: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Ex: Dinan, Côtes-d'Armor"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Année
                  </label>
                  <input
                    type="number"
                    value={editing.year}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        year: parseInt(e.target.value) || 2024,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Description courte
                </label>
                <input
                  type="text"
                  value={editing.shortDescription}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Description complète
                </label>
                <textarea
                  value={editing.fullDescription}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      fullDescription: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Image Avant
                  </label>
                  <input
                    type="text"
                    value={editing.beforeImage}
                    onChange={(e) =>
                      setEditing({ ...editing, beforeImage: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="/images/portfolio/xxx-avant.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Image Après
                  </label>
                  <input
                    type="text"
                    value={editing.afterImage}
                    onChange={(e) =>
                      setEditing({ ...editing, afterImage: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="/images/portfolio/xxx-apres.jpg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Durée du projet
                  </label>
                  <input
                    type="text"
                    value={editing.timeline}
                    onChange={(e) =>
                      setEditing({ ...editing, timeline: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Ex: 3 mois"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={editing.budget}
                    onChange={(e) =>
                      setEditing({ ...editing, budget: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
                    placeholder="Ex: €€€"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Défis (un par ligne)
                </label>
                <textarea
                  value={challengesText}
                  onChange={(e) => setChallengesText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                  placeholder={"Défi 1\nDéfi 2"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Solutions (une par ligne)
                </label>
                <textarea
                  value={solutionsText}
                  onChange={(e) => setSolutionsText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                  placeholder={"Solution 1\nSolution 2"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">
                  Matériaux (un par ligne)
                </label>
                <textarea
                  value={materialsText}
                  onChange={(e) => setMaterialsText(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent resize-vertical"
                  placeholder={"Chêne massif\nMarbre Calacatta"}
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
              Supprimer ce projet ?
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
