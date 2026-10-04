'use client'

import { useEffect, useRef } from 'react'

const DURATION = 1600

export default function CountUp({ value, className }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const target = Number(value)
    if (!el || !Number.isFinite(target)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el.style.minWidth = `${el.offsetWidth}px`
    el.textContent = '0'

    let frame
    const start = () => {
      const startTime = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - startTime) / DURATION, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        el.textContent = String(Math.round(target * eased))
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect()
          start()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = String(value)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
