import {
  OmniMarketProduct,
  OmniSellerProfile,
  ProductReview,
  ProductCouponOffer,
  OmniProductComparisonMatrix,
  OmniPayOrder,
  OmniPayMethod,
  OmniCartItem,
  OmniAffiliateLink,
  OmniAffiliateStats,
  OmniAffiliateCoupon,
  OmniShoppingAiRecommendation,
  ProductCategory
} from '../../types/commerce_market';
import { omniAiSdk } from '../omni-ai-sdk';

// Seed sovereign products
const INITIAL_PRODUCTS: OmniMarketProduct[] = [
  {
    id: 'prod_neural_tpu_v4',
    title: 'OMNI Neural Enclave Accelerator V4 (128 TOPS)',
    subtitle: 'Local zero-telemetry LLM inference & quantized model acceleration PCIe/USB-C',
    description: 'Hardware neural processor designed exclusively for sovereign offline inference. Supports Llama 3, Mistral, and DeepSeek with hardware-enforced prompt sandboxing and zero memory leakage.',
    category: 'neural_hardware',
    tags: ['AI Hardware', 'Local Inference', 'Sovereign TPU', 'Zero Telemetry', 'PCIe Gen 5'],
    brand: 'OMNI Silicon Labs',
    price: 649.00,
    originalPrice: 799.00,
    currency: 'USD',
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 342,
    inStock: true,
    stockQuantity: 48,
    images: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Compute', name: 'INT8 Inference', value: '128 TOPS' },
      { category: 'Compute', name: 'FP16 Throughput', value: '64 TFLOPS' },
      { category: 'Memory', name: 'Dedicated Unified VRAM', value: '32GB LPDDR5X (8533 MT/s)' },
      { category: 'Interface', name: 'Host Connection', value: 'PCIe 5.0 x8 / Dual USB4 40Gbps' },
      { category: 'Power', name: 'TDP Efficiency', value: '35W Dynamic' },
      { category: 'Security', name: 'Cryptographic Enclave', value: 'Hardware TPM 2.0 + Ed25519 Root of Trust' }
    ],
    keyFeatures: [
      'Runs 70B parameter quantized models at 38 tokens/sec completely offline',
      'Hardware-isolated memory partitions prevent prompt injection extraction',
      'Plug-and-play OMNI OS neural runtime driver included',
      'Sub-50ms cold-start tensor execution'
    ],
    pros: [
      'Unrivaled local inference speed for private LLMs',
      'Low 35W power draw enables quiet fanless operation',
      'Cryptographic multi-tenant memory fencing'
    ],
    cons: [
      'High upfront investment for hobbyists',
      'Requires USB4 or PCIe slot for full bandwidth'
    ],
    isSponsored: false,
    isAffiliate: true,
    affiliateCommissionRate: 8.0,
    sellerId: 'seller_omni_silicon',
    sellerName: 'OMNI Official Hardware Foundry',
    sellerTrustScore: 99,
    sellerVerified: true,
    sellerLocation: 'Geneva Sovereign Node (CH)',
    shippingInfo: {
      fee: 0,
      estimatedDays: '1-2 business days',
      freeShippingMin: 0,
      sovereignFastShipping: true
    },
    warrantyMonths: 36,
    returnPolicyDays: 30,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-05-15', price: 799.00, seller: 'OMNI Official' },
      { date: '2026-06-20', price: 749.00, seller: 'OMNI Official', isSale: true },
      { date: '2026-07-10', price: 749.00, seller: 'OMNI Official' },
      { date: '2026-08-01', price: 649.00, seller: 'OMNI Official', isSale: true }
    ]
  },
  {
    id: 'prod_sovereign_key_pro',
    title: 'Aegis Quantum-Resistant FIDO3 Hardware Security Key',
    subtitle: 'NIST PQC ML-KEM / ML-DSA Dual-Chip Passkey & Crypto Authenticator',
    description: 'Ultra-durable titanium FIDO3 security key featuring post-quantum cryptographic algorithms. Provides seamless biometric tap-to-sign across OMNI Browser, Passports, and WebAuthn with anti-tamper self-destruct circuits.',
    category: 'sovereign_security',
    tags: ['FIDO3', 'Post-Quantum', 'Security Key', 'Titanium', 'Passkey'],
    brand: 'Aegis Cryptosec',
    price: 119.00,
    originalPrice: 149.00,
    currency: 'USD',
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 890,
    inStock: true,
    stockQuantity: 210,
    images: [
      'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Cryptography', name: 'Post-Quantum Algorithms', value: 'NIST ML-KEM-768 & ML-DSA-65' },
      { category: 'Standards', name: 'Authentication Protocols', value: 'FIDO2.2, FIDO3, WebAuthn, PIV, OpenPGP' },
      { category: 'Hardware', name: 'Enclosure Material', value: 'Grade 5 Anodized Titanium (IP68 Submersible)' },
      { category: 'Biometrics', name: 'Fingerprint Sensor', value: '508 DPI Capacitive Match-on-Chip' },
      { category: 'Connectivity', name: 'Ports', value: 'NFC Contactless + USB-C Reversible' }
    ],
    keyFeatures: [
      'Immune to quantum computing decryption Shor attacks',
      'Zero battery required (harvests energy via NFC or USB)',
      'Direct hardware signing integration with OMNI Passwords Vault'
    ],
    pros: [
      'Extremely durable titanium construction',
      'Instant fingerprint unlock under 150ms',
      'Future-proof post-quantum cryptographic certification'
    ],
    cons: [
      'Slightly thicker than standard aluminum keys'
    ],
    isSponsored: true,
    sponsoredDetails: {
      campaignName: 'Aegis Global Security Launch',
      sponsorName: 'Aegis Cryptosec AG',
      disclosureText: 'Promoted partner result: Aegis pays an auction CPC to be highlighted in hardware security searches. Ranked #1 based on 99% buyer satisfaction & strict security certification.',
      badge: 'Sponsored',
      bidAmountPerClickUsd: 1.25,
      transparencyAuditHash: '0x8f2c38b291d90a78912e77bfa39821'
    },
    isAffiliate: true,
    affiliateCommissionRate: 12.0,
    sellerId: 'seller_aegis_sec',
    sellerName: 'Aegis Cryptosec AG',
    sellerTrustScore: 98,
    sellerVerified: true,
    sellerLocation: 'Zurich Vault Enclave',
    shippingInfo: {
      fee: 0,
      estimatedDays: '2-3 business days',
      freeShippingMin: 50,
      sovereignFastShipping: true
    },
    warrantyMonths: 60,
    returnPolicyDays: 45,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-04-01', price: 149.00, seller: 'Aegis Direct' },
      { date: '2026-06-01', price: 139.00, seller: 'Aegis Direct' },
      { date: '2026-08-01', price: 119.00, seller: 'Aegis Direct', isSale: true }
    ]
  },
  {
    id: 'prod_dev_rig_hyper_x',
    title: 'OMNI Workstation Pro: 64-Core ARM v9.3 Developer Rig',
    subtitle: 'Silent liquid-cooled Linux/OMNI OS workstation with 128GB ECC RAM & 4TB NVMe',
    description: 'Engineered for full-stack developers, AI researchers, and sovereign node operators. Features hardware virtualization with native microVM sandboxing for instant compile times.',
    category: 'developer_rigs',
    tags: ['Workstation', 'ARM v9', '64-Core', '128GB RAM', 'Liquid Cooled', 'Linux Native'],
    brand: 'OMNI Systems',
    price: 2899.00,
    originalPrice: 3299.00,
    currency: 'USD',
    discountPercentage: 12,
    rating: 4.95,
    reviewCount: 178,
    inStock: true,
    stockQuantity: 15,
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Processor', name: 'CPU Architecture', value: '64-Core OMNI Neoverse ARM v9.3 (3.8 GHz Boost)' },
      { category: 'Memory', name: 'System RAM', value: '128GB Quad-Channel ECC DDR5 (6400 MT/s)' },
      { category: 'Storage', name: 'Primary Drive', value: '4TB Gen5 NVMe SSD (14,500 MB/s Read)' },
      { category: 'Networking', name: 'Ethernet', value: 'Dual 10GbE SFP+ & Wi-Fi 7 Sovereign Mesh' },
      { category: 'Noise & Thermals', name: 'Acoustic Rating', value: '< 18 dBA at 100% sustained compute load' }
    ],
    keyFeatures: [
      'Compiles Chromium and Linux kernel in under 110 seconds',
      'Integrated Spanner Node and Cloud Run micro-container runner',
      'Zero background telemetry OS pre-installed'
    ],
    pros: [
      'Blazing fast multi-threaded compilation',
      'Whisper quiet acoustic profile even under heavy load',
      'Enterprise ECC memory prevents bit-flips'
    ],
    cons: [
      'Heavy chassis (14.2 kg)',
      'Requires 850W power supply outlet'
    ],
    isSponsored: false,
    isAffiliate: true,
    affiliateCommissionRate: 5.0,
    sellerId: 'seller_omni_silicon',
    sellerName: 'OMNI Official Hardware Foundry',
    sellerTrustScore: 99,
    sellerVerified: true,
    sellerLocation: 'Geneva Sovereign Node (CH)',
    shippingInfo: {
      fee: 0,
      estimatedDays: '3-4 business days (White Glove Express)',
      freeShippingMin: 0,
      sovereignFastShipping: true
    },
    warrantyMonths: 36,
    returnPolicyDays: 30,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-03-01', price: 3499.00, seller: 'OMNI Systems' },
      { date: '2026-05-15', price: 3299.00, seller: 'OMNI Systems' },
      { date: '2026-08-01', price: 2899.00, seller: 'OMNI Systems', isSale: true }
    ]
  },
  {
    id: 'prod_cloud_appliance_node',
    title: 'Sovereign Cloud Pod: 16-Bay ZFS Encrypted Storage Enclave',
    subtitle: 'Private self-hosted cloud appliance with hardware AES-XTS-512 cryptographic accelerator',
    description: 'Replace proprietary AWS/Google Cloud storage with an on-premises sovereign cloud pod. Full automatic remote backup over peer-to-peer WireGuard mesh with zero monthly subscription fees.',
    category: 'cloud_appliances',
    tags: ['ZFS', 'Private Cloud', 'NAS', '16-Bay', 'P2P Mesh', 'Zero Subscription'],
    brand: 'CypherVault Storage',
    price: 1450.00,
    originalPrice: 1699.00,
    currency: 'USD',
    discountPercentage: 14,
    rating: 4.75,
    reviewCount: 215,
    inStock: true,
    stockQuantity: 28,
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Storage Capacity', name: 'Drive Bays', value: '16x Hot-Swappable SATA/SAS/U.2 NVMe (Up to 384TB)' },
      { category: 'Controller', name: 'RAID Engine', value: 'Hardware ZFS-Z2 with 64GB ECC Read Cache' },
      { category: 'Throughput', name: 'Network Ports', value: '2x 25GbE SFP28 Optical Uplinks' },
      { category: 'Power Redundancy', name: 'PSU', value: 'Dual Hot-Swap 550W 80+ Platinum' }
    ],
    keyFeatures: [
      '100% self-hosted zero-trust file sync and photos vault',
      'Automated snapshots with cryptographically immutable ransomware locks',
      'Native OMNI Workspace Files app sync integration'
    ],
    pros: [
      'Massive 384TB theoretical storage density',
      'Zero recurring SaaS storage fees forever',
      'Dual 25GbE network links'
    ],
    cons: [
      'Hard drives sold separately',
      'Requires rack mount or dedicated server cabinet'
    ],
    isSponsored: false,
    isAffiliate: true,
    affiliateCommissionRate: 7.5,
    sellerId: 'seller_cyphervault',
    sellerName: 'CypherVault Decentralized Systems',
    sellerTrustScore: 96,
    sellerVerified: true,
    sellerLocation: 'Reykjavik Geothermal Data Enclave (IS)',
    shippingInfo: {
      fee: 25,
      estimatedDays: '3-5 business days',
      freeShippingMin: 2000,
      sovereignFastShipping: false
    },
    warrantyMonths: 24,
    returnPolicyDays: 30,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-04-10', price: 1699.00, seller: 'CypherVault' },
      { date: '2026-06-15', price: 1550.00, seller: 'CypherVault' },
      { date: '2026-08-01', price: 1450.00, seller: 'CypherVault', isSale: true }
    ]
  },
  {
    id: 'prod_smart_enclave_router',
    title: 'OMNI Sovereign Mesh Router X9 (Wi-Fi 7 + Tor/WireGuard Relay)',
    subtitle: 'Quad-band tri-radio router with hardware Deep Packet Inspection firewall & DNS-over-HTTPS',
    description: 'Sovereign home and enterprise gateway router. Automatically filters all trackers, IoT spyware, and telemetry packets before they leave your local network.',
    category: 'smart_enclaves',
    tags: ['Wi-Fi 7', 'Router', 'Tor Gateway', 'WireGuard', 'Firewall', 'Privacy'],
    brand: 'OMNI Silicon Labs',
    price: 349.00,
    originalPrice: 399.00,
    currency: 'USD',
    discountPercentage: 12,
    rating: 4.88,
    reviewCount: 512,
    inStock: true,
    stockQuantity: 95,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Wireless', name: 'Wi-Fi Standard', value: 'Wi-Fi 7 (802.11be) 320MHz Channels' },
      { category: 'Speed', name: 'Aggregated Throughput', value: '19.4 Gbps Combined Tri-Band' },
      { category: 'Ports', name: 'Wired Ports', value: '1x 10GbE WAN + 4x 2.5GbE LAN + 1x USB 3.2' },
      { category: 'Processor', name: 'Firewall CPU', value: 'Quad-Core ARM Cortex-A78 (2.2 GHz) + Hardware NPU' }
    ],
    keyFeatures: [
      'Blocks 1.2M known ad, telemetry, and tracking domains at line speed',
      '1-click VPN routing per device or whole-house tunnel',
      'Cryptographic guest isolation network'
    ],
    pros: [
      'Flawless 10Gbps WAN routing with zero packet loss',
      'Built-in OMNI Privacy Shield synchronizer',
      'Intuitive web management dashboard with real-time spectrum analysis'
    ],
    cons: [
      'Larger desktop footprint with 8 high-gain antennas'
    ],
    isSponsored: false,
    isAffiliate: true,
    affiliateCommissionRate: 9.0,
    sellerId: 'seller_omni_silicon',
    sellerName: 'OMNI Official Hardware Foundry',
    sellerTrustScore: 99,
    sellerVerified: true,
    sellerLocation: 'Geneva Sovereign Node (CH)',
    shippingInfo: {
      fee: 0,
      estimatedDays: '1-2 business days',
      freeShippingMin: 0,
      sovereignFastShipping: true
    },
    warrantyMonths: 36,
    returnPolicyDays: 30,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-03-01', price: 399.00, seller: 'OMNI Official' },
      { date: '2026-06-01', price: 379.00, seller: 'OMNI Official' },
      { date: '2026-08-01', price: 349.00, seller: 'OMNI Official', isSale: true }
    ]
  },
  {
    id: 'prod_neural_haptic_ring',
    title: 'Nexus Biometric Sovereign Ring Gen 3 (Titanium + Sleep/ECG)',
    subtitle: 'Zero-cloud health & cryptographic authorization wearable with 10-day battery life',
    description: 'Health and biometric authentication ring. Stores all your biometric health metrics in on-ring encrypted storage without streaming your heart rate or sleep data to advertising trackers.',
    category: 'wearables',
    tags: ['Smart Ring', 'Biometrics', 'Titanium', 'Sleep Tracker', 'ECG', 'Zero Cloud'],
    brand: 'Nexus Wearables',
    price: 279.00,
    originalPrice: 320.00,
    currency: 'USD',
    discountPercentage: 13,
    rating: 4.7,
    reviewCount: 630,
    inStock: true,
    stockQuantity: 62,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Sensors', name: 'Health Telemetry', value: 'Optical PPG (Heart Rate + HRV), Skin Temp, 3D Accelerometer' },
      { category: 'Security', name: 'Biometric Auth', value: 'ECG Pattern Biometric ID + NFC Passkey' },
      { category: 'Battery', name: 'Battery Endurance', value: 'Up to 10 days on single wireless charge (45 min charge)' },
      { category: 'Durability', name: 'Water Resistance', value: '100m / 10 ATM Submersible Titanium' }
    ],
    keyFeatures: [
      'Unlock OMNI Browser & Vault with a simple finger tap',
      'Continuous HRV, sleep stage, and stress monitoring',
      'Zero third-party cloud synchronization or data harvesting'
    ],
    pros: [
      'Lightweight comfortable titanium band (4.2g)',
      'True 10-day battery life',
      '100% private local analytics'
    ],
    cons: [
      'Requires sizing kit before order finalization'
    ],
    isSponsored: true,
    sponsoredDetails: {
      campaignName: 'Nexus Wearable Global Expansion',
      sponsorName: 'Nexus Wearables Ltd',
      disclosureText: 'Promoted partner listing: Nexus pays a placement fee to appear in featured wearable results. Verified independently for zero-cloud privacy compliance.',
      badge: 'Promoted',
      bidAmountPerClickUsd: 0.95,
      transparencyAuditHash: '0x3918a9be1288c0018f2190bbca8831'
    },
    isAffiliate: true,
    affiliateCommissionRate: 10.0,
    sellerId: 'seller_nexus',
    sellerName: 'Nexus Wearables Official',
    sellerTrustScore: 97,
    sellerVerified: true,
    sellerLocation: 'Helsinki Tech Hub',
    shippingInfo: {
      fee: 0,
      estimatedDays: '2-4 business days',
      freeShippingMin: 100,
      sovereignFastShipping: true
    },
    warrantyMonths: 24,
    returnPolicyDays: 30,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-05-01', price: 320.00, seller: 'Nexus' },
      { date: '2026-07-01', price: 299.00, seller: 'Nexus' },
      { date: '2026-08-01', price: 279.00, seller: 'Nexus', isSale: true }
    ]
  },
  {
    id: 'prod_dev_periph_mech_kb',
    title: 'Kinesis Sovereign 75 Split Ergonomic Ortholinear Keyboard',
    subtitle: 'Hot-swappable magnetic Hall Effect switches with QMK/VIA sovereign open-source firmware',
    description: 'Precision mechanical keyboard engineered for high-velocity coding and zero wrist fatigue. Features rapid trigger magnetic switches and aluminum unibody case.',
    category: 'peripherals',
    tags: ['Mechanical Keyboard', 'Ergonomic', 'Hall Effect', 'Split', 'QMK', 'Developer'],
    brand: 'Kinesis Open Labs',
    price: 199.00,
    originalPrice: 249.00,
    currency: 'USD',
    discountPercentage: 20,
    rating: 4.92,
    reviewCount: 420,
    inStock: true,
    stockQuantity: 74,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    specifications: [
      { category: 'Switches', name: 'Switch Technology', value: 'Magnetic Hall Effect with 0.1mm - 4.0mm adjustable actuation' },
      { category: 'Firmware', name: 'Programmability', value: '100% Open Source QMK & VIA (Zero proprietary cloud drivers)' },
      { category: 'Construction', name: 'Body Material', value: 'CNC 6063 Aluminum with Sound-Dampening Gaskets' },
      { category: 'Connectivity', name: 'Modes', value: 'USB-C Detachable Braided (8000 Hz Polling Rate)' }
    ],
    keyFeatures: [
      'Ultra-low 0.125ms input latency for instant keystrokes',
      'On-board flash storage saves up to 16 profiles locally',
      'PBT dye-sublimated spherical keycaps'
    ],
    pros: [
      'Exceptional typing feel and deep acoustic thock',
      'No background driver software required to customize',
      'Magnetic rapid trigger boosts coding flow speed'
    ],
    cons: [
      'Ortholinear layout requires 2-3 days of muscle adaptation'
    ],
    isSponsored: false,
    isAffiliate: true,
    affiliateCommissionRate: 11.0,
    sellerId: 'seller_kinesis',
    sellerName: 'Kinesis Ergonomic Gear',
    sellerTrustScore: 98,
    sellerVerified: true,
    sellerLocation: 'Berlin Maker Node',
    shippingInfo: {
      fee: 0,
      estimatedDays: '2-3 business days',
      freeShippingMin: 50,
      sovereignFastShipping: true
    },
    warrantyMonths: 24,
    returnPolicyDays: 30,
    escrowProtected: true,
    priceHistory: [
      { date: '2026-04-15', price: 249.00, seller: 'Kinesis' },
      { date: '2026-06-20', price: 229.00, seller: 'Kinesis' },
      { date: '2026-08-01', price: 199.00, seller: 'Kinesis', isSale: true }
    ]
  }
];

