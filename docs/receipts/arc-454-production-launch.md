# ARC-454 Production launch receipt

Date: 27 August 2026

## Authorised outcome

Stephen approved publication of the complete one-page personal website, including its portrait, and then explicitly authorised the DNS cutover for `stephendrew.com` and `www.stephendrew.com`.

The approved title treatment leads with `Founder & Director, Architecture Social · FRSA · MREC`. `Part II Architectural Assistant` appears only as historical career background.

## GitHub and Vercel delivery

- GitHub repository: `stephen-drew/stephen-drew-website`
- Launch pull request: `#2`
- Launch merge commit on `main`: `bb592cbf3002aebf40b3d50a34d56281f0e3f6df`
- Vercel project: `architecturesocial/stephen-drew-website`
- Vercel project ID: `prj_JSvT6Rp7YSLpt4P5xleAriwpJIxQ`
- Launch deployment ID: `dpl_CD4tCR9VGz2Xe8uyrZeHo3sgBnjY`
- Launch deployment source: GitHub `main` at `bb592cbf3002aebf40b3d50a34d56281f0e3f6df`
- Launch deployment state: `READY`, target `production`
- Vercel Git integration read-back: GitHub repository `stephen-drew-website`, Production branch `main`, framework `vite`

Later receipt-only commits do not change the built site content. The current Production deployment and exact Git source must still be read back at handover.

## Domain and DNS cutover

Both custom domains are verified on the Vercel project:

- `stephendrew.com`, canonical Production domain
- `www.stephendrew.com`, permanent `308` redirect to `https://stephendrew.com/`

Only the two web records were changed through Cloudflare Domain Connect:

| Host | Previous Cloudflare record | Production record |
| --- | --- | --- |
| `@` | Proxied A `162.159.134.42` | DNS-only CNAME to `c4f824184caec0f1.vercel-dns-016.com` |
| `www` | Proxied CNAME to `zsfkf1ptfn.onrocket.site` | DNS-only CNAME to `c4f824184caec0f1.vercel-dns-016.com` |

Authoritative Cloudflare DNS read-back after the change returned Vercel's flattened apex addresses and the exact Vercel CNAME for `www`.

The following records were not changed:

- Nameservers: `anna.ns.cloudflare.com` and `sri.ns.cloudflare.com`
- MX priority `0`: `stephendrew-com.mail.protection.outlook.com`
- TXT: `ca3-095f93066f01480e927ee3a7c11eed97`
- TXT: `v=spf1 -all`

## Public read-back

- `https://stephendrew.com/` returns `200 OK` over authorised TLS 1.3.
- `https://www.stephendrew.com/` returns `308` to `https://stephendrew.com/`.
- Both hostnames have valid Let's Encrypt certificates for their exact names.
- The apex HTML has the approved title, canonical apex URL, `index, follow`, Founder & Director wording, Architecture Social content and AI consulting content.
- Rendered Chrome verification found exactly one H1, eight main sections and no horizontal overflow at 1920px or 390px.
- The 800 × 800 portrait loaded successfully.
- The live shader rendered as one contained canvas on desktop and mobile.
- `robots.txt` returns `200`, allows `/` and links the sitemap.
- `sitemap.xml` returns `200` and contains the canonical apex URL.
- No `X-Robots-Tag: noindex` header is present on the page, robots file or sitemap.
- JavaScript, CSS, portrait and local font assets returned successful public responses.
- The enquiry form opens a pre-addressed email to the verified public route `hello@architecturesocial.com` and stores no form data.

## Protection and cleanup

- Vercel SSO protection remains `all_except_custom_domains`, so Previews remain protected and custom Production domains remain public.
- Three temporary automation-bypass entries generated during destination testing were revoked without exposing or persisting their values.
- Final automation-bypass count read-back: `0`.

## Rollback evidence

- Repository baseline before the launch work: `547b4d697099cc4f5d508fef032db87b11f21c08`
- A verified launch bundle is retained in the private task workspace outside the public repository.
- Previous apex and `www` Cloudflare records are recorded above for a controlled DNS rollback if required.

No Architecture Social website record, email record, TXT record or nameserver was altered by this launch.
