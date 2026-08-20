'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ConceptNode, ChatMessage } from '../lib/types';
import { Bot, User, Send, Sparkles, ShieldCheck, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface Props {
  messages: ChatMessage[];
  activeConcept: ConceptNode | null;
  onSendMessage: (text: string) => void;
  isThinking?: boolean;
}

export default function SocraticChat({
  messages,
  activeConcept,
  onSendMessage,
  isThinking = false
}: Props) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleChipClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-[540px] rounded-2xl glass-panel overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-slate-100">EduGraph Socratic AI Tutor</h3>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {activeConcept ? `Fokus Konsep: ${activeConcept.label}` : 'Memandu penalaran konsep tanpa membocorkan jawaban langsung'}
            </p>
          </div>
        </div>

        {/* Guardrail badge */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-800/60">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Socratic Guardrails Aktif</span>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#070b14]/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-300 flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[84%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-bl-none shadow-sm'
              }`}
            >
              {/* Parse bold and linebreaks simply */}
              <div className="whitespace-pre-wrap font-sans">
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx} className={idx > 0 ? 'mt-1.5' : ''}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Suggested Quick Response Chips */}
              {msg.suggestedResponses && msg.suggestedResponses.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
                    <Lightbulb className="w-3 h-3" />
                    <span>Pilihan Respon Logis:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedResponses.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleChipClick(suggestion)}
                        className="text-left text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-950 text-slate-300 hover:text-blue-300 border border-slate-700 hover:border-blue-700/60 transition flex items-center gap-1 active:scale-95"
                      >
                        <span>{suggestion}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex gap-3 justify-start items-center">
            <div className="w-7 h-7 rounded-lg bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-300">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl rounded-bl-none px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
              <span>EduGraph AI sedang memetakan jalur penalaran...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Tanyakan konsep atau jelaskan langkah logikamu..."
          className="flex-1 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-blue-600/20"
        >
          <span>Kirim</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
