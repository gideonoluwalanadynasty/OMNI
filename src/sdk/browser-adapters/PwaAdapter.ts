import { BaseBrowserAdapter } from './BaseBrowserAdapter';
import { PwaAdapter } from './types';
import { BrowserRuntimeCapabilities } from '../../types';

export class OmniPwaAdapter extends BaseBrowserAdapter implements PwaAdapter {
  platform: 'pwa' = 'pwa';
  name = 'OMNI Progressive Web App Runtime';
  version = '2.4.0-pwa-sovereign';

  capabilities: BrowserRuntimeCapabilities = {
    supportsMultipleWindows: false,
    supportsNativeTabs: true,
    supportsFilesystemDirectAccess: false,
    supportsNativeVpnRouting: true,
    supportsBackgroundSync: true,
    supportsNotifications: true,
    supportsBiometrics: true,
    supportsHardwareAcceleration: true,
    supportsWasmSandbox: true,
    supportsDeclarativeNetRequest: false,
    supportsServiceWorker: true
  };

  async checkPwaInstallable(): Promise<{ isInstallable: boolean; installPromptAvailable: boolean }> {
    return {
      isInstallable: true,
      installPromptAvailable: true
    };
  }

  async promptInstallPwa(): Promise<'accepted' | 'dismissed'> {
    return 'accepted';
  }

  async registerPeriodicSync(tag: string, minIntervalSeconds: number): Promise<boolean> {
    return true;
  }

  async cacheOfflineAsset(url: string): Promise<boolean> {
    if ('caches' in window) {
      try {
        const cache = await caches.open('omni_offline_v1');
        await cache.add(url);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }
}
