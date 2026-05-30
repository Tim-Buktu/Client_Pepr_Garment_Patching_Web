import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="min-h-[calc(100svh-4rem)] flex flex-col">

      {/* ── Centered text block ─────────────────────────────── */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 text-center py-16 md:py-20 overflow-hidden">

        {/* Background image */}
        <Image
          src="/Hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* White overlay to keep text legible over the artwork */}
        <div className="absolute inset-0 bg-white/65" />

        {/* Content (above overlay) */}
        <div className="relative z-10 flex flex-col items-center">
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-500 mb-8">
            Custom fashion · Bandung
          </p>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-medium text-black leading-none mb-8 max-w-2xl">
            Wear exactly<br />
            what you mean.
          </h1>

          <p className="text-base text-gray-600 leading-relaxed max-w-xs mb-10">
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
              className="inline-flex items-center justify-center h-11 px-6 border border-gray-300 bg-white/80 text-black text-sm rounded-pill hover:border-gray-400 hover:bg-white transition-colors"
            >
              View catalog
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {['Premium fabrics', 'Handmade', 'Made to measure'].map((label) => (
              <span key={label} className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>

      </div>

    </section>
  )
}
