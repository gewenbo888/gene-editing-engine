"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { ENHANCEMENT_RUNGS, EnhanceRung } from "./content";

/* ══════════════════════════════════════════
   Ethical Pressure Gauge
══════════════════════════════════════════ */
function EthicalGauge({ index }: { index: number }) {
  /* index 0..5, pressure 0..100 */
  const pressure = Math.round((index / (ENHANCEMENT_RUNGS.length - 1)) * 100);
  const barW = 280;
  const needleX = 12 + (pressure / 100) * (barW - 24);

  return (
    <div className="mt-4">
      <div className="label-mono text-[0.58rem] text-white/35 mb-2">
        <T v={{ en: "Ethical pressure", zh: "伦理压力" }}/>
      </div>
      <svg viewBox={`0 0 ${barW} 36`} className="w-full max-w-xs" aria-label="ethical pressure gauge">
        {/* gradient bar */}
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#34dba8"/>
            <stop offset="35%"  stopColor="#e8c466"/>
            <stop offset="65%"  stopColor="#9986ff"/>
            <stop offset="100%" stopColor="#ff89a4"/>
          </linearGradient>
        </defs>
        <rect x="12" y="10" width={barW - 24} height="8" rx="4" fill="url(#gauge-grad)" opacity="0.7"/>
        {/* tick marks */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const x = 12 + (pct / 100) * (barW - 24);
          return <line key={pct} x1={x} y1="9" x2={x} y2="19" stroke="#fff" strokeWidth="0.7" opacity="0.3"/>;
        })}
        {/* labels */}
        <text x="12" y="30" fontSize="5.5" fill="rgba(255,255,255,0.4)" fontFamily="monospace">low</text>
        <text x={barW / 2} y="30" textAnchor="middle" fontSize="5.5" fill="rgba(255,255,255,0.4)" fontFamily="monospace">medium</text>
        <text x={barW - 12} y="30" textAnchor="end" fontSize="5.5" fill="rgba(255,255,255,0.4)" fontFamily="monospace">high</text>
        {/* needle */}
        <line
          x1={needleX} y1="6"
          x2={needleX} y2="22"
          stroke="#fff"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ transition: "x1 0.4s, x2 0.4s" }}
        />
        <circle
          cx={needleX} cy="14"
          r="3.5"
          fill="#e8c466"
          style={{ transition: "cx 0.4s" }}
        />
        {/* value label */}
        <text
          x={needleX} y="5"
          textAnchor="middle"
          fontSize="5"
          fill="#f3d77c"
          fontFamily="monospace"
          style={{ transition: "x 0.4s" }}
        >{pressure}%</text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════
   SVG Ladder (420px tall)
══════════════════════════════════════════ */
const LADDER_H = 420;
const RAIL_X_L = 36;
const RAIL_X_R = 120;
const RUNG_TOP    = 38;
const RUNG_BOTTOM = LADDER_H - 28;
const RUNG_COUNT  = ENHANCEMENT_RUNGS.length; // 6

function rungY(index: number) {
  /* index 0 = cure (bottom), 5 = speciate (top) */
  /* SVG y: top = small y, bottom = large y */
  /* rung 0 → RUNG_BOTTOM, rung 5 → RUNG_TOP */
  return RUNG_BOTTOM - (index / (RUNG_COUNT - 1)) * (RUNG_BOTTOM - RUNG_TOP);
}

