import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PageShell } from "@/components/layout/page-shell"
import { SectionShell } from "@/components/layout/section-shell"
import { Footer } from "@/components/footer"

const STATS = [
  {
    value: "2018",
    label: "Founded",
    detail: "Born in Bandung, Indonesia",
  },
  {
    value: "4th",
    label: "Generation",
    detail: "Of family tailoring heritage",
  },
  {
    value: "Zero",
    label: "Compromise",
    detail: "On fabric quality and fit",
  },
]

const PILLARS = [
  {
    index: "01",
    heading: "Craft",
    body:
      "Every pair of pants starts as a conversation about how you move. Our tailors cut, pin, and press by hand — no assembly line, no shortcuts. Four generations of technique inform every seam.",
  },
  {
    index: "02",
    heading: "Fabric",
    body:
      "We source premium deadstock from global fashion houses — the same materials you find in Zara, Uniqlo, and independent European mills. Quality that would otherwise go to waste, given a second life on your body.",
  },
  {
    index: "03",
    heading: "Fit",
    body:
      "Standard sizing is a guess. We use your measurements to build a pattern made only for you. The result wears differently — sits correctly, moves with you, doesn't need adjusting.",
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <Navigation />

      {/* ── Hero ───────────────────────────────────────────── */}
      <SectionShell>
        <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-6">
          Pe-Pr / About
        </p>

        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-24 items-end">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-black leading-[1.08] tracking-tight">
            Stitched from four generations<br className="hidden md:block" /> of craft.
          </h1>

          <div className="flex flex-col gap-5">
            <p className="text-base text-gray-600 leading-relaxed">
              Pe-Pr is a custom clothing studio based in Bandung, Indonesia. We make pants that are built around you — your measurements, your fabric choice, your cut — produced by the same family of tailors who have been cutting cloth since the 1970s.
            </p>
            <p className="text-base text-gray-600 leading-relaxed">
              We also give existing garments a second story. Our upcycle and patch service transforms worn pieces into something intentional — repaired with precision, not disguised.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* ── Stats ──────────────────────────────────────────── */}
      <SectionShell tinted>
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
          {STATS.map(({ value, label, detail }) => (
            <div key={label} className="flex flex-col gap-3 border-t border-gray-200 pt-8">
              <p className="font-display text-4xl md:text-5xl font-medium text-black leading-none">
                {value}
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                {label}
              </p>
              <p className="text-sm text-gray-500 leading-snug mt-1">{detail}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── Story + Image ──────────────────────────────────── */}
      <SectionShell>
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-center">
          <div className="relative aspect-[4/5] rounded-soft overflow-hidden bg-gray-100 order-last md:order-first">
            <Image
              src="/fabricrolls.jpg"
              alt="Fabric rolls at Pe-Pr studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col gap-8">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
              The material
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-black leading-tight">
              Fabric that starts where fashion ends.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-base text-gray-600 leading-relaxed">
                Most fabric in our studio is premium deadstock — end-of-season rolls from large fashion houses that never became product. We acquire them before they're discarded, and turn them into something made specifically for one person.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                You get access to materials that don't exist in retail. Woven linens, technical nylons, Japanese twills, silk satins. All selected for how they hold a crease, survive a wash, and age on a body.
              </p>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* ── Pillars ────────────────────────────────────────── */}
      <SectionShell tinted>
        <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-14">
          How we work
        </p>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {PILLARS.map(({ index, heading, body }) => (
            <div key={index} className="flex flex-col gap-4 border-t border-gray-200 pt-8">
              <span className="font-mono text-[10px] tracking-widest text-gray-400">
                {index}
              </span>
              <h3 className="font-display text-2xl font-medium text-black">{heading}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── CTA ────────────────────────────────────────────── */}
      <SectionShell dark>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-lg">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-500">
              Start here
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight">
              Ready to build something that fits?
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/custom"
              className="inline-flex items-center justify-center h-11 px-6 bg-white text-black text-sm rounded-sharp hover:bg-gray-100 transition-colors"
            >
              Customize your pants
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-11 px-6 border border-gray-700 text-white text-sm rounded-sharp hover:border-gray-500 transition-colors"
            >
              Browse catalog
            </Link>
          </div>
        </div>
      </SectionShell>

      <Footer />

    </PageShell>
  )
}
