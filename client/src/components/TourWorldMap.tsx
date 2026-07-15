import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { geoEquirectangular, geoPath } from 'd3-geo'
import { feature, mesh } from 'topojson-client'

// ── Projection ────────────────────────────────────────────────────────────────
const VW = 960
const VH = 500

const projection = geoEquirectangular().scale(153).translate([480, 250])
const pathGen = geoPath().projection(projection)

function toXY(lat: number, lon: number): { x: number; y: number } {
  const p = projection([lon, lat])!
  return { x: p[0], y: p[1] }
}

// ── Destinations ──────────────────────────────────────────────────────────────
interface Destination {
  id: string; name: string; subLabel: string
  lat: number; lon: number; flag: string
  status: 'home' | 'completed' | 'upcoming'; year: string
}

const DESTINATIONS: Destination[] = [
  { id: 'melbourne', name: 'Melbourne', subLabel: 'Home Base · T&H Cricket', lat: -37.8, lon: 144.9, flag: '🏏', status: 'home', year: '' },
  { id: 'sale',      name: 'Sale',      subLabel: 'Sale, Regional Victoria',  lat: -38.6, lon: 147.1, flag: '🇦🇺', status: 'completed', year: 'Annual' },
  { id: 'mackay',    name: 'Mackay',    subLabel: 'Mackay, Queensland',       lat: -21.1, lon: 149.2, flag: '🇦🇺', status: 'completed', year: '2023' },
  { id: 'london',    name: 'England',   subLabel: 'London, England',          lat: 51.5,  lon: -0.1,  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', status: 'completed', year: '2025' },
  { id: 'auckland',  name: 'New Zealand', subLabel: 'Auckland, New Zealand',  lat: -36.9, lon: 174.8, flag: '🇳🇿', status: 'completed', year: '2020' },
  { id: 'srilanka',  name: 'Sri Lanka', subLabel: 'Sri Lanka',                lat: 7.9,   lon: 80.7,  flag: '🇱🇰', status: 'upcoming', year: 'Upcoming' },
]

const HOME_XY = toXY(DESTINATIONS[0].lat, DESTINATIONS[0].lon)

// ── Compute initial view to show all destinations ─────────────────────────────
const INITIAL_VIEW = (() => {
  const pts = DESTINATIONS.map(d => toXY(d.lat, d.lon))
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y)
  const PX = 70, PY = 90
  const xMin = Math.min(...xs) - PX, xMax = Math.max(...xs) + PX
  const yMin = Math.min(...ys) - PY, yMax = Math.max(...ys) + PY
  const z = Math.min(VW / (xMax - xMin), VH / (yMax - yMin))
  const cx = (xMin + xMax) / 2, cy = (yMin + yMax) / 2
  return { zoom: z, panX: VW / 2 - z * cx, panY: VH / 2 - z * cy }
})()

const MIN_ZOOM = INITIAL_VIEW.zoom
const MAX_ZOOM = 10

// ── Helpers ───────────────────────────────────────────────────────────────────
function flightPath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2, my = (from.y + to.y) / 2
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  return `M ${from.x},${from.y} Q ${mx},${my - Math.min(dist * 0.35, 140)} ${to.x},${to.y}`
}