function LadderSVG({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (i: number) => void;
}) {
  const { lang } = useLang();

  return (
    <svg
      viewBox={`0 0 160 ${LADDER_H}`}
      className="w-full max-w-[160px] shrink-0"
      aria-label="enhancement ladder"
    >
      {/* rails */}
      <line x1={RAIL_X_L} y1={RUNG_TOP} x2={RAIL_X_L} y2={RUNG_BOTTOM}
        stroke="#34dba8" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1={RAIL_X_R} y1={RUNG_TOP} x2={RAIL_X_R} y2={RUNG_BOTTOM}
        stroke="#34dba8" strokeWidth="2.5" strokeLinecap="round"/>

      {/* rungs — rendered bottom (index 0) to top (index 5) */}
      {ENHANCEMENT_RUNGS.map((rung, i) => {
        const y     = rungY(i);
        const isSel = selected === i;
        return (
          <g
            key={rung.key}
            onClick={() => onSelect(i)}
            style={{ cursor: "pointer" }}
          >
            {/* hit area */}
            <rect x={RAIL_X_L - 10} y={y - 10} width={RAIL_X_R - RAIL_X_L + 20} height={20} fill="transparent"/>
            {/* rung bar */}
            <line
              x1={RAIL_X_L} y1={y}
              x2={RAIL_X_R} y2={y}
              stroke={rung.accent}
              strokeWidth={isSel ? 3.5 : 2}
              strokeLinecap="round"
              opacity={isSel ? 1 : 0.5}
            />
            {/* index label left */}
            <text x={RAIL_X_L - 6} y={y + 4} textAnchor="end"
              fontSize="9" fill={isSel ? rung.accent : "rgba(255,255,255,0.3)"}
              fontFamily="monospace" fontWeight={isSel ? "bold" : "normal"}>
              {i + 1}
            </text>
            {/* rung name right of right rail */}
            <text x={RAIL_X_R + 8} y={y + 4}
              fontSize="8.5" fill={isSel ? rung.accent : "rgba(255,255,255,0.45)"}
              fontWeight={isSel ? "bold" : "normal"}>
              {rung.name[lang].split(" ").slice(0, 2).join(" ")}
            </text>
          </g>
        );
      })}

      {/* "you are here" gold sphere on selected rung */}
      {(() => {
        const y = rungY(selected);
        const cx = (RAIL_X_L + RAIL_X_R) / 2;
        return (
          <g style={{ transition: "transform 0.35s" }}>
            <defs>
              <radialGradient id="sphere-g" cx="0.35" cy="0.3" r="0.7">
                <stop offset="0%" stopColor="#ffe88a"/>
                <stop offset="100%" stopColor="#b88b00"/>
              </radialGradient>
            </defs>
            <circle cx={cx} cy={y} r="9" fill="rgba(232,196,102,0.18)"
              style={{ filter: "blur(6px)" }}/>
            <circle cx={cx} cy={y} r="6" fill="url(#sphere-g)"
              stroke="#f3d77c" strokeWidth="0.8"/>
          </g>
        );
      })()}
    </svg>
  );
}

/* ══════════════════════════════════════════
   Detail Panel
══════════════════════════════════════════ */
function RungDetail({ rung, index }: { rung: EnhanceRung; index: number }) {
  return (
    <div className="flex-1 space-y-3 rise-in">
      <h3
        className="text-xl font-bold display"
        style={{ color: rung.accent }}
      >
        <T v={rung.name} />
      </h3>

      <div>
        <span className="label-mono text-[0.58rem] text-white/35 block mb-0.5">
          <T v={{ en: "Example", zh: "示例" }} />
        </span>
        <p className="text-sm text-white/75"><T v={rung.example} /></p>
      </div>

      <div>
        <span className="label-mono text-[0.58rem] neuro-text block mb-0.5">
          <T v={{ en: "Consent", zh: "同意" }} />
        </span>
        <p className="text-sm neuro-text"><T v={rung.consent} /></p>
      </div>

      <div>
        <span className="label-mono text-[0.58rem] pulse-text block mb-0.5">
          <T v={{ en: "Risk", zh: "风险" }} />
        </span>
        <p className="text-sm pulse-text"><T v={rung.risk} /></p>
      </div>

      <EthicalGauge index={index} />
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function EnhancementLadder() {
  const [selected, setSelected] = useState<number>(0);

  const rung = ENHANCEMENT_RUNGS[selected];

  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-5">
      {/* heading */}
      <div>
        <h2 className="display text-xl md:text-2xl font-bold vital-text">
          <T v={{ en: "The Therapy → Enhancement Ladder", zh: "治疗 → 增强之梯" }} />
        </h2>
        <p className="mt-1 text-sm text-white/55">
          <T v={{ en: "Six rungs. Each step is harder to climb back down.", zh: "六级梯。每往上一步，回头便更难一步。" }} />
        </p>
      </div>

      {/* ladder + detail */}
      <div className="flex gap-6 items-start min-h-[420px]">
        <LadderSVG selected={selected} onSelect={setSelected} />
        <RungDetail rung={rung} index={selected} key={rung.key} />
      </div>

      {/* bottom strip: all rungs as mini buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        {ENHANCEMENT_RUNGS.map((r, i) => (
          <button
            key={r.key}
            onClick={() => setSelected(i)}
            className="rounded-full px-3 py-1 text-[0.72rem] font-medium border transition-all"
            style={{
              borderColor: selected === i ? r.accent : `${r.accent}44`,
              color: selected === i ? "#fff" : `${r.accent}99`,
              background: selected === i ? `${r.accent}22` : "transparent",
              boxShadow: selected === i ? `0 0 10px 2px ${r.accent}2a` : "none",
            }}
          >
            <T v={r.name} />
          </button>
        ))}
      </div>

      {/* caption */}
      <p className="text-[0.78rem] italic bio-text text-center pt-1">
        <T
          v={{
            en: '"Every cure removes a deficit. Every deficit is, secretly, relative."',
            zh: '"每一次治愈都消除一个缺陷。每一个缺陷，秘密地，都是相对的。"',
          }}
        />
      </p>
    </div>
  );
}
