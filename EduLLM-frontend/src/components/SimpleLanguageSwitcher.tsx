"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CircleFlagsUs } from "./icons/CircleFlagsUs";
import { CircleFlagsFr } from "./icons/CircleFlagsFr";
import { CircleFlagsSa } from "./icons/CircleFlagsSa";

const languages = [
  { code: "en", name: "English", flag: <CircleFlagsUs /> },
  { code: "fr", name: "Français", flag: <CircleFlagsFr /> },
  { code: "ar", name: "العربية", flag: <CircleFlagsSa /> },
];

export default function SimpleLanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === locale);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-12 h-12 rounded-2xl bg-background/60 border border-border/40 hover:border-primary/40 transition-all duration-500 flex items-center justify-center overflow-hidden hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="relative z-10 flex items-center justify-center">
          {currentLanguage ? (
            <div className="w-6 h-6 group-hover:scale-110 transition-transform duration-500">
              {currentLanguage.flag}
            </div>
          ) : (
            <Globe className="w-5 h-5 text-foreground group-hover:text-primary transition-all duration-500 group-hover:scale-110" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 w-48 glass-card-modern border border-border/40 rounded-2xl overflow-hidden shadow-modern-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className={`w-full px-4 py-3 text-left transition-all duration-300 flex items-center gap-3 hover:bg-primary/10 hover:text-primary font-medium ${
                locale === language.code
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-foreground"
              }`}
              dir={language.code === "ar" ? "rtl" : "ltr"}
            >
              <div className="w-6 h-6 flex-shrink-0">{language.flag}</div>
              <span className="text-sm font-semibold">{language.name}</span>
              {locale === language.code && (
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent ml-auto"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
