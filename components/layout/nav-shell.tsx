export function NavShell() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-full flex items-center justify-between">

        {/* Logo zone */}
        <div className="w-16 h-3.5 bg-gray-100 rounded-sharp" />

        {/* Nav links zone — hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <div className="w-16 h-2.5 bg-gray-100 rounded-sharp" />
          <div className="w-14 h-2.5 bg-gray-100 rounded-sharp" />
          <div className="w-12 h-2.5 bg-gray-100 rounded-sharp" />
          <div className="w-16 h-2.5 bg-gray-100 rounded-sharp" />
        </div>

        {/* Actions zone */}
        <div className="flex items-center gap-4">
          {/* CTA button */}
          <div className="hidden md:block w-28 h-8 bg-black rounded-pill" />
          {/* Hamburger — mobile only */}
          <div className="md:hidden flex flex-col gap-1.5 w-5">
            <div className="h-px bg-gray-900 w-full" />
            <div className="h-px bg-gray-900 w-4" />
          </div>
        </div>

      </div>
    </nav>
  )
}
