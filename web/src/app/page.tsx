'use client';

import React, { useState } from 'react';
import { INITIAL_COURSES, MOCK_ANALYTICS } from '../lib/coursesData';
import { ConceptNode, PrerequisiteEdge, ChatMessage, Course } from '../lib/types';
import { updateDKTState } from '../lib/dktEngine';
import { getInitialWelcomeMessage, generateSocraticReply } from '../lib/socraticEngine';
import KnowledgeGraphView from '../components/KnowledgeGraphView';
import SocraticChat from '../components/SocraticChat';
import DiagnosticQuizModal from '../components/DiagnosticQuizModal';
import DosenAnalyticsView from '../components/DosenAnalyticsView';
import PitchDeckModal from '../components/PitchDeckModal';
import {
  BrainCircuit,
  GraduationCap,
  LayoutDashboard,
  Presentation,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Award,
  Layers,
  Scale,
  Cpu
} from 'lucide-react';

export default function Home() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [activeCourseId, setActiveCourseId] = useState(courses[0].id);
  const currentCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  const [nodes, setNodes] = useState<ConceptNode[]>(currentCourse.nodes);
  const [edges, setEdges] = useState<PrerequisiteEdge[]>(currentCourse.edges);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(nodes.find((n) => n.status === 'deficit') || nodes[0]);

  // Mode: student vs dosen analytics
  const [activeTab, setActiveTab] = useState<'student' | 'analytics'>('student');

  // Chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([getInitialWelcomeMessage(selectedNode || undefined)]);
  const [isChatThinking, setIsChatThinking] = useState(false);

  // Modals & Highlights
  const [quizNode, setQuizNode] = useState<ConceptNode | null>(null);
  const [showPitchDeck, setShowPitchDeck] = useState(false);
  const [backtrackedNodeId, setBacktrackedNodeId] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Course Switcher handler
  const handleSwitchCourse = (courseId: string) => {
    const selectedCourse = courses.find((c) => c.id === courseId);
    if (!selectedCourse) return;
    setActiveCourseId(courseId);
    setNodes(selectedCourse.nodes);
    setEdges(selectedCourse.edges);
    const initNode = selectedCourse.nodes.find((n) => n.status === 'deficit') || selectedCourse.nodes[0];
    setSelectedNode(initNode);
    setBacktrackedNodeId(undefined);
    setMessages([getInitialWelcomeMessage(initNode)]);
    showToast(`Beralih ke kurikulum: ${selectedCourse.title}`);
  };

  // Node selection handler
  const handleSelectNode = (node: ConceptNode) => {
    setSelectedNode(node);
    setBacktrackedNodeId(undefined);
    const welcome = getInitialWelcomeMessage(node);
    setMessages((prev) => [...prev, welcome]);
  };

  // Quiz submission with DKT calculation
  const handleQuizSubmit = (nodeId: string, isCorrect: boolean, deficitRootId?: string) => {
    const { updatedNodes, masteryDelta, message, backtrackedTo } = updateDKTState(
      nodes,
      edges,
      nodeId,
      isCorrect,
      deficitRootId
    );

    setNodes(updatedNodes);
    if (backtrackedTo) {
      setBacktrackedNodeId(backtrackedTo);
    }

    showToast(message);

    const targetNode = updatedNodes.find((n) => n.id === nodeId);
    if (targetNode) {
      setSelectedNode(targetNode);
    }

    // System message in chat
    const sysMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      sender: 'system',
      text: isCorrect
        ? `✅ **Evaluasi DKT:** Jawaban asesmen pada topik **${targetNode?.label}** tepat! Probabilitas penguasaan kognitif P(L) naik menjadi ${(targetNode?.masteryScore! * 100).toFixed(0)}%.`
        : `⚠️ **Evaluasi DKT:** Terdeteksi miskonsepsi pada **${targetNode?.label}**. Backtracking graf mengarahkan fokus ke konsep prasyarat: **${nodes.find((n) => n.id === backtrackedTo)?.label || 'Prasyarat'}**.`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, sysMsg]);
  };

  // Chat message sending
  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsChatThinking(true);

    setTimeout(() => {
      const deficitNode = backtrackedNodeId ? nodes.find((n) => n.id === backtrackedNodeId) : undefined;
      const aiReply = generateSocraticReply(text, selectedNode || undefined, deficitNode);
      setMessages((prev) => [...prev, aiReply]);
      setIsChatThinking(false);
    }, 700);
  };

  // 1-Click "Aha!" Moment Demo Trigger for Competition Pitch
  const triggerAhaMomentDemo = () => {
    if (activeCourseId === 'course-law-soshum') {
      // SOSHUM Demo Case
      const lawNode = nodes.find((n) => n.id === 'alasan_penghapus');
      if (!lawNode) return;
      setSelectedNode(lawNode);
      setBacktrackedNodeId('unsur_tindak_pidana');

      const demoMsg: ChatMessage = {
        id: `demo-law-${Date.now()}`,
        sender: 'assistant',
        text: `🚀 **[SIMULASI LIVE DEMO FINAL · SOSHUM HUKUM PIDANA]**\n\nMahasiswa baru saja menjawab salah dalam menganalisis kasus korban begal yang membela diri melampaui batas (*Noodweer Excess*).\n\n**Analisis Graph-RAG:** Mahasiswa belum menguasai pemisahan antara *Sifat Melawan Hukum Perbuatan (Alasan Pembenar)* vs *Kesalahan Pembuat (Alasan Pemaaf)*.\n\nMari kita bedah secara Sokrates:\nJika perbuatan membela diri tersebut tetap melanggar hukum secara fisik, tetapi pelakunya dimaafkan karena goncangan jiwa hebat, apakah dasar putusannya adalah **Alasan Pembenar** atau **Alasan Pemaaf**?`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isSocraticQuestion: true,
        suggestedResponses: [
          'Dasar putusannya adalah Alasan Pemaaf (Noodweer Excess Pasal 49 ayat 2)',
          'Mengapa perbuatannya sendiri tetap berstatus melawan hukum?',
          'Bagaimana menyusun konstruksi pembuktian di pengadilan?'
        ]
      };
      setMessages((prev) => [...prev, demoMsg]);
      showToast('Simulasi Live Pitch Demo SOSHUM (Hukum) Aktif!');
    } else {
      // STEM Demo Case
      const chainNode = nodes.find((n) => n.id === 'chain_rule');
      if (!chainNode) return;
      setSelectedNode(chainNode);
      setBacktrackedNodeId('single_derivative');

      const demoMsg: ChatMessage = {
        id: `demo-stem-${Date.now()}`,
        sender: 'assistant',
        text: `🚀 **[SIMULASI LIVE DEMO FINAL · STEM MACHINE LEARNING]**\n\nMahasiswa baru saja menjawab salah pada soal turunan komposit $f(x) = (2x^2 + 1)^3$.\n\n**Analisis Graph-RAG:** Mahasiswa lupa mengalikan dengan turunan fungsi dalam $g'(x) = 4x$.\n\nMari kita bimbing menggunakan analogi **Kotak di dalam Kotak (Matryoshka Doll)** 🪆:\n- Turunan Kotak Luar $[\\dots]^3 = 3[\\dots]^2$\n- Turunan Kotak Dalam $(2x^2 + 1) = 4x$\n\nBerapa hasil perkalian keduanya?`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        isSocraticQuestion: true,
        suggestedResponses: [
          'Hasilnya adalah 12x(2x^2 + 1)^2',
          'Mengapa turunan angka 1 di dalam kurung hilang?',
          'Terapkan ini ke fungsi loss Gradient Descent!'
        ]
      };
      setMessages((prev) => [...prev, demoMsg]);
      showToast('Simulasi Live Pitch Demo STEM (Kalkulus & ML) Aktif!');
    }
  };

  // Reset cognitive state
  const handleReset = () => {
    setNodes(currentCourse.nodes);
    setSelectedNode(currentCourse.nodes[0]);
    setBacktrackedNodeId(undefined);
    setMessages([getInitialWelcomeMessage(currentCourse.nodes[0])]);
    showToast('Kondisi kognitif graf telah di-reset ke nilai awal.');
  };

  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 p-3.5 rounded-xl bg-slate-900/95 border border-blue-500/80 text-xs font-semibold text-white shadow-2xl shadow-blue-500/20 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold text-white tracking-tight">EduGraph-AI</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/80">
                PUSAKA UNAIR · CDW 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Cross-Disciplinary Adaptive Skill Graph & Socratic Tutor (STEM & SOSHUM)
            </p>
          </div>
        </div>

        {/* Center Tabs */}
        <div className="hidden md:flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('student')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'student'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Peta Belajar & Socratic Tutor</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dosen & PUSAKA Satu Data</span>
          </button>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerAhaMomentDemo}
            className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition active:scale-95 animate-pulse"
            title="Pemicu Live Demo Pitch Final"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulasi Pitch Final</span>
          </button>

          <button
            onClick={() => setShowPitchDeck(true)}
            className="px-3.5 py-1.5 bg-purple-600/80 hover:bg-purple-600 text-white rounded-xl text-xs font-bold border border-purple-500/50 flex items-center gap-1.5 transition active:scale-95 shadow"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pitch Deck (15m)</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition border border-slate-800"
            title="Reset Kondisi Kognitif"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Discipline & Course Switcher Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Pilih Domain Rumpun Ilmu
              </span>
              <span className="text-xs text-slate-400">· Kampus Satu Data Universitas Airlangga</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {courses.map((c) => {
                const isSelected = c.id === activeCourseId;
                const isSoshum = c.id.includes('soshum');
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSwitchCourse(c.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25 ring-1 ring-blue-400'
                        : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {isSoshum ? <Scale className="w-3.5 h-3.5 text-amber-400" /> : <Cpu className="w-3.5 h-3.5 text-blue-400" />}
                    <span>{c.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs flex-shrink-0">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <span className="text-slate-400">Total Simpul:</span>
              <span className="font-mono font-bold text-blue-400">{nodes.length} Konsep</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
              <span className="text-slate-400">Rata-Rata Kognitif:</span>
              <span className="font-mono font-bold text-emerald-400">
                {((nodes.reduce((acc, n) => acc + n.masteryScore, 0) / nodes.length) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Tab 1: Student View (Split Screen Graph + Socratic Chat) */}
        {activeTab === 'student' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <KnowledgeGraphView
                nodes={nodes}
                edges={edges}
                selectedNode={selectedNode}
                onSelectNode={handleSelectNode}
                onStartQuiz={(node) => setQuizNode(node)}
                backtrackedNodeId={backtrackedNodeId}
              />
            </div>

            <div className="lg:col-span-5">
              <SocraticChat
                messages={messages}
                activeConcept={selectedNode}
                onSendMessage={handleSendMessage}
                isThinking={isChatThinking}
              />
            </div>
          </div>
        ) : (
          /* Tab 2: Institutional Analytics (Dosen / PUSAKA UNAIR) */
          <DosenAnalyticsView
            analytics={MOCK_ANALYTICS}
            onSendAdvisoryIntervention={(studentName) => {
              showToast(`Notifikasi bimbingan remedial berhasil dikirim ke mahasiswa ${studentName}.`);
            }}
            onAutoParseSyllabus={(syllabusText) => {
              showToast('Syllabus-to-Graph Parser berhasil mengekstrak simpul konsep & dependensi DAG.');
            }}
          />
        )}
      </div>

      {/* Diagnostic Quiz Modal */}
      {quizNode && (
        <DiagnosticQuizModal
          node={quizNode}
          onClose={() => setQuizNode(null)}
          onSubmitAnswer={handleQuizSubmit}
          onStartRemedialChat={(node, deficitId) => {
            const deficitNode = deficitId ? nodes.find((n) => n.id === deficitId) : undefined;
            const remedialMsg: ChatMessage = {
              id: `remedial-${Date.now()}`,
              sender: 'assistant',
              text: `Mari kita perbaiki pemahamanmu pada topik **${node.label}** melalui penuntun konsep ${deficitNode ? `**${deficitNode.label}**` : 'prasyarat'}.\n\nApa bagian yang menurutmu paling menantang: diferensiasi unsur normatifnya atau penerapannya pada kasus konkret?`,
              timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              isSocraticQuestion: true,
              suggestedResponses: [
                'Diferensiasi unsur normatif dasarnya',
                'Mengapa unsur tersebut menentukan kualifikasi perbuatan',
                'Beri saya analogi sederhana untuk mengingatnya'
              ]
            };
            setMessages((prev) => [...prev, remedialMsg]);
            setActiveTab('student');
          }}
        />
      )}

      {/* Pitch Deck Modal */}
      {showPitchDeck && <PitchDeckModal onClose={() => setShowPitchDeck(false)} />}
    </main>
  );
}
