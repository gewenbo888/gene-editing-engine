import { Bi } from "./lang";

/* ============================================================
   HERO + TICKER
   ============================================================ */
export const HERO = {
  kicker: { en: "The Gene Editing Engine", zh: "基因编辑引擎" },
  title: { en: "Life is code,", zh: "生命，是一种代码，" },
  title2: { en: "and we are learning to write it.", zh: "而我们，正在学会书写它。" },
  lede: {
    en: "For four billion years, evolution rewrote the code of life by accident — mutation, selection, drift. In a handful of decades, intelligence has learned to rewrite the same code on purpose. A bilingual atlas of that transition: from the chemistry of DNA, through CRISPR and base editing, gene therapy and synthetic genomes, AI-designed proteins and engineered ecosystems, to the deep question of what happens when a species becomes able to edit itself.",
    zh: "四十亿年来，进化以偶然之手改写生命的代码——突变、选择、漂变。在短短数十年里，智能学会了有意地改写同一段代码。这是一部关于那场过渡的双语图集：从 DNA 的化学，经 CRISPR 与碱基编辑、基因疗法与合成基因组、AI 设计的蛋白与被工程化的生态系统，直至那个最深的问题——当一个物种能够编辑自己时，会发生什么。",
  },
  scrollHint: { en: "Descend into the code", zh: "向下，进入代码" },
};

export const TICKER: Bi[] = [
  { en: "guide RNA", zh: "导向 RNA" },
  { en: "Cas9", zh: "Cas9" },
  { en: "base editing", zh: "碱基编辑" },
  { en: "prime editing", zh: "先导编辑" },
  { en: "AlphaFold", zh: "AlphaFold" },
  { en: "synthetic genome", zh: "合成基因组" },
  { en: "germline · somatic", zh: "生殖系 · 体细胞" },
  { en: "gene drive", zh: "基因驱动" },
  { en: "directed evolution", zh: "定向进化" },
  { en: "ribosome", zh: "核糖体" },
  { en: "codon", zh: "密码子" },
  { en: "polygenic score", zh: "多基因评分" },
  { en: "xenotransplant", zh: "异种移植" },
  { en: "de-extinction", zh: "去灭绝" },
  { en: "post-biological", zh: "后生物" },
];

/* ============================================================
   THE TEN SYSTEMS
   ============================================================ */
export type Section = { num: string; id: string; title: Bi; sub: Bi; body: Bi };

