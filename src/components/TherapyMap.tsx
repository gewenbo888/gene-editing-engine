"use client";

import { useState } from "react";
import { T, useLang } from "./lang";
import { GENE_THERAPIES, Therapy } from "./content";

/* ── tier metadata ── */
const TIERS: { tier: number; label: { en: string; zh: string }; accent: string; bg: string }[] = [
  { tier: 0, label: { en: "Approved · 已获批",          zh: "已获批" },         accent: "#34dba8", bg: "rgba(52,219,168,0.07)"  },
  { tier: 2, label: { en: "Clinical trials · 临床试验", zh: "临床试验" },        accent: "#5ddcff", bg: "rgba(93,220,255,0.07)"  },
  { tier: 3, label: { en: "Research · 研究阶段",         zh: "研究阶段" },       accent: "#9986ff", bg: "rgba(153,134,255,0.07)" },
  { tier: 4, label: { en: "Regulatory edge · 监管边缘",  zh: "监管边缘" },       accent: "#ff89a4", bg: "rgba(255,137,164,0.07)" },
];

/* ── approval timeline dots ── */
const TIMELINE_EVENTS = [
  { year: 2017, label: "Luxturna", key: "luxturna" },
  { year: 2017, label: "CAR-T",    key: "carT"     },
  { year: 2019, label: "Zolgensma",key: "zolgensma"},
  { year: 2023, label: "Casgevy / Lyfgenia", key: "casgevy" },
];
const YEAR_START = 2017;
const YEAR_END   = 2026;

/* ── delivery schematic SVGs ── */
function AAVIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-14 h-14" aria-hidden>
      <polygon points="40,6 63,19 63,45 40,58 17,45 17,19" fill="none" stroke="#34dba8" strokeWidth="1.6" opacity="0.9"/>
      <polygon points="40,14 56,23 56,41 40,50 24,41 24,23" fill="none" stroke="#34dba8" strokeWidth="1" opacity="0.5"/>
      <circle cx="40" cy="32" r="8" fill="rgba(52,219,168,0.12)" stroke="#34dba8" strokeWidth="1.2"/>
      <text x="40" y="36" textAnchor="middle" fontSize="7" fill="#8aedd1" fontFamily="monospace">AAV</text>
    </svg>
  );
}
function ExVivoIcon() {
  return (
    <svg viewBox="0 0 90 60" className="w-16 h-10" aria-hidden>
      <rect x="2" y="20" width="20" height="20" rx="10" fill="rgba(52,219,168,0.15)" stroke="#34dba8" strokeWidth="1.4"/>
      <text x="12" y="33" textAnchor="middle" fontSize="7" fill="#8aedd1" fontFamily="monospace">cell</text>
      <path d="M24 30 L36 30" stroke="#5ddcff" strokeWidth="1.4" strokeDasharray="2 2"/>
      <rect x="36" y="18" width="18" height="24" rx="4" fill="rgba(93,220,255,0.1)" stroke="#5ddcff" strokeWidth="1.2"/>
      <text x="45" y="31" textAnchor="middle" fontSize="6" fill="#b6f0ff" fontFamily="monospace">edit</text>
      <path d="M56 30 L68 30" stroke="#5ddcff" strokeWidth="1.4" strokeDasharray="2 2"/>
      <rect x="68" y="20" width="20" height="20" rx="10" fill="rgba(52,219,168,0.18)" stroke="#34dba8" strokeWidth="1.4"/>
      <path d="M54 25 L56 28 M54 35 L56 32" stroke="#5ddcff" strokeWidth="1" opacity="0.7"/>
      <path d="M64 25 L62 22" stroke="#34dba8" strokeWidth="1" markerEnd="url(#arr)" opacity="0.7"/>
    </svg>
  );
}
function LipidIcon() {
  return (
    <svg viewBox="0 0 60 60" className="w-14 h-14" aria-hidden>
      <circle cx="30" cy="30" r="14" fill="rgba(243,215,124,0.12)" stroke="#e8c466" strokeWidth="1.4"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 30 + Math.cos(rad) * 14;
        const y1 = 30 + Math.sin(rad) * 14;
        const x2 = 30 + Math.cos(rad) * 22;
        const y2 = 30 + Math.sin(rad) * 22;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e8c466" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>;
      })}
      <circle cx="30" cy="30" r="5" fill="rgba(232,196,102,0.25)" stroke="#f3d77c" strokeWidth="1"/>
      <text x="30" y="33" textAnchor="middle" fontSize="5" fill="#f3d77c" fontFamily="monospace">LNP</text>
    </svg>
  );
}
function CRISPRScissorIcon() {
  return (
    <svg viewBox="0 0 80 60" className="w-16 h-12" aria-hidden>
      {/* DNA double helix stub */}
      <path d="M4 10 Q12 20 4 30 Q12 40 4 50" fill="none" stroke="#34dba8" strokeWidth="1.6" opacity="0.8"/>
      <path d="M18 10 Q10 20 18 30 Q10 40 18 50" fill="none" stroke="#34dba8" strokeWidth="1.6" opacity="0.8"/>
      <line x1="7" y1="20" x2="15" y2="20" stroke="#5ddcff" strokeWidth="1" opacity="0.7"/>
      <line x1="7" y1="30" x2="15" y2="30" stroke="#5ddcff" strokeWidth="1" opacity="0.7"/>
      <line x1="7" y1="40" x2="15" y2="40" stroke="#5ddcff" strokeWidth="1" opacity="0.7"/>
      {/* scissors */}
      <circle cx="38" cy="22" r="5" fill="none" stroke="#ff89a4" strokeWidth="1.4"/>
      <circle cx="38" cy="38" r="5" fill="none" stroke="#ff89a4" strokeWidth="1.4"/>
      <line x1="43" y1="22" x2="58" y2="12" stroke="#ff89a4" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="43" y1="38" x2="58" y2="48" stroke="#ff89a4" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M42 28 L48 30 L42 32" fill="#ff89a4" opacity="0.85"/>
      <text x="56" y="31" textAnchor="middle" fontSize="6" fill="#ffb3c4" fontFamily="monospace">cut</text>
    </svg>
  );
}
function LentiviralIcon() {
  return (
    <svg viewBox="0 0 70 60" className="w-14 h-12" aria-hidden>
      <ellipse cx="35" cy="30" rx="20" ry="12" fill="rgba(153,134,255,0.12)" stroke="#9986ff" strokeWidth="1.4"/>
      <path d="M15 30 Q25 18 45 22 Q55 25 55 30" fill="none" stroke="#9986ff" strokeWidth="1.2" opacity="0.6"/>
      <path d="M15 30 Q25 42 45 38 Q55 35 55 30" fill="none" stroke="#9986ff" strokeWidth="1.2" opacity="0.6"/>
      {[-8, 0, 8].map((offset, i) => (
        <circle key={i} cx={35 + offset * 1.5} cy={30} r="2.5" fill="#9986ff" opacity="0.6"/>
      ))}
      <text x="35" y="51" textAnchor="middle" fontSize="6" fill="#d0c5ff" fontFamily="monospace">lentiviral</text>
    </svg>
  );
}

