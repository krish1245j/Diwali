import { motion } from 'framer-motion'
const ring = (n: number, rot = 0) => Array.from({ length: n }, (_, i) => (i * 360) / n + rot)
const C = { multi: ['#FF6B00', '#C2185B', '#FFD700', '#E34220', '#9b3fd1'], gold: ['#FFD700', '#FF9933', '#FFD700', '#FFB000', '#FF9933'] }
export default function Rangoli({ variant = 'multi', className = '', delay = 1.2 }: { variant?: 'multi' | 'gold'; className?: string; delay?: number }) {
  const c = C[variant]
  return (
    <div className={`pointer-events-none ${className}`}>
      <motion.div className="h-full w-full" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 3, delay, ease: 'easeOut' }}>
        <svg viewBox="-100 -100 200 200" className="h-full w-full animate-[spin_240s_linear_infinite]" fill="none" strokeWidth=".3" strokeOpacity=".5">
          {ring(16).map(a => <path key={'a' + a} stroke={c[0]} transform={`rotate(${a})`} d="M0 -92 C10 -80 10 -68 0 -58 C-10 -68 -10 -80 0 -92Z" />)}
          {ring(16, 11.25).map(a => <path key={'b' + a} stroke={c[1]} transform={`rotate(${a})`} d="M0 -55 C7 -47 7 -40 0 -33 C-7 -40 -7 -47 0 -55Z" />)}
          {ring(32).map(a => <circle key={'c' + a} fill={c[2]} fillOpacity=".6" stroke="none" transform={`rotate(${a})`} cy="-97" r="1.1" />)}
          {ring(8).map(a => <path key={'d' + a} stroke={c[3]} transform={`rotate(${a})`} d="M0 -30 L6 -20 L0 -10 L-6 -20Z" />)}
          {ring(24, 7).map(a => <circle key={'e' + a} fill={c[4]} fillOpacity=".5" stroke="none" transform={`rotate(${a})`} cy="-64" r=".9" />)}
          <circle r="97" stroke={c[2]} /><circle r="58" stroke={c[0]} /><circle r="30" stroke={c[1]} />
        </svg>
      </motion.div>
    </div>
  )
}
