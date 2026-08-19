# OMNI Finance OS — Database Schema & Data Models Specification

## 1. Relational Database Layout (PostgreSQL + RLS)

All financial tables enforce strict **Row-Level Security (RLS)** keyed to `tenant_id`.

```sql
-- Enable UUID extension and pgcrypto
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--------------------------------------------------------------------------------
-- 1. TENANTS & CORPORATE ENTITIES
--------------------------------------------------------------------------------
CREATE TABLE finance_tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('personal', 'business', 'enterprise', 'government', 'ngo', 'financial_institution', 'whitelabel_fintech')),
    country VARCHAR(3) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    jurisdiction VARCHAR(100) NOT NULL,
    organization_id UUID NOT NULL,
    owner_user_id UUID NOT NULL,
    compliance_tier VARCHAR(50) NOT NULL DEFAULT 'tier_1_basic_kyc',
    risk_level VARCHAR(50) NOT NULL DEFAULT 'low',
    is_white_label_tenant BOOLEAN DEFAULT FALSE,
    white_label_config JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_finance_tenants_org ON finance_tenants(organization_id);

--------------------------------------------------------------------------------
-- 2. FINANCIAL ACCOUNTS (Checking, Vault, Treasury Pool, Escrow)
--------------------------------------------------------------------------------
CREATE TABLE financial_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES finance_tenants(id) ON DELETE CASCADE,
    account_number VARCHAR(64) UNIQUE NOT NULL,
    routing_number VARCHAR(32) NOT NULL,
    iban VARCHAR(64),
    bic_swift VARCHAR(32),
    type VARCHAR(50) NOT NULL CHECK (type IN ('checking', 'savings_vault', 'treasury_pool', 'merchant_settlement', 'escrow_pool', 'crypto_custody')),
    name VARCHAR(255) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    available_balance NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
    current_balance NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
    hold_balance NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
    is_primary BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    gl_code VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_financial_accounts_tenant ON financial_accounts(tenant_id);

--------------------------------------------------------------------------------
-- 3. DOUBLE-ENTRY GENERAL LEDGER (GL Accounts, Journals & Postings)
--------------------------------------------------------------------------------
CREATE TABLE finance_ledger_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES finance_tenants(id) ON DELETE CASCADE,
    gl_code VARCHAR(32) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
    normal_balance VARCHAR(10) NOT NULL CHECK (normal_balance IN ('debit', 'credit')),
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    current_balance NUMERIC(18, 4) NOT NULL DEFAULT 0.0000,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, gl_code)
);

CREATE TABLE finance_journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES finance_tenants(id) ON DELETE CASCADE,
    entry_number VARCHAR(64) UNIQUE NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    description TEXT NOT NULL,
    source_module VARCHAR(64) NOT NULL,
    source_reference_id VARCHAR(128),
    total_debit NUMERIC(18, 4) NOT NULL,
    total_credit NUMERIC(18, 4) NOT NULL,
    is_balanced BOOLEAN NOT NULL CHECK (total_debit = total_credit),
    verification_merkle_hash VARCHAR(128) NOT NULL,
    posted_by_user_id UUID NOT NULL,
    status VARCHAR(50) DEFAULT 'posted',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE finance_ledger_postings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journal_entry_id UUID NOT NULL REFERENCES finance_journal_entries(id) ON DELETE CASCADE,
    ledger_account_id UUID NOT NULL REFERENCES finance_ledger_accounts(id),
    gl_code VARCHAR(32) NOT NULL,
    account_name VARCHAR(255) NOT NULL,
    entry_type VARCHAR(10) NOT NULL CHECK (entry_type IN ('debit', 'credit')),
    amount NUMERIC(18, 4) NOT NULL CHECK (amount > 0),
    currency VARCHAR(10) NOT NULL,
    fx_rate_to_base NUMERIC(12, 6) DEFAULT 1.000000,
    base_amount_usd NUMERIC(18, 4) NOT NULL,
    memo TEXT
);

CREATE INDEX idx_postings_journal ON finance_ledger_postings(journal_entry_id);
CREATE INDEX idx_postings_gl_code ON finance_ledger_postings(gl_code);

--------------------------------------------------------------------------------
-- 4. TRANSACTIONS & RAILS
--------------------------------------------------------------------------------
CREATE TABLE finance_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES finance_tenants(id) ON DELETE CASCADE,
    account_id UUID NOT NULL REFERENCES financial_accounts(id),
    type VARCHAR(50) NOT NULL,
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('inbound', 'outbound', 'internal')),
    amount NUMERIC(18, 4) NOT NULL,
    currency VARCHAR(10) NOT NULL,
    usd_equivalent NUMERIC(18, 4) NOT NULL,
    fee_amount NUMERIC(18, 4) DEFAULT 0.0000,
    fee_currency VARCHAR(10) DEFAULT 'USD',
    source_instrument VARCHAR(255),
    counterparty_name VARCHAR(255),
    counterparty_account_or_handle VARCHAR(255),
    rail VARCHAR(50) NOT NULL CHECK (rail IN ('fednow', 'sepa', 'swift', 'wire', 'card_network', 'crypto_usdc', 'pix', 'intercompany_sweep')),
    status VARCHAR(50) NOT NULL DEFAULT 'settled',
    category VARCHAR(64) NOT NULL,
    memo TEXT,
    tags TEXT[],
    reference_number VARCHAR(128) UNIQUE NOT NULL,
    risk_score INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    settled_at TIMESTAMPTZ
);

CREATE INDEX idx_tx_tenant_created ON finance_transactions(tenant_id, created_at DESC);
CREATE INDEX idx_tx_reference ON finance_transactions(reference_number);

--------------------------------------------------------------------------------
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
--------------------------------------------------------------------------------
ALTER TABLE finance_tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_ledger_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE finance_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON finance_transactions
    FOR ALL
    USING (tenant_id = NULLIF(current_setting('app.current_tenant_id', true), '')::uuid);
```
