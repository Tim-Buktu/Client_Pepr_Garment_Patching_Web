import Link from "next/link"
import { Instagram } from "lucide-react"

const NAV_COLS = [
  {
    heading: "Explore",
    links: [
      { label: "Products", href: "/products" },
      { label: "Upcycle", href: "/upcycle" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Custom pants", href: "/custom" },
      { label: "Upcycle & Patch", href: "/upcycle" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20">

        {/* Main grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className="font-display text-lg font-semibold text-white hover:text-gray-300 transition-colors self-start"
            >
              Pe-Pr
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
              Custom pants built on four generations of Bandung craft.
            </p>
            <div className="flex gap-4 mt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {NAV_COLS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gray-500">
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-500">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:peprfashion@gmail.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  peprfashion@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+6281218786829"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +62 812 1878 6829
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-mono text-[10px] tracking-widest text-gray-600">
            © {new Date().getFullYear()} Pe-Pr. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-mono text-[10px] tracking-widest text-gray-600 hover:text-gray-400 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-mono text-[10px] tracking-widest text-gray-600 hover:text-gray-400 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
