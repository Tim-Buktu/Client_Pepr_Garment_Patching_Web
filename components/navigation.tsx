"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { MobileMenu } from "./mobile-menu"

export const NAV_LINKS = [
  { href: "/products", label: "Products" },
  { href: "/upcycle",  label: "Upcycle"  },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
]

export function Navigation() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  const handleSignOut = () => signOut({ redirect: true, callbackUrl: "/" })

  const getProfileImage = () => {
    const img = session?.user?.image ?? null
    return img && img.startsWith('https://') ? img : '/user.png'
  }

  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="font-display text-lg font-semibold text-black hover:text-gray-700 transition-colors select-none"
          style={{ letterSpacing: "var(--tracking-tight)" }}
        >
          Pe-Pr
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors duration-150 ${
                isActive(href)
                  ? "text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            href="/custom"
            className="inline-flex items-center h-8 px-4 bg-black text-white text-xs rounded-pill hover:bg-gray-800 transition-colors"
            style={{ letterSpacing: "var(--tracking-wide)" }}
          >
            Customize
          </Link>

          {status === "loading" ? (
            <div className="w-7 h-7 rounded-full bg-gray-100" />
          ) : session ? (
            <div className="relative group">
              <button
                onClick={() => router.push("/profile")}
                className="block w-7 h-7 rounded-full overflow-hidden border border-gray-200 hover:border-gray-400 transition-colors"
                aria-label="Profile"
              >
                <Image
                  src={getProfileImage()}
                  alt={session.user?.name ?? "Profile"}
                  width={28}
                  height={28}
                  className="object-cover w-full h-full"
                />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-44 py-1 bg-white border border-gray-200 rounded-soft shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 origin-top-right">
                <button
                  onClick={() => router.push("/profile")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm text-gray-500 hover:text-black transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile trigger */}
        <div className="md:hidden">
          <MobileMenu navLinks={NAV_LINKS} isAuthenticated={!!session} />
        </div>

      </div>
    </nav>
  )
}
