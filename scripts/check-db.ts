import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function checkDatabase() {
  try {
    console.log('Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Check tables
    const userCount = await prisma.user.count()
    console.log('Users in database:', userCount)

    // Get database info
    const dbInfo = await prisma.$queryRaw`SELECT current_database(), current_user`
    console.log('Database info:', dbInfo)

  } catch (error) {
    console.error('❌ Database check failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDatabase() 