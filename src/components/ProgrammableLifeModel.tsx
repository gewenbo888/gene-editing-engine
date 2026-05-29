"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { CAPACITIES, PROFILES, Capacity, Profile } from "./content";

/* ─── types ──────────────────────────────────────────── */
type ProfileKey = "natural" | "edited" | "synthetic";

/* ─── octagon radar helpers ─────────────────────────── */
const SIZE = 320;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_MAX = 128; // radius at 100%
const N = 8;

function octagonPoints(values: number[], rMax: number): [number, number][] {
  return values.map((v, i) => {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
    const r = (v / 100) * rMax;
    return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)] as [number, number];
  });
}

function ringPoints(pct: number): [number, number][] {
  return Array.from({ length: N }, (_, i) => {
    const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
    const r = (pct / 100) * R_MAX;
    return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)] as [number, number];
  });
}

function pointsStr(pts: [number, number][]): string {
  return pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
}

const LABEL_OFFSET = 18;
function spokeLabel(i: number): [number, number] {
  const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
  return [
    CX + (R_MAX + LABEL_OFFSET) * Math.cos(angle),
    CY + (R_MAX + LABEL_OFFSET) * Math.sin(angle),
  ];
}

/* profile color map */
const PROFILE_COLOR: Record<ProfileKey, string> = {
  natural: "#ff89a4",
  edited: "#34dba8",
  synthetic: "#e8c466",
};

/* ─── lerp polygon animation ────────────────────────── */
function lerpValues(from: number[], to: number[], t: number): number[] {
  return from.map((f, i) => f + (to[i] - f) * t);
}

function useAnimatedValues(target: number[]): number[] {
  const [displayed, setDisplayed] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const DURATION = 600;

  useEffect(() => {
    const from = displayed.slice();
    fromRef.current = from;
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    function step(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplayed(lerpValues(from, target, ease));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    }
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.join(",")]);

  return displayed;
}

