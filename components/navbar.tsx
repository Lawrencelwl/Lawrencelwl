"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, LogIn, Plus, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

// Event emitter for cross-component communication
export const lifePageEvents = {
  listeners: new Set<(show: boolean) => void>(),
  emit(show: boolean) {
    this.listeners.forEach((listener) => listener(show));
  },
  subscribe(listener: (show: boolean) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/life", label: "Life" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLifePage = pathname === "/life";
  const showLoginButton = isLifePage && !isAuthenticated;
  const showAuthenticatedButtons = isLifePage && isAuthenticated;

  const handleAddPhoto = () => {
    lifePageEvents.emit(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-foreground">
            Lawrencelwl
          </Link>

          {/* Desktop Navigation */}
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 md:flex md:items-center md:justify-center">
            <div className="pointer-events-auto flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle, Auth Buttons & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            {/* Authenticated buttons - Add Photo & Logout */}
            {mounted && showAuthenticatedButtons && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddPhoto}
                  aria-label="Add new photo"
                  title="Add new photo"
                >
                  <Plus className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
            {/* Login button - only when not authenticated */}
            {mounted && showLoginButton && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                aria-label="Go to login"
                title="Go to login"
              >
                <Link href="/login">
                  <LogIn className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {/* Theme toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary px-2 py-1",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
