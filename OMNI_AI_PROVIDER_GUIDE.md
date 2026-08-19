# OMNI AI Provider & Model Integration Guide
**Document Reference:** `OMNI-PROVIDER-GUIDE-2026-V1`  
**Classification:** Technical & Operational Specification  
**Target Audience:** Infrastructure Engineers, AI Platform Architects, Enterprise Integrators  

---

## 1. Overview & Provider Agnostic Architecture

The **OMNI AI Orchestration Engine** is designed from the ground up to be completely provider-agnostic. Organizations are never locked into a single commercial foundation model. 

OMNI supports three distinct provider integration tiers:
1. **Managed Foundation Endpoints:** Out-of-the-box native routing to Google Gemini, Anthropic Claude, OpenAI, and DeepSeek.
2. **BYOK (Bring Your Own Key):** Enterprises attach their existing commercial API agreements, bypassing platform token markups.
3. **BYOM (Bring Your Own Model / Private Endpoints):** Connection to private enterprise GPU clusters, Ollama, vLLM, Azure AI Foundry, or AWS Bedrock endpoints.

---

## 2. Supported Foundation Model Providers

| Provider | Supported Model Families | Supported Modalities | Key Strengths |
| :--- | :--- | :--- | :--- |
| **Google Cloud / Gemini** | Gemini 1.5 Pro, Gemini 1.5 Flash, Gemini 2.0 Flash | Text, Multimodal, Audio, Video, 2M Context | Ultra-large context window, search grounding, native multimodal processing |
| **Anthropic** | Claude 3.5 Sonnet, Claude 3.5 Haiku, Claude 3 Opus | Text, Code, Vision | Complex reasoning, high-precision coding, artifact generation |
| **OpenAI** | GPT-4o, GPT-4o-mini, o1-preview, o3-mini | Text, Vision, Audio, Reasoning | Fast instruction-following, structured JSON outputs, function calling |
| **DeepSeek** | DeepSeek V3, DeepSeek R1 | Text, Code, Deep Mathematical Reasoning | Open-weights reasoning efficiency, cost-effective inference |
| **Groq** | Llama 3.3 70B, Mixtral 8x7B | Text, Code | Sub-second TTFT (Time-to-First-Token), ultra-high throughput |
| **Local / Private GPU** | Ollama, vLLM, HuggingFace TGI | Text, Code, Embeddings | 100% On-Premise Air-Gapped execution, zero external network egress |
| **Specialist Audio/Speech** | OpenAI Whisper, ElevenLabs | Audio Transcription, Neural Voice Synthesis | Real-time multilingual voice transcription & neural TTS |

---

## 3. Configuring BYOK (Bring Your Own Key)

To attach private API keys to your OMNI organization:

1. Navigate to **AI Admin Center $\rightarrow$ BYOK Key Vault** (or **Home $\rightarrow$ Providers**).
2. Select your target provider (e.g., Anthropic).
3. Input your secret API key (`sk-ant-...`).
4. Click **Validate & Register Key**.
5. OMNI executes a live cryptographic handshake:
   - Verifies key validity and active account status.
   - Discovers available model endpoints and rate limits.
   - Measures initial ping latency.
   - Encrypts the key at rest using tenant-specific AES-256 GCM key rings.
6. Once registered, queries made by your organization automatically route through your private account without platform token deduction.

---

## 4. Configuring Private BYOM Endpoints (Ollama / vLLM / Bedrock)

Enterprises operating self-hosted GPU instances can register private endpoints:

### 4.1 Registering an Ollama Endpoint
```json
{
  "endpointId": "byom_ollama_prod_01",
  "name": "Corporate Sovereign GPU Cluster 1",
  "provider": "ollama",
  "baseUrl": "https://gpu-node-01.internal.enterprise.com/v1",
  "authHeader": "Bearer <INTERNAL_MTLS_TOKEN>",
  "supportedModels": [
    "llama3.3:70b-instruct-q8_0",
    "deepseek-r1:32b",
    "qwen2.5-coder:32b"
  ],
  "maxContextLength": 65536,
  "isAirGapped": true,
  "healthCheckIntervalSeconds": 30
}
```

---

## 5. Dynamic Failovers & Circuit Breakers

OMNI AI includes automated health monitoring and failover cascades:

```
[Incoming Request]
        |
        v
[Primary Provider: Claude 3.5 Sonnet] --(503/429/Timeout > 5s)--> [Failover 1: Gemini 1.5 Pro]
                                                                        |
                                                                   (Degraded)
                                                                        |
                                                                        v
                                                          [Failover 2: GPT-4o]
```

### Circuit Breaker States:
* **CLOSED (Healthy):** All traffic routes normally.
* **OPEN (Tripped):** 3 consecutive request timeouts or 5xx errors trip the breaker. All traffic immediately bypasses the degraded provider for a 60-second cooldown period.
* **HALF-OPEN (Testing):** Canaries 5% of traffic to verify if provider health has recovered before restoring full traffic allocation.