export const SECTIONS: Section[] = [
  {
    num: "01", id: "code",
    title: { en: "Life Is Code", zh: "生命即代码" },
    sub: { en: "Four letters, three at a time, build everything that has ever lived", zh: "四个字母，每三个一组，构筑了一切曾活过的存在" },
    body: {
      en: "The deepest fact about biology is also its strangest: every organism is, at the level of its instructions, a piece of writing. A DNA strand is a sequence in a four-letter alphabet — A, T, G, C — read three letters at a time into a code for twenty amino acids that fold into proteins, and proteins do the work. Inheritance copies the text; transcription reads it; translation enacts it; mutation rewrites it. The same chemistry runs in a bacterium, a redwood, and you. To grasp gene editing, this is the prerequisite: not what life is made of, but what it is written in. Once a system is a piece of writing, it can in principle be edited. The question that follows — what should be edited, by whom, and with what humility — is the rest of this atlas.",
      zh: "生物学最深的事实，也是它最陌生的事实：每一个生物，在其指令的层面上，是一段文字。一条 DNA 链是一段以四字母字母表书写的序列——A、T、G、C——每三个字母被读作一个编码，对应二十种氨基酸之一，氨基酸折叠为蛋白，而蛋白承担工作。遗传复制这段文本；转录读取它；翻译把它落到行动；突变改写它。同一套化学，运行在细菌、红杉与你之中。要把握基因编辑，这是前置条件：重要的不是生命由什么组成，而是它由什么写成。一旦一个系统是一段文字，原则上便可被编辑。接下来的问题——该编辑什么、由谁来编辑、带着多大的谦卑——是这部图集其余的部分。",
    },
  },
  {
    num: "02", id: "evolution",
    title: { en: "Evolution, Mutation & Natural Selection", zh: "进化、突变与自然选择" },
    sub: { en: "Four billion years of code-rewriting, with no editor in charge", zh: "四十亿年的代码改写，从未有过编辑者执笔" },
    body: {
      en: "Before any of us could edit anything, the world had been editing itself for four billion years. The mechanism is brutally simple. Copies are made; copies have errors; some errors help; the helpful ones outbreed the rest. Out of that loop, run trillions of times across an entire biosphere, came every protein, every body plan, every nervous system, every brain capable of asking how it got here. Natural selection is not foresight — it is hindsight, applied by an environment that does not know what it is doing. It is also, by far, the most successful optimization algorithm anyone has ever found. The point of the new tools is not to replace it. The point is to do, in a generation, what evolution would need a million years to accomplish — and to do it knowingly.",
      zh: "在我们之中任何人能编辑任何东西之前，世界已经自我编辑了四十亿年。机制残酷地简单。拷贝被制造；拷贝有错误；某些错误有益；有益的繁殖出更多自身。在那一循环——在整个生物圈中被运行了数万亿次——里，诞生了每一种蛋白、每一种身体方案、每一套神经系统、每一颗能问出「我何以至此」的大脑。自然选择不是远见——它是事后诸葛亮，由一个并不知道自己在做什么的环境施加。它也是迄今为止人类所发现过最成功的优化算法。新工具的目的，不是替换它。目的，是把进化需要百万年才能完成的事，在一代之内完成——并且，是有知有觉地完成。",
    },
  },
  {
    num: "03", id: "crispr",
    title: { en: "CRISPR & the Rise of Gene Editing", zh: "CRISPR 与基因编辑的崛起" },
    sub: { en: "A bacterial immune system became a word processor for DNA", zh: "一套细菌的免疫系统，成了 DNA 的字处理器" },
    body: {
      en: "CRISPR is not a single tool but a family. The original — Cas9 with a guide RNA — finds a specific sequence and cuts both strands of DNA, after which the cell's own repair either knocks the gene out or, with a template, swaps in a new sequence. Base editing skips the cut: a deaminase tethered to a disabled Cas chemically rewrites a single letter, A→G or C→T. Prime editing carries its own template and writes short insertions, deletions, and substitutions with a single nicking enzyme. Each generation of tool is more surgical than the last; each one moves editing closer to ordinary code — find, replace, save. What was once a thirty-year project at billions of dollars is now an afternoon in a graduate-student lab. The constraint is no longer can we edit. It is should we, and if so, where.",
      zh: "CRISPR 并非单一工具，而是一个家族。最早的——配有导向 RNA 的 Cas9——找到一段特定序列，切断 DNA 的两条链，随后细胞自身的修复或敲除该基因，或在模板的引导下换入一段新序列。碱基编辑跳过了切割：一种被绑定在失活 Cas 上的脱氨酶，化学地改写单个字母，A→G 或 C→T。先导编辑自带模板，用一种只切一条链的酶写入短的插入、缺失与替换。每一代工具都比前一代更外科；每一代都把编辑进一步推向普通代码的样子——查找、替换、保存。曾经是花费数十亿、历时三十年的工程，如今是研究生实验室里的一个下午。约束已不再是「我们能不能编辑」。约束是「我们应不应该」，以及「若应该，在何处」。",
    },
  },
  {
    num: "04", id: "therapy",
    title: { en: "Medicine, Disease & Genetic Repair", zh: "医学、疾病与基因修复" },
    sub: { en: "Curing what was, until recently, simply 'incurable'", zh: "治愈那些直到不久前都还被认作「不治」的病" },
    body: {
      en: "Sickle-cell disease, beta-thalassemia, certain forms of inherited blindness, transthyretin amyloidosis — diagnoses that used to mean a lifetime of management or worse can now, in carefully selected patients, mean a one-time edit. The early cures look the same shape: take cells out of the body, edit them in a dish, infuse them back. The hard cases are coming. Editing in vivo is harder than ex vivo; editing a brain is harder than editing blood; editing many cells precisely is harder than editing one. Beyond single-gene disease, the next horizons are stranger: T cells reprogrammed to hunt cancer, immune systems hardened against viruses they have never met, lipid-lowering edits delivered once instead of taken every morning. The line between therapy and enhancement, which everyone wants to keep visible, becomes harder to see with each step.",
      zh: "镰状细胞贫血、β-地中海贫血、某些遗传性失明、转甲状腺素淀粉样变——曾经意味着终生管理乃至更糟的诊断，如今在经过仔细筛选的患者身上，可以意味着一次性的编辑。早期治愈的样态都相似：把细胞取出体外，在皿中编辑，再回输入体内。难的案例正在到来。体内编辑比体外编辑更难；编辑大脑比编辑血液更难；精确编辑多种细胞比编辑一种更难。在单基因疾病之外，下一个地平线更陌生：被重新编程去猎杀癌细胞的 T 细胞、被强化以抵御未曾相遇之病毒的免疫系统、一次性递送的降脂编辑（替代每晨服药）。所有人都想保持可见的「治疗 vs 增强」之间的那条线，每往前迈一步，便愈发模糊。",
    },
  },
  {
    num: "05", id: "enhance",
    title: { en: "Human Enhancement & Designer Genetics", zh: "人类增强与基因定制" },
    sub: { en: "Once the tool exists, the question is no longer whether but who decides", zh: "工具一旦存在，问题便不再是「是否」，而是「由谁决定」" },
    body: {
      en: "Imagine an edit that lowers a child's lifelong risk of heart disease by half. Almost no one objects. Now imagine an edit that raises measured intelligence by half a standard deviation. Almost no one is comfortable. Now imagine the same edit but available only to those who can pay. The boundary between therapy and enhancement was never going to hold under engineering pressure — every cure removes a deficit, and every deficit is relative. The hardest cases are not in laboratories but in coordination: who chooses for an embryo that has no voice, what counts as harm when no one would call the resulting child harmed, whether populations split into edited and unedited become two cultures or two species. Polygenic prediction for traits like height and education has already made the first awkward steps. None of the technology will wait for the philosophy.",
      zh: "想象一种编辑，使孩子终生患心脏病的风险减半。几乎没人反对。再想象一种编辑，把所测智力提高半个标准差。几乎没人坦然。再想象同样的编辑，只有付得起钱的人才能拥有。「治疗 vs 增强」之间的边界，本就经不起工程压力的打磨——每一次治愈都消除一个缺陷，而每一个缺陷都是相对的。最难的案例不在实验室里，而在协调：谁为一颗无声的胚胎做选择？当没人会把所得到的孩子称作「受害者」时，「伤害」算什么？人群一旦分裂为「被编辑者」与「未被编辑者」，会变成两种文化、还是两种物种？身高、教育之类的多基因预测，已经迈出了头几步笨拙的脚步。所有的技术，都不会等哲学。",
    },
  },
  {
    num: "06", id: "synbio",
    title: { en: "Synthetic Biology & Artificial Life", zh: "合成生物学与人造生命" },
    sub: { en: "Cells as platforms, genomes as software, organisms as products", zh: "细胞作为平台、基因组作为软件、生物作为产品" },
    body: {
      en: "Synthetic biology takes the next step beyond editing: build. Engineered cells secrete insulin, biofuel, spider silk, fragrance. A team in 2010 booted up a bacterium from a chemically synthesized genome; another in 2016 stripped that genome to its irreducible essentials. Genetic logic gates — AND, OR, NOT — wired out of promoters and repressors let a cell sense two things and respond only to the conjunction. Whole organelles have been redesigned; whole metabolic pathways imported from one species into another. The deep idea is the one Drew Endy named over twenty years ago: standard biological parts, registries, abstractions. Biology as engineering, not just discovery. The catch is also old: a cell that escapes the lab does not respect the abstraction.",
      zh: "合成生物学迈出了编辑之外的下一步：构建。被工程化的细胞分泌胰岛素、生物燃料、蜘蛛丝、香精。2010 年一个团队用化学合成的基因组启动了一个细菌；2016 年另一个团队把那段基因组削减到了不可再减。从启动子与抑制子搭出的基因逻辑门——AND、OR、NOT——让一个细胞同时感知两件事、并只对其合取作出反应。整个细胞器已被重新设计；整条代谢通路被从一物种引入另一物种。深层的想法，是德鲁·恩迪二十多年前命名过的：标准的生物零件、注册库、抽象层。把生物学当作工程，而不仅是发现。隐患同样古老：一个逃出实验室的细胞，并不尊重那一层抽象。",
    },
  },
  {
    num: "07", id: "ai",
    title: { en: "AI, Bioinformatics & Computational Life", zh: "AI、生物信息与计算生命" },
    sub: { en: "When the model can read the genome, the genome becomes designable", zh: "当模型能够读懂基因组，基因组便变得可被设计" },
    body: {
      en: "AlphaFold was the inflection. A problem the field had treated as one of the great open challenges of biology — predicting how a protein folds from its sequence — was, in 2021, mostly solved by a deep model. Within months, the structures of nearly every known human protein were published. Within years, models were generating new proteins to specification: bind this target, fold this way, catalyze this reaction. Generative models now write candidate proteins, antibodies, even small synthetic genomes; design space is searched at a pace no laboratory can match alone. The bottleneck has shifted from biology that we could read to biology we could not yet imagine. AI does not replace experiment — every design still has to be made and tested — but it changes the prior. The frontier of biology is now also a frontier of compute.",
      zh: "AlphaFold 是那个拐点。一个领域曾视为伟大开放挑战的问题——从序列预测蛋白如何折叠——在 2021 年，被一个深度模型基本解决。数月之内，几乎所有已知人类蛋白的结构都被公布。数年之内，模型开始按规格生成新蛋白：结合这个靶点、这样折叠、催化这一反应。生成式模型如今在书写候选蛋白、抗体、乃至小型合成基因组；设计空间被以任何一所实验室都无法独立企及的速度搜索。瓶颈已从「我们能读懂的生物学」转向「我们尚未能想象的生物学」。AI 并不替代实验——每一份设计仍须被造出并被检验——但它改变了「先验」。生物学的前沿，如今也是算力的前沿。",
    },
  },
  {
    num: "08", id: "eco",
    title: { en: "Agriculture, Ecosystems & Planetary Bioengineering", zh: "农业、生态与行星生物工程" },
    sub: { en: "Editing one organism is easy. Editing a wild world is irreversible.", zh: "编辑一个生物是容易的。编辑一个野生世界，则是不可逆的。" },
    body: {
      en: "An edit confined to a Petri dish is a science problem. An edit released into a field is a treaty problem. Drought-tolerant crops, animals engineered against the pests that destroy them, microbes designed to fix nitrogen in soil where they were never present, gene drives capable of biasing inheritance so a trait sweeps through a wild population in a few generations — each of these is real, and each of these is, in some part of the world, somewhere in deployment. The promise is enormous: feeding billions, suppressing malaria-bearing mosquitoes, reviving lost species, sinking carbon. The danger is equally large: an ecosystem is a network we do not fully understand, and a release cannot be recalled. The line we are crossing is from biology that adapts to us to biology that we are responsible for.",
      zh: "局限于一只培养皿之内的编辑，是科学问题。释放到田野中的编辑，是条约问题。耐旱作物、被工程化以抵御侵蚀它们的害虫的动物、被设计来在它们本不存在的土壤中固氮的微生物、能够偏置遗传以使一种性状在几代内席卷野生种群的基因驱动——每一项都真实存在，每一项都已在世界的某个角落处于部署中。允诺巨大：养活数十亿、抑制传疟蚊、唤回失踪的物种、封存碳。危险同等巨大：生态系统是一张我们并未完全理解的网，而一次释放无法被召回。我们正在跨越的那条线，是从「适应我们的生物学」走向「由我们对其负责的生物学」。",
    },
  },
  {
    num: "09", id: "posthuman",
    title: { en: "Post-Human Evolution & Civilization", zh: "后人类进化与文明" },
    sub: { en: "A species that can edit itself becomes responsible for what it becomes", zh: "一个能编辑自己的物种，便对自己变成什么负有责任" },
    body: {
      en: "Once editing the germline becomes routine, the species stops being something that happens to us and becomes something we author. Cognitive traits, lifespan, susceptibility to disease, perhaps even the structure of the brain — all of these become decisions, made under economic and political pressure by parents, states, and markets that have never had to make them before. The optimistic scenario is a wider, healthier, more capable humanity, free of the genetic lottery's cruelest outcomes. The pessimistic one is enforced uniformity, lost diversity, or a permanent split between editable and unedited populations. Beyond either, the deeper transition is the one we may not even see at the time: the moment when intelligence ceases to be selected for by its environment and begins to be designed for by itself.",
      zh: "一旦生殖系编辑成为常规，物种便不再是「发生在我们身上」之事，而成为「由我们书写」之事。认知特征、寿命、患病易感性，或许甚至大脑的结构——所有这些都成为决定，由父母、国家与市场，在经济与政治压力下做出，而它们从未做过此类决定。乐观的剧本是一种更广阔、更健康、更有能力的人类，从基因彩票最残忍的结果中解放出来。悲观的剧本是被强制的同质化、丧失的多样性，或「可编辑」与「未编辑」人群之间的永久分裂。在两者之外，更深的转折，我们当时或许都察觉不到：那一刻，智能不再被其环境所选择，而开始被它自己所设计。",
    },
  },
  {
    num: "10", id: "unified",
    title: { en: "The Unified Programmable-Life Model", zh: "统一的可编程生命模型" },
    sub: { en: "Across every scale, the same recursion: information that knows how to copy itself", zh: "在每一个尺度上，同一种递归：知道如何复制自己的信息" },
    body: {
      en: "Pull every thread together and a single picture emerges. From the four-letter alphabet of DNA, through the twenty-letter alphabet of proteins, through the patterning rules that produce a body plan, through the ecological loops that produce a biosphere, life is information that has learned how to make copies of itself, and how to revise the copies based on what works. Gene editing is what happens when one of those copies — us — learns to make the revision directly, instead of waiting for the environment to do it. Read from the bottom up, the project is engineering. Read from the top down, the project is a civilization taking responsibility for the substrate of its own existence — for the genome, for the species, for the biosphere it lives inside — and finding out, often the hard way, how much of that responsibility it is actually ready to carry.",
      zh: "把每一条线索拉到一起，一幅单一的图景便浮现。从 DNA 的四字母字母表，经蛋白的二十字母字母表，经产生身体方案的图式规则，经产生生物圈的生态循环，生命就是一种学会了如何复制自身、并基于「什么有效」来修订那些拷贝的信息。基因编辑，是当其中一份拷贝——也就是我们——学会直接做出修订、而不是等待环境来做时所发生之事。自下而上读，这项工程是工程学。自上而下读，这项工程是一个文明，开始对自身存在的载体负起责任——对基因组、对物种、对它栖身其中的生物圈——并以常常是艰难的方式发现：那份责任，自己究竟准备好担起多少。",
    },
  },
];

