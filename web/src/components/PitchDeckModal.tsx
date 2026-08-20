'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Presentation, Award, Brain, Zap, Shield, TrendingUp, CheckCircle, Database } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function PitchDeckModal({ onClose }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'EduGraph-AI',
      subtitle: 'Sistem Pembelajaran Adaptif Berbasis Graph-Guided RAG & Deep Knowledge Tracing',
      tag: 'Campus Data Week 2026 — Innovation Case Competition Final',
      content: (
        <div className="space-y-6 text-center py-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Pusat Satu Data & Kecerdasan Digital (PUSAKA) Universitas Airlangga</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Rekonstruksi Mispersepsi Prasyarat Konsep STEM Melalui Inovasi AI
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Menghilangkan fenomena <span className="text-amber-400 font-semibold">&ldquo;Cumulative Concept Deficit&rdquo;</span> pada mahasiswa Indonesia dengan perpaduan Knowledge Graph, Deep Knowledge Tracing, dan Dialog Sokrates.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-4 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-black text-blue-400">91.2%</span>
              <p className="text-[11px] text-slate-400 mt-1">Penurunan Halusinasi AI via Graph-RAG</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-black text-emerald-400">0.864</span>
              <p className="text-[11px] text-slate-400 mt-1">AUC Prediksi Kesiapan Kognitif DKT</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xl font-black text-purple-400">-68%</span>
              <p className="text-[11px] text-slate-400 mt-1">Efisiensi Konsumsi Token API</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '1. Urgensi Masalah: The Cumulative Concept Deficit',
      subtitle: 'Mengapa Mahasiswa Mengulang Mata Kuliah STEM?',
      tag: 'Latar Belakang & Rumusan Masalah',
      content: (
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 space-y-2">
              <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider">Akar Masalah Nyata</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mata kuliah STEM (Kalkulus, Struktur Data, Machine Learning) bersifat <strong>hierarkis kumulatif</strong>. Mahasiswa gagal memahami <em>Gradient Descent</em> bukan karena tidak cerdas, melainkan karena pemahaman di <em>Aturan Rantai (Chain Rule)</em> masih rapuh.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Data Empiris</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tingkat pengulangan mata kuliah kuantitatif di PTN/PTS berkisar <strong>18% - 32%</strong>, berkontribusi langsung pada kelulusan tidak tepat waktu dan risiko evaluasi studi (DO).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Jurang Solusi Saat Ini (The Dual Void)</h4>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-red-400">LMS Konvensional:</span> Pasif, materi disajikan linier, tidak mampu mendiagnosis simpul prasyarat mana yang menjadi akar kebuntuan.
              </div>
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                <span className="font-bold text-amber-400">ChatGPT Bebas:</span> Membocorkan jawaban akhir (<em>cognitive offloading</em>), rentan halusinasi matematis, dan tidak punya memori kognitif siswa.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '2. Solusi EduGraph-AI: 3 Pilar Teknologi',
      subtitle: 'Menggabungkan Graph Database, Deep Learning, dan Socratic RAG',
      tag: 'Metodologi & Arsitektur',
      content: (
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900/60 border border-blue-700 flex items-center justify-center text-blue-400 font-bold text-sm">
              1
            </div>
            <h4 className="text-sm font-bold text-white">Syllabus Knowledge Graph (DAG)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Memetakan RPS/silabus menjadi graf dependensi prasyarat terarah tanpa siklus (DAG) dengan Neo4j.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-900/60 border border-emerald-700 flex items-center justify-center text-emerald-400 font-bold text-sm">
              2
            </div>
            <h4 className="text-sm font-bold text-white">Deep Knowledge Tracing (SAINT+)</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Model Transformer PyTorch yang melacak probabilitas penguasaan kognitif P(L_t) secara real-time dari data interaksi asesmen.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-purple-900/60 border border-purple-700 flex items-center justify-center text-purple-400 font-bold text-sm">
              3
            </div>
            <h4 className="text-sm font-bold text-white">Graph-RAG Socratic Tutor</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mengunci retrieval ke simpul prasyarat yang defisit, membimbing mahasiswa melalui pertanyaan reflektif bertahap dalam Bahasa Indonesia.
            </p>
          </div>
        </div>
      )
    },
    {
      title: '3. Formulasi Matematis & Algoritma',
      subtitle: 'Kelayakan Ilmiah & Ketahanan Metodologis (Defensibility)',
      tag: 'Mathematical Rigor',
      content: (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Pembaruan Probabilitas Kognitif (DKT Formulation)</h4>
            <div className="p-3 bg-black/60 rounded-lg text-center font-mono text-xs text-indigo-300 border border-slate-800">
              {'P(a_{t+1} = 1 | q_{t+1}, X_{1:t}) = \\sigma(W_y h_t + b_y)'}
            </div>
            <p className="text-xs text-slate-400">
              Hidden state {'h_t'} diperbarui oleh mekanisme Separated Self-Attention yang menangkap bobot retensi lupa (<em>forgetting curve</em>) dan jeda waktu pengerjaan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Graph-Constrained Subgraph Extraction</h4>
            <p className="text-xs text-slate-300">
              Ketika kegagalan terdeteksi di simpul target {'c_k'}, sistem menelusuri simpul pendahulu:
            </p>
            <div className="p-2 bg-black/60 rounded text-center font-mono text-xs text-emerald-300">
              {'P(c_k) = { c_i \\in V | (c_i, c_k) \\in E^* \\land P(L_{c_i}) < \\theta_{threshold} }'}
            </div>
          </div>
        </div>
      )
    },
    {
      title: '4. Dampak Institusional & Kepatuhan UU PDP',
      subtitle: 'Integrasi Satu Data Pendidikan Tinggi UNAIR & Kemendikbudristek',
      tag: 'Institutional Impact & Privacy',
      content: (
        <div className="grid grid-cols-2 gap-4 py-3">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
              <Database className="w-4 h-4" />
              <span>Satu Data UNAIR Integration</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Peta <em>bottleneck</em> kurikulum prodi secara otomatis.</li>
              <li>Early Warning System mendeteksi risiko DO lebih awal.</li>
              <li>Rekomendasi materi remedial bagi Dosen Wali &amp; Kaprodi.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <Shield className="w-4 h-4" />
              <span>Kepatuhan UU PDP No. 27/2022</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li>100% Pseudonimisasi ID mahasiswa via UUIDv4 terenkripsi.</li>
              <li>Opsi On-Premise / Hybrid LLM untuk data sensitif.</li>
              <li>Transparansi representasi graf (<em>Explainable AI</em>).</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: '5. Kesimpulan & Roadmap Implementasi',
      subtitle: 'Siap Menjadi Pemenang Juara 1 Campus Data Week 2026',
      tag: 'Roadmap & Closing',
      content: (
        <div className="space-y-4 py-3 text-center">
          <h3 className="text-xl font-bold text-white">
            Transformasi Dari Sekadar Menghafal Menjadi Memahami Secara Mendalam
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            EduGraph-AI membuktikan bahwa kecerdasan buatan dapat diarahkan untuk mendidik, memberdayakan nalar kritis, dan membangun ekosistem talenta data nasional.
          </p>

          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2 text-left text-xs">
            <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-800">
              <span className="font-bold text-blue-400">Fase 1 (Okt 2026)</span>
              <p className="text-[10px] text-slate-300 mt-1">Live MVP Prototype &amp; Final UNAIR</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800">
              <span className="font-bold text-emerald-400">Fase 2 (Nov-Des 2026)</span>
              <p className="text-[10px] text-slate-300 mt-1">Pilot Project Prodi Sains Data FTMM</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-950/60 border border-purple-800">
              <span className="font-bold text-purple-400">Fase 3 (2027)</span>
              <p className="text-[10px] text-slate-300 mt-1">Integrasi SPADA Indonesia Dikti</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-2xl glass-panel-glow bg-slate-950 border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6 flex flex-col max-h-[90vh]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-blue-400" />
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">{slides[currentSlide].tag}</span>
              <h3 className="text-sm font-bold text-white">{slides[currentSlide].title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              Slide {currentSlide + 1} / {slides.length}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 overflow-y-auto px-2">
          {slides[currentSlide].content}
        </div>

        {/* Slide Footer Navigation */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <button
            onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
            disabled={currentSlide === 0}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold border border-slate-800 flex items-center gap-1.5 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? 'w-6 bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}
            disabled={currentSlide === slides.length - 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
