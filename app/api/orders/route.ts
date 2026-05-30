import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { type, details, discountCode } = body

    let discountAmount = 0
    if (discountCode) {
      const discount = await prisma.discountCode.findUnique({
        where: { code: discountCode, isActive: true }
      })

      if (discount) {
        discountAmount = discount.type === 'fixed' 
          ? discount.amount 
          : (details.price * discount.amount / 100)
      }
    }

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: 'pending',
        totalAmount: details.price - discountAmount,
        discountCode,
        discountAmount,
        [type === 'custom' ? 'customPants' : 'upcyclePants']: {
          create: {
            ...details
          }
        }
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
} 