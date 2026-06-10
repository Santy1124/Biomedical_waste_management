import {
  AlertTriangle,
  Archive,
  BarChart3,
  Bell,
  ClipboardList,
  GraduationCap,
  Home,
  Menu,
  Package,
  QrCode,
  Settings,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import React from "react";
import type { DemoUser } from "../types/auth";
import type { PageKey } from "../types/bmw";

const navGroups = [
  {
    title: "Main",
    items: [{ key: "dashboard", label: "Dashboard", icon: Home }],
  },
  {
    title: "Operations",
    items: [
      { key: "createBag", label: "Create Bag", icon: Package },
      { key: "bagTracking", label: "Bag Tracking", icon: ClipboardList },
      { key: "scanner", label: "Scanner", icon: QrCode },
      { key: "storage", label: "Storage", icon: Archive },
      { key: "pickup", label: "Pickup", icon: Truck },
    ],
  },
  {
    title: "Compliance",
    items: [
      { key: "incidents", label: "Incidents", icon: AlertTriangle },
      { key: "reports", label: "Reports", icon: BarChart3 },
      { key: "compliance", label: "Compliance Center", icon: ShieldCheck },
      { key: "alerts", label: "Alerts", icon: Bell },
    ],
  },
  {
    title: "Administration",
    items: [
      { key: "facility", label: "Facility Setup", icon: Settings },
      { key: "training", label: "Training", icon: GraduationCap },
    ],
  },
] as const;

type Props = {
  page: PageKey;
  setPage: (page: PageKey) => void;
  user: DemoUser;
  setUser: (user: DemoUser) => void;
  users: DemoUser[];
  children: React.ReactNode;
};

export function Layout({ page, setPage, user, setUser, users, children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function goToPage(nextPage: PageKey) {
    setPage(nextPage);
    setMobileOpen(false);
  }

  return (
    <div className="app-shell">
      <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
        <Menu size={18} />
        BMW Waste OS
      </button>

      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div>
            <div className="logo">BMW Waste OS</div>
            <div className="subtitle">Biomedical Waste Compliance Platform</div>
          </div>

          <button className="sidebar-close" onClick={() => setMobileOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-scroll">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter((item) =>
              user.allowedPages.includes(item.key)
            );

            if (visibleItems.length === 0) return null;

            return (
              <div className="nav-group" key={group.title}>
                <p className="nav-group-title">{group.title}</p>

                {visibleItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.key}
                      className={`side-nav-btn ${page === item.key ? "active" : ""}`}
                      onClick={() => goToPage(item.key)}
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="sidebar-footer">
          <p className="demo-label">Demo Role</p>
          <select
            value={user.role}
            onChange={(event) => {
              const nextUser = users.find((u) => u.role === event.target.value);
              if (nextUser) {
                setUser(nextUser);
                setPage(nextUser.allowedPages[0]);
                setMobileOpen(false);
              }
            }}
          >
            {users.map((demoUser) => (
              <option key={demoUser.role} value={demoUser.role}>
                {demoUser.name}
              </option>
            ))}
          </select>

          <p className="role-note">{user.role}</p>
        </div>
      </aside>

      <main className="content-area">
        <section className="page-card">{children}</section>
      </main>
    </div>
  );
}