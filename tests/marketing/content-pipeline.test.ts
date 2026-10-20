import { describe, it, expect } from 'vitest';
import { ContentGenerationPipeline } from '../../lib/marketing/services/content-generation-pipeline';
import { MediaAssetLibrary } from '../../lib/marketing/services/media-asset-library';
import { CampaignPhase, ContentPillar, ContentStatus, PlatformType } from '../../lib/marketing/types/marketing-types';

describe('AI Content Production Pipeline & Asset Provenance Library', () => {
  const pipeline = new ContentGenerationPipeline();
  const assetLibrary = new MediaAssetLibrary();

  it('should generate a comprehensive campaign post brief from verified catalog dish', () => {
    const generated = pipeline.generatePostFromTopic({
      topic: 'Crisp Palada Payasam Secrets',
      phase: CampaignPhase.FEATURE,
      pillar: ContentPillar.DESSERTS_STUDIO,
      dishId: 'payasam-palada',
      platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
      includeMalayalam: true
    });

    expect(generated.title).toContain('Palada Payasam');
    expect(generated.englishContent.hook).toBeDefined();
    expect(generated.englishContent.script).toContain('Visual:');
    expect(generated.malayalamContent).toBeDefined();
    expect(generated.malayalamContent?.hook).toContain('പാലട പ്രഥമൻ');
    expect(generated.assetProvenance.verifiedAgainstCatalog).toBe(true);
    expect(generated.assetProvenance.imageLicense).toContain('Miseva Original');
  });

  it('should enforce strict dish-image relevance and reject mismatched food photographs', () => {
    // Valid check: Payasam dish with payasam image or generic culinary kitchen asset
    const validCheck = pipeline.verifyDishImageRelevance('payasam-palada', '/brand/images/hero-culinary.jpg');
    expect(validCheck.isRelevant).toBe(true);

    // Invalid check: Chapati image for a dessert or fish curry
    const invalidCheck = pipeline.verifyDishImageRelevance('payasam-palada', '/images/generic-chapati-bread.jpg');
    expect(invalidCheck.isRelevant).toBe(false);
    expect(invalidCheck.reason).toContain('Mismatched dish category');
  });

  it('should audit brand claims and reject unsupported claims (e.g. fake live prices or unverified features)', () => {
    const unverifiedPost = {
      caption: 'Get instant live stock market prices and 100% free lifetime Michelin meals!'
    };
    const audit = pipeline.verifyBrandClaims(unverifiedPost.caption);
    expect(audit.compliant).toBe(false);
    expect(audit.flaggedTerms.length).toBeGreaterThan(0);

    const compliantPost = {
      caption: 'Compare grocery prices across Blinkit and Zepto using Miseva AI benchmarks.'
    };
    const compliantAudit = pipeline.verifyBrandClaims(compliantPost.caption);
    expect(compliantAudit.compliant).toBe(true);
  });

  it('should manage and register verified assets with provenance in MediaAssetLibrary', () => {
    const assets = assetLibrary.getAllAssets();
    expect(assets.length).toBeGreaterThanOrEqual(5);

    // Verify vector logos exist
    const logos = assetLibrary.getAssetsByType('LOGO');
    expect(logos.length).toBeGreaterThanOrEqual(3);
    expect(logos.some(l => l.path.includes('logo.svg'))).toBe(true);

    // Register a new original asset
    const newAsset = assetLibrary.registerAsset({
      id: 'asset-meen-curry-hd',
      title: 'Kerala Clay Pot Meen Curry 4K',
      type: 'IMAGE',
      path: '/brand/images/kerala-meen-curry-4k.jpg',
      aspectRatio: '9:16',
      license: 'Miseva Proprietary 2026',
      dishId: 'kerala-meen-curry'
    });
    expect(newAsset.id).toBe('asset-meen-curry-hd');
    expect(assetLibrary.getAssetById('asset-meen-curry-hd')).toBeDefined();
  });
});
