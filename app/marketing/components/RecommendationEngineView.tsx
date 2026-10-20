"use client";

import React, { useState } from "react";
import {
  Compass,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Info,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Lock
} from "lucide-react";
import {
  sharedRecommendationEngine,
  RecommendationResult,
  UserConsentProfile
} from "@/lib/marketing/services/recommendation-engine-service";

export function RecommendationEngineView() {
  const [currentPage, setCurrentPage] = useState("/recipes/malabar-chicken-biryani");
  const [activeCategory, setActiveCategory] = useState("Kerala Cuisine");
  const [searchQuery, setSearchQuery] = useState("biryani");
  const [allowPersonalisation, setAllowPersonalisation] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ml">("en");
  const [consentedCategories, setConsentedCategories] = useState<string[]>([
    "Kerala Cuisine",
    "Desserts"
  ]);

  const profile: UserConsentProfile = {
    userId: "simulated_operator_user",
    allowPersonalisation,
    allowNotifications: true,
    consentedCategories,
    savedDishIds: ["molten-dark-chocolate-lava-cake"],
    preferredLanguage: selectedLanguage
  };

  const recommendations = sharedRecommendationEngine.getRecommendations(
    {
      currentPage,
      activeCategory,
      searchQuery,
      preferredLanguage: selectedLanguage
    },
    profile
  );

  const toggleCategory = (cat: string) => {
    if (consentedCategories.includes(cat)) {
      setConsentedCategories(consentedCategories.filter(c => c !== cat));
    } else {
      setConsentedCategories([...consentedCategories, cat]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Explanation Banner */}
      <div className="p-4 rounded-2xl glass-card border border-white/10 bg-white/5 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-foreground/80 leading-relaxed space-y-0.5">
          <span className="font-bold text-amber-300 block">
            5-Layer Explainable Recommendation Architecture
          </span>
          Contextual Matching (Current Page & Search) • Content-Based (Consented Interests) • Collaborative Readiness • Explainability Decorator • Consent & Privacy Guard.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Simulation Controls (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl glass-card border border-white/15 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulation Test Controls</span>
            </h3>

            {/* Context Inputs */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground/70">
                  Simulated Current Page
                </label>
                <select
                  value={currentPage}
                  onChange={e => setCurrentPage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
                >
                  <option value="/home">/home (Main Discovery)</option>
                  <option value="/recipes/malabar-chicken-biryani">/recipes/malabar-chicken-biryani</option>
                  <option value="/recipes/kerala-karimeen-pollichathu">/recipes/kerala-karimeen-pollichathu</option>
                  <option value="/desserts/molten-dark-chocolate-lava-cake">/desserts/molten-dark-chocolate-lava-cake</option>
                  <option value="/table-styling">/table-styling (Luxury Dining)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground/70">
                  Active In-App Search Query
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="e.g. biryani, budget, chocolate"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground/70">
                  Language Preference
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedLanguage("en")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                      selectedLanguage === "en"
                        ? "bg-emerald-600 text-white border-emerald-400"
                        : "bg-white/5 border-white/10 text-foreground/75"
                    }`}
                  >
                    English (Default)
                  </button>
                  <button
                    onClick={() => setSelectedLanguage("ml")}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-semibold border ${
                      selectedLanguage === "ml"
                        ? "bg-emerald-600 text-white border-emerald-400"
                        : "bg-white/5 border-white/10 text-foreground/75"
                    }`}
                  >
                    മലയാളം (Malayalam)
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy & Consent Simulator */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-bold text-foreground/80 flex items-center justify-between">
                <span>User Consent State</span>
                <span className="text-[10px] text-foreground/50">GDPR / DPDP Guard</span>
              </h4>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="pr-2">
                  <span className="text-xs font-semibold block">Personalisation Consent</span>
                  <span className="text-[10px] text-foreground/60">
                    {allowPersonalisation ? "Profile matching enabled" : "Anonymous / Generic mode"}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={allowPersonalisation}
                    onChange={e => setAllowPersonalisation(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500" />
                </label>
              </div>

              {allowPersonalisation && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-foreground/60">
                    Consented Recipe Categories
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["Kerala Cuisine", "Desserts", "Smart Cooking", "Table Styling"].map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                          consentedCategories.includes(cat)
                            ? "bg-emerald-600 text-white border border-emerald-400"
                            : "bg-white/5 border border-white/10 text-foreground/60 hover:border-white/25"
                        }`}
                      >
                        {consentedCategories.includes(cat) ? "✓ " : "+ "}
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Recommendation Output Feed (7 Columns) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Generated Recommendation Output ({recommendations.length} Results)</span>
            </h3>
            <span className="text-[10px] text-foreground/50 font-mono">
              Basis: {allowPersonalisation ? "Consented First-Party" : "Zero-Profile Contextual"}
            </span>
          </div>

          <div className="space-y-3">
            {recommendations.map(rec => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl glass-card border border-white/10 space-y-2.5 shadow-md hover:border-emerald-400/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    {rec.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {Math.round(rec.confidenceScore * 100)}% match
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-foreground/60 font-mono">
                      {rec.personalisationBasis}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-foreground">{rec.title}</h4>
                  {rec.subtitle && (
                    <p className="text-xs text-foreground/60">{rec.subtitle}</p>
                  )}
                </div>

                {/* Explainability Reason String */}
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-amber-300/85 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    <strong className="text-amber-300">Why recommended:</strong> {rec.reason}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-foreground/50">
                  <span className="font-mono truncate max-w-[280px]">
                    Destination: {rec.destinationUrl}
                  </span>
                  <span className="text-emerald-400 font-semibold font-mono">
                    {rec.campaignAttributionId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
