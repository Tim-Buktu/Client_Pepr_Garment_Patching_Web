import { RegisterForm } from '@/components/auth/register-form'
import { Navigation } from '@/components/navigation'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="flex flex-col items-center mb-8">
              <Image 
                src="/logo.png" 
                alt="Pe-Pr Logo" 
                width={60} 
                height={48} 
                className="mb-4"
              />
              <h1 className="text-2xl font-bold text-center">Create Account</h1>
              <p className="text-gray-600 text-sm">Join Pe-Pr today</p>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  )
} 