// Seed sovereign seller profiles
const INITIAL_SELLERS: Record<string, OmniSellerProfile> = {
  'seller_omni_silicon': {
    id: 'seller_omni_silicon',
    storeName: 'OMNI Official Hardware Foundry',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    description: 'The premier sovereign hardware engineering foundry. Building custom neural silicon, ARM workstations, and cryptographic security nodes with zero proprietary telemetry.',
    verifiedBadge: true,
    trustScore: 99,
    totalSalesCount: 14280,
    positiveReviewPercent: 99.4,
    memberSince: 'January 2024',
    sovereignNodeLocation: 'Geneva Sovereign Node (CH)',
    avgResponseTimeMinutes: 12,
    escrowComplianceScore: 100,
    returnPolicy: '30-day money-back guarantee with zero restocking fee. Free prepaid returns.',
    warrantyPolicy: '36-month full advance replacement warranty backed by cryptographic hardware serial number.',
    categories: ['neural_hardware', 'developer_rigs', 'smart_enclaves'],
    badges: ['Foundry Direct', '100% Escrow Compliance', 'Next-Day Dispatch', 'Sovereign Certified'],
    activeProductsCount: 8
  },
  'seller_aegis_sec': {
    id: 'seller_aegis_sec',
    storeName: 'Aegis Cryptosec AG',
    logo: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1200&q=80',
    description: 'Post-quantum cryptographic hardware lab developing military-grade FIDO3 tokens and physical security enclaves.',
    verifiedBadge: true,
    trustScore: 98,
    totalSalesCount: 32400,
    positiveReviewPercent: 98.9,
    memberSince: 'March 2024',
    sovereignNodeLocation: 'Zurich Vault Enclave (CH)',
    avgResponseTimeMinutes: 18,
    escrowComplianceScore: 99,
    returnPolicy: '45-day testing window. If not 100% satisfied, full refund upon cryptographic wipe verification.',
    warrantyPolicy: '60-month lifetime hardware integrity guarantee.',
    categories: ['sovereign_security'],
    badges: ['NIST PQC Verified', 'Titanium Certified', 'Top Rated Security Lab'],
    activeProductsCount: 4
  },
  'seller_cyphervault': {
    id: 'seller_cyphervault',
    storeName: 'CypherVault Decentralized Systems',
    logo: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    description: 'Self-hosted ZFS cloud storage pods and high-throughput optical networking appliances powered by 100% renewable energy.',
    verifiedBadge: true,
    trustScore: 96,
    totalSalesCount: 4920,
    positiveReviewPercent: 97.2,
    memberSince: 'July 2024',
    sovereignNodeLocation: 'Reykjavik Geothermal Data Enclave (IS)',
    avgResponseTimeMinutes: 35,
    escrowComplianceScore: 98,
    returnPolicy: '30-day trial with full return support.',
    warrantyPolicy: '24-month comprehensive hardware replacement.',
    categories: ['cloud_appliances'],
    badges: ['Green Energy Powered', 'ZFS Certified', 'Zero Cloud Leakage'],
    activeProductsCount: 6
  },
  'seller_nexus': {
    id: 'seller_nexus',
    storeName: 'Nexus Wearables Official',
    logo: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80',
    description: 'Designing elegant biometric wearables that process health intelligence locally on-device without corporate surveillance.',
    verifiedBadge: true,
    trustScore: 97,
    totalSalesCount: 18900,
    positiveReviewPercent: 96.8,
    memberSince: 'October 2024',
    sovereignNodeLocation: 'Helsinki Tech Hub (FI)',
    avgResponseTimeMinutes: 25,
    escrowComplianceScore: 97,
    returnPolicy: '30-day size exchange & full refund policy.',
    warrantyPolicy: '24-month battery and sensor health warranty.',
    categories: ['wearables'],
    badges: ['Privacy First Health', 'Titanium Build', 'Top Wearable 2026'],
    activeProductsCount: 3
  },
  'seller_kinesis': {
    id: 'seller_kinesis',
    storeName: 'Kinesis Ergonomic Gear',
    logo: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke developer input hardware, split ortholinear keyboards, and magnetic Hall Effect switches.',
    verifiedBadge: true,
    trustScore: 98,
    totalSalesCount: 8400,
    positiveReviewPercent: 99.1,
    memberSince: 'November 2024',
    sovereignNodeLocation: 'Berlin Maker Node (DE)',
    avgResponseTimeMinutes: 15,
    escrowComplianceScore: 99,
    returnPolicy: '30-day ergonomic satisfaction guarantee.',
    warrantyPolicy: '24-month switch and PCB warranty.',
    categories: ['peripherals'],
    badges: ['Open Source QMK', 'Hall Effect Innovator', 'Zero Bloatware'],
    activeProductsCount: 5
  }
};

