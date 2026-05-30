import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { PageShell } from '@/components/layout/page-shell'
import { SectionShell } from '@/components/layout/section-shell'
import { ProductGrid } from '@/components/product-card'
import { Footer } from '@/components/footer'
import { PRODUCTS } from '@/lib/products'

const UGC_POSTS = [
  { id: 1, src: '/instagram-1.png' },
  { id: 2, src: '/instagram-2.png' },
  { id: 3, src: '/instagram-3.png' },
  { id: 4, src: '/instagram-4.png' },
  { id: 5, src: '/instagram-5.png' },
  { id: 6, src: '/instagram-6.png' },
]

const PROJECTS = [
  { id: 1, src: '/ppro1.jpg', name: 'Project Dandy'  },
  { id: 2, src: '/ppro2.jpg', name: 'Project Quirky' },
  { id: 3, src: '/ppro3.jpg', name: 'Project Edge'   },
]

export default function ProductsPage() {
  return (
    <PageShell>
      <Navigation />

      {/* Announcement bar */}
      <div className="bg-gray-50 border-b border-gray-200 text-center py-2.5">
        <p className="text-xs text-gray-500">
          Rp 40,000 cashback on your first order — use code{' '}
          <span className="font-mono text-gray-800 tracking-wide">PEPRISYOU</span>
        </p>
      </div>

      {/* ── Product catalog ───────────────────────────────── */}
      <SectionShell>
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-4">
            Catalog
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-medium text-black leading-tight">
            Our products
          </h1>
        </div>
        <ProductGrid products={PRODUCTS} />
      </SectionShell>

      {/* ── Community / UGC ───────────────────────────────── */}
      <SectionShell tinted>
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-4">
            Community
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-black mb-3">
            #PEoplePRoject
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            Tag{' '}
            <span className="font-mono text-gray-700">#PeopleProject</span>
            {' '}on Instagram to be featured here.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {UGC_POSTS.map((post) => (
            <div
              key={post.id}
              className="relative aspect-[9/16] overflow-hidden bg-gray-100"
            >
              <Image
                src={post.src}
                alt={`Community post ${post.id}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── Designer templates ────────────────────────────── */}
      <SectionShell>
        <div className="mb-12">
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-4">
            Designer series
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-black mb-3">
            #PErfectPRoject
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            Template designs by award-winning designers — configure
            and make them your own.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group">
              <div className="relative aspect-[9/16] overflow-hidden bg-gray-100 mb-4">
                <Image
                  src={project.src}
                  alt={project.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <p className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
                {project.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Customize →
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <Footer />

    </PageShell>
  )
}
