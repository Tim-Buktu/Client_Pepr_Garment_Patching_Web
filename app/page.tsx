import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { ProductGrid } from '@/components/product-card'
import { Footer } from '@/components/footer'
import { PRODUCTS } from '@/lib/products'
import { PageShell } from '@/components/layout/page-shell'
import { SectionShell } from '@/components/layout/section-shell'

function Block({ className }: { className?: string }) {
  return <div className={`bg-gray-100 rounded-soft ${className ?? ''}`} />
}

export default function Home() {
  return (
    <PageShell>
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Features ──────────────────────────────────────── */}
      <SectionShell tinted label="features">
        <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Block className="aspect-[4/3]" />
              <Block className="h-5 w-36" />
              <Block className="h-3 w-full" />
              <Block className="h-3 w-4/5" />
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
      <SectionShell tinted label="customization">
        <div className="mb-12 flex flex-col gap-3">
          <Block className="h-8 w-64" />
          <Block className="h-4 w-96 max-w-full" />
        </div>
        <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
          {[0, 1, 2].map((i) => (
            <Block key={i} className="aspect-[3/4]" />
          ))}
        </div>
      </SectionShell>

      <Footer />

    </PageShell>
  )
}
