'use client'

import { useState } from 'react'
import Gallery from './Gallery'
import Info from './Info'

// Gallery-ն ու Info-ն կիսում են ընտրված համը. համ ընտրելիս gallery-ի
// առաջին նկարը դառնում ա այդ համի տուփի նկարը (Figma-ի պես)
export default function ProductDetails({ product, tags, labels }) {
  const variants = product.variants ?? []
  // Figma-ում default ընտրված ա 2-րդ համը (եթե մեկից ավել կա)
  const [selectedIndex, setSelectedIndex] = useState(variants.length > 1 ? 1 : 0)
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
