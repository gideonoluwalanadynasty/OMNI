// OMNI Global Finance Expansion, Mobile, Localization & Accessibility Types

export type GlobalSupportedLanguage =
  | 'en' // English
  | 'fr' // French
  | 'es' // Spanish
  | 'ar' // Arabic (RTL)
  | 'pt' // Portuguese
  | 'zh' // Chinese (Simplified)
  | 'hi'; // Hindi

export interface CountryTaxRule {
  taxType: 'VAT' | 'GST' | 'Sales_Tax' | 'WHT' | 'Digital_Services_Tax';
  standardRatePercent: number;
  reducedRatePercent?: number;
  taxRegistrationNumberFormat: string;
  isWithholdingApplicable: boolean;
}

export interface CountryPaymentProviderRoute {
  providerId: string;
  providerName: string;
  railType: 'instant_payment' | 'rtgs' | 'ach' | 'card_network' | 'mobile_money' | 'qr_network';
  supportedCurrencies: string[];
  settlementSpeed: string;
  isDefault: boolean;
}

export interface CountryProductEntitlement {
  wallet: boolean;
  payments: boolean;
  fx: boolean;
  cards: boolean;
  lending: boolean;
  invoicing: boolean;
  payroll: boolean;
  treasury: boolean;
  investments: boolean;
  marketplaceEscrow: boolean;
  developerApis: boolean;
}

export interface CountryConfigurationProfile {
  id: string;
  countryName: string;
  isoCode: string; // e.g. "US", "GB", "AE", "SG", "KE", "BR", "FR", "CN", "IN", "JP"
  region: 'North America' | 'Europe' | 'Middle East' | 'Asia Pacific' | 'Latin America' | 'Sub-Saharan Africa';
  primaryCurrency: string; // e.g. "USD", "GBP", "AED", "SGD", "KES", "BRL", "EUR", "CNY", "INR", "JPY"
  supportedCurrencies: string[];
  primaryLanguage: GlobalSupportedLanguage;
  supportedLanguages: GlobalSupportedLanguage[];
  timeZones: string[];
  dateFormat: string; // e.g. "MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"
  numberFormat: {
    decimalSeparator: '.' | ',';
    thousandsSeparator: ',' | '.' | ' ';
    currencyPosition: 'prefix' | 'suffix';
  };
  taxConfig: CountryTaxRule;
  paymentProviders: CountryPaymentProviderRoute[];
  bankingPartners: string[];
  kycProviders: string[];
  amlProviders: string[];
  limits: {
    singleTransactionMaxUsd: number;
    dailyVelocityMaxUsd: number;
    monthlyThroughputMaxUsd: number;
    cashPickupMaxUsd: number;
  };
  regulatoryRequirements: {
    regulatorName: string;
    licenseType: string;
    reportingCycle: 'instant_event' | 'daily' | 'monthly' | 'quarterly';
    localDataResidencyRequired: boolean;
    kycTierStrictness: 'tier_1_basic' | 'tier_2_verified' | 'tier_3_enhanced_due_diligence';
  };
  products: CountryProductEntitlement;
  isActive: boolean;
}

export interface I18nDictionary {
  appName: string;
  tagline: string;
  dashboard: string;
  wallets: string;
  sendMoney: string;
  receiveMoney: string;
  recentTransactions: string;
  exchangeRates: string;
  factoring: string;
  payroll: string;
  compliance: string;
  security: string;
  cards: string;
  settings: string;
  balance: string;
  totalAssets: string;
  quickPay: string;
  scanQr: string;
  offlineNotice: string;
  aiAdvisor: string;
  biometricPrompt: string;
}

export interface RegisteredUserDevice {
  id: string;
  deviceName: string;
  deviceType: 'mobile_ios' | 'mobile_android' | 'desktop_mac' | 'desktop_windows' | 'tablet';
  browserOrApp: string;
  ipAddress: string;
  ipLocation: string;
  lastActive: string;
  isTrusted: boolean;
  isCurrentDevice: boolean;
  biometricsEnrolled: boolean;
  riskScore: number;
}

export interface FinanceAcademyModule {
  id: string;
  title: string;
  category: 'budgeting' | 'saving' | 'investing' | 'business_finance' | 'payments_fx' | 'security_fraud';
  estimatedMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  contentMarkdown: string;
  quizQuestionsCount: number;
  completed: boolean;
}

export interface GlobalNotificationItem {
  id: string;
  channel: 'in_app' | 'push' | 'email' | 'sms' | 'whatsapp';
  type: 'payment' | 'transfer' | 'security' | 'compliance' | 'invoice' | 'approval' | 'settlement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionUrl?: string;
}

export interface UserPersonalizationSettings {
  language: GlobalSupportedLanguage;
  activeCountryCode: string;
  highContrastMode: boolean;
  textScale: 100 | 125 | 150;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
  biometricLoginEnabled: boolean;
  offlineCacheEnabled: boolean;
  aiPersonalization: {
    suggestCashflowInsights: boolean;
    autoCategorizeTransactions: boolean;
    highlightTaxDeductions: boolean;
    riskAlertSensitivity: 'conservative' | 'balanced' | 'aggressive';
  };
  notificationChannels: {
    push: boolean;
    email: boolean;
    sms: boolean;
    whatsapp: boolean;
    inApp: boolean;
  };
}
