"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CRISPR_STEPS, CRISPR_TOOLS, CrisprStep, CrisprTool } from "./content";
import { T, useLang } from "./lang";

/* ─── helpers ─────────────────────────────────────────────────── */
const W = 720;
const H = 260;
const MID = H / 2;

/** SVG sin-wave y at position x (px along the strand). */
function wave(x: number, phase: number, amp = 22, period = 48): number {
  return MID + amp * Math.sin((2 * Math.PI * x) / period + phase);
}

/** Fixed rung x positions across the helix */
const RUNG_XS: number[] = Array.from({ length: 22 }, (_, i) => 28 + i * 31);

/* ─── Part A: Animated CRISPR SVG ────────────────────────────── */
function HelixDiagram({
  step,
  progress,
}: {
  step: number;
  progress: number;
}) {
  // Build helix path points
  const strandA = Array.from({ length: W }, (_, x) => ({ x, y: wave(x, 0) }));
  const strandB = Array.from({ length: W }, (_, x) => ({ x, y: wave(x, Math.PI) }));

  function toPath(pts: { x: number; y: number }[]): string {
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  }

  // Target zone: centre of SVG ± 10 bases wide (~155px)
  const targetX = 320;
  const targetW = 80;
  const pamX = targetX + targetW + 4;
  const pamW = 24;

  // Cas9 x position: step 1→0%, 2→12%, 3→scan along, 4→on target, 5→same, 6→same
  const casProgress =
    step === 0 ? -0.08 :
    step === 1 ? 0.12 :
    step === 2 ? 0.1 + progress * 0.3 :
    0.55;
  const casX = casProgress * W;
  const casY = MID - 40;

  // Split helix on step 3 (cut)
  const split = step === 3 ? progress : step >= 4 ? 1 : 0;

  // Repair dots (step 4)
  const repairDots = [0.15, 0.35, 0.65, 0.85].map((t) => ({
    x: targetX + targetW / 2 + (t - 0.5) * 60,
    y: MID - 16 + t * 32,
    opacity: step === 4 ? Math.min(1, progress * 2) * (1 - Math.abs(t - 0.5) * 0.8) : 0,
  }));

  // Checkmark (step 5)
  const checkOpacity = step === 5 ? Math.min(1, progress * 2) : 0;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ height: "260px" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="targetGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34dba8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#34dba8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cutFlash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3d77c" stopOpacity={0.5 * split} />
          <stop offset="100%" stopColor="#f3d77c" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background lane */}
      <rect x="0" y="0" width={W} height={H} fill="transparent" />

      {/* Target zone glow */}
      {step >= 2 && (
        <ellipse
          cx={targetX + targetW / 2}
          cy={MID}
          rx={targetW * 0.8}
          ry={36}
          fill="url(#targetGlow)"
        />
      )}

      {/* Cut flash */}
      {step === 3 && split > 0.1 && (
        <ellipse
          cx={targetX + targetW / 2}
          cy={MID}
          rx={targetW * split}
          ry={30 * split}
          fill="url(#cutFlash)"
        />
      )}

      {/* DNA rungs */}
      {RUNG_XS.map((rx) => {
        const inTarget = rx >= targetX && rx <= targetX + targetW;
        const inPam = rx >= pamX && rx <= pamX + pamW;
        const splitOffset = inTarget ? split * 14 : 0;
        const y1 = wave(rx, 0) + splitOffset;
        const y2 = wave(rx, Math.PI) - splitOffset;
        return (
          <line
            key={rx}
            x1={rx}
            y1={y1}
            x2={rx}
            y2={y2}
            stroke={inPam ? "#e8c466" : inTarget ? "#34dba8" : "#2a4a5a"}
            strokeWidth={inTarget || inPam ? 2 : 1.2}
            strokeOpacity={inTarget || inPam ? 1 : 0.5}
          />
        );
      })}

      {/* Strand A (with optional split) */}
      {split > 0 ? (
        <>
          {/* left of cut */}
          <path
            d={toPath(strandA.filter((p) => p.x < targetX))}
            fill="none"
            stroke="#34dba8"
            strokeWidth={2}
            strokeOpacity={0.85}
          />
          {/* right of cut */}
          <path
            d={toPath(strandA.filter((p) => p.x > targetX + targetW))}
            fill="none"
            stroke="#34dba8"
            strokeWidth={2}
            strokeOpacity={0.85}
          />
          {/* target segment — shift up */}
          <path
            d={toPath(
              strandA
                .filter((p) => p.x >= targetX && p.x <= targetX + targetW)
                .map((p) => ({ x: p.x, y: p.y - split * 10 }))
            )}
            fill="none"
            stroke="#34dba8"
            strokeWidth={2.5}
            filter="url(#glow)"
          />
        </>
      ) : (
        <path
          d={toPath(strandA)}
          fill="none"
          stroke="#34dba8"
          strokeWidth={2}
          strokeOpacity={0.85}
        />
      )}

      {/* Strand B */}
      {split > 0 ? (
        <>
          <path
            d={toPath(strandB.filter((p) => p.x < targetX))}
            fill="none"
            stroke="#5ee5be"
            strokeWidth={2}
            strokeOpacity={0.65}
          />
          <path
            d={toPath(strandB.filter((p) => p.x > targetX + targetW))}
            fill="none"
            stroke="#5ee5be"
            strokeWidth={2}
            strokeOpacity={0.65}
          />
          <path
            d={toPath(
              strandB
                .filter((p) => p.x >= targetX && p.x <= targetX + targetW)
                .map((p) => ({ x: p.x, y: p.y + split * 10 }))
            )}
            fill="none"
            stroke="#5ee5be"
            strokeWidth={2.5}
            filter="url(#glow)"
          />
        </>
      ) : (
        <path
          d={toPath(strandB)}
          fill="none"
          stroke="#5ee5be"
          strokeWidth={2}
          strokeOpacity={0.65}
        />
      )}

      {/* Target label */}
      {step >= 2 && (
        <text
          x={targetX + targetW / 2}
          y={MID + 52}
          textAnchor="middle"
          fontSize="10"
          fill="#34dba8"
          fontFamily="monospace"
          opacity={0.9}
        >
          TARGET
        </text>
      )}

      {/* PAM motif label */}
      {step >= 2 && (
        <>
          <rect
            x={pamX - 2}
            y={MID - 30}
            width={pamW + 4}
            height={60}
            rx={3}
            fill="#e8c46612"
            stroke="#e8c466"
            strokeWidth={1}
            strokeOpacity={0.6}
          />
          <text
            x={pamX + pamW / 2}
            y={MID + 52}
            textAnchor="middle"
            fontSize="9"
            fill="#e8c466"
            fontFamily="monospace"
          >
            PAM
          </text>
        </>
      )}

      {/* gRNA blueprint (step 0) */}
      {step === 0 && (
        <g opacity={Math.min(1, progress * 3)}>
          <rect
            x={targetX - 10}
            y={MID - 90}
            width={targetW + 20}
            height={30}
            rx={4}
            fill="#34dba822"
            stroke="#34dba8"
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />
          <text
            x={targetX + targetW / 2}
            y={MID - 70}
            textAnchor="middle"
            fontSize="10"
            fill="#34dba8"
            fontFamily="monospace"
          >
            gRNA blueprint
          </text>
          <line
            x1={targetX + targetW / 2}
            y1={MID - 60}
            x2={targetX + targetW / 2}
            y2={MID - 32}
            stroke="#34dba8"
            strokeWidth={1}
            strokeDasharray="3 2"
            strokeOpacity={0.6}
          />
        </g>
      )}

      {/* Cas9 protein body (steps 1-5) */}
      {step >= 1 && step <= 5 && casX > -60 && (
        <g transform={`translate(${casX},${casY})`} filter={step === 3 ? "url(#glow)" : undefined}>
          {/* Rounded body */}
          <rect x="-24" y="0" width="48" height="36" rx="8"
            fill={step === 3 ? "#f3d77c22" : "#34dba811"}
            stroke={step === 3 ? "#f3d77c" : "#34dba8"}
            strokeWidth={step === 3 ? 2.5 : 1.5}
          />
          {/* Scissor jaws (left) */}
          <path d="M-24 18 Q-40 12 -38 6 Q-32 2 -20 10"
            fill="none"
            stroke={step === 3 ? "#f3d77c" : "#34dba8"}
            strokeWidth={step === 3 ? 2 : 1.5}
          />
          {/* Scissor jaws (right) */}
          <path d="M-24 18 Q-40 24 -38 30 Q-32 34 -20 26"
            fill="none"
            stroke={step === 3 ? "#f3d77c" : "#34dba8"}
            strokeWidth={step === 3 ? 2 : 1.5}
          />
          {/* gRNA dangling strand */}
          <path d={`M-4 0 Q4 -12 10 -24 Q14 -34 20 -38`}
            fill="none"
            stroke="#5ddcff"
            strokeWidth={1.5}
            strokeDasharray="3 2"
            strokeOpacity={0.85}
          />
          <circle cx="20" cy="-38" r="3" fill="#5ddcff" opacity={0.8} />
          <text x="0" y="24" textAnchor="middle" fontSize="8" fill={step === 3 ? "#f3d77c" : "#34dba8"} fontFamily="monospace">
            Cas9
          </text>
        </g>
      )}

      {/* Repair dots (step 4) */}
      {repairDots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={4}
          fill="#9986ff"
          opacity={d.opacity}
          filter="url(#glow)"
        />
      ))}

      {/* Checkmark + sequence readout (step 5) */}
      {step === 5 && (
        <g opacity={checkOpacity}>
          <circle cx={targetX + targetW / 2} cy={MID - 70} r={18} fill="#34dba822" stroke="#34dba8" strokeWidth={1.5} />
          <path
            d={`M${targetX + targetW / 2 - 9} ${MID - 70} l6 6 l12 -12`}
            fill="none"
            stroke="#34dba8"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
          <text
            x={targetX + targetW / 2}
            y={MID - 98}
            textAnchor="middle"
            fontSize="9"
            fill="#34dba8"
            fontFamily="monospace"
          >
            EDIT CONFIRMED
          </text>
        </g>
      )}
    </svg>
  );
}

