import {
  WhiteLabelInstitutionTenant,
  WhiteLabelTenantUser,
  WhiteLabelConnectedProvider,
  WhiteLabelAffiliateCampaign
} from '../types/finance_os';

export const SEED_WHITE_LABEL_INSTITUTIONS: WhiteLabelInstitutionTenant[] = [
  {
    id: 'wli_novapay',
    name: 'NovaPay Global Bank',
    slug: 'novapay',
    category: 'digital_bank',
    status: 'active',
    country: 'United Kingdom',
    jurisdiction: 'FCA (UK) / EEA Passported',
    branding: {
      brandName: 'NovaPay Bank',
      tagline: 'The Intelligent NeoBanking Operating System',
      companyLegalName: 'NovaPay Financial Technologies Ltd',
      supportEmail: 'concierge@novapay.global',
      supportPhone: '+44 20 7946 0912',
      copyrightText: '© 2026 NovaPay Global Ltd. Authorized FaaS Tenant under OMNI Sovereign Charter.',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60',
      faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=32&auto=format&fit=crop&q=60',
      mobileConfig: {
        appTitle: 'NovaPay Mobile',
        splashColor: '#0f172a',
        appIconShape: 'squircle',
        appStoreId: 'id1594829104',
        playStoreId: 'com.novapay.banking'
      },
      emailConfig: {
        headerLogoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150',
        footerSignature: 'NovaPay Client Experience Team • 100 Bishopsgate, London EC2N 4AG',
        senderName: 'NovaPay Notifications',
        senderEmail: 'no-reply@service.novapay.global',
        accentColor: '#6366f1'
      },
      notificationConfig: {
        pushTitlePrefix: '[NovaPay Alert]',
        smsSenderId: 'NOVAPAY',
        enablePush: true,
        enableSms: true
      },
      cardConfig: {
        cardArtStyle: 'minimal_dark',
        customBinPrefix: '418294',
        cardProgramName: 'NovaPay Infinite Metal Card',
        embossedNameDefault: 'VALUED NOVAPAY MEMBER'
      }
    },
    theme: {
      primaryColor: '#4f46e5',
      secondaryColor: '#06b6d4',
      accentColor: '#10b981',
      surfaceColor: '#0f172a',
      textColor: '#f8fafc',
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: 'rounded-xl',
      colorMode: 'dark'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      invoices: true,
      payroll: true,
      businessFinance: true,
      treasury: true,
      aiFinance: true,
      marketplacePayments: false,
      developerApis: true
    },
    financialRules: {
      transactionFeePercent: 0.15,
      fixedFeePerTxUsd: 0.20,
      interchangeMarkupBps: 35,
      fxSpreadMarkupBps: 25,
      singleTxLimitUsd: 150000,
      dailyVelocityLimitUsd: 500000,
      monthlyThroughputLimitUsd: 25000000,
      supportedCurrencies: ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'SGD', 'USDC'],
      operatingCountries: ['GB', 'US', 'DE', 'FR', 'CH', 'SG'],
      approvalRules: [
        { minAmountUsd: 25000, requiredSigners: 2, roleRequired: 'treasury_officer' },
        { minAmountUsd: 100000, requiredSigners: 3, roleRequired: 'executive_board' }
      ],
      complianceTierRequired: 'tier_3_enhanced_due_diligence',
      transactionPolicies: {
        allowInternationalWires: true,
        allowCryptoRail: true,
        instantSettlementEnabled: true,
        weekendProcessing: true
      }
    },
    domain: {
      subdomain: 'novapay',
      customDomain: 'banking.novapay.global',
      sslStatus: 'provisioned',
      dnsRecords: [
        { type: 'CNAME', host: 'banking.novapay.global', value: 'cname.finance.omni.com', status: 'verified' },
        { type: 'TXT', host: '_omni-challenge.novapay.global', value: 'omni-tenant-verify=90182409182', status: 'verified' },
        { type: 'A', host: 'novapay.global', value: '76.76.21.21', status: 'verified' }
      ]
    },
    reseller: {
      resellerId: 'res_omni_global_direct',
      parentPartnerName: 'OMNI Financial Core',
      tier: 'direct_institution',
      revenueSharePercent: 75,
      subscriptionTier: 'enterprise_scale',
      monthlyPlatformFeeUsd: 4999,
      usageBillingRates: {
        perActiveWalletUsd: 0.12,
        perCardIssuedUsd: 1.25,
        perApiCallUsd: 0.002,
        bpsOnGmv: 4.5
      },
      monthlyThroughputUsd: 14850000,
      accruedPartnerRevenueUsd: 48920,
      accruedOmniPlatformShareUsd: 16306
    },
    affiliateCampaigns: [
      {
        id: 'aff_nova_01',
        name: 'Tech Founders Q3 Referral Sprint',
        referralCode: 'NOVA-FOUNDER-2026',
        commissionType: 'bps_on_volume',
        commissionValue: 10,
        totalReferrals: 142,
        totalAcquisitionGmvUsd: 3200000,
        totalPayoutUsd: 3200,
        status: 'active'
      },
      {
        id: 'aff_nova_02',
        name: 'Fintech Influencer Ambassador',
        referralCode: 'NOVA-VIP-ELITE',
        commissionType: 'fixed_per_customer',
        commissionValue: 50,
        totalReferrals: 89,
        totalAcquisitionGmvUsd: 1100000,
        totalPayoutUsd: 4450,
        status: 'active'
      }
    ],
    aiConfig: {
      assistantName: 'Nova Intelligence Copilot',
      assistantAvatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
      welcomePrompt: 'Welcome to NovaPay. How can I assist with your corporate cash management or treasury today?',
      enabledForRetail: true,
      enabledForBusiness: true,
      maxAutonomousRecommendationLimitUsd: 50000,
      disclaimerText: 'Nova Intelligence provides algorithmic treasury analytics and does not constitute statutory tax advice.',
      customKnowledgeDocs: [
        { id: 'k_01', title: 'NovaPay Institutional Fee Schedule & Tiering', category: 'Pricing', wordCount: 1420, status: 'indexed' },
        { id: 'k_02', title: 'Corporate Multi-Signatory Treasury Guidelines', category: 'Compliance', wordCount: 3100, status: 'indexed' }
      ],
      financialEducationModules: [
        { id: 'edu_01', title: 'Hedging FX Volatility for Global Tech SaaS', topic: 'Currency Risk', durationMin: 12, targetAudience: 'CFOs & Treasurers' },
        { id: 'edu_02', title: 'Optimizing Working Capital with Dynamic Factoring', topic: 'Liquidity', durationMin: 15, targetAudience: 'Finance Directors' }
      ]
    },
    providers: [
      { id: 'prov_01', category: 'payment_gateway', providerName: 'Stripe Direct', adapterType: 'REST_V2', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 8200000 },
      { id: 'prov_02', category: 'banking_rail', providerName: 'SEPA Instant Clearing', adapterType: 'ISO_20022', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 5100000 },
      { id: 'prov_03', category: 'kyc_screening', providerName: 'Persona 3D Biometrics', adapterType: 'OAUTH_SDK', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 0 },
      { id: 'prov_04', category: 'fx_liquidity', providerName: 'Wise Institutional FX', adapterType: 'FIX_PROTOCOL', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 1550000 }
    ],
    usersCount: {
      customers: 12840,
      businesses: 1420,
      employees: 640,
      agents: 48
    },
    totalAssetsUnderManagementUsd: 84500000,
    monthlyThroughputUsd: 14850000,
    auditLogsCount: 4120,
    createdAt: '2025-11-10T10:00:00Z',
    updatedAt: '2026-08-18T08:30:00Z'
  },
  {
    id: 'wli_apex_agri',
    name: 'Apex Agri-Cooperative Finance',
    slug: 'apex-agri',
    category: 'cooperative',
    status: 'active',
    country: 'Kenya / East Africa',
    jurisdiction: 'SASRA / Central Bank of Kenya Regulated',
    branding: {
      brandName: 'Apex Harvest Pay',
      tagline: 'Farmer-Owned Financial Cooperative & Crop Settlement',
      companyLegalName: 'Apex Agricultural Financial Services Society Ltd',
      supportEmail: 'support@apexagri.coop',
      supportPhone: '+254 20 491 8200',
      copyrightText: '© 2026 Apex Harvest Cooperative. Powered by OMNI Finance OS.',
      logoUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=120&auto=format&fit=crop&q=60',
      faviconUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=32&auto=format&fit=crop&q=60',
      mobileConfig: {
        appTitle: 'Apex Harvest Wallet',
        splashColor: '#064e3b',
        appIconShape: 'rounded_square',
        appStoreId: 'id160492810',
        playStoreId: 'coop.apexagri.wallet'
      },
      emailConfig: {
        headerLogoUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=150',
        footerSignature: 'Apex Agricultural Member Desk • Cooperative House, Nairobi',
        senderName: 'Apex Cooperative Dispatch',
        senderEmail: 'alerts@apexagri.coop',
        accentColor: '#10b981'
      },
      notificationConfig: {
        pushTitlePrefix: '[Apex Coop]',
        smsSenderId: 'APEXAGRI',
        enablePush: true,
        enableSms: true
      },
      cardConfig: {
        cardArtStyle: 'emerald_sovereign',
        customBinPrefix: '528194',
        cardProgramName: 'Apex Member Agri-Card',
        embossedNameDefault: 'COOPERATIVE MEMBER'
      }
    },
    theme: {
      primaryColor: '#059669',
      secondaryColor: '#d97706',
      accentColor: '#10b981',
      surfaceColor: '#064e3b',
      textColor: '#ecfdf5',
      fontFamily: 'Inter',
      borderRadius: 'rounded-xl',
      colorMode: 'dark'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      invoices: true,
      payroll: true,
      businessFinance: true,
      treasury: false,
      aiFinance: true,
      marketplacePayments: true,
      developerApis: false
    },
    financialRules: {
      transactionFeePercent: 0.10,
      fixedFeePerTxUsd: 0.05,
      interchangeMarkupBps: 20,
      fxSpreadMarkupBps: 30,
      singleTxLimitUsd: 20000,
      dailyVelocityLimitUsd: 50000,
      monthlyThroughputLimitUsd: 5000000,
      supportedCurrencies: ['KES', 'USD', 'EUR', 'GBP', 'TZS', 'UGX'],
      operatingCountries: ['KE', 'TZ', 'UG', 'RW'],
      approvalRules: [
        { minAmountUsd: 5000, requiredSigners: 2, roleRequired: 'coop_branch_manager' }
      ],
      complianceTierRequired: 'tier_2_verified_individual',
      transactionPolicies: {
        allowInternationalWires: false,
        allowCryptoRail: false,
        instantSettlementEnabled: true,
        weekendProcessing: true
      }
    },
    domain: {
      subdomain: 'apexagri',
      customDomain: 'portal.apexagri.coop',
      sslStatus: 'provisioned',
      dnsRecords: [
        { type: 'CNAME', host: 'portal.apexagri.coop', value: 'cname.finance.omni.com', status: 'verified' }
      ]
    },
    reseller: {
      resellerId: 'res_east_africa_distributor',
      parentPartnerName: 'AfriTech Banking Solutions Ltd',
      tier: 'sub_partner',
      revenueSharePercent: 70,
      subscriptionTier: 'growth',
      monthlyPlatformFeeUsd: 1499,
      usageBillingRates: {
        perActiveWalletUsd: 0.08,
        perCardIssuedUsd: 0.90,
        perApiCallUsd: 0.001,
        bpsOnGmv: 3.5
      },
      monthlyThroughputUsd: 4120000,
      accruedPartnerRevenueUsd: 18450,
      accruedOmniPlatformShareUsd: 7900
    },
    affiliateCampaigns: [
      {
        id: 'aff_apex_01',
        name: 'Village Community Agent Onboarding',
        referralCode: 'AGRI-AGENT-REWARD',
        commissionType: 'fixed_per_customer',
        commissionValue: 5,
        totalReferrals: 3840,
        totalAcquisitionGmvUsd: 1950000,
        totalPayoutUsd: 19200,
        status: 'active'
      }
    ],
    aiConfig: {
      assistantName: 'Apex Shamba AI Advisor',
      assistantAvatarUrl: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=80',
      welcomePrompt: 'Habari! I can assist you with your grain harvest payouts, seasonal crop micro-loans, or fertilizer savings.',
      enabledForRetail: true,
      enabledForBusiness: true,
      maxAutonomousRecommendationLimitUsd: 2000,
      disclaimerText: 'Apex Shamba AI provides weather-adjusted cash flow estimates for agricultural planning.',
      customKnowledgeDocs: [
        { id: 'k_agri_01', title: 'Cooperative Dividend Calculation Manual 2026', category: 'Member Rules', wordCount: 950, status: 'indexed' }
      ],
      financialEducationModules: [
        { id: 'edu_agri_01', title: 'Managing Seasonal Farm Income & Off-Season Savings', topic: 'Agri-Budgeting', durationMin: 10, targetAudience: 'Smallholder Farmers' }
      ]
    },
    providers: [
      { id: 'prov_agri_01', category: 'payment_gateway', providerName: 'M-Pesa Express B2C', adapterType: 'DAR_ES_SALAAM_API', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 3100000 },
      { id: 'prov_agri_02', category: 'banking_rail', providerName: 'Kenya Clearing House (PesaLink)', adapterType: 'DIRECT_SWITCH', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 980000 }
    ],
    usersCount: {
      customers: 24500,
      businesses: 320,
      employees: 95,
      agents: 180
    },
    totalAssetsUnderManagementUsd: 12400000,
    monthlyThroughputUsd: 4120000,
    auditLogsCount: 2310,
    createdAt: '2026-01-15T09:00:00Z',
    updatedAt: '2026-08-18T06:15:00Z'
  },
  {
    id: 'wli_horizon_cu',
    name: 'Horizon Community Credit Union',
    slug: 'horizon-cu',
    category: 'credit_union',
    status: 'active',
    country: 'United States',
    jurisdiction: 'NCUA Insured / US State Chartered',
    branding: {
      brandName: 'Horizon Credit Union',
      tagline: 'People Helping People Through Modern Digital Banking',
      companyLegalName: 'Horizon Federal Credit Union Inc',
      supportEmail: 'memberservices@horizoncu.org',
      supportPhone: '+1 800 555 4920',
      copyrightText: '© 2026 Horizon Credit Union. Federally Insured by NCUA. Powered by OMNI.',
      logoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=120&auto=format&fit=crop&q=60',
      faviconUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=32&auto=format&fit=crop&q=60',
      mobileConfig: {
        appTitle: 'Horizon Mobile CU',
        splashColor: '#1e3a8a',
        appIconShape: 'circle',
        appStoreId: 'id149582918',
        playStoreId: 'org.horizoncu.mobile'
      },
      emailConfig: {
        headerLogoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=150',
        footerSignature: 'Horizon Member Care • 400 Liberty Ave, Pittsburgh PA 15222',
        senderName: 'Horizon CU Member Notice',
        senderEmail: 'statements@horizoncu.org',
        accentColor: '#3b82f6'
      },
      notificationConfig: {
        pushTitlePrefix: '[Horizon CU]',
        smsSenderId: 'HORIZONCU',
        enablePush: true,
        enableSms: true
      },
      cardConfig: {
        cardArtStyle: 'gradient_lux',
        customBinPrefix: '482910',
        cardProgramName: 'Horizon Rewards Visa Debit',
        embossedNameDefault: 'MEMBER SINCE 2020'
      }
    },
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#0284c7',
      accentColor: '#10b981',
      surfaceColor: '#1e293b',
      textColor: '#f8fafc',
      fontFamily: 'Outfit',
      borderRadius: 'rounded-2xl',
      colorMode: 'light'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      invoices: false,
      payroll: true,
      businessFinance: true,
      treasury: true,
      aiFinance: true,
      marketplacePayments: false,
      developerApis: false
    },
    financialRules: {
      transactionFeePercent: 0.0,
      fixedFeePerTxUsd: 0.0,
      interchangeMarkupBps: 15,
      fxSpreadMarkupBps: 20,
      singleTxLimitUsd: 50000,
      dailyVelocityLimitUsd: 100000,
      monthlyThroughputLimitUsd: 15000000,
      supportedCurrencies: ['USD', 'CAD', 'EUR', 'GBP'],
      operatingCountries: ['US', 'CA'],
      approvalRules: [
        { minAmountUsd: 15000, requiredSigners: 2, roleRequired: 'loan_officer' }
      ],
      complianceTierRequired: 'tier_2_verified_individual',
      transactionPolicies: {
        allowInternationalWires: true,
        allowCryptoRail: false,
        instantSettlementEnabled: true,
        weekendProcessing: true
      }
    },
    domain: {
      subdomain: 'horizoncu',
      customDomain: 'online.horizoncu.org',
      sslStatus: 'provisioned',
      dnsRecords: [
        { type: 'CNAME', host: 'online.horizoncu.org', value: 'cname.finance.omni.com', status: 'verified' }
      ]
    },
    reseller: {
      resellerId: 'res_omni_us_direct',
      parentPartnerName: 'OMNI Financial North America',
      tier: 'direct_institution',
      revenueSharePercent: 80,
      subscriptionTier: 'enterprise_scale',
      monthlyPlatformFeeUsd: 3499,
      usageBillingRates: {
        perActiveWalletUsd: 0.10,
        perCardIssuedUsd: 1.10,
        perApiCallUsd: 0.001,
        bpsOnGmv: 3.0
      },
      monthlyThroughputUsd: 9400000,
      accruedPartnerRevenueUsd: 31200,
      accruedOmniPlatformShareUsd: 7800
    },
    affiliateCampaigns: [],
    aiConfig: {
      assistantName: 'Horizon Financial Guide',
      assistantAvatarUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=80',
      welcomePrompt: 'Hello Member! How can I help you check your dividend rate, apply for an auto loan, or setup auto-save?',
      enabledForRetail: true,
      enabledForBusiness: true,
      maxAutonomousRecommendationLimitUsd: 25000,
      disclaimerText: 'Horizon Financial Guide provides educational loan calculations and rate comparisons.',
      customKnowledgeDocs: [
        { id: 'k_hcu_01', title: 'NCUA Deposit Insurance Coverage Limits & Rules', category: 'Insurance', wordCount: 1800, status: 'indexed' }
      ],
      financialEducationModules: [
        { id: 'edu_hcu_01', title: 'Building Credit Score from 580 to 750+', topic: 'Credit Health', durationMin: 14, targetAudience: 'Retail Members' }
      ]
    },
    providers: [
      { id: 'prov_hcu_01', category: 'banking_rail', providerName: 'FedNow Instant Rail', adapterType: 'FED_DIRECT_API', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 6200000 },
      { id: 'prov_hcu_02', category: 'banking_rail', providerName: 'Evolve Bank & Trust Core', adapterType: 'CORE_SYNC_V3', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 3200000 }
    ],
    usersCount: {
      customers: 18600,
      businesses: 890,
      employees: 140,
      agents: 12
    },
    totalAssetsUnderManagementUsd: 92000000,
    monthlyThroughputUsd: 9400000,
    auditLogsCount: 3140,
    createdAt: '2025-08-20T11:00:00Z',
    updatedAt: '2026-08-18T05:00:00Z'
  },
  {
    id: 'wli_gov_disburse',
    name: 'GovDisburse National Portal',
    slug: 'govdisburse',
    category: 'government_payment',
    status: 'active',
    country: 'Federal Jurisdiction',
    jurisdiction: 'Treasury & Sovereign Comptroller Authorized',
    branding: {
      brandName: 'National Treasury Direct',
      tagline: 'Sovereign Citizen Benefits & Government Vendor Disbursements',
      companyLegalName: 'Federal Treasury Department Financial Portal',
      supportEmail: 'inquiries@disburse.treasury.gov',
      supportPhone: '+1 800 829 1040',
      copyrightText: 'Official Sovereign Government Portal. Powered by OMNI Institutional FaaS Core.',
      logoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=60',
      faviconUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=32&auto=format&fit=crop&q=60',
      mobileConfig: {
        appTitle: 'GovPay Citizen',
        splashColor: '#1e293b',
        appIconShape: 'rounded_square',
        appStoreId: 'id150918241',
        playStoreId: 'gov.treasury.disburse'
      },
      emailConfig: {
        headerLogoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150',
        footerSignature: 'Government Disbursement Office • Washington DC',
        senderName: 'Federal Disbursement Notice',
        senderEmail: 'official-notice@disburse.treasury.gov',
        accentColor: '#0f766e'
      },
      notificationConfig: {
        pushTitlePrefix: '[Official Gov Notice]',
        smsSenderId: 'USGOVPAY',
        enablePush: true,
        enableSms: true
      },
      cardConfig: {
        cardArtStyle: 'metallic_gold',
        customBinPrefix: '400091',
        cardProgramName: 'Federal Direct Citizen Debit',
        embossedNameDefault: 'CITIZEN BENEFICIARY'
      }
    },
    theme: {
      primaryColor: '#0f766e',
      secondaryColor: '#1e293b',
      accentColor: '#f59e0b',
      surfaceColor: '#0f172a',
      textColor: '#f8fafc',
      fontFamily: 'Inter',
      borderRadius: 'rounded-md',
      colorMode: 'dark'
    },
    products: {
      wallet: true,
      payments: true,
      fx: false,
      cards: true,
      invoices: true,
      payroll: true,
      businessFinance: true,
      treasury: true,
      aiFinance: true,
      marketplacePayments: false,
      developerApis: true
    },
    financialRules: {
      transactionFeePercent: 0.0,
      fixedFeePerTxUsd: 0.0,
      interchangeMarkupBps: 0,
      fxSpreadMarkupBps: 0,
      singleTxLimitUsd: 10000000,
      dailyVelocityLimitUsd: 50000000,
      monthlyThroughputLimitUsd: 250000000,
      supportedCurrencies: ['USD'],
      operatingCountries: ['US'],
      approvalRules: [
        { minAmountUsd: 500000, requiredSigners: 3, roleRequired: 'auditor_general' }
      ],
      complianceTierRequired: 'tier_5_institutional_sovereign',
      transactionPolicies: {
        allowInternationalWires: false,
        allowCryptoRail: false,
        instantSettlementEnabled: true,
        weekendProcessing: true
      }
    },
    domain: {
      subdomain: 'govdisburse',
      customDomain: 'disburse.treasury.gov',
      sslStatus: 'provisioned',
      dnsRecords: [
        { type: 'CNAME', host: 'disburse.treasury.gov', value: 'cname.finance.omni.com', status: 'verified' }
      ]
    },
    reseller: {
      resellerId: 'res_sovereign_procurement',
      parentPartnerName: 'OMNI Sovereign Infrastructure',
      tier: 'direct_institution',
      revenueSharePercent: 90,
      subscriptionTier: 'sovereign_custom',
      monthlyPlatformFeeUsd: 15000,
      usageBillingRates: {
        perActiveWalletUsd: 0.05,
        perCardIssuedUsd: 0.75,
        perApiCallUsd: 0.0005,
        bpsOnGmv: 0.5
      },
      monthlyThroughputUsd: 182000000,
      accruedPartnerRevenueUsd: 125000,
      accruedOmniPlatformShareUsd: 13800
    },
    affiliateCampaigns: [],
    aiConfig: {
      assistantName: 'Citizen Benefits AI Assistant',
      assistantAvatarUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=80',
      welcomePrompt: 'Welcome to National Treasury Direct. I can help verify your pension, child tax credit, or vendor invoice status.',
      enabledForRetail: true,
      enabledForBusiness: true,
      maxAutonomousRecommendationLimitUsd: 0,
      disclaimerText: 'Citizen Benefits AI is strictly informational and refers all statutory claims to the Comptroller.',
      customKnowledgeDocs: [
        { id: 'k_gov_01', title: 'Federal Direct Express Benefit Schedule 2026', category: 'Statutory Policy', wordCount: 4200, status: 'indexed' }
      ],
      financialEducationModules: [
        { id: 'edu_gov_01', title: 'Understanding Your Social Security & Direct Deposit Protection', topic: 'Public Benefits', durationMin: 8, targetAudience: 'Beneficiaries' }
      ]
    },
    providers: [
      { id: 'prov_gov_01', category: 'banking_rail', providerName: 'Fedwire / FedNow Direct Access', adapterType: 'FED_DIRECT_CLEARED', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 182000000 }
    ],
    usersCount: {
      customers: 210000,
      businesses: 5800,
      employees: 3200,
      agents: 450
    },
    totalAssetsUnderManagementUsd: 650000000,
    monthlyThroughputUsd: 182000000,
    auditLogsCount: 15800,
    createdAt: '2025-05-01T08:00:00Z',
    updatedAt: '2026-08-18T07:45:00Z'
  },
  {
    id: 'wli_stratos_fintech',
    name: 'Stratos Fintech Capital',
    slug: 'stratos',
    category: 'fintech',
    status: 'active',
    country: 'Singapore / APAC',
    jurisdiction: 'MAS Major Payment Institution (MPI)',
    branding: {
      brandName: 'Stratos Capital',
      tagline: 'High-Velocity B2B Working Capital & Invoicing Platform',
      companyLegalName: 'Stratos Financial Technologies Pte Ltd',
      supportEmail: 'ops@stratos.sg',
      supportPhone: '+65 6789 0123',
      copyrightText: '© 2026 Stratos Capital Pte Ltd. Regulated by Monetary Authority of Singapore.',
      logoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=120&auto=format&fit=crop&q=60',
      faviconUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=32&auto=format&fit=crop&q=60',
      mobileConfig: {
        appTitle: 'Stratos Corporate',
        splashColor: '#18181b',
        appIconShape: 'squircle',
        appStoreId: 'id15940291',
        playStoreId: 'sg.stratos.app'
      },
      emailConfig: {
        headerLogoUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150',
        footerSignature: 'Stratos APAC Operations • Marina Bay Financial Centre, Singapore',
        senderName: 'Stratos Capital Dispatch',
        senderEmail: 'statements@stratos.sg',
        accentColor: '#f43f5e'
      },
      notificationConfig: {
        pushTitlePrefix: '[Stratos Pay]',
        smsSenderId: 'STRATOS',
        enablePush: true,
        enableSms: true
      },
      cardConfig: {
        cardArtStyle: 'neon_cyber',
        customBinPrefix: '519284',
        cardProgramName: 'Stratos Black Executive Card',
        embossedNameDefault: 'MANAGING DIRECTOR'
      }
    },
    theme: {
      primaryColor: '#e11d48',
      secondaryColor: '#f43f5e',
      accentColor: '#10b981',
      surfaceColor: '#09090b',
      textColor: '#fafafa',
      fontFamily: 'Plus Jakarta Sans',
      borderRadius: 'rounded-xl',
      colorMode: 'dark'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      invoices: true,
      payroll: true,
      businessFinance: true,
      treasury: true,
      aiFinance: true,
      marketplacePayments: true,
      developerApis: true
    },
    financialRules: {
      transactionFeePercent: 0.25,
      fixedFeePerTxUsd: 0.35,
      interchangeMarkupBps: 45,
      fxSpreadMarkupBps: 25,
      singleTxLimitUsd: 250000,
      dailyVelocityLimitUsd: 1000000,
      monthlyThroughputLimitUsd: 40000000,
      supportedCurrencies: ['SGD', 'USD', 'EUR', 'GBP', 'AUD', 'JPY', 'HKD', 'CNY', 'USDC'],
      operatingCountries: ['SG', 'HK', 'AU', 'JP', 'US'],
      approvalRules: [
        { minAmountUsd: 50000, requiredSigners: 2, roleRequired: 'risk_director' }
      ],
      complianceTierRequired: 'tier_4_corporate_kyb',
      transactionPolicies: {
        allowInternationalWires: true,
        allowCryptoRail: true,
        instantSettlementEnabled: true,
        weekendProcessing: true
      }
    },
    domain: {
      subdomain: 'stratos',
      customDomain: 'app.stratos.sg',
      sslStatus: 'provisioned',
      dnsRecords: [
        { type: 'CNAME', host: 'app.stratos.sg', value: 'cname.finance.omni.com', status: 'verified' }
      ]
    },
    reseller: {
      resellerId: 'res_apac_venture',
      parentPartnerName: 'APAC FinTech Accelerate Corp',
      tier: 'master_reseller',
      revenueSharePercent: 80,
      subscriptionTier: 'enterprise_scale',
      monthlyPlatformFeeUsd: 6999,
      usageBillingRates: {
        perActiveWalletUsd: 0.15,
        perCardIssuedUsd: 1.50,
        perApiCallUsd: 0.002,
        bpsOnGmv: 5.0
      },
      monthlyThroughputUsd: 21500000,
      accruedPartnerRevenueUsd: 68400,
      accruedOmniPlatformShareUsd: 17100
    },
    affiliateCampaigns: [
      {
        id: 'aff_stratos_01',
        name: 'Venture Capital Portfolio SaaS Perk',
        referralCode: 'STRATOS-VC-PASS',
        commissionType: 'bps_on_volume',
        commissionValue: 12,
        totalReferrals: 76,
        totalAcquisitionGmvUsd: 5400000,
        totalPayoutUsd: 6480,
        status: 'active'
      }
    ],
    aiConfig: {
      assistantName: 'Stratos Capital Copilot',
      assistantAvatarUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80',
      welcomePrompt: 'Welcome to Stratos Capital. Ready to evaluate your invoice factoring liquidity or APAC currency routes?',
      enabledForRetail: false,
      enabledForBusiness: true,
      maxAutonomousRecommendationLimitUsd: 100000,
      disclaimerText: 'Stratos AI calculates real-time receivables factoring discounts based on buyer credit metrics.',
      customKnowledgeDocs: [
        { id: 'k_str_01', title: 'APAC Cross-Border PayNow & Fast Settlement Guide', category: 'FX & Rail', wordCount: 2200, status: 'indexed' }
      ],
      financialEducationModules: [
        { id: 'edu_str_01', title: 'Cross-Border Supply Chain Finance in Southeast Asia', topic: 'Trade Finance', durationMin: 18, targetAudience: 'Enterprise CFOs' }
      ]
    },
    providers: [
      { id: 'prov_str_01', category: 'banking_rail', providerName: 'Singapore FAST / PayNow', adapterType: 'MAS_DIRECT_FAST', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 12400000 },
      { id: 'prov_str_02', category: 'fx_liquidity', providerName: 'LMAX Institutional FX', adapterType: 'FIX_ENGINE', status: 'connected', isDefault: true, monthlyVolumeProcessedUsd: 9100000 }
    ],
    usersCount: {
      customers: 3400,
      businesses: 920,
      employees: 380,
      agents: 15
    },
    totalAssetsUnderManagementUsd: 110000000,
    monthlyThroughputUsd: 21500000,
    auditLogsCount: 5240,
    createdAt: '2025-09-12T07:00:00Z',
    updatedAt: '2026-08-18T08:10:00Z'
  }
];

