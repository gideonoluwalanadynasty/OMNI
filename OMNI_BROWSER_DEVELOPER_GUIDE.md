# OMNI Browser: Developer Integration Guide

## 1. Developer Overview
OMNI Browser exposes an extensible, high-performance runtime for creating sovereign applets, AI plugins, custom protocol handlers, and enterprise intranet portals.

---

## 2. Registering Native Sovereign Applets
Developers can register sovereign applets by providing a manifest and routing declaration:

```typescript
import { OmniBrowserAppletManifest } from '@omni/browser-sdk';

export const MyCustomApplet: OmniBrowserAppletManifest = {
  id: 'applet-quantum-calc',
  name: 'Quantum Circuit Visualizer',
  version: '1.0.0',
  protocol: 'omni://q-calc',
  category: 'productivity',
  permissions: ['storage:opfs', 'hardware:webgpu'],
  securityClearance: 'unclassified',
  component: QuantumCalcComponent
};
```

---

## 3. OMNI AI Multimodal Tool Calling API
To register custom client-side tools with the OMNI AI Copilot:

```typescript
import { registerOmniAiTool } from '@/lib/ai/tools';

registerOmniAiTool({
  name: 'queryEnterpriseDatabase',
  description: 'Executes secure read-only queries against corporate data lake',
  parameters: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'SQL or Vector query string' }
    },
    required: ['query']
  },
  handler: async ({ query }, context) => {
    // Zero-trust token check
    return await context.secureFetch(`/api/enterprise/query?q=${encodeURIComponent(query)}`);
  }
});
```

---

## 4. WebAssembly (WASM) & OPFS High-Throughput Storage
For heavy data-intensive applications (CAD, local LLMs, cryptographic solvers):
* Use `navigator.storage.getDirectory()` for Origin Private File System (OPFS) access.
* Achieve over 48,000 IOPS and 600 MB/s synchronous disk I/O in worker threads.
