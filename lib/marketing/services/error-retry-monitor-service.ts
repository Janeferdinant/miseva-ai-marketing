/**
 * MISEVA AI — ERROR, RETRY & IDEMPOTENCY MONITOR
 * 
 * Ensures zero duplicate publishing across social platforms, calculates exponential backoff
 * for transient errors, and flags permanent authorization/policy issues for manual review.
 */

export type PublishingErrorType =
  | 'NETWORK_TIMEOUT'
  | 'RATE_LIMIT_EXCEEDED'
  | 'TOKEN_EXPIRED'
  | 'MEDIA_INVALID'
  | 'POLICY_VIOLATION'
  | 'PLATFORM_UNAVAILABLE'
  | 'UNKNOWN';

export interface RetryPolicy {
  baseDelaySeconds: number; // default: 300 (5 mins)
  backoffMultiplier: number; // default: 2
  maxRetries: number; // default: 3
}

export interface IdempotencyRecord {
  key: string;
  description: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  completedAt?: string;
  externalUrl?: string;
  errorMessage?: string;
}

export interface PublishingAuditEntry {
  id: string;
  postId: string;
  platform: string;
  timestamp: string;
  errorType?: PublishingErrorType;
  errorMessage?: string;
  attemptNumber: number;
  status: 'SCHEDULED' | 'SUCCESS' | 'RETRY_QUEUED' | 'PERMANENT_FAILURE' | 'MANUAL_REQUIRED';
  nextScheduledRetryIso?: string;
}

export class ErrorRetryMonitorService {
  private idempotencyLedger = new Map<string, IdempotencyRecord>();
  private auditLogs: PublishingAuditEntry[] = [];
  private policy: RetryPolicy = {
    baseDelaySeconds: 300,
    backoffMultiplier: 2,
    maxRetries: 3
  };

  public checkAndRegisterIdempotency(
    key: string,
    description: string
  ): { allowed: boolean; status: 'PENDING' | 'COMPLETED' | 'FAILED'; duplicateMessage?: string } {
    const existing = this.idempotencyLedger.get(key);
    if (existing) {
      if (existing.status === 'COMPLETED') {
        return {
          allowed: false,
          status: 'COMPLETED',
          duplicateMessage: `Duplicate publishing rejected: Post already published on ${existing.completedAt} at ${existing.externalUrl}`
        };
      }
      if (existing.status === 'PENDING') {
        return {
          allowed: false,
          status: 'PENDING',
          duplicateMessage: 'Duplicate publishing rejected: Publishing action is currently in flight.'
        };
      }
    }

    // Register new in-flight record
    this.idempotencyLedger.set(key, {
      key,
      description,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    });

    return { allowed: true, status: 'PENDING' };
  }

  public markIdempotencySuccess(key: string, externalUrl?: string): void {
    const record = this.idempotencyLedger.get(key);
    if (record) {
      record.status = 'COMPLETED';
      record.completedAt = new Date().toISOString();
      record.externalUrl = externalUrl;
    }
  }

  public markIdempotencyFailure(key: string, errorMessage: string): void {
    const record = this.idempotencyLedger.get(key);
    if (record) {
      record.status = 'FAILED';
      record.errorMessage = errorMessage;
    }
  }

  public calculateRetryDelaySeconds(attemptNumber: number): number | null {
    if (attemptNumber > this.policy.maxRetries) {
      return null; // Exceeded maximum retry allowance
    }
    // Attempt 1: 300 * 2^0 = 300s
    // Attempt 2: 300 * 2^1 = 600s
    // Attempt 3: 300 * 2^2 = 1200s
    return this.policy.baseDelaySeconds * Math.pow(this.policy.backoffMultiplier, attemptNumber - 1);
  }

  public recordError(params: {
    postId: string;
    platform: string;
    errorType: PublishingErrorType;
    errorMessage: string;
    attemptNumber: number;
  }): {
    canRetry: boolean;
    requiresManualIntervention: boolean;
    nextScheduledRetryIso?: string;
    entry: PublishingAuditEntry;
  } {
    const isTransient =
      params.errorType === 'NETWORK_TIMEOUT' ||
      params.errorType === 'RATE_LIMIT_EXCEEDED' ||
      params.errorType === 'PLATFORM_UNAVAILABLE';

    const delaySeconds = this.calculateRetryDelaySeconds(params.attemptNumber);
    const canRetry = isTransient && delaySeconds !== null;
    const requiresManualIntervention = !isTransient || delaySeconds === null;

    let nextScheduledRetryIso: string | undefined;
    if (canRetry && delaySeconds) {
      const nextDate = new Date(Date.now() + delaySeconds * 1000);
      nextScheduledRetryIso = nextDate.toISOString();
    }

    const entry: PublishingAuditEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      postId: params.postId,
      platform: params.platform,
      timestamp: new Date().toISOString(),
      errorType: params.errorType,
      errorMessage: params.errorMessage,
      attemptNumber: params.attemptNumber,
      status: canRetry ? 'RETRY_QUEUED' : 'MANUAL_REQUIRED',
      nextScheduledRetryIso
    };

    this.auditLogs.unshift(entry);

    return {
      canRetry,
      requiresManualIntervention,
      nextScheduledRetryIso,
      entry
    };
  }

  public getAuditLogs(): PublishingAuditEntry[] {
    return [...this.auditLogs];
  }

  public getPendingRetries(): PublishingAuditEntry[] {
    return this.auditLogs.filter(l => l.status === 'RETRY_QUEUED');
  }

  public clearAuditLogs(): void {
    this.auditLogs = [];
  }
}

export const sharedErrorRetryMonitor = new ErrorRetryMonitorService();
