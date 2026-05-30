# Pe-Pr

Custom pants brand and upcycle/patch service — client project built from the ground up as a full e-commerce experience.

## What makes this unique

Pe-Pr isn't a template build. The client sells two things: made-to-order custom pants and an upcycle/patch service where customers send in garments to be reworked. That dual model required a custom configurator UI — customers can spec out their piece (fabric, fit, patches) before checkout. There's no off-the-shelf plugin for that.

The design direction is full monochrome — no color, no gradients. Influence from Linear, Teenage Engineering, and Figma. Tight typographic system using Fraunces for display and Geist for body copy. The constraint makes it precise: everything has to work in black and white.

## Stack

- **Next.js 15** App Router
- **TypeScript**
- **Tailwind CSS v3** with a custom monochrome design token system
- **Prisma + PostgreSQL**
- **NextAuth v4**
- **UploadThing** for image uploads

## Local setup

```bash
npm install
cp .env.example .env.local  # fill in DB + auth vars
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

Built by [Tim-Buktu](https://github.com/Tim-Buktu)
