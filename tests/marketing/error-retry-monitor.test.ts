import { describe, it, expect, beforeEach } from 'vitest';
import {
  ErrorRetryMonitorService,
  PublishingErrorType,
  RetryPolicy
} from '@/lib/marketing/services/error-retry-monitor-service';

describe('ErrorRetryMonitorService — Idempotency & Exponential Backoff', () => {
  let monitor: ErrorRetryMonitorService;

  beforeEach(() => {
    monitor = new ErrorRetryMonitorService();
  });

  it('rejects duplicate post attempts using persistent idempotency keys', () => {
    const key = 'idem_post_day_01_ig_reel';

    // First attempt registration
    const firstCheck = monitor.checkAndRegisterIdempotency(key, 'Day 01 Instagram Reel');
    expect(firstCheck.allowed).toBe(true);
    expect(firstCheck.status).toBe('PENDING');

    // Simulate successful publishing
    monitor.markIdempotencySuccess(key, 'https://instagram.com/p/miseva_01');

    // Second attempt with identical key MUST be rejected as duplicate
    const secondCheck = monitor.checkAndRegisterIdempotency(key, 'Day 01 Instagram Reel Duplicate');
    expect(secondCheck.allowed).toBe(false);
    expect(secondCheck.status).toBe('COMPLETED');
    expect(secondCheck.duplicateMessage).toContain('Duplicate publishing rejected');
  });

  it('calculates exponential backoff delay correctly with maximum retry cap', () => {
    // Attempt 1: base backoff (e.g. 5 mins = 300s)
    const delay1 = monitor.calculateRetryDelaySeconds(1);
    expect(delay1).toBe(300);

    // Attempt 2: 2^1 * 300 = 600s (10 mins)
    const delay2 = monitor.calculateRetryDelaySeconds(2);
    expect(delay2).toBe(600);

    // Attempt 3: 2^2 * 300 = 1200s (20 mins)
    const delay3 = monitor.calculateRetryDelaySeconds(3);
    expect(delay3).toBe(1200);

    // Attempt 5 (exceeding max retries of 3): should return null indicating no more retries
    const delayExceeded = monitor.calculateRetryDelaySeconds(4);
    expect(delayExceeded).toBeNull();
  });

  it('records transient errors, distinguishes non-retryable errors, and maintains audit logs', () => {
    // Transient network timeout: retryable
    const transientJob = monitor.recordError({
      postId: 'post_02',
      platform: 'YouTube Shorts',
      errorType: 'NETWORK_TIMEOUT',
      errorMessage: 'Socket hang up on upload stream',
      attemptNumber: 1
    });

    expect(transientJob.canRetry).toBe(true);
    expect(transientJob.nextScheduledRetryIso).toBeDefined();

    // Authentication token revoked: non-retryable without human intervention
    const authJob = monitor.recordError({
      postId: 'post_03',
      platform: 'Facebook',
      errorType: 'TOKEN_EXPIRED',
      errorMessage: 'OAuth 2.0 access token expired or revoked',
      attemptNumber: 1
    });

    expect(authJob.canRetry).toBe(false);
    expect(authJob.requiresManualIntervention).toBe(true);

    // Verify audit logs (newest first)
    const auditLogs = monitor.getAuditLogs();
    expect(auditLogs.length).toBe(2);
    expect(auditLogs[0].postId).toBe('post_03');
    expect(auditLogs[1].postId).toBe('post_02');
  });
});
