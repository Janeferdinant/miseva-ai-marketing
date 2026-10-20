/**
 * MISEVA AI — SOCIAL PLATFORM ADAPTER REGISTRY
 * Singleton manager coordinating authentication, format checks, and multi-platform publishing.
 */

import { BaseSocialAdapter } from './base-adapter';
import { YouTubeAdapter } from './youtube-adapter';
import { InstagramAdapter } from './instagram-adapter';
import { FacebookAdapter } from './facebook-adapter';
import { PinterestAdapter } from './pinterest-adapter';
import { LinkedInAdapter } from './linkedin-adapter';
import { WhatsAppAdapter } from './whatsapp-adapter';
import { PlatformType } from '../types/marketing-types';

export class PlatformAdapterRegistry {
  private adapters: Map<PlatformType, BaseSocialAdapter> = new Map();

  constructor() {
    this.registerDefaultAdapters();
  }

  private registerDefaultAdapters(): void {
    // YouTube Shorts & Standard
    this.adapters.set(PlatformType.YOUTUBE_SHORTS, new YouTubeAdapter(true));
    this.adapters.set(PlatformType.YOUTUBE, new YouTubeAdapter(false));

    // Instagram Reels & Carousels
    this.adapters.set(PlatformType.INSTAGRAM_REEL, new InstagramAdapter(false));
    this.adapters.set(PlatformType.INSTAGRAM_CAROUSEL, new InstagramAdapter(true));
    this.adapters.set(PlatformType.INSTAGRAM, new InstagramAdapter(false));

    // Facebook
    this.adapters.set(PlatformType.FACEBOOK, new FacebookAdapter());

    // Pinterest
    this.adapters.set(PlatformType.PINTEREST, new PinterestAdapter());

    // LinkedIn
    this.adapters.set(PlatformType.LINKEDIN, new LinkedInAdapter());

    // WhatsApp
    this.adapters.set(PlatformType.WHATSAPP, new WhatsAppAdapter());
  }

  public getAdapter(platform: PlatformType): BaseSocialAdapter | undefined {
    return this.adapters.get(platform);
  }

  public getSupportedPlatforms(): PlatformType[] {
    return Array.from(this.adapters.keys());
  }

  public getAllAdapters(): BaseSocialAdapter[] {
    return Array.from(new Set(this.adapters.values()));
  }

  public getConnectedStatusSummary(): Record<PlatformType, { connected: boolean; name: string }> {
    const result = {} as Record<PlatformType, { connected: boolean; name: string }>;
    this.adapters.forEach((adapter, platform) => {
      result[platform] = {
        connected: adapter.isAuthenticated(),
        name: adapter.name
      };
    });
    return result;
  }
}

// Global shared registry instance
export const platformAdapterRegistry = new PlatformAdapterRegistry();