/* ─── mini bar ──────────────────────────────────────── */
function MiniBar({ value, color, active }: { value: number; color: string; active: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${value}%`, background: color, opacity: active ? 1 : 0.28, maxWidth: "100%" }}
      />
      <span className="label-mono text-[0.56rem]" style={{ color, opacity: active ? 0.85 : 0.3 }}>
        {value}
      </span>
    </div>
  );
}

/* ─── formula bar ───────────────────────────────────── */
function FormulaBar() {
  const { lang } = useLang();
  const enTerms = ["G·Genetic Info", "E·Evolutionary Dynamics", "C·Cellular Engineering", "A·AI-Assisted Biology", "S·Synthetic Systems", "M·Mutation Control", "B·Biological Computation", "D·Conscious Design"];
  const zhTerms = ["G·遗传信息", "E·进化动力学", "C·细胞工程", "A·AI辅助生物", "S·合成系统", "M·突变控制", "B·生物计算", "D·有意识的设计"];
  const terms = lang === "zh" ? zhTerms : enTerms;
  return (
    <div className="rounded-lg bg-void-800/50 border border-vital-500/10 px-4 py-2.5 overflow-x-auto">
      <p className="font-mono text-[0.68rem] leading-relaxed text-ghost-300 whitespace-nowrap">
        <span className="text-bio-300">
          <T v={{ en: "Programmable Life", zh: "可编程生命" }} />
        </span>
        {" = "}
        {terms.map((term, i) => {
          const sym = term[0];
          const rest = term.slice(1);
          return (
            <span key={i}>
              <span className="text-vital-400 font-bold">{sym}</span>
              <span className="text-ghost-300">{rest}</span>
              {i < terms.length - 1 && <span className="text-ghost-500"> + </span>}
            </span>
          );
        })}
      </p>
    </div>
  );
}

/* ─── main component ────────────────────────────────── */
export default function ProgrammableLifeModel() {
  const { lang } = useLang();
  const [activePro, setActivePro] = useState<ProfileKey>("edited");
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);

  const activeProfile = PROFILES.find(p => p.key === activePro) as Profile;
  const activeColor = PROFILE_COLOR[activePro];

  // active polygon values
  const activeValues = CAPACITIES.map((c: Capacity) => c[activePro]);
  const animatedValues = useAnimatedValues(activeValues);

  // ghost polygon values for non-active profiles
  const ghostValues: Record<string, number[]> = {
    natural: CAPACITIES.map((c: Capacity) => c.natural),
    edited: CAPACITIES.map((c: Capacity) => c.edited),
    synthetic: CAPACITIES.map((c: Capacity) => c.synthetic),
  };

  const activePts = octagonPoints(animatedValues, R_MAX);
  const ghostKeys = (["natural", "edited", "synthetic"] as ProfileKey[]).filter(k => k !== activePro);

  const RINGS = [20, 40, 60, 80, 100];

  return (
    <div className="holo rounded-2xl p-6 md:p-10">
      {/* heading */}
      <div className="mb-1">
        <h3 className="display text-2xl font-bold text-ghost-50 md:text-3xl">
          <T v={{ en: "The Programmable-Life Model", zh: "可编程生命模型" }} />
        </h3>
        <p className="mt-1.5 text-sm text-ghost-300">
          <T v={{ en: "Eight dimensions along which biology becomes programmable.", zh: "生物学沿之变得可编程的八个维度。" }} />
        </p>
      </div>

      {/* formula bar */}
      <div className="mt-5 mb-6">
        <FormulaBar />
      </div>

      {/* profile toggle */}
      <div className="mb-7 flex flex-wrap gap-2">
        {PROFILES.map((p: Profile) => {
          const col = PROFILE_COLOR[p.key];
          const isActive = activePro === p.key;
          return (
            <button
              key={p.key}
              onClick={() => setActivePro(p.key)}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
              style={{
                border: `1.5px solid ${isActive ? col : col + "40"}`,
                color: isActive ? col : col + "99",
                background: isActive ? col + "18" : "transparent",
                boxShadow: isActive ? `0 0 16px -4px ${col}88` : "none",
              }}
            >
              <T v={p.name} />
            </button>
          );
        })}
      </div>

      {/* radar + detail side-by-side on wide */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        {/* SVG Radar */}
        <div className="shrink-0">
          <svg
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            width={SIZE}
            height={SIZE}
            style={{ display: "block", maxWidth: "100%" }}
            aria-label="Octagon radar chart"
          >
            {/* concentric ring gridlines */}
            {RINGS.map(pct => {
              const pts = ringPoints(pct);
              return (
                <polygon
                  key={pct}
                  points={pointsStr(pts)}
                  fill="none"
                  stroke="#34dba8"
                  strokeOpacity={0.12}
                  strokeWidth={1}
                />
              );
            })}

            {/* ring percentage labels */}
            {RINGS.map(pct => (
              <text
                key={`lbl-${pct}`}
                x={CX + 4}
                y={CY - (pct / 100) * R_MAX + 3}
                fill="#34dba8"
                fillOpacity={0.3}
                fontSize="7"
                fontFamily="JetBrains Mono,monospace"
              >
                {pct}
              </text>
            ))}

            {/* spokes */}
            {CAPACITIES.map((_: Capacity, i: number) => {
              const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
              const x2 = CX + R_MAX * Math.cos(angle);
              const y2 = CY + R_MAX * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={CX} y1={CY}
                  x2={x2} y2={y2}
                  stroke="#34dba8"
                  strokeOpacity={hoveredAxis === i ? 0.55 : 0.2}
                  strokeWidth={1}
                />
              );
            })}

            {/* ghost overlays for other profiles */}
            {ghostKeys.map(k => {
              const gPts = octagonPoints(ghostValues[k], R_MAX);
              return (
                <polygon
                  key={k}
                  points={pointsStr(gPts)}
                  fill={PROFILE_COLOR[k]}
                  fillOpacity={0.06}
                  stroke={PROFILE_COLOR[k]}
                  strokeOpacity={0.18}
                  strokeWidth={1}
                />
              );
            })}

            {/* active filled polygon */}
            <polygon
              points={pointsStr(activePts)}
              fill={activeColor}
              fillOpacity={0.18}
              stroke={activeColor}
              strokeWidth={2}
              strokeOpacity={0.9}
            />

            {/* vertex dots */}
            {activePts.map(([x, y], i) => (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={hoveredAxis === i ? 5.5 : 3.5}
                fill={activeColor}
                opacity={hoveredAxis === i ? 1 : 0.85}
                style={{
                  filter: hoveredAxis === i ? `drop-shadow(0 0 6px ${activeColor})` : "none",
                  transition: "r 0.2s, opacity 0.2s",
                }}
              />
            ))}

            {/* axis labels */}
            {CAPACITIES.map((c: Capacity, i: number) => {
              const [lx, ly] = spokeLabel(i);
              const isHovered = hoveredAxis === i;
              return (
                <text
                  key={c.sym}
                  x={lx}
                  y={ly + 4}
                  textAnchor="middle"
                  fill={isHovered ? activeColor : "#5ee5be"}
                  fillOpacity={isHovered ? 1 : 0.75}
                  fontSize="12"
                  fontFamily="JetBrains Mono,monospace"
                  fontWeight="700"
                  style={{ cursor: "default" }}
                >
                  {c.sym}
                </text>
              );
            })}
          </svg>
        </div>

        {/* axis detail grid */}
        <div className="flex-1 min-w-0">
          <div className="label-mono mb-3">
            <T v={{ en: "Axis breakdown", zh: "维度详情" }} />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {CAPACITIES.map((c: Capacity, i: number) => {
              const isHovered = hoveredAxis === i;
              return (
                <div
                  key={c.sym}
                  onMouseEnter={() => setHoveredAxis(i)}
                  onMouseLeave={() => setHoveredAxis(null)}
                  className="rounded-xl border p-3 transition-all duration-200 cursor-default"
                  style={{
                    borderColor: isHovered ? activeColor + "60" : "rgba(52,219,168,0.12)",
                    background: isHovered ? activeColor + "0c" : "rgba(8,24,42,0.45)",
                    boxShadow: isHovered ? `0 0 20px -6px ${activeColor}55` : "none",
                  }}
                >
                  <div
                    className="text-2xl font-mono font-bold leading-none mb-1"
                    style={{ color: "#5ee5be" }}
                  >
                    {c.sym}
                  </div>
                  <div className="text-xs font-semibold text-ghost-100 leading-tight">
                    <T v={c.name} />
                  </div>
                  <div className="mt-0.5 text-[0.65rem] leading-tight text-ghost-300/70">
                    <T v={c.gloss} />
                  </div>

                  <div className="mt-2.5 space-y-1.5">
                    <MiniBar value={c.natural} color={PROFILE_COLOR.natural} active={activePro === "natural"} />
                    <MiniBar value={c.edited} color={PROFILE_COLOR.edited} active={activePro === "edited"} />
                    <MiniBar value={c.synthetic} color={PROFILE_COLOR.synthetic} active={activePro === "synthetic"} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* profile description */}
          <div
            className="mt-6 rounded-xl border p-4"
            style={{
              borderColor: activeColor + "35",
              background: activeColor + "0a",
            }}
          >
            <div className="text-sm font-semibold" style={{ color: activeColor }}>
              <T v={activeProfile.name} />
            </div>
            <p className="mt-1 text-sm leading-relaxed text-ghost-200">
              <T v={activeProfile.note} />
            </p>
          </div>
        </div>
      </div>

      {/* closing italic quote */}
      <div className="mt-8 border-t border-vital-500/10 pt-6 text-center">
        <p className="text-sm italic" style={{ color: "#fae4a3" }}>
          <T v={{
            en: '"Programmability does not erase evolution. It adds intentionality to it."',
            zh: '"可编程性并不抹去进化。它为进化加上了意图性。"',
          }} />
        </p>
      </div>
    </div>
  );
}
