"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Link as LinkIcon,
  Copy,
  Check,
  ShieldAlert,
  ArrowRight,
  Flame,
  Users,
  Eye,
  Smartphone
} from "lucide-react";
import { AnalyticsRevenueService, WeeklyExecutiveDigest } from "@/lib/marketing/services/analytics-revenue-service";
import { PlatformType } from "@/lib/marketing/types/marketing-types";

interface AnalyticsDigestViewProps {
  analyticsService: AnalyticsRevenueService;
}

export function AnalyticsDigestView({ analyticsService }: AnalyticsDigestViewProps) {
  const funnel = analyticsService.getFunnelReport();
  const weeklyDigest = analyticsService.generateWeeklyExecutiveDigest({
    weekNumber: 1,
    productionCostInr: 25000,
    paidCampaignSpendInr: 15000
  });

  // Interactive UTM Generator State
  const [utmUrl, setUtmUrl] = useState("https://miseva.ai/recipes/kerala-meen-curry");
  const [utmPlatform, setUtmPlatform] = useState<PlatformType>(PlatformType.INSTAGRAM_REEL);
  const [utmCampaign, setUtmCampaign] = useState("30day_launch");
  const [utmContent, setUtmContent] = useState("day_07");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const handleGenerateUtm = () => {
    const built = analyticsService.buildUtmUrl({
      baseUrl: utmUrl,
      platform: utmPlatform,
      campaignName: utmCampaign,
      contentId: utmContent
    });
    setGeneratedLink(built);
  };

  const copyGeneratedLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-foreground/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-emerald-400">Privacy-Conscious Telemetry:</span>
          <span>Zero invasive third-party cross-app tracking. Direct UTM attribution and verified server-side events.</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Observed Server Data
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            Estimated Projections
          </span>
        </div>
      </div>

      {/* Marketing Conversion Funnel */}
      <div className="glass-panel p-6 rounded-3xl border border-white/10 shadow-glass space-y-5">
        <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>Complete Marketing-to-Subscription Conversion Funnel</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Step 1: Impressions */}
          <div className="p-3.5 rounded-2xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] font-semibold text-foreground/50 flex items-center justify-between">
              <span>1. Impressions</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400">Observed</span>
            </div>
            <div className="text-lg font-black text-foreground">
              {(funnel.totalCampaignImpressions / 1000).toFixed(0)}K
            </div>
            <div className="text-[10px] text-foreground/50">Top-of-funnel reach</div>
          </div>

          {/* Step 2: Clicks */}
          <div className="p-3.5 rounded-2xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] font-semibold text-foreground/50 flex items-center justify-between">
              <span>2. Social Clicks</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400">Observed</span>
            </div>
            <div className="text-lg font-black text-amber-400">
              {funnel.totalSocialClicks.toLocaleString()}
            </div>
            <div className="text-[10px] text-foreground/50">3.8% CTR</div>
          </div>

          {/* Step 3: App Installs */}
          <div className="p-3.5 rounded-2xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] font-semibold text-foreground/50 flex items-center justify-between">
              <span>3. Play Installs</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400">Observed</span>
            </div>
            <div className="text-lg font-black text-purple-400">
              {funnel.appInstalls.toLocaleString()}
            </div>
            <div className="text-[10px] text-foreground/50">Google Play Console</div>
          </div>

          {/* Step 4: Cooking Sessions */}
          <div className="p-3.5 rounded-2xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] font-semibold text-foreground/50 flex items-center justify-between">
              <span>4. Voice Cooks</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400">Observed</span>
            </div>
            <div className="text-lg font-black text-orange-400">
              {funnel.firstCookingSessions.toLocaleString()}
            </div>
            <div className="text-[10px] text-foreground/50">Completed Sessions</div>
          </div>

          {/* Step 5: Subscribers */}
          <div className="p-3.5 rounded-2xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] font-semibold text-foreground/50 flex items-center justify-between">
              <span>5. Subscribers</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/20 text-emerald-400">Observed</span>
            </div>
            <div className="text-lg font-black text-emerald-400">
              {funnel.activeSubscribers}
            </div>
            <div className="text-[10px] text-foreground/50">₹499/mo Active</div>
          </div>

          {/* Step 6: Est Revenue */}
          <div className="p-3.5 rounded-2xl glass-card border border-blue-500/30 bg-blue-950/20 space-y-1">
            <div className="text-[10px] font-semibold text-blue-300 flex items-center justify-between">
              <span>6. Est LTV ARR</span>
              <span className="px-1.5 py-0.5 rounded text-[8px] bg-blue-500/30 text-blue-200">Modeled</span>
            </div>
            <div className="text-lg font-black text-blue-300">
              ₹{(funnel.estimatedAttributedRevenueInr / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] text-blue-400/70 font-semibold">{funnel.blendedRoiMultiplier}x Blended ROI</div>
          </div>
        </div>
      </div>

      {/* Weekly Executive Digest & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weekly Digest Summary (7 cols) */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-white/10 shadow-glass space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-extrabold text-foreground">
              {weeklyDigest.reportPeriod}
            </h4>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Executive Report
            </span>
          </div>

          {/* Top & Bottom Content Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl glass-card border border-emerald-500/30 space-y-1 bg-emerald-950/15">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Top Performer</span>
              <div className="font-bold text-foreground">{weeklyDigest.bestPerformingPost.title}</div>
              <p className="text-[11px] text-foreground/70">{weeklyDigest.bestPerformingPost.highlight}</p>
            </div>

            <div className="p-3.5 rounded-2xl glass-card border border-red-500/30 space-y-1 bg-red-950/15">
              <span className="text-[10px] font-bold text-red-400 uppercase">Needs Tuning</span>
              <div className="font-bold text-foreground">{weeklyDigest.worstPerformingPost.title}</div>
              <p className="text-[11px] text-foreground/70">{weeklyDigest.worstPerformingPost.dropoffReason}</p>
            </div>
          </div>

          {/* Spend & Acquisition Economics */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider block">
              Acquisition Economics & Spend
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-foreground/50 block text-[10px]">Content Production:</span>
                <span className="font-bold text-foreground">₹{weeklyDigest.productionCostInr.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-foreground/50 block text-[10px]">Paid Ad Spend:</span>
                <span className="font-bold text-foreground">₹{weeklyDigest.paidCampaignSpendInr.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-foreground/50 block text-[10px]">Blended CAC / Sub:</span>
                <span className="font-bold text-emerald-400">₹{weeklyDigest.blendedCustomerAcquisitionCostInr}</span>
              </div>
            </div>
          </div>

          {/* Strategic Recommendations */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Strategic Recommendations for Next Week
            </span>
            <div className="space-y-1.5">
              {weeklyDigest.recommendations.map((rec, idx) => (
                <div key={idx} className="p-2.5 rounded-xl glass-card border border-white/10 text-xs text-foreground/85 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Interactive UTM Link Generator Tool (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-white/10 shadow-glass space-y-4">
          <div>
            <h4 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-amber-400" />
              <span>UTM Campaign Link Generator</span>
            </h4>
            <p className="text-xs text-foreground/60 mt-0.5">
              Generate platform-compliant tracked links for social posts and bio links.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-foreground/60 block mb-1">Destination URL</label>
              <input
                type="text"
                value={utmUrl}
                onChange={(e) => setUtmUrl(e.target.value)}
                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-foreground outline-none focus:border-emerald-400 text-xs"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-foreground/60 block mb-1">Target Channel</label>
              <select
                value={utmPlatform}
                onChange={(e) => setUtmPlatform(e.target.value as PlatformType)}
                className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-foreground outline-none focus:border-emerald-400 text-xs cursor-pointer"
              >
                {Object.values(PlatformType).map((p) => (
                  <option key={p} value={p} className="bg-[#062419] text-white">{p}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-foreground/60 block mb-1">Campaign</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-foreground outline-none focus:border-emerald-400 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-foreground/60 block mb-1">Content ID</label>
                <input
                  type="text"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-foreground outline-none focus:border-emerald-400 text-xs"
                />
              </div>
            </div>

            <button
              onClick={handleGenerateUtm}
              className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md mt-1"
            >
              Generate Tracked Link
            </button>

            {generatedLink && (
              <div className="p-3 rounded-xl bg-black/30 border border-white/10 space-y-2 mt-2">
                <div className="text-[10px] text-foreground/50 font-mono break-all">
                  {generatedLink}
                </div>
                <button
                  onClick={copyGeneratedLink}
                  className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold glass-card text-emerald-400 hover:border-emerald-400 flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Copied to Clipboard!" : "Copy URL"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
