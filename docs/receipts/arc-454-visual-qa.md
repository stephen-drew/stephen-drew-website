# ARC-454 local visual QA receipt

Date: 26 August 2026

## Scope

Local rendered verification of the approved Stephen Drew one-page website before GitHub and Vercel Preview delivery.

## Passed checks

- Desktop, tablet and mobile full-page captures reviewed against the approved Paper artboards.
- Page structure and section order match the approval pack.
- Exactly one H1 is present.
- All supported widths from 320px to 1920px have `scrollWidth` equal to the viewport width.
- The live shader renders as one canvas and remains contained in its own section.
- The portrait loads at its full 800 × 800 source size.
- Funnel Display, Sequel Sans Body, portrait, shader fallback and favicon all return successful local responses.
- A clean browser session reports zero console errors and zero warnings.
- Dark and light theme switching works, persists to local storage and survives reload before first paint.
- Light mode uses Yale blue for small accent text on white rather than low-contrast chartreuse.
- Reduced-motion mode swaps the live canvas for the approved static shader image.
- A 390px browser launched with WebGL, GPU and software rasterisation disabled rendered zero canvases, two images and zero console errors.
- The contact destination is the verified `hello@architecturesocial.com` address.
- The approved 27 August title correction now leads with `Founder & Director`; rendered checks at 1440, 768 and 390px showed no horizontal overflow, title or portrait-caption wrapping defects, or console errors. Full-page captures are `output/playwright/title-desktop.png`, `title-tablet.png` and `title-mobile.png`.
- The unverified `hello@stephendrew.com` address is absent.
- HTML metadata, robots.txt and Vercel response headers are configured for noindex, nofollow and noarchive.
- Reduced-motion users receive a static shader state.

## Captured breakpoints

- 1440 × 900, full page
- 768 × 1024, full page
- 390 × 844, full page and first screen
- Overflow probes at 320, 360, 375, 390, 640, 641, 768, 820, 1024, 1025, 1440 and 1920px

Local captures are stored under `output/playwright/` and intentionally excluded from Git.

## Delivery boundary

- Approved for a noindex Vercel Preview.
- Production promotion, Vercel domain aliasing and Cloudflare DNS remain out of scope.
- Portrait rights still require confirmation before a public cutover.
- The enquiry form opens the visitor's email application. It does not submit or store data on a server.
- If no email application opens, the form shows the verified direct email address on the page.
