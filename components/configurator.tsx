'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ConfigState, ConfigMapping } from '@/types/configurator'

const configMapping: ConfigMapping = {
  'aaa': { src: '/config/image1.jpg', alt: 'Configuration 1' },
  'aab': { src: '/config/image2.jpg', alt: 'Configuration 2' },
  'aba': { src: '/config/image3.jpg', alt: 'Configuration 3' },
  'abb': { src: '/config/image4.jpg', alt: 'Configuration 4' },
  'baa': { src: '/config/image5.jpg', alt: 'Configuration 5' },
  'bab': { src: '/config/image6.jpg', alt: 'Configuration 6' },
  'bba': { src: '/config/image7.jpg', alt: 'Configuration 7' },
  'bbb': { src: '/config/image8.jpg', alt: 'Configuration 8' },
}

export function Configurator() {
  const [config, setConfig] = useState<ConfigState>({
    variable1: 'a',
    variable2: 'a',
    variable3: 'a',
  })

  const toggleVariable = (variable: keyof ConfigState) => {
    setConfig(prev => ({
      ...prev,
      [variable]: prev[variable] === 'a' ? 'b' : 'a'
    }))
  }

  const getConfigKey = (): string => {
    return `${config.variable1}${config.variable2}${config.variable3}`
  }

  const currentImage = configMapping[getConfigKey()]

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {/* Image Display */}
        <div className="relative aspect-[4/3] mb-8">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* Configuration Controls */}
        <div className="space-y-4">
          {/* Variable 1 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Variable 1</span>
            <div className="flex items-center gap-4">
              <span className="w-8 text-center">{config.variable1.toUpperCase()}</span>
              <button
                onClick={() => toggleVariable('variable1')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                {config.variable1 === 'a' ? (
                  <ChevronRight className="w-6 h-6" />
                ) : (
                  <ChevronLeft className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Variable 2 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Variable 2</span>
            <div className="flex items-center gap-4">
              <span className="w-8 text-center">{config.variable2.toUpperCase()}</span>
              <button
                onClick={() => toggleVariable('variable2')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                {config.variable2 === 'a' ? (
                  <ChevronRight className="w-6 h-6" />
                ) : (
                  <ChevronLeft className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Variable 3 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium">Variable 3</span>
            <div className="flex items-center gap-4">
              <span className="w-8 text-center">{config.variable3.toUpperCase()}</span>
              <button
                onClick={() => toggleVariable('variable3')}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                {config.variable3 === 'a' ? (
                  <ChevronRight className="w-6 h-6" />
                ) : (
                  <ChevronLeft className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}