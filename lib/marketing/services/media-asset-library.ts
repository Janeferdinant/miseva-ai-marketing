/**
 * MISEVA AI — MEDIA ASSET LIBRARY & PROVENANCE REGISTRY
 * Manages original 4K/HD culinary photos, SVG logos, audio stems, and verified provenance records.
 */

export type AssetType = 'IMAGE' | 'VIDEO' | 'LOGO' | 'AUDIO' | 'CAROUSEL_SLIDE';

export interface MediaAsset {
  id: string;
  title: string;
  type: AssetType;
  path: string;
  aspectRatio: '9:16' | '16:9' | '4:5' | '1:1' | '2:3' | 'vector';
  license: string;
  sourceCredit?: string;
  dishId?: string;
  tags?: string[];
  registeredAtIso: string;
}

export class MediaAssetLibrary {
  private assets: Map<string, MediaAsset> = new Map();

  constructor() {
    this.seedDefaultAssets();
  }

  private seedDefaultAssets(): void {
    const defaultAssets: MediaAsset[] = [
      {
        id: 'asset-brand-logo-main',
        title: 'Miseva AI Primary Vector Logo',
        type: 'LOGO',
        path: '/brand/logo.svg',
        aspectRatio: 'vector',
        license: 'Miseva Proprietary Registered Trademark',
        tags: ['logo', 'vector', 'emerald', 'saffron'],
        registeredAtIso: new Date().toISOString()
      },
      {
        id: 'asset-brand-logo-horizontal',
        title: 'Miseva AI Horizontal Lockup',
        type: 'LOGO',
        path: '/brand/logo-horizontal.svg',
        aspectRatio: 'vector',
        license: 'Miseva Proprietary Registered Trademark',
        tags: ['logo', 'horizontal', 'header'],
        registeredAtIso: new Date().toISOString()
      },
      {
        id: 'asset-brand-logo-mark',
        title: 'Miseva Flame-Leaf Brandmark',
        type: 'LOGO',
        path: '/brand/logo-mark.svg',
        aspectRatio: 'vector',
        license: 'Miseva Proprietary Registered Trademark',
        tags: ['logo', 'mark', 'icon'],
        registeredAtIso: new Date().toISOString()
      },
      {
        id: 'asset-hero-culinary',
        title: 'Artisanal Culinary Sizzle & Fresh Ingredients (4K)',
        type: 'IMAGE',
        path: '/brand/images/hero-culinary.jpg',
        aspectRatio: '16:9',
        license: 'Miseva Original Proprietary Asset',
        dishId: 'kerala-meen-curry',
        tags: ['culinary', 'hero', 'kerala', 'cooking'],
        registeredAtIso: new Date().toISOString()
      },
      {
        id: 'asset-tablescaping-sadya',
        title: 'Kerala Sadya 12-Dish Banana Leaf Feast (High-Res)',
        type: 'IMAGE',
        path: '/brand/images/tablescaping-sadya.jpg',
        aspectRatio: '16:9',
        license: 'Miseva Original Proprietary Asset',
        dishId: 'kerala-sadya-feast',
        tags: ['sadya', 'banana leaf', 'table styling', 'onam'],
        registeredAtIso: new Date().toISOString()
      },
      {
        id: 'asset-app-experience',
        title: 'Miseva AI Dual-Platform Smartphone Experience',
        type: 'IMAGE',
        path: '/brand/images/app-experience.jpg',
        aspectRatio: '16:9',
        license: 'Miseva Original Proprietary Asset',
        tags: ['app', 'android', 'liquid-glass', 'tech'],
        registeredAtIso: new Date().toISOString()
      },
      {
        id: 'asset-audio-asmr-tadka',
        title: 'Mustard Seed & Curry Leaf Sizzle (High-Fidelity ASMR)',
        type: 'AUDIO',
        path: '/brand/audio/asmr-tadka.mp3',
        aspectRatio: '1:1',
        license: 'Miseva Original Audio Studio Recording',
        tags: ['audio', 'asmr', 'sizzle', 'cooking sounds'],
        registeredAtIso: new Date().toISOString()
      }
    ];

    defaultAssets.forEach(a => this.assets.set(a.id, a));
  }

  public getAllAssets(): MediaAsset[] {
    return Array.from(this.assets.values());
  }

  public getAssetById(id: string): MediaAsset | undefined {
    return this.assets.get(id);
  }

  public getAssetsByType(type: AssetType): MediaAsset[] {
    return this.getAllAssets().filter(a => a.type === type);
  }

  public getAssetsByDish(dishId: string): MediaAsset[] {
    return this.getAllAssets().filter(a => a.dishId === dishId);
  }

  public registerAsset(params: Omit<MediaAsset, 'registeredAtIso'>): MediaAsset {
    const asset: MediaAsset = {
      ...params,
      registeredAtIso: new Date().toISOString()
    };
    this.assets.set(asset.id, asset);
    return asset;
  }
}

export const mediaAssetLibrary = new MediaAssetLibrary();
