# stephendrew.com structured-data report

Date: 28 August 2026

## Detection and validation

| Schema | Type | Status | Evidence |
| --- | --- | --- | --- |
| Personal profile | `ProfilePage` | Pass | The page is a first-person personal homepage focused on Stephen Drew and links to the same visible identity. |
| Person | `Person` | Pass | Name, portrait, Founder & Director role, Architecture Social relationship and linked profiles all appear on the published page. |
| Site identity | `WebSite` | Pass | Canonical site name and URL match the public apex. |
| Employer | `Organization` | Pass | Architecture Social is named and linked in the visible page content. |
| Portrait | `ImageObject` | Pass | The 800 x 800 crawlable portrait is the visible profile image and social image. |

The JSON-LD is emitted in the initial HTML, uses absolute URLs, parses as valid JSON and contains no ratings, reviews, awards, credentials or other claims that are absent from the page.

## Search evidence

The page is classified as `Strategic Support`. No Ahrefs or Google Search Console query evidence was available for this standalone site on 28 August 2026. The title therefore prioritises the established branded query `Stephen Drew` and the two visible page themes, Architecture Social and practical AI consulting.

The generated JSON-LD is recorded in `generated-schema.json` and mirrored in `index.html`.
