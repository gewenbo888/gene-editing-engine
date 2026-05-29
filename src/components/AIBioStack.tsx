"use client";

import { T } from "./lang";
import { AI_BIO_LAYERS, AILayer } from "./content";

/* ──────────────────────────────────────────────
   PROTEIN FOLDING MORPH ANIMATION
   A polypeptide chain that morphs from straight → coiled via CSS.
   20 circles connected by lines; "folded" state uses a hand-placed
   compact layout to suggest 3-D structure — no Math.random, all
   deterministic geometry.
   ────────────────────────────────────────────── */

/* Deterministic amino acid positions — straight (unfolded) */
const UNFOLDED: [number, number][] = [
  [20, 30], [48, 30], [76, 30], [104, 30], [132, 30],
  [160, 30], [188, 30], [216, 30], [244, 30], [272, 30],
  [300, 30], [328, 30], [356, 30], [384, 30], [412, 30],
  [440, 30], [468, 30], [496, 30], [524, 30], [552, 30],
];

/* "Folded" — compact alpha-helix suggestion */
const FOLDED: [number, number][] = [
  [220, 10], [258, 14], [280, 30], [272, 50],
  [248, 60], [220, 54], [196, 42], [188, 22],
  [204, 8],  [234, 6],  [260, 18], [274, 40],
  [258, 58], [232, 64], [206, 58], [190, 40],
  [192, 18], [212, 8],  [240, 10], [262, 26],
];

function PolypeptideVisual() {
  return (
    <div className="relative w-full overflow-hidden h-20 mb-6" aria-hidden>
      {/* Unfolded chain — fades out while folded fades in, cycling */}
      <svg
        viewBox="0 0 572 70"
        width="100%"
        height="70"
        className="absolute inset-0"
        style={{ animation: "unfoldPhase 4.8s ease-in-out infinite" }}
      >
        <style>{`
          @keyframes unfoldPhase {
            0%,20%   { opacity: 1; }
            40%,80%  { opacity: 0; }
            100%     { opacity: 1; }
          }
          @keyframes foldPhase {
            0%,20%   { opacity: 0; }
            40%,80%  { opacity: 1; }
            100%     { opacity: 0; }
          }
        `}</style>
        {UNFOLDED.slice(0, -1).map(([x, y], i) => (
          <line
            key={i}
            x1={x} y1={y}
            x2={UNFOLDED[i + 1][0]} y2={UNFOLDED[i + 1][1]}
            stroke="#34dba8" strokeOpacity="0.45" strokeWidth="1.6"
          />
        ))}
        {UNFOLDED.map(([x, y], i) => (
          <circle
            key={i}
            cx={x} cy={y} r="5"
            fill={i % 3 === 0 ? "#34dba8" : i % 3 === 1 ? "#5ddcff" : "#f3d77c"}
            fillOpacity="0.75"
          />
        ))}
        <text
          x="286" y="62" textAnchor="middle" fontSize="8"
          fontFamily="JetBrains Mono,monospace"
          fill="#8aedd1" fillOpacity="0.5"
        >
          unfolded sequence
        </text>
      </svg>

      {/* Folded chain */}
      <svg
        viewBox="0 0 572 70"
        width="100%"
        height="70"
        className="absolute inset-0"
        style={{ animation: "foldPhase 4.8s ease-in-out infinite" }}
      >
        {FOLDED.slice(0, -1).map(([x, y], i) => (
          <line
            key={i}
            x1={x} y1={y}
            x2={FOLDED[i + 1][0]} y2={FOLDED[i + 1][1]}
            stroke="#34dba8" strokeOpacity="0.55" strokeWidth="1.6"
          />
        ))}
        {FOLDED.map(([x, y], i) => (
          <circle
            key={i}
            cx={x} cy={y} r="5"
            fill={i % 3 === 0 ? "#34dba8" : i % 3 === 1 ? "#5ddcff" : "#f3d77c"}
            fillOpacity="0.85"
          />
        ))}
        {/* glow halo */}
        <circle cx="228" cy="35" r="42" fill="none" stroke="#34dba8" strokeOpacity="0.12" strokeWidth="18" />
        <text
          x="286" y="62" textAnchor="middle" fontSize="8"
          fontFamily="JetBrains Mono,monospace"
          fill="#f3d77c" fillOpacity="0.6"
        >
          folded structure ← AlphaFold
        </text>
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PER-LAYER SVG ICONS
   ────────────────────────────────────────────── */
function IconRead({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(93,220,255,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* DNA strip — two parallel vertical bars */}
      <line x1="15" y1="9" x2="15" y2="31" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="9" x2="25" y2="31" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Rungs */}
      {[11, 15, 19, 23, 27].map((y) => (
        <line key={y} x1="15" y1={y} x2="25" y2={y} stroke={color} strokeOpacity="0.55" strokeWidth="1.3" />
      ))}
      {/* Scanner line — horizontal sweep */}
      <line x1="8" y1="20" x2="32" y2="20" stroke="#f3d77c" strokeWidth="1.5" strokeOpacity="0.85" />
      {/* Scanner arrowhead */}
      <polygon points="32,20 28,17.5 28,22.5" fill="#f3d77c" fillOpacity="0.85" />
    </svg>
  );
}

function IconFold({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(52,219,168,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Protein backbone coil — stylized helix path */}
      <path
        d="M8 28 C11 22 14 16 18 13 C22 10 26 14 24 19 C22 24 18 26 20 21 C22 16 26 14 30 16 C34 18 34 24 30 26"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
      />
      {/* Residue dots */}
      {([[8,28],[18,13],[24,19],[30,16],[30,26]] as [number,number][]).map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={color} fillOpacity="0.7" />
      ))}
    </svg>
  );
}

