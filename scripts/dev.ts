import { exec } from 'child_process'
import chalk from 'chalk'

// Install chalk first: npm install -D chalk

const runCommand = (command: string, name: string) => {
  const process = exec(command)
  
  process.stdout?.on('data', (data) => {
    console.log(chalk.blue(`[${name}]`), data.toString())
  })

  process.stderr?.on('data', (data) => {
    console.log(chalk.red(`[${name}] Error:`), data.toString())
  })

  return process
}

console.log(chalk.green('Starting development environment...'))

// Start PostgreSQL
runCommand('docker-compose up db', 'Database')

// Wait for database to be ready
setTimeout(() => {
  // Run Prisma migrations
  runCommand('npx prisma db push', 'Prisma')
  
  // Start Next.js development server
  runCommand('npm run dev', 'Next.js')
}, 5000) 