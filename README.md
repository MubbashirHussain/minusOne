This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Journal and page transitions

- `/blog` is the journal index. Article content lives in `data/blog.ts`.
- `/blog/[slug]` is statically generated for each article. Review the two original starter articles before publishing them under your name.
- Set `NEXT_PUBLIC_SITE_URL` to your public production origin (see `.env.example`). It controls canonical URLs, JSON-LD, robots.txt, and sitemap.xml.
- `components/animations/RouteTransitions.tsx` uses `next-transition-router` and GSAP for internal link transitions. Hash links keep their normal anchor behavior; browser Back/Forward uses native navigation, as designed by the library. Reduced-motion users navigate immediately.
- The persistent header is in `components/layout/header.tsx` and is mounted by the root layout.
- Blog content is server-rendered, including with JavaScript disabled. The optional homepage node intro remains disabled and is independent of route transitions.
- Submit `/sitemap.xml` in your search console after deploying and verifying your production domain.

Validation: run `npm run build` followed by `npm run test:blog` to check the production pages, canonical URLs, metadata, sitemap, robots, 404 handling, and social image. Use the same `NEXT_PUBLIC_SITE_URL` for both commands.
