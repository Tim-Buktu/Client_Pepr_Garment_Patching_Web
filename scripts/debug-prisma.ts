import { PrismaClient } from '@prisma/client'

async function debugPrisma() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  try {
    console.log('Attempting to connect to database...')
    await prisma.$connect()
    console.log('Successfully connected to database')

    console.log('Testing simple query...')
    const result = await prisma.$queryRaw`SELECT current_database(), current_user`
    console.log('Database info:', result)

    console.log('Testing table access...')
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)

  } catch (error) {
    console.error('Error occurred:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugPrisma() 