"use client";

import { ReactNode, useEffect, useState } from "react";
import { LangProvider, LangToggle, T, useLang } from "./lang";
import { SECTIONS, HERO, TICKER, BIG_QUESTIONS, Section } from "./content";

import GenomeField from "./GenomeField";
import EvolutionSim from "./EvolutionSim";
import CRISPRLab from "./CRISPRLab";
import TherapyMap from "./TherapyMap";
import EnhancementLadder from "./EnhancementLadder";
import SynBioCircuit from "./SynBioCircuit";
import AIBioStack from "./AIBioStack";
import EcoEngineering from "./EcoEngineering";
import PostHumanSociety from "./PostHumanSociety";
import ProgrammableLifeModel from "./ProgrammableLifeModel";
import BioRecursion from "./BioRecursion";

/* per-section visualization map */
const VIS: Record<string, ReactNode> = {
  code: <GenomeField inline />,
  evolution: <EvolutionSim />,
  crispr: <CRISPRLab />,
  therapy: <TherapyMap />,
  enhance: <EnhancementLadder />,
  synbio: <SynBioCircuit />,
  ai: <AIBioStack />,
  eco: <EcoEngineering />,
  posthuman: <PostHumanSociety />,
  unified: (
    <div className="space-y-10">
      <ProgrammableLifeModel />
      <QuestionsGrid />
    </div>
  ),
};

/* ---------------- Header ---------------- */
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-vital-500/10 bg-void-950/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden>
            <defs>
              <linearGradient id="glyph-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#8aedd1" />
                <stop offset="0.55" stopColor="#34dba8" />
                <stop offset="1" stopColor="#e8c466" />
              </linearGradient>
              <radialGradient id="glyph-r" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#34dba8" stopOpacity="0.55" />
                <stop offset="1" stopColor="#34dba8" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="#040f1a" />
            <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="7.6" fill="none" stroke="#34dba8" strokeOpacity="0.36" />
            <circle cx="16" cy="16" r="9" fill="url(#glyph-r)" />
            <path d="M9 5 Q16 11 9 16 Q2 21 9 27" fill="none" stroke="url(#glyph-g)" strokeWidth={2} strokeLinecap="round" />
            <path d="M23 5 Q16 11 23 16 Q30 21 23 27" fill="none" stroke="url(#glyph-g)" strokeWidth={2} strokeLinecap="round" />
            <line x1="11.5" y1="8.5" x2="20.5" y2="8.5" stroke="#e8c466" strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />
            <line x1="11.5" y1="13.5" x2="20.5" y2="13.5" stroke="#5ddcff" strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />
            <line x1="11.5" y1="18.5" x2="20.5" y2="18.5" stroke="#34dba8" strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />
            <line x1="11.5" y1="23.5" x2="20.5" y2="23.5" stroke="#9986ff" strokeWidth={1.2} strokeLinecap="round" opacity={0.85} />
          </svg>
          <div className="leading-none">
            <div className="display text-sm font-bold text-ghost-50">Gene Editing Engine</div>
            <div className="label-mono mt-0.5 text-[0.5rem]">基因编辑引擎</div>
          </div>
        </a>

        <nav className="hidden items-center gap-5 text-[0.82rem] text-ghost-300 lg:flex">
          {SECTIONS.slice(0, 6).map((s) => (
            <a key={s.id} href={`#${s.id}`} className="transition hover:text-vital-300">
              <T v={s.title} />
            </a>
          ))}
          <a href="#recursion" className="transition hover:text-vital-300">
            <T v={{ en: "Engine", zh: "引擎" }} />
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden rounded-md border border-vital-500/20 px-2 py-1 text-ghost-300"
            aria-label="menu"
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-vital-500/10 bg-void-900/95 px-5 py-3 lg:hidden">
          <div className="grid grid-cols-2 gap-2 text-sm text-ghost-300">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className="py-1 transition hover:text-vital-300">
                <span className="mono mr-1.5 text-vital-500/70">{s.num}</span>
                <T v={s.title} />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <GenomeField />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 md:px-10">
        <div className="rise-in">
          <div className="label-mono mb-5 flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-vital-500 beat" />
            <T v={HERO.kicker} /> · A Psyverse Atlas
          </div>
          <h1 className="display max-w-4xl text-4xl leading-[1.06] text-ghost-50 sm:text-5xl md:text-6xl lg:text-7xl">
            <T v={HERO.title} />
            <br />
            <span className="vital-text"><T v={HERO.title2} /></span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ghost-200 md:text-lg">
            <T v={HERO.lede} />
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a href="#code" className="rounded-full bg-vital-500/15 px-6 py-3 text-sm font-semibold text-vital-300 ring-1 ring-vital-500/40 transition hover:bg-vital-500/25">
              <T v={HERO.scrollHint} /> ↓
            </a>
            <a href="#recursion" className="text-sm text-ghost-300 underline-offset-4 transition hover:text-vital-300 hover:underline">
              <T v={{ en: "Jump to the Gene Editing Engine", zh: "直达基因编辑引擎" }} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ticker ---------------- */