// Seed reviews
const INITIAL_REVIEWS: Record<string, ProductReview[]> = {
  'prod_neural_tpu_v4': [
    {
      id: 'rev_tpu_1',
      productId: 'prod_neural_tpu_v4',
      authorName: 'Dr. Evelyn Vance',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      authorBadge: 'AI Researcher',
      rating: 5,
      title: 'Revolutionary local inference speeds for 70B models',
      content: 'I replaced my cloud GPU cluster subscription with this single PCIe accelerator. Running DeepSeek and Llama 3 locally at 38 tokens/second with 35W draw is miraculous. The hardware memory enclave completely solves our institutional compliance issues.',
      verifiedPurchase: true,
      date: '2026-08-10',
      helpfulVotes: 48,
      unhelpfulVotes: 1,
      sentiment: 'positive',
      botLikelihoodScore: 2,
      keyPraiseOrComplaint: ['Extreme inference speed', 'Low power draw', 'Zero cloud leakage'],
      merchantReply: {
        text: 'Thank you Dr. Vance! We designed the V4 memory channels specifically for large open-source weights.',
        date: '2026-08-11'
      }
    },
    {
      id: 'rev_tpu_2',
      productId: 'prod_neural_tpu_v4',
      authorName: 'Alex Thorne',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      authorBadge: 'Senior Kernel Engineer',
      rating: 5,
      title: 'Flawless Linux & OMNI OS driver support',
      content: 'Plugs in via USB4 or PCIe slot and instantly registers as a neural device in `/dev/omni_npu0`. Tensor compilation in Rust takes milliseconds. Absolutely worth every dollar.',
      verifiedPurchase: true,
      date: '2026-07-28',
      helpfulVotes: 32,
      unhelpfulVotes: 0,
      sentiment: 'positive',
      botLikelihoodScore: 4,
      keyPraiseOrComplaint: ['Clean Linux drivers', 'Zero setup hassle']
    }
  ],
  'prod_sovereign_key_pro': [
    {
      id: 'rev_key_1',
      productId: 'prod_sovereign_key_pro',
      authorName: 'David K., CISO',
      authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
      authorBadge: 'Enterprise Security Lead',
      rating: 5,
      title: 'The gold standard for Post-Quantum hardware security',
      content: 'We issued 500 Aegis FIDO3 keys to our engineering team. The NIST ML-KEM post-quantum algorithms and biometric sensor make signing git commits and OMNI Browser passkeys effortless.',
      verifiedPurchase: true,
      date: '2026-08-04',
      helpfulVotes: 89,
      unhelpfulVotes: 2,
      sentiment: 'positive',
      botLikelihoodScore: 3,
      keyPraiseOrComplaint: ['Post-quantum future proof', 'Sturdy titanium build', 'Rapid NFC tap']
    }
  ]
};

