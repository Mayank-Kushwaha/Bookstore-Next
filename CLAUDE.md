# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

An e-commerce bookstore built on Next.js 13.4.19 (App Router) with React 18.2, MongoDB via Mongoose 7.5, NextAuth 4.23 for sessions, JWT for API auth, Razorpay for payments, and Tailwind CSS 3.3 for styling. No test runner is configured.

### Commands

- `npm run dev` - start the dev server on http://localhost:3000
- `npm run build` - production build
- `npm run start` - run the production build
- `npm run lint` - run `next lint` (config extends `next`, `eslint:recommended`, `plugin:react/recommended`)

There is no test script in `package.json`, so there is no "single test" command to document.

### Architecture

Routing uses the Next.js App Router exclusively (`app/`); the legacy `pages/` directory is not present despite the README mentioning it. Each top-level route (`Cart`, `Checkout`, `Dashboard`, `Login`, `Register`, `Search`, `Wishlist`, `Track`, `paymentsuccess`, etc.) is a folder containing `page.js` (or `page.jsx`). `app/layout.js` is the root layout: it wires up `AuthProvider` (NextAuth `SessionProvider`), `CartProvider`, `WishlistProvider`, `Toaster` (react-hot-toast), `Topheader`, `Navbar`, `Footer`, and `@vercel/analytics`, and loads Google Fonts Quicksand and Fraunces as CSS variables. A `next/script` tag injects `checkout.razorpay.com/v1/checkout.js` globally.

API routes live under `app/api/*/route.js` (App Router route handlers). The auth flow is split in two: NextAuth (`app/api/auth/[...nextauth]/route.js`) uses a `CredentialsProvider` against the `User` model with bcrypt and a JWT session strategy, with `pages.signIn` set to `/Login`. In parallel, `app/api/login/route.js` and `app/api/register/route.js` issue a custom `jsonwebtoken` token signed with `JWT_SECRET` (30-day expiry) that the client stores in a `token` cookie (`js-cookie`). The cart and wishlist API routes (`app/api/cart`, `app/api/wishlist`, `app/api/decrement`) authenticate via this custom JWT by reading the `Authorization: Bearer <token>` header and decoding `userId` from it - they do not use the NextAuth session. So there are effectively two parallel auth systems in the codebase.

Data layer: `lib/mongodb.js` exports `connectMongoDB()`, which calls `mongoose.connect(process.env.MONGO_URI)` and is invoked at the top of each API route. Mongoose models live in `models/` (`user.js`, `cart.js`, `wishlist.js`, `Payment.js`) and follow the `models.X || mongoose.model("X", schema)` pattern to survive hot reloads. `Cart` and `Wishlist` reference `User` by ObjectId.

Client state: `context/CartContext.js` and `context/WIshlistContext.js` (note the typo `WIshlist`, preserved everywhere - keep it) expose `useCart` / `useWishlist` hooks. They read the JWT from the `token` cookie, fetch the user's cart/wishlist from the API on mount, and expose `addToCart`, `removeFromCart`, `incrementQuantity`, `decrementQuantity`, `calculateTotalPrice`. Components mark themselves `"use client"` where needed.

Shared UI: `components/` holds reusable JSX components (`Navbar`, `Footer`, `Books`, `Card`, `Cart`, `Wishlist`, `LoginForm`, `RegisterForm`, `Main`, `Topheader`, `UserInfo`, `Hastag`, `Provider`). `components/Provider.js` is the NextAuth `SessionProvider` wrapper.

Styling: Tailwind is the primary system, configured in `tailwind.config.js` to scan `pages/`, `components/`, `app/`. Custom colors (`bggray`, `textgray`, `primary`) and three font families (`sans` from Inter, `MyFont` from Quicksand, `main` from Fraunces) are exposed via CSS variables wired in `app/layout.js`. `app/globals.css` is imported once from the root layout. Bootstrap and `react-icons` are also in deps.

External services: book data is fetched from Google Books (images allow-listed from `books.google.com` and `lh3.googleusercontent.com` in `next.config.js`). Payments go through Razorpay via `app/api/razorpay/route.js` (order creation) and `app/api/paymentverify`. `@formspree/react` is used for contact forms. `html2canvas` + `jspdf` / `jspdf-autotable` are present, likely for receipts/invoices in `app/Track` or `app/paymentsuccess`.

### Conventions and gotchas

- Path alias: `@/*` maps to the project root (configured in `jsconfig.json`). Import as `@/components/Navbar`, `@/lib/mongodb`, `@/models/user`, etc.
- The wishlist context file is named `context/WIshlistContext.js` (capital `I`). All imports reference this exact spelling - do not "fix" it without updating call sites.
- Two auth systems coexist: NextAuth (server sessions, used by middleware) and a custom JWT (used by all cart/wishlist API routes via `Authorization: Bearer`). When adding new authenticated API routes, follow the JWT-via-header pattern already established in `app/api/cart/route.js`.
- `middleware.js` is a one-liner that re-exports `next-auth/middleware` with `matcher: ["/Dashboard"]` - only the `/Dashboard` route is gated by NextAuth session. Adding more protected routes means extending this matcher.
- `next.config.js` enables `experimental.appDir`, `serverActions`, and `serverComponentsExternalPackages: ["mongoose"]` (required to keep Mongoose out of the Server Components bundle). It also enables `topLevelAwait` in webpack. `images.unoptimized` is true and the `images.domains` key is declared twice (the second overrides the first) - only `books.google.com` is effectively allow-listed.
- Required environment variables (names only; values are in `.env` and must not be committed elsewhere): `MONGO_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `RAZORPAY_API_KEY`, `RAZORPAY_KEY_SECRET`, `JWT_SECRET`. `next.config.js` also references `Base_URL`.
- Route folder names are PascalCase (`Cart`, `Login`, `Dashboard`, ...) so URLs are case-sensitive: `/Login`, not `/login`. NextAuth `pages.signIn` is set to `/Login` to match.
- `@netlify/plugin-nextjs` is in deps, suggesting Netlify is a supported deploy target alongside Vercel.
- The README's "File Structure" section is stale - it references a `pages/`, `styles/`, and `server/` layout that does not exist. Treat the App Router layout described above as authoritative.
