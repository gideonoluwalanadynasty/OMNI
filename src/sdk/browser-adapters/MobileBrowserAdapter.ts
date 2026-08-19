import { BaseBrowserAdapter } from './BaseBrowserAdapter';
import { MobileBrowserAdapter } from './types';
import { BrowserRuntimeCapabilities } from '../../types';

export class OmniMobileBrowserAdapter extends BaseBrowserAdapter implements MobileBrowserAdapter {
  platform: 'android' | 'ios';
  name: string;
  version = '2.4.0-mobile-sovereign';

  capabilities: BrowserRuntimeCapabilities;

  constructor(targetPlatform: 'android' | 'ios' = 'ios') {
    super();
    this.platform = targetPlatform;
    this.name = targetPlatform === 'ios' ? 'OMNI Mobile WKWebView Bridge' : 'OMNI Mobile Android Chromium-Embed';
    this.capabilities = {
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
  }

  async triggerHapticFeedback(style: 'light' | 'medium' | 'heavy' | 'selection'): Promise<void> {
    if ('vibrate' in navigator) {
      const duration = style === 'heavy' ? 40 : style === 'medium' ? 25 : 10;
      try {
        navigator.vibrate(duration);
      } catch {
        // Ignored on unsupported devices
      }
    }
  }

  async openNativeShareSheet(data: { title: string; text?: string; url: string }): Promise<boolean> {
    if ('share' in navigator) {
      try {
        await navigator.share(data);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }

  async registerDeepLinkHandler(scheme: string, callbackUrl: string): Promise<boolean> {
    return true;
  }

  async setBatterySaveMode(enabled: boolean): Promise<boolean> {
    return true;
  }

  async getBiometricHardwareType(): Promise<'face_id' | 'touch_id' | 'android_fingerprint' | 'none'> {
    return this.platform === 'ios' ? 'face_id' : 'android_fingerprint';
  }
}
