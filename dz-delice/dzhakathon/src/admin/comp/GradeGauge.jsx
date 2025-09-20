import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * GradeGauge
 * A compact, production-ready SVG gauge with animated needle and tick marks.
 *
 * Props
 *  - value: number (0-100) – where the needle points
 *  - label: string – caption under the gauge
 *  - size: number – pixel width/height of the square SVG viewport (default 140)
 *  - sweep: number – degrees covered by the gauge arc (default 220)
 *  - startAngle: number – starting angle in degrees (default -200, clockwise)
 *  - segments: Array<{ pct: number; color: string }> – colored arc segments that should sum to 100
 *  - tickCount: number – how many minor tick marks (default 28)
 *  - needleColor: string – CSS color for the needle (default "#f97316")
 *  - trackColor: string – fallback/unused arc color (default "#eee4da")
 *
 * Tailwind is used for quick layout/typography; colors can be any valid CSS color.
 */
export type GaugeSegment = { pct: number; color: string };

export type GradeGaugeProps = {
  value?: number;
  label?: string;
  size?: number;
  sweep?: number;
  startAngle?: number;
  segments?: GaugeSegment[];
  tickCount?: number;
  needleColor?: string;
  trackColor?: string;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx: number, cy: number, r: number, start: number, end: number) {
  const s = polarToCartesian(cx, cy, r, end);
  const e = polarToCartesian(cx, cy, r, start);
  const largeArc = Math.abs(end - start) <= 180 ? 0 : 1;
  const sweep = end > start ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${e.x} ${e.y}`;
}

export default function GradeGauge({
  value = 72,
  label = "Your Grade:",
  size = 140,
  sweep = 220,
  startAngle = -200,
  segments = [
    { pct: 80, color: "#f97316" }, // orange
    { pct: 20, color: "#efe7de" }, // light neutral tail
  ],
  tickCount = 28,
  needleColor = "#f97316",
  trackColor = "#efe7de",
}: GradeGaugeProps) {
  // Geometry
  const w = size;
  const h = size * 0.82; // compact height like the reference
  const cx = w / 2;
  const cy = h * 0.85; // push the center down so arc is top-heavy
  const radiusOuter = Math.min(cx, cy) * 0.92;
  const radiusInner = radiusOuter - Math.max(6, size * 0.08);
  const radiusTicks = radiusOuter + Math.max(2, size * 0.02);

  // Angles
  const endAngle = startAngle + sweep;
  const v = clamp(value, 0, 100);
  const valueAngle = startAngle + (sweep * v) / 100;

  // Build segment arcs (outer ring style)
  const segs = segments && segments.length ? segments : [{ pct: 100, color: trackColor }];
  let cursor = startAngle;
  const segPaths = segs.map((s, i) => {
    const span = (s.pct / 100) * sweep;
    const a0 = cursor;
    const a1 = cursor + span;
    cursor = a1;
    return (
      <path
        key={`seg-${i}`}
        d={arcPath(cx, cy, (radiusOuter + radiusInner) / 2, a0, a1)}
        stroke={s.color}
        strokeWidth={radiusOuter - radiusInner}
        fill="none"
        strokeLinecap="round"
      />
    );
  });

  // Tick marks
  const ticks: JSX.Element[] = [];
  for (let i = 0; i <= tickCount; i++) {
    const a = startAngle + (sweep * i) / tickCount;
    const p1 = polarToCartesian(cx, cy, radiusTicks, a);
    const p2 = polarToCartesian(cx, cy, radiusTicks - Math.max(4, size * 0.04), a);
    ticks.push(
      <line
        key={`tick-${i}`}
        x1={p1.x}
        y1={p1.y}
        x2={p2.x}
        y2={p2.y}
        stroke="#ffffff"
        strokeOpacity={0.9}
        strokeWidth={1.5}
      />
    );
  }

  // Needle pieces
  const needleLength = radiusOuter * 0.7;
  const hubRadius = Math.max(5, size * 0.06);

  return (
    <div className="inline-flex flex-col items-center select-none">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={`Gauge showing ${v}%`}>
        {/* base ring (for gaps between segments) */}
        <path
          d={arcPath(cx, cy, (radiusOuter + radiusInner) / 2, startAngle, endAngle)}
          stroke={trackColor}
          strokeWidth={radiusOuter - radiusInner}
          fill="none"
          strokeLinecap="round"
          opacity={0.25}
        />

        {/* colored segments */}
        {segPaths}

        {/* ticks overlay */}
        {ticks}

        {/* needle (animated rotation) */}
        <g transform={`translate(${cx}, ${cy})`}>
          <AnimatePresence>
            <motion.g
              key={Math.round(v)}
              initial={{ rotate: startAngle }}
              animate={{ rotate: valueAngle }}
              transition={{ type: "spring", stiffness: 140, damping: 16 }}
              style={{ transformOrigin: "0 0" }}
            >
              {/* needle shaft */}
              <line x1={0} y1={0} x2={needleLength} y2={0} stroke={needleColor} strokeWidth={4} strokeLinecap="round" />
              {/* needle tip */}
              <circle cx={needleLength} cy={0} r={3} fill={needleColor} />
            </motion.g>
          </AnimatePresence>
          {/* hub */}
          <circle cx={0} cy={0} r={hubRadius} fill="#000" opacity={0.85} />
          <circle cx={0} cy={0} r={hubRadius * 0.55} fill="#fff" />
        </g>
      </svg>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

// --- Demo (safe to remove) -------------------------------------------------
export function Demo() {
  const [val, setVal] = React.useState(72);
  return (
    <div className="p-4 flex flex-col items-center gap-4">
      <GradeGauge value={val} />
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-64"
      />
    </div>
  );
}