/* ============================================================
   SECTION 1 — THE FOUR-LETTER ALPHABET
   (GenomeField)
   ============================================================ */
export type CodeLayer = { key: string; name: Bi; what: Bi; scale: Bi; accent: string };
export const CODE_LAYERS: CodeLayer[] = [
  { key: "atom",     name: { en: "Atoms", zh: "原子" }, what: { en: "Carbon, hydrogen, oxygen, nitrogen, phosphorus.", zh: "碳、氢、氧、氮、磷。" }, scale: { en: "10⁻¹⁰ m", zh: "10⁻¹⁰ 米" }, accent: "#5ddcff" },
  { key: "base",     name: { en: "Bases (A · T · G · C)", zh: "碱基（A · T · G · C）" }, what: { en: "Four nucleotides — the four letters of DNA.", zh: "四种核苷酸——DNA 的四个字母。" }, scale: { en: "10⁻⁹ m", zh: "10⁻⁹ 米" }, accent: "#34dba8" },
  { key: "codon",    name: { en: "Codons", zh: "密码子" }, what: { en: "Three letters at a time → one amino acid.", zh: "每三个字母 → 一个氨基酸。" }, scale: { en: "3 bases", zh: "3 个碱基" }, accent: "#34dba8" },
  { key: "gene",     name: { en: "Genes", zh: "基因" }, what: { en: "A stretch of code that specifies a protein.", zh: "指定一种蛋白的一段代码。" }, scale: { en: "10³ bases", zh: "10³ 碱基" }, accent: "#f3d77c" },
  { key: "protein",  name: { en: "Proteins", zh: "蛋白" }, what: { en: "The folded molecules that do the work.", zh: "做事情的、折叠的分子。" }, scale: { en: "10⁻⁸ m", zh: "10⁻⁸ 米" }, accent: "#f3d77c" },
  { key: "chrom",    name: { en: "Chromosomes", zh: "染色体" }, what: { en: "Long bundles of DNA wound around histones.", zh: "缠绕在组蛋白上的长 DNA。" }, scale: { en: "10⁻⁶ m", zh: "10⁻⁶ 米" }, accent: "#9986ff" },
  { key: "genome",   name: { en: "Genome", zh: "基因组" }, what: { en: "Every gene a cell carries — the full text.", zh: "细胞所携的全部基因——完整文本。" }, scale: { en: "3 × 10⁹ bases (human)", zh: "3 × 10⁹ 碱基（人）" }, accent: "#9986ff" },
  { key: "cell",     name: { en: "Cell", zh: "细胞" }, what: { en: "The smallest unit that runs the code.", zh: "运行代码的最小单元。" }, scale: { en: "10⁻⁵ m", zh: "10⁻⁵ 米" }, accent: "#34dba8" },
  { key: "organism", name: { en: "Organism", zh: "生物" }, what: { en: "Trillions of cells coordinated by the same text.", zh: "由同一段文本协调的数万亿细胞。" }, scale: { en: "10⁰ m", zh: "10⁰ 米" }, accent: "#5ddcff" },
];

