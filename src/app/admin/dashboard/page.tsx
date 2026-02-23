"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Eye,
  MousePointerClick,
  Send,
  Calendar,
  TrendingUp,
  LogOut,
  RefreshCw,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";

interface AnalyticsEvent {
  type: string;
  page?: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
}

// Fausses statistiques réalistes
const FAKE_STATS = {
  totalViews: 2847,
  todayViews: 34,
  weekViews: 187,
  monthViews: 723,
  ctaClicks: 156,
  formSubmits: 42,
  uniqueVisitors: 1923,
  avgSessionDuration: "2m 34s",
  bounceRate: "38.2%",
  conversionRate: "1.5%",
  topPages: [
    { page: "/", views: 1204 },
    { page: "/realisations", views: 534 },
    { page: "/services", views: 421 },
    { page: "/contact", views: 387 },
    { page: "/a-propos", views: 189 },
    { page: "/realisations/cuisine-contemporaine-dinan", views: 112 },
  ],
  topReferrers: [
    { source: "Google (organic)", visits: 1456 },
    { source: "Direct", visits: 687 },
    { source: "Google Maps", visits: 342 },
    { source: "Facebook", visits: 198 },
    { source: "Pages Jaunes", visits: 89 },
  ],
  recentSubmissions: [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie.dupont@gmail.com",
      phone: "06 12 34 56 78",
      service: "Cuisine sur mesure",
      subject: "Rénovation cuisine ouverte",
      message:
        "Bonjour, nous souhaitons rénover entièrement notre cuisine pour la transformer en cuisine ouverte sur le séjour. La pièce fait environ 15m². Nous aimerions des matériaux nobles (chêne massif) avec un plan de travail en granit. Disponible en semaine pour un rendez-vous.",
      location: "Dinan (22100)",
      date: "20/02/2026",
      time: "14:32",
      status: "Nouveau",
    },
    {
      id: 2,
      name: "Jean-Pierre Martin",
      email: "jp.martin@outlook.fr",
      phone: "06 98 76 54 32",
      service: "Escalier",
      subject: "Escalier sur mesure pour mezzanine",
      message:
        "Bonjour Mickaël, je fais construire une mezzanine dans mon salon et j'aurais besoin d'un escalier hélicoïdal en bois. Hauteur sous plafond 3m20. J'ai vu vos réalisations sur le site, c'est exactement ce que je recherche. Pouvez-vous passer voir les lieux ?",
      location: "Saint-Brieuc (22000)",
      date: "19/02/2026",
      time: "09:15",
      status: "Contacté",
    },
    {
      id: 3,
      name: "Sophie Leroy",
      email: "sophie.leroy22@free.fr",
      phone: "07 45 23 67 89",
      service: "Dressing",
      subject: "Dressing chambre parentale",
      message:
        "Bonjour, nous venons d'emménager et la chambre parentale dispose d'un grand renfoncement (3m x 2m) qui serait parfait pour un dressing sur mesure. Nous aimerions des portes coulissantes et beaucoup de rangements. Budget autour de 5000-7000€.",
      location: "Ploërmel (56800)",
      date: "18/02/2026",
      time: "18:47",
      status: "Devis envoyé",
    },
    {
      id: 4,
      name: "Pierre Moreau",
      email: "p.moreau@wanadoo.fr",
      phone: "06 33 44 55 66",
      service: "Bibliothèque",
      subject: "Bibliothèque murale salon",
      message:
        "Je souhaite faire réaliser une grande bibliothèque murale sur tout un pan de mur de mon salon (4m50 de large, 2m60 de haut). Style classique avec moulures. Bois massif de préférence. Merci de me contacter pour en discuter.",
      location: "Vannes (56000)",
      date: "17/02/2026",
      time: "11:20",
      status: "Contacté",
    },
    {
      id: 5,
      name: "Isabelle Petit",
      email: "isabelle.petit@gmail.com",
      phone: "06 77 88 99 00",
      service: "Rénovation",
      subject: "Rénovation menuiseries anciennes",
      message:
        "Bonjour, nous avons acheté une longère bretonne et les menuiseries intérieures (portes, plinthes, encadrements) sont en mauvais état. Nous cherchons un artisan pour restaurer ces éléments d'époque tout en les modernisant. Environ 8 portes + huisseries.",
      location: "Guingamp (22200)",
      date: "15/02/2026",
      time: "16:05",
      status: "Devis envoyé",
    },
  ],
  weeklyData: [
    { day: "Lun", views: 28 },
    { day: "Mar", views: 35 },
    { day: "Mer", views: 22 },
    { day: "Jeu", views: 41 },
    { day: "Ven", views: 31 },
    { day: "Sam", views: 18 },
    { day: "Dim", views: 12 },
  ],
};

