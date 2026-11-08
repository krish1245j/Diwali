import { CSSProperties, useMemo } from 'react'
const rand = (a: number, b: number) => a + Math.random() * (b - a)
const COL = ['#FF9933', '#E34220', '#FF6B00', '#C2185B']
// Pure CSS rise animation (compositor-driven) so many lanterns stay smooth on phones.
export default function Lanterns() {
  const items = useMemo(() => {
    const n = innerWidth < 640 ? 5 : 10
    return Array.from({ length: n }, (_, i) => ({ x: 4 + i * (95 / n) + rand(-3, 3), s: rand(22, 40), d: rand(26, 44), delay: rand(0, 16), sway: rand(-30, 30), c: COL[i % 4] }))
  }, [])
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {items.map((l, i) => (
        <div key={i} className="rise absolute bottom-0" style={{ left: `${l.x}%`, '--d': `${l.d}s`, '--dl': `${l.delay}s`, '--sw': `${l.sway}px` } as CSSProperties}>
          <div style={{ width: l.s, height: l.s * 1.3, borderRadius: '45% 45% 40% 40%', background: `radial-gradient(circle at 50% 70%, #fff0b0, ${l.c} 45%, #8B0000)`, boxShadow: `0 0 ${l.s / 2}px ${l.s / 6}px ${l.c}88` }} />
        </div>
      ))}
    </div>
  )
}
