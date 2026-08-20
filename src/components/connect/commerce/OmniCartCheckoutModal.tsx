import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  Bookmark,
  ShieldCheck,
  Zap,
  CreditCard,
  Building,
  Wallet,
  Tag,
  CheckCircle2,
  ArrowRight,
  Truck,
  DollarSign,
  AlertTriangle,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import {
  ShoppingCart,
  CartItem,
  PaymentMethodType,
  CommerceOrder,
  FinancialSettlementRecord,
  OrderItemRecord
} from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  cart: ShoppingCart;
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  currencyExchangeRates: Record<string, number>;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onToggleSaveForLater: (cartItemId: string) => void;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: (code: string) => void;
  onCompleteCheckout: (order: CommerceOrder) => void;
  onClose: () => void;
}

export const OmniCartCheckoutModal: React.FC<Props> = ({
  cart,
  activeProfile,
  selectedCurrency,
  currencyExchangeRates,
  onUpdateQuantity,
  onRemoveItem,
  onToggleSaveForLater,
  onApplyCoupon,
  onRemoveCoupon,
  onCompleteCheckout,
  onClose
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('omni_wallet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CommerceOrder | null>(null);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: activeProfile.displayName,
    street: '452 Sovereign Way, Tech District',
    city: 'London',
    stateProvince: 'Greater London',
    postalCode: 'EC1A 1BB',
    country: 'United Kingdom',
    phone: '+44 7700 900123'
  });

  const activeItems = cart.items.filter(i => !i.isSavedForLater);
  const savedItems = cart.items.filter(i => i.isSavedForLater);

  const formatPrice = (priceUsd: number) => {
    const rate = currencyExchangeRates[selectedCurrency] || 1.0;
    const converted = priceUsd * rate;
    if (selectedCurrency === 'USD') return `$${converted.toFixed(2)}`;
    if (selectedCurrency === 'EUR') return `€${converted.toFixed(2)}`;
    if (selectedCurrency === 'GBP') return `£${converted.toFixed(2)}`;
    if (selectedCurrency === 'OMNI') return `⚡${(priceUsd / 4.5).toFixed(2)} OMNI`;
    if (selectedCurrency === 'USDC') return `₮${priceUsd.toFixed(2)} USDC`;
    if (selectedCurrency === 'NGN') return `₦${(priceUsd * 1540).toLocaleString()}`;
    if (selectedCurrency === 'BRL') return `R$${(priceUsd * 5.5).toFixed(2)}`;
    return `$${priceUsd.toFixed(2)}`;
  };

  // Calculations
  const subtotalUsd = activeItems.reduce((acc, item) => acc + item.priceUsd * item.quantity, 0);
  const totalDiscountUsd = cart.appliedCoupons.reduce((acc, c) => acc + c.discountAmountUsd, 0);
  const hasPhysicalProducts = activeItems.some(i => i.archetype === 'physical');
  const shippingFeeUsd = hasPhysicalProducts ? (subtotalUsd > 200 ? 0 : 15.00) : 0;
  const taxUsd = Number((Math.max(0, subtotalUsd - totalDiscountUsd) * 0.06).toFixed(2));
  const finalTotalUsd = Math.max(0, subtotalUsd - totalDiscountUsd + shippingFeeUsd + taxUsd);

  // Group active items by seller
  const sellersMap = activeItems.reduce((acc, item) => {
    if (!acc[item.sellerId]) {
      acc[item.sellerId] = {
        sellerName: item.sellerName,
        items: []
      };
    }
    acc[item.sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { sellerName: string; items: CartItem[] }>);

  const handleApplyCouponCode = () => {
    if (!couponInput.trim()) return;
    const cleanCode = couponInput.trim().toUpperCase();
    if (cleanCode === 'SOVEREIGN20') {
      onApplyCoupon(cleanCode);
      setCouponInput('');
      setCouponError(null);
    } else if (cleanCode === 'BUILDER50') {
      onApplyCoupon(cleanCode);
      setCouponInput('');
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon code. Try SOVEREIGN20 or BUILDER50.');
    }
  };

  const handleProcessOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}-${shippingAddress.country.substring(0, 2).toUpperCase()}`;
      const firstSellerId = activeItems[0]?.sellerId || 'prof-store-aethelgard';
      const firstSellerName = activeItems[0]?.sellerName || 'Aethelgard Hardware Lab';

      const orderItems: OrderItemRecord[] = activeItems.map(i => ({
        productId: i.productId,
        productName: i.productName,
        archetype: i.archetype,
        variantName: i.variantName,
        unitPriceUsd: i.priceUsd,
        quantity: i.quantity,
        totalPriceUsd: i.priceUsd * i.quantity,
        thumbnailUrl: i.imageUrl,
        digitalDeliveryCode: i.archetype !== 'physical' ? `OMNI-AUTH-${Math.random().toString(36).substring(2, 9).toUpperCase()}` : undefined
      }));

      const settlement: FinancialSettlementRecord = {
        ledgerTxId: `LTX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        grossAmountUsd: finalTotalUsd,
        platformTakeRateFeeUsd: Number((finalTotalUsd * 0.025).toFixed(2)),
        escrowFeeUsd: hasPhysicalProducts ? 1.50 : 0.00,
        affiliateCommissionUsd: 0,
        taxCollectedUsd: taxUsd,
        netSellerPayoutUsd: Number((finalTotalUsd - (finalTotalUsd * 0.025) - taxUsd).toFixed(2)),
        settlementStatus: hasPhysicalProducts ? 'held_in_escrow' : 'released_to_wallet',
        settlementReleaseTime: hasPhysicalProducts ? 'Pending Delivery Verification' : new Date().toISOString(),
        cryptographicMerkleHash: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`
      };

      const newOrder: CommerceOrder = {
        id: `ord-${Date.now()}`,
        orderNumber,
        buyerProfileId: activeProfile.id,
        buyerName: activeProfile.displayName,
        buyerEmail: 'active.user@omni.network',
        sellerProfileId: firstSellerId,
        sellerName: firstSellerName,
        sellerStoreSlug: 'storefront',
        items: orderItems,
        subtotalUsd,
        shippingFeeUsd,
        taxUsd,
        totalAmountUsd: finalTotalUsd,
        currency: selectedCurrency,
        status: hasPhysicalProducts ? 'processing' : 'paid',
        paymentMethod: selectedPaymentMethod,
        isEscrowProtected: true,
        tracking: hasPhysicalProducts ? {
          carrier: 'FedEx Sovereign Overnight',
          trackingNumber: `FDX-SOV-${Math.floor(1000000 + Math.random() * 9000000)}`,
          trackingUrl: 'https://fedex.com/track',
          estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
        } : undefined,
        financialSettlement: settlement,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setCompletedOrder(newOrder);
      onCompleteCheckout(newOrder);
      setIsProcessing(false);
      setStep('confirmation');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl space-y-6 my-8 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">
                {step === 'cart' && 'OMNI Multi-Seller Shopping Cart'}
                {step === 'checkout' && 'OMNI Finance Sovereign Checkout'}
                {step === 'confirmation' && 'Order Confirmed & Settled'}
              </h2>
              <p className="text-xs text-slate-400">
                {step === 'cart' && `${activeItems.length} active item(s) across ${Object.keys(sellersMap).length} seller(s)`}
                {step === 'checkout' && 'Zero-Knowledge Escrow Protection & Multi-Currency Settlement'}
                {step === 'confirmation' && 'Cryptographic Merkle receipt generated in OMNI Finance OS'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl text-lg transition"
          >
            ✕
          </button>
        </div>

        {/* STEP 1: CART VIEW */}
        {step === 'cart' && (
          <div className="space-y-6">
            {activeItems.length === 0 ? (
              <div className="text-center py-12 bg-slate-950/60 border border-slate-800 rounded-2xl">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                <p className="text-xs text-slate-400 mt-1">Discover verified products in the OMNI Marketplace.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Items Grouped by Seller */}
                {(Object.entries(sellersMap) as [string, { sellerName: string; items: CartItem[] }][]).map(([sellerId, group]) => (
                  <div key={sellerId} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-white">Seller: {group.sellerName}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        Escrow Verified Merchant
                      </span>
                    </div>

                    <div className="space-y-3">
                      {group.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between gap-4 p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                          <div className="flex items-center gap-3">
                            <img src={item.imageUrl} alt={item.productName} className="w-14 h-14 rounded-lg object-cover border border-slate-700 flex-shrink-0" />
                            <div>
                              <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-950 px-1.5 py-0.2 rounded border border-indigo-500/30">
                                {item.archetype}
                              </span>
                              <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">{item.productName}</h4>
                              {item.variantName && (
                                <p className="text-[11px] text-slate-400 font-mono">Option: {item.variantName}</p>
                              )}
                              <div className="text-xs font-black text-emerald-400 mt-1">
                                {formatPrice(item.priceUsd)}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded"
                              >
                                -
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center text-xs text-slate-300 hover:text-white hover:bg-slate-700 rounded"
                              >
                                +
                              </button>
                            </div>

                            {/* Save for later / Remove */}
                            <button
                              onClick={() => onToggleSaveForLater(item.id)}
                              className="p-2 text-slate-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg transition"
                              title="Save for Later"
                            >
                              <Bookmark className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Coupon Code Input */}
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">Promo Coupons & Gift Vouchers</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code (e.g. SOVEREIGN20)"
                      value={couponInput}
                      onChange={e => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleApplyCouponCode}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl transition"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-xs text-rose-400">{couponError}</p>
                  )}

                  {cart.appliedCoupons.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cart.appliedCoupons.map(c => (
                        <span key={c.code} className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{c.code} (-${c.discountAmountUsd.toFixed(2)})</span>
                          <button onClick={() => onRemoveCoupon(c.code)} className="text-emerald-400 hover:text-white ml-1">✕</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pricing Summary */}
                <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-white">{formatPrice(subtotalUsd)}</span>
                  </div>
                  {totalDiscountUsd > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount:</span>
                      <span className="font-bold">-{formatPrice(totalDiscountUsd)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span className="font-bold text-white">{shippingFeeUsd === 0 ? 'FREE' : formatPrice(shippingFeeUsd)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax (Jurisdiction VAT):</span>
                    <span className="font-bold text-white">{formatPrice(taxUsd)}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-extrabold text-white">
                    <span>Total:</span>
                    <span className="text-lg text-emerald-400">{formatPrice(finalTotalUsd)}</span>
                  </div>
                </div>

                {/* Cart Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={() => setStep('checkout')}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                  >
                    Proceed to OMNI Checkout
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Saved Items Section */}
            {savedItems.length > 0 && (
              <div className="border-t border-slate-800 pt-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                  Saved For Later ({savedItems.length})
                </h4>

                <div className="space-y-2">
                  {savedItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl">
                      <div className="flex items-center gap-3">
                        <img src={item.imageUrl} alt={item.productName} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <h5 className="text-xs font-bold text-white line-clamp-1">{item.productName}</h5>
                          <span className="text-xs font-semibold text-emerald-400">{formatPrice(item.priceUsd)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleSaveForLater(item.id)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 rounded-lg border border-slate-700 transition"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: CHECKOUT VIEW */}
        {step === 'checkout' && (
          <div className="space-y-6">
            {/* Shipping Address Inputs (if physical products present) */}
            {hasPhysicalProducts && (
              <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-white">Shipping Address & Parcel Delivery</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400">Recipient Name</label>
                    <input
                      type="text"
                      value={shippingAddress.fullName}
                      onChange={e => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Contact Phone</label>
                    <input
                      type="text"
                      value={shippingAddress.phone}
                      onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-400">Street Address</label>
                    <input
                      type="text"
                      value={shippingAddress.street}
                      onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">City / Town</label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Country</label>
                    <input
                      type="text"
                      value={shippingAddress.country}
                      onChange={e => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                      className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-bold text-white">Select OMNI Finance Payment Channel</h3>
                </div>
                <span className="text-[10px] text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/30">
                  Direct Finance OS Link
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'omni_wallet',
                    label: 'OMNI Wallet Balance',
                    desc: 'Instant atomic debit (Available: $42,500)',
                    icon: Wallet,
                    badge: 'Zero Fee'
                  },
                  {
                    id: 'omni_pay_1click',
                    label: 'OMNI Pay (1-Click NFC / Biometric)',
                    desc: 'Biometric authorization via Key Ring',
                    icon: Zap,
                    badge: 'Fastest'
                  },
                  {
                    id: 'crypto_usdc',
                    label: 'USDC Sovereign Settlement',
                    desc: 'ERC-20 / Solana / Arbitrum direct transfer',
                    icon: Lock,
                    badge: 'Crypto'
                  },
                  {
                    id: 'debit_credit_card',
                    label: 'Visa / Mastercard / Amex',
                    desc: 'Bank card via encrypted 3D-Secure 2.0',
                    icon: CreditCard,
                    badge: 'Card'
                  },
                  {
                    id: 'bank_wire_transfer',
                    label: 'SEPA / SWIFT / FedNow Wire',
                    desc: 'Direct corporate treasury bank clearance',
                    icon: Building,
                    badge: 'Corporate'
                  }
                ].map(pm => {
                  const isSelected = selectedPaymentMethod === pm.id;
                  const Icon = pm.icon;
                  return (
                    <button
                      key={pm.id}
                      onClick={() => setSelectedPaymentMethod(pm.id as PaymentMethodType)}
                      className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20'
                          : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">{pm.label}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-medium">
                            {pm.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{pm.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Escrow Guarantee Notice */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3 text-xs text-emerald-200">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Sovereign Escrow & Buyer Protection Active</span>
                <p className="text-emerald-300/80 mt-0.5 leading-relaxed">
                  Funds will be safely held in the OMNI Escrow Smart Contract until parcel delivery is confirmed or digital credentials are mathematically validated. 100% money-back guarantee.
                </p>
              </div>
            </div>

            {/* Order Total & Pay Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setStep('cart')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition"
              >
                ← Back to Cart
              </button>

              <button
                onClick={handleProcessOrder}
                disabled={isProcessing}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-sm font-extrabold text-white rounded-xl shadow-xl shadow-emerald-600/30 transition flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Settling Transaction...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Pay {formatPrice(finalTotalUsd)} Now
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMATION VIEW */}
        {step === 'confirmation' && completedOrder && (
          <div className="space-y-6 text-center py-4">
            <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-500/30">
                Transaction Settled Successfully
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-3">Order #{completedOrder.orderNumber}</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Payment verified through OMNI Finance OS. An atomic Merkle proof and invoice has been added to your profile.
              </p>
            </div>

            {/* Cryptographic Financial Settlement Receipt */}
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-2xl text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  OMNI Financial Ledger Receipt
                </span>
                <span className="font-mono text-[10px] text-slate-400">Tx: {completedOrder.financialSettlement.ledgerTxId}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>Total Settled: <span className="font-bold text-white">{formatPrice(completedOrder.totalAmountUsd)}</span></div>
                <div>Payment Method: <span className="font-bold text-white uppercase">{completedOrder.paymentMethod.replace('_', ' ')}</span></div>
                <div>Escrow Status: <span className="font-bold text-emerald-400">{completedOrder.financialSettlement.settlementStatus}</span></div>
                <div>Delivery Status: <span className="font-bold text-indigo-300 uppercase">{completedOrder.status}</span></div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono break-all">
                Merkle Proof Hash: {completedOrder.financialSettlement.cryptographicMerkleHash}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl shadow-lg transition"
            >
              Done & Return to Connect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
