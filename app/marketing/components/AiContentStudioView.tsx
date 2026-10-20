"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Film,
  Languages,
  CheckCircle2,
  Copy,
  Calendar,
  Layers,
  ShieldCheck,
  Send,
  Video
} from "lucide-react";
import {
  sharedCustomerSegmentService,
  CustomerSegmentId
} from "@/lib/marketing/services/customer-segment-service";
import { sharedCalendarService } from "@/lib/marketing/services/marketing-hub";

export function AiContentStudioView() {
  const segments = sharedCustomerSegmentService.getAllSegments();
  const [selectedSegmentId, setSelectedSegmentId] = useState<CustomerSegmentId>(
    "SEGMENT_A_INGREDIENTS"
  );
  const [targetChannel, setTargetChannel] = useState("Instagram Reel");
  const [dishTitle, setDishTitle] = useState("Garlic Butter Paneer Roast");
  const [ingredients, setIngredients] = useState("Paneer, Butter, Garlic, Green Chilies, Curry Leaves");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const selectedSegment =
    segments.find(s => s.id === selectedSegmentId) || segments[0];

  // Dynamic generated concept state
  const hook =
    selectedSegment.id === "SEGMENT_A_INGREDIENTS"
      ? "3 dinners you can cook from ingredients sitting in your fridge right now."
      : selectedSegment.id === "SEGMENT_B_KERALA_MALAYALAM"
      ? "മലയാളത്തിൽ പാചകം പഠിക്കാം! Hands-free voice cooking in authentic Malayalam."
      : selectedSegment.id === "SEGMENT_C_BUDGET_PLANNERS"
      ? "How we meal-prepped 5 days of dinner for under ₹1,200 with zero food waste."
      : selectedSegment.id === "SEGMENT_G_TABLE_STYLING"
      ? "Turn an everyday dining table into a 5-star Kasavu royal feast."
      : `Master ${dishTitle} with Miseva AI's step-by-step culinary chef.`;

  const englishCaption = `Stuck wondering what to cook tonight? Don't order takeout just yet! Turn your pantry ${ingredients.split(",")[0] || "ingredients"} into this chef-grade ${dishTitle}.\n\n✅ Step-by-step smart timers\n✅ Live grocery price benchmark\n✅ Malayalam voice assistant available\n\nTap link in bio to try Miseva AI for free.`;

  const malayalamCaption = `ഇന്ന് എന്ത് പാചകം ചെയ്യണമെന്ന് ആലോചിച്ച് വിഷമിക്കേണ്ട! നിങ്ങളുടെ അടുക്കളയിലുള്ള ചേരുവകൾ വെച്ച് രുചികരമായ ${dishTitle} എളുപ്പത്തിൽ ഉണ്ടാക്കാം.\n\n✅ മലയാളത്തിൽ വോയ്‌സ് ഗൈഡൻസ്\n✅ സമയം ലാഭിക്കാം, പണം ലാഭിക്കാം\n\nഇപ്പോൾ തന്നെ Miseva AI ആപ്പ് ഡൗൺലോഡ് ചെയ്യൂ!`;

  const storyboard = [
    {
      scene: "Scene 1 (0-3s)",
      visual: "Open fridge door showing pantry staples (tomato, paneer, garlic, greens). Close-up text bubble: 'What can I cook?'",
      audio: "Hook line: 'Stop ordering takeout! Look what you can make in 15 minutes.'"
    },
    {
      scene: "Scene 2 (4-8s)",
      visual: "Hand taps Miseva AI Ingredient Finder. Ingredients selected, instant match pops up with 98% confidence.",
      audio: "AI voice prompt: 'Matching 3 recipes with 100% pantry ingredients.'"
    },
    {
      scene: "Scene 3 (9-14s)",
      visual: "Sizzling skillet shot: garlic butter foaming with curry leaves and golden paneer cubes.",
      audio: "Malayalam narration: 'ആദ്യം വെണ്ണയിൽ വെളുത്തുള്ളി മൂപ്പിക്കുക.' (First saute garlic in butter)."
    },
    {
      scene: "Scene 4 (15s)",
      visual: "Finished plated dish on rustic Kerala wooden table with Miseva AI install card call to action.",
      audio: "Outro: 'Free recipe on Miseva AI. Download on Google Play today!'"
    }
  ];

  const handleScheduleCampaign = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2500);
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-5 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="space-y-0.5">
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Content Studio & Storyboard Generator</span>
            </h3>
            <p className="text-xs text-foreground/60">
              Generate segment-targeted, platform-specific hooks, bilingual copy, and vertical storyboards.
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
            Policy Score: 100/100
          </span>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground/70">
              Audience Segment
            </label>
            <select
              value={selectedSegmentId}
              onChange={e => setSelectedSegmentId(e.target.value as CustomerSegmentId)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
            >
              {segments.map(s => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground/70">
              Target Channel
            </label>
            <select
              value={targetChannel}
              onChange={e => setTargetChannel(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
            >
              <option value="Instagram Reel">Instagram Reel (9:16)</option>
              <option value="YouTube Shorts">YouTube Shorts (9:16)</option>
              <option value="Pinterest Pin">Pinterest Pin (2:3)</option>
              <option value="LinkedIn Page">LinkedIn Post (Editorial)</option>
              <option value="WhatsApp Opt-In">WhatsApp Opt-In Broadcast</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground/70">
              Featured Dish / Concept
            </label>
            <input
              type="text"
              value={dishTitle}
              onChange={e => setDishTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-foreground/70">
              Core Ingredients
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={e => setIngredients(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Generated Creative Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Script & Bilingual Copy (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Platform Hook & English Copy
              </span>
              <span className="text-[10px] text-foreground/50">{targetChannel}</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300">
              &ldquo;{hook}&rdquo;
            </div>
            <div className="p-3 rounded-xl bg-black/20 text-xs text-foreground/80 font-mono whitespace-pre-wrap leading-relaxed">
              {englishCaption}
            </div>
          </div>

          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Languages className="w-3.5 h-3.5" />
                <span>Malayalam Variant (മലയാളം പതിപ്പ്)</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Native ml-IN</span>
            </div>
            <div className="p-3 rounded-xl bg-black/20 text-xs text-foreground/85 font-serif whitespace-pre-wrap leading-relaxed">
              {malayalamCaption}
            </div>
          </div>
        </div>

        {/* Right: Vertical Storyboard & Action Bar (6 Columns) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-3xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>15-Second Short/Reel Storyboard</span>
              </span>
              <span className="text-[10px] text-foreground/50">4 Key Frames</span>
            </div>

            <div className="space-y-2.5">
              {storyboard.map((sc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs"
                >
                  <span className="text-[10px] font-bold text-teal-300 block font-mono">
                    {sc.scene}
                  </span>
                  <p className="text-foreground/80 text-[11px] leading-relaxed">
                    <strong>Visual:</strong> {sc.visual}
                  </p>
                  <p className="text-foreground/60 text-[11px] italic">
                    <strong>Audio:</strong> {sc.audio}
                  </p>
                </div>
              ))}
            </div>

            {/* Compliance & Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold text-[11px]">Human Review Enabled</span>
              </div>

              <button
                onClick={handleScheduleCampaign}
                disabled={isGenerating}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
              >
                {showSuccessToast ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Added to Queue!</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Approve & Add to Queue</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
