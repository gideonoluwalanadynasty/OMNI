# OMNI White-Labeling, Branding & Custom Domain Guide

**Ecosystem Phase:** Production Staging  
**Custom Branding Architecture:** Runtime JSON-Dynamic Design CSS Tokens  

---

## 1. Domain Resolution & Routing Mechanics

OMNI intercepts incoming requests at the API Gateway level to map host headers against tenant domain configurations:

```
[User Browser] (dynasty.omni.io) ──────> [OMNI Gateway] ──────> Resolve ten_dynasty_99
                                                                     │
                                                                     ▼
                                                             Load Dynasty Themes
```

### A. Custom DNS CNAME Configurations
To map an external domain (e.g., `cloud.oluwalana.tech`) to OMNI:
1. Create a **CNAME** DNS record pointing to `ingress.omni.io`.
2. Do **not** proxy traffic via secondary Cloudflare profiles during domain validation (forces strict SSL checkups on the target platform).
3. The OMNI background router scans DNS entries and automatically provisions dynamic Let's Encrypt TLS certificates within 10 minutes.

---

## 2. Brand Asset & CSS Variables Customization

Once the tenant slug matches (e.g. `dynasty.omni.io` resolves to tenant ID `ten_dynasty_99`), OMNI applies branding parameters directly inside the virtual layout:

### A. Dynamic Token Configurations Matrix
Branding parameters are recorded as key-value pairs in the `tenant_settings` schema:

```json
{
  "tenant_id": "ten_dynasty_99",
  "theme_tokens": {
    "primary_color": "#e11d48",
    "primary_hover_color": "#be123c",
    "background_color": "#faf9f6",
    "card_border_radius": "12px",
    "font_family": "Plus Jakarta Sans"
  },
  "brand_assets": {
    "logo_url": "https://assets.omni.io/brands/dynasty_logo.png",
    "favicon_url": "https://assets.omni.io/brands/dynasty_fav.ico"
  }
}
```

### B. Theme Injection Rules
OMNI mounts branding configurations dynamically on component activation. Tailwind properties refer to root CSS variable declarations:

```ts
// src/components/WhiteLabelThemeLoader.tsx
import React, { useEffect } from 'react';

export function applyTenantTheme(tokens: Record<string, string>) {
  const root = document.documentElement;
  root.style.setProperty('--color-primary-custom', tokens.primary_color || '#000000');
  root.style.setProperty('--color-background-custom', tokens.background_color || '#faf9f6');
  root.style.setProperty('--border-radius-custom', tokens.card_border_radius || '12px');
}
```

---

## 3. Geographic Regional Localization Policy

White-labeled setups can configure independent compliance regions based on user registration context:

- **GDPR Mode:** Enforces consent confirmation before recording diagnostic cookies. Data residency constraints route ledger events strictly through European servers (`europe-west2`).
- **CCPA Mode:** Displays conspicuous "Do Not Sell My Info" footers on custom domain portals.
- **NDPR Mode:** Stores audit logs strictly in local secure formats compliant with Nigeria Data Protection guidelines.
- **Sovereign Tax Limits:** Overrides regional VAT calculations according to the merchant’s corporate office location.
