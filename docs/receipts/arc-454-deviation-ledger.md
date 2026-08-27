# ARC-454 design deviation ledger

## Approved source

- Paper file: `Stephen Drew · Personal Website`
- Page: `Homepage · Final approval pack`
- Desktop artboard: 1440 × 4996
- Tablet artboard: 768 × 5226
- Mobile artboard: 390 × 7122
- Approved by Stephen Drew on 26 August 2026

## Approved title correction

On 27 August 2026 Stephen instructed the site to lead with his current role rather than his former Part II role. The hero, portrait caption, header and footer therefore lead with `Founder & Director`, name Architecture Social wherever space permits, and use the current `FRSA` and `MREC` postnominals in the hero identity line. `Part II Architectural Assistant` remains only in the career timeline as historical professional background.

The section order, wording, brand tokens, typography, breakpoints, portrait, shader placement and primary calls to action follow the approved Paper pack.

## Deliberate implementation differences

| Area | Paper state | Website state | Reason |
| --- | --- | --- | --- |
| Theme control | The compact Paper header shows Contact only | A 44 × 44 theme button remains available beside Contact | Implements GitHub issue 1 with a keyboard-operable, persistent control at every viewport |
| Dark blue contrast | Some desktop Paper text exports use deep black on Yale blue | Primary text is white and actions are chartreuse | Preserves the approved palette while meeting readable contrast expectations |
| Orange card contrast | The desktop education card exports with deep-black copy on Tiger orange | The website uses white copy | Follows the Architecture Social brand contrast rule |
| Responsive section height | Paper uses fixed-height frames | Sections expand when local browser font metrics need more room | Prevents approved copy, buttons and captions from being clipped |
| Portrait caption | The mobile Paper caption starts below the fixed hero frame | The website keeps the caption visible | Preserves identity and location information instead of hiding it outside the frame |
| Shader | Paper contains an approved static shader frame | The website renders Paper NeuroNoise live, with a static fallback and reduced-motion handling | Delivers the approved live-shader direction safely |
| Enquiry action | Paper shows a visual form | The website validates the fields and opens a pre-addressed email to `hello@architecturesocial.com` | Uses the verified public contact route without adding an unapproved data processor or backend |
| Public indexing | Not visible in the artboards | HTML uses `index, follow`, `robots.txt` allows crawling and the sitemap names the canonical apex domain | Publishes the approved Production site at `https://stephendrew.com/` without a stale Preview restriction |

## Height read-back

The approved fixed frames contain a few elements beyond their nominal bounds. For example, the mobile hero caption begins at 1026px inside a 1010px frame, the recruitment button ends at 981px inside a 950px frame, and the through-line rows extend beyond the 900px frame. The website therefore keeps content visible and records these content-safe rendered heights:

| Breakpoint | Paper height | Rendered height | Difference |
| --- | ---: | ---: | ---: |
| Desktop 1440px | 4996px | 5010px | +14px |
| Tablet 768px | 5226px | 5312px | +86px |
| Mobile 390px | 7122px | 7395px | +273px |

No horizontal overflow was found from 320px through 1920px.