/* ─── Tool SVG icons ─────────────────────────────────────────── */
function ToolIcon({ toolKey, accent }: { toolKey: string; accent: string }) {
  const s = { fill: "none", stroke: accent, strokeWidth: 1.5, strokeLinecap: "round" as const };

  if (toolKey === "cas9") return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="10" {...s} />
      <path d="M10 16 Q8 11 6 9 Q4 7 6 6 Q8 5 9 8" {...s} />
      <path d="M10 16 Q8 21 6 23 Q4 25 6 26 Q8 27 9 24" {...s} />
      <line x1="10" y1="16" x2="22" y2="16" {...s} />
    </svg>
  );

  if (toolKey === "base") return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <text x="4" y="14" fontSize="8" fill={accent} fontFamily="monospace">NH₂</text>
      <path d="M14 14 l4 0" stroke={accent} strokeWidth={1.5} />
      <text x="18" y="14" fontSize="8" fill={accent} fontFamily="monospace">OH</text>
      <path d="M8 17 q8 6 16 0" {...s} />
      <path d="M8 17 q8 -6 16 0" {...s} strokeOpacity={0.4} />
    </svg>
  );

  if (toolKey === "prime") return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 24 L16 6 L24 24" {...s} />
      <line x1="11" y1="18" x2="21" y2="18" {...s} />
      <line x1="24" y1="24" x2="24" y2="28" stroke={accent} strokeWidth={2.5} strokeLinecap="round" />
      <circle cx="24" cy="28" r="1.5" fill={accent} />
    </svg>
  );

  if (toolKey === "cas12") return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <polygon points="16,5 28,24 4,24" {...s} />
      <line x1="16" y1="24" x2="16" y2="30" {...s} />
      <path d="M10 30 l6 -6 l6 6" {...s} />
    </svg>
  );

  // epi
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6 16 Q16 8 26 16 Q16 24 6 16 Z" {...s} />
      <circle cx="26" cy="16" r="2.5" fill={accent} opacity={0.7} />
      <text x="22" y="10" fontSize="7" fill={accent} fontFamily="monospace">-CH₃</text>
    </svg>
  );
}

