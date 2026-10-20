import { describe, it, expect } from 'vitest';
import { GET as getPosts, POST as createPost } from '../../app/api/marketing/posts/route';
import { POST as approvePost } from '../../app/api/marketing/posts/[id]/approve/route';
import { POST as publishPost } from '../../app/api/marketing/posts/[id]/publish/route';
import { GET as getPause, POST as togglePause } from '../../app/api/marketing/pause/route';
import { GET as getAnalytics } from '../../app/api/marketing/analytics/route';
import { GET as exportCalendar } from '../../app/api/marketing/export/route';

describe('Marketing App Router API Endpoints', () => {
  it('GET /api/marketing/posts should return 30-day posts and campaign summary', async () => {
    const req = new Request('http://localhost:3000/api/marketing/posts');
    const res = await getPosts(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.posts).toHaveLength(30);
    expect(data.summary.totalPosts).toBe(30);
  });

  it('GET /api/marketing/posts with search filter should return matching items', async () => {
    const req = new Request('http://localhost:3000/api/marketing/posts?search=Malayalam');
    const res = await getPosts(req);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.posts.length).toBeGreaterThan(0);
  });

  it('POST /api/marketing/posts/[id]/approve should record human approval', async () => {
    const req = new Request('http://localhost:3000/api/marketing/posts/miseva-day-11/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'APPROVE',
        approverName: 'Jane Rose, Assistant Professor',
        notes: 'Verified voiceover sync and brand guidelines.'
      })
    });

    const res = await approvePost(req, { params: Promise.resolve({ id: 'miseva-day-11' }) });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.post.status).toBe('Approved');
    expect(data.post.approvalRecord.approverName).toBe('Jane Rose, Assistant Professor');
  });

  it('GET & POST /api/marketing/pause should inspect and toggle emergency campaign pause', async () => {
    // Check initial state
    const getRes = await getPause();
    const getData = await getRes.json();
    expect(getData.isPaused).toBe(false);

    // Toggle ON
    const toggleReq = new Request('http://localhost:3000/api/marketing/pause', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isPaused: true,
        reason: 'Temporary audit by brand security team',
        actor: 'Security Guardian'
      })
    });
    const postRes = await togglePause(toggleReq);
    const postData = await postRes.json();
    expect(postData.isPaused).toBe(true);
    expect(postData.reason).toContain('Temporary audit');

    // Toggle OFF again
    const resetReq = new Request('http://localhost:3000/api/marketing/pause', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPaused: false })
    });
    await togglePause(resetReq);
  });

  it('GET /api/marketing/analytics should return funnel report and growth experiments', async () => {
    const res = await getAnalytics();
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.funnel).toBeDefined();
    expect(data.funnel.observedAttributedRevenueInr).toBeGreaterThan(0);
    expect(data.experiments.length).toBeGreaterThanOrEqual(7);
    expect(data.weeklyDigest).toBeDefined();
  });

  it('GET /api/marketing/export?format=CSV should return downloadable CSV calendar', async () => {
    const req = new Request('http://localhost:3000/api/marketing/export?format=CSV');
    const res = await exportCalendar(req);
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/csv');

    const csvText = await res.text();
    expect(csvText).toContain('Day,Title,Phase,Pillar,Format,Platforms,Status');
  });

  it('GET /api/marketing/segments should return all 9 customer segments', async () => {
    const { GET: getSegments } = await import('../../app/api/marketing/segments/route');
    const req = new Request('http://localhost:3000/api/marketing/segments');
    const res = await getSegments(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.totalSegments).toBe(9);
    expect(data.segments[0].id).toBe('SEGMENT_A_INGREDIENTS');
  });

  it('GET & POST /api/marketing/recommendations should return contextual and consented items', async () => {
    const { GET: getRecs, POST: postRecs } = await import('../../app/api/marketing/recommendations/route');

    // GET anonymous contextual
    const reqGet = new Request('http://localhost:3000/api/marketing/recommendations?page=/recipes/malabar-chicken-biryani');
    const resGet = await getRecs(reqGet);
    expect(resGet.status).toBe(200);
    const dataGet = await resGet.json();
    expect(dataGet.success).toBe(true);
    expect(dataGet.recommendations.length).toBeGreaterThan(0);

    // POST consented
    const reqPost = new Request('http://localhost:3000/api/marketing/recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        context: { currentPage: '/home' },
        profile: {
          userId: 'test_user_api',
          allowPersonalisation: true,
          allowNotifications: false,
          consentedCategories: ['Desserts'],
          savedDishIds: []
        }
      })
    });
    const resPost = await postRecs(reqPost);
    expect(resPost.status).toBe(200);
    const dataPost = await resPost.json();
    expect(dataPost.success).toBe(true);
    expect(dataPost.recommendations.length).toBeGreaterThan(0);
  });

  it('POST /api/marketing/privacy should manage user consent and data deletion', async () => {
    const { POST: postPrivacy } = await import('../../app/api/marketing/privacy/route');

    const updateReq = new Request('http://localhost:3000/api/marketing/privacy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'api_privacy_user',
        action: 'UPDATE_CONSENT',
        allowPersonalisation: true,
        allowNotifications: true
      })
    });
    const updateRes = await postPrivacy(updateReq);
    expect(updateRes.status).toBe(200);
    const updateData = await updateRes.json();
    expect(updateData.success).toBe(true);
    expect(updateData.profile.allowPersonalisation).toBe(true);
  });

  it('GET & POST /api/marketing/attribution should log and calculate funnel metrics', async () => {
    const { GET: getAttr, POST: postAttr } = await import('../../app/api/marketing/attribution/route');

    const postReq = new Request('http://localhost:3000/api/marketing/attribution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'test_session_api',
        campaignSlug: 'ingredient-finder',
        stage: 'APP_INSTALL',
        utmSource: 'vitest_test'
      })
    });
    const postRes = await postAttr(postReq);
    expect(postRes.status).toBe(200);

    const getReq = new Request('http://localhost:3000/api/marketing/attribution?campaign=ingredient-finder');
    const getRes = await getAttr(getReq);
    expect(getRes.status).toBe(200);
    const getData = await getRes.json();
    expect(getData.metrics.appInstalls).toBeGreaterThanOrEqual(1);
  });

  it('GET & POST /api/marketing/errors should record publishing errors and return audit log', async () => {
    const { GET: getErrors, POST: postErrors } = await import('../../app/api/marketing/errors/route');

    const postReq = new Request('http://localhost:3000/api/marketing/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: 'post_err_test',
        platform: 'Pinterest',
        errorType: 'NETWORK_TIMEOUT',
        errorMessage: 'Connection timed out',
        attemptNumber: 1
      })
    });
    const postRes = await postErrors(postReq);
    expect(postRes.status).toBe(200);

    const getReq = new Request('http://localhost:3000/api/marketing/errors');
    const getRes = await getErrors(getReq);
    expect(getRes.status).toBe(200);
    const getData = await getRes.json();
    expect(getData.logs.length).toBeGreaterThan(0);
  });
});
