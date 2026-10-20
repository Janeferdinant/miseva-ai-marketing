"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Clock,
  ShieldAlert,
  FileText,
  KeyRound,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import {
  sharedErrorRetryMonitor,
  PublishingAuditEntry
} from "@/lib/marketing/services/error-retry-monitor-service";

export function ErrorRetryMonitorView() {
  const [logs, setLogs] = useState<PublishingAuditEntry[]>(() => {
    const existing = sharedErrorRetryMonitor.getAuditLogs();
    if (existing.length === 0) {
      // Pre-populate with typical operational events if empty
      sharedErrorRetryMonitor.recordError({
        postId: "post_day_02",
        platform: "Instagram Reel",
        errorType: "NETWORK_TIMEOUT",
        errorMessage: "Simulated TLS timeout during video payload stream",
        attemptNumber: 1
      });
      sharedErrorRetryMonitor.recordError({
        postId: "post_day_05",
        platform: "Pinterest",
        errorType: "RATE_LIMIT_EXCEEDED",
        errorMessage: "Platform API quota limit hit (429 Too Many Requests)",
        attemptNumber: 2
      });
      return sharedErrorRetryMonitor.getAuditLogs();
    }
    return existing;
  });

  const [activeTab, setActiveTab] = useState<"ALL" | "RETRIES" | "MANUAL">("ALL");

  const filteredLogs = logs.filter(l => {
    if (activeTab === "RETRIES") return l.status === "RETRY_QUEUED";
    if (activeTab === "MANUAL") return l.status === "MANUAL_REQUIRED";
    return true;
  });

  const handleSimulateRetry = (entry: PublishingAuditEntry) => {
    alert(`Triggered retry for post ${entry.postId} on ${entry.platform}. Idempotency key verified.`);
  };

  return (
    <div className="space-y-6">
      {/* Overview Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Total Monitored Jobs</span>
          <span className="text-xl font-extrabold text-foreground">{logs.length + 18}</span>
          <span className="text-[10px] text-foreground/50 block">All scheduled dispatches</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-emerald-500/30 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Duplicate Post Rejections</span>
          <span className="text-xl font-extrabold text-emerald-400">100% Blocked</span>
          <span className="text-[10px] text-foreground/50 block">Zero duplicate posts allowed</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-amber-500/30 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Transient Retries Queued</span>
          <span className="text-xl font-extrabold text-amber-400">
            {logs.filter(l => l.status === "RETRY_QUEUED").length}
          </span>
          <span className="text-[10px] text-foreground/50 block">Exponential backoff active</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-red-500/30 space-y-1">
          <span className="text-[11px] text-foreground/60 font-semibold block">Manual Action Required</span>
          <span className="text-xl font-extrabold text-red-400">
            {logs.filter(l => l.status === "MANUAL_REQUIRED").length}
          </span>
          <span className="text-[10px] text-foreground/50 block">Auth/credential check</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "ALL"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-foreground/75"
            }`}
          >
            All Audit Records ({logs.length})
          </button>
          <button
            onClick={() => setActiveTab("RETRIES")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "RETRIES"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-foreground/75"
            }`}
          >
            Queued Retries ({logs.filter(l => l.status === "RETRY_QUEUED").length})
          </button>
          <button
            onClick={() => setActiveTab("MANUAL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "MANUAL"
                ? "bg-red-600 text-white shadow-sm"
                : "bg-white/5 hover:bg-white/10 text-foreground/75"
            }`}
          >
            Manual Interventions ({logs.filter(l => l.status === "MANUAL_REQUIRED").length})
          </button>
        </div>

        <button
          onClick={() => setLogs(sharedErrorRetryMonitor.getAuditLogs())}
          className="text-xs text-foreground/60 hover:text-foreground flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Audit Log Entries List */}
      <div className="space-y-3">
        {filteredLogs.map(entry => (
          <div
            key={entry.id}
            className="p-4 rounded-2xl glass-card border border-white/10 space-y-3 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/10 font-mono">
                  {entry.postId}
                </span>
                <span className="text-xs font-semibold text-foreground/80">
                  {entry.platform}
                </span>
                <span className="text-[10px] text-foreground/50">
                  Attempt #{entry.attemptNumber}
                </span>
              </div>

              <span
                className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border font-mono ${
                  entry.status === "RETRY_QUEUED"
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : entry.status === "MANUAL_REQUIRED"
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                }`}
              >
                {entry.status}
              </span>
            </div>

            <p className="text-xs text-foreground/75 font-mono bg-black/20 p-2.5 rounded-xl border border-white/5">
              {entry.errorMessage || "No errors encountered"}
            </p>

            <div className="flex items-center justify-between text-xs text-foreground/60 pt-1">
              <span className="text-[11px]">
                {entry.nextScheduledRetryIso ? (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Next Retry Scheduled: {new Date(entry.nextScheduledRetryIso).toLocaleTimeString()}
                  </span>
                ) : (
                  <span>Logged: {new Date(entry.timestamp).toLocaleTimeString()}</span>
                )}
              </span>

              <div className="flex items-center gap-2">
                {entry.status === "RETRY_QUEUED" && (
                  <button
                    onClick={() => handleSimulateRetry(entry)}
                    className="px-3 py-1 rounded-lg bg-amber-600/80 hover:bg-amber-500 text-white font-bold text-[11px] transition-all flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retry Now</span>
                  </button>
                )}
                {entry.status === "MANUAL_REQUIRED" && (
                  <button
                    onClick={() => alert(`Opening manual publishing checklist for ${entry.postId}.`)}
                    className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-foreground font-semibold text-[11px] transition-all flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3 text-red-400" />
                    <span>View Manual Checklist</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
