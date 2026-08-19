# OMNI Browser: Extension Ecosystem & Packaging Guide

## 1. Extension Manifest Specification
OMNI Browser supports the **Manifest V3 Sovereign Extension Standard**. All extensions run in memory-isolated sandboxes with zero unapproved background network or DOM access.

```json
{
  "manifest_version": 3,
  "name": "OMNI Sovereign AdBlocker & Tracker Shield",
  "version": "2.4.0",
  "description": "Post-quantum heuristic ad-blocking with zero-logging telemetry.",
  "permissions": [
    "declarativeNetRequest",
    "storage"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "signature": "ML-DSA-87: 9f8a3c4b..."
}
```

---

## 2. Five-Stage Security Review Pipeline
Every extension published to `store.browser.omni.com` undergoes automated and human-in-the-loop verification:
1. **Static Analysis**: AST parsing detects obfuscated `eval()`, dynamic code loading, and unapproved API keys.
2. **Permission Boundary Audit**: Enforces principle of least privilege; restricts broad wildcard permissions.
3. **PQC Cryptographic Signing**: Extensions are signed with the developer's OMNI Passport DID key using Dilithium (ML-DSA).
4. **Sandboxed Dynamic Execution**: Extension runs in a headless environment subjected to 500+ simulated attack vectors.
5. **Continuous Telemetry Integrity**: Real-time memory profiling ensures CPU usage remains under 18 MB / extension.

---

## 3. Extension Monetization & Invoicing
Developers can set one-time purchase fees or recurring seat licenses. Revenue settlements occur automatically via OMNI Pay's double-entry escrow ledger with an industry-leading 85/15 developer revenue split.
