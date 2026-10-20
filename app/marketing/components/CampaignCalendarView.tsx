"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  FileEdit,
  Sparkles,
  Layers,
  Video,
  Image as ImageIcon,
  ChevronRight
} from "lucide-react";
import {
  CampaignPhase,
  ContentPillar,
  ContentStatus,
  PlatformType,
  CreativeFormat,
  type MarketingPost
} from "@/lib/marketing/types/marketing-types";

interface CampaignCalendarViewProps {
  posts: MarketingPost[];
  onSelectPost: (post: MarketingPost) => void;
  selectedPostId?: string;
}

export function CampaignCalendarView({
  posts,
  onSelectPost,
  selectedPostId
}: CampaignCalendarViewProps) {
  const [phaseFilter, setPhaseFilter] = useState<string>("ALL");
  const [pillarFilter, setPillarFilter] = useState<string>("ALL");
  const [platformFilter, setPlatformFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = posts.filter((post) => {
    if (phaseFilter !== "ALL" && post.phase !== phaseFilter) return false;
    if (pillarFilter !== "ALL" && post.pillar !== pillarFilter) return false;
    if (statusFilter !== "ALL" && post.status !== statusFilter) return false;
    if (platformFilter !== "ALL" && !post.platforms.includes(platformFilter as PlatformType)) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = post.title.toLowerCase().includes(q);
      const matchesHook = post.englishContent.hook.toLowerCase().includes(q);
      const matchesDish = post.verifiedDishId?.toLowerCase().includes(q);
      const matchesMl = post.malayalamContent?.hook.includes(q) || post.malayalamContent?.caption.includes(q);
      if (!matchesTitle && !matchesHook && !matchesDish && !matchesMl) return false;
    }
    return true;
  });

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case ContentStatus.PUBLISHED:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <Send className="w-3 h-3" /> Published
          </span>
        );
      case ContentStatus.SCHEDULED:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Scheduled
          </span>
        );
      case ContentStatus.APPROVED:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case ContentStatus.AWAITING_APPROVAL:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Awaiting Sign-off
          </span>
        );
      case ContentStatus.FAILED:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Failed / Needs Review
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-foreground/70 border border-white/15 flex items-center gap-1">
            <FileEdit className="w-3 h-3" /> {status}
          </span>
        );
    }
  };

  const getFormatIcon = (format: CreativeFormat) => {
    if (format.includes("Video") || format.includes("Short")) {
      return <Video className="w-3.5 h-3.5 text-amber-400" />;
    }
    if (format.includes("Carousel")) {
      return <Layers className="w-3.5 h-3.5 text-blue-400" />;
    }
    return <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />;
  };

  return (
    <div className="space-y-4">
      {/* Interactive Filter Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 shadow-glass flex flex-wrap items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns by dish, keyword, Malayalam text..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/5 border border-white/15 focus:border-emerald-400 text-foreground outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Phase Filter */}
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="px-2.5 py-2 rounded-xl text-xs font-semibold glass-card border border-white/10 text-foreground cursor-pointer outline-none"
          >
            <option value="ALL" className="bg-[#062419] text-white">All Phases</option>
            {Object.values(CampaignPhase).map((p) => (
              <option key={p} value={p} className="bg-[#062419] text-white">Phase: {p}</option>
            ))}
          </select>

          {/* Pillar Filter */}
          <select
            value={pillarFilter}
            onChange={(e) => setPillarFilter(e.target.value)}
            className="px-2.5 py-2 rounded-xl text-xs font-semibold glass-card border border-white/10 text-foreground cursor-pointer outline-none"
          >
            <option value="ALL" className="bg-[#062419] text-white">All Pillars</option>
            {Object.values(ContentPillar).map((p) => (
              <option key={p} value={p} className="bg-[#062419] text-white">{p}</option>
            ))}
          </select>

          {/* Platform Filter */}
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="px-2.5 py-2 rounded-xl text-xs font-semibold glass-card border border-white/10 text-foreground cursor-pointer outline-none"
          >
            <option value="ALL" className="bg-[#062419] text-white">All Platforms</option>
            <option value={PlatformType.INSTAGRAM_REEL} className="bg-[#062419] text-white">Instagram Reels</option>
            <option value={PlatformType.INSTAGRAM_CAROUSEL} className="bg-[#062419] text-white">Instagram Carousel</option>
            <option value={PlatformType.YOUTUBE_SHORTS} className="bg-[#062419] text-white">YouTube Shorts</option>
            <option value={PlatformType.YOUTUBE} className="bg-[#062419] text-white">YouTube Long-form</option>
            <option value={PlatformType.FACEBOOK} className="bg-[#062419] text-white">Facebook</option>
            <option value={PlatformType.PINTEREST} className="bg-[#062419] text-white">Pinterest</option>
            <option value={PlatformType.LINKEDIN} className="bg-[#062419] text-white">LinkedIn</option>
            <option value={PlatformType.WHATSAPP} className="bg-[#062419] text-white">WhatsApp</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-2 rounded-xl text-xs font-semibold glass-card border border-white/10 text-foreground cursor-pointer outline-none"
          >
            <option value="ALL" className="bg-[#062419] text-white">All Statuses</option>
            {Object.values(ContentStatus).map((s) => (
              <option key={s} value={s} className="bg-[#062419] text-white">{s}</option>
            ))}
          </select>

          {(phaseFilter !== "ALL" || pillarFilter !== "ALL" || platformFilter !== "ALL" || statusFilter !== "ALL" || searchQuery) && (
            <button
              onClick={() => {
                setPhaseFilter("ALL");
                setPillarFilter("ALL");
                setPlatformFilter("ALL");
                setStatusFilter("ALL");
                setSearchQuery("");
              }}
              className="text-xs text-amber-400 hover:underline px-2 py-1 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 30-Day Calendar Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
        {filteredPosts.map((post) => {
          const isSelected = post.id === selectedPostId;
          return (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className={`p-4 rounded-2xl glass-card transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between border ${
                isSelected
                  ? "border-emerald-400 ring-2 ring-emerald-400/30 shadow-lg bg-emerald-950/20"
                  : "border-white/10 hover:border-emerald-400/40 hover:bg-white/10"
              }`}
            >
              <div>
                {/* Header: Day number & Status badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-extrabold text-sm text-amber-400">
                    Day {post.dayNumber}
                  </span>
                  {getStatusBadge(post.status)}
                </div>

                {/* Phase & Pillar */}
                <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-foreground/60 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                    {post.phase}
                  </span>
                  <span className="truncate max-w-[140px] text-emerald-400/90 font-medium">
                    {post.pillar}
                  </span>
                </div>

                {/* Post Title */}
                <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-amber-300 transition-colors mb-2">
                  {post.title}
                </h3>

                {/* English Hook Excerpt */}
                <p className="text-[11px] text-foreground/70 line-clamp-2 italic mb-3">
                  "{post.englishContent.hook}"
                </p>
              </div>

              {/* Footer info: Platforms, Malayalam badge, format icon */}
              <div className="pt-3 border-t border-white/10 mt-auto flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  {getFormatIcon(post.format)}
                  {post.malayalamContent && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      മലയാളം
                    </span>
                  )}
                  {post.verifiedDishId && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/25 truncate max-w-[70px]">
                      Verified
                    </span>
                  )}
                </div>

                <div className="text-foreground/50 group-hover:text-foreground flex items-center text-[10px] font-semibold">
                  <span>Studio</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="glass-panel p-12 text-center rounded-3xl border border-white/10">
          <CalendarIcon className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
          <h3 className="text-base font-bold text-foreground">No Campaign Posts Match Filters</h3>
          <p className="text-xs text-foreground/60 mt-1 max-w-md mx-auto">
            Try adjusting your search query, campaign phase, or content pillar filter to see scheduled posts.
          </p>
        </div>
      )}
    </div>
  );
}