// Seed coupons
const INITIAL_COUPONS: ProductCouponOffer[] = [
  {
    id: 'coup_sovereign15',
    code: 'SOVEREIGN15',
    title: '15% Off Any Sovereign Hardware Order',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 100,
    expiresAt: '2026-12-31',
    autoApplyEligible: true,
    verifiedSuccessRate: 99,
    isSponsoredDiscount: false
  },
  {
    id: 'coup_omni2026',
    code: 'OMNIPAY50',
    title: '$50 Off with 1-Click OMNI Pay Settlement',
    discountType: 'fixed',
    discountValue: 50,
    minOrderAmount: 300,
    expiresAt: '2026-10-31',
    autoApplyEligible: true,
    verifiedSuccessRate: 98,
    isSponsoredDiscount: false
  },
  {
    id: 'coup_creator_special',
    code: 'CREATOR_TECH',
    title: 'Special Creator Community 10% Discount',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 50,
    expiresAt: '2026-11-15',
    autoApplyEligible: false,
    verifiedSuccessRate: 95,
    isAffiliateCoupon: true,
    affiliateCreatorName: 'Marcus Thorne Tech'
  }
];

class OmniCommerceService {
  private products: OmniMarketProduct[] = [...INITIAL_PRODUCTS];
  private sellers: Record<string, OmniSellerProfile> = { ...INITIAL_SELLERS };
  private reviews: Record<string, ProductReview[]> = { ...INITIAL_REVIEWS };
  private coupons: ProductCouponOffer[] = [...INITIAL_COUPONS];
  private cart: OmniCartItem[] = [];
  private orders: OmniPayOrder[] = [];
  private affiliateLinks: OmniAffiliateLink[] = [
    {
      id: 'aff_link_1',
      productId: 'prod_neural_tpu_v4',
      productTitle: 'OMNI Neural Enclave Accelerator V4',
      customCampaignName: 'YouTube Neural Silicon Teardown',
      referralCode: 'REF_NEURAL_V4_88',
      fullUrl: 'https://market.omni.com/p/prod_neural_tpu_v4?ref=REF_NEURAL_V4_88',
      qrCodeData: 'OMNI_AFFILIATE_QR_PAYLOAD_REF_NEURAL_V4_88',
      commissionPercent: 8.0,
      clicks: 1420,
      conversions: 84,
      totalEarningsUsd: 4361.28,
      createdAt: '2026-07-01'
    },
    {
      id: 'aff_link_2',
      productId: 'prod_sovereign_key_pro',
      productTitle: 'Aegis Quantum-Resistant FIDO3 Key',
      customCampaignName: 'Newsletter Security Guide',
      referralCode: 'REF_AEGIS_PQC_22',
      fullUrl: 'https://market.omni.com/p/prod_sovereign_key_pro?ref=REF_AEGIS_PQC_22',
      qrCodeData: 'OMNI_AFFILIATE_QR_PAYLOAD_REF_AEGIS_PQC_22',
      commissionPercent: 12.0,
      clicks: 2890,
      conversions: 172,
      totalEarningsUsd: 2456.16,
      createdAt: '2026-07-15'
    }
  ];

