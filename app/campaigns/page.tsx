"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { CAMPAIGN_CONFIGS } from "@/lib/marketing/services/attribution-funnel-service";

export default function CampaignsDirectoryPage() {
  const campaigns = Object.values(CAMPAIGN_CONFIGS);

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 px-4 sm:px-8 max-w-6xl mx-auto pt-8 space-y-8">
      <header className="space-y-3 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
          <Compass className="w-3.5 h-3.5" />
          <span>Miseva AI Campaign Portals</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Explore Intent-Driven Culinary Experiences
        </h1>
        <p className="text-sm text-foreground/70">
          Discover how Miseva AI helps you find recipes by ingredients, plan weekly budgets, listen in Malayalam, or style five-star luxury tables.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {campaigns.map(camp => (
          <Link
            key={camp.slug}
            href={`/campaigns/${camp.slug}`}
            className="p-6 rounded-3xl glass-card border border-white/10 hover:border-emerald-400/40 transition-all hover:scale-[1.01] flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-block">
                {camp.heroBadge}
              </span>
              <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">
                {camp.headline}
              </h3>
              {camp.taglineMalayalam && (
                <p className="text-sm font-semibold text-amber-300/90 font-serif">
                  {camp.taglineMalayalam}
                </p>
              )}
              <p className="text-xs text-foreground/70 leading-relaxed">
                {camp.subheadline}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-emerald-400">
              <span>Try Interactive Demo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-foreground/50 pt-8 border-t border-white/10">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>All campaigns strictly respect user consent and first-party attribution policies.</span>
      </div>
    </div>
  );
}
