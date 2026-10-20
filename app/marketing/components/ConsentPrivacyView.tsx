"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  UserX,
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  BellOff
} from "lucide-react";

export function ConsentPrivacyView() {
  const complianceChecklist = [
    {
      title: "Zero Cross-Site Tracking / No Fingerprinting",
      description: "Miseva AI never scrapes external browsing history, buys tracking profiles, or fingerprints canvas/hardware.",
      status: "COMPLIANT",
      icon: EyeOff
    },
    {
      title: "Non-Demographic Intent-First Personalisation",
      description: "Targeting is anchored strictly on culinary intent, pantry ingredients, recipe searches, and consented preferences.",
      status: "COMPLIANT",
      icon: ShieldCheck
    },
    {
      title: "Anonymous Visitor Fallback",
      description: "First-time and unauthenticated visitors receive contextual recommendations without any cookies or profiles.",
      status: "COMPLIANT",
      icon: UserX
    },
    {
      title: "Right to be Forgotten & Instant Data Erasure",
      description: "Users can reset in-app preference history or execute complete data deletion with one click.",
      status: "COMPLIANT",
      icon: Lock
    },
    {
      title: "Strict Server-Side Credential Storage",
      description: "API keys, OAuth tokens, and client secrets are stored exclusively in server environment vaults and scrubbed from logs.",
      status: "COMPLIANT",
      icon: KeyRound
    },
    {
      title: "Messaging Frequency & Quiet Hours Guard",
      description: "WhatsApp and push notifications respect quiet hours (10:00 PM to 08:00 AM IST) with clear opt-out commands.",
      status: "COMPLIANT",
      icon: BellOff
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Compliance Health Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Privacy Audit Status</span>
          <span className="text-xl font-extrabold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5" />
            <span>100% Passed</span>
          </span>
          <span className="text-[10px] text-foreground/50 block">Compliant with Google Play & DPDP</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Consented Opt-In Rate</span>
          <span className="text-xl font-extrabold text-foreground">78.4%</span>
          <span className="text-[10px] text-foreground/50 block">Voluntary in-app permission</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Anonymous Traffic Share</span>
          <span className="text-xl font-extrabold text-amber-400">21.6%</span>
          <span className="text-[10px] text-foreground/50 block">Served with pure page context</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Data Deletion Requests</span>
          <span className="text-xl font-extrabold text-teal-400">0 Pending</span>
          <span className="text-[10px] text-foreground/50 block">14 executed instantly</span>
        </div>
      </div>

      {/* Checklist Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/70 px-1">
          Privacy, Security and Regulatory Compliance Guardrails
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceChecklist.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl glass-card border border-white/10 space-y-3 hover:border-emerald-400/30 transition-all shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{item.status}</span>
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy Transparency Statement */}
      <div className="p-5 rounded-2xl bg-black/30 border border-white/10 text-xs text-foreground/70 space-y-2">
        <span className="font-bold text-foreground block">Miseva AI Marketing Data Ethics Statement</span>
        <p className="leading-relaxed">
          Miseva AI operates in accordance with Google Play Developer Policies, Meta Platform Rules, YouTube Terms of Service, and applicable data privacy regulations. User profile signals are limited to declared recipe interests and first-party interactions within the Miseva app. Under no circumstances are profiles aggregated with external data brokers or used for covert behavioral profiling.
        </p>
      </div>
    </div>
  );
}
