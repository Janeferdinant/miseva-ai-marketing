"use client";

import React, { useState } from "react";
import {
  Clock,
  Send,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  FileText
} from "lucide-react";
import { MarketingPost, ContentStatus, PlatformType } from "@/lib/marketing/types/marketing-types";

interface PublishingQueueViewProps {
  posts: MarketingPost[];
  onRetry: (postId: string) => Promise<void>;
  onSelectPost: (post: MarketingPost) => void;
}

export function PublishingQueueView({
  posts,
  onRetry,
  onSelectPost
}: PublishingQueueViewProps) {
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const queuedPosts = posts.filter(
    (p) =>
      p.status === ContentStatus.SCHEDULED ||
      p.status === ContentStatus.APPROVED ||
      p.status === ContentStatus.FAILED
  ).sort((a, b) => new Date(a.scheduledTimeIso).getTime() - new Date(b.scheduledTimeIso).getTime());

  const publishedHistory = posts.filter((p) => p.status === ContentStatus.PUBLISHED);

  const handleRetry = async (id: string) => {
    setRetryingId(id);
    await onRetry(id);
    setRetryingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Active Publishing Queue */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-glass space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Active Publishing Queue ({queuedPosts.length})</span>
            </h3>
            <p className="text-xs text-foreground/60">
              Posts awaiting automated dispatch, retry processing, or approved release windows.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {queuedPosts.map((post) => {
            const isFailed = post.status === ContentStatus.FAILED;
            return (
              <div
                key={post.id}
                className={`p-4 rounded-2xl glass-card border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  isFailed
                    ? "border-red-500/40 bg-red-950/15"
                    : "border-white/10 hover:border-emerald-400/30"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-amber-400">
                      Day {post.dayNumber}
                    </span>
                    <span className="text-foreground/40">•</span>
                    <span className="text-xs font-bold text-foreground">
                      {post.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isFailed
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {post.status}
                    </span>
                  </div>

                  <p className="text-xs text-foreground/70 italic line-clamp-1">
                    "{post.englishContent.hook}"
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-foreground/50 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Target: {new Date(post.scheduledTimeIso).toLocaleString("en-IN", { timeZone: post.targetTimezone })}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">
                      {post.platforms.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {isFailed ? (
                    <button
                      disabled={retryingId === post.id}
                      onClick={() => handleRetry(post.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-black flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <RotateCcw className={`w-3.5 h-3.5 ${retryingId === post.id ? "animate-spin" : ""}`} />
                      <span>{retryingId === post.id ? "Retrying..." : "Retry Dispatch"}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectPost(post)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold glass-card text-foreground hover:border-emerald-400 transition-all"
                    >
                      Inspect Post
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {queuedPosts.length === 0 && (
            <div className="p-8 text-center rounded-2xl border border-dashed border-white/10 text-foreground/50 text-xs">
              No items currently waiting in the active publishing queue.
            </div>
          )}
        </div>
      </div>

      {/* Published Confirmation History */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-glass space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Confirmed Published Posts ({publishedHistory.length})</span>
          </h3>
          <p className="text-xs text-foreground/60">
            Posts successfully verified and live across connected social channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {publishedHistory.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-emerald-400/40 cursor-pointer space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-amber-400">Day {post.dayNumber}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live
                </span>
              </div>
              <h4 className="text-xs font-bold text-foreground line-clamp-1">{post.title}</h4>
              <div className="text-[10px] text-foreground/50">
                Published: {new Date(post.scheduledTimeIso).toLocaleDateString()}
              </div>
              {post.metrics && (
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                  <span>{post.metrics.views.toLocaleString()} Views</span>
                  <span>{post.metrics.likes} Likes</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
