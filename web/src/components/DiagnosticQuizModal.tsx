'use client';

import React, { useState } from 'react';
import { ConceptNode, MicroQuizOption } from '../lib/types';
import { X, CheckCircle2, AlertCircle, Sparkles, ArrowRight, BookOpen, BrainCircuit } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  node: ConceptNode;
  onClose: () => void;
  onSubmitAnswer: (nodeId: string, isCorrect: boolean, deficitRootId?: string) => void;
  onStartRemedialChat: (node: ConceptNode, deficitNodeId?: string) => void;
}

export default function DiagnosticQuizModal({
  node,
  onClose,
  onSubmitAnswer,
  onStartRemedialChat
}: Props) {
  const quiz = node.quiz;
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  if (!quiz) return null;

  const selectedOption = quiz.options.find((opt) => opt.id === selectedOptionId);

  const handleSelectOption = (opt: MicroQuizOption) => {
    if (hasSubmitted) return;
    setSelectedOptionId(opt.id);
  };

  const handleConfirm = () => {
    if (!selectedOption || hasSubmitted) return;
    setHasSubmitted(true);

    if (selectedOption.isCorrect) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }

    onSubmitAnswer(node.id, selectedOption.isCorrect, selectedOption.indicatesDeficitIn);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl glass-panel-glow bg-slate-950 border border-slate-700/80 p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                {node.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">Taksonomi: {quiz.bloomLevel}</span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-blue-400" />
              <span>Kuis Diagnostik: {node.label}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Box */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
          <p className="text-sm font-medium text-slate-100">{quiz.question}</p>
          {quiz.latex && (
            <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono text-indigo-300 text-center tracking-wide overflow-x-auto">
              {quiz.latex}
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          {quiz.options.map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            let btnStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700';

            if (hasSubmitted) {
              if (opt.isCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-1 ring-emerald-500';
              } else if (isSelected && !opt.isCorrect) {
                btnStyle = 'border-red-500 bg-red-950/60 text-red-200 ring-1 ring-red-500';
              }
            } else if (isSelected) {
              btnStyle = 'border-blue-500 bg-blue-950/60 text-blue-200 ring-1 ring-blue-500';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={hasSubmitted}
                className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 text-xs leading-relaxed ${btnStyle}`}
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <div className="flex-1">
                  <span>{opt.text}</span>
                  {hasSubmitted && (isSelected || opt.isCorrect) && (
                    <p className={`mt-2 text-[11px] font-medium pt-2 border-t ${opt.isCorrect ? 'border-emerald-800/60 text-emerald-400' : 'border-red-800/60 text-red-400'}`}>
                      {opt.explanation}
                    </p>
                  )}
                </div>
                {hasSubmitted && opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                {hasSubmitted && isSelected && !opt.isCorrect && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-800">
          {!hasSubmitted ? (
            <div className="w-full flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedOptionId}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition active:scale-95"
              >
                Submit Jawaban
              </button>
            </div>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              <div className="text-xs">
                {selectedOption?.isCorrect ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Jawaban Tepat! Status konsep diperbarui.
                  </span>
                ) : (
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Kesenjangan konsep teridentifikasi di DKT.
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {!selectedOption?.isCorrect && (
                  <button
                    onClick={() => {
                      onClose();
                      onStartRemedialChat(node, selectedOption?.indicatesDeficitIn);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-red-600/20 flex items-center gap-1.5 transition active:scale-95 animate-pulse"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Mulai Bimbingan Remedial</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
