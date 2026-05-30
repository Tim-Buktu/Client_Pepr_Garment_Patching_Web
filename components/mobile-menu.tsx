"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"

interface NavLink {
  href: string
  label: string
}

interface MobileMenuProps {
  navLinks: NavLink[]
  isAuthenticated: boolean
}

export function MobileMenu({ navLinks, isAuthenticated }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close when navigating
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      {/* Hamburger trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col gap-[5px] w-5 py-1 group"
        aria-label="Open menu"
      >
        <span className="block h-px bg-black w-full transition-colors group-hover:bg-gray-600" />
        <span className="block h-px bg-black w-3.5 transition-colors group-hover:bg-gray-600" />
      </button>

      {/* Full-screen overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">

          {/* Header — mirrors the main nav height */}
          <div className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-gray-100">
            <Link
              href="/"
              className="font-display text-lg font-semibold text-black"
              onClick={() => setIsOpen(false)}
            >
              Pe-Pr
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-black transition-colors p-1"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Primary links — large editorial Fraunces */}
          <nav className="flex-1 flex flex-col justify-center px-8">
            <ul className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block font-display text-4xl font-medium text-black py-3 hover:text-gray-500 transition-colors leading-none"
                    style={{ letterSpacing: "var(--tracking-tight)" }}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer actions */}
          <div className="shrink-0 px-8 pb-10 flex flex-col gap-3">
            <Link
              href="/custom"
              className="flex items-center justify-center h-12 bg-black text-white text-sm rounded-pill hover:bg-gray-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Customize
            </Link>
            <Link
              href={isAuthenticated ? "/profile" : "/login"}
              className="flex items-center justify-center h-12 border border-gray-200 text-black text-sm rounded-pill hover:border-gray-400 hover:bg-gray-50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? "My Profile" : "Sign in"}
            </Link>
          </div>

        </div>
      )}
    </>
  )
}
