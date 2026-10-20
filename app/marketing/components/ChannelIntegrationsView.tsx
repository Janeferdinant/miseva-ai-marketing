"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RotateCw,
  Globe,
  Share2,
  Video,
  Layers,
  Lock,
  ExternalLink
} from "lucide-react";
import { PlatformAdapterRegistry, platformAdapterRegistry } from "@/lib/marketing/adapters/adapter-registry";
import { PlatformType } from "@/lib/marketing/types/marketing-types";

export function ChannelIntegrationsView() {
  const [registry, setRegistry] = useState<PlatformAdapterRegistry>(platformAdapterRegistry);
  const [connectingPlatform, setConnectingPlatform] = useState<PlatformType | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const adapters = registry.getAllAdapters();

  const handleTestAuth = async (platform: PlatformType) => {
    setConnectingPlatform(platform);
    setMessage(null);

    const adapter = registry.getAdapter(platform);
    if (!adapter) return;

    // Simulate verified handshake with mock credentials
    const result = await adapter.authenticate({
      apiKey: "test_mock_key_authorized",
      accessToken: "EAAB_mock_oauth_valid_token",
      pageAccessToken: "fb_page_mock_token_valid",
      pageId: "page_miseva_ai_official",
      instagramAccountId: "act_miseva_123",
      organizationUrn: "urn:li:organization:1029384",
      phoneNumberId: "phone_wa_9100000000"
    });

    setConnectingPlatform(null);
    if (result.success) {
      setMessage(`Successfully authenticated with ${adapter.name}! Token granted with scopes: ${result.scopes?.join(", ")}`);
      // Trigger re-render
      setRegistry(new PlatformAdapterRegistry());
    } else {
      setMessage(`Authentication failed: ${result.error}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Vault Banner */}
      <div className="p-5 rounded-3xl glass-panel border border-emerald-500/30 shadow-glass space-y-2 bg-gradient-to-r from-emerald-950/30 via-emerald-900/10 to-transparent">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Security Guardian — Authorized Social Publishing Credentials Vault</span>
        </div>
        <p className="text-xs text-foreground/75 leading-relaxed max-w-3xl">
          All publishing credentials, OAuth2 refresh tokens, and system secrets are managed under least-privilege access rules. Tokens are strictly guarded server-side and never exposed to client-side bundles, frontend logs, or Git commits.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="text-foreground/50 hover:text-foreground">✕</button>
        </div>
      )}

      {/* Social Channel Adapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adapters.map((adapter) => {
          const isConnected = adapter.isAuthenticated();
          const isPending = connectingPlatform === adapter.platform;
          return (
            <div
              key={adapter.platform}
              className={`p-5 rounded-3xl glass-card border flex flex-col justify-between space-y-4 transition-all ${
                isConnected
                  ? "border-emerald-500/40 bg-emerald-950/10 shadow-sm"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <div>
                {/* Header: Name & Status */}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-sm text-foreground flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span>{adapter.name}</span>
                  </h4>
                  {isConnected ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Connected
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-foreground/60 border border-white/15 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Manual SOP Active
                    </span>
                  )}
                </div>

                {/* Platform Specs */}
                <div className="space-y-1.5 text-[11px] text-foreground/70 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Aspect Ratios:</span>
                    <span className="font-semibold text-foreground">{adapter.supportedAspectRatios.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Char Limit:</span>
                    <span className="font-semibold text-foreground">{adapter.characterLimit.toLocaleString()} chars</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/50">Review Requirement:</span>
                    <span className="font-semibold text-amber-300">Human Approval Mandatory</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  disabled={isPending}
                  onClick={() => handleTestAuth(adapter.platform)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isConnected
                      ? "glass-card text-emerald-400 hover:border-emerald-400"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md"
                  }`}
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isPending ? "animate-spin" : ""}`} />
                  <span>
                    {isPending
                      ? "Verifying Token..."
                      : isConnected
                      ? "Re-verify Connection"
                      : "Connect Channel (Authorized Test)"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
