"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Trophy,
  TrendingUp,
  Flame,
  CheckCircle2,
  Users,
  Eye,
  ArrowRight,
  HelpCircle
} from "lucide-react";
import { GrowthExperimentsService } from "@/lib/marketing/services/growth-experiments-service";
import { GrowthExperiment } from "@/lib/marketing/types/marketing-types";

interface GrowthExperimentsViewProps {
  experimentsService: GrowthExperimentsService;
}

export function GrowthExperimentsView({ experimentsService }: GrowthExperimentsViewProps) {
  const experiments = experimentsService.getAllExperiments();
  const [selectedExpId, setSelectedExpId] = useState<string>(experiments[0]?.id || "");

  const activeExp = experiments.find((e) => e.id === selectedExpId) || experiments[0];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-glass">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                A/B Growth Laboratory
              </span>
              <span className="text-xs text-foreground/50">•</span>
              <span className="text-xs text-emerald-400 font-semibold">
                Qualified Product Adoption Metric Framework
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-foreground">
              7 Strategic Growth Experiments
            </h3>
            <p className="text-xs text-foreground/60 max-w-2xl mt-1">
              Winners are evaluated on actual hands-free cooking sessions (5x weight) and paid subscriptions (10x weight), never raw vanity views alone.
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Laboratory: Experiment List + Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Experiment Selection Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {experiments.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <div
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                className={`p-4 rounded-2xl glass-card border cursor-pointer transition-all ${
                  isSelected
                    ? "border-amber-400 bg-amber-950/20 shadow-md ring-1 ring-amber-400/30"
                    : "border-white/10 hover:border-emerald-400/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-foreground">
                    {exp.name}
                  </span>
                  {exp.winner && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-400" /> Variant {exp.winner} Won
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-foreground/70 line-clamp-2">
                  {exp.hypothesis}
                </p>

                <div className="flex items-center justify-between text-[10px] text-foreground/50 pt-2 border-t border-white/5 mt-2">
                  <span className="text-emerald-400 font-semibold">
                    Primary: {String(exp.primaryMetric)}
                  </span>
                  <span>Confidence: {exp.confidenceScorePercent}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Comparative Breakdown & Insights (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeExp && (
            <div className="glass-panel p-6 rounded-3xl border border-white/15 shadow-glass space-y-6">
              {/* Header */}
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Active Experiment Deep Dive
                </div>
                <h4 className="text-xl font-black text-foreground">{activeExp.name}</h4>
                <p className="text-xs text-foreground/75 mt-1 italic bg-white/5 p-3 rounded-xl border border-white/10">
                  Hypothesis: "{activeExp.hypothesis}"
                </p>
              </div>

              {/* Side-by-Side Variant Scorecard */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Variant A */}
                <div className={`p-4 rounded-2xl glass-card border ${
                  activeExp.winner === 'A' ? "border-emerald-400/60 bg-emerald-950/20 ring-1 ring-emerald-400/30" : "border-white/10"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-emerald-400">Variant A</span>
                    {activeExp.winner === 'A' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-black">
                        Winner
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-xs text-foreground mb-1">{activeExp.variantA.label}</h5>
                  <p className="text-[11px] text-foreground/60 mb-3">{activeExp.variantA.description}</p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-foreground/50">Views:</span>
                      <span className="font-bold text-foreground">{(activeExp.variantA.metrics.views || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-foreground/50">Cooking Sessions:</span>
                      <span className="font-bold text-orange-400">{activeExp.variantA.metrics.cookingSessions || 0}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-foreground/50">Subscriptions:</span>
                      <span className="font-bold text-emerald-400">{activeExp.variantA.metrics.subscriptions || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Variant B */}
                <div className={`p-4 rounded-2xl glass-card border ${
                  activeExp.winner === 'B' ? "border-emerald-400/60 bg-emerald-950/20 ring-1 ring-emerald-400/30" : "border-white/10"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-amber-400">Variant B</span>
                    {activeExp.winner === 'B' && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-black">
                        Winner
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-xs text-foreground mb-1">{activeExp.variantB.label}</h5>
                  <p className="text-[11px] text-foreground/60 mb-3">{activeExp.variantB.description}</p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-foreground/50">Views:</span>
                      <span className="font-bold text-foreground">{(activeExp.variantB.metrics.views || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-foreground/50">Cooking Sessions:</span>
                      <span className="font-bold text-orange-400">{activeExp.variantB.metrics.cookingSessions || 0}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-foreground/50">Subscriptions:</span>
                      <span className="font-bold text-emerald-400">{activeExp.variantB.metrics.subscriptions || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data-Driven Insights */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Key Strategic Insights
                </span>
                <div className="space-y-1.5">
                  {activeExp.insights.map((insight, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-foreground/80 leading-relaxed">
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
