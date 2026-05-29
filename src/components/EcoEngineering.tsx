"use client";

import { useState } from "react";
import { ECO_PROJECTS, EcoProject } from "./content";
import { T, useLang } from "./lang";

/* ── palette ──────────────────────────────────────────────────── */
const JADE = "#34dba8";
const GOLD = "#e8c466";
const GOLD_L = "#f3d77c";
const ROSE = "#ff89a4";
const CYAN = "#5ddcff";
const VOID_950 = "#02080e";

/* ── World-map SVG data ───────────────────────────────────────── */
// Simplified abstract continent shapes (not geo-accurate, stylised)
const CONTINENTS = [
  // North America
  { d: "M 80 60 C 85 45 110 40 130 50 C 150 58 155 72 148 88 C 140 108 120 118 100 115 C 82 112 68 95 72 78 Z", id: "na" },
  // South America
  { d: "M 108 122 C 118 118 135 122 138 135 C 142 150 138 172 128 182 C 118 190 105 185 100 172 C 94 158 97 130 108 122 Z", id: "sa" },
  // Europe
  { d: "M 290 48 C 300 40 320 38 328 48 C 336 58 330 72 318 76 C 306 78 288 68 290 48 Z", id: "eu" },
  // Africa
  { d: "M 295 85 C 308 78 328 82 332 98 C 338 116 332 146 320 158 C 308 168 293 162 286 148 C 278 132 280 100 295 85 Z", id: "af" },
  // Asia / Eurasia east
  { d: "M 345 40 C 380 28 460 30 490 50 C 515 68 510 92 488 102 C 462 114 400 112 368 100 C 338 88 330 54 345 40 Z", id: "as" },
  // Oceania
  { d: "M 480 140 C 498 132 520 136 524 150 C 528 164 514 178 498 178 C 482 178 470 166 470 152 C 469 146 474 142 480 140 Z", id: "oc" },
];

/* ── project marker positions (cx, cy on a 580×220 viewBox) ──── */
const MARKER_POS: Record<string, { cx: number; cy: number }> = {
  crops:   { cx: 105, cy: 82 },   // N.America — farms
  biofuel: { cx: 470, cy: 72 },   // Asia — reactor parks
  nfix:    { cx: 312, cy: 120 },  // Africa — soil interventions
  drive:   { cx: 125, cy: 152 },  // S.America — mosquito suppression
  reef:    { cx: 496, cy: 155 },  // Oceania — Great Barrier Reef
  deext:   { cx: 410, cy: 46 },   // Siberia / tundra
};

/* irreversibility halo radii (drive = largest) */
const HALO_R: Record<string, number> = {
  crops:   14,
  biofuel: 12,
  nfix:    18,
  drive:   30,
  reef:    16,
  deext:   20,
};

