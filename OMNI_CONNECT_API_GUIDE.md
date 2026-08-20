# OMNI CONNECT REST & WEBSOCKET API SPECIFICATION

## 1. REST API Endpoints

### Identity & Authentication
- `POST /api/v1/auth/did-challenge` : Request cryptographic challenge nonce
- `POST /api/v1/auth/did-login` : Submit signed challenge to receive session JWT
- `GET /api/v1/users/me` : Retrieve caller profile & verification credentials

### Feed & Moments
- `GET /api/v1/feed` : Fetch personalized algorithmic feed with cursor pagination
- `POST /api/v1/posts` : Create new feed post or moment video

### Sovereign Messaging
- `GET /api/v1/conversations` : List active conversations
- `POST /api/v1/messages/relay` : Relay encrypted Double-Ratchet envelope

### Escrow & Marketplace
- `POST /api/v1/commerce/checkout` : Initiate atomic smart contract escrow payment
- `POST /api/v1/commerce/orders/{id}/release` : Release escrow funds upon fulfillment

---

## 2. WebSocket Gateway Protocol
- **Endpoint:** `wss://gateway.connect.omni.network/v1/stream`
- **Authentication:** `Authorization: Bearer <JWT>` header on handshake
- **Events:**
  - `subscribe:room`
  - `message:received`
  - `presence:update`
  - `call:signal`
