import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const TITLE_EN =
  "Gene Editing Engine · The Nature of Genetic Engineering, Biological Programming, Evolutionary Control, and Post-Human Civilization";
const TITLE_ZH = "基因编辑引擎 · 基因工程、生命编程、进化控制与后人类文明的本质";
const DESC =
  "A civilization-scale, bilingual atlas of gene editing — not as a list of biotech breakthroughs, but as the moment intelligence learned to rewrite the code of life on purpose. DNA, evolution, CRISPR, base editing, prime editing, gene therapy, synthetic biology, AI-designed proteins, gene drives, germline editing, and post-human evolution, modeled as one continuous stack — from atoms to civilization — across which life-as-information can be edited, designed, and held responsible for.";

export const metadata: Metadata = {
  metadataBase: new URL("https://gene-editing-engine.psyverse.fun"),
  title: `${TITLE_EN} | ${TITLE_ZH}`,
  description: DESC,
  keywords: [
    "gene editing", "CRISPR", "Cas9", "base editing", "prime editing", "gene therapy",
    "DNA", "RNA", "proteins", "codons", "genes", "genome", "chromosomes",
    "evolution", "mutation", "natural selection", "directed evolution",
    "synthetic biology", "genetic circuits", "synthetic genome", "minimal cell",
    "AlphaFold", "protein folding", "AI biology", "bioinformatics", "RFdiffusion",
    "germline editing", "designer babies", "polygenic editing", "human enhancement",
    "gene drives", "CAR-T", "Casgevy", "Zolgensma", "Luxturna", "VERVE",
    "engineered crops", "de-extinction", "xenotransplant", "transhumanism",
    "post-human", "post-biological", "biological programming",
    "基因编辑", "碱基编辑", "先导编辑", "基因疗法",
    "DNA", "RNA", "蛋白质", "密码子", "基因", "基因组", "染色体",
    "进化", "突变", "自然选择", "定向进化",
    "合成生物学", "基因回路", "合成基因组", "最小细胞",
    "蛋白折叠", "AI 生物学", "生物信息",
    "生殖系编辑", "设计婴儿", "多基因编辑", "人类增强",
    "基因驱动", "工程化作物", "去灭绝", "异种移植",
    "超人类主义", "后人类", "后生物", "生命编程",
  ],
  authors: [{ name: "Gewenbo", url: "https://psyverse.fun" }],
  alternates: { canonical: "/", languages: { en: "/", "zh-CN": "/", "x-default": "/" } },
  openGraph: {
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Gene Editing Engine · 基因编辑引擎 — Programmable Life, From CRISPR to Post-Human Civilization" }],
    title: TITLE_EN,
    description:
      "From atoms to civilization. A bilingual atlas of gene editing — DNA as code, CRISPR as word processor, gene therapy, synthetic biology, AI-designed proteins, and the deep question of what a species owes itself once it can edit itself.",
    url: "https://gene-editing-engine.psyverse.fun/",
    siteName: "Psyverse",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    images: ["/twitter-image.png"],
    card: "summary_large_image",
    title: TITLE_EN,
    description: "Life is code, and we are learning to write it. A bilingual atlas of CRISPR, gene therapy, synthetic biology, AI biology, and the ethics of editing the species.",
  },
  robots: { index: true, follow: true },
  other: { "theme-color": "#02080e" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: TITLE_EN,
              alternateName: TITLE_ZH,
              description: DESC,
              url: "https://gene-editing-engine.psyverse.fun/",
              inLanguage: ["en", "zh-CN"],
              author: { "@type": "Person", name: "Gewenbo", url: "https://psyverse.fun/" },
              publisher: { "@type": "Organization", name: "Psyverse", url: "https://psyverse.fun/" },
            }),
          }}
        />
      </head>
      <body className="bg-void-950 text-ghost-100 antialiased">
        {children}
        <Script src="https://analytics-dashboard-two-blue.vercel.app/tracker.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
