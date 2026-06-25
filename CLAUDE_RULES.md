# CLAUDE_RULES.md — TBS Tech Services Permanent Rules

These rules apply to every conversation and every change made to this codebase.

## Rule 1 — Build Before Push
Run `npm run build` before every push. Never push broken code. Zero errors required.

## Rule 2 — No Location References
Never mention any location, city, or province anywhere on the site. Remove Brantford, Ontario, or any city reference if found.

## Rule 3 — No Pricing
Never mention any pricing anywhere. Replace with "Contact us for details" or "Get a free consultation."

## Rule 4 — No Secrets in Code
Never hardcode API keys, tokens, or secrets. Use environment variables only. Confirm .env files are in .gitignore.

## Rule 5 — Main Branch Only
Push to main branch only. Never push to master.

## Rule 6 — Sanitize Inputs
Sanitize all form inputs before processing. Use lib/sanitize.js on all API routes.

## Rule 7 — Server/Client Split
page.js files are server components. Use 'use client' only in ComponentClient.jsx files or standalone client components. Never put generateStaticParams or generateMetadata in a 'use client' file.

## Rule 8 — Three.js SSR
Import Three.js components via next/dynamic with ssr: false only. Never import Three.js in server components.

## Rule 9 — Rate Limit All APIs
Rate limit all API routes. Demo form: 5 req/IP/hr. Chat: 10 req/IP/hr.

## Rule 10 — Contact Email
Contact email is tbstechservices@gmail.com. Never use a different email.

## Rule 11 — Jotform
Contact form uses Jotform iframe: https://form.jotform.com/261737577809069