export const SEED_WHITE_LABEL_USERS: WhiteLabelTenantUser[] = [
  {
    id: 'usr_wl_01',
    userType: 'business',
    name: 'Acme Robotics UK Ltd',
    email: 'finance@acmerobotics.co.uk',
    role: 'Managing Director',
    walletBalanceUsd: 184500.00,
    kycStatus: 'verified',
    status: 'active',
    joinedDate: '2026-02-10'
  },
  {
    id: 'usr_wl_02',
    userType: 'customer',
    name: 'Alexander Sterling',
    email: 'a.sterling@monaco.me',
    role: 'Private Wealth Client',
    walletBalanceUsd: 62000.00,
    kycStatus: 'verified',
    status: 'active',
    joinedDate: '2026-03-01'
  },
  {
    id: 'usr_wl_03',
    userType: 'employee',
    name: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@novapay.global',
    role: 'Chief Compliance Officer',
    walletBalanceUsd: 14200.00,
    kycStatus: 'verified',
    status: 'active',
    joinedDate: '2025-11-15'
  },
  {
    id: 'usr_wl_04',
    userType: 'agent',
    name: 'Kipchoge Farming Agency Branch #04',
    email: 'eldoret.branch@apexagri.coop',
    role: 'Regional Float Agent',
    walletBalanceUsd: 8400.00,
    kycStatus: 'verified',
    status: 'active',
    joinedDate: '2026-01-20'
  },
  {
    id: 'usr_wl_05',
    userType: 'business',
    name: 'Singapore Maritime Fleet Logistics Pte',
    email: 'treasury@sgmaritime.sg',
    role: 'Corporate Treasurer',
    walletBalanceUsd: 490000.00,
    kycStatus: 'verified',
    status: 'active',
    joinedDate: '2025-10-05'
  }
];