/* ============================================================
   SECTION 2 — EVOLUTION DYNAMICS
   (EvolutionSim)
   ============================================================ */
export type EvolutionForce = { key: string; name: Bi; gloss: Bi; effect: Bi; accent: string };
export const EVOLUTION_FORCES: EvolutionForce[] = [
  { key: "mutation",   name: { en: "Mutation",   zh: "突变" },   gloss: { en: "Random copying errors generate variation.", zh: "随机的复制错误产生变异。" },   effect: { en: "Creates the raw material for selection.", zh: "为选择创造原料。" },   accent: "#ff89a4" },
  { key: "drift",      name: { en: "Drift",      zh: "漂变" },   gloss: { en: "Sampling noise in small populations.", zh: "小种群中的取样噪声。" },         effect: { en: "Random fixation, especially in bottlenecks.", zh: "随机固定，尤其在瓶颈期。" }, accent: "#5ddcff" },
  { key: "flow",       name: { en: "Gene flow",  zh: "基因流" }, gloss: { en: "Migration mixes variants across populations.", zh: "迁移让变异在群体间混合。" }, effect: { en: "Diffuses new traits geographically.", zh: "在地理上扩散新的性状。" },   accent: "#9986ff" },
  { key: "selection",  name: { en: "Selection",  zh: "选择" },   gloss: { en: "Differential survival and reproduction.", zh: "差异化的生存与繁衍。" },        effect: { en: "Concentrates what works; thins what doesn't.", zh: "让有效的浓缩，让无效的稀薄。" }, accent: "#34dba8" },
  { key: "horizontal", name: { en: "Horizontal transfer", zh: "水平转移" }, gloss: { en: "Genes jump between unrelated organisms.", zh: "基因在亲缘不近的生物之间跳跃。" }, effect: { en: "Antibiotic resistance, viral integration.", zh: "抗生素抗性、病毒整合。" }, accent: "#f3d77c" },
  { key: "epistasis",  name: { en: "Epistasis",  zh: "上位效应" }, gloss: { en: "Gene effects depend on other genes' states.", zh: "基因效应取决于其它基因的状态。" }, effect: { en: "Selection landscapes become rugged.", zh: "选择的地形变得崎岖。" }, accent: "#ff89a4" },
];

export type EvolutionMode = { key: string; name: Bi; how: Bi; pace: Bi; accent: string };
export const EVOLUTION_MODES: EvolutionMode[] = [
  { key: "natural",   name: { en: "Natural selection",   zh: "自然选择" }, how: { en: "Environment chooses; no designer.", zh: "环境选择；没有设计者。" }, pace: { en: "Slow — generations to millennia.", zh: "缓慢——以世代到千年计。" }, accent: "#34dba8" },
  { key: "artificial", name: { en: "Artificial selection", zh: "人工选择" }, how: { en: "Humans breed for chosen traits.", zh: "人类按所选性状繁育。" }, pace: { en: "Centuries (wheat, dogs, dairy cattle).", zh: "数世纪（小麦、犬、奶牛）。" }, accent: "#f3d77c" },
  { key: "directed",  name: { en: "Directed evolution",  zh: "定向进化" }, how: { en: "Mutate + screen in vitro at high speed.", zh: "在体外高速地突变 + 筛选。" }, pace: { en: "Weeks; Nobel 2018 (Arnold).", zh: "数周；2018 年诺奖（Arnold）。" }, accent: "#5ddcff" },
  { key: "edited",    name: { en: "Targeted editing",    zh: "靶向编辑" }, how: { en: "Rewrite specific letters on purpose.", zh: "有意地改写特定字母。" }, pace: { en: "Hours; a single edit at a time.", zh: "数小时；一次一个编辑。" }, accent: "#9986ff" },
];

/* ============================================================
   SECTION 3 — CRISPR LAB
   (CRISPRLab)
   ============================================================ */
export type CrisprStep = { num: string; name: Bi; what: Bi; accent: string };
export const CRISPR_STEPS: CrisprStep[] = [
  { num: "01", name: { en: "Design guide RNA",      zh: "设计导向 RNA" }, what: { en: "A 20-base sequence complementary to the target DNA.", zh: "一段与靶 DNA 互补的 20 碱基序列。" }, accent: "#34dba8" },
  { num: "02", name: { en: "Deliver Cas + gRNA",    zh: "递送 Cas + gRNA" }, what: { en: "Into the cell via virus, lipid nanoparticle or electroporation.", zh: "经病毒、脂质纳米颗粒或电穿孔进入细胞。" }, accent: "#5ddcff" },
  { num: "03", name: { en: "Find the target",       zh: "找到靶点" }, what: { en: "Cas-gRNA scans DNA for a matching sequence next to a PAM motif.", zh: "Cas-gRNA 扫描 DNA，寻找与之匹配、邻接 PAM 基序的序列。" }, accent: "#5ddcff" },
  { num: "04", name: { en: "Cut or rewrite",        zh: "切割或改写" }, what: { en: "Cas9 cuts both strands; base/prime editors rewrite without cutting.", zh: "Cas9 切断两条链；碱基/先导编辑器无需切割即可改写。" }, accent: "#f3d77c" },
  { num: "05", name: { en: "Cellular repair",       zh: "细胞修复" }, what: { en: "NHEJ knocks the gene out; HDR with a template inserts new code.", zh: "NHEJ 把基因敲除；有模板的 HDR 插入新的编码。" }, accent: "#9986ff" },
  { num: "06", name: { en: "Verify",                zh: "验证" }, what: { en: "Sequence the edit; check for off-targets across the genome.", zh: "对编辑进行测序；扫查全基因组的脱靶。" }, accent: "#ff89a4" },
];

export type CrisprTool = { key: string; name: Bi; cuts: Bi; precision: number; payload: Bi; useFor: Bi; accent: string };
export const CRISPR_TOOLS: CrisprTool[] = [
  { key: "cas9",  name: { en: "CRISPR-Cas9",         zh: "CRISPR-Cas9" }, cuts: { en: "Double-strand break", zh: "双链断裂" }, precision: 65, payload: { en: "Up to large inserts via HDR", zh: "经 HDR 可达较大插入" }, useFor: { en: "Knockouts, large edits in dividing cells", zh: "敲除、分裂细胞的大型编辑" }, accent: "#34dba8" },
  { key: "base",  name: { en: "Base editing",         zh: "碱基编辑" }, cuts: { en: "No cut (single deamination)", zh: "不切割（单次脱氨）" }, precision: 88, payload: { en: "Single letter: A→G or C→T", zh: "单个字母：A→G 或 C→T" }, useFor: { en: "Point mutations causing disease", zh: "致病点突变" }, accent: "#5ddcff" },
  { key: "prime", name: { en: "Prime editing",        zh: "先导编辑" }, cuts: { en: "Nick (single strand)", zh: "切口（单链）" }, precision: 92, payload: { en: "Small insertions, deletions, substitutions", zh: "小型插入、缺失、替换" }, useFor: { en: "Most disease variants in one tool", zh: "用一种工具覆盖多数致病变异" }, accent: "#f3d77c" },
  { key: "cas12", name: { en: "Cas12 / Cas13",        zh: "Cas12 / Cas13" }, cuts: { en: "Staggered cut · RNA targeting", zh: "交错切割 · RNA 靶向" }, precision: 75, payload: { en: "DNA or RNA editing", zh: "DNA 或 RNA 编辑" }, useFor: { en: "Diagnostics (SHERLOCK), RNA viruses", zh: "诊断（SHERLOCK）、RNA 病毒" }, accent: "#9986ff" },
  { key: "epi",   name: { en: "Epigenetic editors",   zh: "表观遗传编辑器" }, cuts: { en: "No cut (chemical mark)", zh: "不切割（化学标记）" }, precision: 82, payload: { en: "Turn genes on or off; reversible", zh: "开启或关闭基因；可逆" }, useFor: { en: "Expression without sequence change", zh: "不改变序列地调节表达" }, accent: "#ff89a4" },
];

