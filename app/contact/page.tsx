"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { PageShell } from "@/components/layout/page-shell"
import { SectionShell } from "@/components/layout/section-shell"
import { Footer } from "@/components/footer"

const CONTACT_ITEMS = [
  {
    index: "01",
    label: "Location",
    lines: ["Studio Pe-Pr", "Jakarta, Indonesia"],
    action: {
      label: "Open in Maps",
      href: "https://maps.google.com/?q=Jakarta+Indonesia",
    },
  },
  {
    index: "02",
    label: "Email",
    lines: ["hello@pe-pr.co"],
    action: {
      label: "Send email",
      href: "mailto:hello@pe-pr.co",
    },
  },
  {
    index: "03",
    label: "Phone",
    lines: ["Pe-Pr Atelier", "+62 21 0000 0000"],
    action: {
      label: "WhatsApp",
      href: "https://wa.me/",
    },
  },
]

export default function ContactPage() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.name || !fields.email || !fields.message) return
    setSending(true)
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    setSent(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  return (
    <PageShell>
      <Navigation />

      {/* ── Hero ───────────────────────────────────────────── */}
      <SectionShell>
        <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-6">
          Pe-Pr / Contact
        </p>
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-24 items-end">
          <h1 className="font-display text-4xl md:text-5xl font-medium text-black leading-[1.08] tracking-tight">
            Let's talk.
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            Questions about sizing, fabric, turnaround time, or a custom order — reach us directly. We respond to everything within 24 hours.
          </p>
        </div>
      </SectionShell>

      {/* ── Contact cards ──────────────────────────────────── */}
      <SectionShell tinted>
        <div className="grid sm:grid-cols-3 gap-6">
          {CONTACT_ITEMS.map(({ index, label, lines, action }) => (
            <div
              key={index}
              className="flex flex-col gap-5 bg-white border border-gray-200 rounded-soft p-8"
            >
              <div className="flex items-start justify-between">
                <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                  {label}
                </p>
                <span className="font-mono text-[10px] text-gray-300">{index}</span>
              </div>

              <div className="flex flex-col gap-1 flex-1">
                {lines.map((line) => (
                  <p key={line} className="text-sm text-gray-700 leading-snug">
                    {line}
                  </p>
                ))}
              </div>

              <a
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 px-5 bg-black text-white text-xs rounded-sharp hover:bg-gray-800 transition-colors"
              >
                {action.label}
              </a>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* ── Contact form ───────────────────────────────────── */}
      <SectionShell>
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
              Send a message
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-black leading-tight">
              Prefer to write?<br />We read every message.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mt-2">
              Tell us what you're looking for — a first pair, a repeat order, a repair, or just a question. The more detail the better.
            </p>
          </div>

          <div>
            {sent ? (
              <div className="flex flex-col gap-4 border border-gray-200 rounded-soft p-8">
                <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                  Received
                </p>
                <p className="font-display text-2xl font-medium text-black">
                  Message sent.
                </p>
                <p className="text-sm text-gray-500">
                  We'll get back to you at <span className="text-black">{fields.email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => { setSent(false); setFields({ name: "", email: "", message: "" }) }}
                  className="self-start text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-4 mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="h-11 px-4 bg-white border border-gray-200 rounded-sharp text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="h-11 px-4 bg-white border border-gray-200 rounded-sharp text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="What are you looking for?"
                    className="px-4 py-3 bg-white border border-gray-200 rounded-sharp text-sm text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="h-11 px-6 bg-black text-white text-sm rounded-sharp hover:bg-gray-800 disabled:opacity-50 transition-colors self-start"
                >
                  {sending ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionShell>

      <Footer />

    </PageShell>
  )
}
