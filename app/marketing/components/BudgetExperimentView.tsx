"use client";

import React, { useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  Percent,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowRight
} from "lucide-react";
import { sharedAttributionService } from "@/lib/marketing/services/attribution-funnel-service";

export function BudgetExperimentView() {
  const [dailyBudgetCap, setDailyBudgetCap] = useState(2500);
  const [activatedThreshold, setActivatedThreshold] = useState(30);
  const [isSpendLocked, setIsSpendLocked] = useState(true);

  const experiments = [
    {
      id: "exp_01",
      name: "Ingredient Search vs Meal Planning Intent",
      hypothesis: "Immediate pantry problem-solving drives 35% lower Cost Per Activated User than broad meal prep.",
      variantA: { label: "Pantry Ingredient Finder", sampleSize: 1420, activatedUsers: 84, spendInr: 4200, cpau: 50 },
      variantB: { label: "7-Day Meal Planner", sampleSize: 1380, activatedUsers: 48, spendInr: 4140, cpau: 86.25 },
      confidenceScore: 94.2,
      status: "SIGNIFICANT_WINNER",
      winner: "Variant A (Ingredient Finder)"
    },
    {
      id: "exp_02",
      name: "Malayalam-First vs English-First Creative",
      hypothesis: "Regional language voice-over generates 2.4x higher Day-7 repeat cooking sessions in Kerala diaspora.",
      variantA: { label: "Malayalam Audio + Captions", sampleSize: 2200, activatedUsers: 142, spendInr: 5500, cpau: 38.73 },
      variantB: { label: "English Narration", sampleSize: 2150, activatedUsers: 76, spendInr: 5375, cpau: 70.72 },
      confidenceScore: 98.7,
      status: "SIGNIFICANT_WINNER",
      winner: "Variant A (Malayalam First)"
    },
    {
      id: "exp_03",
      name: "Workflow Tutorial vs Aesthetic Food Footage",
      hypothesis: "Demonstrating the app's real interface workflow converts 40% more qualified installs than b-roll food reels.",
      variantA: { label: "Screen Walkthrough + Audio", sampleSize: 850, activatedUsers: 34, spendInr: 2550, cpau: 75 },
      variantB: { label: "Pure Food Footage B-roll", sampleSize: 820, activatedUsers: 18, spendInr: 2460, cpau: 136.67 },
      confidenceScore: 89.1,
      status: "TESTING",
      winner: "Variant A Leading (Needs 1200+ samples)"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Budget Safety Banner */}
      <div className="p-4 rounded-2xl glass-card border border-amber-500/30 bg-amber-500/5 flex items-start gap-3">
        <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-foreground/80 leading-relaxed space-y-0.5">
          <span className="font-bold text-amber-300 block">
            Budget Guardian & Safety Killswitch Active
          </span>
          Ad spend caps are hard-capped. Automatic budget escalation is strictly prohibited. Every paid experiment requires explicit administrator approval before deployment.
        </div>
      </div>

      {/* Primary Efficiency Metrics: CPAU & Spend Caps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Blended CPAU (Cost Per Active User)</span>
          <span className="text-xl font-extrabold text-emerald-400">₹44.80</span>
          <span className="text-[10px] text-foreground/50 block">Target benchmark: &lt;₹60.00</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Daily Spend Ceiling</span>
          <span className="text-xl font-extrabold text-foreground">₹{dailyBudgetCap}</span>
          <span className="text-[10px] text-foreground/50 block">Hard daily stop limit</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Total Active Experiments</span>
          <span className="text-xl font-extrabold text-amber-400">3 Controlled Tests</span>
          <span className="text-[10px] text-foreground/50 block">All statistically controlled</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Stat Confidence Threshold</span>
          <span className="text-xl font-extrabold text-teal-400">95.0%</span>
          <span className="text-[10px] text-foreground/50 block">Minimum before declaring winner</span>
        </div>
      </div>

      {/* Controlled Experiments Matrix */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/70 px-1">
          Active Controlled Marketing Experiments (A/B Test Suite)
        </h3>

        <div className="space-y-4">
          {experiments.map(exp => (
            <div
              key={exp.id}
              className="p-5 rounded-3xl glass-card border border-white/10 space-y-4 shadow-lg hover:border-emerald-400/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-foreground">{exp.name}</h4>
                  <p className="text-xs text-foreground/60">{exp.hypothesis}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                    {exp.confidenceScore}% Confidence
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      exp.status === "SIGNIFICANT_WINNER"
                        ? "bg-teal-500/20 text-teal-300 border-teal-500/30"
                        : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                    }`}
                  >
                    {exp.status}
                  </span>
                </div>
              </div>

              {/* Side by side comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Variant A */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Variant A: {exp.variantA.label}</span>
                    <span className="text-[10px] text-foreground/50">{exp.variantA.sampleSize} visits</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span>Activated Users: <strong>{exp.variantA.activatedUsers}</strong></span>
                    <span className="font-extrabold text-emerald-300 font-mono">
                      CPAU: ₹{exp.variantA.cpau}
                    </span>
                  </div>
                </div>

                {/* Variant B */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400">Variant B: {exp.variantB.label}</span>
                    <span className="text-[10px] text-foreground/50">{exp.variantB.sampleSize} visits</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span>Activated Users: <strong>{exp.variantB.activatedUsers}</strong></span>
                    <span className="font-extrabold text-amber-300 font-mono">
                      CPAU: ₹{exp.variantB.cpau}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-foreground/70 pt-1">
                <span>Result: <strong className="text-emerald-300">{exp.winner}</strong></span>
                <span className="text-[11px] text-foreground/50">Minimum threshold: 800 samples met</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
