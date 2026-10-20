"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  Volume2,
  Download,
  Filter,
  CheckCircle2,
  FileBadge
} from "lucide-react";
import { MediaAsset, MediaAssetLibrary } from "@/lib/marketing/services/media-asset-library";

interface MediaAssetGalleryProps {
  assetLibrary: MediaAssetLibrary;
}

export function MediaAssetGallery({ assetLibrary }: MediaAssetGalleryProps) {
  const [filterType, setFilterType] = useState<string>("ALL");
  const assets = assetLibrary.getAllAssets();

  const filtered = assets.filter((a) => {
    if (filterType !== "ALL" && a.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="glass-panel p-5 rounded-3xl border border-white/10 shadow-glass flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span>Original Media Asset Library & Provenance Registry</span>
          </h3>
          <p className="text-xs text-foreground/60">
            Original 4K/HD culinary photos, vector brandmarks, and ASMR audio stems with verified licensing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["ALL", "IMAGE", "LOGO", "AUDIO"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === type
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "glass-card text-foreground/70 hover:text-foreground"
              }`}
            >
              {type === "ALL" ? "All Assets" : `${type}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Asset Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((asset) => (
          <div
            key={asset.id}
            className="rounded-2xl glass-card border border-white/10 overflow-hidden hover:border-emerald-400/40 transition-all group flex flex-col justify-between"
          >
            {/* Visual Preview */}
            <div className="aspect-video w-full bg-black/40 relative flex items-center justify-center overflow-hidden">
              {asset.type === "IMAGE" && (
                <img
                  src={asset.path}
                  alt={asset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              {asset.type === "LOGO" && (
                <div className="p-6 w-full h-full flex items-center justify-center bg-[#062419]">
                  <img
                    src={asset.path}
                    alt={asset.title}
                    className="max-h-16 max-w-full object-contain filter drop-shadow"
                  />
                </div>
              )}
              {asset.type === "AUDIO" && (
                <div className="flex flex-col items-center gap-2 text-emerald-400">
                  <Volume2 className="w-10 h-10 animate-bounce" />
                  <span className="text-xs font-mono font-bold">ASMR Audio Stem</span>
                </div>
              )}

              <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/10">
                {asset.aspectRatio}
              </span>
            </div>

            {/* Content Details & Provenance */}
            <div className="p-4 space-y-2.5">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                  {asset.type}
                </span>
                <h4 className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-amber-300 transition-colors">
                  {asset.title}
                </h4>
              </div>

              {/* Provenance Badge */}
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1 text-[10px] text-foreground/70">
                <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{asset.license}</span>
                </div>
                {asset.dishId && (
                  <div className="text-foreground/50 truncate">
                    Mapped Dish: <span className="text-foreground/80 font-medium">{asset.dishId}</span>
                  </div>
                )}
              </div>

              {/* Download / Path Link */}
              <a
                href={asset.path}
                download
                className="w-full py-1.5 px-3 rounded-xl text-xs font-semibold glass-card text-foreground/80 hover:text-foreground hover:border-emerald-400 flex items-center justify-center gap-1.5 transition-all text-center block"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>Download Asset</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
