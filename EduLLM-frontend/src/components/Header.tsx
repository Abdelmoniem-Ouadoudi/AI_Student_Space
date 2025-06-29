"use client";

import { Button } from "@/components/ui/button";
import { User, FolderOpen, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import SimpleLanguageSwitcher from "./SimpleLanguageSwitcher";
import { useEffect, useState } from "react";
import { isAuthenticated, clearUserAuth } from "@/lib/auth-utils";
import { SimpleThemeToggle } from "./ThemeSwitcher";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [auth, setAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Check if the current locale is RTL - only after mount to avoid hydration issues
  const isRTL = locale === 'ar';
  // Check if we're on the home page
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  
  // Initial setup on mount and route change
  useEffect(() => {
    setMounted(true);
    const authed = isAuthenticated();
    setAuth(authed);
    
    // Auto-hide header on chat page
    if (pathname.includes(`/${locale}/chat`)) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
  }, [pathname, locale]);

  // Toggle function
  const toggleHeader = () => {
    console.log('Toggling header from:', isHeaderVisible, 'to:', !isHeaderVisible);
    setIsHeaderVisible(prevState => !prevState);
  };

  const handleLogout = () => {
    clearUserAuth();
    window.location.href = `/${locale}/`;
  };

  return (
    <>
      {/* Toggle button - only on chat pages */}
      {mounted && pathname.includes(`/${locale}/chat`) && (
        <div className="relative group">
          <button 
            onClick={toggleHeader}
            className={`fixed bottom-20 right-4 z-50 bg-card/90 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 rounded-full p-3 shadow-xl ${isHeaderVisible ? 'rotate-180' : ''} transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none`}
            title={isHeaderVisible ? t("nav.hideNavigation") : t("nav.showNavigation")}
            aria-label={isHeaderVisible ? t("nav.hideNavigation") : t("nav.showNavigation")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground group-hover:text-primary transition-colors">
              <path d="m6 9 6 6 6-6"/>
            </svg>
            <span className="sr-only">{isHeaderVisible ? t("nav.hideNavigation") : t("nav.showNavigation")}</span>
          </button>
          
          {/* Tooltip */}
          <div className="absolute right-16 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-card/95 backdrop-blur-md px-3 py-2 rounded-md shadow-lg text-sm text-foreground border border-border">
              {isHeaderVisible ? t("nav.hideNavigation") : t("nav.showNavigation")}
            </div>
          </div>
        </div>
      )}

      {/* Main navigation */}
      <nav 
        className={`fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md py-4 mt-auto shadow-lg transition-all duration-500 ease-in-out ${
          !isHeaderVisible ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="max-w-6xl px-6 mx-auto">
          <div className={`flex items-center justify-between h-16${isRTL ? ' flex-row-reverse' : ''}`}>
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className={`flex items-center gap-3${isRTL ? ' flex-row-reverse' : ''}`}
            >
              <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl">
                <Image 
                  src="/imgs/1750783385632jx2g3bb3.webp" 
                  alt="AI Student Space Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg font-semibold text-foreground">
                AI Student Space
              </span>
            </Link>

            {/* Navigation Items */}
            <div className={`flex items-center gap-4${isRTL ? ' flex-row-reverse' : ''}`}>
              {/* Show user avatar and action buttons for authenticated users */}
              {mounted && auth && (
                <>
                  <Link
                    href={`/${locale}/settings`}
                    className="px-3 py-1.5 text-xs sm:text-sm text-foreground hover:bg-muted rounded-md border border-border whitespace-nowrap flex items-center gap-1.5"
                  >
                    <FolderOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{t("nav.fileManager")}</span>
                  </Link>
                  <button
                    className="px-3 py-1.5 text-red-400 hover:bg-muted rounded-md border border-border flex items-center justify-center"
                    onClick={handleLogout}
                    title={t("nav.logout")}
                  >
                    <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </>
              )}

              {/* Theme Switcher */}
              <SimpleThemeToggle />

              {/* Language Switcher */}
              <SimpleLanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
