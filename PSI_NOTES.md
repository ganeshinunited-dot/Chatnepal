# PSI report notes (11 Aug 2026, report 101qggk0mp)

## Mobile (lab) — Performance 84
Metrics: FCP 1.2s (green), LCP 4.1s (bad, red — biggest hit), TBT 40ms (green), CLS 0, SI 4.1s.
Opportunities:
- Render-blocking requests: est save 300ms — _next/static/css/7ea9cf202fa0a961.css
- Use efficient cache lifetimes (0 KiB): ...cloudflare-static/email-decode.min.js (Cloudflare email obfuscation on domain? external)
- Legacy JavaScript: 12 KiB — chunks/255-...js (ES6 transpilation; Next 15 baseline targets)
- Reduce unused JS: 23 KiB — chunks/587-...js
- Avoid long main-thread tasks: 1 long task (255 chunk)
- Optimise DOM size (diagnostic)
- LCP breakdown (diagnostic), network dependency tree: main page -> css -> email-decode.min.js chain (0.3s delay?)

Diagnostics PASSED: font display, image delivery, minify css/js, reduce unused css, network payload 627 KiB.

Note: cloudflare email-decode.min.js suggests karktech.tech is proxied via Cloudflare with email protection enabled — third-party script chain.

## Desktop (lab) — Performance 99
Metrics: FCP 0.3s, LCP 0.8s, TBT 18ms, CLS 0, SI 0.7s.
Opportunities: same render-blocking CSS, forced reflow, legacy JS 12KiB, unused JS 23 KiB, improve image delivery 6 KiB (founder.webp), LCP breakdown diagnostic.
Insights: forced reflow; network dependency tree with email-decode.min.js chain.

## Accessibility 93 (both):
- Buttons do not have accessible name
- Form elements without labels (chat textarea)
- Contrast issues (background/foreground)
- Heading order not sequential
Agentic: accessibility tree not well-formed.

## SEO 100. Best Practices 100. Field data: "No data" (site too new, no CrUX data).

## Key blockers for mobile 100:
1. LCP 4.1s = hero gradient text (largest element) renders late — likely from Google Fonts (Mukta/Jakarta) loading slowly on slow 4G + render-blocking CSS.
2. Render-blocking CSS ~300ms.
3. Google Fonts woff2 (7 font files in payload) fetched late.
4. Network dependency chain includes cloudflare email-decode.min.js (Cloudflare email protection on DO or origin? — actually cloudflare-static means DO app uses Cloudflare-like domain? more likely the domain has Cloudflare proxy with email obfuscation script injected on the page — suspicious; PSI flagged it in critical path).
5. Legacy JS 12 KiB, unused JS 23 KiB (minor).

## Fixes to propose for 100 mobile:
- Use next/font with preload + swap (already display:swap; add preload: false? actually font preloading helps LCP)
- Reduce font weights loaded (Mukta has 5 weights, Jakarta 3) — keep only needed.
- Inline/defer critical CSS (Next handles; hard to change).
- Fix Cloudflare email-decode chain: check for mailto: links obfuscated; may not be controllable.
- Hero: make LCP element not text-with-webfont? Can't avoid; but font fallback/metric overrides help.
- Remove motion/framer from landing page critical path? motion/react used in sections; could code-split.
- LCP text with gradient: fine.
- Reduce DOM size diagnostic.
- Accessibility: aria-labels on icon-only buttons, label for chat textarea, heading order fixes.
