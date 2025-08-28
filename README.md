# Eden’s Pharm — Next.js 14 App

This repository contains a modern, accessible rewrite of the Eden’s Pharm
website using **Next.js 14** with the **App Router**, **TypeScript** and
**Tailwind CSS**. The goal of this project is to faithfully reproduce
the original static site while adding integrations for inventory and
checkout workflows.

## Features

### Phase A — Static 1 : 1 conversion

* **Page structure**: All static pages from the legacy site have been
  recreated in the `/app` directory. This includes the home page
  (`/`), product listing (`/products`), dynamic product detail pages
  (`/products/[slug]`), About Us (`/about-us`), Mission and Values
  (`/mission-values`), Research References (`/research-references`),
  Contact (`/contact`), Blog (`/blog` and `/blog/[slug]`) and Gallery
  (`/gallery`).
* **Design fidelity**: Colours, typography and layout mirror the
  original design. Only the five approved images are used across the
  site: Hydrasal purple drink, Elation pink tonic, BeneDulce sugar,
  Sanctus Una white blossom and the Eden’s Pharm banner.
* **Accessibility**: The site includes a skip link, semantic
  headings, labelled form controls and visible focus styles. We run
  [axe-core](https://github.com/dequelabs/axe-core) during development
  to ensure no serious or critical a11y issues.
* **SEO**: Each page defines a `metadata` export to set the page
  `<title>` and description. Open Graph data and social cards are
  included where appropriate. A static `robots.txt` and `sitemap.xml`
  are provided under `public/`.

### Phase B — Vineyard integration

* The `app/lib/vineyard.ts` adapter encapsulates calls to your
  Vineyard backend. Functions are provided for listing products,
  retrieving product details, fetching live inventory, creating
  orders and updating inventory. Timeouts and retry logic are
  included for resilience.
* Product pages aggregate inventory across variants to display an
  “In Stock (N)”, “Pre‑Order Available” or “Out of Stock” badge.
* An API route at `/api/vineyard/inventory/[variantId]` exposes
  variant inventory to the client. The `ProductVariantSelector`
  component uses this endpoint to show live stock status.

### Phase C — Cart & SamCart checkout

* A cookie‑based cart is implemented via helper functions in
  `app/lib/cart.ts`. Items are stored in a `cart` cookie with a
  `variantId` and quantity.
* Client components add items to the cart by calling `/api/cart`.
  Cart updates are entirely server‑side; no client state is leaked.
* The `/checkout` page reads the cart, displays the items and
  invokes the SamCart adapter (`app/lib/samcart.ts`) to create a
  checkout session. After successfully creating a session, the cart
  is cleared and the user is redirected to the SamCart URL.
* A webhook handler at `/api/samcart/webhook` verifies incoming
  requests and, on successful payment, creates an order in Vineyard
  and updates inventory.

### Phase D — Tests & CI

* **Unit tests**: Jest is configured in `jest.config.js`. A sample
  test in `__tests__/vineyard.test.ts` validates the Vineyard
  fallback adapter.
* **End‑to‑end tests**: Playwright is configured in
  `playwright.config.ts`. The `tests/happy-path.spec.ts` file
  exercises a basic flow: visit home, navigate to a product page,
  add a variant to the cart and proceed to checkout.
* **Continuous integration**: A GitHub Actions workflow in
  `.github/workflows/ci.yml` installs dependencies, runs linting,
  builds the project and executes unit and e2e tests on each push
  or pull request. You can extend the workflow to include
  Lighthouse checks or deployment to Vercel.

## Local development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Run the Jest unit tests
npm run test

# Run Playwright e2e tests (requires a build)
npm run build
npm run e2e
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values for your
Vineyard and SamCart credentials. At minimum you will need:

* `VINEYARD_BASE_URL` – base URL of your Vineyard API
* `VINEYARD_API_KEY` – secret token for Vineyard
* `SAMCART_BASE_URL` – base URL of your SamCart API
* `SAMCART_API_KEY` – secret token for SamCart
* `SAMCART_WEBHOOK_SECRET` – shared secret for verifying webhooks

When these variables are not provided the adapters fall back to
hard‑coded placeholder data so the site can run locally without
external services.

## License

All content and code in this repository is provided for the purpose of
demonstration. Product names and trademarks belong to their
respective owners.