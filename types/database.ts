import type { User as PrismaUser, Order as PrismaOrder } from '@prisma/client'

export interface User extends PrismaUser {
  orders?: Order[]
}

export interface Order extends PrismaOrder {
  user?: User
}

export interface Session {
  user: {
    id: string
    email: string
    name: string | null
    image?: string | null
  }
  expires: string
} 