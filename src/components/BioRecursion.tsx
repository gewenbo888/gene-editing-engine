"use client";

import { useEffect, useRef, useState } from "react";
import { T, useLang } from "./lang";
import { RECURSION_LAYERS, RecursionLayer } from "./content";

/* ─── per-layer insight lines ─────────────────────────────── */
const INSIGHTS: Record<string, { en: string; zh: string }> = {
  atom:      { en: "Every story begins with matter that can form bonds.",        zh: "每个故事都始于能够成键的物质。" },
  base:      { en: "Four letters open up everything that can be written.",       zh: "四个字母开启了一切可以书写的东西。" },
  gene:      { en: "A passage becomes a word — one protein, one function.",      zh: "一段文字成为一个词——一种蛋白，一种功能。" },
  genome:    { en: "The full text: three billion letters, one organism.",        zh: "完整的文本：三十亿字母，一个生命。" },
  cell:      { en: "The interpreter runs; code becomes action, becomes body.",   zh: "解释器运行；代码成为行动，成为身体。" },
  organism:  { en: "A trillion readers, the same book, one coordinated world.",  zh: "万亿读者，同一本书，一个协调的世界。" },
  edited:    { en: "Intelligence finds the typo — and changes a single letter.",  zh: "智能找到笔误——并改写一个字母。" },
  synthetic: { en: "Authorship: a genome written, not inherited.",               zh: "作者身份：一个基因组被书写，而非被继承。" },
  eco:       { en: "The text escapes the lab and enters the living world.",      zh: "文本逃离实验室，进入活生生的世界。" },
  civ:       { en: "A civilization votes on what may and may not be written.",   zh: "一种文明投票表决什么可写，什么不可。" },
  post:      { en: "The project outgrows the substrate. The logic remains.",     zh: "工程超越了载体。逻辑依然。" },
};

/* ─── bespoke SVG symbol per layer ───────────────────────── */
function LayerIcon({ k, color }: { k: string; color: string }) {
  const c = color;
  switch (k) {
    case "atom":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <circle cx="14" cy="14" r="3" fill={c} opacity={0.9} />
          <ellipse cx="14" cy="14" rx="11" ry="5.5" stroke={c} strokeWidth={1.2} opacity={0.6} />
          <circle cx="25" cy="14" r="2" fill={c} opacity={0.85} />
        </svg>
      );
    case "base":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          {[["A","#34dba8"],["T","#5ddcff"],["G","#e8c466"],["C","#9986ff"]].map(([ltr, cl], i) => (
            <text key={ltr} x={i < 2 ? 2 + i * 12 : 2 + (i-2) * 12} y={i < 2 ? 12 : 26}
              fill={cl} fontSize="10" fontFamily="JetBrains Mono,monospace" fontWeight="700">{ltr}</text>
          ))}
        </svg>
      );
    case "gene":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <path d="M6 6 Q14 10 22 6" stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
          <path d="M6 22 Q14 18 22 22" stroke={c} strokeWidth={1.5} strokeLinecap="round" opacity={0.7} />
          {[6,10,14,18,22].map(x => (
            <line key={x} x1={x} y1="8.5" x2={x} y2="19.5" stroke={c} strokeWidth={1} opacity={0.45} />
          ))}
        </svg>
      );
    case "genome":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          {[4,8,12,16,20,24].map((y,i) => (
            <line key={y} x1="4" y1={y} x2={14 + (i % 3) * 4} y2={y}
              stroke={c} strokeWidth={1.4} strokeLinecap="round" opacity={0.55 + i * 0.06} />
          ))}
        </svg>
      );
    case "cell":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <circle cx="14" cy="14" r="11" stroke={c} strokeWidth={1.3} opacity={0.6} />
          <circle cx="14" cy="14" r="5" fill={c} fillOpacity={0.22} stroke={c} strokeWidth={1} strokeOpacity={0.7} />
          <circle cx="14" cy="14" r="2.5" fill={c} opacity={0.85} />
        </svg>
      );
    case "organism":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <circle cx="14" cy="5.5" r="3" fill={c} opacity={0.85} />
          <line x1="14" y1="8.5" x2="14" y2="20" stroke={c} strokeWidth={1.4} />
          <line x1="14" y1="13" x2="8" y2="17.5" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
          <line x1="14" y1="13" x2="20" y2="17.5" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
          <line x1="14" y1="20" x2="9" y2="26" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
          <line x1="14" y1="20" x2="19" y2="26" stroke={c} strokeWidth={1.2} strokeLinecap="round" />
        </svg>
      );
    case "edited":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <path d="M5 5 Q10 8 15 5" stroke={c} strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
          <path d="M5 20 Q10 17 15 20" stroke={c} strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
          {[5,9,13].map(x => (
            <line key={x} x1={x} y1="7" x2={x} y2="18" stroke={c} strokeWidth={1} opacity={0.4} />
          ))}
          <path d="M19 22 L23 14 L25 22 Z" fill="#e8c466" opacity={0.8} />
          <line x1="19" y1="22" x2="17" y2="25" stroke="#e8c466" strokeWidth={1.2} strokeLinecap="round" />
        </svg>
      );
    case "synthetic":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <path d="M7 24 L11 10 L14 15 L17 8 L21 24" stroke={c} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
          <circle cx="14" cy="4.5" r="2.5" fill="#e8c466" opacity={0.85} />
          <line x1="14" y1="7" x2="14" y2="9.5" stroke="#e8c466" strokeWidth={1.2} />
        </svg>
      );
    case "eco":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <circle cx="14" cy="16" r="9" stroke={c} strokeWidth={1.2} opacity={0.55} />
          <path d="M14 7 L14 5 M10 8 Q8 4 14 3 Q20 2 19 8 Q16 6 14 7 Z" fill={c} opacity={0.75} />
          <line x1="14" y1="7" x2="14" y2="18" stroke={c} strokeWidth={1.1} opacity={0.5} />
          <path d="M10 24 Q14 21 18 24" stroke={c} strokeWidth={1} strokeLinecap="round" opacity={0.5} />
        </svg>
      );
    case "civ":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <rect x="3" y="16" width="4" height="9" stroke={c} strokeWidth={1.1} opacity={0.7} />
          <rect x="8" y="12" width="5" height="13" stroke={c} strokeWidth={1.1} opacity={0.7} />
          <rect x="15" y="8" width="4" height="17" stroke={c} strokeWidth={1.1} opacity={0.7} />
          <rect x="20" y="14" width="5" height="11" stroke={c} strokeWidth={1.1} opacity={0.7} />
          <line x1="2" y1="25.5" x2="26" y2="25.5" stroke={c} strokeWidth={1} opacity={0.45} />
        </svg>
      );
    case "post":
      return (
        <svg viewBox="0 0 28 28" width={28} height={28} fill="none">
          <path d="M4 14 C4 10 10 6 14 14 C18 22 24 18 24 14" stroke={c} strokeWidth={1.6} strokeLinecap="round" opacity={0.8} />
          <circle cx="4" cy="14" r="2" fill={c} opacity={0.6} />
          <circle cx="24" cy="14" r="2" fill={c} opacity={0.6} />
          <circle cx="14" cy="14" r="2.5" fill="#e8c466" opacity={0.85} />
        </svg>
      );
    default:
      return <svg viewBox="0 0 28 28" width={28} height={28} />;
  }
}

