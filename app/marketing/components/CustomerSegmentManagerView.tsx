"use client";

import React, { useState } from "react";
import {
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  Send,
  Radio,
  Layers,
  Copy,
  Check
} from "lucide-react";
import {
  sharedCustomerSegmentService,
  AudienceSegmentDefinition,
  CustomerSegmentId
} from "@/lib/marketing/services/customer-segment-service";

export function CustomerSegmentManagerView() {
  const segments = sharedCustomerSegmentService.getAllSegments();
  const [selectedSegmentId, setSelectedSegmentId] = useState<CustomerSegmentId>(
    "SEGMENT_A_INGREDIENTS"
  );
  const [focusIngredients, setFocusIngredients] = useState("Tomatoes, Eggs, Curry Leaves");
  const [focusDish, setFocusDish] = useState("Nadan Tomato Egg Roast");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const selectedSegment =
    segments.find(s => s.id === selectedSegmentId) || segments[0];

  const generatedPrompt = sharedCustomerSegmentService.generateSegmentPrompt(
    selectedSegment.id,
    {
      focusIngredients: focusIngredients.split(",").map(i => i.trim()),
      dishName: focusDish,
      targetChannel: selectedSegment.primaryChannels[0]
    }
  );

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 bg-emerald-500/5 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5 text-xs text-foreground/80 leading-relaxed">
          <span className="font-bold text-emerald-300 block">
            Core Strategic Mandate: Intent & Job-to-be-Done Targeting
          </span>
          Miseva AI markets around what cooks are trying to accomplish (finding recipes, using pantry ingredients, saving money, authentic Kerala dishes, table styling)—never assuming age or gender as the core customer profile.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 9 Segments List (5 Columns) */}
        <div className="lg:col-span-5 space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/60 px-1">
            9 Configurable Customer Segments
          </h3>
          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {segments.map(seg => {
              const isSelected = seg.id === selectedSegmentId;
              return (
                <div
                  key={seg.id}
                  onClick={() => setSelectedSegmentId(seg.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-emerald-600/20 border-emerald-400 shadow-md"
                      : "glass-card border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-white/10 text-emerald-400 font-mono">
                      {seg.code}
                    </span>
                    <span className="text-[10px] text-foreground/50">
                      {seg.primaryChannels[0]}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">
                    {seg.name}
                  </h4>
                  <p className="text-[11px] text-foreground/70 line-clamp-2 leading-snug">
                    {seg.marketingObjective}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Segment Details & Prompt Generator (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="space-y-0.5">
                <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                  {selectedSegment.code} Configuration
                </span>
                <h3 className="text-base font-extrabold">{selectedSegment.name}</h3>
              </div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                Active Intent
              </span>
            </div>

            {/* Intent & Demographic Policy */}
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-foreground/50 font-semibold block mb-0.5">Customer Intent</span>
                <p className="text-foreground/85 font-medium leading-relaxed">
                  {selectedSegment.intentDescription}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                  Targeting & Ethics Policy
                </span>
                <p className="text-foreground/75 text-[11px] leading-relaxed">
                  {selectedSegment.targetDemographics.demographicNote}
                </p>
              </div>

              <div>
                <span className="text-foreground/50 font-semibold block mb-1">Primary Channels</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSegment.primaryChannels.map(ch => (
                    <span
                      key={ch}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-foreground/80 font-medium text-[11px]"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Prompt Customization Sandbox */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>AI Campaign Prompt Library Generator</span>
                </h4>
                <button
                  onClick={copyPromptToClipboard}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-semibold flex items-center gap-1 transition-all"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-foreground/60">
                    Focus Ingredients (Optional)
                  </label>
                  <input
                    type="text"
                    value={focusIngredients}
                    onChange={e => setFocusIngredients(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-foreground/60">
                    Featured Dish (Optional)
                  </label>
                  <input
                    type="text"
                    value={focusDish}
                    onChange={e => setFocusDish(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs text-foreground/85 font-mono leading-relaxed select-all">
                {generatedPrompt}
              </div>

              <div className="flex items-center justify-between text-[11px] text-foreground/50 pt-1">
                <span>Default Hook: &ldquo;{selectedSegment.defaultHook}&rdquo;</span>
                <span className="text-emerald-400 font-semibold">{selectedSegment.exampleCallToAction}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
