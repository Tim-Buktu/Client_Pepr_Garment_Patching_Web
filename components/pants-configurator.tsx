'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  fabricOptions,
  volumeOptions,
  cutOptions,
  buttonOptions,
  type PantsConfig,
  formatPrice,
} from '@/config/pants-config'
import { navigateToCheckout, formatToIDR } from '@/lib/checkout'

// ── Helpers ────────────────────────────────────────────────

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25)   return 'Normal'
  if (bmi < 30)   return 'Overweight'
  return 'Obese'
}

// ── Segmented control (binary or multi-option) ─────────────

interface SegmentOption { value: string; label: string }

function SegmentedControl({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: SegmentOption[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="mb-8">
      <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-3">
        {label}
      </p>
      <div className="inline-flex border border-gray-200 rounded-sharp overflow-hidden">
        {options.map((opt, i) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              'px-5 py-2.5 text-sm transition-colors',
              i > 0 ? 'border-l border-gray-200' : '',
              value === opt.value
                ? 'bg-black text-white'
                : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50',
            ].join(' ')}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────

export function PantsConfigurator() {
  const router = useRouter()
  const [config, setConfig] = useState<PantsConfig>({
    fabric: 'linen',
    volume: 'wide',
    cut: 'middle',
    button: 'button',
  })

  const [measurements, setMeasurements] = useState({ height: '', weight: '' })

  // Live BMI — computed on every render, no useEffect needed
  const heightM  = parseFloat(measurements.height) / 100
  const weightKg = parseFloat(measurements.weight)
  const bmi =
    heightM > 0 && weightKg > 0
      ? parseFloat((weightKg / (heightM * heightM)).toFixed(1))
      : null

  const getConfigId = (key: keyof PantsConfig) => {
    const maps = { fabric: fabricOptions, volume: volumeOptions, cut: cutOptions, button: buttonOptions }
    return maps[key].find((o) => o.value === config[key])?.id ?? '1'
  }

  const imageSrc = `/pants-config/final/${getConfigId('fabric')}-${getConfigId('volume')}-${getConfigId('cut')}-${getConfigId('button')}.png`

  const currentFabric = fabricOptions.find((f) => f.value === config.fabric)
  const multiplier    = bmi && bmi > 28 ? 1.5 : 1.2
  const fabricCost    = currentFabric?.price ?? 0
  const totalCost     = Math.round(fabricCost * multiplier + 200000)

  const configSummary = [
    currentFabric?.label,
    volumeOptions.find((o) => o.value === config.volume)?.label,
    cutOptions.find((o) => o.value === config.cut)?.label,
    buttonOptions.find((o) => o.value === config.button)?.label,
  ].join(' · ')

  const set = (key: keyof PantsConfig) => (value: string) =>
    setConfig((prev) => ({ ...prev, [key]: value }))

  const handleBuyNow = async () => {
    try {
      await navigateToCheckout(router, {
        productName: `Custom Pants — ${configSummary}`,
        price: totalCost,
        quantity: 1,
        imageUrl: imageSrc,
      })
    } catch (err: unknown) {
      console.error('Checkout error:', err instanceof Error ? err.message : err)
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20">

        {/* ── Left: sticky preview ──────────────────────── */}
        <div className="hidden md:block">
          <div className="sticky top-24">
            <div className="bg-gray-50 relative aspect-[3/4] overflow-hidden">
              <Image
                src={imageSrc}
                alt="Pants preview"
                fill
                className="object-contain p-10"
                sizes="50vw"
                priority
              />
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mt-4 text-center">
              {configSummary}
            </p>
          </div>
        </div>

        {/* ── Right: scrollable controls ────────────────── */}
        <div>

          {/* Header */}
          <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-3">
            Configurator
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-black leading-tight mb-12">
            Customize your pants
          </h1>

          {/* Mobile preview */}
          <div className="md:hidden bg-gray-50 relative aspect-[3/4] overflow-hidden mb-10">
            <Image
              src={imageSrc}
              alt="Pants preview"
              fill
              className="object-contain p-6"
              sizes="100vw"
              priority
            />
          </div>
          <p className="md:hidden font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-10 text-center">
            {configSummary}
          </p>

          {/* ── Fabric ─────────────────────────────────── */}
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-4">
              Fabric
            </p>
            <div className="grid grid-cols-2 gap-3">
              {fabricOptions.map((fabric) => (
                <button
                  key={fabric.id}
                  onClick={() => set('fabric')(fabric.value)}
                  className={[
                    'text-left transition-all rounded-sharp overflow-hidden border-2',
                    config.fabric === fabric.value
                      ? 'border-black'
                      : 'border-transparent hover:border-gray-300',
                  ].join(' ')}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={fabric.image ?? ''}
                      alt={fabric.label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="px-3 py-2.5 bg-white">
                    <p className="text-sm font-medium text-black">{fabric.label}</p>
                    <p className="font-mono text-[11px] text-gray-400 mt-0.5">
                      {formatPrice(fabric.price ?? 0)}/m
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Style options ──────────────────────────── */}
          <SegmentedControl
            label="Volume"
            options={volumeOptions}
            value={config.volume}
            onChange={set('volume')}
          />
          <SegmentedControl
            label="Cut"
            options={cutOptions}
            value={config.cut}
            onChange={set('cut')}
          />
          <SegmentedControl
            label="Button"
            options={buttonOptions}
            value={config.button}
            onChange={set('button')}
          />

          {/* ── Measurements ───────────────────────────── */}
          <div className="mb-10">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-4">
              Measurements
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={measurements.height}
                  onChange={(e) =>
                    setMeasurements((p) => ({ ...p, height: e.target.value }))
                  }
                  placeholder="175"
                  className="w-full h-10 px-3 border border-gray-200 rounded-sharp text-sm text-black bg-white focus:outline-none focus:border-black transition-colors font-mono placeholder:text-gray-300"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={measurements.weight}
                  onChange={(e) =>
                    setMeasurements((p) => ({ ...p, weight: e.target.value }))
                  }
                  placeholder="70"
                  className="w-full h-10 px-3 border border-gray-200 rounded-sharp text-sm text-black bg-white focus:outline-none focus:border-black transition-colors font-mono placeholder:text-gray-300"
                />
              </div>
            </div>

            {bmi !== null && (
              <div className="flex items-baseline gap-3 mt-4 pt-4 border-t border-gray-100">
                <span className="font-mono text-sm font-medium text-black">{bmi}</span>
                <span className="text-xs text-gray-500">{getBMICategory(bmi)}</span>
                <span className="font-mono text-xs text-gray-400">
                  {bmi > 28 ? '1.5× fabric needed' : '1.2× fabric needed'}
                </span>
              </div>
            )}
          </div>

          {/* ── Cost breakdown ─────────────────────────── */}
          <div className="mb-10 pt-8 border-t border-gray-200">
            <p className="font-mono text-[10px] tracking-widest uppercase text-gray-400 mb-5">
              Cost breakdown
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Base cost</span>
                <span className="font-mono text-gray-700">{formatPrice(200000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Fabric
                  {currentFabric ? (
                    <span className="font-mono text-gray-400 ml-2 text-xs">
                      {currentFabric.label}
                    </span>
                  ) : null}
                </span>
                <span className="font-mono text-gray-700">
                  {formatPrice(fabricCost)}/m
                </span>
              </div>
              {bmi !== null && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fabric multiplier</span>
                  <span className="font-mono text-gray-700">{multiplier}×</span>
                </div>
              )}
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200 flex justify-between items-baseline">
              <span className="text-sm font-medium text-black">Estimated total</span>
              <span className="font-mono text-base font-semibold text-black">
                {formatPrice(totalCost)}
              </span>
            </div>
          </div>

          {/* ── CTA ────────────────────────────────────── */}
          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full h-12 bg-black text-white text-sm font-medium rounded-sharp hover:bg-gray-800 transition-colors font-mono tracking-wide"
          >
            Buy now — {formatToIDR(totalCost)}
          </button>

        </div>
      </div>
    </div>
  )
}
