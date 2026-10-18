# Design QA — Pro:Direct Tennis

final result: passed

## Source and capture normalization

- Desktop truth: `C:/Users/TOL/Downloads/www.prodirectsport.com_pages_tennis.png` (1350 × 8428, 1×).
- Tablet truth: `C:/Users/TOL/Downloads/www.prodirectsport.com_pages_tennis-tablate.png` (1536 × 16384, 2×). Comparison size: 768 × 8192 CSS pixels.
- Mobile truth: `C:/Users/TOL/Downloads/www.prodirectsport.com_pages_tennis-mobile-screen.png` (750 × 16384, 2×). Comparison size: 375 × 8192 CSS pixels.
- Browser-rendered implementation: `qa/desktop-implementation.png`, `qa/tablet-implementation.png`, `qa/mobile-implementation.png`.
- Windows screenshot output is reduced by 1.5: desktop raw width 900, tablet 512, mobile 250. `qa/compare.py` normalizes to the reference dimensions. This makes captures softer than the original screenshots; the app uses the original high-resolution assets.
- Source tablet/mobile screenshots end at 8192 CSS pixels. Comparisons use that range; the implemented footer continues below it.
- State: home page, no modal, empty bag/wishlist, first carousel position. Desktop shoe slide and tablet/mobile lifestyle slide are selected and paused for stable comparison.

## Comparison evidence

Full-view boards contain source and implementation side by side:

- `qa/desktop-full-comparison.png`
- `qa/tablet-full-comparison.png`
- `qa/mobile-full-comparison.png`

Focused readable comparisons:

- `qa/desktop-top-comparison.png`: header, hero, departments, split racket feature.
- `qa/tablet-top-comparison.png`: condensed header, lifestyle hero, stacked racket feature.
- `qa/mobile-top-comparison.png`: mobile header/search, portrait hero, department overflow, racket intro and products.
- Lower regions were also inspected in the full-view boards and focused crops of the editorial, about and footer regions.

## Comparison history and fixes

1. Initial build: missing outline fills in exported SVGs, insufficient hero shading, undersized mobile labels and controls, incorrect header search alignment, and images missing in offscreen captures. Added explicit SVG outline fills, an inset hero shadow, correct product text/control sizes, aligned search, and eager image loading. Post-fix captures show all assets and controls.
2. Responsive pass: first feature crop adjustment was too large. Reduced the tablet/mobile feature scale from 1.12 to 1.02. Corrected tablet footer columns, category row widths, mobile slider indicators, the mobile social section height, about-section padding and paragraph spacing.
3. Final product pass: mobile names/prices now use 14px text, and discount amounts wrap onto their own line. Final source/implementation boards were regenerated after these fixes. No remaining P0/P1/P2 findings.

## Required fidelity surfaces

- Fonts/typography: local Arial body text with system sans-serif headings; heading hierarchy, uppercase labels, product prices and responsive offer wrapping checked. Minor weight and antialiasing differences remain because of the capture environment.
- Spacing/layout: desktop split feature; tablet/mobile stacked feature; correct two-, three- and four-card desktop grids; horizontal mobile rows; long-form information and responsive footer. Small accumulated section offsets are P3 refinements.
- Colors/tokens: black navigation/editorial section, warm brown announcement bar, white surfaces, light gray strips and pink sale prices match the references. Hero lower shading is an inset shadow; slight shading differences are P3.
- Image quality/assets: supplied logos, banners, products, categories, social marks and service/payment icons are used. No broken images at checked widths. The additional Cambodia flag is a downloaded source SVG. Screenshot softening comes from density normalization, not low-resolution replacement assets.
- Copy/content: section names, featured products, prices, release dates, category labels and long-form tennis copy match the references. Local dialogs and newsletter success text are prototype interaction states absent from the source.

## Functional verification

Verified in the in-app browser at `http://localhost:5173/`:

- Yonex search returns the correct racket; opening it shows the product dialog.
- Add-to-bag is disabled until a grip is chosen; L2 selection and add-to-bag produce a £220 subtotal.
- Saving the racket appears in the wishlist; mobile wishlist access works through My Account.
- Bag removal produces the empty state.
- Mobile navigation opens, closes on selection and scrolls to Shop Shoes.
- Department next-arrow changes scrollLeft from 0 to approximately 851 CSS pixels on desktop.
- Valid newsletter entry produces the local success message; no email service is called.
- Escape closes the native dialog.
- Checked console logs: no errors.
- `qa/responsive-checks.json`: 1350, 768, 375 and 320 CSS widths have no document overflow and no broken images.
- `npm run build` and `npm run lint` pass.

## Follow-up polish and scope

- P3: minor differences in hero shading, font rendering and accumulated vertical spacing can be refined further.
- This is a frontend recreation. Search, wishlist, bag and newsletter feedback operate locally; authentication, payment and email delivery are not connected.
- Preview remains open locally. The original `prodirect-tennis-images` directory is absent; source assets remain organized under `public/assets/`.

## Implementation checklist

- [x] Source assets and responsive page sections implemented.
- [x] Core browsing and racket-selection interactions verified.
- [x] Source and browser captures compared at normalized sizes.
- [x] P0/P1/P2 fixes applied and recaptured.
- [x] Build, lint, console and responsive overflow checks complete.

final result: passed

## Requested typography and currency update

Roboto from Google Fonts now applies throughout the storefront, including headings and offer badges. Dollar signs and USD labels replace GBP in product cards, savings, search, dialogs, wishlist, bag totals and the currency selector/footer. Numeric demo prices were preserved, as requested; no exchange-rate conversion was performed.

Browser verification confirmed `document.fonts.status === 'loaded'` and `document.fonts.check('14px Roboto') === true`. Product card and dialog prices show `$220.00` and `$260.00`, and the footer shows `Cambodia (USD $)`. Updated preview: `qa/font-currency-preview.png`. Original comparison captures above represent the prior reference-matching typography/currency; these differences are now intentional user-requested changes. Build and lint pass after this update.

final result: passed
