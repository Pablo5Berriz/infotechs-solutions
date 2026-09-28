'use client';
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useContent } from '@/i18n/content';
import { THEME_COOKIE, type Theme } from '@/lib/theme';

function persistTheme(target: Theme) {
  document.documentElement.dataset.theme = target;
  document.cookie = `${THEME_COOKIE}=${target}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
}

export function ThemeSwitcher({ initialTheme, onSelect, className }: { initialTheme: Theme; onSelect?: () => void; className?: string }) {
  const { navigation } = useContent();
  const [theme, setTheme] = useState<Theme>(initialTheme);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    persistTheme(next);
    onSelect?.();
  }

  const label = theme === 'dark' ? navigation.themeSwitcher.enableLight : navigation.themeSwitcher.enableDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={theme === 'dark'}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm text-text-400 transition-colors duration-150 ease-out hover:text-text-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${className ?? ''}`}
    >
      {theme === 'dark' ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
