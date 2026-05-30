import Image from 'next/image'
import { useState, useRef } from 'react'
import { PatchOption } from '@/types/configurator'
import { formatPrice } from '@/config/pants-config'

const PATCH_OPTIONS: PatchOption[] = [
  { id: 'dinosaur', image: '/patches/dinosaur.jpg', price: 50000 },
  { id: 'clover', image: '/patches/clover.jpg', price: 50000 },
  { id: 'star', image: '/patches/star.jpg', price: 50000 },
  { id: 'sparkles', image: '/patches/sparkles.jpg', price: 50000 },
  { id: 'turtle', image: '/patches/turtle.jpg', price: 50000 },
  { id: 'sun', image: '/patches/sun.jpg', price: 50000 },
  { id: 'stars', image: '/patches/stars.jpg', price: 50000 },
  { id: 'lips', image: '/patches/lips.jpg', price: 50000 },
]

interface PatchSelectorProps {
  selectedPatch: string | null;
  onSelectPatch: (patch: string | null) => void;
  onUploadPatch: (file: File) => void;
}

export function PatchSelector({ selectedPatch, onSelectPatch, onUploadPatch }: PatchSelectorProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          setUploadedImage(result)
          onUploadPatch(file)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Patch</h3>
      <div className="grid grid-cols-4 gap-4">
        {PATCH_OPTIONS.map((patch) => (
          <button
            key={patch.id}
            onClick={() => onSelectPatch(patch.id)}
            className={`p-2 border rounded-lg transition-all ${
              selectedPatch === patch.id
                ? 'border-burgundy-600 bg-burgundy-50'
                : 'border-gray-200 hover:border-burgundy-300'
            }`}
          >
            <div className="aspect-square relative">
              <Image
                src={patch.image}
                alt={patch.id}
                fill
                className="object-contain"
              />
            </div>
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-600">{formatPrice(50000)}/Patch</p>
      <div className="mt-4">
        <h4 className="text-lg font-medium mb-2">Upload Yourself</h4>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-burgundy-300 transition-colors"
        >
          {uploadedImage ? (
            <div className="aspect-square relative">
              <Image
                src={uploadedImage}
                alt="Uploaded patch"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="text-gray-500">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="mt-1">Insert Image</p>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <p className="text-sm text-gray-600 mt-2">{formatPrice(70000)}/Patch</p>
      </div>
    </div>
  )
}

