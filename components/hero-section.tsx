import Image from 'next/image'
import Link from 'next/link'

const CATALOG_IMAGES = [
  { src: '/catalog-1.jpg', alt: 'Cream Corduroy' },
  { src: '/catalog-2.jpg', alt: 'Green Cargo' },
  { src: '/catalog-3.jpg', alt: 'Red Corduroy' },
]

export function HeroSection() {
  return (
    <section className="min-h-[calc(100svh-4rem)] flex flex-col">

      {/* ── Centered text block ─────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16 md:py-20">

        <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-8">
          Custom fashion · Bandung
        </p>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-black leading-none mb-8 max-w-2xl">
          Wear exactly<br />
          what you mean.
        </h1>

        <p className="text-base text-gray-500 leading-relaxed max-w-xs mb-10">
          Configure fabric, cut, and volume. Every pair made to your
          measurements by 4th-generation tailors.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            href="/custom"
            className="inline-flex items-center justify-center h-11 px-6 bg-black text-white text-sm rounded-pill hover:bg-gray-800 transition-colors"
          >
            Configure yours
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center h-11 px-6 border border-gray-200 text-black text-sm rounded-pill hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            View catalog
          </Link>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {['Premium fabrics', 'Handmade', 'Made to measure'].map((label) => (
            <span key={label} className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0" />
              {label}
            </span>
          ))}
        </div>

      </div>

      {/* ── Image strip ─────────────────────────────────────── */}
      <div className="grid grid-cols-3 h-56 md:h-72 border-t border-gray-200">
        {CATALOG_IMAGES.map((img) => (
          <div key={img.src} className="relative overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 33vw, 400px"
            />
          </div>
        ))}
      </div>

    </section>
  )
}
