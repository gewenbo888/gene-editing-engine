"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { POSTHUMAN_AXES, ACCESS_REGIMES, SocietyAxis, AccessRegime } from "./content";

/* ─── derived design-index ─────────────────────────────────── */
const DESIGN_INDEX = POSTHUMAN_AXES.reduce(
  (sum, ax) => sum + (ax.designed - ax.today),
  0
);

/* ─── legend chips ─────────────────────────────────────────── */
const LEGEND = [
  {
    key: "today",
    label: { en: "Today", zh: "今日" },
    color: "rgba(160,148,128,0.45)",
    solid: "#665e4f",
  },
  {
    key: "enhanced",
    label: { en: "Lightly enhanced", zh: "轻度增强" },
    color: "#34dba8",
    solid: "#34dba8",
  },
  {
    key: "designed",
    label: { en: "Deeply designed", zh: "深度设计" },
    color: "#e8c466",
    solid: "#e8c466",
  },
] as const;

/* ─── axes where larger = worse (warning tint on big bars) ─── */
const WARN_AXES = new Set(["equal", "consent"]);

/* ─── Part A: bar chart ──────────────────────────────────────── */
function SocietyChart() {
  const { lang } = useLang();
  const [tooltip, setTooltip] = useState<string | null>(null);

  const ROW_H = 44;
  const LABEL_W = 130;
  const CHART_W = 340;
  const TOTAL_W = LABEL_W + CHART_W + 48; // 48 for info dot + gap
  const TOTAL_H = POSTHUMAN_AXES.length * ROW_H + 8;

  return (
    <div className="relative w-full overflow-x-auto">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-5">
        {LEGEND.map((l) => (
          <div key={l.key} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: l.color, border: `1.5px solid ${l.solid}` }}
            />
            <span className="text-[0.7rem] font-mono tracking-wide" style={{ color: "#9a917a" }}>
              <T v={l.label} />
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-start">
        {/* SVG chart */}
        <svg
          viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`}
          width="100%"
          style={{ maxWidth: TOTAL_W, display: "block", overflow: "visible" }}
          aria-label="Society metrics across three regimes"
        >
          {POSTHUMAN_AXES.map((ax: SocietyAxis, i) => {
            const y0 = i * ROW_H + 4;
            const isWarn = WARN_AXES.has(ax.key);

            // bar heights & offsets (3 bars packed in ROW_H - 8 = 36px → ~10px each + gaps)
            const BAR_H = 9;
            const yToday    = y0 + 2;
            const yEnhanced = y0 + 13;
            const yDesigned = y0 + 24;

            const wToday    = (ax.today    / 100) * CHART_W;
            const wEnhanced = (ax.enhanced / 100) * CHART_W;
            const wDesigned = (ax.designed / 100) * CHART_W;

            const enhancedColor = "#34dba8";
            const designedColor = isWarn && ax.designed > ax.today
              ? "#e8c466" // still gold but carries the "authored weight"
              : "#e8c466";
            const warnTint = isWarn ? "rgba(255,107,138,0.18)" : "transparent";

            return (
              <g key={ax.key}>
                {/* warn tint band */}
                {isWarn && (
                  <rect
                    x={LABEL_W + 4}
                    y={y0}
                    width={CHART_W}
                    height={ROW_H - 6}
                    rx={3}
                    fill={warnTint}
                  />
                )}

                {/* metric label */}
                <text
                  x={LABEL_W - 8}
                  y={y0 + 18}
                  textAnchor="end"
                  fontSize={lang === "zh" ? 10 : 10}
                  fontFamily={lang === "zh" ? "Noto Serif SC,serif" : "Manrope,sans-serif"}
                  fill="#cfc5ab"
                  dominantBaseline="middle"
                >
                  {ax.name[lang]}
                </text>

                {/* today bar */}
                <rect
                  x={LABEL_W + 4}
                  y={yToday}
                  width={wToday}
                  height={BAR_H}
                  rx={2}
                  fill="rgba(160,148,128,0.3)"
                  stroke="rgba(160,148,128,0.45)"
                  strokeWidth={0.7}
                />

                {/* enhanced bar */}
                <rect
                  x={LABEL_W + 4}
                  y={yEnhanced}
                  width={wEnhanced}
                  height={BAR_H}
                  rx={2}
                  fill={`${enhancedColor}33`}
                  stroke={enhancedColor}
                  strokeWidth={0.8}
                />

                {/* designed bar */}
                <rect
                  x={LABEL_W + 4}
                  y={yDesigned}
                  width={wDesigned}
                  height={BAR_H}
                  rx={2}
                  fill={isWarn ? "rgba(232,196,102,0.22)" : "rgba(232,196,102,0.28)"}
                  stroke={designedColor}
                  strokeWidth={0.8}
                />

                {/* value labels */}
                <text
                  x={LABEL_W + 4 + wToday + 5}
                  y={yToday + BAR_H / 2}
                  fontSize={7.5}
                  fontFamily="JetBrains Mono,monospace"
                  fill="rgba(160,148,128,0.65)"
                  dominantBaseline="middle"
                >
                  {ax.today}
                </text>
                <text
                  x={LABEL_W + 4 + wEnhanced + 5}
                  y={yEnhanced + BAR_H / 2}
                  fontSize={7.5}
                  fontFamily="JetBrains Mono,monospace"
                  fill={`${enhancedColor}bb`}
                  dominantBaseline="middle"
                >
                  {ax.enhanced}
                </text>
                <text
                  x={LABEL_W + 4 + wDesigned + 5}
                  y={yDesigned + BAR_H / 2}
                  fontSize={7.5}
                  fontFamily="JetBrains Mono,monospace"
                  fill={`${designedColor}bb`}
                  dominantBaseline="middle"
                >
                  {ax.designed}
                </text>

                {/* info dot */}
                <foreignObject
                  x={TOTAL_W - 20}
                  y={y0 + 10}
                  width={18}
                  height={18}
                >
                  <div
                    style={{ position: "relative" }}
                    onMouseEnter={() => setTooltip(ax.key)}
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={() => setTooltip(ax.key)}
                    onBlur={() => setTooltip(null)}
                    tabIndex={0}
                    aria-label={ax.gloss[lang]}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: "1.5px solid rgba(160,148,128,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 9,
                        color: "rgba(160,148,128,0.6)",
                        cursor: "help",
                        fontFamily: "Manrope,sans-serif",
                      }}
                    >
                      i
                    </div>
                  </div>
                </foreignObject>

                {/* row separator */}
                <line
                  x1={LABEL_W - 4}
                  y1={y0 + ROW_H - 2}
                  x2={TOTAL_W - 4}
                  y2={y0 + ROW_H - 2}
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth={0.8}
                />
              </g>
            );
          })}
        </svg>

        {/* Interpretation card */}
        <div
          className="shrink-0 w-36 rounded-xl p-4 border self-start mt-6"
          style={{
            borderColor: "rgba(232,196,102,0.25)",
            background: "rgba(232,196,102,0.05)",
          }}
        >
          <div className="label-mono text-[0.58rem] text-ghost-300 mb-1">
            <T v={{ en: "Design index", zh: "设计指数" }} />
          </div>
          <div
            className="text-3xl font-bold font-mono leading-none mb-2"
            style={{ color: "#e8c466" }}
          >
            {DESIGN_INDEX > 0 ? "+" : ""}{DESIGN_INDEX}
          </div>
          <p className="text-[0.68rem] leading-relaxed italic"
            style={{ color: "rgba(250,228,163,0.65)" }}>
            <T v={{
              en: "More designed ≠ more humane. It is more authored.",
              zh: "更多设计 ≠ 更人道。它是更多被书写。",
            }} />
          </p>
        </div>
      </div>

      {/* Tooltip overlay */}
      {tooltip && (() => {
        const ax = POSTHUMAN_AXES.find((a) => a.key === tooltip);
        if (!ax) return null;
        const idx = POSTHUMAN_AXES.findIndex((a) => a.key === tooltip);
        return (
          <div
            className="pointer-events-none absolute left-0 z-20 rounded-lg border px-3 py-2 text-[0.72rem] leading-relaxed max-w-[220px]"
            style={{
              top: 48 + idx * 44 + 44,
              borderColor: `${ax.accent}55`,
              background: "#040f1a",
              color: "#ede7d6",
            }}
          >
            <span className="font-semibold" style={{ color: ax.accent }}>
              {ax.name[lang]}
            </span>
            {" — "}
            {ax.gloss[lang]}
          </div>
        );
      })()}
    </div>
  );
}

/* ─── Access regime SVG diagrams ────────────────────────────── */
function OpenDiagram() {
  return (
    <svg viewBox="0 0 80 50" width={80} height={50} aria-hidden>
      {/* flat equality bar */}
      <rect x={4} y={18} width={72} height={14} rx={3}
        fill="rgba(52,219,168,0.22)" stroke="#34dba8" strokeWidth={1.5} />
      <text x={40} y={27} textAnchor="middle" fontSize={7}
        fontFamily="JetBrains Mono,monospace" fill="#8aedd1" dominantBaseline="middle">
        universal
      </text>
      {/* equality markers */}
      {[10, 24, 38, 52, 66].map((x) => (
        <circle key={x} cx={x} cy={25} r={1.8} fill="#34dba8" opacity={0.8} />
      ))}
    </svg>
  );
}

function TieredDiagram() {
  return (
    <svg viewBox="0 0 80 56" width={80} height={56} aria-hidden>
      {/* top tier — jade */}
      <rect x={24} y={4} width={32} height={12} rx={2}
        fill="rgba(52,219,168,0.25)" stroke="#34dba8" strokeWidth={1.3} />
      <text x={40} y={11} textAnchor="middle" fontSize={6.5}
        fontFamily="JetBrains Mono,monospace" fill="#8aedd1" dominantBaseline="middle">
        elite
      </text>
      {/* middle tier — gold */}
      <rect x={14} y={19} width={52} height={12} rx={2}
        fill="rgba(232,196,102,0.2)" stroke="#e8c466" strokeWidth={1.3} />
      <text x={40} y={26} textAnchor="middle" fontSize={6.5}
        fontFamily="JetBrains Mono,monospace" fill="#f3d77c" dominantBaseline="middle">
        middle
      </text>
      {/* base tier — rose */}
      <rect x={4} y={34} width={72} height={16} rx={2}
        fill="rgba(255,107,138,0.12)" stroke="#ff89a4" strokeWidth={1.3} />
      <text x={40} y={43} textAnchor="middle" fontSize={6.5}
        fontFamily="JetBrains Mono,monospace" fill="#ffb3c4" dominantBaseline="middle">
        unedited majority
      </text>
    </svg>
  );
}

function PrivateDiagram() {
  return (
    <svg viewBox="0 0 80 56" width={80} height={56} aria-hidden>
      {/* narrow gold column on left */}
      <rect x={4} y={4} width={18} height={48} rx={2}
        fill="rgba(232,196,102,0.28)" stroke="#e8c466" strokeWidth={1.5} />
      <text x={13} y={28} textAnchor="middle" fontSize={5.5}
        fontFamily="JetBrains Mono,monospace" fill="#f3d77c" dominantBaseline="middle"
        transform="rotate(-90 13 28)">
        wealthy
      </text>
      {/* rest — gray */}
      <rect x={26} y={4} width={50} height={48} rx={2}
        fill="rgba(102,94,79,0.15)" stroke="rgba(102,94,79,0.35)" strokeWidth={1.2} />
      <text x={51} y={28} textAnchor="middle" fontSize={7}
        fontFamily="JetBrains Mono,monospace" fill="rgba(160,148,128,0.5)" dominantBaseline="middle">
        locked out
      </text>
      {/* divider emphasis */}
      <line x1={25} y1={4} x2={25} y2={52}
        stroke="rgba(255,107,138,0.5)" strokeWidth={1.5} strokeDasharray="3 2" />
    </svg>
  );
}

const REGIME_DIAGRAMS: Record<string, JSX.Element> = {
  open:    <OpenDiagram />,
  tiered:  <TieredDiagram />,
  private: <PrivateDiagram />,
};

const GINI_BADGES: Record<string, { v: string; color: string }> = {
  open:    { v: "0.4 (stable)",       color: "#34dba8" },
  tiered:  { v: "0.6 (drifting up)",  color: "#e8c466" },
  private: { v: "0.85 (post-feudal)", color: "#ff89a4" },
};

/* ─── Part B: access regimes ─────────────────────────────────── */
function AccessRegimePanel() {
  const { lang } = useLang();

  return (
    <div>
      {/* heading */}
      <h3 className="display text-lg md:text-xl font-bold vital-text mb-1">
        <T v={{ en: "Three Distributions", zh: "三种分配" }} />
      </h3>
      <p className="text-sm text-ghost-300 mb-5">
        <T v={{
          en: "How editing arrives shapes how civilizations diverge.",
          zh: "编辑以何种方式抵达，决定文明以何种方式分叉。",
        }} />
      </p>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ACCESS_REGIMES.map((regime: AccessRegime) => {
          const badge = GINI_BADGES[regime.key];
          return (
            <div
              key={regime.key}
              className="rounded-xl p-4 border flex flex-col gap-3"
              style={{
                borderColor: "rgba(52,219,168,0.28)",
                background: "rgba(52,219,168,0.04)",
              }}
            >
              {/* diagram */}
              <div className="flex justify-center">
                {REGIME_DIAGRAMS[regime.key]}
              </div>

              {/* name */}
              <div
                className="font-bold text-sm text-center leading-tight"
                style={{ color: "#5ee5be" }}
              >
                <T v={regime.name} />
              </div>

              {/* note */}
              <p className="text-[0.72rem] leading-relaxed text-ghost-300 text-center">
                <T v={regime.note} />
              </p>

              {/* Gini badge */}
              <div
                className="mt-auto rounded-full px-3 py-1 text-center text-[0.65rem] font-mono tracking-wide self-center"
                style={{
                  color: badge.color,
                  border: `1px solid ${badge.color}44`,
                  background: `${badge.color}10`,
                }}
              >
                <T v={{ en: "Gini after 100 yr:", zh: "百年后基尼：" }} />
                {" "}{badge.v}
              </div>
            </div>
          );
        })}
      </div>

      {/* center quote */}
      <p
        className="mt-5 text-center text-[0.78rem] italic leading-relaxed"
        style={{ color: "rgba(255,137,164,0.8)" }}
      >
        <T v={{
          en: '"A species splits not when its genes diverge, but when its access does."',
          zh: '"一个物种的分裂，并非发生在基因岔开之时，而是发生在「可及」岔开之时。"',
        }} />
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function PostHumanSociety() {
  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-10">

      {/* ── Part A ── */}
      <div>
        <h3 className="display text-lg md:text-xl font-bold vital-text mb-1">
          <T v={{ en: "Society Across Three Regimes", zh: "社会跨越三种状态" }} />
        </h3>
        <p className="text-sm text-ghost-300 mb-6">
          <T v={{
            en: "Compare today's species, lightly enhanced, and deeply designed.",
            zh: "对比今日的物种、被轻度增强的、与被深度设计的。",
          }} />
        </p>
        <SocietyChart />
      </div>

      {/* divider */}
      <div
        className="h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(52,219,168,0.18), transparent)" }}
      />

      {/* ── Part B ── */}
      <AccessRegimePanel />

      {/* ── Closing quote ── */}
      <p
        className="text-center text-[0.8rem] leading-relaxed italic pt-2 border-t"
        style={{
          color: "#fae4a3",
          borderColor: "rgba(232,196,102,0.15)",
        }}
      >
        <T v={{
          en: '"The first ones edited are not the only ones edited — but they are the ones who choose for the rest."',
          zh: '"被先编辑的，并不是唯一被编辑的——但他们是为其余的人作选择的人。"',
        }} />
      </p>
    </div>
  );
}
