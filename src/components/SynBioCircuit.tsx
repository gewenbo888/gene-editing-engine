"use client";

import { T, useLang } from "./lang";
import { GENETIC_GATES, SYNBIO_MILESTONES, Gate, SynbioMilestone } from "./content";

/* ──────────────────────────────────────────────
   SVG ICONS — standard logic-gate shapes
   ────────────────────────────────────────────── */
function IconAnd({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(52,219,168,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* D-shape AND gate: flat left, rounded right */}
      <path d="M12 13 L22 13 Q31 13 31 20 Q31 27 22 27 L12 27 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Input lines */}
      <line x1="8" y1="16" x2="12" y2="16" stroke={color} strokeWidth="1.4" />
      <line x1="8" y1="24" x2="12" y2="24" stroke={color} strokeWidth="1.4" />
      {/* Output line */}
      <line x1="31" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

function IconOr({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(93,220,255,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* OR gate: curved back, pointed output */}
      <path d="M11 13 Q16 13 20 13 Q30 13 32 20 Q30 27 20 27 Q16 27 11 27 Q14 20 11 13 Z"
        fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="7" y1="16" x2="13" y2="16" stroke={color} strokeWidth="1.4" />
      <line x1="7" y1="24" x2="13" y2="24" stroke={color} strokeWidth="1.4" />
      <line x1="32" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

function IconNot({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(232,196,102,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Triangle */}
      <path d="M10 13 L10 27 L28 20 Z" fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      {/* Bubble */}
      <circle cx="30.5" cy="20" r="2.5" stroke={color} strokeWidth="1.6" />
      {/* Input line */}
      <line x1="6" y1="20" x2="10" y2="20" stroke={color} strokeWidth="1.4" />
      {/* Output line */}
      <line x1="33" y1="20" x2="36" y2="20" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

function IconOsc({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(153,134,255,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Sine wave */}
      <path d="M5 20 C8 20 8 11 12 11 S16 29 20 29 S24 11 28 11 S32 20 35 20"
        fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function IconMemory({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(255,107,138,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Flip-flop rectangle */}
      <rect x="11" y="14" width="18" height="12" rx="2.5" stroke={color} strokeWidth="1.7" />
      <text x="20" y="22" textAnchor="middle" fontSize="6" fill={color} fontFamily="monospace">FF</text>
      {/* State arrows */}
      <path d="M6 17 Q9 14 11 17" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" markerEnd="url(#arr)" />
      <path d="M34 23 Q31 26 29 23" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="6" y1="23" x2="11" y2="23" stroke={color} strokeWidth="1.4" />
      <line x1="29" y1="17" x2="34" y2="17" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

function IconSense({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="7" fill="rgba(93,220,255,0.06)" stroke={color} strokeOpacity="0.22" />
      {/* Antenna mast */}
      <line x1="20" y1="28" x2="20" y2="20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Base */}
      <line x1="14" y1="28" x2="26" y2="28" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Arcs — signal waves */}
      <path d="M14 18 Q17 12 20 10 Q23 12 26 18" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 21 Q15 11 20 8 Q25 11 29 21" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.55" />
      {/* Centre dot */}
      <circle cx="20" cy="20" r="1.8" fill={color} />
    </svg>
  );
}

function GateIcon({ gateKey, color }: { gateKey: string; color: string }) {
  switch (gateKey) {
    case "and":    return <IconAnd color={color} />;
    case "or":     return <IconOr color={color} />;
    case "not":    return <IconNot color={color} />;
    case "osc":    return <IconOsc color={color} />;
    case "memory": return <IconMemory color={color} />;
    case "sense":  return <IconSense color={color} />;
    default:       return null;
  }
}

/* ──────────────────────────────────────────────
   PART A — GATE CARD
   ────────────────────────────────────────────── */
function GateCard({ gate }: { gate: Gate }) {
  return (
    <div
      className="flex flex-col gap-2.5 rounded-xl p-4 transition"
      style={{
        background: "linear-gradient(145deg, rgba(8,24,42,0.82), rgba(2,8,14,0.95))",
        border: `1px solid ${gate.accent}44`,
        boxShadow: `0 0 0 0 ${gate.accent}`,
      }}
    >
      <div className="flex items-center gap-3">
        <GateIcon gateKey={gate.key} color={gate.accent} />
        <span
          className="font-bold text-sm leading-tight"
          style={{ color: gate.accent }}
        >
          <T v={gate.name} />
        </span>
      </div>

      <p className="label-mono text-[0.6rem] leading-relaxed" style={{ color: gate.accent, opacity: 0.82 }}>
        <T v={gate.logic} />
      </p>

      <p className="text-[0.75rem] italic leading-snug text-ghost-300">
        <T v={gate.example} />
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PART B — MILESTONE TIMELINE (SVG)
   ────────────────────────────────────────────── */

/* Map year string to x position in [60, 680] */
const YEAR_MIN = 1998;
const YEAR_MAX = 2026;
const X_MIN = 60;
const X_MAX = 700;

function yearToX(year: number): number {
  return X_MIN + ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * (X_MAX - X_MIN);
}

const AXIS_YEARS = [2000, 2005, 2010, 2015, 2020, 2025];
const MILESTONE_YEARS: Record<string, number> = {
  "2000": 2000,
  "2010": 2010,
  "2016": 2016,
  "2021": 2021,
  "2024+": 2024,
};

/* Alternating above/below — even index above, odd below */
function MilestoneTimeline({ milestones }: { milestones: SynbioMilestone[] }) {
  const { lang } = useLang();
  const AXIS_Y = 100;
  const CARD_W = 120;

  return (
    <div className="w-full overflow-x-auto pb-2">
      <svg
        viewBox="0 0 760 220"
        width="100%"
        style={{ minWidth: 560, maxWidth: 760 }}
        aria-label="Synthetic biology milestones timeline"
      >
        {/* ── grid ticks ── */}
        {AXIS_YEARS.map((y) => (
          <g key={y}>
            <line
              x1={yearToX(y)} y1={AXIS_Y - 6}
              x2={yearToX(y)} y2={AXIS_Y + 6}
              stroke="#34dba8" strokeOpacity="0.4" strokeWidth="1"
            />
            <text
              x={yearToX(y)} y={AXIS_Y + 18}
              textAnchor="middle" fontSize="9"
              fontFamily="JetBrains Mono,monospace"
              fill="#8aedd1" fillOpacity="0.6"
            >
              {y}
            </text>
          </g>
        ))}

        {/* ── axis line ── */}
        <line
          x1={X_MIN - 10} y1={AXIS_Y}
          x2={X_MAX + 20} y2={AXIS_Y}
          stroke="#34dba8" strokeOpacity="0.3" strokeWidth="1.4"
        />
        {/* arrow tip */}
        <polygon
          points={`${X_MAX + 20},${AXIS_Y} ${X_MAX + 14},${AXIS_Y - 4} ${X_MAX + 14},${AXIS_Y + 4}`}
          fill="#34dba8" fillOpacity="0.3"
        />

        {/* ── milestones ── */}
        {milestones.map((m, i) => {
          const yr = MILESTONE_YEARS[m.year] ?? 2000;
          const cx = yearToX(yr);
          const above = i % 2 === 0;
          const lineTopY = above ? AXIS_Y - 8 : AXIS_Y + 8;
          const lineEndY = above ? AXIS_Y - 50 : AXIS_Y + 50;
          const cardY = above ? lineEndY - 60 : lineEndY;
          const cardX = Math.max(10, Math.min(cx - CARD_W / 2, 640));

          return (
            <g key={m.year}>
              {/* vertical connector */}
              <line
                x1={cx} y1={lineTopY}
                x2={cx} y2={lineEndY}
                stroke="#34dba8" strokeOpacity="0.5" strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* dot */}
              <circle cx={cx} cy={AXIS_Y} r="5" fill="#34dba8" fillOpacity="0.9" />
              <circle cx={cx} cy={AXIS_Y} r="9" fill="none" stroke="#34dba8" strokeOpacity="0.3" strokeWidth="1" />

              {/* card background */}
              <rect
                x={cardX} y={cardY}
                width={CARD_W} height={54}
                rx="6"
                fill="rgba(8,24,42,0.88)"
                stroke="#34dba8" strokeOpacity="0.2"
              />

              {/* year label */}
              <text
                x={cardX + 8} y={cardY + 15}
                fontSize="8.5" fontFamily="JetBrains Mono,monospace"
                fill="#f3d77c" fillOpacity="0.92"
              >
                {m.year}
              </text>

              {/* name */}
              <foreignObject x={cardX + 6} y={cardY + 18} width={CARD_W - 12} height={18}>
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "#8aedd1",
                    display: "block",
                    lineHeight: 1.2,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {m.name[lang]}
                </span>
              </foreignObject>

              {/* what */}
              <foreignObject x={cardX + 6} y={cardY + 34} width={CARD_W - 12} height={20}>
                <span
                  style={{
                    fontSize: 7.5,
                    color: "#665e4f",
                    display: "block",
                    lineHeight: 1.3,
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {m.what[lang]}
                </span>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN EXPORT
   ────────────────────────────────────────────── */
export default function SynBioCircuit() {
  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-10">

      {/* ── PART A ── */}
      <section>
        <header className="mb-5">
          <h3 className="display text-xl font-bold vital-text">
            <T v={{ en: "Six Genetic Logic Gates", zh: "六种基因逻辑门" }} />
          </h3>
          <p className="mt-1 text-sm text-ghost-300">
            <T v={{ en: "The cell can be wired like a circuit.", zh: "细胞，可以像电路一样被布线。" }} />
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GENETIC_GATES.map((gate) => (
            <GateCard key={gate.key} gate={gate} />
          ))}
        </div>

        {/* subtle connector motif below grid */}
        <div className="mt-5 flex items-center gap-2 overflow-hidden opacity-30">
          {GENETIC_GATES.map((gate, i) => (
            <div key={gate.key} className="flex items-center gap-2">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: gate.accent }}
              />
              {i < GENETIC_GATES.length - 1 && (
                <div className="h-px flex-1 w-8" style={{ background: `linear-gradient(90deg, ${gate.accent}, ${GENETIC_GATES[i + 1].accent})` }} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── divider ── */}
      <div className="rule-life h-px w-full" />

      {/* ── PART B ── */}
      <section>
        <header className="mb-5">
          <h3 className="display text-xl font-bold vital-text">
            <T v={{ en: "Synthetic Biology Milestones", zh: "合成生物学里程碑" }} />
          </h3>
          <p className="mt-1 text-sm text-ghost-300">
            <T v={{ en: "From the first genetic oscillator to a fully synthetic yeast genome.", zh: "从第一个基因振荡器到全合成酵母基因组。" }} />
          </p>
        </header>

        <MilestoneTimeline milestones={SYNBIO_MILESTONES} />
      </section>

      {/* ── caption ── */}
      <p className="text-center text-xs italic bio-text leading-relaxed">
        <T v={{
          en: "\"Biology stops being only discovery the moment it starts being engineering.\"",
          zh: "\"当生物学开始变成工程的那一刻，它便不再仅仅是发现。\"",
        }} />
      </p>
    </div>
  );
}
