# Architecture Infotechs Solutions

## Stack

* Next.js 16.3.1 (App Router)
* React 19.2.8
* TypeScript 5 (strict mode)
* Tailwind CSS 4
* ESLint 9 (eslint-config-next)
* npm (package-lock.json committed)

## Rendering strategy

Rendering strategy: static-first

`next.config.ts` sets `output: "export"`. The application is built as a
fully static export (`out/`) with no Node.js server required at runtime.

## Hosting target

Cloudflare Pages is the intended future hosting target (not configured in
this lot — see limitations below).

## Directory structure

```
app/            App Router routes, layout, global styles
public/         Static assets actually used by the site (currently empty)
docs/           Technical documentation
```

No `components/` or `lib/` directories exist yet: no reusable component or
shared logic has been extracted so far. They will be added when real
content justifies them.

## External services

None. No database, no authentication, no CMS, no analytics, no third-party
API is integrated in this lot.

## Current limitations

* Production runtime requirement: none for the institutional frontend at
  this stage.
* No API routes, Route Handlers, Server Actions, or middleware exist.
* No deployment configuration (Cloudflare, CI/CD) exists yet.
* No automated tests exist yet.
* AUTOMATED TESTS: NOT INTRODUCED IN FOUNDATION LOT.
* No i18n library is installed; the current page is French-only.
* The homepage is a placeholder to validate the technical foundation, not
  the final landing page.

## Architectural rules

* Static-first: no feature may introduce a dependency on a server runtime
  (API routes, Server Actions with side effects, middleware, database)
  without an explicit decision to move away from static export.
* No backend, database, authentication, or third-party integration
  (n8n, CMS, payment) may be added without a dedicated, scoped lot.
* Dependencies are added only when a real, current need justifies them —
  not by anticipation.
