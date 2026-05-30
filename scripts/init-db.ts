import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function initDatabase() {
  console.log('Starting database initialization...')

  try {
    // Start PostgreSQL container
    console.log('Starting PostgreSQL container...')
    await execAsync('docker-compose up -d db')
    
    // Wait for database to be ready
    console.log('Waiting for database to be ready...')
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Initialize Prisma client
    const prisma = new PrismaClient()

    try {
      // Test connection
      console.log('Testing database connection...')
      await prisma.$connect()
      console.log('Database connection successful')

      // Push schema
      console.log('Pushing schema to database...')
      await execAsync('npx prisma db push')
      console.log('Schema push successful')

      // Generate Prisma Client
      console.log('Generating Prisma Client...')
      await execAsync('npx prisma generate')
      console.log('Prisma Client generation successful')

      // Start Prisma Studio
      console.log('Starting Prisma Studio...')
      await execAsync('npx prisma studio')

    } catch (error) {
      console.error('Database initialization failed:', error)
      throw error
    } finally {
      await prisma.$disconnect()
    }

  } catch (error) {
    console.error('Initialization failed:', error)
    process.exit(1)
  }
}

initDatabase() 