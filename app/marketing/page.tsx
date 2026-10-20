"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Layers,
  BarChart3,
  ShieldCheck,
  Image as ImageIcon,
  Send,
  Plus,
  Users,
  Compass,
  AlertTriangle,
  Lock,
  Film,
  IndianRupee
} from "lucide-react";
import { MarketingHeader } from "./components/MarketingHeader";
import { CampaignCalendarView } from "./components/CampaignCalendarView";
import { PostDetailStudio } from "./components/PostDetailStudio";
import { PublishingQueueView } from "./components/PublishingQueueView";
import { MediaAssetGallery } from "./components/MediaAssetGallery";
import { GrowthExperimentsView } from "./components/GrowthExperimentsView";
import { AnalyticsDigestView } from "./components/AnalyticsDigestView";
import { ChannelIntegrationsView } from "./components/ChannelIntegrationsView";
import { CustomerSegmentManagerView } from "./components/CustomerSegmentManagerView";
import { RecommendationEngineView } from "./components/RecommendationEngineView";
import { ConsentPrivacyView } from "./components/ConsentPrivacyView";
import { ErrorRetryMonitorView } from "./components/ErrorRetryMonitorView";
import { AiContentStudioView } from "./components/AiContentStudioView";
import { BudgetExperimentView } from "./components/BudgetExperimentView";

import {
  sharedCalendarService,
  sharedApprovalService,
  sharedSchedulerService,
  sharedAssetLibrary,
  sharedExperimentsService,
  sharedAnalyticsService
} from "@/lib/marketing/services/marketing-hub";
import { MarketingPost } from "@/lib/marketing/types/marketing-types";

type DashboardTab =
  | "CALENDAR"
  | "QUEUE"
  | "STUDIO"
  | "SEGMENTS"
  | "RECOMMENDATIONS"
  | "CHANNELS"
  | "ERRORS"
  | "ASSETS"
  | "BUDGET"
  | "ANALYTICS"
  | "PRIVACY";

