"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { navigateToCheckout, formatToIDR } from "@/lib/checkout"
import { formatPrice } from "@/config/pants-config"

// ─── Data ────────────────────────────────────────────────

const PATCH_OPTIONS = [
  { id: "dinosaur", image: "/patches/dinosaur.png" },
  { id: "clover",   image: "/patches/clover.png"   },
  { id: "star",     image: "/patches/star.png"     },
  { id: "sparkles", image: "/patches/sparkles.png" },
  { id: "turtle",   image: "/patches/turtle.png"   },
  { id: "sun",      image: "/patches/sun.png"      },
  { id: "stars",    image: "/patches/stars.png"    },
  { id: "lips",     image: "/patches/lips.png"     },
]

const GARMENT_TEMPLATES = [
  { id: "catalog-1", src: "/catalog-1.jpg",  label: "Catalog I"   },
  { id: "catalog-2", src: "/catalog-2.jpg",  label: "Catalog II"  },
  { id: "catalog-3", src: "/catalog-3.jpg",  label: "Catalog III" },
  { id: "custom-1",  src: "/pants%205.jpg",  label: "Custom I"    },
  { id: "custom-2",  src: "/custom-2.jpg",   label: "Custom II"   },
  { id: "custom-3",  src: "/pants4.jpg",     label: "Custom III"  },
]

// ─── Types ───────────────────────────────────────────────

type GarmentMode = "template" | "upload"
type PatchMode   = "library"  | "custom"

interface DragPosition { x: number; y: number; scale: number }

interface PlacedPatch {
  uid: string
  imageUrl: string
  isCustom: boolean
  position: DragPosition | null
}

// ─── Segmented control ───────────────────────────────────

