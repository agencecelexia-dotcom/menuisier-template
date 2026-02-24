"use client";

import { useState, useEffect } from "react";
import { Save, RefreshCw, Check, FileText } from "lucide-react";

interface SiteContent {
  siteName: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  aboutTitle: string;
  aboutDescription: string;
  metaTitle: string;
  metaDescription: string;
  footerText: string;
  openingHours: string;
}

const FIELDS: {
  key: keyof SiteContent;
  label: string;
  type: "text" | "textarea";
  section: string;
}[] = [
  { key: "siteName", label: "Nom du site", type: "text", section: "general" },
  { key: "phone", label: "Téléphone", type: "text", section: "general" },
  { key: "email", label: "Email", type: "text", section: "general" },
  { key: "address", label: "Adresse", type: "text", section: "general" },
  {
    key: "openingHours",
    label: "Horaires d'ouverture",
    type: "text",
    section: "general",
  },
  {
    key: "heroTitle",
    label: "Titre Hero",
    type: "text",
    section: "hero",
  },
  {
    key: "heroSubtitle",
    label: "Sous-titre Hero",
    type: "textarea",
    section: "hero",
  },
  {
    key: "heroCta",
    label: "Texte bouton CTA",
    type: "text",
    section: "hero",
  },
  {
    key: "aboutTitle",
    label: "Titre page À propos",
    type: "text",
    section: "about",
  },
  {
    key: "aboutDescription",
    label: "Description À propos",
    type: "textarea",
    section: "about",
  },
  {
    key: "metaTitle",
    label: "Meta Title (SEO)",
    type: "text",
    section: "seo",
  },
  {
    key: "metaDescription",
    label: "Meta Description (SEO)",
    type: "textarea",
    section: "seo",
  },
  {
    key: "footerText",
    label: "Texte du footer",
    type: "textarea",
    section: "footer",
  },
];

const SECTIONS = [
  { id: "general", label: "Informations générales" },
  { id: "hero", label: "Section Hero (accueil)" },
  { id: "about", label: "Page À propos" },
  { id: "seo", label: "SEO / Référencement" },
  { id: "footer", label: "Pied de page" },
];

export default function ContenuTab() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setContent(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: content }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
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
            Contenu du site
          </h1>
          <p className="text-text-muted">
            Modifiez les textes affichés sur votre site
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saved ? (
            <Check size={16} />
          ) : saving ? (
            <RefreshCw size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saved ? "Enregistré !" : "Enregistrer"}
        </button>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl p-6 shadow-premium border border-border/50"
          >
            <h2 className="font-heading text-lg font-semibold text-primary mb-5 flex items-center gap-2">
              <FileText size={18} className="text-accent" />
              {section.label}
            </h2>
            <div className="space-y-4">
              {FIELDS.filter((f) => f.section === section.id).map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={content[field.key]}
                      onChange={(e) =>
                        setContent({ ...content, [field.key]: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-vertical"
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[field.key]}
                      onChange={(e) =>
                        setContent({ ...content, [field.key]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