export const SEED_AVAILABLE_PROVIDERS_CATALOG = [
  { id: 'cat_stripe', name: 'Stripe Direct', category: 'payment_gateway', description: 'Global credit card, Apple Pay, Google Pay & local checkout rails', adapter: 'REST_V2' },
  { id: 'cat_adyen', name: 'Adyen Global', category: 'payment_gateway', description: 'Unified multi-channel commerce & omnichannel point-of-sale', adapter: 'ADYEN_HPP' },
  { id: 'cat_fednow', name: 'FedNow Instant Clearing', category: 'banking_rail', description: 'US Federal Reserve 24/7/365 real-time gross settlement', adapter: 'FED_DIRECT_API' },
  { id: 'cat_sepa', name: 'SEPA Instant Credit Transfer', category: 'banking_rail', description: 'Pan-European sub-10 second Euro settlements under EPC rules', adapter: 'ISO_20022' },
  { id: 'cat_evolve', name: 'Evolve Bank & Trust', category: 'banking_rail', description: 'FDIC-insured core sponsor bank with virtual account ledger', adapter: 'CORE_SYNC_V3' },
  { id: 'cat_persona', name: 'Persona 3D Biometric KYC', category: 'kyc_screening', description: 'Automated government ID verification and liveness detection', adapter: 'OAUTH_SDK' },
  { id: 'cat_sumsub', name: 'Sumsub All-in-One Compliance', category: 'kyc_screening', description: 'KYC, KYB, PEP screening, and continuous transaction monitoring', adapter: 'SUMSUB_API' },
  { id: 'cat_wise', name: 'Wise Institutional FX', category: 'fx_liquidity', description: 'Mid-market exchange rate execution across 50+ currencies', adapter: 'FIX_PROTOCOL' },
  { id: 'cat_lmax', name: 'LMAX Institutional Exchange', category: 'fx_liquidity', description: 'Ultra-low latency institutional spot FX liquidity pool', adapter: 'FIX_ENGINE' }
];
