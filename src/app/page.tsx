'use client';

import React, { useState } from 'react';
import { INITIAL_COURSES, MOCK_ANALYTICS } from '../lib/coursesData';
import { ConceptNode, PrerequisiteEdge, ChatMessage } from '../lib/types';
import { updateDKTState, tracePrerequisiteMisconceptions } from '../lib/dktEngine';
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
  Award
} from 'lucide-react';

export default function Home() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [activeCourseId, setActiveCourseId] = useState(courses[0].id);
  const currentCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  const [nodes, setNodes] = useState<ConceptNode[]>(currentCourse.nodes);
  const [edges, setEdges] = useState<PrerequisiteEdge[]>(currentCourse.edges);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(nodes.find((n) => n.id === 'chain_rule') || nodes[0]);

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
        ? `✅ **Evaluasi DKT:** Jawaban kuis pada topik **${targetNode?.label}** benar! Nilai probabilitas penguasaan naik menjadi ${(targetNode?.masteryScore! * 100).toFixed(0)}%.`
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
    // 1. Select chain_rule (simulate student failure)
    const chainNode = nodes.find((n) => n.id === 'chain_rule');
    if (!chainNode) return;

    setSelectedNode(chainNode);
    setBacktrackedNodeId('single_derivative');

    const demoMsg: ChatMessage = {
      id: `demo-${Date.now()}`,
      sender: 'assistant',
      text: `🚀 **[SIMULASI LIVE DEMO FINAL]**\n\nMahasiswa baru saja menjawab salah pada soal turunan komposit $f(x) = (2x^2 + 1)^3$.\n\n**Analisis Graph-RAG:** Mahasiswa lupa mengalikan dengan turunan fungsi dalam $g'(x) = 4x$.\n\nMari kita bimbing menggunakan analogi **Kotak di dalam Kotak (Matryoshka Doll)** 🪆:\n- Turunan Kotak Luar $[\\dots]^3 = 3[\\dots]^2$\n- Turunan Kotak Dalam $(2x^2 + 1) = 4x$\n\nBerapa hasil perkalian keduanya?`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      isSocraticQuestion: true,
      suggestedResponses: [
        'Hasilnya adalah 12x(2x^2 + 1)^2',
        'Mengapa turunan angka 1 di dalam kurung hilang?',
        'Terapkan ini ke fungsi loss Gradient Descent!'
      ]
    };

    setMessages((prev) => [...prev, demoMsg]);
    showToast('Simulasi Live Pitch Demo CDW 2026 Aktif!');
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
              Graph-Guided RAG & Deep Knowledge Tracing for Indonesian STEM Higher-Ed
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
        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'student' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Mahasiswa</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-slate-400'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dosen / PUSAKA</span>
          </button>
        </div>

        {/* Course Banner */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                {currentCourse.code}
              </span>
              <h2 className="text-sm font-bold text-white">{currentCourse.title}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentCourse.faculty} · {currentCourse.university}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
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
              showToast('Syllabus-to-Graph Parser berhasil mengekstrak 10 simpul konsep & dependensi DAG.');
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
              text: `Mari kita perbaiki pemahamanmu pada topik **${node.label}** melalui penuntun konsep ${deficitNode ? `**${deficitNode.label}**` : ''}.\n\nApa bagian yang menurutmu paling menantang: aturan rantai komposit atau penurunan fungsi konstanta?`,
              timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              isSocraticQuestion: true,
              suggestedResponses: [
                'Aturan diferensiasi fungsi dalam',
                'Mengapa konstanta menjadi 0 saat diturunkan',
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
