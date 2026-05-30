'use client'

import { useEffect, useState } from 'react'

interface SystemStatus {
  database: boolean
  prisma: boolean
  nextAuth: boolean
  uploadThing: boolean
}

export function DevDashboard() {
  const [status, setStatus] = useState<SystemStatus>({
    database: false,
    prisma: false,
    nextAuth: false,
    uploadThing: false
  })

  useEffect(() => {
    const checkServices = async () => {
      try {
        // Check database
        const dbResponse = await fetch('/api/health/db')
        const dbStatus = await dbResponse.json()
        
        // Check other services
        const authResponse = await fetch('/api/health/auth')
        const authStatus = await authResponse.json()
        
        setStatus({
          database: dbStatus.healthy,
          prisma: dbStatus.healthy,
          nextAuth: authStatus.healthy,
          uploadThing: true // Add actual check if needed
        })
      } catch (error) {
        console.error('Health check failed:', error)
      }
    }

    checkServices()
    const interval = setInterval(checkServices, 30000) // Check every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <h3 className="font-semibold mb-2">System Status</h3>
      <div className="space-y-1">
        {Object.entries(status).map(([service, isHealthy]) => (
          <div key={service} className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="capitalize">{service}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 