'use client';

import React, { useState } from 'react';
import { ConceptNode, PrerequisiteEdge } from '../lib/types';
import { Network, CheckCircle2, AlertTriangle, Lock, Sparkles, ZoomIn, ZoomOut, RotateCcw, ArrowRight } from 'lucide-react';

interface Props {
  nodes: ConceptNode[];
  edges: PrerequisiteEdge[];
  selectedNode: ConceptNode | null;
  onSelectNode: (node: ConceptNode) => void;
  onStartQuiz: (node: ConceptNode) => void;
  highlightedPath?: string[];
  backtrackedNodeId?: string;
}

export default function KnowledgeGraphView({
  nodes,
  edges,
  selectedNode,
  onSelectNode,
  onStartQuiz,
  highlightedPath = [],
  backtrackedNodeId
}: Props) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const getNodeColor = (status: ConceptNode['status'], isSelected: boolean, isBacktracked: boolean) => {
    if (isBacktracked) return 'border-red-500 bg-red-950/80 shadow-[0_0_20px_rgba(239,68,68,0.8)] pulse-glow-danger ring-2 ring-red-400';
    if (isSelected) return 'border-blue-400 bg-blue-950/80 shadow-[0_0_20px_rgba(59,130,246,0.6)] ring-2 ring-blue-400';
    switch (status) {
      case 'mastered':
        return 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
      case 'learning':
        return 'border-amber-500/80 bg-amber-950/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]';
      case 'deficit':
        return 'border-red-500 bg-red-950/50 text-red-300 shadow-[0_0_16px_rgba(239,68,68,0.4)] pulse-glow-danger';
      case 'locked':
        return 'border-slate-700 bg-slate-900/60 text-slate-500 opacity-60';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-300';
    }
  };

  const getStatusBadge = (status: ConceptNode['status']) => {
    switch (status) {
      case 'mastered':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60"><CheckCircle2 className="w-3 h-3" /> Mastered</span>;
      case 'learning':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800/60"><Sparkles className="w-3 h-3" /> In Progress</span>;
      case 'deficit':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-950 text-red-400 border border-red-800/60 animate-pulse"><AlertTriangle className="w-3 h-3" /> Deficit Gap</span>;
      case 'locked':
        return <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700"><Lock className="w-3 h-3" /> Locked</span>;
    }
  };

  return (
    <div className="relative w-full h-[540px] rounded-2xl glass-panel overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800/80 bg-slate-950/40 z-10">
        <div className="flex items-center gap-2">
          <Network className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-semibold text-slate-200">Interactive Concept Dependency Graph (DAG)</h3>
          <span className="text-xs text-slate-400 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700">Deep Knowledge Tracing Real-time State</span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" /> <span className="text-slate-300">Tuntas (&ge;80%)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]" /> <span className="text-slate-300">Belajar (50-79%)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-ping" /> <span className="text-red-400 font-medium">Akar Defisit (&lt;50%)</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> <span className="text-slate-500">Terkunci</span></div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition" title="Zoom In">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition" title="Zoom Out">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }} className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition" title="Reset View">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SVG & Interactive Graph Canvas */}
      <div className="relative flex-1 w-full h-full overflow-auto bg-[#070b14]/90 select-none">
        <svg
          className="absolute inset-0 w-[960px] h-[520px] pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`, transformOrigin: 'top left' }}
        >
          <defs>
            <marker id="arrow-default" markerWidth="8" markerHeight="8" refX="28" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#475569" />
            </marker>
            <marker id="arrow-deficit" markerWidth="10" markerHeight="10" refX="28" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#ef4444" />
            </marker>
            <marker id="arrow-mastered" markerWidth="8" markerHeight="8" refX="28" refY="4" orient="auto">
              <polygon points="0 0, 8 4, 0 8" fill="#10b981" />
            </marker>
          </defs>

          {/* Render Edge Connectors */}
          {edges.map((edge) => {
            const src = nodes.find((n) => n.id === edge.source);
            const tgt = nodes.find((n) => n.id === edge.target);
            if (!src || !tgt) return null;

            const isHighlighted = highlightedPath.includes(edge.source) && highlightedPath.includes(edge.target);
            const isDeficitPath = src.status === 'deficit' || tgt.status === 'deficit';

            // Quadratic bezier curve for smooth organic DAG lines
            const dx = tgt.x - src.x;
            const dy = tgt.y - src.y;
            const cx = src.x + dx / 2;
            const cy = src.y + (dy > 0 ? -15 : 15);
            const pathD = `M ${src.x + 60} ${src.y + 35} Q ${cx + 60} ${cy + 35} ${tgt.x + 60} ${tgt.y + 35}`;

            return (
              <g key={edge.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isDeficitPath ? '#ef4444' : isHighlighted ? '#3b82f6' : '#334155'}
                  strokeWidth={isDeficitPath ? 2.5 : isHighlighted ? 2.5 : 1.5}
                  strokeDasharray={isDeficitPath ? '6,4' : undefined}
                  markerEnd={isDeficitPath ? 'url(#arrow-deficit)' : src.status === 'mastered' ? 'url(#arrow-mastered)' : 'url(#arrow-default)'}
                  className={isDeficitPath ? 'animate-pulse' : ''}
                />
              </g>
            );
          })}
        </svg>

        {/* Render Node Cards */}
        <div
          className="absolute inset-0 w-[960px] h-[520px] transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`, transformOrigin: 'top left' }}
        >
          {nodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const isBacktracked = backtrackedNodeId === node.id;
            const colorClass = getNodeColor(node.status, isSelected, isBacktracked);

            return (
              <div
                key={node.id}
                onClick={() => onSelectNode(node)}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                className={`absolute w-44 p-3 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 ${colorClass}`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 truncate">{node.category}</span>
                  {getStatusBadge(node.status)}
                </div>

                <h4 className="text-xs font-bold text-slate-100 leading-snug line-clamp-1 mb-1.5">{node.label}</h4>

                {/* Mastery Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>P(L) Kognitif</span>
                    <span className="font-mono font-bold text-slate-200">{(node.masteryScore * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        node.masteryScore >= 0.8
                          ? 'bg-emerald-400'
                          : node.masteryScore >= 0.5
                          ? 'bg-amber-400'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${node.masteryScore * 100}%` }}
                    />
                  </div>
                </div>

                {isBacktracked && (
                  <div className="mt-2 text-[10px] font-bold text-red-300 bg-red-950/80 px-1.5 py-0.5 rounded border border-red-500 flex items-center gap-1 animate-bounce">
                    <span>⚠️ Akar Mispersepsi!</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Bar at Bottom */}
      {selectedNode && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-4 z-10 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800/60 font-mono font-medium">{selectedNode.category}</span>
              <h4 className="text-sm font-bold text-white truncate">{selectedNode.label}</h4>
              <span className="text-xs text-slate-400">· Tingkat Taksonomi: <span className="text-slate-200 font-semibold">{selectedNode.bloomLevel}</span></span>
            </div>
            <p className="text-xs text-slate-300 line-clamp-1">{selectedNode.description}</p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {selectedNode.quiz && (
              <button
                onClick={() => onStartQuiz(selectedNode)}
                className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Uji Kuis Diagnostik</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
