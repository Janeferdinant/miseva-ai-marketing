"use client";

import React, { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  Play,
  Pause,
  Download,
  Clock,
  CheckCircle2,
  Calendar,
  Send,
  Eye,
  Users,
  Flame,
  Globe
} from "lucide-react";
import { CampaignSummary } from "@/lib/marketing/services/campaign-calendar-service";

interface MarketingHeaderProps {
  summary: CampaignSummary;
  isEmergencyPaused: boolean;
  selectedTimezone: string;
  onTimezoneChange: (tz: string) => void;
  onToggleEmergencyPause: (shouldPause: boolean) => void;
  onExportCalendar: (format: "CSV" | "JSON" | "ICS") => void;
}

export function MarketingHeader({
  summary,
  isEmergencyPaused,
  selectedTimezone,
  onTimezoneChange,
  onToggleEmergencyPause,
  onExportCalendar,
}: MarketingHeaderProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="space-y-4">
      {/* Top Banner & Control Bar */}
      <div className="glass-panel p-6 rounded-3xl shadow-glass border border-white/20 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Title & Brand Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Autonomous Marketing Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                30-Day Launch Campaign
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
              Miseva AI Marketing Command Center
            </h1>
            <p className="text-xs sm:text-sm text-foreground/70 font-medium mt-1">
              Bilingual (English + മലയാളം) social media content planning, human approval gates, multi-platform publishing adapters & growth analytics.
            </p>
          </div>

          {/* Action Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Timezone Selector */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card border border-white/10 text-xs font-semibold text-foreground">
              <Globe className="w-4 h-4 text-emerald-400" />
              <select
                value={selectedTimezone}
                onChange={(e) => onTimezoneChange(e.target.value)}
                className="bg-transparent border-none outline-none text-foreground font-bold cursor-pointer text-xs"
              >
                <option value="Asia/Kolkata" className="bg-[#062419] text-white">Asia/Kolkata (IST)</option>
                <option value="Asia/Dubai" className="bg-[#062419] text-white">Asia/Dubai (GST)</option>
                <option value="Europe/London" className="bg-[#062419] text-white">Europe/London (GMT)</option>
                <option value="America/New_York" className="bg-[#062419] text-white">America/New_York (EST)</option>
              </select>
            </div>

            {/* Export Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold glass-card hover:border-amber-400/50 transition-all text-foreground border border-white/10"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export Calendar</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl glass-panel p-2 shadow-2xl z-50 border border-white/20 space-y-1">
                  <button
                    onClick={() => { onExportCalendar("CSV"); setShowExportMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 text-foreground transition-colors flex items-center justify-between"
                  >
                    <span>CSV Spreadsheet</span>
                    <span className="text-[10px] text-foreground/50">Excel-ready</span>
                  </button>
                  <button
                    onClick={() => { onExportCalendar("ICS"); setShowExportMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 text-foreground transition-colors flex items-center justify-between"
                  >
                    <span>iCalendar (.ics)</span>
                    <span className="text-[10px] text-foreground/50">Google/Apple</span>
                  </button>
                  <button
                    onClick={() => { onExportCalendar("JSON"); setShowExportMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 text-foreground transition-colors flex items-center justify-between"
                  >
                    <span>JSON Raw Data</span>
                    <span className="text-[10px] text-foreground/50">API Feed</span>
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Pause Killswitch */}
            <button
              onClick={() => onToggleEmergencyPause(!isEmergencyPaused)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                isEmergencyPaused
                  ? "bg-amber-500 hover:bg-amber-600 text-black animate-pulse"
                  : "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40"
              }`}
              title={isEmergencyPaused ? "Campaign currently paused. Click to resume." : "Halt all scheduled publishing immediately"}
            >
              {isEmergencyPaused ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume Campaign</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Emergency Pause</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Emergency Pause Alert Banner */}
        {isEmergencyPaused && (
          <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-semibold flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold">EMERGENCY CAMPAIGN PAUSE IS ACTIVE:</span> All scheduled automatic publications, queue processing, and outbound API calls are temporarily halted. Post content remains safely preserved.
            </div>
          </div>
        )}
      </div>

      {/* Campaign Summary Metric Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="glass-card p-3.5 rounded-2xl border border-white/10">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Total Flight</span>
          </div>
          <div className="text-xl font-extrabold text-foreground">{summary.totalPosts} <span className="text-xs font-normal text-foreground/50">Days</span></div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">5 Campaign Phases</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-white/10">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Approved</span>
          </div>
          <div className="text-xl font-extrabold text-blue-400">{summary.approvedCount}</div>
          <div className="text-[10px] text-foreground/50 font-medium mt-0.5">Human Verified</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-white/10">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Scheduled</span>
          </div>
          <div className="text-xl font-extrabold text-amber-400">{summary.scheduledCount}</div>
          <div className="text-[10px] text-foreground/50 font-medium mt-0.5">Queue Active</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-white/10">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            <span>Published</span>
          </div>
          <div className="text-xl font-extrabold text-emerald-400">{summary.publishedCount}</div>
          <div className="text-[10px] text-foreground/50 font-medium mt-0.5">Live on Social</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-white/10">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>Total Reach</span>
          </div>
          <div className="text-xl font-extrabold text-purple-400">390K</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">+24% vs benchmark</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-white/10">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Cooking Sessions</span>
          </div>
          <div className="text-xl font-extrabold text-orange-400">2,480</div>
          <div className="text-[10px] text-foreground/50 font-medium mt-0.5">Hands-free voice</div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
          <div className="text-[11px] font-semibold text-foreground/60 flex items-center gap-1.5 mb-1">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Subscribers</span>
          </div>
          <div className="text-xl font-extrabold text-amber-300">310</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">₹1.54L ARR</div>
        </div>
      </div>
    </div>
  );
}
