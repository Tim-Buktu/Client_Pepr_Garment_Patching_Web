'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'

interface AuthContextType {
  session: Session | null
  status: 'loading' | 'authenticated' | 'unauthenticated'
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  status: 'unauthenticated'
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()

  return (
    <AuthContext.Provider value={{ session, status }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 