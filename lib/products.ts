export interface Product {
  id: string
  name: string
  price: number
  image: string
  tag?: string | null
}

export const PRODUCTS: Product[] = [
  {
    id: 'cream-corduroy',
    name: 'Cream Corduroy',
    price: 350000,
    image: '/catalog-1.jpg',
    tag: 'Bestseller',
  },
  {
    id: 'green-cargo',
    name: 'Green Cargo',
    price: 350000,
    image: '/catalog-2.jpg',
  },
  {
    id: 'red-corduroy',
    name: 'Red Corduroy',
    price: 350000,
    image: '/catalog-3.jpg',
  },
]