function DeliverySchematic({ therapy }: { therapy: Therapy }) {
  const mech = therapy.mech.en.toLowerCase();
  const k = therapy.key;
  if (k === "lyfgenia")              return <LentiviralIcon />;
  if (k === "zolgensma" || k === "luxturna") return <AAVIcon />;
  if (k === "casgevy" || k === "cf" || k === "alz") return <CRISPRScissorIcon />;
  if (k === "verve")                 return <LipidIcon />;
  if (k === "carT" || k === "germline") return <ExVivoIcon />;
  if (mech.includes("aav"))          return <AAVIcon />;
  if (mech.includes("lentiviral"))   return <LentiviralIcon />;
  if (mech.includes("lipid"))        return <LipidIcon />;
  return <CRISPRScissorIcon />;
}

/* ── Timeline ── */
function ApprovalTimeline({
  hovered, setHovered,
}: {
  hovered: string | null;
  setHovered: (k: string | null) => void;
}) {
  const range = YEAR_END - YEAR_START;
  const pct = (y: number) => ((y - YEAR_START) / range) * 100;

  return (
    <div className="relative h-10 mb-2">
      {/* axis line */}
      <div className="absolute top-5 left-0 right-0 h-px bg-white/10"/>
      {/* year labels */}
      {[2017, 2019, 2021, 2023, 2025, YEAR_END].map((y) => (
        <span
          key={y}
          className="absolute top-7 text-[0.58rem] font-mono text-white/30 -translate-x-1/2"
          style={{ left: `${pct(y)}%` }}
        >{y}</span>
      ))}
      {/* tick marks */}
      {[2017,2018,2019,2020,2021,2022,2023,2024,2025,2026].map((y) => (
        <div
          key={y}
          className="absolute top-4 w-px h-2 bg-white/15 -translate-x-1/2"
          style={{ left: `${pct(y)}%` }}
        />
      ))}
      {/* events */}
      {TIMELINE_EVENTS.map((ev) => (
        <div
          key={ev.key}
          className="absolute -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          style={{ left: `${pct(ev.year)}%`, top: "8px" }}
          onMouseEnter={() => setHovered(ev.key)}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className="w-3 h-3 rounded-full border-2 transition-all"
            style={{
              borderColor: "#34dba8",
              background: hovered === ev.key ? "#34dba8" : "rgba(52,219,168,0.25)",
              boxShadow: hovered === ev.key ? "0 0 10px 2px rgba(52,219,168,0.5)" : "none",
            }}
          />
          {hovered === ev.key && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#040f1a] border border-vital-500/30 rounded px-2 py-1 text-[0.62rem] text-vital-300 z-10">
              {ev.year} · {ev.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Tier row ── */
function TierRow({
  tier,
  therapies,
  selected,
  onSelect,
}: {
  tier: typeof TIERS[number];
  therapies: Therapy[];
  selected: string;
  onSelect: (k: string) => void;
}) {
  const { lang } = useLang();
  if (therapies.length === 0) return null;
  return (
    <div
      className="rounded-xl p-3 border border-white/5"
      style={{ background: tier.bg }}
    >
      <div
        className="label-mono text-[0.58rem] mb-2"
        style={{ color: tier.accent }}
      >
        {tier.label[lang]}
      </div>
      <div className="flex flex-wrap gap-2">
        {therapies.map((th) => (
          <button
            key={th.key}
            onClick={() => onSelect(th.key)}
            className="rounded-full px-3 py-1 text-xs font-medium border transition-all"
            style={{
              borderColor: selected === th.key ? th.accent : `${th.accent}44`,
              color: selected === th.key ? "#fff" : `${th.accent}cc`,
              background: selected === th.key ? `${th.accent}22` : "transparent",
              boxShadow: selected === th.key ? `0 0 12px 2px ${th.accent}33` : "none",
            }}
          >
            <T v={th.name} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Detail panel ── */
function DetailPanel({ therapy }: { therapy: Therapy }) {
  const isBanned = therapy.status_tier === 4;
  const isApproved = therapy.status_tier === 0;
  const statusColor = isBanned ? "#ff89a4" : isApproved ? "#34dba8" : "#5ddcff";

  return (
    <div className="mt-5 rounded-xl border border-white/8 p-5 bg-[rgba(4,15,26,0.6)] grid sm:grid-cols-2 gap-5 rise-in">
      {/* left: text */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold" style={{ color: therapy.accent }}>
          <T v={therapy.name} />
        </h3>
        <div>
          <span className="label-mono text-[0.58rem] text-white/40 mr-1">Target</span>
          <span className="text-sm text-white/80"><T v={therapy.target} /></span>
        </div>
        <div>
          <span className="label-mono text-[0.58rem] text-white/40 mr-1">Mechanism</span>
          <span className="text-sm text-white/70 leading-relaxed"><T v={therapy.mech} /></span>
        </div>
        <div>
          <span className="label-mono text-[0.58rem] text-white/40 mr-1">Status</span>
          <span className="text-sm font-semibold" style={{ color: statusColor }}>
            <T v={therapy.status} />
          </span>
        </div>
      </div>
      {/* right: schematic */}
      <div className="flex flex-col items-center justify-center gap-2 opacity-90">
        <div className="label-mono text-[0.55rem] text-white/30 mb-1">Delivery schematic</div>
        <DeliverySchematic therapy={therapy} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function TherapyMap() {
  const [selected, setSelected] = useState<string>("casgevy");
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedTherapy = GENE_THERAPIES.find((t) => t.key === selected) ?? GENE_THERAPIES[0];

  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-5">
      {/* heading */}
      <div>
        <h2 className="display text-xl md:text-2xl font-bold vital-text">
          <T v={{ en: "What's Live, What's Coming, What's Forbidden", zh: "已上市、即将到来、已被禁止" }} />
        </h2>
        <p className="mt-1 text-sm text-white/55">
          <T v={{ en: "A live map of nine gene therapies across the regulatory cliff.", zh: "九种基因疗法横跨监管悬崖的活体地图。" }} />
        </p>
      </div>

      {/* approval timeline */}
      <div>
        <div className="label-mono text-[0.58rem] text-white/30 mb-1">
          <T v={{ en: "Approval timeline", zh: "获批时间轴" }} />
        </div>
        <ApprovalTimeline hovered={hovered} setHovered={setHovered} />
      </div>

      {/* tier rows */}
      <div className="space-y-3">
        {TIERS.map((tier) => (
          <TierRow
            key={tier.tier}
            tier={tier}
            therapies={GENE_THERAPIES.filter((t) => t.status_tier === tier.tier)}
            selected={selected}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* detail panel */}
      <DetailPanel therapy={selectedTherapy} />

      {/* caption */}
      <p className="text-[0.78rem] italic bio-text text-center pt-1">
        <T
          v={{
            en: '"From a single approved cure in 2017 to dozens in pipeline today. The shape is no longer if, but for whom."',
            zh: '"从 2017 年的单一获批治愈，到今日数十项在管线之中。问题已不再是「是否」，而是「为谁」。"',
          }}
        />
      </p>
    </div>
  );
}
