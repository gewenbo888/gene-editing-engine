"use client";

import { useEffect, useRef, useState } from "react";
import { CODE_LAYERS, CodeLayer } from "./content";
import { T, useLang } from "./lang";

/* ── palette ─────────────────────────────────────────────────────────────── */
const JADE   = "#34dba8";
const GOLD   = "#e8c466";
const CYAN   = "#5ddcff";
const VIOLET = "#9986ff";
const ROSE   = "#ff6b8a";

const BASE_COLOR: Record<string, string> = { A: JADE, T: GOLD, G: VIOLET, C: CYAN };
const BASES = ["A", "T", "G", "C"] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   HERO MODE
═══════════════════════════════════════════════════════════════════════════ */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return `rgb(${Math.round(ar + (br - ar) * t)},${Math.round(ag + (bg - ag) * t)},${Math.round(ab + (bb - ab) * t)})`;
}

type Glyph = { x: number; y: number; letter: string; phase: number; speed: number; drift: number; alpha: number };
type EditEvent = { rungIdx: number; timer: number; phase: "idle" | "flash" | "swap"; newPair: [string, string] };

function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const frameRef  = useRef<number>(0);

  // stable rung pairs (seeded, not random)
  const RUNG_PAIRS = useRef<Array<[string, string]>>(
    Array.from({ length: 25 }, (_, i) => {
      const pairs: Array<[string, string]> = [["A","T"],["T","A"],["G","C"],["C","G"]];
      return pairs[i % 4];
    })
  );

  // stable glyph list
  const GLYPHS = useRef<Glyph[]>(
    Array.from({ length: 70 }, (_, i) => ({
      x: ((i * 137.5) % 50) / 100,          // left 50% of width
      y: ((i * 61.8) % 100) / 100,
      letter: BASES[i % 4],
      phase: (i * 0.41) % (Math.PI * 2),
      speed: 0.004 + (i % 7) * 0.0008,
      drift: (((i * 53) % 100) / 100 - 0.5) * 0.00015,
      alpha: 0,
    }))
  );

  const EDIT_EVENTS = useRef<EditEvent[]>(
    Array.from({ length: 6 }, (_, i) => ({
      rungIdx: (i * 4 + 2) % 25,
      timer: i * 300 + 100,
      phase: "idle" as const,
      newPair: [["G","C"],["A","T"],["T","A"],["C","G"],["G","C"],["T","A"]][i] as [string,string],
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    function draw() {
      if (!ctx || W === 0 || H === 0) return;
      ctx.clearRect(0, 0, W, H);
      const f = frameRef.current++;

      /* ── helix ──────────────────────────────────────────────────────────── */
      const helixCX = W * 0.72;
      const helixHalfW = W * 0.14;
      const numRungs = 25;
      const rungSpacing = H / (numRungs + 1);
      const phase = f * 0.008;

      // update edit events
      for (const ev of EDIT_EVENTS.current) {
        ev.timer--;
        if (ev.timer <= 0) {
          if (ev.phase === "idle") { ev.phase = "flash"; ev.timer = 40; }
          else if (ev.phase === "flash") { ev.phase = "swap"; RUNG_PAIRS.current[ev.rungIdx] = ev.newPair; ev.timer = 30; }
          else { ev.phase = "idle"; ev.timer = 360 + (ev.rungIdx * 43) % 120; }
        }
      }

      const flashSet = new Set<number>();
      for (const ev of EDIT_EVENTS.current) {
        if (ev.phase === "flash" || ev.phase === "swap") flashSet.add(ev.rungIdx);
      }

      for (let i = 0; i < numRungs; i++) {
        const y = rungSpacing * (i + 1);
        const theta = phase + (i / numRungs) * Math.PI * 4;
        const x1 = helixCX + Math.sin(theta) * helixHalfW;
        const x2 = helixCX + Math.sin(theta + Math.PI) * helixHalfW;

        const pair = RUNG_PAIRS.current[i];
        const c1 = BASE_COLOR[pair[0]];
        const c2 = BASE_COLOR[pair[1]];

        // rung
        const isFlash = flashSet.has(i);
        if (isFlash) {
          ctx.strokeStyle = GOLD;
          ctx.lineWidth = 2.5;
          ctx.globalAlpha = 0.95;
          ctx.shadowColor = GOLD;
          ctx.shadowBlur = 14;
        } else {
          const grad = ctx.createLinearGradient(x1, y, x2, y);
          grad.addColorStop(0, c1);
          grad.addColorStop(1, c2);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = 0.55;
          ctx.shadowBlur = 0;
        }
        ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y); ctx.stroke();
        ctx.shadowBlur = 0;

        // base labels on rungs
        ctx.globalAlpha = 0.7;
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = c1;
        ctx.fillText(pair[0], x1 - (x1 < helixCX ? 16 : 6), y + 4);
        ctx.fillStyle = c2;
        ctx.fillText(pair[1], x2 - (x2 < helixCX ? 16 : 6), y + 4);
      }

      // strands
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        ctx.globalAlpha = 0.7;
        for (let i = 0; i <= numRungs + 1; i++) {
          const y = rungSpacing * i;
          const theta = phase + (i / numRungs) * Math.PI * 4;
          const x = helixCX + Math.sin(theta + pass * Math.PI) * helixHalfW;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const t = (f * 0.004 + pass * 0.5) % 1;
        const strandColor = lerpColor(JADE, GOLD, Math.abs(Math.sin(t * Math.PI)));
        ctx.strokeStyle = strandColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      /* ── drifting glyphs ────────────────────────────────────────────────── */
      ctx.font = "bold 15px monospace";
      for (const g of GLYPHS.current) {
        g.phase += g.speed;
        g.x = Math.max(0.01, Math.min(0.48, g.x + g.drift * Math.sin(g.phase * 0.3)));
        g.alpha = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(g.phase));
        ctx.globalAlpha = g.alpha;
        ctx.fillStyle = BASE_COLOR[g.letter];
        ctx.fillText(g.letter, g.x * W, g.y * H);
      }

      /* ── vignette ───────────────────────────────────────────────────────── */
      ctx.globalAlpha = 1;
      const vig = ctx.createRadialGradient(W * 0.28, H * 0.45, 0, W * 0.28, H * 0.45, W * 0.55);
      vig.addColorStop(0,   "rgba(2,8,14,0)");
      vig.addColorStop(0.6, "rgba(2,8,14,0.25)");
      vig.addColorStop(1,   "rgba(2,8,14,0.75)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
      aria-hidden
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE MODE — layer schematic SVG
═══════════════════════════════════════════════════════════════════════════ */
function LayerSchematic({ layer }: { layer: CodeLayer }) {
  const c = layer.accent;
  const [r, g, b] = hexToRgb(c);
  const glow = `drop-shadow(0 0 8px rgba(${r},${g},${b},0.7))`;

  if (layer.key === "atom") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      <circle cx="180" cy="180" r="12" fill={c} opacity="0.9"/>
      {([0,1,2] as const).map(i => {
        const rx = 72 + i * 12; const ry = 38 + i * 8;
        const rot = i * 60;
        return <ellipse key={i} cx="180" cy="180" rx={rx} ry={ry} fill="none" stroke={c} strokeWidth="1.5" strokeOpacity="0.5" transform={`rotate(${rot},180,180)`}/>;
      })}
      {([0,1,2] as const).map(i => {
        const rx = 72 + i * 12; const ry = 38 + i * 8; const rot = i * 60;
        const angle = (i * 120) * Math.PI / 180;
        const ex = 180 + rx * Math.cos(angle) * Math.cos(rot * Math.PI/180) - ry * Math.sin(angle) * Math.sin(rot * Math.PI/180);
        const ey = 180 + rx * Math.cos(angle) * Math.sin(rot * Math.PI/180) + ry * Math.sin(angle) * Math.cos(rot * Math.PI/180);
        return <circle key={i} cx={ex} cy={ey} r="7" fill={GOLD} opacity="0.85"/>;
      })}
      <text x="180" y="308" textAnchor="middle" fill={c} fontSize="13" fontFamily="monospace" opacity="0.6">C · H · O · N · P</text>
    </svg>
  );

  if (layer.key === "base") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      {(["A","T","G","C"] as const).map((b,i) => {
        const positions = [[110,120],[250,120],[110,240],[250,240]];
        const [bx,by] = positions[i];
        return (
          <g key={b}>
            <circle cx={bx} cy={by} r="36" fill={`rgba(${hexToRgb(BASE_COLOR[b]).join(",")},0.12)`} stroke={BASE_COLOR[b]} strokeWidth="1.5"/>
            <text x={bx} y={by+12} textAnchor="middle" fill={BASE_COLOR[b]} fontSize="32" fontFamily="monospace" fontWeight="bold" style={{filter:glow}}>{b}</text>
          </g>
        );
      })}
      <line x1="146" y1="120" x2="214" y2="120" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5"/>
      <line x1="146" y1="240" x2="214" y2="240" stroke={GOLD} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5"/>
    </svg>
  );

  if (layer.key === "codon") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      {(["A","U","G"] as const).map((b,i) => {
        const col = BASE_COLOR[b === "U" ? "T" : b];
        const bx = 90 + i * 90;
        return (
          <g key={i}>
            <rect x={bx-28} y={130} width="56" height="56" rx="8" fill={`rgba(${hexToRgb(col).join(",")},0.12)`} stroke={col} strokeWidth="1.5"/>
            <text x={bx} y={168} textAnchor="middle" fill={col} fontSize="28" fontFamily="monospace" fontWeight="bold">{b}</text>
          </g>
        );
      })}
      <path d="M90,200 Q180,240 270,200" fill="none" stroke={GOLD} strokeWidth="1.5"/>
      <text x="180" y="275" textAnchor="middle" fill={GOLD} fontSize="15" fontFamily="monospace">Methionine · Met</text>
      <text x="180" y="295" textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="monospace" opacity="0.5">Start codon</text>
    </svg>
  );

  if (layer.key === "gene") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      <rect x="30" y="160" width="300" height="40" rx="4" fill={`rgba(${hexToRgb(c).join(",")},0.1)`} stroke={c} strokeWidth="1.5"/>
      {(["A","T","G","C","A","G","T","C","G","A","T","G","C","G","A","T","G","C","A","T"] as const).map((b,i) => (
        <text key={i} x={45+i*14} y={184} fill={BASE_COLOR[b]} fontSize="11" fontFamily="monospace" fontWeight="bold">{b}</text>
      ))}
      <polygon points="30,155 44,148 44,162" fill={JADE}/>
      <text x="22" y="143" fill={JADE} fontSize="11" fontFamily="monospace">ATG</text>
      <polygon points="330,155 316,148 316,162" fill={ROSE}/>
      <text x="318" y="143" fill={ROSE} fontSize="10" fontFamily="monospace">STOP</text>
      <text x="180" y="232" textAnchor="middle" fill={c} fontSize="13" fontFamily="monospace" opacity="0.7">~1,000 – 100,000 bases</text>
    </svg>
  );

  if (layer.key === "protein") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      {[180,158,136,148,170,192,210,200,178,156,140,152,174,196,208].map((y,i) => {
        const x = 40 + i * 20;
        return (
          <g key={i}>
            {i > 0 && <line x1={x-20} y1={[180,158,136,148,170,192,210,200,178,156,140,152,174,196,208][i-1]} x2={x} y2={y} stroke={c} strokeWidth="2" opacity="0.6"/>}
            <circle cx={x} cy={y} r="8" fill={`rgba(${hexToRgb(c).join(",")},0.15)`} stroke={c} strokeWidth="1.5" opacity="0.85"/>
          </g>
        );
      })}
      <text x="180" y="300" textAnchor="middle" fill={c} fontSize="13" fontFamily="monospace" opacity="0.7">folded polypeptide chain</text>
    </svg>
  );

  if (layer.key === "chrom") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      <path d="M130,60 Q100,110 130,160 Q160,210 130,260 Q100,310 130,300" fill="none" stroke={c} strokeWidth="14" strokeLinecap="round" opacity="0.9"/>
      <path d="M230,60 Q260,110 230,160 Q200,210 230,260 Q260,310 230,300" fill="none" stroke={c} strokeWidth="14" strokeLinecap="round" opacity="0.9"/>
      <line x1="130" y1="178" x2="230" y2="178" stroke={GOLD} strokeWidth="4" strokeLinecap="round"/>
      {[90,130,190,240,280].map((y,i) => (
        <g key={i}>
          <circle cx={130} cy={y} r="8" fill={GOLD} opacity="0.6"/>
          <circle cx={230} cy={y} r="8" fill={GOLD} opacity="0.6"/>
        </g>
      ))}
    </svg>
  );

  if (layer.key === "genome") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      {Array.from({length:23},(_,i) => {
        const x = 18 + i * 14;
        const h = 60 + (i % 5) * 28;
        const top = 190 - h/2;
        const accent2 = [JADE,CYAN,VIOLET,GOLD,ROSE][i%5];
        return <rect key={i} x={x} y={top} width="9" height={h} rx="4" fill={`rgba(${hexToRgb(accent2).join(",")},0.25)`} stroke={accent2} strokeWidth="1"/>;
      })}
      <text x="180" y="310" textAnchor="middle" fill={c} fontSize="13" fontFamily="monospace" opacity="0.7">23 chromosome pairs</text>
      <text x="180" y="330" textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="monospace" opacity="0.55">3 × 10⁹ base pairs</text>
    </svg>
  );

  if (layer.key === "cell") return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      <ellipse cx="180" cy="180" rx="130" ry="120" fill={`rgba(${hexToRgb(c).join(",")},0.06)`} stroke={c} strokeWidth="2"/>
      <ellipse cx="170" cy="175" rx="45" ry="40" fill={`rgba(${hexToRgb(GOLD).join(",")},0.12)`} stroke={GOLD} strokeWidth="1.5"/>
      <text x="170" y="180" textAnchor="middle" fill={GOLD} fontSize="11" fontFamily="monospace" opacity="0.8">nucleus</text>
      {[[90,130],[260,140],[100,230],[260,220],[180,260]].map(([ox,oy],i) => (
        <ellipse key={i} cx={ox} cy={oy} rx="16" ry="9" fill={`rgba(${hexToRgb(CYAN).join(",")},0.2)`} stroke={CYAN} strokeWidth="1" opacity="0.6"/>
      ))}
    </svg>
  );

  // organism
  return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
      <circle cx="180" cy="72" r="32" fill={`rgba(${hexToRgb(c).join(",")},0.12)`} stroke={c} strokeWidth="2"/>
      <line x1="180" y1="104" x2="180" y2="222" stroke={c} strokeWidth="3" strokeLinecap="round"/>
      <line x1="180" y1="140" x2="124" y2="185" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="180" y1="140" x2="236" y2="185" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="180" y1="222" x2="148" y2="300" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="180" y1="222" x2="212" y2="300" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="180" cy="72" r="10" fill={GOLD} opacity="0.7"/>
      <radialGradient id="orgGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={c} stopOpacity="0.18"/>
        <stop offset="100%" stopColor={c} stopOpacity="0"/>
      </radialGradient>
      <ellipse cx="180" cy="185" rx="70" ry="110" fill="url(#orgGlow)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   INLINE CARD
