"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useTranslations } from 'next-intl';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const themes = [
    {
      value: 'light' as const,
      label: t('theme.light', { default: 'Light' }),
      icon: Sun,
    },
    {
      value: 'dark' as const,
      label: t('theme.dark', { default: 'Dark' }),
      icon: Moon,
    },
    {
      value: 'system' as const,
      label: t('theme.system', { default: 'System' }),
      icon: Monitor,
    },
  ];

  const currentTheme = themes.find(t => t.value === theme);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label={t('theme.switchTheme', { default: 'Switch theme' })}
      >
        {currentTheme && (
          <>
            <currentTheme.icon className="h-4 w-4" />
            <span className="text-sm font-medium hidden sm:inline">
              {currentTheme.label}
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="py-1">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => {
                  setTheme(themeOption.value);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors rtl:flex-row-reverse"
              >
                <themeOption.icon className="h-4 w-4" />
                <span className="flex-1 text-left rtl:text-right">
                  {themeOption.label}
                </span>
                {theme === themeOption.value && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SimpleThemeToggle() {
  const { actualTheme, toggleTheme } = useTheme();
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-12 h-12 rounded-2xl bg-background/60 border border-border/40 flex items-center justify-center">
        <div className="w-5 h-5 bg-muted-foreground/20 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-12 h-12 rounded-2xl bg-background/60 border border-border/40 hover:border-primary/40 transition-all duration-500 flex items-center justify-center overflow-hidden hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
      aria-label={t('theme.toggleTheme', { default: 'Toggle theme' })}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 flex items-center justify-center">
        {actualTheme === 'dark' ? (
          <Sun className="w-5 h-5 text-warning group-hover:text-accent transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
        ) : (
          <Moon className="w-5 h-5 text-primary group-hover:text-accent transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
        )}
      </div>
    </button>
  );
}
