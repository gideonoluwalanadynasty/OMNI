# OMNI CONNECT DEVELOPER & API INTEGRATION GUIDE

## 1. SDK & Client Integration
Integrate OMNI Connect using the TypeScript SDK or REST/WebSocket API endpoints.

```typescript
import { OmniConnectClient } from '@omni/connect-sdk';

const client = new OmniConnectClient({
  apiKey: process.env.OMNI_CONNECT_API_KEY,
  tenantId: 'tenant-geneva-capital',
  endpoint: 'https://connect.omni.network/api/v1',
});

// Authenticate via Decentralized Identity
const session = await client.auth.loginWithDid({
  did: 'did:omni:user_9921',
  signature: '0x384a...',
});

// Send an End-to-End Encrypted Message
const message = await client.messaging.sendEncryptedMessage({
  recipientDid: 'did:omni:user_4412',
  ciphertextEnvelope: 'base64_encrypted_payload...',
});
```

## 2. Webhooks & Real-Time Events
Register webhooks in the Developer Platform to receive real-time updates for:
- `user.identity_verified`
- `order.escrow_settled`
- `space.member_joined`
- `ai.moderation_flagged`

All webhook payloads include the `X-Omni-Signature-256` header calculated using HMAC-SHA256.
