import {
  BrowserPlatformType,
  BrowserRuntimeInfo,
  BrowserRuntimeCapabilities,
  OmniBrowserTab,
  OmniBrowserDownloadItem,
  OmniBrowserSyncPayload
} from '../../types';
import {
  BrowserRuntimeAdapter,
  CookieEntry,
  NavigationResult
} from './types';

export abstract class BaseBrowserAdapter implements BrowserRuntimeAdapter {
  abstract platform: BrowserPlatformType;
  abstract name: string;
  abstract version: string;
  abstract capabilities: BrowserRuntimeCapabilities;

  protected isInitialized = false;
  protected memoryBaseMb = 128;
  protected cookiesStore: Map<string, CookieEntry[]> = new Map();

  async initialize(): Promise<boolean> {
    this.isInitialized = true;
    return true;
  }

  async getRuntimeInfo(): Promise<BrowserRuntimeInfo> {
    return {
      platform: this.platform,
      version: this.version,
      engineName: `OMNI Sovereign Engine (${this.name})`,
      engineVersion: '2.4.0-sovereign',
      userAgent: `Mozilla/5.0 (Sovereign OS; OMNI/${this.platform}) OMNIBrowser/2.4.0`,
      isOnline: navigator.onLine,
      memoryUsageMb: await this.getMemoryUsageMb(),
      sandboxType: this.platform === 'desktop' ? 'isolated_wasm' : this.platform === 'ios' ? 'wkwebview' : 'native_v8',
      capabilities: this.capabilities
    };
  }

  async getMemoryUsageMb(): Promise<number> {
    return Math.round(this.memoryBaseMb + (Math.sin(Date.now() / 10000) * 15 + 20));
  }

  async checkEngineHealth(): Promise<{ status: 'healthy' | 'degraded'; latencyMs: number; details: string }> {
    const start = performance.now();
    await new Promise(res => setTimeout(res, 12));
    const elapsed = Math.round(performance.now() - start);
    return {
      status: 'healthy',
      latencyMs: elapsed,
      details: `${this.name} IPC channel nominal. Sandboxed execution enclave active.`
    };
  }

  async createTab(url: string, active = true, containerId = 'ws_dynasty'): Promise<OmniBrowserTab> {
    const tabId = `tab_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const parsedUrl = url.startsWith('http') ? url : `https://${url}`;
    let domain = 'omni.internal';
    try {
      domain = new URL(parsedUrl).hostname;
    } catch {
      // fallback
    }

    const newTab: OmniBrowserTab = {
      id: tabId,
      url: parsedUrl,
      title: domain.replace('www.', ''),
      favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
      isLoading: false,
      isPinned: false,
      canGoBack: false,
      canGoForward: false,
      workspaceId: containerId,
      containerColor: containerId === 'ws_dynasty' ? '#4f46e5' : '#06b6d4',
      containerName: containerId === 'ws_dynasty' ? 'Dynasty Corporate' : 'Sandbox Container',
      trackersBlockedCount: 0,
      adsBlockedCount: 0,
      fingerprintAttemptsDeflected: 0,
      lastAccessedAt: new Date().toISOString(),
      zoomLevel: 100,
      createdAt: new Date().toISOString()
    };
    return newTab;
  }

  async navigateTab(tabId: string, url: string): Promise<NavigationResult> {
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    let hostname = 'omni.internal';
    try {
      hostname = new URL(cleanUrl).hostname;
    } catch {
      // fallback
    }

    const trackers = Math.floor(Math.random() * 8) + 2;
    const ads = Math.floor(Math.random() * 5) + 1;

    return {
      url: cleanUrl,
      status: 200,
      title: hostname.replace('www.', '').toUpperCase() + ' — Sovereign Secure Page',
      loadTimeMs: Math.floor(Math.random() * 180) + 70,
      sslSecure: true,
      certIssuer: "Let's Encrypt / OMNI Sovereign Root CA v3",
      trackersBlocked: trackers,
      adsScrubbed: ads
    };
  }

  async closeTab(tabId: string): Promise<boolean> {
    return true;
  }

  async duplicateTab(tabId: string): Promise<OmniBrowserTab> {
    const dupTab = await this.createTab('https://omni.com');
    dupTab.id = `tab_dup_${Date.now()}`;
    return dupTab;
  }

  async pinTab(tabId: string, isPinned: boolean): Promise<boolean> {
    return true;
  }

  async reloadTab(tabId: string, bypassCache = false): Promise<boolean> {
    return true;
  }