/* ============================================================
   SECTION 4 — GENE THERAPY ATLAS
   (TherapyMap)
   ============================================================ */
export type Therapy = { key: string; name: Bi; target: Bi; mech: Bi; status: Bi; status_tier: number; accent: string };
export const GENE_THERAPIES: Therapy[] = [
  { key: "casgevy",  name: { en: "Casgevy (exa-cel)",  zh: "Casgevy（exa-cel）" }, target: { en: "Sickle-cell disease", zh: "镰状细胞贫血" }, mech: { en: "CRISPR edits BCL11A to reactivate fetal hemoglobin.", zh: "CRISPR 编辑 BCL11A，重启胎儿血红蛋白。" }, status: { en: "Approved 2023 (FDA, UK)", zh: "2023 年获批（FDA、英国）" }, status_tier: 0, accent: "#34dba8" },
  { key: "lyfgenia", name: { en: "Lyfgenia",           zh: "Lyfgenia" }, target: { en: "Sickle-cell disease", zh: "镰状细胞贫血" }, mech: { en: "Lentiviral delivery of an anti-sickling beta-globin gene.", zh: "慢病毒递送抗镰状化的 β-球蛋白基因。" }, status: { en: "Approved 2023 (FDA)", zh: "2023 年获批（FDA）" }, status_tier: 0, accent: "#34dba8" },
  { key: "zolgensma",name: { en: "Zolgensma",          zh: "Zolgensma" }, target: { en: "Spinal muscular atrophy", zh: "脊髓性肌萎缩" }, mech: { en: "AAV-delivered functional SMN1 gene; one infusion.", zh: "AAV 递送功能性 SMN1 基因；一次输注。" }, status: { en: "Approved 2019 (FDA)", zh: "2019 年获批（FDA）" }, status_tier: 0, accent: "#34dba8" },
  { key: "luxturna", name: { en: "Luxturna",           zh: "Luxturna" }, target: { en: "Inherited retinal dystrophy", zh: "遗传性视网膜营养不良" }, mech: { en: "AAV-delivered RPE65 gene injected under the retina.", zh: "AAV 递送 RPE65 基因，于视网膜下注射。" }, status: { en: "Approved 2017 (FDA)", zh: "2017 年获批（FDA）" }, status_tier: 0, accent: "#34dba8" },
  { key: "carT",     name: { en: "CAR-T therapies",    zh: "CAR-T 疗法" }, target: { en: "Blood cancers", zh: "血液肿瘤" }, mech: { en: "T cells edited to express a receptor for cancer antigens.", zh: "T 细胞被编辑以表达识别癌抗原的受体。" }, status: { en: "Multiple approvals 2017→", zh: "2017 年以来多次获批" }, status_tier: 0, accent: "#f3d77c" },
  { key: "verve",    name: { en: "VERVE-101 / -102",   zh: "VERVE-101 / -102" }, target: { en: "High cholesterol", zh: "高胆固醇" }, mech: { en: "In-vivo base editing of PCSK9 in the liver.", zh: "肝脏内 PCSK9 的体内碱基编辑。" }, status: { en: "Phase 2 trials", zh: "Phase 2 试验" }, status_tier: 2, accent: "#5ddcff" },
  { key: "cf",       name: { en: "Cystic fibrosis editing", zh: "囊性纤维化编辑" }, target: { en: "CFTR gene", zh: "CFTR 基因" }, mech: { en: "Prime editing of the most common CFTR variant.", zh: "对 CFTR 最常见变异的先导编辑。" }, status: { en: "Preclinical", zh: "临床前" }, status_tier: 3, accent: "#9986ff" },
  { key: "alz",      name: { en: "Alzheimer's risk genes", zh: "阿尔茨海默风险基因" }, target: { en: "APOE4 → APOE3", zh: "APOE4 → APOE3" }, mech: { en: "Base-edit a single risk allele in brain cells.", zh: "对脑细胞中的单个风险等位基因进行碱基编辑。" }, status: { en: "Research only", zh: "仅研究阶段" }, status_tier: 3, accent: "#9986ff" },
  { key: "germline", name: { en: "Germline editing",   zh: "生殖系编辑" }, target: { en: "Heritable changes", zh: "可遗传的改变" }, mech: { en: "Edits made to embryos pass to every cell, including descendants'.", zh: "对胚胎的编辑传至每一个细胞——包括后代的。" }, status: { en: "Banned in most jurisdictions", zh: "在多数司法辖区被禁" }, status_tier: 4, accent: "#ff89a4" },
];

/* ============================================================
   SECTION 5 — ENHANCEMENT LADDER
   (EnhancementLadder)
   ============================================================ */
export type EnhanceRung = { key: string; name: Bi; example: Bi; consent: Bi; risk: Bi; accent: string };
export const ENHANCEMENT_RUNGS: EnhanceRung[] = [
  { key: "cure",     name: { en: "Cure a disease",          zh: "治愈一种疾病" }, example: { en: "Reverse sickle-cell, restore sight.", zh: "逆转镰状细胞贫血、恢复视力。" }, consent: { en: "The patient consents directly.", zh: "患者本人同意。" }, risk: { en: "Adverse drug reactions; off-target edits.", zh: "药物不良反应；脱靶编辑。" }, accent: "#34dba8" },
  { key: "prevent",  name: { en: "Prevent a disease",       zh: "预防一种疾病" }, example: { en: "Lower lifetime cardiovascular risk.", zh: "降低终生心血管风险。" }, consent: { en: "Usually adult-to-adult.", zh: "通常是成人对成人。" }, risk: { en: "Risk/benefit ratio across a lifetime.", zh: "终生范围内的风险收益比。" }, accent: "#34dba8" },
  { key: "germline", name: { en: "Edit the germline",       zh: "编辑生殖系" }, example: { en: "Embryo edits passed to all descendants.", zh: "胚胎编辑被传递给所有后代。" }, consent: { en: "No one asks the future generations.", zh: "后代无人被征求意见。" }, risk: { en: "Irreversible across a lineage.", zh: "在世系中不可逆。" }, accent: "#f3d77c" },
  { key: "trait",    name: { en: "Edit non-disease traits", zh: "编辑非疾病性状" }, example: { en: "Eye color, height, lactose tolerance.", zh: "瞳色、身高、乳糖耐受。" }, consent: { en: "Embryo or child has none.", zh: "胚胎或孩子没有同意权。" }, risk: { en: "Frivolous edits in serious infrastructure.", zh: "在严肃基建之上做轻浮编辑。" }, accent: "#f3d77c" },
  { key: "cog",      name: { en: "Cognitive enhancement",   zh: "认知增强" }, example: { en: "Polygenic edits for IQ-correlated alleles.", zh: "对与 IQ 相关等位基因的多基因编辑。" }, consent: { en: "Embryo-level decisions.", zh: "胚胎层面的决定。" }, risk: { en: "Coordination collapse; status arms race.", zh: "协调瓦解；地位军备竞赛。" }, accent: "#9986ff" },
  { key: "speciate", name: { en: "Speciation",              zh: "新物种化" }, example: { en: "Edits so deep populations no longer interbreed.", zh: "深到种群不再相互繁衍的编辑。" }, consent: { en: "Civilizational decision.", zh: "文明级别的决定。" }, risk: { en: "Two cultures; or two species.", zh: "两种文化；或两个物种。" }, accent: "#ff89a4" },
];