const STATUS_OPTIONS = [
  { label: "Nouveau", color: "bg-blue-50 text-blue-700" },
  { label: "Contacté", color: "bg-amber-50 text-amber-700" },
  { label: "Devis envoyé", color: "bg-green-50 text-green-700" },
  { label: "En cours", color: "bg-purple-50 text-purple-700" },
  { label: "Terminé", color: "bg-emerald-50 text-emerald-700" },
  { label: "Annulé", color: "bg-red-50 text-red-700" },
];

function getStatusColor(status: string) {
  return STATUS_OPTIONS.find((s) => s.label === status)?.color ?? "bg-gray-50 text-gray-700";
}

type Submission = (typeof FAKE_STATS.recentSubmissions)[number];

export default function AdminDashboardPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState(FAKE_STATS.recentSubmissions);
  const [statusDropdownId, setStatusDropdownId] = useState<number | null>(null);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch {
      console.error("Failed to fetch analytics");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Combiner les vrais events avec les faux pour que le dashboard soit toujours rempli
  const realViews = events.filter((e) => e.type === "page_view").length;
  const totalViews = FAKE_STATS.totalViews + realViews;

  const updateStatus = (id: number, newStatus: string) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (selectedSubmission?.id === id) {
      setSelectedSubmission((prev) => prev ? { ...prev, status: newStatus } : null);
    }
    setStatusDropdownId(null);
  };

  const handleLogout = () => {
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-surface pt-20">
        <div className="animate-spin">
          <RefreshCw size={32} className="text-accent" />
        </div>
      </section>
    );
  }

  const maxBarViews = FAKE_STATS.weeklyData.reduce(
    (max, d) => Math.max(max, d.views),
    0
  );

  return (
    <section className="min-h-screen bg-surface pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-primary">
              Dashboard
            </h1>
            <p className="text-text-muted">
              Statistiques Atelier Le Gall — Février 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-lg border border-border hover:bg-white transition-colors"
              aria-label="Rafraîchir"
            >
              <RefreshCw size={20} className="text-primary" />
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Eye size={20} className="text-accent" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                +12%
              </span>
            </div>
            <p className="text-3xl font-bold text-primary">{totalViews.toLocaleString("fr-FR")}</p>
            <p className="text-text-muted text-sm mt-1">Visites totales</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users size={20} className="text-blue-600" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                +8%
              </span>
            </div>
            <p className="text-3xl font-bold text-primary">{FAKE_STATS.uniqueVisitors.toLocaleString("fr-FR")}</p>
            <p className="text-text-muted text-sm mt-1">Visiteurs uniques</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <MousePointerClick size={20} className="text-amber-600" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight size={12} />
                +23%
              </span>
            </div>
            <p className="text-3xl font-bold text-primary">{FAKE_STATS.ctaClicks}</p>
            <p className="text-text-muted text-sm mt-1">Clics &quot;Devis Gratuit&quot;</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <Send size={20} className="text-emerald-600" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                <ArrowDownRight size={12} />
                -3%
              </span>
            </div>
            <p className="text-3xl font-bold text-primary">{FAKE_STATS.formSubmits}</p>
            <p className="text-text-muted text-sm mt-1">Demandes de devis</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-premium border border-border/50">
            <p className="text-text-muted text-sm mb-1">Taux de conversion</p>
            <p className="text-2xl font-bold text-accent">{FAKE_STATS.conversionRate}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-premium border border-border/50">
            <p className="text-text-muted text-sm mb-1">Durée moyenne session</p>
            <p className="text-2xl font-bold text-primary">{FAKE_STATS.avgSessionDuration}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-premium border border-border/50">
            <p className="text-text-muted text-sm mb-1">Taux de rebond</p>
            <p className="text-2xl font-bold text-primary">{FAKE_STATS.bounceRate}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Chart */}
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <h2 className="font-heading text-lg font-semibold text-primary mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-accent" />
              Visites cette semaine
            </h2>
            <div className="flex items-end justify-between gap-2 h-40">
              {FAKE_STATS.weeklyData.map((d) => (
                <div key={d.day} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-medium text-primary">
                    {d.views}
                  </span>
                  <div
                    className="w-full bg-accent/80 rounded-t-md min-h-[4px] transition-all"
                    style={{
                      height: `${(d.views / maxBarViews) * 100}%`,
                    }}
                  />
                  <span className="text-xs text-text-muted">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Period Stats */}
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <h2 className="font-heading text-lg font-semibold text-primary mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-accent" />
              Visites par période
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <span className="text-text-muted text-sm">Aujourd&apos;hui</span>
                <span className="font-semibold text-primary">{FAKE_STATS.todayViews}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <span className="text-text-muted text-sm">Cette semaine</span>
                <span className="font-semibold text-primary">{FAKE_STATS.weekViews}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-border/50">
                <span className="text-text-muted text-sm">Ce mois</span>
                <span className="font-semibold text-primary">{FAKE_STATS.monthViews}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-text-muted text-sm">Total</span>
                <span className="font-bold text-accent">{totalViews.toLocaleString("fr-FR")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <h2 className="font-heading text-lg font-semibold text-primary mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-accent" />
              Pages les plus visitées
            </h2>
            <div className="space-y-3">
              {FAKE_STATS.topPages.map((p) => (
                <div key={p.page} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-primary truncate mr-4">
                    {p.page}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-surface rounded-full h-2 hidden sm:block">
                      <div
                        className="bg-accent rounded-full h-2"
                        style={{
                          width: `${(p.views / FAKE_STATS.topPages[0].views) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-primary w-12 text-right">
                      {p.views}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
            <h2 className="font-heading text-lg font-semibold text-primary mb-6 flex items-center gap-2">
              <ArrowUpRight size={20} className="text-accent" />
              Sources de trafic
            </h2>
            <div className="space-y-3">
              {FAKE_STATS.topReferrers.map((r) => (
                <div key={r.source} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-primary truncate mr-4">
                    {r.source}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-surface rounded-full h-2 hidden sm:block">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{
                          width: `${(r.visits / FAKE_STATS.topReferrers[0].visits) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-primary w-12 text-right">
                      {r.visits}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-premium border border-border/50">
          <h2 className="font-heading text-lg font-semibold text-primary mb-6 flex items-center gap-2">
            <Send size={20} className="text-accent" />
            Dernières demandes de devis
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider pb-3 pr-4">
                    Client
                  </th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider pb-3 pr-4">
                    Service
                  </th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider pb-3 pr-4">
                    Date
                  </th>
                  <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider pb-3 pr-4">
                    Statut
                  </th>
                  <th className="pb-3 w-8" />
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedSubmission(s)}
                    className="border-b border-border/30 last:border-0 cursor-pointer hover:bg-surface transition-colors"
                  >
                    <td className="py-3 pr-4">
                      <span className="text-sm font-medium text-primary">{s.name}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-text-muted">{s.service}</span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-sm text-text-muted">{s.date}</span>
                    </td>
                    <td className="py-3 pr-4 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setStatusDropdownId(statusDropdownId === s.id ? null : s.id);
                        }}
                        className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-accent/30 transition-all ${getStatusColor(s.status)}`}
                      >
                        {s.status}
                      </button>
                      {statusDropdownId === s.id && (
                        <div
                          className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-premium-lg border border-border/50 py-1 z-20 min-w-[160px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() => updateStatus(s.id, opt.label)}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-surface transition-colors flex items-center gap-2 ${
                                s.status === opt.label ? "font-semibold" : ""
                              }`}
                            >
                              <span className={`inline-block w-2 h-2 rounded-full ${opt.color.split(" ")[0].replace("50", "500")}`} />
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-3">
                      <ChevronRight size={16} className="text-text-muted" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal détail demande */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-premium-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-border/50">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary">
                  {selectedSubmission.name}
                </h3>
                <p className="text-text-muted text-sm mt-1">
                  {selectedSubmission.subject}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-1.5 rounded-lg hover:bg-surface transition-colors"
                aria-label="Fermer"
              >
                <X size={20} className="text-text-muted" />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-5">
              {/* Statut + Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-sm text-text-muted">
                    <Clock size={14} />
                    {selectedSubmission.date} à {selectedSubmission.time}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Statut
                </p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => updateStatus(selectedSubmission.id, opt.label)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all ${
                        selectedSubmission.status === opt.label
                          ? `${getStatusColor(opt.label)} ring-2 ring-offset-1 ring-current`
                          : "bg-surface text-text-muted hover:bg-surface-2"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Infos contact */}
              <div className="bg-surface rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-accent shrink-0" />
                  <span className="text-sm text-primary">{selectedSubmission.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-accent shrink-0" />
                  <span className="text-sm text-primary">{selectedSubmission.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-accent shrink-0" />
                  <span className="text-sm text-primary">{selectedSubmission.location}</span>
                </div>
              </div>

              {/* Service */}
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
                  Service demandé
                </p>
                <p className="text-sm font-medium text-primary">
                  {selectedSubmission.service}
                </p>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">
                  Message
                </p>
                <div className="bg-surface rounded-xl p-4">
                  <p className="text-sm text-primary leading-relaxed whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${selectedSubmission.phone.replace(/\s/g, "")}`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-accent-700 transition-colors"
              >
                <Phone size={18} />
                Appeler
              </a>
              <a
                href={`mailto:${selectedSubmission.email}?subject=Re: ${encodeURIComponent(selectedSubmission.subject)} - Atelier Le Gall`}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail size={18} />
                Envoyer un email
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
