# Pro:Direct Tennis storefront

Responsive React + TypeScript + Vite recreation of the supplied desktop, tablet, and mobile references.

## Run locally

```sh
npm run dev
```

Open http://localhost:5173/. Build with `npm run build`, and check the source with `npm run lint`.

## Project structure

- `src/App.tsx`: storefront sections, carousels, product selection, wishlist and bag.
- `src/components/`: header, footer, product dialogs and shared icons.
- `src/data.ts`: products, categories, release dates and articles.
- `src/assets.json`: local asset URL map.
- `src/App.css`: styling and desktop, tablet and mobile breakpoints.
- `public/assets/images/` and `public/assets/icons/`: source imagery and icons.
- `qa/` and `design-qa.md`: visual comparison evidence and verification notes.

Search, hero slides, navigation, carousel controls, product grip selection, wishlist, bag removal and newsletter validation work locally. The bag and wishlist last for the current session. Newsletter confirmation is a local preview; no email is sent. Authentication, checkout and backend services are outside this frontend recreation.

The additional Cambodia flag icon comes from https://flagcdn.com/kh.svg. Outline SVGs include an explicit `fill="none"` so they render correctly as standalone images.

Typography uses Roboto from Google Fonts. Prices are displayed in USD with a dollar sign; the demo's numeric amounts are unchanged.

## Open the production build

After `npm run build`, run `npm run preview` from the project folder and open http://localhost:4173/. Keep the terminal running while viewing the preview.

Opening `dist/index.html` directly with a `file://` URL is unsupported: the app's JavaScript modules and root-relative asset URLs need HTTP serving. Vite preview serves the built `dist` files locally; use static hosting for deployment.