/* ============================================================
   SECTION 6 — SYNTHETIC BIOLOGY CIRCUITS
   (SynBioCircuit)
   ============================================================ */
export type Gate = { key: string; name: Bi; logic: Bi; example: Bi; accent: string };
export const GENETIC_GATES: Gate[] = [
  { key: "and",    name: { en: "AND gate",        zh: "AND 门" }, logic: { en: "Outputs only when both inputs are present.", zh: "只有两个输入同时存在时才输出。" }, example: { en: "Kill cell only if it shows two tumor markers.", zh: "仅当细胞同时显示两种肿瘤标志物时才杀死。" }, accent: "#34dba8" },
  { key: "or",     name: { en: "OR gate",         zh: "OR 门" }, logic: { en: "Outputs when either input is present.", zh: "任一输入存在时输出。" }, example: { en: "Glow on either of two stress signals.", zh: "在两个应激信号之一存在时发光。" }, accent: "#5ddcff" },
  { key: "not",    name: { en: "NOT gate",        zh: "NOT 门" }, logic: { en: "Outputs only when the input is absent.", zh: "仅当输入缺失时输出。" }, example: { en: "Produce drug only when blood sugar is low.", zh: "仅当血糖降低时产生药物。" }, accent: "#f3d77c" },
  { key: "osc",    name: { en: "Oscillator",      zh: "振荡器" }, logic: { en: "Cycles output on a timed loop.", zh: "在定时回路上循环输出。" }, example: { en: "Synthetic circadian clock in E. coli.", zh: "大肠杆菌中的合成昼夜钟。" }, accent: "#9986ff" },
  { key: "memory", name: { en: "Toggle / memory", zh: "触发器 / 记忆" }, logic: { en: "Holds state after a transient input.", zh: "在瞬时输入之后保持状态。" }, example: { en: "Bacterium remembers it has seen a signal.", zh: "细菌「记得」它见过某个信号。" }, accent: "#ff89a4" },
  { key: "sense",  name: { en: "Biosensor",       zh: "生物传感器" }, logic: { en: "Translates a chemical input into a measurable output.", zh: "把化学输入翻译为可测的输出。" }, example: { en: "Color change when arsenic is in the water.", zh: "水中含砷时变色。" }, accent: "#5ddcff" },
];

export type SynbioMilestone = { year: string; name: Bi; what: Bi };
export const SYNBIO_MILESTONES: SynbioMilestone[] = [
  { year: "2000",  name: { en: "Repressilator",            zh: "Repressilator" }, what: { en: "A three-gene loop that oscillates — biology becomes circuit-buildable.", zh: "一个三基因环路开始振荡——生物学开始变得可被「搭电路」。" } },
  { year: "2010",  name: { en: "Synthia",                  zh: "Synthia" }, what: { en: "JCVI boots a bacterium from a chemically synthesized genome.", zh: "JCVI 用化学合成的基因组启动了一个细菌。" } },
  { year: "2016",  name: { en: "Syn3.0",                   zh: "Syn3.0" }, what: { en: "473 genes — a minimal genome stripped to its essentials.", zh: "473 个基因——被削减至本质的最小基因组。" } },
  { year: "2021",  name: { en: "Engineered phage therapy", zh: "工程化噬菌体疗法" }, what: { en: "Custom phages cleared a drug-resistant infection.", zh: "定制噬菌体清除了一种耐药感染。" } },
  { year: "2024+", name: { en: "Whole synthetic yeast",    zh: "全合成酵母" }, what: { en: "Sc2.0 nears completion: all 16 yeast chromosomes redesigned.", zh: "Sc2.0 接近完成：酵母全部 16 条染色体被重新设计。" } },
];

/* ============================================================
   SECTION 7 — AI × BIOLOGY STACK
   (AIBioStack)
   ============================================================ */
export type AILayer = { key: string; name: Bi; role: Bi; example: Bi; accent: string };
export const AI_BIO_LAYERS: AILayer[] = [
  { key: "read",   name: { en: "Read the genome",   zh: "读取基因组" }, role: { en: "Sequence + annotate variants at scale.", zh: "大规模测序与变异注释。" }, example: { en: "DeepVariant; ClinVar; UK Biobank.", zh: "DeepVariant；ClinVar；英国生物银行。" }, accent: "#5ddcff" },
  { key: "fold",   name: { en: "Predict structure", zh: "预测结构" }, role: { en: "Sequence → folded protein in seconds.", zh: "序列 → 折叠的蛋白，秒级完成。" }, example: { en: "AlphaFold 2/3; ESMFold; RoseTTAFold.", zh: "AlphaFold 2/3；ESMFold；RoseTTAFold。" }, accent: "#34dba8" },
  { key: "design", name: { en: "Design proteins",   zh: "设计蛋白" }, role: { en: "Specify a function; the model writes a sequence.", zh: "指定功能；模型写出序列。" }, example: { en: "RFdiffusion; ProteinMPNN; Chroma.", zh: "RFdiffusion；ProteinMPNN；Chroma。" }, accent: "#f3d77c" },
  { key: "edit",   name: { en: "Plan the edit",     zh: "规划编辑" }, role: { en: "Choose guide RNA + edit strategy + delivery.", zh: "选择导向 RNA + 编辑策略 + 递送方式。" }, example: { en: "CRISPick; Benchling AI; in-silico off-target scans.", zh: "CRISPick；Benchling AI；电子脱靶扫描。" }, accent: "#9986ff" },
  { key: "test",   name: { en: "Simulate the cell", zh: "模拟细胞" }, role: { en: "Predict whether the edit will do what you hoped.", zh: "预测该编辑是否做你所望之事。" }, example: { en: "Whole-cell models; digital twin organoids.", zh: "全细胞模型；类器官数字孪生。" }, accent: "#ff89a4" },
];

/* ============================================================
   SECTION 8 — ECO-ENGINEERING
   (EcoEngineering)
   ============================================================ */