/* ── Project SVG icons (40×40) ───────────────────────────────── */
function ProjectIcon({ projectKey, accent }: { projectKey: string; accent: string }) {
  const s = { fill: "none" as const, stroke: accent, strokeWidth: 1.5 as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  if (projectKey === "crops") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {/* wheat stalk */}
      <line x1="20" y1="36" x2="20" y2="10" {...s} />
      {/* grains left */}
      <ellipse cx="14" cy="18" rx="5" ry="3" transform="rotate(-30 14 18)" {...s} />
      <ellipse cx="12" cy="26" rx="5" ry="3" transform="rotate(-30 12 26)" {...s} />
      {/* grains right */}
      <ellipse cx="26" cy="18" rx="5" ry="3" transform="rotate(30 26 18)" {...s} />
      <ellipse cx="28" cy="26" rx="5" ry="3" transform="rotate(30 28 26)" {...s} />
      {/* top */}
      <ellipse cx="20" cy="12" rx="4" ry="2.5" {...s} />
      {/* roots */}
      <path d="M18 36 Q14 38 12 40" {...s} strokeOpacity={0.5} />
      <path d="M22 36 Q26 38 28 40" {...s} strokeOpacity={0.5} />
    </svg>
  );

  if (projectKey === "biofuel") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {/* flask */}
      <path d="M16 8 L16 22 L8 34 L32 34 L24 22 L24 8 Z" {...s} />
      <line x1="14" y1="11" x2="26" y2="11" {...s} />
      {/* microbe circles */}
      <circle cx="14" cy="27" r="3" {...s} />
      <circle cx="20" cy="29" r="2" {...s} />
      <circle cx="26" cy="27" r="2.5" {...s} />
      {/* bubbles */}
      <circle cx="19" cy="18" r="1.5" fill={accent} opacity={0.4} />
      <circle cx="23" cy="15" r="1" fill={accent} opacity={0.3} />
    </svg>
  );

  if (projectKey === "nfix") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {/* roots */}
      <path d="M20 28 Q14 32 10 38" {...s} />
      <path d="M20 28 Q20 34 18 40" {...s} />
      <path d="M20 28 Q26 32 30 38" {...s} />
      {/* stem */}
      <line x1="20" y1="8" x2="20" y2="28" {...s} />
      {/* N₂ label */}
      <text x="5" y="13" fontSize="8" fill={accent} fontFamily="monospace">N₂</text>
      {/* arrow */}
      <path d="M14 11 L20 14" stroke={accent} strokeWidth={1.2} markerEnd="none" />
      <polygon points="20,14 17,10 22,10" fill={accent} opacity={0.8} />
      {/* NH₃ */}
      <text x="23" y="22" fontSize="7" fill={accent} fontFamily="monospace">NH₃</text>
    </svg>
  );

  if (projectKey === "drive") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {/* DNA double helix shorthand */}
      <path d="M12 8 Q20 14 28 8" {...s} />
      <path d="M12 14 Q20 20 28 14" {...s} />
      <line x1="12" y1="8" x2="12" y2="26" {...s} />
      <line x1="28" y1="8" x2="28" y2="26" {...s} />
      {/* inheritance arrow going down */}
      <path d="M20 24 L20 32" stroke={ROSE} strokeWidth={2} strokeLinecap="round" />
      <polygon points="20,36 16,30 24,30" fill={ROSE} />
      {/* caution skull simplified */}
      <circle cx="20" cy="22" r="6" fill="none" stroke={ROSE} strokeWidth={1.2} />
      <circle cx="17" cy="21" r="1.2" fill={ROSE} opacity={0.8} />
      <circle cx="23" cy="21" r="1.2" fill={ROSE} opacity={0.8} />
      <path d="M17 24 L23 24" stroke={ROSE} strokeWidth={1.2} />
    </svg>
  );

  if (projectKey === "reef") return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {/* polyp stalks */}
      <path d="M10 36 Q10 26 14 22 Q16 18 14 14 Q18 16 16 22 Q14 26 16 36" {...s} />
      <path d="M20 36 Q20 24 24 20 Q26 16 24 12 Q28 14 26 20 Q24 24 26 36" {...s} />
      <path d="M30 36 Q30 28 32 24 Q34 20 32 16 Q36 18 34 24 Q32 28 34 36" {...s} />
      {/* coral fronds */}
      <path d="M10 22 Q8 18 6 16" {...s} strokeOpacity={0.6} />
      <path d="M14 22 Q16 18 18 16" {...s} strokeOpacity={0.6} />
      {/* waterline */}
      <path d="M4 36 Q12 33 20 36 Q28 39 36 36" {...s} strokeOpacity={0.3} />
    </svg>
  );

  // deext — mammoth
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      {/* body */}
      <ellipse cx="22" cy="26" rx="13" ry="9" {...s} />
      {/* head */}
      <circle cx="11" cy="22" r="6" {...s} />
      {/* trunk curling down */}
      <path d="M8 26 Q4 32 6 36 Q8 38 11 36" {...s} />
      {/* ear */}
      <ellipse cx="7" cy="18" rx="4" ry="3" {...s} strokeOpacity={0.6} />
      {/* tusk */}
      <path d="M7 24 Q2 28 3 32" {...s} />
      {/* legs */}
      <line x1="15" y1="34" x2="14" y2="40" {...s} />
      <line x1="20" y1="34" x2="20" y2="40" {...s} />
      <line x1="27" y1="34" x2="28" y2="40" {...s} />
      <line x1="32" y1="33" x2="34" y2="40" {...s} />
      {/* woolly texture lines */}
      <path d="M18 18 Q20 16 22 18" {...s} strokeOpacity={0.45} />
      <path d="M25 17 Q27 15 29 17" {...s} strokeOpacity={0.45} />
    </svg>
  );
}

