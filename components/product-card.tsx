import Image from 'next/image'
import Link from 'next/link'
import { type Product } from '@/lib/products'

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString('id-ID')}`
}

export function ProductCard({ name, price, image, tag }: Product) {
  return (
    <Link href="/custom" className="group block">

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
        {tag && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-black text-white font-mono text-[9px] tracking-widest uppercase">
            {tag}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
          {name}
        </h3>
        <span className="font-mono text-xs text-gray-500 shrink-0">
          {formatPrice(price)}
        </span>
      </div>
      <p className="mt-1 text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
        Customize →
      </p>

    </Link>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