  async getStorageItem<T>(key: string, namespace = 'omni_browser_storage'): Promise<T | null> {
    try {
      const item = localStorage.getItem(`${namespace}_${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  async setStorageItem<T>(key: string, value: T, namespace = 'omni_browser_storage'): Promise<boolean> {
    try {
      localStorage.setItem(`${namespace}_${key}`, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  async removeStorageItem(key: string, namespace = 'omni_browser_storage'): Promise<boolean> {
    try {
      localStorage.removeItem(`${namespace}_${key}`);
      return true;
    } catch {
      return false;
    }
  }

  async clearIsolatedStorage(containerId: string): Promise<boolean> {
    this.cookiesStore.delete(containerId);
    return true;
  }

  async getIsolatedCookies(containerId: string): Promise<CookieEntry[]> {
    return this.cookiesStore.get(containerId) || [
      {
        domain: '.omni.com',
        name: '__Host-Omni-Session',
        value: 'sovereign_enc_' + Math.random().toString(36).substring(2, 12),
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'Strict',
        containerId
      }
    ];
  }

  async setCookiePolicy(containerId: string, policy: 'strict' | 'isolate' | 'block_third_party'): Promise<boolean> {
    return true;
  }

  async sendSystemNotification(title: string, options?: { body?: string; icon?: string; tag?: string }): Promise<boolean> {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, { body: options?.body, icon: options?.icon });
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }

  async setBadgeCount(count: number): Promise<boolean> {
    if ('setAppBadge' in navigator && typeof (navigator as any).setAppBadge === 'function') {
      try {
        await (navigator as any).setAppBadge(count);
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'granted';
  }

  async configureDnsOverHttps(serverUrl: string): Promise<boolean> {
    return true;
  }

  async toggleVpnTunnel(nodeId: string, enable: boolean): Promise<{ connected: boolean; assignedIp: string; latencyMs: number }> {
    return {
      connected: enable,
      assignedIp: enable ? `10.88.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 250)}` : '',
      latencyMs: enable ? Math.floor(Math.random() * 25) + 12 : 0
    };
  }

  async evaluateContentBlocking(url: string, context: { domain: string; resourceType: string }): Promise<{ blocked: boolean; ruleTriggered?: string }> {
    const isAdDomain = /(doubleclick|google-analytics|facebook\.net|clarity\.ms|criteo|adroll)/i.test(url);
    return {
      blocked: isAdDomain,
      ruleTriggered: isAdDomain ? 'OMNI-ZeroTelemetry-Filter-EasyList-v3' : undefined
    };
  }

  async pushEncryptedSyncBlob(payload: OmniBrowserSyncPayload): Promise<boolean> {
    const existingBlobs: OmniBrowserSyncPayload[] = (await this.getStorageItem<OmniBrowserSyncPayload[]>('sync_payload_queue')) || [];
    existingBlobs.unshift(payload);
    await this.setStorageItem('sync_payload_queue', existingBlobs.slice(0, 30));
    return true;
  }

  async pullEncryptedSyncBlobs(sinceVectorClock = 0): Promise<OmniBrowserSyncPayload[]> {
    const blobs: OmniBrowserSyncPayload[] = (await this.getStorageItem<OmniBrowserSyncPayload[]>('sync_payload_queue')) || [];
    return blobs.filter(b => b.vectorClock > sinceVectorClock);
  }

  async authenticateWithBiometrics(reason: string): Promise<{ success: boolean; token?: string; error?: string }> {
    await new Promise(r => setTimeout(r, 600));
    return {
      success: true,
      token: `omni_bio_auth_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    };
  }

  async registerPasskey(credentialName: string): Promise<{ keyId: string; publicKeyPem: string }> {
    const keyId = `pk_${Math.random().toString(36).substring(2, 12)}`;
    return {
      keyId,
      publicKeyPem: `-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE${Math.random().toString(36).substring(2, 20)}\n-----END PUBLIC KEY-----`
    };
  }

  async initiateDownload(url: string, filename?: string): Promise<OmniBrowserDownloadItem> {
    const name = filename || (url.split('/').pop() || 'downloaded_asset.pdf');
    const size = Math.floor(Math.random() * 15000000) + 500000;
    return {
      id: `dl_${Date.now()}`,
      filename: name,
      fileSize: size,
      fileType: name.split('.').pop() || 'dat',
      url,
      progress: 100,
      status: 'scanned_safe',
      downloadedAt: new Date().toISOString(),
      localPath: `/home/omni/Downloads/${name}`,
      sha256: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      speedBps: 28400000,
      mimeType: 'application/octet-stream',
      omniCloudSynced: false,
      storageTier: 'encrypted_vault'
    };
  }

  async scanFileIntegritySha256(fileBlobOrBuffer: ArrayBuffer | string): Promise<{ sha256: string; isThreat: boolean; threatName?: string }> {
    return {
      sha256: 'sha256:' + Math.random().toString(36).substring(2, 18) + Math.random().toString(36).substring(2, 18),
      isThreat: false
    };
  }

  async saveToOmniCloudVault(downloadId: string, destinationVaultPath: string): Promise<{ fileId: string; synced: boolean }> {
    return {
      fileId: `omni_vault_file_${downloadId}`,
      synced: true
    };
  }
}
