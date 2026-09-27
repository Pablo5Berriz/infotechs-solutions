import {describe, it, expect} from 'vitest';
import {NextRequest} from 'next/server';
import proxy from '@/proxy';
import {renderNotFoundHtml} from '../not-found-html';

describe('renderNotFoundHtml (INFOTECHS-404-PRESENTATION-001)', () => {
  for (const [locale, htmlLang, h1, cta1, cta2] of [
    ['fr', 'fr-CA', "Cette page est introuvable.", '/fr', '/fr/contact'],
    ['en', 'en-CA', 'This page can&#39;t be found.', '/en', '/en/contact'],
  ] as const) {
    it(`${locale}: full localized 404 document`, async () => {
      const response = renderNotFoundHtml(locale);
      expect(response.status).toBe(404);
      expect(response.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
      expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow, noarchive');
      const html = await response.text();
      expect(html).toContain(`lang="${htmlLang}"`);
      expect(html).toContain(h1);
      expect(html).toContain(`href="${cta1}"`);
      expect(html).toContain(`href="${cta2}"`);
      expect(html).toContain('<style>');
      expect(html).not.toContain('__next_error__');
      expect(html).not.toMatch(/rel="canonical"/);
    });
  }

  it('never interpolates request data (constants only)', async () => {
    const fr = await renderNotFoundHtml('fr').text();
    const en = await renderNotFoundHtml('en').text();
    // Deterministic + stable across calls: same input, same output.
    expect(await renderNotFoundHtml('fr').text()).toBe(fr);
    expect(await renderNotFoundHtml('en').text()).toBe(en);
  });
});

describe('proxy 404 guard regression (unchanged routing)', () => {
  for (const locale of ['fr', 'en'] as const) {
    it(`${locale}: invalid service slug still 404s`, async () => {
      const req = new NextRequest(`https://example.test/${locale}/services/service-qui-nexiste-pas`);
      const res = await proxy(req);
      expect(res.status).toBe(404);
    });

    it(`${locale}: missing.txt preserves previous guard behavior`, async () => {
      const req = new NextRequest(`https://example.test/${locale}/missing.txt`);
      const res = await proxy(req);
      expect(res.status).toBe(404);
    });
  }
});
