interface SectionShellProps {
  children?: React.ReactNode
  className?: string
  tinted?: boolean
  dark?: boolean
  label?: string
}

export function SectionShell({
  children,
  className,
  tinted,
  dark,
  label,
}: SectionShellProps) {
  const bg = dark
    ? 'bg-black text-white'
    : tinted
    ? 'bg-gray-50 text-black'
    : 'bg-white text-black'

  return (
    <section className={`py-20 ${bg} ${className ?? ''}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {label && (
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-10">
            {label}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
