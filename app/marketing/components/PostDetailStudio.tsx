"use client";

import React, { useState } from "react";
import {
  X,
  Volume2,
  VolumeX,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  Copy,
  Check,
  Download,
  ShieldCheck,
  Video,
  Sparkles,
  Layers,
  Globe,
  Share2
} from "lucide-react";
import {
  MarketingPost,
  ContentStatus,
  PlatformType,
  CreativeFormat
} from "@/lib/marketing/types/marketing-types";
import { platformAdapterRegistry } from "@/lib/marketing/adapters/adapter-registry";

interface PostDetailStudioProps {
  post: MarketingPost;
  onClose: () => void;
  onApprove: (postId: string, approverName: string, notes: string) => Promise<void>;
  onReject: (postId: string, approverName: string, notes: string) => Promise<void>;
  onPublishNow: (postId: string, simulate: boolean) => Promise<void>;
}

export function PostDetailStudio({
  post,
  onClose,
  onApprove,
  onReject,
  onPublishNow
}: PostDetailStudioProps) {
  const [activeLangTab, setActiveLangTab] = useState<"EN" | "ML">("EN");
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>(post.platforms[0] || PlatformType.INSTAGRAM_REEL);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [approverName, setApproverName] = useState("Jane Rose, Assistant Professor");
  const [approvalNotes, setApprovalNotes] = useState("");
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Web Speech API Voice Narration Preview
  const handlePlayVoiceover = (text: string, lang: "en-IN" | "ml-IN") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // Gentle cooking speed

    // Attempt to pick matching voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
    if (match) utterance.voice = match;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const currentContent = activeLangTab === "ML" && post.malayalamContent
    ? post.malayalamContent
    : post.englishContent;

  const adapter = platformAdapterRegistry.getAdapter(selectedPlatform);
  const manualChecklist = adapter ? adapter.generateManualPublishingChecklist(post) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-5xl rounded-3xl shadow-2xl border border-white/20 p-5 sm:p-7 relative max-h-[92vh] overflow-y-auto space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-card hover:bg-white/20 text-foreground/80 hover:text-foreground transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-extrabold text-sm text-amber-400">
                Day {post.dayNumber}
              </span>
              <span className="text-foreground/40">•</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/10 text-foreground/80">
                {post.phase}
              </span>
              <span className="text-foreground/40">•</span>
              <span className="text-xs font-semibold text-emerald-400">
                {post.pillar}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">
              {post.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground/60">Status:</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 border border-white/20 text-foreground">
              {post.status}
            </span>
          </div>
        </div>

        {/* Main 2-Column Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Bilingual Copy, Scripts, Audio & Verification (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Bilingual Language Switcher */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveLangTab("EN")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeLangTab === "EN"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "glass-card text-foreground/70 hover:text-foreground"
                  }`}
                >
                  English Master
                </button>
                {post.malayalamContent && (
                  <button
                    onClick={() => setActiveLangTab("ML")}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeLangTab === "ML"
                        ? "bg-amber-600 text-white shadow-md"
                        : "glass-card text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    <span>മലയാളം (Malayalam)</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </button>
                )}
              </div>

              {/* Real-time Web Speech Narration Audio Player */}
              <button
                onClick={() =>
                  handlePlayVoiceover(
                    `${currentContent.hook}. ${currentContent.script || currentContent.caption}`,
                    activeLangTab === "ML" ? "ml-IN" : "en-IN"
                  )
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isPlayingAudio
                    ? "bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse"
                    : "glass-card text-emerald-400 hover:border-emerald-400"
                }`}
                title="Synthesize audio preview using local browser voice"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span>Stop Voice</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Preview Voice ({activeLangTab === "ML" ? "മലയാളം" : "English"})</span>
                  </>
                )}
              </button>
            </div>

            {/* Hook Excerpt */}
            <div className="glass-card p-3.5 rounded-2xl border border-white/10">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                Primary Viral Hook (0 - 3s)
              </div>
              <p className="text-sm font-semibold text-foreground italic">
                "{currentContent.hook}"
              </p>
            </div>

            {/* Production Video Script with Shot List */}
            {currentContent.script && (
              <div className="glass-card p-3.5 rounded-2xl border border-white/10">
                <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Video Shot List & Production Cue
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-line font-mono bg-black/20 p-2.5 rounded-xl border border-white/5">
                  {currentContent.script}
                </p>
              </div>
            )}

            {/* Caption & Hashtags */}
            <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-foreground/60 uppercase tracking-wider">
                  Post Caption & Call to Action
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${currentContent.caption}\n\n${currentContent.hashtags.join(" ")}\n\n👉 ${currentContent.callToAction}`
                    )
                  }
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:underline"
                >
                  {copiedCaption ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCaption ? "Copied!" : "Copy Full Caption"}</span>
                </button>
              </div>

              <p className="text-xs text-foreground leading-relaxed whitespace-pre-line">
                {currentContent.caption}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                {currentContent.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/5 text-emerald-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-xs font-bold text-amber-300 pt-1">
                CTA: {currentContent.callToAction}
              </div>
            </div>

            {/* Asset Provenance & Licensing Verification */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Asset Provenance & Brand Consistency Verification</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-foreground/75">
                <div>
                  <span className="text-foreground/50">Verified Dish ID:</span>{" "}
                  <span className="font-semibold">{post.verifiedDishId || "Brand Master"}</span>
                </div>
                <div>
                  <span className="text-foreground/50">Image License:</span>{" "}
                  <span className="font-semibold">{post.assetProvenance.imageLicense}</span>
                </div>
                <div>
                  <span className="text-foreground/50">Voice Engine:</span>{" "}
                  <span className="font-semibold">{post.assetProvenance.voiceProvider}</span>
                </div>
                <div>
                  <span className="text-foreground/50">Audio License:</span>{" "}
                  <span className="font-semibold">{post.assetProvenance.audioLicense}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Preview, Platform Versions, Approvals (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Visual Media Preview Card */}
            <div className="glass-card rounded-2xl border border-white/10 overflow-hidden relative group">
              <div className="aspect-video sm:aspect-square w-full bg-black/40 relative overflow-hidden">
                <img
                  src={post.assetProvenance.dishImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-300 border border-white/10 self-start mb-1">
                    {post.format}
                  </span>
                  <div className="text-xs font-bold text-white drop-shadow">
                    Target Aspect: {post.format.includes("Vertical") ? "9:16 Vertical Video" : "4:5 Carousel"}
                  </div>
                </div>
              </div>
            </div>

            {/* Target Platforms Selector */}
            <div className="glass-card p-3 rounded-2xl border border-white/10">
              <div className="text-[11px] font-bold text-foreground/60 mb-2">
                Target Platform Checklist
              </div>
              <div className="flex flex-wrap gap-1.5">
                {post.platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedPlatform === p
                        ? "bg-amber-500 text-black shadow-sm font-bold"
                        : "bg-white/5 hover:bg-white/10 text-foreground/80 border border-white/10"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Human Approval Controls */}
            <div className="glass-panel p-4 rounded-2xl border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Human Approval Gate
                </span>
                {post.approvalRecord && (
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    Approved by {post.approvalRecord.approverName}
                  </span>
                )}
              </div>

              <div>
                <label className="text-[11px] text-foreground/60 font-semibold block mb-1">
                  Approver Name & Title
                </label>
                <input
                  type="text"
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/15 text-foreground outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="text-[11px] text-foreground/60 font-semibold block mb-1">
                  Reviewer Notes / Instructions
                </label>
                <textarea
                  rows={2}
                  value={approvalNotes}
                  onChange={(e) => setApprovalNotes(e.target.value)}
                  placeholder="e.g. Verified ingredient measurements, audio sync checked."
                  className="w-full px-3 py-1.5 rounded-xl text-xs bg-white/5 border border-white/15 text-foreground outline-none focus:border-emerald-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    await onApprove(post.id, approverName, approvalNotes);
                    setIsSubmitting(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md disabled:opacity-50"
                >
                  Approve Post
                </button>

                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    await onReject(post.id, approverName, approvalNotes);
                    setIsSubmitting(false);
                  }}
                  className="py-2 px-3 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 transition-all disabled:opacity-50"
                >
                  Reject to Draft
                </button>
              </div>

              {/* Immediate Publishing Button */}
              <button
                disabled={isSubmitting || (post.status !== ContentStatus.APPROVED && post.status !== ContentStatus.SCHEDULED)}
                onClick={async () => {
                  setIsSubmitting(true);
                  await onPublishNow(post.id, true);
                  setIsSubmitting(false);
                }}
                className="w-full py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Immediate Live Publish</span>
              </button>
            </div>

            {/* Manual Publishing Checklist if channel is disconnected */}
            {manualChecklist && (
              <div className="glass-card p-3.5 rounded-2xl border border-white/10 space-y-2">
                <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Manual Publishing Fallback SOP ({selectedPlatform})</span>
                </div>
                <div className="space-y-1 text-[11px] text-foreground/80">
                  {manualChecklist.steps.slice(0, 3).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{step.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
