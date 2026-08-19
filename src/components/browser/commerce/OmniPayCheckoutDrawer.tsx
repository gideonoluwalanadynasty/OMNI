import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Tag,
  ShieldCheck,
  Zap,
  CreditCard,
  Coins,
  Lock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
  Clock
} from 'lucide-react';
import { OmniCartItem, OmniPayMethod, OmniPayOrder } from '../../../types/commerce_market';
import { omniCommerceService } from '../../../sdk/browser-services/OmniCommerceService';

interface OmniPayCheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCompleted: (order: OmniPayOrder) => void;
}

export const OmniPayCheckoutDrawer: React.FC<OmniPayCheckoutDrawerProps> = ({
  isOpen,
  onClose,
  onOrderCompleted
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | undefined>(undefined);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<OmniPayMethod>('omni_tokens');
  const [isInstallmentPayIn4, setIsInstallmentPayIn4] = useState(false);

  // Address
  const [fullName, setFullName] = useState('Alex Thorne (Sovereign Resident)');
  const [street, setStreet] = useState('45 Rue du Rhone, Enclave 7');
  const [city, setCity] = useState('Geneva');
  const [stateOrProvince, setStateOrProvince] = useState('GE');
  const [postalCode, setPostalCode] = useState('1204');
  const [country, setCountry] = useState('Switzerland');

  // Checkout flow state
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPasskeyAuth, setShowPasskeyAuth] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OmniPayOrder | null>(null);

  const cart = omniCommerceService.getCart();
  const totals = omniCommerceService.calculateCartTotals(appliedCouponCode);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;

    const available = omniCommerceService.getCouponsForProduct();
    const match = available.find(c => c.code.toUpperCase() === couponInput.trim().toUpperCase());
    if (!match) {
      setCouponError('Invalid coupon code.');
      return;
    }

    if (match.minOrderAmount && totals.subtotal < match.minOrderAmount) {
      setCouponError(`Coupon requires a minimum order of $${match.minOrderAmount}.`);
      return;
    }

    setAppliedCouponCode(match.code);
    setCouponInput('');
  };

  const handleInitiatePayment = () => {
    if (cart.length === 0) return;
    setShowPasskeyAuth(true);
  };

  const handleAuthorizePasskey = async () => {
    setIsProcessing(true);
    try {
      // Simulate cryptographic WebAuthn / Passkey signature
      await new Promise(r => setTimeout(r, 800));

      const order = await omniCommerceService.processOmniPayCheckout({
        paymentMethod: isInstallmentPayIn4 ? 'pay_in_4' : paymentMethod,
        shippingAddress: {
          fullName,
          street,
          city,
          stateOrProvince,
          postalCode,
          country
        },
        appliedCouponCode,
        isInstallmentPayIn4,
        passkeyConfirmation: `FIDO3_SIG_ED25519_${Date.now().toString(16)}`
      });

      setCompletedOrder(order);
      setShowPasskeyAuth(false);
      onOrderCompleted(order);
    } catch (err: any) {
      alert(err.message || 'Checkout failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-stone-950 border-l border-stone-800 h-full flex flex-col justify-between overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between sticky top-0 bg-stone-950/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-100 flex items-center gap-2">
                <span>OMNI Pay Sovereign Checkout</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono">
                  Escrow Enclave
                </span>
              </h3>
              <p className="text-xs text-stone-400">Zero-fee cryptographic settlement & double-entry ledger</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {completedOrder ? (
            /* ORDER CONFIRMATION SUCCESS */
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-600/60 space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-extrabold text-stone-100">Sovereign Payment Escrowed!</h4>
                <p className="text-xs text-stone-300">
                  Order <span className="font-mono text-emerald-400 font-bold">{completedOrder.orderNumber}</span> has been signed into the sovereign ledger.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-left space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Ledger Transaction:</span>
                  <span className="font-mono text-stone-200">{completedOrder.ledgerTransactionId}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Settlement Total:</span>
                  <span className="font-bold text-stone-100">${completedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Escrow Protection:</span>
                  <span className="text-emerald-400 font-semibold">Active Multi-Sig</span>
                </div>
                {completedOrder.installmentPlan && (
                  <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-800/80 text-[11px] text-indigo-300">
                    Pay in 4 Schedule: 1st payment of ${completedOrder.installmentPlan.installmentAmount.toFixed(2)} charged today. Next installment due on {completedOrder.installmentPlan.nextDueDate}. Zero interest.
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setCompletedOrder(null);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
              >
                Done / Back to Browser
              </button>
            </div>
          ) : cart.length === 0 ? (
            /* EMPTY CART */
            <div className="text-center py-12 space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-700 mx-auto" />
              <h4 className="text-sm font-bold text-stone-300">Your Cart is Empty</h4>
              <p className="text-xs text-stone-500">Discover sovereign hardware & tools in OMNI Market.</p>
            </div>
          ) : (
            /* ACTIVE CART REVIEW & SETTLEMENT */
            <div className="space-y-6">
              {/* Cart Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Order Items ({cart.length})
                </h4>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover bg-stone-950 border border-stone-800 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-stone-200 truncate">{item.product.title}</h5>
                        <div className="text-stone-400 text-[11px] font-mono">
                          ${item.unitPrice.toFixed(2)} x {item.quantity}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-stone-700 rounded-lg overflow-hidden">
                          <button
                            onClick={() => omniCommerceService.updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="px-2 py-0.5 bg-stone-800 text-stone-300 hover:bg-stone-700"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 bg-stone-900 font-mono text-stone-200">{item.quantity}</span>
                          <button
                            onClick={() => omniCommerceService.updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="px-2 py-0.5 bg-stone-800 text-stone-300 hover:bg-stone-700"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => omniCommerceService.removeFromCart(item.product.id)}
                          className="p-1 text-stone-500 hover:text-rose-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Code Input */}
              <div className="space-y-2">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Coupon / Creator Code (e.g. SOVEREIGN15)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-200 uppercase font-mono placeholder:normal-case placeholder:font-sans placeholder:text-stone-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {couponError && <p className="text-[11px] text-rose-400">{couponError}</p>}
                {totals.appliedCoupon && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-between text-xs text-emerald-300">
                    <span>Applied: <strong>{totals.appliedCoupon.code}</strong> ({totals.appliedCoupon.title})</span>
                    <button
                      onClick={() => setAppliedCouponCode(undefined)}
                      className="text-emerald-400 hover:underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Select Sovereign Settlement Asset
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'omni_tokens', label: 'OMNI Tokens', sub: '5% Cashback', icon: Coins },
                    { id: 'usdc', label: 'USDC Escrow', sub: 'Zero Gas', icon: ShieldCheck },
                    { id: 'btc', label: 'Bitcoin Lightning', sub: 'Instant L2', icon: Zap },
                    { id: 'fiat_card', label: 'Encrypted Card', sub: 'Zero Storage', icon: CreditCard }
                  ].map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setPaymentMethod(m.id as any);
                          setIsInstallmentPayIn4(false);
                        }}
                        className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                          paymentMethod === m.id && !isInstallmentPayIn4
                            ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-md'
                            : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800/60 hover:text-stone-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-indigo-400 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-stone-200">{m.label}</div>
                          <div className="text-[10px] text-stone-400">{m.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Pay in 4 Toggle */}
                <div
                  onClick={() => setIsInstallmentPayIn4(!isInstallmentPayIn4)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    isInstallmentPayIn4
                      ? 'bg-indigo-950/80 border-indigo-500 text-white'
                      : 'bg-stone-900 border-stone-800 text-stone-400 hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="font-bold text-stone-200">Pay in 4 Interest-Free Installments</span>
                      <div className="text-[10px] text-stone-400">
                        4 bi-weekly payments of ${(totals.total / 4).toFixed(2)} • 0% APR
                      </div>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isInstallmentPayIn4 ? 'bg-indigo-500 border-indigo-400' : 'border-stone-600'}`}>
                    {isInstallmentPayIn4 && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                </div>
              </div>

              {/* Shipping Address Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Sovereign Delivery Destination
                </h4>
                <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1">
                  <div className="font-bold text-stone-200">{fullName}</div>
                  <div className="text-stone-400">{street}, {city}, {postalCode}, {country}</div>
                  <div className="text-[10px] text-indigo-400">End-to-end encrypted dispatch routing</div>
                </div>
              </div>

              {/* Ledger Totals Breakdown */}
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-2 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal:</span>
                  <span className="font-mono text-stone-200">${totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.discountTotal > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount:</span>
                    <span className="font-mono">-${totals.discountTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Sovereign Fast Shipping:</span>
                  <span className="font-mono text-stone-200">
                    {totals.shippingFee === 0 ? 'FREE' : `$${totals.shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Estimated VAT / Tax (5%):</span>
                  <span className="font-mono text-stone-200">${totals.tax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-extrabold text-stone-100">
                  <span>Total Amount:</span>
                  <span className="text-base text-indigo-300 font-mono">${totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!completedOrder && cart.length > 0 && (
          <div className="p-5 border-t border-stone-800 sticky bottom-0 bg-stone-950/95 backdrop-blur-md space-y-2">
            <button
              onClick={handleInitiatePayment}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95"
            >
              <Lock className="w-4 h-4" />
              <span>Authorize Settlement (${totals.total.toFixed(2)})</span>
            </button>

            <p className="text-[10px] text-center text-stone-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Protected by OMNI Sovereign Escrow & Dual-Factor Passkey
            </p>
          </div>
        )}

        {/* Biometric Passkey Dual-Factor Confirmation Modal */}
        {showPasskeyAuth && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 rounded-2xl bg-stone-900 border border-indigo-500/60 space-y-4 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500 flex items-center justify-center mx-auto text-indigo-400">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-stone-100">Touch Security Key / Passkey</h4>
                <p className="text-xs text-stone-400">
                  Dual-Factor Human Confirmation: Authorize release of <strong>${totals.total.toFixed(2)}</strong> to sovereign escrow.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs text-left space-y-1 text-stone-400">
                <div>Recipient: <span className="text-stone-200">OMNI Multi-Sig Escrow Vault</span></div>
                <div>Method: <span className="text-stone-200 font-mono">{isInstallmentPayIn4 ? 'Pay in 4' : paymentMethod}</span></div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasskeyAuth(false)}
                  className="flex-1 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAuthorizePasskey}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg"
                >
                  {isProcessing ? (
                    <span>Signing...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Pay</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
