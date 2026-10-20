/**
 * MISEVA AI — BASE SOCIAL PLATFORM ADAPTER
 * Standard contract for verified social media publishing integrations.
 */

import {
  PlatformType,
  ContentStatus,
  type MarketingPost,
  type PostPerformanceMetrics
} from '../types/marketing-types';

export interface AuthenticationResult {
  success: boolean;
  error?: string;
  scopes?: string[];
  expiresAtIso?: string;
}

export interface EligibilityResult {
  eligible: boolean;
  reasons: string[];
  dailyQuota?: {
    limit: number;
    used: number;
    remaining: number;
    resetsAtIso: string;
  };
}

export interface FormatValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  externalUrl?: string;
  error?: string;
  isSimulated: boolean;
  publishedAtIso: string;
  checklistIfManualRequired?: ManualPublishingChecklist;
}

export interface ManualPublishingChecklist {
  platform: PlatformType;
  title: string;
  dayNumber: number;
  steps: string[];
  copyableCaption: string;
  recommendedHashtags: string[];
  callToAction: string;
  targetAspectRatio: string;
  assetDownloadUrls: string[];
  targetPublishTimeIso: string;
  verificationNotes: string;
}

export abstract class BaseSocialAdapter {
  abstract readonly platform: PlatformType;
  abstract readonly name: string;
  abstract readonly characterLimit: number;
  abstract readonly supportedAspectRatios: string[];

  protected authenticated: boolean = false;
  protected grantedScopes: string[] = [];

  public isAuthenticated(): boolean {
    return this.authenticated;
  }

  public getGrantedScopes(): string[] {
    return [...this.grantedScopes];
  }

  abstract authenticate(credentials: Record<string, string>): Promise<AuthenticationResult>;
  abstract checkEligibility(): Promise<EligibilityResult>;
  abstract validatePostFormat(post: MarketingPost): FormatValidationResult;
  abstract publish(
    post: MarketingPost,
    options?: { simulate?: boolean }
  ): Promise<PublishResult>;
  abstract getMetrics(externalPostId: string): Promise<Partial<PostPerformanceMetrics>>;

  public generateManualPublishingChecklist(post: MarketingPost): ManualPublishingChecklist {
    const caption = post.englishContent.caption;
    const hashtags = post.englishContent.hashtags || [];
    const formattedCaption = `${caption}\n\n${hashtags.join(' ')}\n\n👉 ${post.englishContent.callToAction}`;

    return {
      platform: this.platform,
      title: post.title,
      dayNumber: post.dayNumber,
      steps: [
        `1. Download primary high-res dish asset: ${post.assetProvenance.dishImage}`,
        `2. Ensure visual conforms to target aspect ratio: ${this.supportedAspectRatios[0]}`,
        `3. Copy formatted caption and verified hashtags below into the ${this.name} post editor`,
        `4. Set scheduled publish time: ${new Date(post.scheduledTimeIso).toLocaleString('en-IN', { timeZone: post.targetTimezone || 'Asia/Kolkata' })} (${post.targetTimezone || 'Asia/Kolkata'})`,
        `5. Confirm destination UTM URL: https://miseva.ai?utm_source=${this.platform.toLowerCase().replace(/ /g, '_')}&utm_campaign=30day_launch&utm_content=day_${post.dayNumber}`,
        `6. Once published, enter the public post URL in the Miseva Marketing Dashboard to begin tracking engagement metrics.`
      ],
      copyableCaption: formattedCaption,
      recommendedHashtags: hashtags,
      callToAction: post.englishContent.callToAction,
      targetAspectRatio: this.supportedAspectRatios[0],
      assetDownloadUrls: [post.assetProvenance.dishImage],
      targetPublishTimeIso: post.scheduledTimeIso,
      verificationNotes: `Verified against Miseva AI catalog dish: ${post.verifiedDishId || 'Brand Foundation'}`
    };
  }

  protected verifyApprovalGuard(post: MarketingPost): { allowed: boolean; error?: string } {
    if (post.status !== ContentStatus.APPROVED && post.status !== ContentStatus.SCHEDULED) {
      return {
        allowed: false,
        error: `Human approval is required before publishing. Current status: "${post.status}". Post must be in "Approved" or "Scheduled" status.`
      };
    }
    if (!post.approvalRecord || post.approvalRecord.state !== 'Approved') {
      return {
        allowed: false,
        error: 'Missing formal human approval record with approver identification.'
      };
    }
    return { allowed: true };
  }
}
