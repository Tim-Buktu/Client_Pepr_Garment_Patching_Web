interface PageShellProps {
  children: React.ReactNode
  className?: string
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <main className={`min-h-screen bg-white text-black pt-16 font-body ${className ?? ''}`}>
      {children}
    </main>
  )
}
