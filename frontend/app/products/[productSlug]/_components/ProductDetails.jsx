'use client'

import { useState } from 'react'
import Gallery from './Gallery'
import Info from './Info'

// Gallery-ն ու Info-ն կիսում են ընտրված համը. համ ընտրելիս gallery-ի
// առաջին նկարը դառնում ա այդ համի տուփի նկարը (Figma-ի պես)
export default function ProductDetails({ product, tags, labels }) {
  const variants = product.variants ?? []
  // Սկզբում ընտրված ա db-ի default_variant-ը (օր. "v2"), եթե չկա՝ առաջին համը
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