/* ── Containment axis strip ───────────────────────────────────── */
const AXIS_STAGES = [
  { key: "lab",     label: { en: "Lab", zh: "实验室" },           x: 0 },
  { key: "closed",  label: { en: "Closed culture", zh: "封闭培养" }, x: 0.28 },
  { key: "field",   label: { en: "Field release", zh: "田间释放" }, x: 0.6 },
  { key: "wild",    label: { en: "Wild release", zh: "野外释放" }, x: 1 },
];

const PROJECT_AXIS_POS: Record<string, number> = {
  crops:   0.52,
  biofuel: 0.16,
  nfix:    0.64,
  drive:   0.92,
  reef:    0.76,
  deext:   0.84,
};

function ContainmentAxis({ projects, selected }: { projects: EcoProject[]; selected: string | null }) {
  const { lang } = useLang();

  return (
    <div className="space-y-3">
      <div className="relative" style={{ height: "72px" }}>
        {/* axis line */}
        <div className="absolute left-0 right-0" style={{ top: "28px", height: "2px" }}>
          <div className="h-full bg-gradient-to-r from-vital-500/50 via-bio-500/50 to-pulse-500/70 rounded" />
          {/* irreversibility fill right of field */}
          <div
            className="absolute top-0 right-0 h-full rounded-r"
            style={{ width: "40%", background: "rgba(255,107,138,0.15)" }}
          />
        </div>

        {/* stage ticks */}
        {AXIS_STAGES.map(st => (
          <div
            key={st.key}
            className="absolute flex flex-col items-center"
            style={{ left: `${st.x * 100}%`, top: "22px", transform: "translateX(-50%)" }}
          >
            <div className="w-px h-3 bg-ghost-500/40" />
            <div className="text-[9px] font-mono text-ghost-500 mt-1 whitespace-nowrap">
              {lang === "zh" ? st.label.zh : st.label.en}
            </div>
          </div>
        ))}

        {/* project dots on axis */}
        {projects.map(p => {
          const xPct = PROJECT_AXIS_POS[p.key] * 100;
          const isSelected = selected === p.key;
          return (
            <div
              key={p.key}
              className="absolute flex flex-col items-center"
              style={{ left: `${xPct}%`, top: "18px", transform: "translateX(-50%)" }}
            >
              <div
                className="w-3 h-3 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: p.accent,
                  borderColor: isSelected ? GOLD : p.accent + "80",
                  boxShadow: isSelected ? `0 0 8px ${p.accent}` : undefined,
                }}
              />
              <div
                className="text-[9px] font-mono mt-1 whitespace-nowrap"
                style={{ color: p.accent + (isSelected ? "ff" : "99") }}
              >
                {lang === "zh" ? p.name.zh.slice(0, 4) : p.name.en.split(" ")[0].slice(0, 6)}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] font-mono text-ghost-500 pl-1">
        <span style={{ color: ROSE + "cc" }}>▍</span>{" "}
        <T v={{
          en: "Releases past \"Field\" are typically irreversible — containment becomes governance.",
          zh: "越过「田间」的释放通常是不可逆的——围控问题变成治理问题。",
        }} />
      </p>
    </div>
  );
}

/* ── World map SVG ─────────────────────────────────────────────── */
function WorldMap({
  projects,
  selected,
  onSelect,
}: {
  projects: EcoProject[];
  selected: string | null;
  onSelect: (key: string) => void;
}) {
  const { lang } = useLang();

  return (
    <svg
      viewBox="0 0 580 220"
      className="w-full rounded-xl"
      style={{ height: "220px", display: "block", cursor: "default" }}
      aria-label={lang === "zh" ? "世界地图显示六个生物工程项目位置" : "World map showing six bioengineering project locations"}
    >
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0e253c" />
          <stop offset="100%" stopColor="#02080e" />
        </radialGradient>
        <filter id="mapGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="markerGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ocean background */}
      <rect x="0" y="0" width="580" height="220" fill="url(#bgGrad)" />

      {/* graticule lines */}
      {[55, 110, 165].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(93,220,255,0.04)" strokeWidth="1" />
      ))}
      {[220, 275].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(93,220,255,0.04)" strokeWidth="1" />
      ))}
      {[330, 385, 440, 495].map(x => (
        <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(93,220,255,0.04)" strokeWidth="1" />
      ))}
      {[55, 110, 165].map(y => (
        <line key={y} x1="0" y1={y} x2="580" y2={y} stroke="rgba(93,220,255,0.04)" strokeWidth="1" />
      ))}

      {/* continents */}
      {CONTINENTS.map(c => (
        <path
          key={c.id}
          d={c.d}
          fill="rgba(29,67,104,0.7)"
          stroke="rgba(52,219,168,0.25)"
          strokeWidth="1"
        />
      ))}

      {/* project markers */}
      {projects.map((p, idx) => {
        const pos = MARKER_POS[p.key];
        const haloR = HALO_R[p.key];
        const isSelected = selected === p.key;
        const isDrive = p.key === "drive";

        return (
          <g
            key={p.key}
            transform={`translate(${pos.cx},${pos.cy})`}
            onClick={() => onSelect(p.key)}
            style={{ cursor: "pointer" }}
            role="button"
            aria-label={lang === "zh" ? p.name.zh : p.name.en}
            aria-pressed={isSelected}
          >
            {/* irreversibility halo */}
            <circle
              r={haloR}
              fill={isDrive ? "rgba(255,107,138,0.12)" : `${p.accent}10`}
              stroke={isDrive ? ROSE : p.accent}
              strokeWidth={isDrive ? 1.2 : 0.8}
              strokeOpacity={isSelected ? 0.8 : 0.4}
              strokeDasharray={isDrive ? "3 2" : undefined}
            >
              {isSelected && (
                <animate attributeName="r" values={`${haloR};${haloR * 1.4};${haloR}`} dur="2s" repeatCount="indefinite" />
              )}
            </circle>

            {/* outer ring (selected) */}
            {isSelected && (
              <circle r="10" fill="none" stroke={GOLD} strokeWidth="1.5" opacity={0.7} />
            )}

            {/* marker dot */}
            <circle
              r={isSelected ? 7 : 5}
              fill={p.accent}
              opacity={isSelected ? 1 : 0.8}
              filter="url(#markerGlow)"
            />

            {/* number label */}
            <text
              y="0.4em"
              textAnchor="middle"
              fontSize={isSelected ? "7" : "6"}
              fill={VOID_950}
              fontFamily="monospace"
              fontWeight="bold"
              pointerEvents="none"
            >
              {idx + 1}
            </text>
          </g>
        );
      })}

      {/* legend: halo scale hint */}
      <text x="8" y="213" fontSize="8" fill="rgba(255,107,138,0.6)" fontFamily="monospace">
        {lang === "zh" ? "光环 = 不可逆程度" : "halo = irreversibility"}
      </text>
    </svg>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function EcoEngineering() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<string | null>(ECO_PROJECTS[0].key);

  function handleSelect(key: string) {
    setSelected(prev => (prev === key ? null : key));
  }

  const NUM_LABELS = ["01", "02", "03", "04", "05", "06"];

  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-8">

      {/* heading */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-vital-300">
          <T v={{ en: "Six Planetary-Scale Bioengineering Projects", zh: "六个行星尺度的生物工程项目" }} />
        </h2>
        <p className="text-sm text-ghost-400 mt-1">
          <T v={{
            en: "Editing one organism is easy. Editing a wild world is irreversible.",
            zh: "编辑一个生物是容易的。编辑一个野生世界，则是不可逆的。",
          }} />
        </p>
      </div>

      {/* world map */}
      <div className="rounded-xl border border-vital-500/15 bg-void-950/80 overflow-hidden">
        <WorldMap projects={ECO_PROJECTS} selected={selected} onSelect={handleSelect} />
      </div>

      {/* 6-card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ECO_PROJECTS.map((p: EcoProject, idx: number) => {
          const isSelected = selected === p.key;
          return (
            <button
              key={p.key}
              onClick={() => handleSelect(p.key)}
              className="text-left rounded-xl border p-4 space-y-3 transition-all hover:bg-void-800/50 focus:outline-none"
              style={{
                borderColor: isSelected ? GOLD : p.accent + "44",
                boxShadow: isSelected ? `0 0 18px -4px ${p.accent}66` : undefined,
                background: isSelected ? "rgba(14,37,60,0.8)" : "rgba(4,15,26,0.6)",
              }}
              aria-pressed={isSelected}
            >
              {/* header row */}
              <div className="flex items-start gap-3">
                {/* number */}
                <div className="font-mono text-xs font-bold mt-0.5 shrink-0" style={{ color: p.accent }}>
                  {NUM_LABELS[idx]}
                </div>

                {/* icon + name */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="shrink-0">
                    <ProjectIcon projectKey={p.key} accent={p.accent} />
                  </div>
                  <div className="font-bold text-sm leading-tight" style={{ color: isSelected ? GOLD_L : p.accent }}>
                    <T v={p.name} />
                  </div>
                </div>
              </div>

              {/* what */}
              <div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-ghost-500 mb-0.5">
                  {lang === "zh" ? "内容" : "What"}
                </div>
                <div className="text-xs text-ghost-200 leading-snug">
                  <T v={p.what} />
                </div>
              </div>

              {/* scope */}
              <div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-ghost-500 mb-0.5">
                  {lang === "zh" ? "规模" : "Scope"}
                </div>
                <div className="label-mono text-[9px]" style={{ color: CYAN + "cc" }}>
                  <T v={p.scope} />
                </div>
              </div>

              {/* risk */}
              <div>
                <div className="text-[9px] font-mono tracking-widest uppercase text-ghost-500 mb-0.5">
                  {lang === "zh" ? "风险" : "Risk"}
                </div>
                <div className="text-xs leading-snug" style={{ color: ROSE }}>
                  <T v={p.risk} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* containment axis */}
      <section className="space-y-3">
        <div className="label-mono">
          <T v={{ en: "Containment vs Release", zh: "围控 vs 释放" }} />
        </div>
        <div className="rounded-xl border border-bio-500/15 bg-void-950/60 p-4">
          <ContainmentAxis projects={ECO_PROJECTS} selected={selected} />
        </div>
      </section>

      {/* closing caption */}
      <p className="text-sm italic text-center leading-relaxed" style={{ color: GOLD + "cc" }}>
        <T v={{
          en: '"An edit released into a field is not a science problem. It is a treaty problem."',
          zh: '"释放到田野中的编辑，不是科学问题。它是条约问题。"',
        }} />
      </p>

    </div>
  );
}
