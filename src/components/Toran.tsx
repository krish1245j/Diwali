// Hanging marigold toran with brass bells; strings are longest at the centre to form a swag.
export default function Toran() {
  const n = 7
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex justify-between px-1 sm:px-6">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="sway flex flex-col items-center" style={{ animationDuration: 4 + (i % 3) + 's', animationDelay: i * -0.6 + 's' }}>
          <div className="w-px bg-amber-500/50" style={{ height: 12 + Math.sin((Math.PI * i) / (n - 1)) * 44 }} />
          {['#FFD700', '#FF9933', '#E34220', '#FF9933'].map((c, k) => (
            <div key={k} className="-mt-0.5 h-3 w-3 rounded-full sm:h-4 sm:w-4" style={{ background: `radial-gradient(circle at 35% 35%, #fff3c4, ${c} 55%, #8B0000)`, boxShadow: `0 0 10px ${c}66` }} />
          ))}
          <div className="mt-0.5 h-3 w-2.5 rounded-b-full bg-gradient-to-b from-amber-300 to-amber-700 shadow-[0_0_12px_#FFB000aa] sm:h-4 sm:w-3" />
        </div>
      ))}
    </div>
  )
}
