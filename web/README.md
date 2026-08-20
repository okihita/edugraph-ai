# EduGraph-AI 🧠📊
### Campus Data Week 2026 — Innovation Case Competition
**Pusat Satu Data dan Kecerdasan Digital (PUSAKA) Universitas Airlangga**

> **Official Theme:** *"Improving Student’s Learning Experience in Indonesia Through AI Innovation"*  
> **Live Prototype:** [https://edugraph.okihita.dev](https://edugraph.okihita.dev)  
> **Scientific Proposal:** [proposal/PROPOSAL_EDUGRAPH_AI_ICC2026.pdf](../proposal/PROPOSAL_EDUGRAPH_AI_ICC2026.pdf)

---

## 📌 Repository Structure

```
├── materials/                        # Competition Reference Materials & Guidebooks
│   ├── GUIDEBOOK CDW 2026...pdf      # Official UNAIR Competition Guidebook
│   └── guidebook_extracted_text.txt  # Extracted text for quick search
├── proposal/                         # Scientific Paper Proposal (IEEE Format)
│   ├── PROPOSAL_EDUGRAPH_AI_ICC2026.pdf  # Compiled Academic PDF (Typst)
│   ├── PROPOSAL_EDUGRAPH_AI_ICC2026.typ  # Typst Source Code
│   └── PROPOSAL_EDUGRAPH_AI_ICC2026.md   # Markdown Proposal Document
└── web/                              # Next.js MVP Web Application (pnpm + TypeScript)
    ├── src/
    │   ├── app/                      # Next.js App Router (Layout & Pages)
    │   ├── components/               # Interactive Graph, Socratic Chat, Analytics, Pitch Deck
    │   └── lib/                      # Deep Knowledge Tracing Engine, Socratic Prompt Engine
    ├── package.json
    ├── tsconfig.json
    └── next.config.mjs
```

---

## 🚀 Running the Web Application Locally

```bash
cd web
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Core Innovation Pillars

1. **Syllabus-to-Knowledge Graph Constructor:** Maps prerequisite curriculum dependencies into Directed Acyclic Graphs (DAG).
2. **Deep Knowledge Tracing Engine (SAINT+/DKT):** Dynamically updates student cognitive mastery probability $P(L_t)$.
3. **Graph-Constrained Socratic AI Tutor:** Delivers zero-hallucination, step-by-step guidance in Bahasa Indonesia without leaking answers.
4. **PUSAKA Satu Data Analytics:** Class bottleneck heatmap and Explainable Early Warning Risk System for academic advisors.
