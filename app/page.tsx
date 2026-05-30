import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProductGrid } from '@/components/product-card'
import { Footer } from '@/components/footer'
import { PRODUCTS } from '@/lib/products'
import { PageShell } from '@/components/layout/page-shell'
import { SectionShell } from '@/components/layout/section-shell'

const CONFIG_CARDS = [
  {
    src: '/fabric.jpg',
    dimension: 'Fabric',
    options: ['Linen', 'Nylon', 'Twill', 'Satin'],
  },
  {
    src: '/button.jpg',
    dimension: 'Volume & Cut',
    options: ['Wide', 'Pencil', 'Middle', '2-Line'],
  },
  {
    src: '/volime.jpg',
    dimension: 'Hardware',
    options: ['Button', 'Hook'],
  },
]

export default function Home() {
  return (
    <PageShell>
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── How it works ──────────────────────────────────── */}
      <SectionShell>
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-end mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-black leading-[1.06] tracking-tight">
            Made for you.<br />Not adjusted to fit.
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            Every pair starts as measurements, not a size. Our 4th-generation tailors in Bandung cut each piece from scratch — no stock, no compromise.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {[
            {
              n: "01",
              title: "Configure",
              body: "Choose fabric, cut, volume, and hardware from 32 combinations. Every option visible at once — no hidden menus.",
              cta: { label: "Open configurator →", href: "/custom" },
            },
            {
              n: "02",
              title: "We cut",
              body: "Your exact measurements drive every cut. No standard sizes — each pair is made to the millimetre by hand.",
              cta: null,
            },
            {
              n: "03",
              title: "Yours",
              body: "Ready in 2–3 weeks. A pair built around your body, in the exact fabric and cut you chose.",
              cta: null,
            },
          ].map(({ n, title, body, cta }) => (
            <div key={n} className="flex flex-col gap-5 py-8 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
              <span className="font-mono text-[10px] tracking-widest text-gray-400">{n}</span>
              <h3 className="font-display text-2xl md:text-3xl font-medium text-black leading-tight">
                {title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{body}</p>
              {cta && (
                <Link href={cta.href} className="text-xs text-black hover:text-gray-500 transition-colors self-start">
                  {cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── Catalog ───────────────────────────────────────── */}
      <SectionShell>
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-display text-3xl font-medium text-black">
            Our products
          </h2>
          <Link
            href="/products"
            className="text-xs text-gray-500 hover:text-black transition-colors"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={PRODUCTS} />
      </SectionShell>

      {/* ── Customization ─────────────────────────────────── */}
      <SectionShell tinted>
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-medium text-black leading-[1.06] tracking-tight">
            Every detail,<br />your choice.
          </h2>
          <Link
            href="/custom"
            className="text-xs text-gray-500 hover:text-black transition-colors shrink-0 pb-1"
          >
            Configure yours →
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
          {CONFIG_CARDS.map((card) => (
            <div key={card.dimension} className="relative aspect-[3/4] overflow-hidden rounded-soft">
              <Image
                src={card.src}
                alt={card.dimension}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col gap-3">
                <p className="font-mono text-[9px] tracking-widest uppercase text-white/50">
                  {card.dimension}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {card.options.map((opt) => (
                    <span
                      key={opt}
                      className="inline-flex items-center h-6 px-3 border border-white/25 rounded-sharp font-mono text-[9px] tracking-widest uppercase text-white"
                    >
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <Footer />

    </PageShell>
  )
}
