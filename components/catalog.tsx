import Image from 'next/image'

export function Catalog() {
  const products = [
    {
      name: 'Cream Corduroy',
      price: 'Rp. 350.000',
      image: '/creamcorduroy.jpg'
    },
    {
      name: 'Green Cargo',
      price: 'Rp. 350.000',
      image: '/greencargo.jpg'
    },
    {
      name: 'Red Corduroy',
      price: 'Rp. 350.000',
      image: '/redcorduroy.jpg'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#8B1D24] mb-12">OUR CATALOG</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.name} className="text-center">
              <div className="relative aspect-[3/4] mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-neutral-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

