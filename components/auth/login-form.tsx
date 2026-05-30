'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export function LoginForm() {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError('')
      await signIn('google', { callbackUrl: '/' })
    } catch {
      setError('Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-gray-100 text-gray-800 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        {loading ? 'Redirecting...' : 'Continue with Google'}
      </button>
    </div>
  )
}
