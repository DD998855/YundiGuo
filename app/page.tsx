"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type Project = {
  id: string;
  number: string;
  title: string;
  kickerEn: string;
  kickerZh: string;
  lineEn: string;
  lineZh: string;
  tagsEn: string[];
  tagsZh: string[];
  href: string;
  artifactHref?: string;
  preview: "live" | "document";
  level: "core" | "featured" | "archive";
  className: string;
};

const projects: Project[] = [
  {
    id: "flow",
    number: "01",
    title: "FLOW",
    kickerEn: "AI PRODUCT · 2026",
    kickerZh: "人工智能产品 · 2026",
    lineEn: "AI workspace for work buried in WeChat.",
    lineZh: "把埋在微信群聊里的工作变成行动。",
    tagsEn: ["Product", "UX", "Prototype"],
    tagsZh: ["产品", "体验", "原型"],
    href: "/flow-prototype.html",
    preview: "live",
    level: "core",
    className: "card-flow",
  },
  {
    id: "dilab",
    number: "02",
    title: "DILAB",
    kickerEn: "AI COMPANY · 2025",
    kickerZh: "人工智能公司 · 2025",
    lineEn: "Brand, web & AI research communication.",
    lineZh: "品牌、官网与人工智能研究传播。",
    tagsEn: ["Brand", "Web", "Research"],
    tagsZh: ["品牌", "网页", "研究"],
    href: "https://dilab.ai/",
    preview: "live",
    level: "core",
    className: "card-dilab",
  },
  {
    id: "aed",
    number: "03",
    title: "AED TRAINING",
    kickerEn: "INTERACTION · 2026",
    kickerZh: "交互学习 · 2026",
    lineEn: "Guide. Practice. Assess.",
    lineZh: "引导、练习、评估。",
    tagsEn: ["Interaction", "Learning"],
    tagsZh: ["交互", "学习体验"],
    href: "https://guoyund.phoenix.sheridanc.on.ca/AED-Training-Module-main/",
    preview: "live",
    level: "featured",
    className: "card-aed",
  },
  {
    id: "carson",
    number: "04",
    title: "DAVID CARSON",
    kickerEn: "TYPOGRAPHY · 2026",
    kickerZh: "字体与网页 · 2026",
    lineEn: "Research meets controlled chaos.",
    lineZh: "让研究进入受控的视觉混乱。",
    tagsEn: ["Type", "Research", "Web"],
    tagsZh: ["字体", "研究", "网页"],
    href: "https://guoyund.phoenix.sheridanc.on.ca/David-Carson-main/",
    preview: "live",
    level: "featured",
    className: "card-carson",
  },
  {
    id: "cloud",
    number: "05",
    title: "CLOUD",
    kickerEn: "SPATIAL · INTERACTION",
    kickerZh: "空间 · 交互装置",
    lineEn: "When movement becomes input.",
    lineZh: "当人的移动成为交互输入。",
    tagsEn: ["Spatial", "Physical", "Concept"],
    tagsZh: ["空间", "实体交互", "概念"],
    href: "https://sheridanc-my.sharepoint.com/:b:/r/personal/guoyund_shernet_sheridancollege_ca/Documents/Yundi%20Guo%27s%20Portfolio%20Prj1.pdf?d=w9ba34287e43f4e8ebcda31f72971049e&csf=1&web=1&e=VcKzkE",
    preview: "document",
    level: "featured",
    className: "card-cloud",
  },
  {
    id: "emotion",
    number: "06",
    title: "EMOTIONAL CREATURE",
    kickerEn: "EMOTION · INTERACTION",
    kickerZh: "情绪 · 交互探索",
    lineEn: "Making emotion visible and responsive.",
    lineZh: "让情绪变得可见、可触发。",
    tagsEn: ["Emotion", "Interaction", "Concept"],
    tagsZh: ["情绪", "交互", "概念"],
    href: "https://sheridanc-my.sharepoint.com/:b:/r/personal/guoyund_shernet_sheridancollege_ca/Documents/Yundi%20Guo%27s%20Portfolio%20Prj2.pdf?d=w8e338b86c8cd46bcaf5e058227e4f733&csf=1&web=1&e=ab5L19",
    preview: "document",
    level: "featured",
    className: "card-emotion",
  },
  {
    id: "daily",
    number: "07",
    title: "DAILY GRIND",
    kickerEn: "DASHBOARD · ARCHIVE",
    kickerZh: "数据看板 · 归档",
    lineEn: "Operational data, made readable.",
    lineZh: "把运营数据变成清晰的判断。",
    tagsEn: ["Dashboard", "IA", "UI"],
    tagsZh: ["看板", "信息架构", "界面"],
    href: "https://guoyund.phoenix.sheridanc.on.ca/The-Daily-Grind-Dashboard-main/",
    artifactHref: "https://sheridanc-my.sharepoint.com/:b:/g/personal/guoyund_shernet_sheridancollege_ca/IQBg-cRfT8J6R7fDYLtI8TDiAdzunjRnRrcH-umYFgFMoyU?e=xbom0y",
    preview: "live",
    level: "archive",
    className: "card-daily",
  },
  {
    id: "letterform",
    number: "08",
    title: "LETTERFORM",
    kickerEn: "TYPOGRAPHY · WEB",
    kickerZh: "字体 · 网页排版",
    lineEn: "Type as structure, rhythm and interface.",
    lineZh: "用网页呈现字体的结构与节奏。",
    tagsEn: ["Typography", "Layout", "Web"],
    tagsZh: ["字体", "排版", "网页"],
    href: "https://guoyund.phoenix.sheridanc.on.ca/Yundi-Guo-Project-1-Letterform-Construction-Classification-and-Use-main/",
    preview: "live",
    level: "archive",
    className: "card-letterform",
  },
  {
    id: "basketball",
    number: "09",
    title: "BASKETBALL CLUB",
    kickerEn: "UX WEB · ARCHIVE",
    kickerZh: "用户体验网页 · 归档",
    lineEn: "A clearer path through community content.",
    lineZh: "为社群内容建立更清晰的浏览路径。",
    tagsEn: ["UX", "Web", "Archive"],
    tagsZh: ["体验", "网页", "归档"],
    href: "https://guoyund.phoenix.sheridanc.on.ca/The-Basketball-Club-main/",
    preview: "live",
    level: "archive",
    className: "card-basketball",
  },
  {
    id: "learnfu",
    number: "10",
    title: "LEARNFU",
    kickerEn: "WEB STUDY · ARCHIVE",
    kickerZh: "网页练习 · 归档",
    lineEn: "An early web study — process, not polish.",
    lineZh: "保留过程，不伪装成熟。",
    tagsEn: ["Web", "Front-end", "Archive"],
    tagsZh: ["网页", "前端", "归档"],
    href: "https://guoyund.phoenix.sheridanc.on.ca/LearnFu-main/",
    preview: "live",
    level: "archive",
    className: "card-learnfu",
  },
];