function Ticker() {
  const { lang } = useLang();
  const items = [...TICKER, ...TICKER];
  return (
    <div className="relative overflow-hidden border-y border-vital-500/10 bg-void-900/50 py-3">
      <div className="ticker flex w-max gap-8 whitespace-nowrap">
        {items.map((it, i) => (
          <span key={i} className={`mono text-xs tracking-wide text-ghost-300/80 ${lang === "zh" ? "zh" : ""}`}>
            <span className="text-vital-500/65">✦</span> {it[lang]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Section block ---------------- */
function SectionBlock({ s, vis }: { s: Section; vis?: ReactNode }) {
  return (
    <section id={s.id} className="relative scroll-mt-20 border-t border-vital-500/10 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4">
          <span className="display text-2xl text-vital-500/45">{s.num}</span>
          <div className="h-px flex-1 rule-life opacity-50" />
        </div>
        <h2 className="display mt-5 text-3xl text-ghost-50 md:text-5xl">
          <T v={s.title} />
        </h2>
        <h3 className="mt-2 text-base text-clinical-400 md:text-lg">
          <T v={s.sub} />
        </h3>
        <p className="mt-7 max-w-3xl text-base leading-relaxed text-ghost-200 md:text-lg">
          <T v={s.body} />
        </p>
        {vis && <div className="mt-12">{vis}</div>}
      </div>
    </section>
  );
}

/* ---------------- Big-questions grid ---------------- */
function QuestionsGrid() {
  return (
    <div>
      <div className="label-mono mb-5"><T v={{ en: "Open Questions", zh: "开放问题" }} /></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BIG_QUESTIONS.map((q, i) => (
          <div key={i} className="holo rounded-xl p-5">
            <p className="text-base font-semibold text-ghost-50"><T v={q.q} /></p>
            <p className="mt-2 text-sm leading-relaxed text-ghost-300"><T v={q.lens} /></p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Closing ---------------- */
function Closing() {
  return (
    <section className="relative border-t border-vital-500/10 px-6 py-32 md:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <div className="label-mono mb-6"><T v={{ en: "The Final Thesis", zh: "终极命题" }} /></div>
        <p className="display text-2xl leading-snug text-ghost-50 md:text-4xl">
          <T v={{ en: "Gene editing is the moment intelligence begins, deliberately, to rewrite the biological code that produced intelligence.", zh: "基因编辑，是智能开始有意地改写那段「产生了智能」的生物代码的时刻。" }} /></p>
        <p className="mt-8 text-lg text-vital-300">
          <T v={{ en: "The future of civilization may depend on whether a species that can author itself can also learn to do so with humility — across the genome, across the species, and across the biosphere.", zh: "一个能书写自己的物种，能否也学会怀着谦卑去做这件事——跨越基因组、跨越物种、跨越生物圈——一个文明的未来，或许便取决于此。" }} /></p>
        <div className="mx-auto mt-12 h-px w-40 rule-life" />
        <p className="mt-10 text-sm text-ghost-500">
          <T v={{ en: "An interpretive synthesis of molecular biology, evolutionary theory, ethics and information science — not medical advice. Part of the", zh: "对分子生物学、进化论、伦理学与信息科学的诠释性综述——非医疗建议。属于" }} />{" "}
          <a href="https://psyverse.fun" className="text-vital-400 underline-offset-4 hover:underline">Psyverse</a>{" "}
          <T v={{ en: "portfolio.", zh: "作品集。" }} />
        </p>
      </div>
    </section>
  );
}

/* ---------------- Root ---------------- */
function Engine() {
  const { lang } = useLang();
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  return (
    <main className="relative min-h-screen grid-bg">
      <Header />
      <Hero />
      <Ticker />

      {SECTIONS.map((s) => (
        <SectionBlock key={s.id} s={s} vis={VIS[s.id]} />
      ))}

      {/* Capstone */}
      <section id="recursion" className="relative scroll-mt-20 border-t border-vital-500/10 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-baseline gap-4">
            <span className="display text-2xl text-vital-500/45">∞</span>
            <div className="h-px flex-1 rule-life opacity-50" />
          </div>
          <h2 className="display mt-5 text-3xl text-ghost-50 md:text-5xl">
            <T v={{ en: "The Recursive Programmable-Life Engine", zh: "递归可编程生命引擎" }} />
          </h2>
          <h3 className="mt-2 text-base text-clinical-400 md:text-lg">
            <T v={{ en: "One principle — information that knows how to copy itself — from atom to post-biological civilization", zh: "同一个原理——知道如何复制自身的信息——从原子到后生物文明" }} />
          </h3>
          <p className="mt-7 max-w-3xl text-base leading-relaxed text-ghost-200 md:text-lg">
            <T v={{ en: "Step through the layers and watch the same logic re-organize itself, level by level. A base pair learns to mean something; a gene encodes a protein; a genome a body; an edited organism a designed trait; a synthetic genome an authored life; an ecosystem-scale release a responsibility; a civilization a decision; and on the far side, a substrate-agnostic project that may one day not need biology at all.", zh: "逐层穿行，看同一种逻辑如何一级一级地重新组织自己。一对碱基学会承载意义；一个基因编码一种蛋白；一个基因组编码一具身体；一只被编辑的生物编码一种被设计的性状；一段合成的基因组编码一段被书写的生命；一次生态尺度的释放编码一份责任；一种文明编码一个决定；而在其另一侧，是一个或许有朝一日不再需要生物学的、载体无关的工程。" }} />
          </p>
          <div className="mt-12">
            <BioRecursion />
          </div>
        </div>
      </section>

      <Closing />
    </main>
  );
}

export default function GeneEditingEngine() {
  return (
    <LangProvider>
      <Engine />
    </LangProvider>
  );
}
