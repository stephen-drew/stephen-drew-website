# ARC-454 Vercel Preview delivery receipt

Date: 26 August 2026

## Title-corrected Preview revision

Date: 27 August 2026

- Preview deployment ID: `dpl_7u6g3nzysKHQNm9Ykhd7XPUzGZkR`
- Preview URL: `https://stephen-drew-website-m3hhm6id9-architecturesocial.vercel.app`
- Inspector: `https://vercel.com/architecturesocial/stephen-drew-website/7u6g3nzysKHQNm9Ykhd7XPUzGZkR`
- Source commit: `bed25c98ed6e1af36cdb29d01f2d8326af05f86e`
- Vercel read-back: `READY`, target `preview`, metadata tied to branch `sjdrew/arc-454-stephen-drew-personal-homepage-approved-paper-to-vercel` and issue `ARC-454`.
- Deployed `index.html` contains `Founder & Director of Architecture Social` and the noindex meta directive.
- The deployed JavaScript bundle contains the full desktop title `Founder & Director, Architecture Social · FRSA · MREC`, the compact title `Founder & Director · FRSA · MREC`, and exactly one historical `Part II Architectural Assistant` reference.
- The deployed Vercel routing file retains the `X-Robots-Tag: noindex, nofollow, noarchive` rule.
- Local full-page checks at 1440, 768 and 390px found one H1, no horizontal overflow, no title or portrait-caption defect and zero console errors.
- Final project read-back: two Preview deployments, zero Production deployments, no latest Production URL and zero automation bypass secrets. Deployment protection was not weakened for this check.

The original 26 August Preview below remains as the earlier approved-design evidence. The 27 August URL above is the current title-corrected revision.

## Proven destination

- Vercel project: `architecturesocial/stephen-drew-website`
- Project ID: `prj_JSvT6Rp7YSLpt4P5xleAriwpJIxQ`
- Preview deployment ID: `dpl_7atm5XbYz3333GsGrAm8FLXW8aHE`
- Preview URL: `https://stephen-drew-website-pjaxy61fy-architecturesocial.vercel.app`
- Inspector: `https://vercel.com/architecturesocial/stephen-drew-website/7atm5XbYz3333GsGrAm8FLXW8aHE`
- Source commit: `9fab98e430ec16918131269f019d322c20e95277`
- Source branch: `sjdrew/arc-454-stephen-drew-personal-homepage-approved-paper-to-vercel`
- Linear issue: `ARC-454`
- Vercel CLI labelled the deployment `Preview`; the API returned `target: null`, Vercel's Preview representation.
- Destination state: `READY`.
- Deployment protection remains enabled as `all_except_custom_domains`.

## Final Vercel state read-back

- Exactly one deployment remains on the project, the approved Preview above.
- Zero Production deployments remain.
- `latestProductionUrl` is `null`.
- Zero aliases match `stephen-drew-website*`.
- No Production environment variables exist on the project.
- The temporary automation bypass used for destination browser QA was removed after capture; automation bypass count reads back as zero and Vercel authentication remains enabled.

## Live response proof

- `/` returns `200 OK`.
- HTML contains `lang="en-GB"`, the approved title and `meta name="robots"` set to `noindex, nofollow, noarchive`.
- Response header `X-Robots-Tag` is `noindex, nofollow, noarchive`.
- Response headers include HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` and the restricted Permissions Policy.
- The portrait returns `200`, `image/jpeg`, 145,058 bytes.
- The static shader fallback returns `200`, `image/png`, 952,426 bytes.
- The favicon returns `200`, `image/svg+xml`, 298 bytes.

## Destination browser QA

Actual Preview screenshots are stored under the ignored local `output/playwright/` folder:

- `output/playwright/preview-desktop.png`, 1440 × 900 viewport, 5010px full-page height.
- `output/playwright/preview-tablet.png`, 768 × 1024 viewport, 5312px full-page height.
- `output/playwright/preview-mobile.png`, 390 × 844 viewport, 7395px full-page height.
- `output/playwright/preview-mobile-reduced-motion.png`, 390 × 844 viewport.

All three normal viewports returned HTTP 200 with:

- exactly one H1;
- `scrollWidth` equal to viewport width;
- Funnel Display and Sequel Sans loaded;
- the portrait loaded without error;
- one live shader canvas;
- zero browser console errors;
- zero failed requests;
- Architecture Social and recruitment consulting content present.

The desktop theme control changed its persisted state. The reduced-motion capture rendered zero canvases, one static shader fallback and zero broken images.

## Local verification

- `npm run check` passed from the committed branch.
- ESLint passed.
- All 15 behavioural tests passed.
- Vite production build passed with 106 transformed modules.
- Local browser QA and the approved Paper deviation ledger remain recorded in `arc-454-visual-qa.md` and `arc-454-deviation-ledger.md`.

## First-deployment containment

Vercel classified this new project's first CLI deployment as Production even though `--target=preview` was supplied. The exact unintended deployment `dpl_6RrVtAsLxrQUWxsG9Ge7M7RsvzCj` and its alias were removed immediately. A 261-byte noindex bootstrap was then used to unlock the second-deployment Preview route; bootstrap deployment `dpl_3SKA9DaBbpAy13r5Q3NWqeHVQr5i` and its generated alias were removed after the real Preview became Ready. The final state read-back above confirms that only the Preview remains.

## Held scope

- No `stephendrew.com` DNS record or custom domain was changed.
- No Production deployment or alias remains.
- No public GitHub feature branch or pull request was created because the portrait's public-launch rights are still unconfirmed.
- The portrait is present only on the protected, noindex Preview.
- The enquiry form opens a pre-addressed email to the verified `hello@architecturesocial.com` route and stores no form data.

Stephen's Preview review, portrait-rights confirmation and separate Production/domain approval remain the next gates.
