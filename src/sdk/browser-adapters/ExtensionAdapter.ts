import { BaseBrowserAdapter } from './BaseBrowserAdapter';
import { ExtensionAdapter, ExtensionManifestRule } from './types';
import { BrowserRuntimeCapabilities } from '../../types';

export class OmniExtensionAdapter extends BaseBrowserAdapter implements ExtensionAdapter {
  platform: 'extension' = 'extension';
  name = 'OMNI WebExtensions Manifest v3 Bridge';
  version = '2.4.0-mv3-sovereign';

  capabilities: BrowserRuntimeCapabilities = {
    supportsMultipleWindows: false,
    supportsNativeTabs: true,
    supportsFilesystemDirectAccess: false,
    supportsNativeVpnRouting: false,
    supportsBackgroundSync: false,
    supportsNotifications: true,
    supportsBiometrics: false,
    supportsHardwareAcceleration: true,
    supportsWasmSandbox: true,
    supportsDeclarativeNetRequest: true,
    supportsServiceWorker: true
  };

  private registeredRules: ExtensionManifestRule[] = [];

  async registerDeclarativeNetRequestRules(rules: ExtensionManifestRule[]): Promise<boolean> {
    this.registeredRules = rules;
    return true;
  }

  async injectContentScript(tabId: string, scriptContent: string): Promise<{ result: any }> {
    return { result: { executed: true, tabId, scriptBytes: scriptContent.length } };
  }

  async sendMessageToContentScript(tabId: string, message: any): Promise<any> {
    return { response: 'ACK_OMNI_MV3_BRIDGE', payload: message };
  }

  async openExtensionOptionsPage(): Promise<boolean> {
    return true;
  }
}
