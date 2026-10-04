'use client'

import { useState } from 'react'
import Gallery from './Gallery'
import Info from './Info'

export default function ProductDetails({ product, tags, labels }) {
  const variants = product.variants ?? []
  const defaultIndex = Math.max(0, variants.findIndex((v) => v.id === product.default_variant))
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const boxImage = variants[selectedIndex]?.box_image
  const images = product.images ?? []
  const galleryImages = boxImage ? [boxImage, ...images.slice(1)] : images

  return (
    <>
      <Gallery key={selectedIndex} images={galleryImages} name={product.name} labels={labels} />
      <Info
        product={product}
        tags={tags}
        labels={labels}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
    </>
  )
}
