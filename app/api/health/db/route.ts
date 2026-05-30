import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    // Get table counts
    const counts = await Promise.all([
      prisma.user.count(),
      prisma.order.count(),
      prisma.patch.count()
    ])
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      counts: {
        users: counts[0],
        orders: counts[1],
        patches: counts[2]
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 