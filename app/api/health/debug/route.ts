import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test raw connection
    const dbTest = await prisma.$queryRaw`SELECT current_database(), current_user, version()`
    
    return NextResponse.json({
      success: true,
      connection: dbTest,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Database connection failed',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 