export type EcoProject = { key: string; name: Bi; what: Bi; scope: Bi; risk: Bi; accent: string };
export const ECO_PROJECTS: EcoProject[] = [
  { key: "crops",   name: { en: "Engineered crops",      zh: "工程化作物" },   what: { en: "Drought, blight, salt and pest resistance.", zh: "抗旱、抗枯萎、抗盐、抗虫害。" }, scope: { en: "Farms · controlled deployment", zh: "农场 · 受控部署" }, risk: { en: "Trait flow to wild relatives.", zh: "性状外溢到野生近缘种。" }, accent: "#34dba8" },
  { key: "biofuel", name: { en: "Engineered microbes",   zh: "工程化微生物" }, what: { en: "Algae and bacteria designed to make fuel, plastic, food.", zh: "被设计来制造燃料、塑料、食品的藻与菌。" }, scope: { en: "Reactor / closed culture", zh: "反应器 / 封闭培养" }, risk: { en: "Containment; horizontal gene transfer.", zh: "围控；水平基因转移。" }, accent: "#5ddcff" },
  { key: "nfix",    name: { en: "Nitrogen-fixing rhizo", zh: "固氮根际菌" },   what: { en: "Microbes that pull nitrogen from air into the soil.", zh: "把氮气从空气中拉进土壤的微生物。" }, scope: { en: "Soil · field release", zh: "土壤 · 田间释放" }, risk: { en: "Ecosystem cascade; persistence.", zh: "生态级联；持久性。" }, accent: "#f3d77c" },
  { key: "drive",   name: { en: "Gene drives",           zh: "基因驱动" },     what: { en: "Inheritance bias sweeps a trait through a wild population.", zh: "遗传偏置让性状在野生种群中席卷。" }, scope: { en: "Mosquitoes, invasive rodents", zh: "蚊子、外来啮齿动物" }, risk: { en: "Irreversibility at population scale.", zh: "种群尺度的不可逆。" }, accent: "#ff89a4" },
  { key: "reef",    name: { en: "Reef rescue",           zh: "珊瑚救援" },     what: { en: "Heat-tolerant corals seeded onto bleaching reefs.", zh: "把耐热珊瑚播种到正在白化的礁石上。" }, scope: { en: "Reef-scale interventions", zh: "礁尺度的干预" }, risk: { en: "Selection pressure on wild populations.", zh: "对野生种群的选择压力。" }, accent: "#5ddcff" },
  { key: "deext",   name: { en: "De-extinction",         zh: "去灭绝" },       what: { en: "Mammoth/thylacine analogs assembled from cousin genomes.", zh: "用近缘基因组拼装的猛犸/袋狼类似物。" }, scope: { en: "Ecological insertion (tundra)", zh: "生态插入（苔原）" }, risk: { en: "Habitat fit; welfare; lost ecological partner.", zh: "栖境适配；福利；已逝的生态伙伴。" }, accent: "#9986ff" },
];

/* ============================================================
   SECTION 9 — POST-HUMAN SOCIETY
   (PostHumanSociety)
   ============================================================ */
export type SocietyAxis = { key: string; name: Bi; gloss: Bi; today: number; enhanced: number; designed: number; accent: string };
export const POSTHUMAN_AXES: SocietyAxis[] = [
  { key: "diversity",   name: { en: "Genetic diversity",   zh: "基因多样性" }, gloss: { en: "Range of inherited variation across the species.", zh: "物种内可遗传变异的范围。" }, today: 78, enhanced: 60, designed: 30, accent: "#ff89a4" },
  { key: "health",      name: { en: "Disease burden",      zh: "疾病负担" }, gloss: { en: "Inherited-disease prevalence at the population level.", zh: "种群层面的遗传病患病率。" }, today: 70, enhanced: 40, designed: 18, accent: "#34dba8" },
  { key: "equal",       name: { en: "Access inequality",   zh: "可及不平等" }, gloss: { en: "Gap between who can afford editing and who can't.", zh: "能否负担编辑之人之间的差距。" }, today: 45, enhanced: 72, designed: 88, accent: "#ff89a4" },
  { key: "consent",     name: { en: "Embryo consent gap",  zh: "胚胎同意鸿沟" }, gloss: { en: "Decisions made for future people who cannot speak.", zh: "为不能发声的未来之人所做的决定。" }, today: 30, enhanced: 70, designed: 92, accent: "#9986ff" },
  { key: "longevity",   name: { en: "Healthy lifespan",    zh: "健康寿命" }, gloss: { en: "Years lived in full functional capacity.", zh: "在完整功能下度过的年数。" }, today: 60, enhanced: 78, designed: 88, accent: "#f3d77c" },
  { key: "wisdom",      name: { en: "Generational memory", zh: "代际记忆" }, gloss: { en: "Whether editing erases or preserves continuity.", zh: "编辑是抹去还是保留延续。" }, today: 60, enhanced: 52, designed: 38, accent: "#9986ff" },
  { key: "exploration", name: { en: "Cognitive range",     zh: "认知范围" }, gloss: { en: "Diversity of minds available to the civilization.", zh: "文明所拥有之心智的多样性。" }, today: 70, enhanced: 75, designed: 55, accent: "#5ddcff" },
  { key: "agency",      name: { en: "Self-authorship",     zh: "自我书写" }, gloss: { en: "Whether the species directs its own evolution.", zh: "物种是否在指挥自己的进化。" }, today: 25, enhanced: 65, designed: 90, accent: "#f3d77c" },
];

export type AccessRegime = { key: string; name: Bi; note: Bi };
export const ACCESS_REGIMES: AccessRegime[] = [
  { key: "open",    name: { en: "Universal access", zh: "普惠可及" }, note: { en: "Editing covered as routine care, like vaccination.", zh: "编辑作为常规医疗被覆盖，如同疫苗。" } },
  { key: "tiered",  name: { en: "Tiered access",    zh: "分层可及" }, note: { en: "A few traits universal; the deeper edits priced out.", zh: "少数性状普及；更深的编辑被价格挡在外面。" } },
  { key: "private", name: { en: "Private market",   zh: "私人市场" }, note: { en: "Pay-to-edit; inequalities compound across generations.", zh: "付费编辑；不平等跨代叠加。" } },
];

/* ============================================================
   SECTION 10 — UNIFIED: BIG QUESTIONS
   ============================================================ */
export type BigQ = { q: Bi; lens: Bi };
export const BIG_QUESTIONS: BigQ[] = [
  { q: { en: "Where does therapy end and enhancement begin?", zh: "治疗止于何处，增强始于何处？" }, lens: { en: "Every cure removes a deficit. Every deficit is, secretly, relative.", zh: "每一次治愈都消除一个缺陷。每一个缺陷，秘密地，都是相对的。" } },
  { q: { en: "Should we edit the germline?", zh: "我们是否应当编辑生殖系？" }, lens: { en: "Heritable edits ask consent of people who do not yet exist.", zh: "可遗传的编辑，向尚不存在之人征求同意。" } },
  { q: { en: "How do we decide what is 'better'?", zh: "我们如何决定什么算「更好」？" }, lens: { en: "Optimization needs a target. Human flourishing has many.", zh: "优化需要一个靶子。人类的繁盛却有许多。" } },
  { q: { en: "Who governs an irreversible release?", zh: "谁来治理一次不可逆的释放？" }, lens: { en: "A gene drive is a treaty issue, not a lab safety issue.", zh: "基因驱动是条约问题，而非实验室安全问题。" } },
  { q: { en: "What does AI-designed biology owe to evolution?", zh: "AI 设计的生物欠进化什么？" }, lens: { en: "Four billion years of constraints we cannot yet articulate.", zh: "我们尚无法表述清楚的、四十亿年的约束。" } },
  { q: { en: "Can a species author itself responsibly?", zh: "一个物种能否负责任地书写自己？" }, lens: { en: "Self-authorship without humility is just a new lottery.", zh: "没有谦卑的自我书写，不过是一种新的彩票。" } },
];