/* ─── Part C: Off-target scan ────────────────────────────────── */
function OffTargetScan() {
  const { lang } = useLang();
  const TOTAL = 52;
  const targetIdx = 27;
  const offTargets = [8, 40, 46];

  const ticks = Array.from({ length: TOTAL }, (_, i) => i);

  return (
    <div className="space-y-3">
      <svg viewBox={`0 ${0} ${W} 80`} className="w-full" style={{ height: "80px" }} aria-hidden="true">
        {/* Base line */}
        <line x1="20" y1="40" x2={W - 20} y2="40" stroke="#2a4a5a" strokeWidth="1.5" />

        {ticks.map((i) => {
          const x = 20 + (i / (TOTAL - 1)) * (W - 40);
          const isTarget = i === targetIdx;
          const isOff = offTargets.includes(i);

          if (isTarget) {
            return (
              <g key={i}>
                <line x1={x} y1="20" x2={x} y2="60" stroke="#e8c466" strokeWidth="3" />
                <circle cx={x} cy="40" r="7" fill="#e8c46620" stroke="#e8c466" strokeWidth="1.5">
                  <animate attributeName="r" values="7;11;7" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x={x} y="14" textAnchor="middle" fontSize="8" fill="#e8c466" fontFamily="monospace">TARGET</text>
              </g>
            );
          }

          if (isOff) {
            return (
              <g key={i}>
                <line x1={x} y1="28" x2={x} y2="52" stroke="#ff89a4" strokeWidth="2" />
                <circle cx={x} cy="40" r="4" fill="#ff89a420" stroke="#ff89a4" strokeWidth="1.2">
                  <animate attributeName="r" values="4;7;4" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="1;0.2;1" dur={`${1.8 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
                <text x={x} y="70" textAnchor="middle" fontSize="7" fill="#ff89a4" fontFamily="monospace">off</text>
              </g>
            );
          }

          return (
            <line key={i} x1={x} y1="35" x2={x} y2="45" stroke="#2a4a5a" strokeWidth="1" strokeOpacity="0.7" />
          );
        })}
      </svg>

      <p className="text-xs text-ghost-400 leading-relaxed max-w-2xl">
        <T v={{
          en: "Every edit is a probabilistic event. The newer tools cut at far fewer places they shouldn't — but never zero.",
          zh: "每一次编辑都是一个概率事件。更新一代的工具，会在远远更少的「不该切的位置」切——但永远不是零。",
        }} />
      </p>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */
export default function CRISPRLab() {
  const { lang } = useLang();

  // Step state
  const [activeStep, setActiveStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0-1 within current step

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const stepDuration = 3000; // ms per step

  const STEP_COUNT = CRISPR_STEPS.length;

  // Animation loop
  const tick = useCallback(
    (ts: number) => {
      if (startTimeRef.current === null) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current;
      const stepProgress = Math.min(elapsed / stepDuration, 1);
      setProgress(stepProgress);

      if (stepProgress >= 1) {
        setActiveStep((prev) => (prev + 1) % STEP_COUNT);
        startTimeRef.current = ts;
        setProgress(0);
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [STEP_COUNT]
  );

  useEffect(() => {
    if (playing) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    }
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, tick]);

  function jumpToStep(i: number) {
    setActiveStep(i);
    setProgress(0);
    setPlaying(false);
    startTimeRef.current = null;
  }

  const currentStep = CRISPR_STEPS[activeStep];

  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-10">

      {/* ═══ PART A — How CRISPR Edits a Genome ══════════════════ */}
      <section className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-vital-300">
              <T v={{ en: "How CRISPR Edits a Genome", zh: "CRISPR 如何编辑一个基因组" }} />
            </h2>
            <p className="text-sm text-ghost-400 mt-1">
              <T v={{ en: "Six steps from sequence to edit.", zh: "从序列到编辑的六个步骤。" }} />
            </p>
          </div>
          {/* Pause / play */}
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="flex-shrink-0 w-9 h-9 rounded-full border border-vital-500/30 flex items-center justify-center text-vital-400 hover:bg-vital-500/10 transition"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <rect x="2" y="1" width="4" height="12" rx="1" />
                <rect x="8" y="1" width="4" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <path d="M3 1.5 L12 7 L3 12.5 Z" />
              </svg>
            )}
          </button>
        </div>

        {/* Animated diagram */}
        <div className="rounded-xl border border-vital-500/15 bg-void-950/60 overflow-hidden">
          <HelixDiagram step={activeStep} progress={progress} />
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CRISPR_STEPS.map((s: CrisprStep, i: number) => {
            const active = i === activeStep;
            return (
              <button
                key={s.num}
                onClick={() => jumpToStep(i)}
                className={`text-left rounded-lg p-3 border transition-all ${
                  active
                    ? "border-bio-400 bg-vital-500/10"
                    : "border-void-700/40 bg-void-900/40 hover:border-vital-500/30"
                }`}
                style={active ? { borderColor: s.accent } : {}}
              >
                <div
                  className="text-xs font-mono mb-1"
                  style={{ color: s.accent }}
                >
                  {s.num}
                </div>
                <div
                  className="text-xs font-semibold leading-tight mb-1"
                  style={{ color: active ? s.accent : "#94a3b8" }}
                >
                  <T v={s.name} />
                </div>
                <div className="text-[10px] text-ghost-500 leading-snug line-clamp-2">
                  <T v={s.what} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active step label */}
        <div className="flex items-center gap-3 pl-1">
          <span
            className="text-sm font-mono font-bold"
            style={{ color: currentStep.accent }}
          >
            {currentStep.num}
          </span>
          <span className="text-sm text-ghost-200 font-medium">
            <T v={currentStep.name} />
          </span>
          <span className="text-xs text-ghost-500">—</span>
          <span className="text-xs text-ghost-400">
            <T v={currentStep.what} />
          </span>
        </div>
      </section>

      {/* ═══ PART B — Five Tools, One Family ═════════════════════ */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-vital-300">
            <T v={{ en: "Five Tools, One Family", zh: "五种工具，一个家族" }} />
          </h2>
          <p className="text-sm text-ghost-400 mt-1">
            <T v={{ en: "Each tool trades precision against payload.", zh: "每种工具，都在精度与载荷之间作权衡。" }} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRISPR_TOOLS.map((tool: CrisprTool) => (
            <div
              key={tool.key}
              className="rounded-xl border bg-void-900/50 p-4 space-y-3 transition-all hover:bg-void-800/50"
              style={{ borderColor: tool.accent + "44" }}
            >
              {/* Icon + name */}
              <div className="flex items-center gap-2">
                <ToolIcon toolKey={tool.key} accent={tool.accent} />
                <span
                  className="text-sm font-bold leading-tight"
                  style={{ color: tool.accent }}
                >
                  <T v={tool.name} />
                </span>
              </div>

              {/* Cuts */}
              <div>
                <div className="text-[10px] text-ghost-500 uppercase tracking-wider mb-0.5">
                  {lang === "zh" ? "切割方式" : "Cuts"}
                </div>
                <div className="text-xs text-ghost-300">
                  <T v={tool.cuts} />
                </div>
              </div>

              {/* Precision bar */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] text-ghost-500 uppercase tracking-wider">
                    {lang === "zh" ? "精度" : "Precision"}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: tool.accent }}>
                    {tool.precision}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-void-700/60 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${tool.precision}%`, backgroundColor: tool.accent }}
                  />
                </div>
              </div>

              {/* Payload */}
              <div>
                <div className="text-[10px] text-ghost-500 uppercase tracking-wider mb-0.5">
                  {lang === "zh" ? "载荷" : "Payload"}
                </div>
                <div className="text-xs text-ghost-300">
                  <T v={tool.payload} />
                </div>
              </div>

              {/* Use for */}
              <div>
                <div className="text-[10px] text-ghost-500 uppercase tracking-wider mb-0.5">
                  {lang === "zh" ? "用于" : "Use for"}
                </div>
                <div className="text-xs text-ghost-400 italic">
                  <T v={tool.useFor} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PART C — Off-Target Watch ════════════════════════════ */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-vital-300">
            <T v={{ en: "The Off-Target Problem", zh: "脱靶问题" }} />
          </h2>
        </div>
        <div className="rounded-xl border border-pulse-500/20 bg-void-950/60 p-4">
          <OffTargetScan />
        </div>
      </section>

    </div>
  );
}