const PIN_COLOR: Record<Destination['status'], string> = {
  home: '#f5c842', completed: '#4ade80', upcoming: '#60a5fa',
}
const PIN_LABEL: Record<Destination['status'], string> = {
  home: 'Home', completed: 'Completed', upcoming: 'Upcoming',
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TourWorldMap() {
  const [active, setActive] = useState<string | null>(null)
  const [countryPaths, setCountryPaths] = useState<string[]>([])
  const [borderPath, setBorderPath] = useState<string>('')
  const [loaded, setLoaded] = useState(false)
  const pathRefs = useRef<Record<string, SVGPathElement | null>>({})
  const [pathLengths, setPathLengths] = useState<Record<string, number>>({})

  // View state — ref for synchronous wheel handler, state for rendering
  const viewRef = useRef(INITIAL_VIEW)
  const [view, setView] = useState(INITIAL_VIEW)
  const svgRef = useRef<SVGSVGElement>(null)

  // Drag tracking
  const drag = useRef({ on: false, startX: 0, startY: 0, px: 0, py: 0, dist: 0 })

  // ── Pan clamp: keep map overlapping viewport ──────────────────────────────
  function clamp(zoom: number, panX: number, panY: number) {
    const PAD = 80
    return {
      panX: Math.min(VW - PAD, Math.max(-zoom * VW + PAD, panX)),
      panY: Math.min(VH - PAD, Math.max(-zoom * VH + PAD, panY)),
    }
  }

  function commit(zoom: number, panX: number, panY: number) {
    const z = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))
    // At min zoom always restore to initial view so destinations stay centred
    if (z <= MIN_ZOOM) {
      viewRef.current = INITIAL_VIEW
      setView(INITIAL_VIEW)
      return
    }
    const { panX: cx, panY: cy } = clamp(z, panX, panY)
    const next = { zoom: z, panX: cx, panY: cy }
    viewRef.current = next
    setView(next)
  }

  // ── Desktop: wheel zoom (passive:false to call preventDefault) ──────────
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const rect = svg.getBoundingClientRect()
      const cx = (e.clientX - rect.left) / rect.width * VW
      const cy = (e.clientY - rect.top) / rect.height * VH
      const { zoom, panX, panY } = viewRef.current
      const factor = Math.exp(-e.deltaY * 0.001)
      const newZoom = zoom * factor
      const r = newZoom / zoom
      commit(newZoom, cx - r * (cx - panX), cy - r * (cy - panY))
    }
    svg.addEventListener('wheel', handler, { passive: false })
    return () => svg.removeEventListener('wheel', handler)
  }, [])

  // ── Mobile: 2-finger pinch-to-zoom + pan; 1-finger passes through to page scroll ──
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    let lastDist = 0
    let lastMidX = 0
    let lastMidY = 0

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length < 2) return   // 1 finger → let the page scroll
      e.preventDefault()
      const rect = svg.getBoundingClientRect()
      const t1 = e.touches[0], t2 = e.touches[1]
      lastDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      lastMidX = ((t1.clientX + t2.clientX) / 2 - rect.left) / rect.width * VW
      lastMidY = ((t1.clientY + t2.clientY) / 2 - rect.top) / rect.height * VH
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length < 2) return   // 1 finger → let the page scroll
      // No e.preventDefault() here — touchstart already blocks scroll for 2-finger sequences
      const rect = svg.getBoundingClientRect()
      const t1 = e.touches[0], t2 = e.touches[1]
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY)
      const midX = ((t1.clientX + t2.clientX) / 2 - rect.left) / rect.width * VW
      const midY = ((t1.clientY + t2.clientY) / 2 - rect.top) / rect.height * VH

      if (lastDist === 0) { lastDist = dist; lastMidX = midX; lastMidY = midY; return }

      const { zoom, panX, panY } = viewRef.current
      const factor = dist / lastDist
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom * factor))
      const r = newZoom / zoom

      commit(
        newZoom,
        midX - r * (midX - panX) + (midX - lastMidX),
        midY - r * (midY - panY) + (midY - lastMidY),
      )

      lastDist = dist
      lastMidX = midX
      lastMidY = midY
    }

    const onTouchEnd = () => { lastDist = 0 }

    svg.addEventListener('touchstart', onTouchStart, { passive: false }) // must be non-passive to call preventDefault for 2-finger
    svg.addEventListener('touchmove',  onTouchMove,  { passive: true  }) // passive so 1-finger never blocks page scroll
    svg.addEventListener('touchend',   onTouchEnd,   { passive: true  })
    return () => {
      svg.removeEventListener('touchstart', onTouchStart)
      svg.removeEventListener('touchmove',  onTouchMove)
      svg.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  // ── Zoom buttons ─────────────────────────────────────────────────────────
  function zoomBy(factor: number) {
    const { zoom, panX, panY } = viewRef.current
    const cx = VW / 2, cy = VH / 2
    const r = factor
    commit(zoom * r, cx - r * (cx - panX), cy - r * (cy - panY))
  }

  // ── Drag / pan (mouse only — touch is handled by the touch useEffect) ────
  function onDown(e: React.PointerEvent) {
    if (e.pointerType === 'touch') return   // let touch events handle it; don't start drag on finger
    if (e.button !== 0) return
    drag.current = { on: true, startX: e.clientX, startY: e.clientY, px: viewRef.current.panX, py: viewRef.current.panY, dist: 0 }
  }

  function onMove(e: React.PointerEvent) {
    if (e.pointerType === 'touch') return   // let touch events handle it
    if (!drag.current.on) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    drag.current.dist = Math.hypot(dx, dy)
    const { zoom } = viewRef.current
    commit(zoom, drag.current.px + dx / rect.width * VW, drag.current.py + dy / rect.height * VH)
  }

  function onUp(e: React.PointerEvent) {
    if (e.pointerType === 'touch') return
    drag.current.on = false
  }

  // ── Load world atlas ──────────────────────────────────────────────────────
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((world: any) => {
        const countries = feature(world, world.objects.countries) as unknown as GeoJSON.FeatureCollection
        setCountryPaths(countries.features.map(f => pathGen(f) ?? ''))
        setBorderPath(pathGen(mesh(world, world.objects.countries, (a, b) => a !== b)) ?? '')
        setLoaded(true)
      }).catch(console.error)
  }, [])

  useEffect(() => {
    if (!loaded) return
    const lens: Record<string, number> = {}
    Object.entries(pathRefs.current).forEach(([id, el]) => { if (el) lens[id] = el.getTotalLength() })
    setPathLengths(lens)
  }, [loaded])

  const { zoom, panX, panY } = view

  return (
    <Box sx={{ position: 'relative', width: '100%', mb: { xs: 6, md: 8 } }}>
      {/* Section label */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <Box sx={{ height: 2, width: 24, bgcolor: '#f5c842', borderRadius: 1, boxShadow: '0 0 8px rgba(245,200,66,0.6)' }} />
        <Typography sx={{ color: '#f5c842', fontWeight: 800, fontSize: '0.63rem', letterSpacing: '0.22em' }}>
          WHERE WE'VE TRAVELLED
        </Typography>
      </Box>

      {/* Map container */}
      <Box sx={{
        position: 'relative',
        height: { xs: 280, sm: 360, md: 480 },
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#030d1f',
        boxShadow: '0 0 0 1px rgba(245,200,66,0.06), 0 16px 48px rgba(0,0,0,0.5)',
      }}>
        {/* Zoom buttons */}
        <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {[{ icon: <AddIcon sx={{ fontSize: 15 }} />, f: 1.6 }, { icon: <RemoveIcon sx={{ fontSize: 15 }} />, f: 1 / 1.6 }].map(({ icon, f }, i) => (
            <IconButton key={i} size="small" onClick={() => zoomBy(f)}
              sx={{ bgcolor: 'rgba(3,8,25,0.85)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(245,200,66,0.12)', borderColor: 'rgba(245,200,66,0.3)', color: '#f5c842' } }}>
              {icon}
            </IconButton>
          ))}
        </Box>

        <svg
          ref={svgRef}
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: drag.current.on ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
        >
          {/* Ocean */}
          <rect width={VW} height={VH} fill="#030d1f" />

          {/* ── Zoomable layer — geographic content + pins (counter-scaled) ── */}
          <g transform={`translate(${panX} ${panY}) scale(${zoom})`}>

            {/* Grid */}
            {[-60, -30, 0, 30, 60].map(lat => {
              const y = toXY(lat, 0).y
              return <line key={lat} x1={0} y1={y} x2={VW} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={lat === 0 ? 0.8 : 0.5} />
            })}
            {[-120, -60, 0, 60, 120].map(lon => {
              const x = toXY(0, lon).x
              return <line key={lon} x1={x} y1={0} x2={x} y2={VH} stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
            })}

            {/* Country fills */}
            {countryPaths.map((d, i) => <path key={i} d={d} fill="rgba(28,58,120,0.65)" />)}

            {/* Country borders */}
            {borderPath && <path d={borderPath} fill="none" stroke="rgba(70,120,220,0.35)" strokeWidth={0.5} />}

            {/* Coastline glow */}
            {countryPaths.map((d, i) => <path key={`g${i}`} d={d} fill="none" stroke="rgba(80,140,255,0.18)" strokeWidth={1.2} />)}

            {/* Flight paths */}
            {DESTINATIONS.filter(d => d.id !== 'melbourne').map(dest => {
              const dXY = toXY(dest.lat, dest.lon)
              const dp = flightPath(HOME_XY, dXY)
              const len = pathLengths[dest.id] ?? 600
              const isActive = active === dest.id
              const color = PIN_COLOR[dest.status]
              return (
                <g key={`fp-${dest.id}`}>
                  <path d={dp} fill="none" stroke={color} strokeWidth={isActive ? 2.5 : 1} strokeOpacity={isActive ? 0.35 : 0.12} strokeDasharray={`${len}`} style={{ filter: isActive ? `drop-shadow(0 0 4px ${color})` : 'none' }} />
                  <path
                    ref={el => { pathRefs.current[dest.id] = el }}
                    d={dp} fill="none" stroke={color}
                    strokeWidth={isActive ? 1.5 : 0.9} strokeOpacity={isActive ? 0.9 : 0.45}
                    strokeDasharray="6 5" strokeLinecap="round"
                  >
                    <animate attributeName="stroke-dashoffset" from="110" to="0" dur={`${2 + Math.random() * 1.5}s`} repeatCount="indefinite" />
                  </path>
                </g>
              )
            })}

            {/* ── Pins — inside zoom group but counter-scaled so visual size is constant ── */}
            {DESTINATIONS.map(dest => {
              const { x, y } = toXY(dest.lat, dest.lon)
              // Cull pins outside viewport
              const sx = panX + zoom * x, sy = panY + zoom * y
              if (sx < -40 || sx > VW + 40 || sy < -40 || sy > VH + 40) return null

              const isHome = dest.id === 'melbourne'
              const isSale = dest.id === 'sale'
              const isActive = active === dest.id
              const color = PIN_COLOR[dest.status]
              const r = isHome ? 5 : 4
              // Tooltip anchor based on screen x
              const anchor = sx > VW * 0.62 ? 'left' : 'right'
              const tw = 165, th = 78, pad = 12
              const tx = anchor === 'right' ? r + pad : -(r + pad + tw)
              const ty = -th / 2

              return (
                // Translate to geo position, then counter-scale so children are in screen pixels
                <g key={dest.id} transform={`translate(${x} ${y}) scale(${1 / zoom})`}>
                  {/* Pulse ring — pointer-events: none so it doesn't expand the hit area */}
                  <circle r={r + 4} fill="none" stroke={color} strokeWidth={1} style={{ pointerEvents: 'none' }}>
                    {!isActive && <animate attributeName="r" values={`${r + 4};${r + 13};${r + 4}`} dur="2.8s" repeatCount="indefinite" />}
                    {!isActive && <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="2.8s" repeatCount="indefinite" />}
                  </circle>

                  {/* Glow ring — pointer-events: none */}
                  <circle r={isActive ? r + 9 : r + 5} fill="none" stroke={color} strokeWidth={1.2}
                    strokeOpacity={isActive ? 0.5 : 0.25}
                    style={{ pointerEvents: 'none', transition: 'all 0.2s ease', filter: `drop-shadow(0 0 3px ${color})` }} />

                  {/* ── Center dot — ONLY element with hover/click events ── */}
                  <circle
                    r={isActive ? r + 2 : r}
                    fill={color}
                    style={{ cursor: 'pointer', transition: 'r 0.2s ease', filter: `drop-shadow(0 0 ${isActive ? 8 : 4}px ${color})` }}
                    onMouseEnter={() => setActive(dest.id)}
                    onMouseLeave={() => setActive(null)}
                    onClick={e => { e.stopPropagation(); if (drag.current.dist < 5) setActive(p => p === dest.id ? null : dest.id) }}
                  />

                  {/* Home inner ring */}
                  {isHome && <circle r={3} fill="#030d1f" style={{ pointerEvents: 'none' }} />}

                  {/* Label — Sale offset to not overlap Melbourne */}
                  {!isActive && (
                    <text
                      x={isSale ? r + 10 : 0}
                      y={isSale ? r + 12 : -(r + 8)}
                      textAnchor={isSale ? 'start' : 'middle'}
                      fill={color} fontSize="8" fontWeight="700"
                      fontFamily="system-ui, sans-serif" opacity={0.8}
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {dest.flag} {dest.name}
                    </text>
                  )}

                  {/* Tooltip — shown when active, positioned at screen-pixel offsets */}
                  {isActive && (
                    <g style={{ pointerEvents: 'none' }}>
                      <line
                        x1={0} y1={0}
                        x2={anchor === 'right' ? tx : tx + tw} y2={ty + th / 2}
                        stroke={color} strokeWidth={0.8} strokeOpacity={0.4} strokeDasharray="3 2"
                      />
                      <foreignObject x={tx} y={ty} width={tw} height={th + 20}>
                        <div style={{
                          background: 'rgba(3,8,25,0.92)', border: `1px solid ${color}44`,
                          borderRadius: '10px', padding: '9px 11px',
                          backdropFilter: 'blur(14px)',
                          boxShadow: `0 0 20px ${color}22, 0 8px 24px rgba(0,0,0,0.7)`,
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px' }}>{dest.flag}</span>
                            <span style={{ color: '#fff', fontWeight: 700, fontSize: '11px' }}>{dest.name}</span>
                          </div>
                          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '9.5px', marginBottom: '5px' }}>{dest.subLabel}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 6px ${color}` }} />
                            <span style={{ color, fontSize: '9px', fontWeight: 700, letterSpacing: '0.08em' }}>
                              {PIN_LABEL[dest.status].toUpperCase()}{dest.year ? ` · ${dest.year}` : ''}
                            </span>
                          </div>
                        </div>
                      </foreignObject>
                    </g>
                  )}
                </g>
              )
            })}
          </g>

          {!loaded && (
            <text x={VW / 2} y={VH / 2} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="13" fontFamily="system-ui, sans-serif">
              Loading map…
            </text>
          )}
        </svg>

        {/* Legend */}
        <Box sx={{ position: 'absolute', bottom: { xs: 10, md: 14 }, left: { xs: 10, md: 16 }, display: 'flex', gap: { xs: 1.5, md: 2 }, flexWrap: 'wrap', zIndex: 5, pointerEvents: 'none' }}>
          {([{ color: '#f5c842', label: 'Home' }, { color: '#4ade80', label: 'Completed' }, { color: '#60a5fa', label: 'Upcoming' }] as const).map(({ color, label }) => (
            <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color, boxShadow: `0 0 6px ${color}` }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em' }}>{label}</Typography>
            </Box>
          ))}
        </Box>

        {/* Hint */}
        <Box sx={{ position: 'absolute', bottom: { xs: 10, md: 14 }, right: 60, zIndex: 5, pointerEvents: 'none' }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', fontStyle: 'italic' }}>
            Scroll · drag · hover pins
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