═══════════════════════════════════════════════════════════════════════════ */
function InlineCard() {
  const { lang } = useLang();
  const [activeIdx, setActiveIdx] = useState(1); // default: base
  const layer = CODE_LAYERS[activeIdx];

  return (
    <div className="holo rounded-2xl p-6 md:p-8">
      <div className="mb-5">
        <h3 className="text-lg md:text-xl font-semibold text-ghost-100 leading-snug">
          <T v={{ en: "From Four Letters to a Body", zh: "从四个字母，到一具身体" }} />
        </h3>
        <p className="mt-1 text-sm text-ghost-400">
          <T v={{ en: "Zoom across the 9 nested scales that make life programmable.", zh: "穿越令生命可被编程的 9 层嵌套尺度。" }} />
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* scale ladder */}
        <div className="flex flex-col gap-1 md:w-52 shrink-0">
          {CODE_LAYERS.map((l, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={l.key}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                  active
                    ? "bg-void-800/80 ring-1 ring-[var(--accent)] text-ghost-100"
                    : "hover:bg-void-800/40 text-ghost-400"
                }`}
                style={{ "--accent": l.accent } as React.CSSProperties}
              >
                <span className="font-mono text-[11px] text-bio-300 w-5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: l.accent }}
                />
                <span className="text-sm leading-tight">
                  {l.name[lang]}
                </span>
                <span className="font-mono text-[10px] text-ghost-500 ml-auto shrink-0 hidden md:block">
                  {l.scale[lang]}
                </span>
              </button>
            );
          })}
        </div>

        {/* schematic */}
        <div className="flex-1 flex flex-col gap-4">
          <div
            className="rounded-xl overflow-hidden border border-void-700/50"
            style={{ background: `rgba(2,8,14,0.7)`, aspectRatio: "1/1", maxHeight: 320 }}
          >
            <LayerSchematic layer={layer} />
          </div>

          <div
            className="rounded-lg px-4 py-3 border border-void-700/40"
            style={{ background: `rgba(${hexToRgb(layer.accent).join(",")},0.06)` }}
          >
            <p className="text-[13px] font-medium" style={{ color: layer.accent }}>
              {layer.name[lang]}
            </p>
            <p className="text-xs text-ghost-400 mt-0.5">{layer.what[lang]}</p>
            <p className="font-mono text-[11px] text-ghost-500 mt-1">{layer.scale[lang]}</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm italic text-bio-300/80 border-t border-void-700/40 pt-4">
        <T v={{
          en: "\"Once a system is a piece of writing, in principle it can be edited.\"",
          zh: "\"一旦一个系统是一段文字，原则上它便可被编辑。\"",
        }} />
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DEFAULT EXPORT
═══════════════════════════════════════════════════════════════════════════ */
export default function GenomeField({ inline }: { inline?: boolean }) {
  if (inline) return <InlineCard />;
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <HeroCanvas />
    </div>
  );
}
