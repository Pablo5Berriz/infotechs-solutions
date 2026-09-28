// Lecture SSR (Server Component / layout) du cookie theme. Separe de
// src/lib/theme.ts pour ne jamais tirer next/headers dans le middleware edge
// (src/proxy.ts), qui ne le supporte pas.

import { cookies } from 'next/headers';
import { THEME_COOKIE, DEFAULT_THEME, isTheme, type Theme } from './theme';

export async function getServerTheme(): Promise<Theme> {
  const store = await cookies();
  const raw = store.get(THEME_COOKIE)?.value;
  return isTheme(raw) ? raw : DEFAULT_THEME;
}
