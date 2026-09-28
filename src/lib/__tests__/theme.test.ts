import { describe, it, expect } from 'vitest';
import { DEFAULT_THEME, THEME_COOKIE, isTheme } from '@/lib/theme';

describe('theme resolution primitives (INFOTECHS-THEME-001)', () => {
  it('defaults to light (section 3: no saved preference -> LIGHT)', () => {
    expect(DEFAULT_THEME).toBe('light');
  });

  it('uses a dedicated non-sensitive cookie name', () => {
    expect(THEME_COOKIE).toBe('theme');
  });

  it('accepts only "light" or "dark"', () => {
    expect(isTheme('light')).toBe(true);
    expect(isTheme('dark')).toBe(true);
    expect(isTheme('system')).toBe(false);
    expect(isTheme(undefined)).toBe(false);
    expect(isTheme('')).toBe(false);
  });
});