export default function MarketingDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("CALENDAR");
  const [posts, setPosts] = useState<MarketingPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<MarketingPost | null>(null);
  const [isEmergencyPaused, setIsEmergencyPaused] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("Asia/Kolkata");
  const [summary, setSummary] = useState(sharedCalendarService.calculateCampaignSummary());

  const refreshState = () => {
    setPosts([...sharedCalendarService.getAllPosts()]);
    setSummary(sharedCalendarService.calculateCampaignSummary());
    setIsEmergencyPaused(sharedApprovalService.isEmergencyPaused());
  };

  useEffect(() => {
    refreshState();
  }, []);

  const handleApprove = async (postId: string, approverName: string, notes: string) => {
    sharedApprovalService.approvePost(postId, "usr_admin", approverName, notes);
    refreshState();
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(sharedCalendarService.getPostById(postId) || null);
    }
  };

  const handleReject = async (postId: string, approverName: string, notes: string) => {
    sharedApprovalService.rejectPost(postId, "usr_admin", approverName, notes);
    refreshState();
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(sharedCalendarService.getPostById(postId) || null);
    }
  };

  const handlePublishNow = async (postId: string, simulate: boolean) => {
    const res = await sharedSchedulerService.publishPostNow(postId, { simulate });
    refreshState();
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(sharedCalendarService.getPostById(postId) || null);
    }
    if (!res.success) {
      alert(`Publishing paused: ${res.error}`);
    } else {
      alert(`Successfully published across: ${res.externalUrls?.join(", ")}`);
    }
  };

  const handleRetry = async (postId: string) => {
    await sharedSchedulerService.retryFailedPost(postId);
    refreshState();
  };

  const handleToggleEmergencyPause = (shouldPause: boolean) => {
    sharedApprovalService.setEmergencyPause(
      shouldPause,
      shouldPause ? "Manual emergency hold invoked by operator" : undefined,
      "Marketing Director"
    );
    refreshState();
  };

  const handleExportCalendar = (format: "CSV" | "JSON" | "ICS") => {
    const output = sharedCalendarService.exportCalendar(format);
    const mimeType =
      format === "CSV" ? "text/csv" : format === "ICS" ? "text/calendar" : "application/json";
    const filename = `miseva-30-day-campaign.${format.toLowerCase()}`;

    const blob = new Blob([output], { type: `${mimeType};charset=utf-8;` });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 pt-4">
      {/* Top Header */}
      <MarketingHeader
        summary={summary}
        isEmergencyPaused={isEmergencyPaused}
        selectedTimezone={selectedTimezone}
        onTimezoneChange={setSelectedTimezone}
        onToggleEmergencyPause={handleToggleEmergencyPause}
        onExportCalendar={handleExportCalendar}
      />

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
        <button
          onClick={() => setActiveTab("CALENDAR")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "CALENDAR"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>30-Day Calendar</span>
        </button>

        <button
          onClick={() => setActiveTab("QUEUE")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "QUEUE"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Daily Queue</span>
          {summary.scheduledCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("STUDIO")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "STUDIO"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Film className="w-3.5 h-3.5 text-teal-400" />
          <span>AI Content Studio</span>
        </button>

        <button
          onClick={() => setActiveTab("SEGMENTS")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "SEGMENTS"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Users className="w-3.5 h-3.5 text-amber-400" />
          <span>Customer Segments</span>
        </button>

        <button
          onClick={() => setActiveTab("RECOMMENDATIONS")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "RECOMMENDATIONS"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-400" />
          <span>Recommendation Engine</span>
        </button>

        <button
          onClick={() => setActiveTab("CHANNELS")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "CHANNELS"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Social Connections</span>
        </button>

        <button
          onClick={() => setActiveTab("ERRORS")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "ERRORS"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
          <span>Error & Retry Monitor</span>
        </button>

        <button
          onClick={() => setActiveTab("ASSETS")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "ASSETS"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Media Assets</span>
        </button>

        <button
          onClick={() => setActiveTab("BUDGET")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "BUDGET"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
          <span>Budget & Experiments</span>
        </button>

        <button
          onClick={() => setActiveTab("ANALYTICS")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "ANALYTICS"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Funnel Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab("PRIVACY")}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "PRIVACY"
              ? "bg-emerald-600 text-white shadow-md border border-emerald-400/40"
              : "glass-card text-foreground/75 hover:text-foreground"
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Consent & Privacy</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      {activeTab === "CALENDAR" && (
        <CampaignCalendarView
          posts={posts}
          onSelectPost={(post) => setSelectedPost(post)}
          selectedPostId={selectedPost?.id}
        />
      )}

      {activeTab === "QUEUE" && (
        <PublishingQueueView
          posts={posts}
          onRetry={handleRetry}
          onSelectPost={(post) => setSelectedPost(post)}
        />
      )}

      {activeTab === "STUDIO" && (
        <AiContentStudioView />
      )}

      {activeTab === "SEGMENTS" && (
        <CustomerSegmentManagerView />
      )}

      {activeTab === "RECOMMENDATIONS" && (
        <RecommendationEngineView />
      )}

      {activeTab === "CHANNELS" && (
        <ChannelIntegrationsView />
      )}

      {activeTab === "ERRORS" && (
        <ErrorRetryMonitorView />
      )}

      {activeTab === "ASSETS" && (
        <MediaAssetGallery assetLibrary={sharedAssetLibrary} />
      )}

      {activeTab === "BUDGET" && (
        <BudgetExperimentView />
      )}

      {activeTab === "ANALYTICS" && (
        <AnalyticsDigestView analyticsService={sharedAnalyticsService} />
      )}

      {activeTab === "PRIVACY" && (
        <ConsentPrivacyView />
      )}

      {/* Post Detail & Production Studio Modal */}
      {selectedPost && (
        <PostDetailStudio
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onPublishNow={handlePublishNow}
        />
      )}
    </div>
  );
}