/* ─── progress dots ─────────────────────────────────────── */
function ProgressDots({ count, active, onSelect }: { count: number; active: number; onSelect: (i: number) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Layer ${i + 1}`}
          className="transition-all duration-300"
          style={{
            width: i === active ? 20 : 6,
            height: 6,
            borderRadius: 9999,
            background: i === active ? "#e8c466" : "rgba(52,219,168,0.3)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── main component ────────────────────────────────────── */
export default function BioRecursion() {
  const { lang } = useLang();
  const [active, setActive] = useState(5); // "organism"
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = RECURSION_LAYERS.length;

  // auto-play
  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setActive(prev => (prev + 1) % count);
      }, 3000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, count]);

  // keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActive(p => (p - 1 + count) % count);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActive(p => (p + 1) % count);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  const layer = RECURSION_LAYERS[active];
  const insight = INSIGHTS[layer.k];

  return (
    <div className="holo rounded-2xl p-6 md:p-8">
      {/* gold quote bar */}
      <div className="mb-7 border-l-2 border-bio-500 pl-4">
        <p className="text-[0.82rem] leading-relaxed text-bio-300 italic">
          <T v={{
            en: '"From atom to civilization, the project is the same: information that knows how to copy itself, learning to revise its own text."',
            zh: '"从原子到文明，工程都是同一个：知道如何复制自身的信息，开始学会修订自己的文本。"',
          }} />
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* ── substrate ladder ── */}
        <div className="shrink-0 lg:w-[260px]">
          <div className="label-mono mb-3">
            <T v={{ en: "Substrate ladder", zh: "载体阶梯" }} />
          </div>
          <svg
            viewBox="0 0 260 480"
            width="100%"
            style={{ maxWidth: 260, display: "block" }}
            aria-label="11-substrate recursion ladder"
          >
            {RECURSION_LAYERS.map((l: RecursionLayer, i) => {
              const isActive = i === active;
              const y = i * 43;
              const bandH = 40;
              const hexColor = l.color;
              return (
                <g
                  key={l.k}
                  onClick={() => setActive(i)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  aria-label={l.name[lang]}
                >
                  {/* band background */}
                  <rect
                    x={0}
                    y={y}
                    width={260}
                    height={bandH}
                    rx={4}
                    fill={hexColor}
                    opacity={isActive ? 0.2 : 0.06}
                  />
                  {/* active gold outline */}
                  {isActive && (
                    <rect
                      x={0.5}
                      y={y + 0.5}
                      width={259}
                      height={bandH - 1}
                      rx={3.5}
                      fill="none"
                      stroke="#e8c466"
                      strokeWidth={1.5}
                      opacity={0.85}
                    />
                  )}
                  {/* index */}
                  <text
                    x={10}
                    y={y + 25}
                    fill={isActive ? "#e8c466" : hexColor}
                    opacity={isActive ? 1 : 0.5}
                    fontSize="9"
                    fontFamily="JetBrains Mono,monospace"
                    fontWeight="600"
                    letterSpacing="0.08em"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                  {/* icon */}
                  <foreignObject x={28} y={y + 6} width={28} height={28}>
                    <LayerIcon k={l.k} color={isActive ? hexColor : hexColor + "88"} />
                  </foreignObject>
                  {/* name */}
                  <text
                    x={62}
                    y={y + 25}
                    fill={isActive ? "#f6f3ea" : "#9a917a"}
                    fontSize="11"
                    fontFamily={lang === "zh" ? "Noto Serif SC,serif" : "Manrope,sans-serif"}
                    fontWeight={isActive ? "700" : "400"}
                  >
                    {l.name[lang].length > 18 ? l.name[lang].slice(0, 17) + "…" : l.name[lang]}
                  </text>
                  {/* scale label */}
                  <text
                    x={62}
                    y={y + 37}
                    fill={isActive ? hexColor : hexColor + "66"}
                    fontSize="8"
                    fontFamily="JetBrains Mono,monospace"
                    letterSpacing="0.05em"
                  >
                    {l.scale[lang].length > 26 ? l.scale[lang].slice(0, 25) + "…" : l.scale[lang]}
                  </text>
                  {/* active caret */}
                  {isActive && (
                    <polygon
                      points={`252,${y + 14} 258,${y + 20} 252,${y + 26}`}
                      fill="#e8c466"
                      opacity={0.85}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── detail panel ── */}
        <div className="flex flex-1 flex-col gap-5 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div
                className="display text-3xl md:text-4xl font-bold leading-tight"
                style={{ color: layer.color }}
              >
                <T v={layer.name} />
              </div>
              <div
                className="label-mono mt-1.5"
                style={{ color: layer.color, opacity: 0.75 }}
              >
                {layer.scale[lang]}
              </div>
            </div>
            <div className="label-mono text-bio-400 shrink-0">
              {String(active + 1).padStart(2, "0")} / {count}
            </div>
          </div>

          <p className="text-sm leading-relaxed text-ghost-200 md:text-base">
            <T v={layer.move} />
          </p>

          {/* "Same Recursion" insight */}
          {insight && (
            <div
              className="rounded-lg border px-4 py-3"
              style={{ borderColor: "#e8c46640", background: "rgba(232,196,102,0.05)" }}
            >
              <div className="label-mono mb-1 text-bio-400">
                <T v={{ en: "Same recursion", zh: "同一递归" }} />
              </div>
              <p className="text-sm italic text-bio-300">
                {insight[lang]}
              </p>
            </div>
          )}

          {/* controls */}
          <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-vital-500/10">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setActive(p => (p - 1 + count) % count)}
                className="rounded-md border border-vital-500/25 px-3 py-1.5 text-xs text-vital-400 transition hover:border-vital-500/60 hover:text-vital-300"
              >
                ← <T v={{ en: "Previous", zh: "上一层" }} />
              </button>
              <button
                onClick={() => setPlaying(p => !p)}
                className={`rounded-md border px-3 py-1.5 text-xs transition ${
                  playing
                    ? "border-bio-500/60 text-bio-300 bg-bio-500/10"
                    : "border-vital-500/25 text-vital-400 hover:border-vital-500/60"
                }`}
              >
                {playing
                  ? <T v={{ en: "⏸ Pause", zh: "⏸ 暂停" }} />
                  : <T v={{ en: "▶ Auto-play", zh: "▶ 自动播放" }} />
                }
              </button>
              <button
                onClick={() => setActive(p => (p + 1) % count)}
                className="rounded-md border border-vital-500/25 px-3 py-1.5 text-xs text-vital-400 transition hover:border-vital-500/60 hover:text-vital-300"
              >
                <T v={{ en: "Next", zh: "下一层" }} /> →
              </button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <ProgressDots count={count} active={active} onSelect={setActive} />
              <span className="label-mono text-ghost-500">
                <T v={{ en: "Same principle, every substrate", zh: "同一原理，每一种载体" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