  // 1. PRODUCTS & DISCOVERY
  public getProducts(params?: {
    category?: ProductCategory;
    searchQuery?: string;
    sortBy?: 'featured' | 'price_low' | 'price_high' | 'rating' | 'discount';
    onlyInStock?: boolean;
    onlyVerifiedSellers?: boolean;
    onlyDisclosedSponsored?: boolean;
  }): OmniMarketProduct[] {
    let result = [...this.products];

    if (params?.category && params.category !== 'all') {
      result = result.filter(p => p.category === params.category);
    }

    if (params?.searchQuery && params.searchQuery.trim()) {
      const q = params.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (params?.onlyInStock) {
      result = result.filter(p => p.inStock);
    }

    if (params?.onlyVerifiedSellers) {
      result = result.filter(p => p.sellerVerified);
    }

    if (params?.onlyDisclosedSponsored) {
      result = result.filter(p => p.isSponsored);
    }

    // Sort order
    if (params?.sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (params?.sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (params?.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (params?.sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    } else {
      // Default: Sponsored items first with mandatory visual disclosure, then highest rated
      result.sort((a, b) => {
        if (a.isSponsored && !b.isSponsored) return -1;
        if (!a.isSponsored && b.isSponsored) return 1;
        return b.rating - a.rating;
      });
    }

    return result;
  }

  public getProductById(id: string): OmniMarketProduct | undefined {
    return this.products.find(p => p.id === id);
  }

  public getSellerProfile(sellerId: string): OmniSellerProfile | undefined {
    return this.sellers[sellerId];
  }

  public getReviewsForProduct(productId: string): ProductReview[] {
    return this.reviews[productId] || [];
  }

  public addReview(productId: string, reviewData: Omit<ProductReview, 'id' | 'productId' | 'date' | 'helpfulVotes' | 'unhelpfulVotes'>): ProductReview {
    const newRev: ProductReview = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      productId,
      date: new Date().toISOString().split('T')[0],
      helpfulVotes: 0,
      unhelpfulVotes: 0
    };

    if (!this.reviews[productId]) {
      this.reviews[productId] = [];
    }
    this.reviews[productId].unshift(newRev);

    // Update product rating
    const prod = this.products.find(p => p.id === productId);
    if (prod) {
      const allRevs = this.reviews[productId];
      const avgRating = allRevs.reduce((acc, r) => acc + r.rating, 0) / allRevs.length;
      prod.rating = parseFloat(avgRating.toFixed(2));
      prod.reviewCount = allRevs.length;
    }

    return newRev;
  }

  public getCouponsForProduct(productId?: string): ProductCouponOffer[] {
    return this.coupons;
  }

  // 2. PRODUCT COMPARISON MATRIX
  public generateComparisonMatrix(productIds: string[]): OmniProductComparisonMatrix {
    const productsToCompare = productIds
      .map(id => this.products.find(p => p.id === id))
      .filter((p): p is OmniMarketProduct => Boolean(p));

    if (productsToCompare.length === 0) {
      throw new Error('At least one valid product must be selected for comparison');
    }

    // Collect all unique feature names
    const allFeatureNames = new Set<string>();
    productsToCompare.forEach(p => {
      p.specifications.forEach(s => allFeatureNames.add(`${s.category}: ${s.name}`));
    });

    const features = Array.from(allFeatureNames).map(featName => {
      const [cat, name] = featName.split(': ');
      const values: Record<string, string> = {};
      let bestProdId = productsToCompare[0].id;

      productsToCompare.forEach(p => {
        const found = p.specifications.find(s => s.category === cat && s.name === name);
        values[p.id] = found ? found.value : '—';
      });

      return {
        featureName: featName,
        values,
        winnerProductId: bestProdId
      };
    });

    // Best picks
    const sortedByPrice = [...productsToCompare].sort((a, b) => a.price - b.price);
    const sortedByRating = [...productsToCompare].sort((a, b) => b.rating - a.rating);

    const bestBudget = sortedByPrice[0].id;
    const bestOverall = sortedByRating[0].id;
    const bestPerf = productsToCompare[0].id;

    return {
      id: `matrix_${Date.now()}`,
      title: `Comparison: ${productsToCompare.map(p => p.title.split(' ')[0]).join(' vs ')}`,
      category: productsToCompare[0].category,
      comparedProductIds: productsToCompare.map(p => p.id),
      features,
      aiExecutiveSummary: `Comparing ${productsToCompare.length} products: "${productsToCompare[0].title}" provides the premier performance envelope with ${productsToCompare[0].rating}★ rating, while "${sortedByPrice[0].title}" offers the best price-to-value ratio at $${sortedByPrice[0].price.toFixed(2)}.`,
      bestOverallProductId: bestOverall,
      bestBudgetProductId: bestBudget,
      bestPerformanceProductId: bestPerf,
      priceTradeoffAnalysis: `Upgrading to the top tier yields 2.4x higher throughput and hardware cryptographic isolation for a delta of $${(productsToCompare[productsToCompare.length - 1].price - sortedByPrice[0].price).toFixed(2)}.`,
      generatedAt: new Date().toISOString()
    };
  }

  // 3. AI COMMERCE COPILOT & SHOPPING INTELLIGENCE (WITH MANDATORY SPONSORED DISCLOSURE)
  public async runAiShoppingAssistant(params: {
    query: string;
    budgetMax?: number;
    category?: ProductCategory;
    currentProductId?: string;
  }): Promise<OmniShoppingAiRecommendation> {
    const relevantProducts = this.getProducts({
      category: params.category,
      searchQuery: params.query
    });

    const topProduct = relevantProducts[0] || this.products[0];
    const budgetProduct = relevantProducts.find(p => p.price <= (params.budgetMax || 300)) || this.products[1];
    const altProduct = relevantProducts.find(p => p.id !== topProduct.id) || this.products[2];

    // Check sponsored products in results and construct mandatory disclosure
    const sponsoredDisclosures = relevantProducts
      .filter(p => p.isSponsored || p.isAffiliate)
      .map(p => ({
        productId: p.id,
        productName: p.title,
        isSponsored: p.isSponsored,
        reason: p.isSponsored
          ? `[SPONSORED PLACEMENT]: ${p.sponsoredDetails?.disclosureText || 'The merchant paid an auction fee to promote this listing.'}`
          : `[AFFILIATE PARTNER]: OMNI receives a transparent ${p.affiliateCommissionRate}% referral fee if purchased. Algorithmic ranking was NOT boosted.`,
        commissionPercent: p.affiliateCommissionRate
      }));

    try {
      const prompt = `You are OMNI Shopping Intelligence AI. The user is inquiring about: "${params.query}".
Budget constraint: ${params.budgetMax ? `$${params.budgetMax}` : 'Flexible'}.
Available top matched product: "${topProduct.title}" ($${topProduct.price}).
Alternative product: "${altProduct.title}" ($${altProduct.price}).
Budget pick: "${budgetProduct.title}" ($${budgetProduct.price}).

Generate a concise, objective purchasing recommendation.
Highlight key trade-offs, review sentiment, and state any sponsored disclosures clearly.
Provide response in strict JSON with keys:
{
  "directRecommendation": "concise 2-3 sentence executive recommendation",
  "comparisonHighlights": ["bullet 1", "bullet 2", "bullet 3"],
  "reviewSummary": {
    "overallSentiment": "e.g. 98% Extremely Positive",
    "topPraise": ["praise 1", "praise 2"],
    "topCriticisms": ["criticism 1"],
    "fakeReviewWarningCount": 0
  }
}`;

      const aiResponse = await omniAiSdk.complete({
        prompt,
        taskType: 'reasoning',
        temperature: 0.5,
        maxTokens: 1000
      });

      const parsed = JSON.parse(aiResponse.text.replace(/```json/g, '').replace(/```/g, '').trim());

      return {
        id: `rec_${Date.now()}`,
        query: params.query,
        directRecommendation: parsed.directRecommendation || `Based on your requirements, the ${topProduct.title} is our primary recommendation for its outstanding reliability and sovereign offline capability.`,
        topPickProductId: topProduct.id,
        alternativePickProductId: altProduct.id,
        budgetPickProductId: budgetProduct.id,
        comparisonHighlights: parsed.comparisonHighlights || [
          `Top Pick: ${topProduct.title} provides unmatched throughput ($${topProduct.price.toFixed(2)})`,
          `Budget Champion: ${budgetProduct.title} saves $${(topProduct.price - budgetProduct.price).toFixed(2)} while retaining core specs`,
          `Zero-Telemetry Sovereign Guarantee: 100% offline verification`
        ],
        reviewSummary: parsed.reviewSummary || {
          overallSentiment: '98% Overwhelmingly Positive (340+ verified buyer reviews)',
          topPraise: ['Sub-millisecond latency', 'Durable build quality', 'Seamless OMNI OS integration'],
          topCriticisms: ['Premium initial pricing tier'],
          fakeReviewWarningCount: 0
        },
        sponsoredDisclosures,
        generatedAt: new Date().toISOString()
      };
    } catch {
      // Fallback
      return {
        id: `rec_${Date.now()}`,
        query: params.query,
        directRecommendation: `The ${topProduct.title} represents the gold standard in sovereign hardware with ${topProduct.rating}★ buyer satisfaction. If on a strict budget, ${budgetProduct.title} offers excellent value at $${budgetProduct.price.toFixed(2)}.`,
        topPickProductId: topProduct.id,
        alternativePickProductId: altProduct.id,
        budgetPickProductId: budgetProduct.id,
        comparisonHighlights: [
          `Top Performance: ${topProduct.title} ($${topProduct.price.toFixed(2)})`,
          `Value Pick: ${budgetProduct.title} ($${budgetProduct.price.toFixed(2)})`,
          `Cryptographic Escrow: Funds locked until verified delivery`
        ],
        reviewSummary: {
          overallSentiment: '98% Positive across verified sovereign buyers',
          topPraise: ['Exceptional performance', 'Zero-cloud hardware independence'],
          topCriticisms: ['High demand with limited batch runs'],
          fakeReviewWarningCount: 0
        },
        sponsoredDisclosures,
        generatedAt: new Date().toISOString()
      };
    }
  }

  // 4. CART & OMNI PAY SETTLEMENT
  public getCart(): OmniCartItem[] {
    return this.cart;
  }

  public addToCart(product: OmniMarketProduct, quantity: number = 1, selectedSpec?: string): OmniCartItem[] {
    const existing = this.cart.find(item => item.product.id === product.id && item.selectedSpec === selectedSpec);
    if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = existing.quantity * existing.unitPrice;
    } else {
      this.cart.push({
        product,
        quantity,
        selectedSpec,
        unitPrice: product.price,
        totalPrice: product.price * quantity
      });
    }
    return [...this.cart];
  }

  public updateCartQuantity(productId: string, quantity: number): OmniCartItem[] {
    if (quantity <= 0) {
      this.cart = this.cart.filter(item => item.product.id !== productId);
    } else {
      const item = this.cart.find(i => i.product.id === productId);
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    }
    return [...this.cart];
  }

  public removeFromCart(productId: string): OmniCartItem[] {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    return [...this.cart];
  }

  public clearCart(): void {
    this.cart = [];
  }

  public calculateCartTotals(appliedCouponCode?: string): {
    subtotal: number;
    discountTotal: number;
    shippingFee: number;
    tax: number;
    total: number;
    appliedCoupon?: ProductCouponOffer;
  } {
    const subtotal = this.cart.reduce((sum, i) => sum + i.totalPrice, 0);
    let discountTotal = 0;
    let appliedCoupon: ProductCouponOffer | undefined;

    if (appliedCouponCode) {
      const foundCoupon = this.coupons.find(c => c.code.toUpperCase() === appliedCouponCode.trim().toUpperCase());
      if (foundCoupon) {
        if (!foundCoupon.minOrderAmount || subtotal >= foundCoupon.minOrderAmount) {
          appliedCoupon = foundCoupon;
          if (foundCoupon.discountType === 'percentage') {
            discountTotal = (subtotal * foundCoupon.discountValue) / 100;
          } else if (foundCoupon.discountType === 'fixed') {
            discountTotal = Math.min(foundCoupon.discountValue, subtotal);
          }
        }
      }
    }

    const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
    const tax = (subtotal - discountTotal) * 0.05; // 5% flat VAT/Tax
    const total = Math.max(0, subtotal - discountTotal + shippingFee + tax);

    return {
      subtotal,
      discountTotal,
      shippingFee,
      tax,
      total,
      appliedCoupon
    };
  }

  public async processOmniPayCheckout(params: {
    paymentMethod: OmniPayMethod;
    shippingAddress: {
      fullName: string;
      street: string;
      city: string;
      stateOrProvince: string;
      postalCode: string;
      country: string;
    };
    appliedCouponCode?: string;
    isInstallmentPayIn4?: boolean;
    passkeyConfirmation: string;
  }): Promise<OmniPayOrder> {
    if (this.cart.length === 0) {
      throw new Error('Cart is empty. Add products before checking out.');
    }

    const totals = this.calculateCartTotals(params.appliedCouponCode);
    const orderNumber = `OMNI-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const ledgerTxId = `TX_LEDGER_${Date.now().toString(16).toUpperCase()}`;

    const newOrder: OmniPayOrder = {
      id: `ord_${Date.now()}`,
      orderNumber,
      items: [...this.cart],
      subtotal: totals.subtotal,
      discountTotal: totals.discountTotal,
      tax: totals.tax,
      shippingFee: totals.shippingFee,
      total: totals.total,
      paymentMethod: params.paymentMethod,
      paymentStatus: 'escrow_locked',
      escrowReleaseConditions: 'Funds held in cryptographic multi-sig escrow until buyer or courier verifies physical delivery.',
      shippingAddress: params.shippingAddress,
      installmentPlan: params.isInstallmentPayIn4
        ? {
            totalInstallments: 4,
            paidInstallments: 1,
            installmentAmount: totals.total / 4,
            nextDueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            zeroInterestVerified: true
          }
        : undefined,
      ledgerTransactionId: ledgerTxId,
      createdAt: new Date().toISOString()
    };

    this.orders.unshift(newOrder);
    this.clearCart();
    return newOrder;
  }

  public getOrders(): OmniPayOrder[] {
    return this.orders;
  }

  // 5. OMNI AFFILIATE & CREATOR NETWORK
  public getAffiliateStats(): OmniAffiliateStats {
    const totalEarningsUsd = this.affiliateLinks.reduce((sum, l) => sum + l.totalEarningsUsd, 0);
    const totalClicks = this.affiliateLinks.reduce((sum, l) => sum + l.clicks, 0);
    const totalConversions = this.affiliateLinks.reduce((sum, l) => sum + l.conversions, 0);
    const conversionRate = totalClicks > 0 ? parseFloat(((totalConversions / totalClicks) * 100).toFixed(2)) : 0;

    return {
      totalEarningsUsd,
      pendingPayoutUsd: parseFloat((totalEarningsUsd * 0.35).toFixed(2)),
      paidOutUsd: parseFloat((totalEarningsUsd * 0.65).toFixed(2)),
      totalClicks,
      totalConversions,
      conversionRate,
      tier: totalEarningsUsd > 5000 ? 'Sovereign Sovereign' : totalEarningsUsd > 1500 ? 'Gold' : 'Silver',
      activeLinksCount: this.affiliateLinks.length,
      nextPayoutDate: '2026-09-01'
    };
  }

  public getAffiliateLinks(): OmniAffiliateLink[] {
    return this.affiliateLinks;
  }

  public createAffiliateLink(productId: string, campaignName: string): OmniAffiliateLink {
    const prod = this.getProductById(productId);
    const refCode = `REF_${(prod?.brand || 'OMNI').toUpperCase().replace(/\s+/g, '')}_${Math.floor(1000 + Math.random() * 9000)}`;

    const newLink: OmniAffiliateLink = {
      id: `aff_${Date.now()}`,
      productId,
      productTitle: prod?.title || 'Sovereign Catalog Item',
      customCampaignName: campaignName.trim() || 'Direct Social Link',
      referralCode: refCode,
      fullUrl: `https://market.omni.com/p/${productId}?ref=${refCode}`,
      qrCodeData: `OMNI_AFFILIATE_QR_PAYLOAD_${refCode}`,
      commissionPercent: prod?.affiliateCommissionRate || 10.0,
      clicks: 0,
      conversions: 0,
      totalEarningsUsd: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.affiliateLinks.unshift(newLink);
    return newLink;
  }
}

export const omniCommerceService = new OmniCommerceService();
