import {
  BrowserPlatformType,
  BrowserRuntimeInfo,
  BrowserRuntimeCapabilities,
  OmniBrowserTab,
  OmniBrowserDownloadItem,
  OmniBrowserSyncPayload
} from '../../types';

export interface CookieEntry {
  domain: string;
  name: string;
  value: string;
  path: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
  expires?: string;
  containerId?: string;
}

export interface NavigationResult {
  url: string;
  status: number;
  title: string;
  loadTimeMs: number;
  sslSecure: boolean;
  certIssuer: string;
  trackersBlocked: number;
  adsScrubbed: number;
}

export interface NativeWindowSpec {
  windowId: string;
  title: string;
  bounds: { x: number; y: number; width: number; height: number };
  isMaximized: boolean;
  isMinimized: boolean;
  isFocused: boolean;
}

export interface ExtensionManifestRule {
  id: number;
  priority: number;
  action: { type: 'block' | 'redirect' | 'upgradeScheme' | 'modifyHeaders'; redirectUrl?: string };
  condition: { urlFilter?: string; domains?: string[]; resourceTypes: string[] };
}

/**
 * Core Universal Technology Abstraction Layer Interface
 * All target environments (Desktop, Mobile, PWA, Extension, Web) implement this contract.
 */
export interface BrowserRuntimeAdapter {
  platform: BrowserPlatformType;
  name: string;
  version: string;
  capabilities: BrowserRuntimeCapabilities;

  // Lifecycle & Diagnostics
  initialize(): Promise<boolean>;
  getRuntimeInfo(): Promise<BrowserRuntimeInfo>;
  getMemoryUsageMb(): Promise<number>;
  checkEngineHealth(): Promise<{ status: 'healthy' | 'degraded'; latencyMs: number; details: string }>;

  // Navigation & Tabs
  createTab(url: string, active?: boolean, containerId?: string): Promise<OmniBrowserTab>;
  navigateTab(tabId: string, url: string): Promise<NavigationResult>;
  closeTab(tabId: string): Promise<boolean>;
  duplicateTab(tabId: string): Promise<OmniBrowserTab>;
  pinTab(tabId: string, isPinned: boolean): Promise<boolean>;
  reloadTab(tabId: string, bypassCache?: boolean): Promise<boolean>;

  // Storage & Session Sandbox
  getStorageItem<T>(key: string, namespace?: string): Promise<T | null>;
  setStorageItem<T>(key: string, value: T, namespace?: string): Promise<boolean>;
  removeStorageItem(key: string, namespace?: string): Promise<boolean>;
  clearIsolatedStorage(containerId: string): Promise<boolean>;
  getIsolatedCookies(containerId: string): Promise<CookieEntry[]>;
  setCookiePolicy(containerId: string, policy: 'strict' | 'isolate' | 'block_third_party'): Promise<boolean>;

  // Notifications & Badging
  sendSystemNotification(title: string, options?: { body?: string; icon?: string; tag?: string }): Promise<boolean>;
  setBadgeCount(count: number): Promise<boolean>;
  requestNotificationPermission(): Promise<NotificationPermission>;

  // Privacy, DNS & WireGuard VPN Tunnel
  configureDnsOverHttps(serverUrl: string): Promise<boolean>;
  toggleVpnTunnel(nodeId: string, enable: boolean): Promise<{ connected: boolean; assignedIp: string; latencyMs: number }>;
  evaluateContentBlocking(url: string, context: { domain: string; resourceType: string }): Promise<{ blocked: boolean; ruleTriggered?: string }>;

  // Encrypted Cross-Device Sync
  pushEncryptedSyncBlob(payload: OmniBrowserSyncPayload): Promise<boolean>;
  pullEncryptedSyncBlobs(sinceVectorClock?: number): Promise<OmniBrowserSyncPayload[]>;

  // Biometrics & Hardware Enclave
  authenticateWithBiometrics(reason: string): Promise<{ success: boolean; token?: string; error?: string }>;
  registerPasskey(credentialName: string): Promise<{ keyId: string; publicKeyPem: string }>;

  // Filesystem & Download Management
  initiateDownload(url: string, filename?: string): Promise<OmniBrowserDownloadItem>;
  scanFileIntegritySha256(fileBlobOrBuffer: ArrayBuffer | string): Promise<{ sha256: string; isThreat: boolean; threatName?: string }>;
  saveToOmniCloudVault(downloadId: string, destinationVaultPath: string): Promise<{ fileId: string; synced: boolean }>;
}

/**
 * Desktop Browser Adapter (Tauri / Electron / C++ Embedding)
 */
export interface DesktopBrowserAdapter extends BrowserRuntimeAdapter {
  platform: 'desktop';
  createWindow(options?: { width?: number; height?: number; title?: string }): Promise<NativeWindowSpec>;
  closeWindow(windowId: string): Promise<boolean>;
  setMenuBar(menuItems: Array<{ label: string; actionId: string; accelerator?: string }>): Promise<boolean>;
  toggleDevTools(tabId: string): Promise<boolean>;
  readLocalFileSandbox(virtualPath: string): Promise<Uint8Array | null>;
  writeLocalFileSandbox(virtualPath: string, data: Uint8Array): Promise<boolean>;
}

/**
 * Mobile Browser Adapter (Android / iOS native webview runtime)
 */
export interface MobileBrowserAdapter extends BrowserRuntimeAdapter {
  platform: 'android' | 'ios';
  triggerHapticFeedback(style: 'light' | 'medium' | 'heavy' | 'selection'): Promise<void>;
  openNativeShareSheet(data: { title: string; text?: string; url: string }): Promise<boolean>;
  registerDeepLinkHandler(scheme: string, callbackUrl: string): Promise<boolean>;
  setBatterySaveMode(enabled: boolean): Promise<boolean>;
  getBiometricHardwareType(): Promise<'face_id' | 'touch_id' | 'android_fingerprint' | 'none'>;
}

/**
 * Browser Extension Adapter (WebExtensions Manifest v3)
 */
export interface ExtensionAdapter extends BrowserRuntimeAdapter {
  platform: 'extension';
  registerDeclarativeNetRequestRules(rules: ExtensionManifestRule[]): Promise<boolean>;
  injectContentScript(tabId: string, scriptContent: string): Promise<{ result: any }>;
  sendMessageToContentScript(tabId: string, message: any): Promise<any>;
  openExtensionOptionsPage(): Promise<boolean>;
}

/**
 * Progressive Web App Adapter (ServiceWorker / Cache API)
 */
export interface PwaAdapter extends BrowserRuntimeAdapter {
  platform: 'pwa';
  checkPwaInstallable(): Promise<{ isInstallable: boolean; installPromptAvailable: boolean }>;
  promptInstallPwa(): Promise<'accepted' | 'dismissed'>;
  registerPeriodicSync(tag: string, minIntervalSeconds: number): Promise<boolean>;
  cacheOfflineAsset(url: string): Promise<boolean>;
}

/**
 * Sovereign Web Browser Adapter (Web sandbox / Wasm enclave)
 */
export interface WebBrowserAdapter extends BrowserRuntimeAdapter {
  platform: 'web';
  runWasmSandboxProcess(wasmBinary: ArrayBuffer, args: string[]): Promise<{ exitCode: number; output: string }>;
}
