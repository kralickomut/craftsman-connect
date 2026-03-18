import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, Search, Wrench, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Domů", icon: Home },
  { to: "/search", label: "Hledat řemeslníka", icon: Search },
  { to: "/craftsman-dashboard", label: "Panel řemeslníka", icon: Wrench },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground text-lg font-extrabold">O</span>
            Oprav.to
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to}>
                  <Button variant={active ? "default" : "ghost"} size="sm" className="gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Link to="/login">
              <Button variant="outline" size="sm" className="ml-2 gap-2">
                <User className="h-4 w-4" />
                Přihlásit
              </Button>
            </Link>
          </nav>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden border-t bg-card p-4 space-y-1 animate-fade-in">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
                  <Button variant={active ? "default" : "ghost"} className="w-full justify-start gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" className="w-full justify-start gap-2 mt-2">
                <User className="h-4 w-4" />
                Přihlásit
              </Button>
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 Oprav.to. Všechna práva vyhrazena.
        </div>
      </footer>
    </div>
  );
}
