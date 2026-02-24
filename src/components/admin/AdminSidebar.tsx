"use client";

import {
  BarChart3,
  FileText,
  ImageIcon,
  MessageSquare,
  Wrench,
  FolderOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "contenu", label: "Contenu", icon: FileText },
  { id: "photos", label: "Photos", icon: ImageIcon },
  { id: "temoignages", label: "Témoignages", icon: MessageSquare },
  { id: "services", label: "Services", icon: Wrench },
  { id: "projets", label: "Projets", icon: FolderOpen },
];

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
}: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    document.cookie =
      "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin/login");
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-premium border border-border/50"
        aria-label="Menu"
      >
        <Menu size={20} className="text-primary" />
      </button>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-white flex flex-col transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="font-heading text-lg font-bold">Admin Panel</h2>
            <p className="text-white/60 text-xs mt-0.5">Atelier Le Gall</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1 rounded hover:bg-white/10"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}