function IconDesign({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(232,196,102,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Blueprint grid lines */}
      <line x1="10" y1="14" x2="30" y2="14" stroke={color} strokeOpacity="0.3" strokeWidth="0.9" />
      <line x1="10" y1="20" x2="30" y2="20" stroke={color} strokeOpacity="0.3" strokeWidth="0.9" />
      <line x1="10" y1="26" x2="30" y2="26" stroke={color} strokeOpacity="0.3" strokeWidth="0.9" />
      {/* Pencil */}
      <path d="M24 10 L30 16 L18 28 L12 30 L14 24 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="24" y1="10" x2="30" y2="16" stroke={color} strokeWidth="1.6" />
      <line x1="14" y1="24" x2="18" y2="28" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

function IconEdit({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(153,134,255,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* DNA strand */}
      <path d="M10 10 Q15 16 10 22 Q15 28 10 34" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M20 10 Q15 16 20 22 Q15 28 20 34" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Rungs left side */}
      {([12,18,24,30] as number[]).map((y) => (
        <line key={y} x1="10" y1={y} x2="20" y2={y} stroke={color} strokeOpacity="0.4" strokeWidth="1.1" />
      ))}
      {/* Scissor blades */}
      <line x1="26" y1="12" x2="36" y2="22" stroke="#f3d77c" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="12" x2="26" y2="22" stroke="#f3d77c" strokeWidth="2" strokeLinecap="round" />
      {/* Scissor pivot */}
      <circle cx="31" cy="17" r="2" fill="#f3d77c" fillOpacity="0.85" />
      {/* Handles */}
      <ellipse cx="24" cy="10" rx="2.5" ry="3.5" fill="none" stroke="#f3d77c" strokeWidth="1.3" />
      <ellipse cx="38" cy="10" rx="2.5" ry="3.5" fill="none" stroke="#f3d77c" strokeWidth="1.3" />
    </svg>
  );
}

function IconTest({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(255,107,138,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Cell outline */}
      <ellipse cx="18" cy="21" rx="10" ry="12" fill="none" stroke={color} strokeWidth="1.6" />
      {/* Nucleus */}
      <ellipse cx="18" cy="21" rx="4.5" ry="5.5" fill="none" stroke={color} strokeOpacity="0.5" strokeWidth="1.1" />
      {/* Checkmark */}
      <path d="M27 12 L30 16 L36 8" fill="none" stroke="#34dba8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Vital-sign trace */}
      <path d="M5 33 L8 33 L10 28 L12 37 L14 30 L16 33 L20 33" fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

function LayerIcon({ layerKey, color }: { layerKey: string; color: string }) {
  switch (layerKey) {
    case "read":   return <IconRead color={color} />;
    case "fold":   return <IconFold color={color} />;
    case "design": return <IconDesign color={color} />;
    case "edit":   return <IconEdit color={color} />;
    case "test":   return <IconTest color={color} />;
    default:       return null;
  }
}

/* ──────────────────────────────────────────────
   PULSE ANIMATION — inline CSS keyframes injected
   once via a <style> tag. A gold dot travels from
   layer 1 → 5 every 2.4 s.  Two staggered pulses.
   ────────────────────────────────────────────── */
const PULSE_CSS = `
@keyframes stackPulse {
  0%         { transform: scaleX(0); opacity: 1; transform-origin: left; }
  100%       { transform: scaleX(1); opacity: 0.2; transform-origin: left; }
}
@keyframes pulseDot {
  0%,100%    { opacity: 0; }
  10%,90%    { opacity: 1; }
  50%        { opacity: 0.8; }
}
`;

/* Each layer row connector line — shows pulse traveling downward */
function LayerConnector({ delay }: { delay: number }) {
  return (
    <div className="relative h-5 flex items-center justify-start ml-14">
      {/* Static dashed trace */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, #e8c46622 0%, #e8c46644 60%, transparent 100%)" }}
      />
      {/* Animated fill pulse 1 */}
      <div
        className="absolute left-0 h-0.5 rounded-full"
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #e8c466, transparent)",
          animation: `stackPulse 2.4s ease-out ${delay}s infinite`,
          transformOrigin: "left",
        }}
      />
      {/* Animated fill pulse 2 (staggered) */}
      <div
        className="absolute left-0 h-0.5 rounded-full"
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #34dba8, transparent)",
          animation: `stackPulse 2.4s ease-out ${delay + 1.2}s infinite`,
          transformOrigin: "left",
        }}
      />
      {/* Moving dot 1 */}
      <div
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: "#e8c466",
          boxShadow: "0 0 8px #e8c466",
          left: 0,
          animation: `pulseDot 2.4s ease-out ${delay}s infinite`,
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   LAYER ROW
   ────────────────────────────────────────────── */
function LayerRow({ layer, index }: { layer: AILayer; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="relative flex gap-4 rounded-xl p-4 transition"
      style={{
        background: `linear-gradient(135deg, rgba(8,24,42,0.75) 0%, rgba(2,8,14,0.92) 100%)`,
        border: `1px solid ${layer.accent}33`,
        boxShadow: `inset 0 1px 0 ${layer.accent}11`,
      }}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ background: layer.accent, opacity: 0.6 }}
      />

      {/* Number */}
      <div className="shrink-0 pt-0.5 ml-2">
        <span className="label-mono text-xs" style={{ color: layer.accent, opacity: 0.7 }}>
          {num}
        </span>
      </div>

      {/* Icon */}
      <div className="shrink-0">
        <LayerIcon layerKey={layer.key} color={layer.accent} />
      </div>

      {/* Text block */}
      <div className="flex-1 min-w-0 space-y-1">
        <h4
          className="font-bold text-base leading-tight"
          style={{ color: layer.accent }}
        >
          <T v={layer.name} />
        </h4>
        <p className="text-sm text-ghost-100 leading-snug">
          <T v={layer.role} />
        </p>
        <p className="label-mono text-clinical-300 text-[0.62rem] leading-relaxed">
          <T v={layer.example} />
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────── */
export default function AIBioStack() {
  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-6">
      {/* Inject keyframes once */}
      <style>{PULSE_CSS}</style>

      {/* ── heading ── */}
      <header>
        <h3 className="display text-xl font-bold vital-text">
          <T v={{ en: "The AI × Biology Stack", zh: "AI × 生物的栈" }} />
        </h3>
        <p className="mt-1 text-sm text-ghost-300">
          <T v={{ en: "Five layers, from raw sequence to a simulated cell.", zh: "从原始序列到仿真细胞的五层。" }} />
        </p>
      </header>

      {/* ── protein folding morph ── */}
      <PolypeptideVisual />

      {/* ── server-rack stack ── */}
      <div className="space-y-0">
        {AI_BIO_LAYERS.map((layer, i) => (
          <div key={layer.key}>
            <LayerRow layer={layer} index={i} />
            {/* Inter-layer connector with traveling pulse */}
            {i < AI_BIO_LAYERS.length - 1 && (
              <LayerConnector delay={i * 0.48} />
            )}
          </div>
        ))}
      </div>

      {/* ── summary card ── */}
      <div
        className="rounded-xl px-5 py-4 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(52,219,168,0.08), rgba(52,219,168,0.04))",
          border: "1px solid rgba(52,219,168,0.22)",
        }}
      >
        <p className="text-sm italic vital-text leading-relaxed">
          <T v={{
            en: "\"Before AI, the bottleneck was the biology we could read. After AI, the bottleneck is the biology we cannot yet imagine.\"",
            zh: "\"在 AI 之前，瓶颈是我们能读懂的生物学。在 AI 之后，瓶颈是我们还不能想象的生物学。\"",
          }} />
        </p>
      </div>
    </div>
  );
}
