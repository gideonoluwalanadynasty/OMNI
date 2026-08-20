import React, { useState } from 'react';
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  XCircle,
  ShieldCheck,
  ExternalLink,
  Download,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Info
} from 'lucide-react';
import { CommerceOrder, OrderStatus } from '../../../types/omni_commerce';
import { ConnectProfile } from '../../../types/omni_connect';

interface Props {
  orders: CommerceOrder[];
  activeProfile: ConnectProfile;
  selectedCurrency: string;
  currencyExchangeRates: Record<string, number>;
  onRefundOrder: (orderId: string, reason: string) => void;
  onOpenStorefront: (storeSlug: string) => void;
}

export const OmniOrderManagerView: React.FC<Props> = ({
  orders,
  activeProfile,
  selectedCurrency,
  currencyExchangeRates,
  onRefundOrder,
  onOpenStorefront
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CommerceOrder | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

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

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'paid':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Paid</span>;
      case 'processing':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">Processing</span>;
      case 'shipped':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">Shipped</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Delivered</span>;
      case 'refunded':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">Refunded</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-700 text-slate-300 border border-slate-600">Cancelled</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400">Created</span>;
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesStatus = selectedStatus === 'all' || o.status === selectedStatus;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some(i => i.productName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleDownloadInvoice = (order: CommerceOrder) => {
    setDownloadSuccessMsg(`Invoice for ${order.orderNumber} downloaded successfully.`);
    setTimeout(() => setDownloadSuccessMsg(null), 3000);
  };

  const handleConfirmRefund = () => {
    if (!selectedOrder) return;
    onRefundOrder(selectedOrder.id, refundReason || 'Customer requested return');
    setShowRefundModal(false);
    setSelectedOrder(null);
    setRefundReason('');
  };

  return (
    <div id="omni-order-manager-view" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ATOMIC SETTLEMENT & ESCROW
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-400" />
            OMNI Order Management & Lifecycle
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track all purchase deliveries, inspect cryptographic Merkle ledger receipts, and manage automated escrow releases.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order number or product..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {downloadSuccessMsg && (
        <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{downloadSuccessMsg}</span>
        </div>
      )}

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {[
          { id: 'all', label: 'All Orders' },
          { id: 'paid', label: 'Paid & Delivered' },
          { id: 'processing', label: 'Processing' },
          { id: 'shipped', label: 'In Transit / Shipped' },
          { id: 'refunded', label: 'Refunded' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map(tab => {
          const isActive = selectedStatus === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-md transition space-y-4"
          >
            {/* Top Order Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-800 rounded-xl">
                  <Package className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{order.orderNumber}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()} • Seller: <span className="text-indigo-400 font-semibold">{order.sellerName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-base font-black text-white">{formatPrice(order.totalAmountUsd)}</div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{order.paymentMethod.replace('_', ' ')}</span>
                </div>

                <button
                  onClick={() => setSelectedOrder(order)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-xl border border-slate-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <img src={item.thumbnailUrl} alt={item.productName} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-950 px-1 py-0.2 rounded">
                        {item.archetype}
                      </span>
                      <h4 className="text-xs font-bold text-white truncate">{item.productName}</h4>
                    </div>
                    {item.variantName && (
                      <p className="text-[11px] text-slate-400">{item.variantName}</p>
                    )}
                    <div className="text-xs font-semibold text-slate-300 mt-0.5">
                      Qty: {item.quantity} × {formatPrice(item.unitPriceUsd)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carrier Tracking Banner (if available) */}
            {order.tracking && (
              <div className="p-3.5 bg-sky-950/40 border border-sky-500/30 rounded-xl flex items-center justify-between text-xs text-sky-200">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-sky-400" />
                  <span>Carrier: <strong>{order.tracking.carrier}</strong> — Tracking: <strong className="font-mono">{order.tracking.trackingNumber}</strong></span>
                </div>
                <span className="text-sky-300 font-semibold">
                  Est. Delivery: {new Date(order.tracking.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-16 bg-slate-900/60 border border-slate-800 rounded-2xl">
            <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No orders found</h3>
            <p className="text-xs text-slate-400 mt-1">Try switching status filters or search terms.</p>
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Order Details #{selectedOrder.orderNumber}</h3>
                <span className="text-xs text-slate-400">Created: {new Date(selectedOrder.createdAt).toLocaleString()}</span>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Items Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</h4>
              {selectedOrder.items.map((i, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={i.thumbnailUrl} alt={i.productName} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{i.productName}</div>
                      {i.digitalDeliveryCode && (
                        <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded mt-1">
                          License: {i.digitalDeliveryCode}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-white">{formatPrice(i.totalPriceUsd)}</div>
                    <span className="text-[10px] text-slate-400">Qty: {i.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Ledger Receipt */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between font-semibold text-white border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  OMNI Finance Ledger Audit
                </span>
                <span className="font-mono text-[10px] text-indigo-300">{selectedOrder.financialSettlement.ledgerTxId}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1">
                <div>Subtotal: <strong className="text-white">{formatPrice(selectedOrder.subtotalUsd)}</strong></div>
                <div>Shipping: <strong className="text-white">{formatPrice(selectedOrder.shippingFeeUsd)}</strong></div>
                <div>Tax: <strong className="text-white">{formatPrice(selectedOrder.taxUsd)}</strong></div>
                <div>Net Settlement: <strong className="text-emerald-400">{selectedOrder.financialSettlement.settlementStatus}</strong></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => handleDownloadInvoice(selectedOrder)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Download PDF Invoice
              </button>

              {selectedOrder.status !== 'refunded' && selectedOrder.status !== 'cancelled' && (
                <button
                  onClick={() => setShowRefundModal(true)}
                  className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-xs font-semibold text-rose-300 rounded-xl border border-rose-500/30 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  Request Refund
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REFUND REQUEST MODAL */}
      {showRefundModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-rose-400" />
              Request Escrow Refund
            </h3>
            <p className="text-xs text-slate-300">
              Refund request for <strong>{selectedOrder.orderNumber}</strong> ({formatPrice(selectedOrder.totalAmountUsd)}).
            </p>

            <div>
              <label className="text-xs text-slate-400">Reason for refund:</label>
              <textarea
                rows={3}
                value={refundReason}
                onChange={e => setRefundReason(e.target.value)}
                placeholder="Item defective, delayed delivery, or cancelled before shipment..."
                className="w-full mt-1 p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowRefundModal(false)}
                className="px-3 py-2 bg-slate-800 text-xs text-slate-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white rounded-xl shadow-lg transition"
              >
                Submit Escrow Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