function SegmentedControl<T extends string>({
  options, value, onChange,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex border border-gray-200 rounded-sharp overflow-hidden self-start">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-4 h-8 text-xs transition-colors ${
            value === opt.value
              ? "bg-black text-white"
              : "bg-white text-gray-500 hover:text-black"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

// ─── Upload drop zone ────────────────────────────────────

function UploadZone({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full border border-dashed border-gray-300 rounded-sharp h-28 flex flex-col items-center justify-center gap-2 hover:border-black transition-colors group"
    >
      <svg className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
      <span className="font-mono text-[10px] tracking-widest uppercase text-gray-400 group-hover:text-black transition-colors">
        {label}
      </span>
    </button>
  )
}

// ─── Main configurator ───────────────────────────────────

export function UpcycleConfigurator() {
  const router = useRouter()

  // Garment
  const [garmentMode, setGarmentMode] = useState<GarmentMode>("template")
  const [garmentTemplate, setGarmentTemplate] = useState("/pants%205.jpg")
  const [garmentUpload, setGarmentUpload] = useState<string | null>(null)

  // Patches (array — supports multiple)
  const [patches, setPatches] = useState<PlacedPatch[]>([])
  const [activePatchUid, setActivePatchUid] = useState<string | null>(null)

  // Custom patch upload source (for the upload-mode UI)
  const [customPatchUrl, setCustomPatchUrl] = useState<string | null>(null)
  const [patchMode, setPatchMode] = useState<PatchMode>("library")

  const previewRef      = useRef<HTMLDivElement>(null)
  const garmentInputRef = useRef<HTMLInputElement>(null)
  const patchInputRef   = useRef<HTMLInputElement>(null)

  // ── Derived ─────────────────────────────────────────────
  const canvasImage = garmentMode === "upload" && garmentUpload ? garmentUpload : garmentTemplate
  const pendingPatch = patches.find((p) => p.position === null)
  const activePatch  = patches.find((p) => p.uid === activePatchUid) ?? null
  const libraryCount = patches.filter((p) => !p.isCustom).length
  const customCount  = patches.filter((p) => p.isCustom).length
  const totalPrice   = libraryCount * 50000 + customCount * 70000
  const canOrder     = patches.length > 0 && !pendingPatch

  // ── Add / replace / remove ───────────────────────────────
  const addOrReplace = (imageUrl: string, isCustom: boolean) => {
    if (pendingPatch) {
      // Replace the unpositioned pending patch with the new selection
      setPatches((prev) =>
        prev.map((p) => (p.uid === pendingPatch.uid ? { ...p, imageUrl, isCustom } : p))
      )
      setActivePatchUid(pendingPatch.uid)
    } else {
      const uid = `${Date.now()}-${Math.random()}`
      setPatches((prev) => [...prev, { uid, imageUrl, isCustom, position: null }])
      setActivePatchUid(uid)
    }
  }

  const removePatch = (uid: string) => {
    setPatches((prev) => prev.filter((p) => p.uid !== uid))
    if (activePatchUid === uid) setActivePatchUid(null)
  }

  const adjustScale = (uid: string, increase: boolean) => {
    setPatches((prev) =>
      prev.map((p) => {
        if (p.uid !== uid || !p.position) return p
        return {
          ...p,
          position: {
            ...p.position,
            scale: increase
              ? Math.min(p.position.scale + 0.1, 1.0)
              : Math.max(p.position.scale - 0.1, 0.2),
          },
        }
      })
    )
  }

  // ── File readers ─────────────────────────────────────────
  const readFile = (file: File, cb: (url: string) => void) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const r = e.target?.result
      if (typeof r === "string") cb(r)
    }
    reader.readAsDataURL(file)
  }

  const handleGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    readFile(file, (url) => { setGarmentUpload(url); setPatches([]) })
  }

  const handleCustomPatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    readFile(file, (url) => {
      setCustomPatchUrl(url)
      addOrReplace(url, true)
    })
  }

  // ── Canvas drag ──────────────────────────────────────────
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!previewRef.current || !activePatchUid) return
    const rect = previewRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPatches((prev) =>
      prev.map((p) =>
        p.uid === activePatchUid
          ? {
              ...p,
              position: {
                x: Math.max(0, Math.min(x, rect.width  - 48)),
                y: Math.max(0, Math.min(y, rect.height - 48)),
                scale: p.position?.scale ?? 0.5,
              },
            }
          : p
      )
    )
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault() }

  // ── Order ────────────────────────────────────────────────
  const handleOrder = async () => {
    if (!canOrder) return
    try {
      await navigateToCheckout(router, {
        productName: "Upcycle & Patch Service",
        price: totalPrice,
        quantity: 1,
        imageUrl: canvasImage.startsWith("/") ? canvasImage : "/preview.png",
      })
    } catch (err: unknown) {
      console.error("Checkout error:", err instanceof Error ? err.message : err)
    }
  }

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">

      {/* Page header */}
      <div className="mb-14">
        <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-4">
          Pe-Pr / Upcycle
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-black leading-[1.08] tracking-tight">
          Patch &amp; repair.
        </h1>
        <p className="text-sm text-gray-500 mt-4 max-w-md leading-relaxed">
          Choose a garment, pick your patches, drag each one onto the preview to position. We'll stitch them exactly where you placed them.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">

        {/* ── Left: sticky preview ─────────────────────────── */}
        <div className="hidden md:flex flex-col gap-4 sticky top-24">
          <div
            ref={previewRef}
            className="relative aspect-[3/4] rounded-soft overflow-hidden bg-gray-100"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={canvasImage}
              alt="Garment preview"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Drag hint */}
            {pendingPatch && activePatchUid === pendingPatch.uid && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/60 text-white font-mono text-[9px] tracking-widest uppercase px-4 py-2 rounded-sharp">
                  Drag patch here
                </span>
              </div>
            )}

            {/* All placed patches */}
            {patches.map((patch) =>
              patch.position ? (
                <div
                  key={patch.uid}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${patch.position.x}px`,
                    top: `${patch.position.y}px`,
                    width: `${96 * patch.position.scale}px`,
                    height: `${96 * patch.position.scale}px`,
                    transform: "translate(-50%, -50%)",
                    zIndex: activePatchUid === patch.uid ? 10 : 1,
                    outline: activePatchUid === patch.uid ? "2px solid rgba(255,255,255,0.7)" : "none",
                    outlineOffset: "3px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={patch.imageUrl} alt="Patch" className="w-full h-full object-contain" />
                </div>
              ) : null
            )}
          </div>

          {/* Scale controls for active positioned patch */}
          {activePatch?.position && (
            <div className="flex items-center gap-3">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mr-auto">
                Patch size
              </p>
              <button
                type="button"
                onClick={() => adjustScale(activePatch.uid, false)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-sharp text-sm text-gray-600 hover:border-black hover:text-black transition-colors"
              >−</button>
              <span className="font-mono text-xs text-gray-500 w-10 text-center">
                {Math.round(activePatch.position.scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => adjustScale(activePatch.uid, true)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-sharp text-sm text-gray-600 hover:border-black hover:text-black transition-colors"
              >+</button>
            </div>
          )}

          {patches.length === 0 && (
            <p className="font-mono text-[10px] tracking-widest text-gray-400">
              Select a patch in the panel →
            </p>
          )}
        </div>

        {/* ── Right: controls ──────────────────────────────── */}
        <div className="flex flex-col gap-10">

          {/* 01 — Garment photo ──────────────────────────── */}
          <section className="flex flex-col gap-5">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
              01 / Garment photo
            </p>

            <SegmentedControl<GarmentMode>
              options={[
                { value: "template",    label: "Template"     },
                { value: "upload",      label: "Upload yours" },
              ]}
              value={garmentMode}
              onChange={(v) => setGarmentMode(v)}
            />

            {garmentMode === "template" ? (
              <div className="grid grid-cols-3 gap-2">
                {GARMENT_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => { setGarmentTemplate(t.src); setPatches([]) }}
                    className={`relative aspect-[3/4] overflow-hidden rounded-sharp border-2 transition-colors ${
                      garmentTemplate === t.src
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={t.src}
                      alt={t.label}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/50 px-2 py-1">
                      <p className="font-mono text-[8px] tracking-widest text-white uppercase truncate">
                        {t.label}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <>
                {garmentUpload ? (
                  <div className="flex flex-col gap-3">
                    <div className="relative aspect-[3/4] max-w-[160px] overflow-hidden rounded-sharp border border-gray-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={garmentUpload} alt="Your garment" className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => { setGarmentUpload(null); setPatches([]) }}
                      className="self-start text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-4"
                    >
                      Remove photo
                    </button>
                  </div>
                ) : (
                  <UploadZone
                    label="Upload garment photo"
                    onClick={() => garmentInputRef.current?.click()}
                  />
                )}
                <input
                  ref={garmentInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleGarmentUpload}
                />
              </>
            )}
          </section>

          <div className="border-t border-gray-100" />

          {/* 02 — Patches ────────────────────────────────── */}
          <section className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
                02 / Patches
              </p>
              {patches.length > 0 && (
                <span className="font-mono text-[10px] text-gray-400">
                  {patches.length} added
                </span>
              )}
            </div>

            <SegmentedControl<PatchMode>
              options={[
                { value: "library", label: "Library"       },
                { value: "custom",  label: "Custom upload" },
              ]}
              value={patchMode}
              onChange={(v) => setPatchMode(v)}
            />

            {patchMode === "library" ? (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-4 gap-2">
                  {PATCH_OPTIONS.map((patch) => (
                    <button
                      key={patch.id}
                      type="button"
                      draggable
                      onDragStart={() => addOrReplace(patch.image, false)}
                      onClick={() => addOrReplace(patch.image, false)}
                      className={`relative aspect-square rounded-sharp border-2 overflow-hidden transition-colors cursor-grab active:cursor-grabbing ${
                        pendingPatch?.imageUrl === patch.image && !pendingPatch.isCustom
                          ? "border-black"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={patch.image}
                        alt={patch.id}
                        fill
                        className="object-contain p-1.5 pointer-events-none"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[10px] tracking-widest text-gray-400">
                  Rp 50.000 / patch — click to add, drag onto the preview to place
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {customPatchUrl ? (
                  <div className="flex items-start gap-4">
                    <div
                      draggable
                      onDragStart={() => addOrReplace(customPatchUrl, true)}
                      onClick={() => addOrReplace(customPatchUrl, true)}
                      className="relative w-20 h-20 border-2 border-black rounded-sharp overflow-hidden shrink-0 cursor-grab active:cursor-grabbing"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={customPatchUrl} alt="Custom patch" className="w-full h-full object-contain pointer-events-none" />
                    </div>
                    <div className="flex flex-col gap-2 pt-1">
                      <p className="text-sm text-black">Custom patch ready</p>
                      <p className="font-mono text-[10px] tracking-widest text-gray-400">
                        Click or drag onto the garment to add
                      </p>
                      <button
                        type="button"
                        onClick={() => setCustomPatchUrl(null)}
                        className="self-start text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-4"
                      >
                        Upload different
                      </button>
                    </div>
                  </div>
                ) : (
                  <UploadZone
                    label="Upload patch design"
                    onClick={() => patchInputRef.current?.click()}
                  />
                )}
                <input
                  ref={patchInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleCustomPatchUpload}
                />
                <p className="font-mono text-[10px] tracking-widest text-gray-400">
                  Rp 70.000 / custom patch
                </p>
              </div>
            )}

            {/* Added patches list */}
            {patches.length > 0 && (
              <div className="flex flex-col gap-2 pt-1">
                <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-1">
                  Added patches
                </p>
                {patches.map((patch, i) => (
                  <div
                    key={patch.uid}
                    className={`flex items-center gap-3 p-3 rounded-sharp border cursor-pointer transition-colors ${
                      activePatchUid === patch.uid
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                    onClick={() => setActivePatchUid(patch.uid)}
                  >
                    <div className="w-9 h-9 bg-gray-100 rounded-sharp overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={patch.imageUrl} alt="" className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] tracking-widest text-gray-500">
                        Patch {i + 1} · {patch.isCustom ? "Custom" : "Library"}
                      </p>
                      <p className="font-mono text-[9px] text-gray-400">
                        {patch.position ? "Placed — click row to reposition" : "Drag to position →"}
                      </p>
                    </div>
                    {patch.position && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); adjustScale(patch.uid, false) }}
                          className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-sharp text-xs text-gray-500 hover:border-black hover:text-black transition-colors"
                        >−</button>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); adjustScale(patch.uid, true) }}
                          className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-sharp text-xs text-gray-500 hover:border-black hover:text-black transition-colors"
                        >+</button>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removePatch(patch.uid) }}
                      className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-black transition-colors ml-1"
                      aria-label="Remove patch"
                    >
                      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3">
                        <path d="M1 1l10 10M11 1L1 11" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div className="border-t border-gray-100" />

          {/* 03 — Summary ────────────────────────────────── */}
          <section className="flex flex-col gap-5">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400">
              03 / Summary
            </p>

            {patches.length === 0 ? (
              <p className="text-sm text-gray-400 leading-relaxed">
                Select patches above, then drag each onto the garment preview to position.
              </p>
            ) : !canOrder ? (
              <p className="text-sm text-gray-400 leading-relaxed">
                Position all patches on the garment preview to continue.
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-t border-gray-100">
                      <td className="py-3 text-gray-500">Service</td>
                      <td className="py-3 text-right font-mono text-black">Patch &amp; Repair</td>
                    </tr>
                    {libraryCount > 0 && (
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-500">Library patches</td>
                        <td className="py-3 text-right font-mono text-black">
                          {libraryCount} × {formatPrice(50000)}
                        </td>
                      </tr>
                    )}
                    {customCount > 0 && (
                      <tr className="border-t border-gray-100">
                        <td className="py-3 text-gray-500">Custom patches</td>
                        <td className="py-3 text-right font-mono text-black">
                          {customCount} × {formatPrice(70000)}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t border-gray-200">
                      <td className="py-3 font-medium text-black">Total</td>
                      <td className="py-3 text-right font-mono font-medium text-black">
                        {formatPrice(totalPrice)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <button
                  type="button"
                  onClick={handleOrder}
                  className="w-full h-12 bg-black text-white text-sm rounded-sharp hover:bg-gray-800 transition-colors"
                >
                  Order — {formatToIDR(totalPrice)}
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  )
}
