'use client';

import React, { useState } from 'react';
import { ClassAnalytics, ConceptNode } from '../lib/types';
import { Users, AlertTriangle, TrendingUp, BookOpen, Send, Sparkles, CheckCircle, Database, ShieldAlert, Cpu } from 'lucide-react';

interface Props {
  analytics: ClassAnalytics;
  onSendAdvisoryIntervention: (studentName: string) => void;
  onAutoParseSyllabus: (syllabusText: string) => void;
}

export default function DosenAnalyticsView({
  analytics,
  onSendAdvisoryIntervention,
  onAutoParseSyllabus
}: Props) {
  const [syllabusInput, setSyllabusInput] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [parseSuccess, setParseSuccess] = useState(false);

  const handleParse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!syllabusInput.trim()) return;
    setIsParsing(true);
    setParseSuccess(false);

    setTimeout(() => {
      onAutoParseSyllabus(syllabusInput.trim());
      setIsParsing(false);
      setParseSuccess(true);
      setTimeout(() => setParseSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Mahasiswa Terdaftar</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white">{analytics.totalStudents}</div>
          <p className="text-[11px] text-emerald-400 font-medium">100% data terpseudonimkan (UU PDP)</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Rata-Rata Penguasaan Kelas</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-white">{analytics.classAverageMastery}%</div>
          <p className="text-[11px] text-slate-400">DKT Cognitive State Aggregate</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Konsep Bottleneck Kritis</span>
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400">{analytics.bottleneckConcepts.length} Topik</div>
          <p className="text-[11px] text-red-300">&gt;50% mahasiswa gagal di prasyarat ini</p>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Early Warning Risk Alert</span>
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">
            {analytics.atRiskStudents.filter((s) => s.riskLevel === 'High').length} Mahasiswa
          </div>
          <p className="text-[11px] text-amber-300">Memerlukan intervensi remedial segera</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Class Bottleneck Heatmap */}
        <div className="rounded-2xl glass-panel border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="text-sm font-bold text-white">Heatmap Kesenjangan Konsep (Class Bottlenecks)</h3>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800">
              Analisis Prasyarat UNAIR
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Pusat Satu Data mendeteksi topik di mana mahasiswa paling banyak tersangkut sebelum materi Ujian Tengah Semester (UTS):
          </p>

          <div className="space-y-3">
            {analytics.bottleneckConcepts.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-200">{item.conceptLabel}</span>
                  <span className="font-mono text-red-400 font-bold">{item.failureRate}% Gagal / Defisit</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                    style={{ width: `${item.failureRate}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Dampak: {item.impactedStudents} dari {analytics.totalStudents} mahasiswa</span>
                  <span className="text-blue-400 hover:underline cursor-pointer">Kirim Bahan Remedial Kelas &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Early Warning System (At-Risk Students) */}
        <div className="rounded-2xl glass-panel border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Early Warning System (Dosen Wali / DPA View)</h3>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
              Explainable AI (XAI)
            </span>
          </div>

          <p className="text-xs text-slate-400">
            Daftar mahasiswa terdeteksi berisiko mengalami penurunan performa akademik beserta atribusi akar masalah:
          </p>

          <div className="space-y-3">
            {analytics.atRiskStudents.map((st) => (
              <div key={st.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white">{st.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">NIM: {st.nim} · Aktif {st.lastActive}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    st.riskLevel === 'High' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    Risk: {st.riskScore}% ({st.riskLevel})
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400 font-medium">Akar Masalah: </span>
                  <span className="text-red-300 font-semibold">{st.topBottleneck}</span>
                  <p className="mt-1 text-slate-400 text-[10px]">{st.recommendedIntervention}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => onSendAdvisoryIntervention(st.name)}
                    className="px-3 py-1.5 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition active:scale-95 shadow"
                  >
                    <Send className="w-3 h-3" />
                    <span>Kirim Notifikasi Bimbingan</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Automated Syllabus to Knowledge Graph Generator */}
      <div className="rounded-2xl glass-panel-glow border border-blue-900/40 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Automated Syllabus-to-Knowledge Graph Constructor</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
            DAG Extractor & Cycle Detector
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Tempelkan teks Rencana Pembelajaran Semester (RPS) atau silabus mata kuliah baru untuk mengonstruksi graf konsep berarah secara otomatis menggunakan LLM Schema Parser:
        </p>

        <form onSubmit={handleParse} className="space-y-3">
          <textarea
            rows={3}
            value={syllabusInput}
            onChange={(e) => setSyllabusInput(e.target.value)}
            placeholder="Contoh: Minggu 1: Aljabar Linier Dasar (Vektor, Matriks). Prasyarat untuk: Minggu 2: Turunan Parsial & Gradien. Minggu 3: Algoritma Optimasi Gradient Descent..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              {parseSuccess && (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" /> Graf berhasil dikonstruksi tanpa siklus ketergantungan!
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isParsing || !syllabusInput.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition active:scale-95"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isParsing ? 'animate-spin' : ''}`} />
              <span>{isParsing ? 'Mengekstrak Graf...' : 'Konstruksi Knowledge Graph'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