/* ============================================================
   META-MODEL — PROGRAMMABLE LIFE (8 terms)
   (ProgrammableLifeModel — interactive radar)
   ============================================================ */
export type Capacity = { sym: string; name: Bi; gloss: Bi; natural: number; edited: number; synthetic: number };
export const CAPACITIES: Capacity[] = [
  { sym: "G", name: { en: "Genetic Information",   zh: "遗传信息" },     gloss: { en: "Quality + completeness of the genome being managed.", zh: "被管理的基因组的质量与完整性。" }, natural: 70, edited: 82, synthetic: 96 },
  { sym: "E", name: { en: "Evolutionary Dynamics", zh: "进化动力学" },   gloss: { en: "How variation is generated and selected.", zh: "变异如何产生与被选择。" }, natural: 92, edited: 60, synthetic: 30 },
  { sym: "C", name: { en: "Cellular Engineering",  zh: "细胞工程" },     gloss: { en: "Control over what cells do, build and become.", zh: "对细胞之所为、所建、所成的控制。" }, natural: 35, edited: 78, synthetic: 92 },
  { sym: "A", name: { en: "AI-Assisted Biology",   zh: "AI 辅助生物" },  gloss: { en: "Models predicting structure, function, and design.", zh: "预测结构、功能与设计的模型。" }, natural: 0,  edited: 70, synthetic: 88 },
  { sym: "S", name: { en: "Synthetic Systems",     zh: "合成系统" },     gloss: { en: "Custom-built genomes, circuits, organisms.", zh: "定制的基因组、回路、生物。" }, natural: 0,  edited: 30, synthetic: 90 },
  { sym: "M", name: { en: "Mutation Control",      zh: "突变控制" },     gloss: { en: "Ability to choose where change occurs.", zh: "选择「变化在何处发生」的能力。" }, natural: 20, edited: 84, synthetic: 90 },
  { sym: "B", name: { en: "Biological Computation", zh: "生物计算" },    gloss: { en: "Using cells to sense, compute, and store.", zh: "用细胞感知、计算、存储。" }, natural: 50, edited: 64, synthetic: 86 },
  { sym: "D", name: { en: "Conscious Design",      zh: "有意识的设计" }, gloss: { en: "Intentionality and accountability behind a change.", zh: "一个改变背后的意图性与可问责性。" }, natural: 0,  edited: 72, synthetic: 92 },
];

export type Profile = { key: "natural" | "edited" | "synthetic"; name: Bi; note: Bi };
export const PROFILES: Profile[] = [
  { key: "natural",   name: { en: "Natural evolution",      zh: "自然进化" },     note: { en: "Four billion years of accumulated tuning, no designer.", zh: "四十亿年累积的调校，没有设计者。" } },
  { key: "edited",    name: { en: "Edited biology",          zh: "被编辑的生物" }, note: { en: "Existing organisms rewritten in specific places.", zh: "对现有生物在特定位置的改写。" } },
  { key: "synthetic", name: { en: "Synthetic / AI-designed", zh: "合成 / AI 设计" }, note: { en: "Genomes, circuits, and organisms built largely from scratch.", zh: "在很大程度上从零搭起的基因组、回路与生物。" } },
];

/* ============================================================
   RECURSIVE PROGRAMMABLE-LIFE ENGINE — atom → post-biological
   (BioRecursion)
   ============================================================ */
export type RecursionLayer = { k: string; name: Bi; scale: Bi; move: Bi; color: string };
export const RECURSION_LAYERS: RecursionLayer[] = [
  { k: "atom",      name: { en: "Atoms",              zh: "原子" },           scale: { en: "10⁻¹⁰ m · matter",      zh: "10⁻¹⁰ 米 · 物质" }, move: { en: "Chemistry permits self-replication. Information has not yet learned to write itself.", zh: "化学允许自我复制。信息尚未学会书写自身。" }, color: "#5ddcff" },
  { k: "base",      name: { en: "Bases (A·T·G·C)",    zh: "碱基（A·T·G·C）" }, scale: { en: "10⁻⁹ m · code",         zh: "10⁻⁹ 米 · 编码" }, move: { en: "Four letters give matter a writeable alphabet.", zh: "四个字母赋予物质一套可书写的字母表。" }, color: "#34dba8" },
  { k: "gene",      name: { en: "Genes",              zh: "基因" },           scale: { en: "10³ bases · function",  zh: "10³ 碱基 · 功能" }, move: { en: "A passage of the text becomes a unit of meaning — one protein.", zh: "文本中的一段，成为意义的单元——一种蛋白。" }, color: "#34dba8" },
  { k: "genome",    name: { en: "Genome",             zh: "基因组" },         scale: { en: "10⁹ bases · the text",  zh: "10⁹ 碱基 · 全文" }, move: { en: "An entire book — every cell carries the same copy.", zh: "一整本书——每个细胞都携同一份拷贝。" }, color: "#f3d77c" },
  { k: "cell",      name: { en: "Cell",               zh: "细胞" },           scale: { en: "10⁻⁵ m · runtime",      zh: "10⁻⁵ 米 · 运行时" }, move: { en: "The code runs. The cell is the interpreter — and the printer.", zh: "代码开始运行。细胞既是解释器，也是打印机。" }, color: "#f3d77c" },
  { k: "organism",  name: { en: "Organism",            zh: "生物" },           scale: { en: "10⁰ m · body",           zh: "10⁰ 米 · 身体" }, move: { en: "Trillions of cells from one text. Programming becomes embodied.", zh: "数万亿细胞出自一段文本。编程开始具身。" }, color: "#9986ff" },
  { k: "edited",    name: { en: "Edited organism",     zh: "被编辑的生物" },   scale: { en: "CRISPR + base + prime",  zh: "CRISPR + 碱基 + 先导" }, move: { en: "Intelligence rewrites a single letter. The text begins to know itself.", zh: "智能改写一个字母。文本开始知道自己。" }, color: "#9986ff" },
  { k: "synthetic", name: { en: "Synthetic organism",  zh: "合成生物" },       scale: { en: "Built genomes",          zh: "搭建的基因组" }, move: { en: "Entire texts written from scratch. Authorship becomes possible.", zh: "整段文本被从零写起。作者身份成为可能。" }, color: "#5ddcff" },
  { k: "eco",       name: { en: "Edited ecosystem",    zh: "被编辑的生态系统" }, scale: { en: "Drives · releases",      zh: "驱动 · 释放" }, move: { en: "The library expands into the wild. Responsibility scales with it.", zh: "图书馆延伸入野外。责任随之扩张。" }, color: "#5ddcff" },
  { k: "civ",       name: { en: "Civilization",        zh: "文明" },           scale: { en: "10⁷ minds · governance", zh: "10⁷ 心智 · 治理" }, move: { en: "A species decides what is permitted to be written, and what is not.", zh: "一个物种决定什么准许被写，什么不准。" }, color: "#f3d77c" },
  { k: "post",      name: { en: "Post-biological",     zh: "后生物" },         scale: { en: "engineered substrates",  zh: "工程化的载体" }, move: { en: "Life as code becomes substrate-agnostic. The project, however, remains the same.", zh: "作为代码的生命变得载体无关。然而工程，仍是同一个。" }, color: "#f3d77c" },
];
