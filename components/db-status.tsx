'use client'

import { useEffect, useState } from 'react'

export function DatabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'healthy' | 'error'>('checking')

  useEffect(() => {
    const checkDb = async () => {
      try {
        const res = await fetch('/api/health/db')
        const data = await res.json()
        setStatus(data.status === 'healthy' ? 'healthy' : 'error')
      } catch {
        setStatus('error')
      }
    }

    checkDb()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 p-2 rounded-full">
      <div className={`w-3 h-3 rounded-full ${
        status === 'checking' ? 'bg-yellow-400' :
        status === 'healthy' ? 'bg-green-400' : 'bg-red-400'
      }`} />
    </div>
  )
} 