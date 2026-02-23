"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

const serviceOptions = [
  { value: "", label: "Sélectionnez un service" },
  { value: "cuisine", label: "Cuisine sur mesure" },
  { value: "escalier", label: "Escalier design" },
  { value: "dressing", label: "Dressing & rangements" },
  { value: "bibliotheque", label: "Bibliothèque" },
  { value: "bureau", label: "Bureau intégré" },
  { value: "sdb", label: "Salle de bain" },
  { value: "renovation", label: "Rénovation" },
  { value: "autre", label: "Autre projet" },
];

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "", service: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Erreur de connexion. Veuillez réessayer.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-accent-50 border border-accent-200 rounded-xl p-8 text-center">
        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Send size={24} className="text-white" />
        </div>
        <h3 className="font-heading text-xl font-semibold mb-2">Message Envoyé !</h3>
        <p className="text-text-muted">
          Merci pour votre message. Mickaël vous répondra dans les plus brefs délais.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-accent font-medium hover:underline"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Nom complet *
          </label>
          <input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
            placeholder="06 XX XX XX XX"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1.5">
            Service concerné
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
          Sujet *
        </label>
        <input
          id="subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
          placeholder="Sujet de votre message"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors resize-y"
          placeholder="Décrivez votre projet..."
        />
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send size={20} />
            Envoyer le Message
          </>
        )}
      </button>
    </form>
  );
}
