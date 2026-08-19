import {
  CountryConfigurationProfile,
  GlobalSupportedLanguage,
  I18nDictionary,
  RegisteredUserDevice,
  FinanceAcademyModule,
  GlobalNotificationItem,
  UserPersonalizationSettings
} from '../types/finance_global_expansion';

export const SEED_GLOBAL_COUNTRIES: CountryConfigurationProfile[] = [
  {
    id: 'cntry_us',
    countryName: 'United States',
    isoCode: 'US',
    region: 'North America',
    primaryCurrency: 'USD',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'USDC'],
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'es', 'zh'],
    timeZones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'],
    dateFormat: 'MM/DD/YYYY',
    numberFormat: {
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'Sales_Tax',
      standardRatePercent: 8.25,
      taxRegistrationNumberFormat: 'XX-XXXXXXX (EIN)',
      isWithholdingApplicable: true
    },
    paymentProviders: [
      { providerId: 'prov_fednow', providerName: 'FedNow Instant Rail', railType: 'instant_payment', supportedCurrencies: ['USD'], settlementSpeed: '< 2 seconds', isDefault: true },
      { providerId: 'prov_ach', providerName: 'NACHA FedACH', railType: 'ach', supportedCurrencies: ['USD'], settlementSpeed: '1-2 business days', isDefault: false },
      { providerId: 'prov_stripe_us', providerName: 'Stripe Direct US', railType: 'card_network', supportedCurrencies: ['USD', 'EUR'], settlementSpeed: 'Instant / T+1', isDefault: false }
    ],
    bankingPartners: ['JPMorgan Chase', 'Evolve Bank & Trust', 'Silicon Valley Bank (First Citizens)'],
    kycProviders: ['Persona 3D Biometrics', 'Socure ID+'],
    amlProviders: ['Chainalysis KYT', 'Unit21 Risk Engine'],
    limits: {
      singleTransactionMaxUsd: 250000,
      dailyVelocityMaxUsd: 1000000,
      monthlyThroughputMaxUsd: 25000000,
      cashPickupMaxUsd: 5000
    },
    regulatoryRequirements: {
      regulatorName: 'FinCEN / OCC / CFPB',
      licenseType: 'MSB / FinCEN Reg #31000192849182',
      reportingCycle: 'instant_event',
      localDataResidencyRequired: false,
      kycTierStrictness: 'tier_2_verified'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: true,
      invoicing: true,
      payroll: true,
      treasury: true,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_gb',
    countryName: 'United Kingdom',
    isoCode: 'GB',
    region: 'Europe',
    primaryCurrency: 'GBP',
    supportedCurrencies: ['GBP', 'EUR', 'USD', 'CHF'],
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'fr'],
    timeZones: ['Europe/London'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'VAT',
      standardRatePercent: 20.0,
      reducedRatePercent: 5.0,
      taxRegistrationNumberFormat: 'GB999999973',
      isWithholdingApplicable: false
    },
    paymentProviders: [
      { providerId: 'prov_faster_pay', providerName: 'UK Faster Payments Service (FPS)', railType: 'instant_payment', supportedCurrencies: ['GBP'], settlementSpeed: '< 3 seconds', isDefault: true },
      { providerId: 'prov_bacs', providerName: 'BACS Direct Debit/Credit', railType: 'ach', supportedCurrencies: ['GBP'], settlementSpeed: '3 business days', isDefault: false },
      { providerId: 'prov_chaps', providerName: 'CHAPS High-Value RTGS', railType: 'rtgs', supportedCurrencies: ['GBP'], settlementSpeed: 'Same Day RTGS', isDefault: false }
    ],
    bankingPartners: ['Barclays Bank UK', 'ClearBank UK', 'NatWest Group'],
    kycProviders: ['Sumsub UK Verification', 'Onfido Biometrics'],
    amlProviders: ['ComplyAdvantage Global AML', 'Elliptic UK'],
    limits: {
      singleTransactionMaxUsd: 150000,
      dailyVelocityMaxUsd: 500000,
      monthlyThroughputMaxUsd: 15000000,
      cashPickupMaxUsd: 3000
    },
    regulatoryRequirements: {
      regulatorName: 'Financial Conduct Authority (FCA UK)',
      licenseType: 'Authorized Electronic Money Institution (AEMI)',
      reportingCycle: 'monthly',
      localDataResidencyRequired: true,
      kycTierStrictness: 'tier_3_enhanced_due_diligence'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: false, // Lending restricted by consumer credit license
      invoicing: true,
      payroll: true,
      treasury: true,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_ae',
    countryName: 'United Arab Emirates',
    isoCode: 'AE',
    region: 'Middle East',
    primaryCurrency: 'AED',
    supportedCurrencies: ['AED', 'USD', 'EUR', 'SAR', 'GBP'],
    primaryLanguage: 'ar',
    supportedLanguages: ['ar', 'en', 'hi'],
    timeZones: ['Asia/Dubai'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'VAT',
      standardRatePercent: 5.0,
      taxRegistrationNumberFormat: '100XXXXXXXXX003 (TRN)',
      isWithholdingApplicable: false
    },
    paymentProviders: [
      { providerId: 'prov_ani', providerName: 'Aani Instant Payment Platform (CBUAE)', railType: 'instant_payment', supportedCurrencies: ['AED'], settlementSpeed: '< 1 second', isDefault: true },
      { providerId: 'prov_uaefts', providerName: 'UAE Funds Transfer System (UAEFTS)', railType: 'rtgs', supportedCurrencies: ['AED', 'USD'], settlementSpeed: 'Real-Time Gross', isDefault: false }
    ],
    bankingPartners: ['First Abu Dhabi Bank (FAB)', 'Emirates NBD', 'Mashreq Bank'],
    kycProviders: ['UAE PASS Digital ID Integration', 'Persona MEA'],
    amlProviders: ['Fircosoft AML / OFAC', 'Chainalysis DIFC'],
    limits: {
      singleTransactionMaxUsd: 500000,
      dailyVelocityMaxUsd: 2000000,
      monthlyThroughputMaxUsd: 50000000,
      cashPickupMaxUsd: 10000
    },
    regulatoryRequirements: {
      regulatorName: 'DFSA / CBUAE / ADGM FSRA',
      licenseType: 'Category 3C / Stored Value Facility',
      reportingCycle: 'monthly',
      localDataResidencyRequired: true,
      kycTierStrictness: 'tier_3_enhanced_due_diligence'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: true,
      invoicing: true,
      payroll: true,
      treasury: true,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_sg',
    countryName: 'Singapore',
    isoCode: 'SG',
    region: 'Asia Pacific',
    primaryCurrency: 'SGD',
    supportedCurrencies: ['SGD', 'USD', 'CNY', 'EUR', 'JPY', 'AUD'],
    primaryLanguage: 'en',
    supportedLanguages: ['en', 'zh'],
    timeZones: ['Asia/Singapore'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'GST',
      standardRatePercent: 9.0,
      taxRegistrationNumberFormat: 'M99999999X (GST Reg)',
      isWithholdingApplicable: false
    },
    paymentProviders: [
      { providerId: 'prov_paynow', providerName: 'PayNow / FAST Instant Rail', railType: 'instant_payment', supportedCurrencies: ['SGD'], settlementSpeed: '< 2 seconds', isDefault: true },
      { providerId: 'prov_mepps', providerName: 'MEPS+ RTGS Singapore', railType: 'rtgs', supportedCurrencies: ['SGD'], settlementSpeed: 'Real-Time', isDefault: false }
    ],
    bankingPartners: ['DBS Bank Singapore', 'OCBC Bank', 'UOB'],
    kycProviders: ['Singpass MyInfo API', 'Veriff APAC'],
    amlProviders: ['ComplyAdvantage Singapore', 'Tookitaki AML'],
    limits: {
      singleTransactionMaxUsd: 200000,
      dailyVelocityMaxUsd: 800000,
      monthlyThroughputMaxUsd: 30000000,
      cashPickupMaxUsd: 5000
    },
    regulatoryRequirements: {
      regulatorName: 'Monetary Authority of Singapore (MAS)',
      licenseType: 'Major Payment Institution (MPI) License',
      reportingCycle: 'monthly',
      localDataResidencyRequired: false,
      kycTierStrictness: 'tier_2_verified'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: true,
      invoicing: true,
      payroll: true,
      treasury: true,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_ke',
    countryName: 'Kenya',
    isoCode: 'KE',
    region: 'Sub-Saharan Africa',
    primaryCurrency: 'KES',
    supportedCurrencies: ['KES', 'USD', 'EUR', 'GBP', 'UGX', 'TZS'],
    primaryLanguage: 'en',
    supportedLanguages: ['en'],
    timeZones: ['Africa/Nairobi'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'VAT',
      standardRatePercent: 16.0,
      taxRegistrationNumberFormat: 'P051234567Z (KRA PIN)',
      isWithholdingApplicable: true
    },
    paymentProviders: [
      { providerId: 'prov_mpesa', providerName: 'Safaricom M-Pesa Daraja B2C/C2B', railType: 'mobile_money', supportedCurrencies: ['KES'], settlementSpeed: '< 1 second', isDefault: true },
      { providerId: 'prov_pesalink', providerName: 'PesaLink Interbank Switch', railType: 'instant_payment', supportedCurrencies: ['KES'], settlementSpeed: '< 5 seconds', isDefault: false }
    ],
    bankingPartners: ['KCB Bank Kenya', 'Equity Bank Group', 'NCBA Bank'],
    kycProviders: ['Smile ID Africa', 'IPRS National ID Registry'],
    amlProviders: ['Finsight AML Africa', 'Refinitiv World-Check'],
    limits: {
      singleTransactionMaxUsd: 15000,
      dailyVelocityMaxUsd: 50000,
      monthlyThroughputMaxUsd: 500000,
      cashPickupMaxUsd: 2500
    },
    regulatoryRequirements: {
      regulatorName: 'Central Bank of Kenya (CBK) / NPS Act',
      licenseType: 'Payment Service Provider (PSP) License',
      reportingCycle: 'daily',
      localDataResidencyRequired: true,
      kycTierStrictness: 'tier_2_verified'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: true,
      invoicing: true,
      payroll: true,
      treasury: false, // Treasury offshore routing
      investments: false,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_br',
    countryName: 'Brazil',
    isoCode: 'BR',
    region: 'Latin America',
    primaryCurrency: 'BRL',
    supportedCurrencies: ['BRL', 'USD', 'EUR'],
    primaryLanguage: 'pt',
    supportedLanguages: ['pt', 'es', 'en'],
    timeZones: ['America/Sao_Paulo'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: ',',
      thousandsSeparator: '.',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'VAT',
      standardRatePercent: 17.5,
      taxRegistrationNumberFormat: 'XX.XXX.XXX/0001-XX (CNPJ)',
      isWithholdingApplicable: true
    },
    paymentProviders: [
      { providerId: 'prov_pix', providerName: 'PIX Central Bank of Brazil Instant', railType: 'instant_payment', supportedCurrencies: ['BRL'], settlementSpeed: '< 1 second (24/7/365)', isDefault: true },
      { providerId: 'prov_ted', providerName: 'TED / DOC Interbank Wire', railType: 'rtgs', supportedCurrencies: ['BRL'], settlementSpeed: 'Same day business hours', isDefault: false }
    ],
    bankingPartners: ['Banco Itaú Unibanco', 'Nubank Partner Core', 'Bradesco'],
    kycProviders: ['Idwall Brazil CPF OCR', 'Unico Biometria Facial'],
    amlProviders: ['LexisNexis LatAm Risk', 'Chainalysis Brazil'],
    limits: {
      singleTransactionMaxUsd: 50000,
      dailyVelocityMaxUsd: 200000,
      monthlyThroughputMaxUsd: 5000000,
      cashPickupMaxUsd: 2000
    },
    regulatoryRequirements: {
      regulatorName: 'Banco Central do Brasil (BCB)',
      licenseType: 'Instituição de Pagamento (IP)',
      reportingCycle: 'monthly',
      localDataResidencyRequired: true,
      kycTierStrictness: 'tier_2_verified'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: true,
      invoicing: true,
      payroll: true,
      treasury: true,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_fr',
    countryName: 'France (Eurozone)',
    isoCode: 'FR',
    region: 'Europe',
    primaryCurrency: 'EUR',
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'CHF'],
    primaryLanguage: 'fr',
    supportedLanguages: ['fr', 'en', 'es', 'ar'],
    timeZones: ['Europe/Paris'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: ',',
      thousandsSeparator: ' ',
      currencyPosition: 'suffix'
    },
    taxConfig: {
      taxType: 'VAT',
      standardRatePercent: 20.0,
      reducedRatePercent: 5.5,
      taxRegistrationNumberFormat: 'FRXX999999999 (TVA)',
      isWithholdingApplicable: false
    },
    paymentProviders: [
      { providerId: 'prov_sepa_inst', providerName: 'SEPA Instant Credit Transfer (SCT Inst)', railType: 'instant_payment', supportedCurrencies: ['EUR'], settlementSpeed: '< 3 seconds', isDefault: true },
      { providerId: 'prov_target2', providerName: 'TARGET2 Euro RTGS', railType: 'rtgs', supportedCurrencies: ['EUR'], settlementSpeed: 'Real-Time Eurozone', isDefault: false }
    ],
    bankingPartners: ['BNP Paribas', 'Société Générale', 'Crédit Agricole'],
    kycProviders: ['Ubble / IDnow France', 'AriadNEXT eID'],
    amlProviders: ['ComplyAdvantage EU', 'Fenergo Regulatory'],
    limits: {
      singleTransactionMaxUsd: 150000,
      dailyVelocityMaxUsd: 600000,
      monthlyThroughputMaxUsd: 15000000,
      cashPickupMaxUsd: 3000
    },
    regulatoryRequirements: {
      regulatorName: 'ACPR / Banque de France',
      licenseType: 'Établissement de Monnaie Électronique (EME)',
      reportingCycle: 'monthly',
      localDataResidencyRequired: true,
      kycTierStrictness: 'tier_3_enhanced_due_diligence'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: false,
      invoicing: true,
      payroll: true,
      treasury: true,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  },
  {
    id: 'cntry_in',
    countryName: 'India',
    isoCode: 'IN',
    region: 'Asia Pacific',
    primaryCurrency: 'INR',
    supportedCurrencies: ['INR', 'USD', 'EUR', 'AED', 'SGD'],
    primaryLanguage: 'hi',
    supportedLanguages: ['hi', 'en'],
    timeZones: ['Asia/Kolkata'],
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencyPosition: 'prefix'
    },
    taxConfig: {
      taxType: 'GST',
      standardRatePercent: 18.0,
      taxRegistrationNumberFormat: '22AAAAA0000A1Z5 (GSTIN)',
      isWithholdingApplicable: true
    },
    paymentProviders: [
      { providerId: 'prov_upi', providerName: 'UPI (Unified Payments Interface / NPCI)', railType: 'instant_payment', supportedCurrencies: ['INR'], settlementSpeed: '< 1 second (24/7)', isDefault: true },
      { providerId: 'prov_imps', providerName: 'IMPS / NEFT / RTGS India', railType: 'instant_payment', supportedCurrencies: ['INR'], settlementSpeed: 'Real-Time Interbank', isDefault: false }
    ],
    bankingPartners: ['HDFC Bank India', 'ICICI Bank', 'State Bank of India'],
    kycProviders: ['Aadhaar eKYC / DigiLocker API', 'HyperVerge AI'],
    amlProviders: ['TCS BaNCS AML', 'Tookitaki FIU-IND'],
    limits: {
      singleTransactionMaxUsd: 12000,
      dailyVelocityMaxUsd: 50000,
      monthlyThroughputMaxUsd: 1000000,
      cashPickupMaxUsd: 1500
    },
    regulatoryRequirements: {
      regulatorName: 'Reserve Bank of India (RBI)',
      licenseType: 'Payment Aggregator (PA) / Prepaid Payment Instrument (PPI)',
      reportingCycle: 'daily',
      localDataResidencyRequired: true,
      kycTierStrictness: 'tier_3_enhanced_due_diligence'
    },
    products: {
      wallet: true,
      payments: true,
      fx: true,
      cards: true,
      lending: true,
      invoicing: true,
      payroll: true,
      treasury: false,
      investments: true,
      marketplaceEscrow: true,
      developerApis: true
    },
    isActive: true
  }
];

export const SEED_I18N_DICTIONARIES: Record<GlobalSupportedLanguage, I18nDictionary> = {
  en: {
    appName: 'OMNI Finance OS',
    tagline: 'Global Sovereign Financial Operating System',
    dashboard: 'Dashboard',
    wallets: 'Wallets & vIBANs',
    sendMoney: 'Send Money',
    receiveMoney: 'Receive Money',
    recentTransactions: 'Recent Transactions',
    exchangeRates: 'Live FX Spot Rates',
    factoring: 'Invoice Factoring',
    payroll: 'Batch Payroll',
    compliance: 'Trust & Compliance',
    security: 'Device Security',
    cards: 'Virtual & Physical Cards',
    settings: 'Settings & Localization',
    balance: 'Available Balance',
    totalAssets: 'Total Liquid Assets',
    quickPay: 'Quick Instant Pay',
    scanQr: 'Scan Payment QR',
    offlineNotice: 'Offline Mode Active: Transactions cached locally for draft verification.',
    aiAdvisor: 'OMNI AI Financial Copilot',
    biometricPrompt: 'Authenticate with FaceID / TouchID'
  },
  fr: {
    appName: 'OMNI Finance OS',
    tagline: 'Système d’exploitation financier souverain mondial',
    dashboard: 'Tableau de bord',
    wallets: 'Portefeuilles et vIBAN',
    sendMoney: 'Envoyer des fonds',
    receiveMoney: 'Recevoir des fonds',
    recentTransactions: 'Transactions récentes',
    exchangeRates: 'Taux de change en direct',
    factoring: 'Affacturage intelligent',
    payroll: 'Paie groupée',
    compliance: 'Conformité et confiance',
    security: 'Sécurité des appareils',
    cards: 'Cartes virtuelles et physiques',
    settings: 'Paramètres et localisation',
    balance: 'Solde disponible',
    totalAssets: 'Actifs liquides totaux',
    quickPay: 'Paiement instantané',
    scanQr: 'Scanner QR Code',
    offlineNotice: 'Mode hors ligne actif: données sécurisées en lecture seule.',
    aiAdvisor: 'Copilote financier OMNI AI',
    biometricPrompt: 'Authentification biométrique requise'
  },
  es: {
    appName: 'OMNI Finance OS',
    tagline: 'Sistema Operativo Financiero Soberano Global',
    dashboard: 'Panel de Control',
    wallets: 'Billeteras y vIBANs',
    sendMoney: 'Enviar Dinero',
    receiveMoney: 'Recibir Dinero',
    recentTransactions: 'Transacciones Recientes',
    exchangeRates: 'Tipos de Cambio en Vivo',
    factoring: 'Factoraje de Facturas',
    payroll: 'Nómina por Lotes',
    compliance: 'Cumplimiento y Confianza',
    security: 'Seguridad del Dispositivo',
    cards: 'Tarjetas Virtuales y Físicas',
    settings: 'Ajustes y Localización',
    balance: 'Saldo Disponible',
    totalAssets: 'Activos Líquidos Totales',
    quickPay: 'Pago Rápido Instantáneo',
    scanQr: 'Escanear Código QR',
    offlineNotice: 'Modo sin conexión activo: datos guardados en borrador seguro.',
    aiAdvisor: 'Copiloto Financiero OMNI AI',
    biometricPrompt: 'Autenticar con FaceID / Huella Dactilar'
  },
  ar: {
    appName: 'نظام أومني المالي العالمي',
    tagline: 'نظام التشغيل المالي السيادي العالمي متعدد العملات',
    dashboard: 'لوحة التحكم',
    wallets: 'المحافظ وحسابات الآيبان',
    sendMoney: 'إرسال الأموال',
    receiveMoney: 'استلام الأموال',
    recentTransactions: 'المعاملات الأخيرة',
    exchangeRates: 'أسعار الصرف الفورية',
    factoring: 'تمويل الفواتير الذكي',
    payroll: 'مسير الرواتب المجمع',
    compliance: 'الامتثال والأمان المالي',
    security: 'أمان الأجهزة المسجلة',
    cards: 'البطاقات الرقمية والمادية',
    settings: 'الإعدادات واللغات',
    balance: 'الرصيد المتاح',
    totalAssets: 'إجمالي الأصول السائلة',
    quickPay: 'الدفع الفوري السريع',
    scanQr: 'مسح رمز الاستجابة السريعة',
    offlineNotice: 'وضع عدم الاتصال مفعل: المعاملات محفوظة محلياً للعرض الآمن.',
    aiAdvisor: 'المساعد المالي الذكي أومني',
    biometricPrompt: 'يرجى تأكيد الهوية بالبصمة أو الوجه'
  },
  pt: {
    appName: 'OMNI Finance OS',
    tagline: 'Sistema Operacional Financeiro Soberano Global',
    dashboard: 'Painel Principal',
    wallets: 'Carteiras e vIBANs',
    sendMoney: 'Enviar Dinheiro',
    receiveMoney: 'Receber Dinheiro',
    recentTransactions: 'Transações Recentes',
    exchangeRates: 'Câmbio em Tempo Real',
    factoring: 'Antecipação de Recebíveis',
    payroll: 'Folha de Pagamento em Lote',
    compliance: 'Conformidade e Confiança',
    security: 'Segurança de Dispositivos',
    cards: 'Cartões Virtuais e Físicos',
    settings: 'Configurações e Idioma',
    balance: 'Saldo Disponível',
    totalAssets: 'Ativos Líquidos Totais',
    quickPay: 'PIX / Pagamento Instantâneo',
    scanQr: 'Ler QR Code PIX',
    offlineNotice: 'Modo offline ativo: dados armazenados com segurança local.',
    aiAdvisor: 'Copiloto Financeiro OMNI AI',
    biometricPrompt: 'Autenticar com Biometria Facial'
  },
  zh: {
    appName: 'OMNI 全球主权金融操作系统',
    tagline: '全球多币种、多清算轨道主权金融核心平台',
    dashboard: '主控制台',
    wallets: '多币种钱包与虚拟账户',
    sendMoney: '即时转账',
    receiveMoney: '收款管理',
    recentTransactions: '近期交易记录',
    exchangeRates: '实时外汇现汇牌价',
    factoring: '智能应收账款保理',
    payroll: '批量薪资代发',
    compliance: '合规与反洗钱风控',
    security: '授权设备与会话安全',
    cards: '实体卡与虚拟借记卡',
    settings: '系统设置与本地化',
    balance: '可用流动余额',
    totalAssets: '流动资产总估值',
    quickPay: '极速转账',
    scanQr: '扫描支付二维码',
    offlineNotice: '离线安全模式已激活：交易草稿本地加密存储。',
    aiAdvisor: 'OMNI AI 智能金融副驾',
    biometricPrompt: '请使用生物识别（指纹/面容）验证'
  },
  hi: {
    appName: 'OMNI फाइनेंस ऑपरेटिंग सिस्टम',
    tagline: 'वैश्विक संप्रभु वित्तीय मंच (ग्लोबल मल्टी-रेल)',
    dashboard: 'डैशबोर्ड',
    wallets: 'वॉलेट्स और बैंक खाते',
    sendMoney: 'पैसे भेजें (UPI / IMPS)',
    receiveMoney: 'पैसे प्राप्त करें',
    recentTransactions: 'हाल के लेनदेन',
    exchangeRates: 'लाइव विदेशी मुद्रा दरें',
    factoring: 'इनवॉइस डिस्काउंटिंग',
    payroll: 'वेतन भुगतान (पेरोल)',
    compliance: 'अनुपालन और सुरक्षा',
    security: 'डिवाइस सुरक्षा',
    cards: 'डेबिट और क्रेडिट कार्ड्स',
    settings: 'सेटिंग्स और भाषा',
    balance: 'उपलब्ध शेष राशि',
    totalAssets: 'कुल तरल संपत्ति',
    quickPay: 'तुरंत यूपीआई भुगतान',
    scanQr: 'क्यूआर कोड स्कैन करें',
    offlineNotice: 'ऑफलाइन मोड सक्रिय: सुरक्षित स्थानीय डेटा।',
    aiAdvisor: 'OMNI AI वित्तीय सलाहकार',
    biometricPrompt: 'बायोमेट्रिक प्रमाणीकरण आवश्यक'
  }
};

export const SEED_REGISTERED_DEVICES: RegisteredUserDevice[] = [
  {
    id: 'dev_iphone_16_pro',
    deviceName: 'iPhone 16 Pro Max',
    deviceType: 'mobile_ios',
    browserOrApp: 'OMNI Mobile Native PWA v4.8.2',
    ipAddress: '198.51.100.42',
    ipLocation: 'London, United Kingdom (FCA Jurisdiction)',
    lastActive: 'Just now (Active Session)',
    isTrusted: true,
    isCurrentDevice: true,
    biometricsEnrolled: true,
    riskScore: 2
  },
  {
    id: 'dev_macbook_m3',
    deviceName: 'MacBook Pro 16" (M3 Max)',
    deviceType: 'desktop_mac',
    browserOrApp: 'Chrome 128.0.6613.119 (macOS)',
    ipAddress: '198.51.100.42',
    ipLocation: 'London, United Kingdom',
    lastActive: '24 minutes ago',
    isTrusted: true,
    isCurrentDevice: false,
    biometricsEnrolled: true,
    riskScore: 4
  },
  {
    id: 'dev_galaxy_s24',
    deviceName: 'Samsung Galaxy S24 Ultra',
    deviceType: 'mobile_android',
    browserOrApp: 'OMNI Android Enterprise v4.8.1',
    ipAddress: '203.0.113.88',
    ipLocation: 'Dubai, United Arab Emirates',
    lastActive: '3 days ago',
    isTrusted: true,
    isCurrentDevice: false,
    biometricsEnrolled: true,
    riskScore: 12
  }
];

export const SEED_ACADEMY_MODULES: FinanceAcademyModule[] = [
  {
    id: 'acad_01',
    title: 'Emergency Liquidity & High-Yield Vault Optimization',
    category: 'budgeting',
    estimatedMinutes: 6,
    difficulty: 'Beginner',
    summary: 'Master the 50/30/20 treasury discipline and automate daily surplus sweeps into 4.85% yield vaults.',
    contentMarkdown: `### The Sovereign Liquidity Engine\n1. **3-Tier Emergency Ladder:** Separate operating cash (1 month), short-term reserves (3 months in sovereign vaults), and long-term liquidity.\n2. **Automated Sweep Triggers:** Set target operating floats so any excess cash automatically earns compound yields.\n3. **Zero-Penalty Withdrawals:** Keep your liquidity instantly accessible via FedNow and FPS rails.`,
    quizQuestionsCount: 3,
    completed: true
  },
  {
    id: 'acad_02',
    title: 'Smart Factoring & B2B Working Capital Financing',
    category: 'business_finance',
    estimatedMinutes: 8,
    difficulty: 'Intermediate',
    summary: 'How fast-growing companies unlock up to 90% immediate liquidity on issued invoices without waiting 60 days.',
    contentMarkdown: `### Invoice Discounting vs Traditional Bank Debt\n- **Non-Recourse Factoring:** OMNI Finance assumes credit risk of prime counterparties.\n- **Instant Disbursement:** Invoices underwritten by OMNI AI are deposited within 4 seconds.\n- **Margin Preservation:** Keep customer relationships intact while eliminating cashflow bottlenecks.`,
    quizQuestionsCount: 4,
    completed: false
  },
  {
    id: 'acad_03',
    title: 'Cross-Border FX Hedging & Spot Lock Arbitrage',
    category: 'payments_fx',
    estimatedMinutes: 10,
    difficulty: 'Advanced',
    summary: 'Mitigate currency volatility across USD, EUR, GBP, AED, and KES using 60-second spot rate locks and forward corridor hedging.',
    contentMarkdown: `### Protecting Sovereign Multi-Currency Balances\n1. **Corridor Volatility Index:** Monitor real-time tick feeds from LMAX and Wise liquidity pools.\n2. **60-Second Guaranteed Rate Lock:** Eliminate slippage during high-value institutional settlement.\n3. **Natural Bilateral Netting:** Offset supplier liabilities in EUR against incoming EUR customer receivables to avoid unnecessary conversion fees.`,
    quizQuestionsCount: 5,
    completed: false
  },
  {
    id: 'acad_04',
    title: 'Cyber Defense: Anti-Phishing, SIM Swaps & Hardware Keys',
    category: 'security_fraud',
    estimatedMinutes: 5,
    difficulty: 'Beginner',
    summary: 'Protect your financial credentials against sophisticated social engineering, SIM-swap attacks, and rogue device enrollment.',
    contentMarkdown: `### Zero-Trust Device Security Protocol\n- **WebAuthn FIDO2 Keys:** Never rely solely on SMS OTPs for high-value wire authorization.\n- **Geographic Anomaly Radar:** How OMNI Fraud Radar intercepts impossible travel logins.\n- **Remote Killswitch:** Instantly terminate all active sessions and rotate cryptographic device tokens in one tap.`,
    quizQuestionsCount: 3,
    completed: true
  }
];

export const SEED_GLOBAL_NOTIFICATIONS: GlobalNotificationItem[] = [
  {
    id: 'notif_01',
    channel: 'whatsapp',
    type: 'payment',
    title: 'Instant FedNow Wire Received',
    message: 'You have received $24,500.00 USD from Meridian Capital Partners via FedNow Instant rail.',
    timestamp: '10 mins ago',
    read: false,
    priority: 'high',
    actionUrl: '/finance/payments'
  },
  {
    id: 'notif_02',
    channel: 'push',
    type: 'approval',
    title: 'Dual-Signoff Required (> $25,000)',
    message: 'Treasury batch wire #TB-2026-9018 for $120,000.00 EUR requires your executive signature.',
    timestamp: '1 hour ago',
    read: false,
    priority: 'critical',
    actionUrl: '/finance/enterprise'
  },
  {
    id: 'notif_03',
    channel: 'sms',
    type: 'security',
    title: 'New Device Login Verified',
    message: 'New login from iPhone 16 Pro Max in London, UK verified via FaceID biometric token.',
    timestamp: '3 hours ago',
    read: true,
    priority: 'medium'
  },
  {
    id: 'notif_04',
    channel: 'email',
    type: 'invoice',
    title: 'Smart Factoring Advance Credited',
    message: 'Invoice #INV-2026-4019 advance of $405,000.00 USD has cleared into your primary vault.',
    timestamp: '5 hours ago',
    read: true,
    priority: 'low'
  }
];

export const DEFAULT_USER_PERSONALIZATION: UserPersonalizationSettings = {
  language: 'en',
  activeCountryCode: 'US',
  highContrastMode: false,
  textScale: 100,
  reducedMotion: false,
  screenReaderOptimized: false,
  biometricLoginEnabled: true,
  offlineCacheEnabled: true,
  aiPersonalization: {
    suggestCashflowInsights: true,
    autoCategorizeTransactions: true,
    highlightTaxDeductions: true,
    riskAlertSensitivity: 'balanced'
  },
  notificationChannels: {
    push: true,
    email: true,
    sms: true,
    whatsapp: true,
    inApp: true
  }
};
