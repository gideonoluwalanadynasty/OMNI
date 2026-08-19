import { BrowserPlatformType } from '../../types';
import { BrowserRuntimeAdapter } from './types';
import { OmniDesktopBrowserAdapter } from './DesktopBrowserAdapter';
import { OmniMobileBrowserAdapter } from './MobileBrowserAdapter';
import { OmniExtensionAdapter } from './ExtensionAdapter';
import { OmniPwaAdapter } from './PwaAdapter';
import { OmniWebBrowserAdapter } from './WebBrowserAdapter';

export class BrowserAdapterFactory {
  private static instance: BrowserAdapterFactory;
  private currentAdapter: BrowserRuntimeAdapter;
  private currentPlatform: BrowserPlatformType = 'desktop';

  private adapterMap: Map<BrowserPlatformType, BrowserRuntimeAdapter> = new Map();

  private constructor() {
    this.adapterMap.set('desktop', new OmniDesktopBrowserAdapter());
    this.adapterMap.set('android', new OmniMobileBrowserAdapter('android'));
    this.adapterMap.set('ios', new OmniMobileBrowserAdapter('ios'));
    this.adapterMap.set('extension', new OmniExtensionAdapter());
    this.adapterMap.set('pwa', new OmniPwaAdapter());
    this.adapterMap.set('web', new OmniWebBrowserAdapter());

    // Detect environment
    const detected = this.detectPlatform();
    this.currentPlatform = detected;
    this.currentAdapter = this.adapterMap.get(detected) || this.adapterMap.get('desktop')!;
  }

  public static getInstance(): BrowserAdapterFactory {
    if (!BrowserAdapterFactory.instance) {
      BrowserAdapterFactory.instance = new BrowserAdapterFactory();
    }
    return BrowserAdapterFactory.instance;
  }

  public getAdapter(platform?: BrowserPlatformType): BrowserRuntimeAdapter {
    if (platform && this.adapterMap.has(platform)) {
      return this.adapterMap.get(platform)!;
    }
    return this.currentAdapter;
  }

  public switchPlatform(platform: BrowserPlatformType): BrowserRuntimeAdapter {
    if (this.adapterMap.has(platform)) {
      this.currentPlatform = platform;
      this.currentAdapter = this.adapterMap.get(platform)!;
    }
    return this.currentAdapter;
  }

  public getCurrentPlatform(): BrowserPlatformType {
    return this.currentPlatform;
  }

  public getAllAvailableAdapters(): Array<{ platform: BrowserPlatformType; name: string; version: string; capabilities: any }> {
    const list: Array<{ platform: BrowserPlatformType; name: string; version: string; capabilities: any }> = [];
    this.adapterMap.forEach((adapter, platform) => {
      list.push({
        platform,
        name: adapter.name,
        version: adapter.version,
        capabilities: adapter.capabilities
      });
    });
    return list;
  }

  private detectPlatform(): BrowserPlatformType {
    if (typeof window === 'undefined') return 'desktop';

    // Check if running inside Electron / Tauri
    if ((window as any).__TAURI__ || (window as any).electronAPI || (window as any).process?.versions?.electron) {
      return 'desktop';
    }

    // Check if running as PWA (standalone)
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      return 'pwa';
    }

    // Check user agent for mobile
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/i.test(ua)) {
      return 'ios';
    }
    if (/Android/i.test(ua)) {
      return 'android';
    }

    // Default to Desktop sovereign runtime emulation
    return 'desktop';
  }
}

export const browserAdapterFactory = BrowserAdapterFactory.getInstance();