const caseStudies = {
  flow: {
    roleEn: "PRODUCT DESIGN · IA · UX · UI · PROTOTYPING",
    roleZh: "产品设计 · 信息架构 · 交互 · 界面 · 原型",
    year: "2026",
    scopeEn: ["Dashboard", "Conversations", "Projects", "Knowledge library", "Task management", "PRFAQ"],
    scopeZh: ["首页看板", "群聊", "项目", "资料库", "任务管理", "PRFAQ"],
    zh: {
      title: "把微信群聊里的工作，整理成一张可执行的人工智能工作台。",
      intro: "Flow / Sandpile AI 是我在 DILAB 实习期间设计并实现的 Web MVP。我从信息架构、交互流程和产品文案一路做到响应式适配、可用性迭代、PRFAQ 与可运行的 HTML/CSS/JavaScript 原型。",
      problem: "任务、文件、负责人和截止时间散落在持续发生的群聊里。问题不是信息不存在，而是用户很难快速知道：发生了什么、我该做什么、事情进到哪里。",
      decision: "我没有再做一个聊天工具，而是把非结构化对话重新组织成首页简报、群聊、项目、任务和资料库。重要信息可以被追溯，低置信度内容需要确认，关键动作仍然留给人。",
      reflection: "这个项目把我的关注点从“一个界面长什么样”推向“一个人工智能产品应该怎样行动”：什么时候主动、什么时候保持安静，以及用户为什么愿意相信它。",
    },
    en: {
      title: "Turning work buried in WeChat into an actionable AI workspace.",
      intro: "Flow / Sandpile AI is a responsive Web MVP I designed and implemented during my DILAB internship. My scope ran from information architecture, interaction flows, and product copy to responsive adaptation, usability iteration, PRFAQ, and a functional HTML/CSS/JavaScript prototype.",
      problem: "Tasks, files, owners, and deadlines disappear inside continuous group conversations. The real problem is not missing information — it is knowing what changed, what needs action, and where work stands.",
      decision: "Instead of making another chat tool, I reorganized unstructured conversation into a daily brief, chats, projects, tasks, and a traceable knowledge library. Uncertain information stays confirmable and consequential actions remain human-led.",
      reflection: "This project moved my attention from how a screen looks to how an AI product behaves: when it should act, when it should stay quiet, and what makes its output trustworthy.",
    },
  },
  dilab: {
    roleEn: "PRODUCT DESIGN INTERN · BRAND · WEB · RESEARCH COMMUNICATION",
    roleZh: "产品设计实习生 · 品牌 · 官网 · 研究传播",
    year: "MAY—JUL 2025",
    scopeEn: ["Logo & identity", "Public website", "Bilingual research pages", "Blog visuals", "Data visualization", "Presentations"],
    scopeZh: ["Logo 与品牌", "公司官网", "双语研究页面", "Blog 视觉", "数据可视化", "展示材料"],
    zh: {
      title: "让一家人工智能公司用一致、清晰的方式解释自己。",
      intro: "我在 Dynamic Intelligence Lab 以 Product Design Intern 身份工作，负责并参与品牌视觉系统、Logo 多方向迭代、公司官网、海报与视觉素材、双语 AI 研究网页、Blog 图片、数据可视化和展示材料。",
      problem: "人工智能研究往往对技术团队很清楚，对外部受众却很抽象。品牌和官网的任务不只是“显得专业”，而是建立一套能组织复杂内容、降低理解成本并产生信任的表达系统。",
      decision: "我把 Logo、版式、网页组件、研究图表和编辑视觉当作同一个系统处理，让不同载体保持一致，同时让技术内容拥有更清晰的阅读层级。",
      reflection: "这段经历让我更确定自己不是只想做视觉。我喜欢站在产品、研究、交互、品牌和前端之间，把复杂的东西真正变成别人可以理解和使用的东西。",
    },
    en: {
      title: "Giving an AI company a coherent way to explain itself.",
      intro: "As a Product Design Intern at Dynamic Intelligence Lab, I worked across identity and logo iterations, the public website, posters and visual assets, bilingual AI research pages, blog imagery, data visualization, and presentation materials.",
      problem: "AI research can be clear to a technical team and still feel abstract to everyone else. The job of the brand and website was not simply to look professional, but to organize complexity, lower the cost of understanding, and build trust.",
      decision: "I treated identity, typography, web components, research graphics, and editorial visuals as one communication system so that different outputs could feel consistent while technical content remained legible.",
      reflection: "The experience clarified the kind of designer I want to become: someone who works between product, research, interaction, brand, and front-end to make complex things genuinely understandable and usable.",
    },
  },
  aed: {
    roleEn: "INTERACTION · LEARNING EXPERIENCE · WEB",
    roleZh: "交互 · 学习体验 · 网页",
    year: "2026",
    scopeEn: ["Scenario", "Guided learning", "Practice", "Assessment"],
    scopeZh: ["情境", "引导学习", "交互练习", "最终评估"],
    zh: {
      title: "把高压力的急救流程变成可理解、可练习的交互体验。",
      intro: "AED Training Module 把急救学习拆成 Scenario、Guided Learning、Interactive Practice 与 Final Assessment，让用户不是只“看过”，而是真的沿着步骤练习。",
      problem: "急救信息不是知道了就等于会做。压力会放大记忆、判断与犹豫上的困难。",
      decision: "我用逐步引导、明确的进度状态、即时反馈和重复练习降低认知负担，把复杂步骤变成可以跟随的行动路径。",
      reflection: "这个项目让我意识到：好的交互经常不是增加操作，而是在最紧张的时候减少用户必须思考的东西。",
    },
    en: {
      title: "Turning a high-pressure emergency procedure into a learnable interaction.",
      intro: "The AED Training Module structures learning as Scenario, Guided Learning, Interactive Practice, and Final Assessment so users do more than read the procedure — they rehearse it.",
      problem: "Knowing emergency information is not the same as being able to act. Stress amplifies uncertainty, memory gaps, and hesitation.",
      decision: "I used progressive guidance, visible progress, explicit feedback, and repetition to reduce cognitive load and turn unfamiliar steps into a followable action path.",
      reflection: "The project reinforced a principle I now carry elsewhere: good interaction often means reducing what a person must figure out in the moment.",
    },
  },
  carson: {
    roleEn: "TYPOGRAPHY · RESEARCH · INTERACTIVE WEB",
    roleZh: "字体 · 研究 · 交互网页",
    year: "2026",
    scopeEn: ["Research", "Typography", "Composition", "Digital translation"],
    scopeZh: ["研究", "字体", "构图", "数字转译"],
    zh: {
      title: "不是模仿 David Carson，而是把他的视觉逻辑重新翻译成网页。",
      intro: "这是一个以研究为基础的实验性网页，从设计哲学、字体、构图到实体应用，研究 Carson 如何通过错位、叠加、裁切和尺度变化创造“受控的混乱”。",
      problem: "如果只是把 Carson 的平面作品整齐地排进网页，他最重要的张力、规则破坏与视觉节奏反而会被抹掉。",
      decision: "我把错位、叠加、突然的尺度变化和不稳定节奏转译成网页中的信息层级与交互，同时保留可阅读的路径。",
      reflection: "它提醒我：系统不等于整齐。真正有意图的规则，也可以创造失衡、摩擦和情绪。",
    },
    en: {
      title: "Not copying David Carson — translating his visual logic into the web.",
      intro: "A research-driven web experiment spanning Carson’s philosophy, typography, compositions, and physical applications, studying how misalignment, layering, cropping, and abrupt scale create controlled chaos.",
      problem: "Placing Carson’s print work inside a perfectly clean grid would erase the tension, broken rules, and visual rhythm that make it meaningful.",
      decision: "I translated misalignment, layering, abrupt scale, and unstable rhythm into digital hierarchy and interaction while preserving a navigable reading path.",
      reflection: "It reminded me that systems do not have to mean neatness. Intentional rules can also create imbalance, friction, and emotion.",
    },
  },
  cloud: {
    roleEn: "SPATIAL INTERACTION · CONCEPT · EXPERIENCE",
    roleZh: "空间交互 · 概念 · 体验设计",
    year: "2026",
    scopeEn: ["Spatial behavior", "Physical input", "Feedback", "Experience flow"],
    scopeZh: ["空间行为", "实体输入", "反馈", "体验流程"],
    zh: {
      title: "让空间本身成为界面，而不只是承载一个屏幕。",
      intro: "Cloud Interactive Installation 是一个实体交互概念：人的动作进入系统，装置通过空间、形态与反馈回应。它代表了我希望长期继续探索的 physical interaction 方向。",
      problem: "很多数字交互默认用户面对屏幕、点击按钮，但真实世界中的人首先是通过身体、距离和动作感知环境。",
      decision: "我把移动与靠近视为输入，把可感知的空间变化视为反馈，从“按什么按钮”转向“人在空间里做了什么”。",
      reflection: "它让我开始把 interaction 理解为行为关系，而不只是界面组件。",
    },
    en: {
      title: "Treating space itself as the interface — not just a place to put a screen.",
      intro: "Cloud Interactive Installation is a physical-interaction concept in which human movement becomes input and the installation responds through spatial and perceptible feedback. It represents a direction I want to keep exploring long-term.",
      problem: "Digital interaction often assumes a screen and a button, while people experience physical environments first through bodies, distance, and movement.",
      decision: "I treated approach and movement as inputs and spatial change as feedback, shifting the question from ‘what does the user click?’ to ‘what does the person do in space?’",
      reflection: "It pushed me to see interaction as a relationship between behaviors, not only a collection of interface components.",
    },
  },
  emotion: {
    roleEn: "EMOTION · INTERACTION · CONCEPT",
    roleZh: "情绪 · 交互 · 概念设计",
    year: "2026",
    scopeEn: ["Emotional states", "Character", "Trigger", "Feedback"],
    scopeZh: ["情绪状态", "角色", "触发", "反馈"],
    zh: {
      title: "把抽象的情绪，变成可以看见与触发的互动关系。",
      intro: "Emotional Creature 用角色与环境的变化表达情绪状态，让观众不需要先理解一套理论，也可以直接感受到情绪被唤起、变化与安放的过程。",
      problem: "情绪很难被准确描述；如果交互只依赖文字说明，体验会变得理性而遥远。",
      decision: "我用角色状态、环境变化和触发关系替代长篇解释，让感受先发生，再让意义被理解。",
      reflection: "它让我更关注交互中的情感层：反馈不仅告诉用户发生了什么，也决定用户如何感受它。",
    },
    en: {
      title: "Making an abstract emotional state visible, triggerable, and felt.",
      intro: "Emotional Creature uses changes between a character and its environment to express emotional states, allowing the experience to be understood through response rather than explanation alone.",
      problem: "Emotion is difficult to describe precisely. When an interaction depends on explanatory text, the experience can become rational and distant.",
      decision: "I used character states, environmental change, and trigger-response relationships so the feeling arrives before the explanation.",
      reflection: "It made me pay closer attention to the emotional layer of interaction: feedback communicates not only what happened, but how an experience feels.",
    },
  },
  daily: {
    roleEn: "INFORMATION ARCHITECTURE · DASHBOARD · UI",
    roleZh: "信息架构 · 数据看板 · 界面",
    year: "2026",
    scopeEn: ["Performance summary", "Inventory alerts", "Top products", "Weekly trend"],
    scopeZh: ["业绩概览", "库存预警", "热销产品", "周趋势"],
    zh: {
      title: "把分散的运营数据，整理成可以快速判断的界面。",
      intro: "The Daily Grind 是一个运营数据看板练习，将 Performance Summary、Inventory Alerts、Top Products 和 Weekly Revenue Trend 放在同一套清晰的信息层级里。",
      problem: "数据很多不等于信息清楚。用户真正需要的是快速识别重点指标、异常与变化趋势。",
      decision: "我用概览、告警、排名和趋势四个层级组织信息，让用户先看到状态，再决定是否深入。",
      reflection: "它是一个相对直接的项目，但很好地记录了我对 hierarchy、scanability 和 dashboard density 的早期理解。",
    },
    en: {
      title: "Turning scattered operational data into a screen built for quick decisions.",
      intro: "The Daily Grind is an operations dashboard study that brings Performance Summary, Inventory Alerts, Top Products, and Weekly Revenue Trend into one readable hierarchy.",
      problem: "More data does not automatically mean more clarity. The user needs to identify key metrics, anomalies, and changing trends quickly.",
      decision: "I organized the interface into overview, alerts, ranking, and trend layers so the current state appears first and detail remains available when needed.",
      reflection: "It is a relatively direct project, but it records an important stage in how I learned to think about hierarchy, scanability, and dashboard density.",
    },
  },
  letterform: {
    roleEn: "TYPOGRAPHY · WEB · INFORMATION LAYOUT",
    roleZh: "字体 · 网页 · 信息排版",
    year: "2026",
    scopeEn: ["Letterform", "Classification", "Reading", "Web layout"],
    scopeZh: ["字形", "分类", "阅读", "网页排版"],
    zh: {
      title: "把字体研究做成网页，也把排版本身变成内容。",
      intro: "Letterform Typography Website 围绕字形构造、分类和正文阅读展开。我把字体知识组织成网页层级，用实际排版证明对尺度、行距、列宽和可读性的理解。",
      problem: "Typography 很容易停留在术语层面；如果页面本身不好读，关于字体的解释就失去了说服力。",
      decision: "我让每一段知识都通过真实排版被演示，用网页结构连接理论、字形观察与阅读体验。",
      reflection: "它是一个偏基础的作品，但非常直接地展示了我对信息密度和阅读节奏的控制。",
    },
    en: {
      title: "Turning typography research into a webpage where the layout becomes part of the lesson.",
      intro: "The Letterform Typography Website explores construction, classification, and reading. I organized the research through real web typography to demonstrate scale, leading, measure, and hierarchy in practice.",
      problem: "Typography can easily remain theoretical. If the page explaining type is itself difficult to read, the argument loses credibility.",
      decision: "I used actual layout as evidence, connecting terminology and letterform analysis to a concrete reading experience.",
      reflection: "It is a foundational project, but it directly shows how I think about information density and reading rhythm.",
    },
  },
  basketball: {
    roleEn: "UX · INFORMATION ARCHITECTURE · WEB",
    roleZh: "用户体验 · 信息架构 · 网页",
    year: "2025",
    scopeEn: ["Navigation", "Content", "Events", "Responsive web"],
    scopeZh: ["导航", "内容", "活动", "响应式网页"],
    zh: {
      title: "一个较早期的网页项目，重点是内容路径和基础交互。",
      intro: "Basketball Club Website 面向社群用户组织加入方式、活动、训练与常见信息。它作为 Archive 保留，用来展示我早期对网页信息架构和浏览节奏的实践。",
      problem: "社群网站的信息类型很多，如果没有清晰入口，用户很难判断先看什么、下一步做什么。",
      decision: "我用导航、分区和行动入口整理内容，让活动、加入与训练信息各自拥有明确位置。",
      reflection: "它不是我现在最强的作品，但能诚实展示我的网页实践如何逐步成熟。",
    },
    en: {
      title: "An earlier web project focused on content paths and fundamental interaction.",
      intro: "The Basketball Club Website organizes joining, events, training, and community information. I keep it in the archive as evidence of my earlier work with web information architecture and browsing rhythm.",
      problem: "Community sites contain many content types. Without clear entry points, users struggle to know what matters and what to do next.",
      decision: "I used navigation, content sections, and action entry points to give events, joining, and training information distinct roles.",
      reflection: "It is not my strongest current work, but it honestly shows how my web practice developed.",
    },
  },
  learnfu: {
    roleEn: "WEB · FRONT-END · ARCHIVE",
    roleZh: "网页 · 前端 · 归档",
    year: "ARCHIVE",
    scopeEn: ["Web study", "Interface", "Front-end", "Iteration"],
    scopeZh: ["网页练习", "界面", "前端", "迭代"],
    zh: {
      title: "我选择把它留下，但不会把早期练习包装成成熟产品。",
      intro: "LearnFu 是我较早期的网页作品之一。它被保留在这里，是因为作品集也应该让人看到能力如何形成，而不只是展示最后几个最成熟的结果。",
      problem: "早期作品的价值不在于证明“已经做到最好”，而在于暴露当时对结构、视觉和前端实现的判断。",
      decision: "我把它明确标成 Archive，并保留 live version。这样它不会和核心 case study 抢权重，但仍然可以被查看和比较。",
      reflection: "下一轮我会继续判断它是否值得升级为完整 case study；在那之前，诚实的归档比过度包装更有价值。",
    },
    en: {
      title: "Keeping an early web study visible without pretending it is a finished product.",
      intro: "LearnFu is one of my earlier web pieces. I keep it here because a portfolio can show how a practice developed, not only the final polished outcomes.",
      problem: "The value of an early project is not proving that everything was already solved. It exposes the decisions I was making about structure, visual design, and front-end execution at that stage.",
      decision: "I label it clearly as Archive and keep the live version accessible. It stays visible without competing with the core case studies for hierarchy.",
      reflection: "I can still decide later whether it deserves a full rebuild. Until then, an honest archive is more useful than over-packaging it.",
    },
  },
} as const;

function PixelParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = { x: number; y: number; homeX: number; homeY: number; size: number; blue: boolean; alpha: number; phase: number };
    let particles: Particle[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let pointerX = -9999;
    let pointerY = -9999;

    const seedParticles = () => {
      const count = Math.max(150, Math.min(320, Math.round(width / 6)));
      particles = Array.from({ length: count }, (_, index) => {
        const yBias = Math.pow(Math.random(), 0.54);
        const x = Math.random() * width;
        const y = height * (0.56 + yBias * 0.42);
        return {
          x,
          y,
          homeX: x,
          homeY: y,
          size: index % 17 === 0 ? 3 : index % 5 === 0 ? 2 : 1,
          blue: index % 19 === 0,
          alpha: 0.15 + Math.random() * 0.34,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    };

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;
    };
    const onLeave = () => { pointerX = -9999; pointerY = -9999; };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const dx = p.x - pointerX;
        const dy = p.y - pointerY;
        const dist = Math.hypot(dx, dy);
        if (dist < 125) {
          const force = (1 - dist / 125) * 2.8;
          p.x += (dx / Math.max(dist, 1)) * force;
          p.y += (dy / Math.max(dist, 1)) * force;
        }
        p.x += (p.homeX - p.x) * 0.035 + Math.sin(time * 0.00055 + p.phase) * 0.035;
        p.y += (p.homeY - p.y) * 0.035 + Math.cos(time * 0.00045 + p.phase) * 0.025;
        ctx.fillStyle = p.blue ? `rgba(49,88,245,${Math.min(0.62, p.alpha + 0.12)})` : `rgba(17,17,15,${p.alpha})`;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      frame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-particles" aria-hidden="true" />;
}

function ProjectVisual({ id, large = false }: { id: string; large?: boolean }) {
  return (
    <span className={`project-visual visual-${id} ${large ? "is-large" : ""}`} aria-hidden="true">
      {id === "flow" && <><span className="mini-side"><i /><i /><i /><i /></span><span className="mini-main"><b>Today</b><i /><i /><i /><em /></span></>}
      {id === "dilab" && <><span className="dilab-frame"><img src="/dilab-logo.svg" alt="" /><b>DYNAMIC<br />INTELLIGENCE<br />LAB</b></span></>}
      {id === "aed" && <><span className="aed-cross">+</span><span className="aed-steps"><i>01</i><i>02</i><i>03</i></span></>}
      {id === "carson" && <><b className="carson-a">TYPE</b><b className="carson-b">CHAOS</b><i className="carson-rule" /></>}
      {id === "cloud" && <><span className="cloud-glyph">☁</span><span className="cloud-sensor">MOVE → RESPONSE</span></>}
      {id === "emotion" && <><span className="emotion-axis" /><span className="emotion-signal" /><span className="emotion-caption">FEEL · SHIFT · RESPOND</span></>}
      {id === "daily" && <><span className="daily-metric"><b>84%</b><i>PERFORMANCE</i></span><span className="daily-bars"><i /><i /><i /><i /><i /></span></>}
      {id === "letterform" && <><b className="letter-a">Aa</b><span className="letter-lines"><i /><i /><i /><i /></span></>}
      {id === "basketball" && <><span className="ball-mark"><i /><i /></span><b className="ball-copy">CLUB<br />01</b></>}
      {id === "learnfu" && <><b className="fu-mark">福</b><span className="fu-pixels"><i /><i /><i /></span></>}
    </span>
  );
}

export default function Home() {
  const stageRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [lang, setLang] = useState<"en" | "zh">("en");
  const [panel, setPanel] = useState<"about" | keyof typeof caseStudies | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOffsets, setDragOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const dragRef = useRef<{ id: string; pointerId: number; startX: number; startY: number; baseX: number; baseY: number; moved: boolean } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--px", `${(x * 12).toFixed(1)}px`);
      el.style.setProperty("--py", `${(y * 9).toFixed(1)}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [panel]);

  useEffect(() => {
    if (!panel || panel === "about") return;
    const reset = () => {
      (document.activeElement as HTMLElement | null)?.blur?.();
      document.querySelector<HTMLElement>(".case-overlay")?.scrollTo({ top: 0, left: 0 });
    };
    const frame = window.requestAnimationFrame(reset);
    const afterEmbed = window.setTimeout(reset, 450);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(afterEmbed);
    };
  }, [panel]);

  const zh = lang === "zh";

  const startDrag = (id: string, event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const base = dragOffsets[id] ?? { x: 0, y: 0 };
    dragRef.current = { id, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, baseX: base.x, baseY: base.y, moved: false };
    suppressClickRef.current = false;
    setDragging(id);
    setActive(id);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (id: string, event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true;
    if (!drag.moved) return;
    setDragOffsets((current) => ({ ...current, [id]: { x: drag.baseX + dx, y: drag.baseY + dy } }));
  };

  const endDrag = (id: string, event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== id || drag.pointerId !== event.pointerId) return;
    suppressClickRef.current = drag.moved;
    if (drag.moved) {
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 120);
    }
    dragRef.current = null;
    setDragging(null);
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* capture already released */ }
  };

  const openProject = (id: keyof typeof caseStudies) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setPanel(id);
  };

  return (
    <main className="portfolio-shell">
      <header className="site-header">
        <div className="header-status"><span className="status-dot" />{zh ? "人工智能产品 / 交互 / 原型" : "AI PRODUCT / INTERACTION / PROTOTYPE"}</div>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={() => setPanel("about")}>{zh ? "关于" : "ABOUT"}</button>
          <button className="language-pill" type="button" aria-label="Switch language" onClick={() => setLang(zh ? "en" : "zh")}>
            {zh ? <>中 <span>/</span> EN</> : <>EN <span>/</span> 中</>}
          </button>
        </nav>
      </header>

      <section className="hero-stage" id="top" ref={stageRef} aria-label="Selected work">
        <PixelParticleField />
        <div className="hero-copy">
          <p className="hero-name">{zh ? "郭云笛 · YUNDI GUO" : "YUNDI GUO"}</p>
          <p className="eyebrow">{zh ? "产品设计 · 交互设计 · 人工智能" : "PRODUCT DESIGN · INTERACTION · AI"} / 2026</p>
          <h1>{zh ? <><span className="zh-title">人工智能产品<br />与交互体验<br />设计师</span><span className="period">.</span></> : <>AI PRODUCT<br />&amp; INTERACTION<br />DESIGNER<span className="period">.</span></>}</h1>
          <p className="hero-statement">
            {zh ? "我把复杂的技术、信息与行为逻辑，转化成清晰、自然、可以真正使用的产品体验。" : <>I turn complex technology, information, and behavior<br className="desktop-break" /> into clear, human experiences people can actually use.</>}
          </p>
        </div>

        <div className="project-deck">
          {projects.map((project) => (
            <button
              type="button"
              key={project.id}
              className={`project-card level-${project.level} ${project.className} ${active === project.id ? "is-active" : ""} ${dragging === project.id ? "is-dragging" : ""}`}
              style={{ "--drag-x": `${dragOffsets[project.id]?.x ?? 0}px`, "--drag-y": `${dragOffsets[project.id]?.y ?? 0}px` } as CSSProperties}
              onMouseEnter={() => setActive(project.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(project.id)}
              onBlur={() => setActive(null)}
              onPointerDown={(event) => startDrag(project.id, event)}
              onPointerMove={(event) => moveDrag(project.id, event)}
              onPointerUp={(event) => endDrag(project.id, event)}
              onPointerCancel={(event) => endDrag(project.id, event)}
              onClick={() => openProject(project.id as keyof typeof caseStudies)}
              aria-label={zh ? `打开 ${project.title} 项目` : `Open ${project.title} case study`}
            >
              <span className="card-topline"><span>{zh ? project.kickerZh : project.kickerEn}</span><b>{project.number}</b></span>
              <ProjectVisual id={project.id} />
              <span className="card-copy"><strong>{project.title}</strong><span>{zh ? project.lineZh : project.lineEn}</span></span>
              <span className="card-tags">{(zh ? project.tagsZh : project.tagsEn).map((tag) => <i key={tag}>{tag}</i>)}</span>
            </button>
          ))}
        </div>

        <div className="scroll-cue"><span>{zh ? "拖动卡片" : "DRAG CARDS"}</span><i /><span>{zh ? "点击展开" : "CLICK TO OPEN"}</span></div>
      </section>

      {panel === "about" && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label={zh ? "关于 Yundi" : "About Yundi"}>
          <button className="overlay-backdrop" aria-label="Close" onClick={() => setPanel(null)} />
          <section className="about-panel">
            <div className="panel-head"><span>{zh ? "关于 / 郭云笛" : "ABOUT / YUNDI GUO"}</span><button onClick={() => setPanel(null)} aria-label={zh ? "关闭" : "Close"}>×</button></div>
            <div className="about-layout">
              <div className="about-story">
                <p className="case-index">{zh ? "个人定位 / 01" : "PROFILE / 01"}</p>
                <h2>{zh ? <>AI 交互体验设计师<br /><span>AI 产品原型探索者</span></> : <>AI Experience Designer<br /><span>AI Product Prototyper</span></>}</h2>
                <p className="about-lead">{zh ? "我是郭云笛，一名交互设计背景的 AI 产品与体验设计师。我关注 AI 如何进入真实工作与生活：从用户研究、信息架构和交互流程，到 Agent 行为逻辑、反馈机制，再到 Figma 与 HTML/CSS/JavaScript 高保真原型。" : "I’m Yundi Guo, an interaction-design-trained AI product and experience designer. I focus on how AI enters real work and everyday use—from research, information architecture, and interaction flows to agent behavior, feedback logic, and high-fidelity prototypes in Figma and HTML/CSS/JavaScript."}</p>
                <p className="about-secondary">{zh ? "我希望成为连接技术、产品与人的设计师：理解系统如何工作，也判断它什么时候应该主动、什么时候应该保持安静，并把复杂性重新组织成自然、可信、可使用的体验。" : "I want to work between technology, product, and people: understanding how a system works, deciding when it should act or stay quiet, and reorganizing complexity into experiences that feel natural, trustworthy, and usable."}</p>

                <div className="about-capabilities">
                  <article><span>01 / {zh ? "AI 产品与系统" : "AI PRODUCT & SYSTEMS"}</span><p>{zh ? "生成式 AI 体验、Agent 协作流程、AI 参与与反馈逻辑。" : "Generative AI experiences, agent workflows, participation and feedback logic."}</p></article>
                  <article><span>02 / {zh ? "研究与交互" : "RESEARCH & INTERACTION"}</span><p>{zh ? "用户研究、场景与旅程、信息架构、可用性测试。" : "User research, scenarios and journeys, information architecture, usability testing."}</p></article>
                  <article><span>03 / {zh ? "视觉系统" : "VISUAL SYSTEMS"}</span><p>{zh ? "Figma、品牌与网页系统、信息层级、生成式 UI。" : "Figma, brand and web systems, information hierarchy, generative UI."}</p></article>
                  <article><span>04 / {zh ? "原型与实现" : "PROTOTYPING"}</span><p>{zh ? "HTML/CSS/JavaScript、AI 辅助编程、p5.js 与 3D。" : "HTML/CSS/JavaScript, AI-assisted coding, p5.js, and 3D."}</p></article>
                </div>

                <div className="about-track">
                  <div className="about-track-head">{zh ? "经历" : "EXPERIENCE"}</div>
                  <div className="about-track-row"><strong>DILAB</strong><span>Product Design Intern</span><time>MAY—JUL 2025</time></div>
                  <div className="about-track-row"><strong>TGA</strong><span>UI/UX Design Intern</span><time>MAY—JUL 2025</time></div>
                  <div className="about-track-row"><strong>{zh ? "个人项目" : "INDEPENDENT"}</strong><span>AI Interaction Prototypes</span><time>2025—NOW</time></div>
                </div>

                <div className="about-education"><span>{zh ? "教育" : "EDUCATION"}</span><p>Sheridan College · {zh ? "交互设计本科（在读） · Art Fundamentals · TCPS 2" : "Bachelor of Interaction Design (in progress) · Art Fundamentals · TCPS 2"}</p></div>
              </div>
              <figure className="about-portrait">
                <img src="/yundi-portrait.png" alt={zh ? "郭云笛的黑白肖像" : "Black and white portrait of Yundi Guo"} />
              </figure>
            </div>
          </section>
        </div>
      )}

      {panel && panel !== "about" && (() => {
        const study = caseStudies[panel];
        const copy = study[lang];
        const project = projects.find((item) => item.id === panel)!;
        return (
          <div className="case-overlay" role="dialog" aria-modal="true" aria-label={zh ? `${project.title} 项目详情` : `${project.title} case study`}>
            <header className="case-nav">
              <button onClick={() => setPanel(null)}>← {zh ? "返回作品" : "BACK TO WORK"}</button>
              <span>{project.number} / {projects.length.toString().padStart(2, "0")}</span>
              <button onClick={() => setLang(zh ? "en" : "zh")}>{zh ? "EN" : "中文"}</button>
            </header>
            <article className={`case-page case-${project.id}`}>
              <section className="case-hero">
                <div className="case-kicker"><span>{zh ? study.roleZh : study.roleEn}</span><span>{study.year}</span></div>
                <div className="case-title-row">
                  <div className="case-title-copy">
                    <h2>{project.title}</h2>
                    <p className="case-tagline">{copy.title}</p>
                    <p className="case-summary">{copy.intro}</p>
                    <div className="case-actions">
                      <a className="case-live-link" href={project.href} target="_blank" rel="noreferrer">{project.preview === "document" ? (zh ? "查看项目 PDF ↗" : "VIEW PROJECT PDF ↗") : (zh ? "查看真实项目 ↗" : "VIEW LIVE PROJECT ↗")}</a>
                      {project.artifactHref && <a className="case-secondary-link" href={project.artifactHref} target="_blank" rel="noreferrer">{zh ? "设计过程 PDF ↗" : "PROCESS PDF ↗"}</a>}
                      {project.preview === "document" && <span className="external-note">{zh ? "外部链接 · 可能需要 Microsoft 登录" : "EXTERNAL LINK · MICROSOFT SIGN-IN MAY BE REQUIRED"}</span>}
                    </div>
                    <div className="scope-row">{(zh ? study.scopeZh : study.scopeEn).map((item) => <span key={item}>{item}</span>)}</div>
                  </div>
                  <ProjectVisual id={project.id} large />
                </div>
              </section>
              {project.preview === "live" && (
                <section className="live-project-section">
                  <div className="live-project-head"><span>{zh ? "真实项目预览" : "LIVE PROJECT PREVIEW"}</span><a href={project.href} target="_blank" rel="noreferrer">{zh ? "在新窗口打开 ↗" : "OPEN IN NEW TAB ↗"}</a></div>
                  <div className="browser-frame"><div className="browser-bar"><i /><i /><i /><span>{project.href.replace("https://", "")}</span></div><iframe src={project.href} title={`${project.title} live project`} loading="lazy" /></div>
                </section>
              )}
              <section className="case-notes">
                <article><span>01 / {zh ? "问题" : "CONTEXT"}</span><p>{copy.problem}</p></article>
                <article><span>02 / {zh ? "设计判断" : "DESIGN MOVE"}</span><p>{copy.decision}</p></article>
                <article><span>03 / {zh ? "反思" : "TAKEAWAY"}</span><p>{copy.reflection}</p></article>
              </section>
            </article>
          </div>
        );
      })()}
    </main>
  );
}
