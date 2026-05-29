"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { EVOLUTION_FORCES, EVOLUTION_MODES, EvolutionForce, EvolutionMode } from "./content";
import { T, useLang } from "./lang";

/* ── palette ─────────────────────────────────────────────────── */
const JADE   = "#34dba8";
const GOLD   = "#e8c466";
const GOLD_L = "#f3d77c";
const ROSE   = "#ff89a4";
const VOID   = "#040f1a";

/* ── canvas constants ─────────────────────────────────────────── */
const W = 720;
const H = 260;
const POP_SIZE = 80;

/* ── seeded PRNG (no Math.random in render / init state) ─────── */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Organism = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fitness: number;
  flash: number;   // >0 = red flash,  <0 = gold flash
};

function buildPopulation(rng: () => number): Organism[] {
  return Array.from({ length: POP_SIZE }, () => ({
    x: 32 + rng() * (W - 64),
    y: 32 + rng() * (H - 64),
    vx: (rng() - 0.5) * 0.8,
    vy: (rng() - 0.5) * 0.8,
    fitness: rng(),
    flash: 0,
  }));
}

/* ── Part A: Selection Canvas ─────────────────────────────────── */
function SelectionCanvas({ speed, paused, onStats, resetTick }: {
  speed: number;
  paused: boolean;
  onStats: (gen: number, avg: number, best: number) => void;
  resetTick: number;
}) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);
  const orgRef      = useRef<Organism[]>([]);
  const genRef      = useRef(0);
  const frameRef    = useRef(0);
  const bestEverRef = useRef(0);
  const rngRef      = useRef<(() => number) | null>(null);

  const init = useCallback((seed: number) => {
    const rng = mulberry32(seed);
    rngRef.current = rng;
    orgRef.current = buildPopulation(rng);
    genRef.current = 0;
    frameRef.current = 0;
    bestEverRef.current = 0;
  }, []);

  // Initialize on mount and on reset
  useEffect(() => {
    init(42 + resetTick * 997);
  }, [init, resetTick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SELECTION_INTERVAL = Math.round(30 / speed);

    function drawFrame() {
      if (!ctx || !canvas) return;
      const orgs = orgRef.current;
      const rng = rngRef.current!;

      if (!paused) {
        frameRef.current++;

        // drift
        for (const o of orgs) {
          o.x += o.vx * speed;
          o.y += o.vy * speed;
          if (o.x < 12 || o.x > W - 12) { o.vx *= -1; o.x = Math.max(12, Math.min(W - 12, o.x)); }
          if (o.y < 12 || o.y > H - 12) { o.vy *= -1; o.y = Math.max(12, Math.min(H - 12, o.y)); }
          if (o.flash > 0) o.flash = Math.max(0, o.flash - 0.06 * speed);
          if (o.flash < 0) o.flash = Math.min(0, o.flash + 0.06 * speed);
          // random velocity nudge
          o.vx += (rng() - 0.5) * 0.06;
          o.vy += (rng() - 0.5) * 0.06;
          const spd = Math.sqrt(o.vx * o.vx + o.vy * o.vy);
          if (spd > 1.6) { o.vx *= 1.6 / spd; o.vy *= 1.6 / spd; }
        }

        // selection event every ~30 frames
        if (frameRef.current % SELECTION_INTERVAL === 0) {
          genRef.current++;
          const sorted = [...orgs].sort((a, b) => a.fitness - b.fitness);
          const cutoff = Math.floor(POP_SIZE * 0.3);

          // mark low-fitness red
          for (let i = 0; i < cutoff; i++) sorted[i].flash = 1;

          // replace with mutated clones of top
          const elite = sorted.slice(POP_SIZE - cutoff);
          for (let i = 0; i < cutoff; i++) {
            const parent = elite[Math.floor(rng() * elite.length)];
            const newFitness = Math.min(1, Math.max(0, parent.fitness + (rng() - 0.5) * 0.12));
            sorted[i].x = parent.x + (rng() - 0.5) * 30;
            sorted[i].y = parent.y + (rng() - 0.5) * 30;
            sorted[i].x = Math.max(12, Math.min(W - 12, sorted[i].x));
            sorted[i].y = Math.max(12, Math.min(H - 12, sorted[i].y));
            sorted[i].vx = (rng() - 0.5) * 0.8;
            sorted[i].vy = (rng() - 0.5) * 0.8;
            sorted[i].fitness = newFitness;
            sorted[i].flash = -1; // gold
          }

          const avg = orgs.reduce((s, o) => s + o.fitness, 0) / orgs.length;
          const best = Math.max(...orgs.map(o => o.fitness));
          if (best > bestEverRef.current) bestEverRef.current = best;
          onStats(genRef.current, avg, bestEverRef.current);
        }
      }

      // draw
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = VOID;
      ctx.fillRect(0, 0, W, H);

      // faint grid
      ctx.strokeStyle = "rgba(52,219,168,0.05)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += 60) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += 60) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      for (const o of orgs) {
        const r = 4 + o.fitness * 7;
        const alpha = 0.35 + o.fitness * 0.6;

        let color: string;
        if (o.flash > 0.05) {
          // red flash — dying
          color = `rgba(255,107,138,${Math.min(1, o.flash * 2)})`;
        } else if (o.flash < -0.05) {
          // gold flash — new clone
          color = `rgba(232,196,102,${Math.min(1, (-o.flash) * 2)})`;
        } else {
          // normal jade, brightness = fitness
          const g = Math.round(120 + o.fitness * 99);
          const b = Math.round(100 + o.fitness * 68);
          color = `rgba(52,${g},${b},${alpha})`;
        }

        // glow
        const grd = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, r * 2);
        grd.addColorStop(0, color);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(o.x, o.y, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(o.x, o.y, r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    }

    rafRef.current = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, speed, onStats]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className="w-full rounded-xl"
      style={{ height: "260px", display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ── Part B: Force card ────────────────────────────────────────── */
function ForceCard({ force }: { force: EvolutionForce }) {
  return (
    <div
      className="rounded-xl border bg-void-900/50 p-3 space-y-1.5 transition-all hover:bg-void-800/40"
      style={{ borderColor: force.accent + "44" }}
    >
      <div className="text-xs font-bold" style={{ color: force.accent }}>
        <T v={force.name} />
      </div>
      <div className="text-[11px] text-ghost-300 leading-snug">
        <T v={force.gloss} />
      </div>
      <div className="text-[11px] italic leading-snug" style={{ color: force.accent + "cc" }}>
        <T v={force.effect} />
      </div>
    </div>
  );
}

/* ── Part B: Mode pace bar ─────────────────────────────────────── */
const PACE_ORDER = ["natural", "artificial", "directed", "edited"] as const;
const PACE_POS: Record<string, number> = { natural: 0, artificial: 0.28, directed: 0.62, edited: 0.88 };

function ModeTimeline({ modes }: { modes: EvolutionMode[] }) {
  const { lang } = useLang();
  const ordered = PACE_ORDER.map(k => modes.find(m => m.key === k)!).filter(Boolean);

  return (
    <div className="space-y-4">
      {/* axis */}
      <div className="relative h-10 mx-2">
        {/* line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-vital-500/30 via-clinical-500/30 to-neuro-500/60" />
        {/* arrow head */}
        <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="10" height="8" viewBox="0 0 10 8" aria-hidden="true">
          <path d="M0 0 L10 4 L0 8 Z" fill="#9986ff" opacity={0.6} />
        </svg>
        {/* dots */}
        {ordered.map(m => {
          const pct = PACE_POS[m.key] * 100;
          return (
            <div
              key={m.key}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${pct}%` }}
            >
              <div
                className="w-3 h-3 rounded-full border-2 border-void-900"
                style={{ backgroundColor: m.accent }}
              />
            </div>
          );
        })}
        {/* axis labels */}
        <div className="absolute -bottom-5 left-0 text-[9px] font-mono text-ghost-500">
          {lang === "zh" ? "← 慢" : "← slow"}
        </div>
        <div className="absolute -bottom-5 right-2 text-[9px] font-mono text-ghost-500">
          {lang === "zh" ? "快 →" : "fast →"}
        </div>
      </div>

      {/* mode cards */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        {ordered.map(m => (
          <div
            key={m.key}
            className="rounded-lg border bg-void-900/50 p-3 space-y-1 hover:bg-void-800/40 transition-all"
            style={{ borderColor: m.accent + "55" }}
          >
            <div className="text-xs font-bold" style={{ color: m.accent }}>
              <T v={m.name} />
            </div>
            <div className="text-[11px] text-ghost-300 leading-snug">
              <T v={m.how} />
            </div>
            <div className="text-[10px] font-mono leading-snug" style={{ color: m.accent + "bb" }}>
              <T v={m.pace} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────────── */
export default function EvolutionSim() {
  const [speed, setSpeed]       = useState(1);
  const [paused, setPaused]     = useState(false);
  const [resetTick, setResetTick] = useState(0);
  const [gen, setGen]           = useState(0);
  const [avgFit, setAvgFit]     = useState(0);
  const [bestEver, setBestEver] = useState(0);

  const handleStats = useCallback((g: number, a: number, b: number) => {
    setGen(g);
    setAvgFit(a);
    setBestEver(b);
  }, []);

  return (
    <div className="holo rounded-2xl p-6 md:p-8 space-y-10">

      {/* ═══ PART A: Selection in Action ══════════════════════════ */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-vital-300">
            <T v={{ en: "Selection in Action", zh: "选择正在发生" }} />
          </h2>
          <p className="text-sm text-ghost-400 mt-1">
            <T v={{ en: "A toy population evolves under selection pressure.", zh: "一个玩具种群，在选择压力下进化。" }} />
          </p>
        </div>

        {/* canvas + stats overlay */}
        <div className="relative rounded-xl border border-vital-500/15 bg-void-950/80 overflow-hidden">
          <SelectionCanvas
            speed={speed}
            paused={paused}
            onStats={handleStats}
            resetTick={resetTick}
          />

          {/* stats overlay */}
          <div className="absolute top-3 right-3 flex flex-col items-end gap-0.5 pointer-events-none select-none">
            <div className="font-mono text-[10px] text-ghost-500">
              {gen === 0 ? "GEN —" : `GEN ${gen}`}
            </div>
            <div className="font-mono text-[11px]" style={{ color: GOLD_L }}>
              AVG {(avgFit * 100).toFixed(1)}%
            </div>
            <div className="font-mono text-[11px]" style={{ color: JADE }}>
              BEST {(bestEver * 100).toFixed(1)}%
            </div>
          </div>

          {/* legend */}
          <div className="absolute bottom-3 left-3 flex gap-3 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: JADE }} />
              <span className="text-[9px] font-mono text-ghost-400">
                <T v={{ en: "high fitness", zh: "高适应度" }} />
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-pulse-400" />
              <span className="text-[9px] font-mono text-ghost-400">
                <T v={{ en: "eliminated", zh: "被淘汰" }} />
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
              <span className="text-[9px] font-mono text-ghost-400">
                <T v={{ en: "new clone", zh: "新克隆" }} />
              </span>
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* play/pause */}
          <button
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? "Play" : "Pause"}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-vital-500/30 text-vital-400 text-xs font-mono hover:bg-vital-500/10 transition"
          >
            {paused ? (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                  <path d="M2 1 L9 5 L2 9 Z" />
                </svg>
                <T v={{ en: "PLAY", zh: "播放" }} />
              </>
            ) : (
              <>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="1" width="3" height="8" rx="0.8" />
                  <rect x="6" y="1" width="3" height="8" rx="0.8" />
                </svg>
                <T v={{ en: "PAUSE", zh: "暂停" }} />
              </>
            )}
          </button>

          {/* reset */}
          <button
            onClick={() => setResetTick(t => t + 1)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-bio-500/30 text-bio-400 text-xs font-mono hover:bg-bio-500/10 transition"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 5 A4 4 0 1 1 4 9" strokeLinecap="round" />
              <polyline points="1,2 1,5 4,5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <T v={{ en: "RESET", zh: "重置" }} />
          </button>

          {/* speed */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[10px] font-mono text-ghost-500">
              <T v={{ en: "SPEED", zh: "速度" }} />
            </span>
            <input
              type="range"
              min={0.5}
              max={4}
              step={0.5}
              value={speed}
              onChange={e => setSpeed(Number(e.target.value))}
              className="w-24 accent-vital-500"
              aria-label="Simulation speed"
            />
            <span className="text-[10px] font-mono w-8" style={{ color: GOLD_L }}>
              {speed}×
            </span>
          </div>
        </div>
      </section>

      {/* ═══ PART B: Six Forces, Four Modes ══════════════════════ */}
      <section className="space-y-5">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-vital-300">
            <T v={{ en: "Six Forces of Evolution, Four Modes of Steering", zh: "进化的六种力，引导的四种模式" }} />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left — 6 forces */}
          <div className="space-y-2">
            <div className="label-mono mb-3">
              <T v={{ en: "Forces", zh: "六种力" }} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {EVOLUTION_FORCES.map((f: EvolutionForce) => (
                <ForceCard key={f.key} force={f} />
              ))}
            </div>
          </div>

          {/* Right — 4 modes on a pace axis */}
          <div className="space-y-2">
            <div className="label-mono mb-3">
              <T v={{ en: "Modes", zh: "四种模式" }} />
            </div>
            <ModeTimeline modes={EVOLUTION_MODES} />
          </div>
        </div>
      </section>

      {/* ═══ Caption ══════════════════════════════════════════════ */}
      <p className="text-sm italic text-center leading-relaxed" style={{ color: GOLD + "cc" }}>
        <T v={{
          en: '"Natural selection is hindsight. Gene editing is foresight. Both are forms of writing."',
          zh: '"自然选择是事后诸葛亮。基因编辑是远见。两者都是书写。"',
        }} />
      </p>

    </div>
  );
}
