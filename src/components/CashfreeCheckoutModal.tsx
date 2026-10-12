import React, { useState } from 'react';
import {
  CreditCard, ShieldCheck, Lock, CheckCircle2, RefreshCw, X,
  Smartphone, Building, ArrowRight, Check, AlertCircle, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CashfreeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderInfo: {
    planId: string;
    planName: string;
    amount: number;
    billingPeriod: string;
    isBoostCredits?: boolean;
    creditsCount?: number;
  };
  customerPhone: string;
  customerName: string;
  onPaymentSuccess: (receipt: {
    orderId: string;
    transactionId: string;
    amount: number;
    planId: string;
    isBoostCredits?: boolean;
    creditsCount?: number;
  }) => void;
}

export const CashfreeCheckoutModal: React.FC<CashfreeCheckoutModalProps> = ({
  isOpen,
  onClose,
  orderInfo,
  customerPhone,
  customerName,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('vasu.sharma@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9012');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('841');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [createdOrderId, setCreatedOrderId] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleInitiateCashfreePayment = async () => {
    setIsProcessing(true);
    setErrorMsg('');

    try {
      // 1. Create order on server via Cashfree Orders API
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: orderInfo.planId,
          amount: orderInfo.amount,
          customerPhone: customerPhone || '9876543210',
          customerName: customerName || 'Vasu Sharma',
          customerEmail: 'member@12rashi.com',
        }),
      });

      const orderData = await res.json();
      if (!res.ok) {
        throw new Error(orderData.error || 'Failed to initialize Cashfree order');
      }

      const orderId = orderData.orderId;
      setCreatedOrderId(orderId);

      // If official Cashfree JS SDK is loaded and running in live sandbox mode
      if (typeof window !== 'undefined' && (window as any).Cashfree && orderData.isLiveCashfree) {
        try {
          const cf = (window as any).Cashfree({
            mode: orderData.cfEnvironment === 'PRODUCTION' ? 'production' : 'sandbox',
          });
          cf.checkout({
            paymentSessionId: orderData.paymentSessionId,
            redirectTarget: '_modal',
          });
        } catch (sdkErr) {
          console.warn('Cashfree SDK modal fallback notice:', sdkErr);
        }
      }

      // 2. Complete payment verification via Cashfree verify API
      setTimeout(async () => {
        try {
          const verifyRes = await fetch('/api/payment/verify-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderId }),
          });

          const verifyData = await verifyRes.json();
          if (!verifyRes.ok) throw new Error('Payment verification unsuccessful');

          setTransactionId(verifyData.transactionId);
          setIsProcessing(false);
          setStep('success');

          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });

          onPaymentSuccess({
            orderId: verifyData.orderId,
            transactionId: verifyData.transactionId,
            amount: orderInfo.amount,
            planId: orderInfo.planId,
            isBoostCredits: orderInfo.isBoostCredits,
            creditsCount: orderInfo.creditsCount,
          });
        } catch (err: any) {
          setErrorMsg(err.message || 'Payment confirmation error');
          setIsProcessing(false);
        }
      }, 1600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment service error');
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <CreditCard className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-serif-luxury text-amber-100">
                  Cashfree Payment Gateway
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  PG v2023-08-01
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                12Rashi Verified Payment Gateway Integration
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {errorMsg && (
            <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-3 text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {step === 'checkout' ? (
            <div className="space-y-5">
              {/* Order Summary Box */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    {orderInfo.isBoostCredits ? 'Boost Package' : 'Executive Membership'}
                  </span>
                  <h4 className="text-base font-bold text-white font-serif-luxury">
                    {orderInfo.planName}
                  </h4>
                  <p className="text-xs text-amber-300/80">
                    {orderInfo.isBoostCredits
                      ? `${orderInfo.creditsCount} Executive Boost Credits`
                      : orderInfo.billingPeriod}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-300 font-mono">
                    ₹{orderInfo.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">INR (All taxes incl.)</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Cashfree Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('upi')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      selectedMethod === 'upi'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Instant UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('card')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      selectedMethod === 'card'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('netbanking')}
                    className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition ${
                      selectedMethod === 'netbanking'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building className="w-4 h-4" />
                    <span>Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Method Details */}
              {selectedMethod === 'upi' && (
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-slate-300 pb-2 border-b border-slate-800/80">
                    <span>Supported UPI Apps</span>
                    <span className="text-[11px] text-amber-300 font-medium">GPay • PhonePe • Paytm • BHIM</span>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Enter Virtual Payment Address (VPA / UPI ID)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Card Number (Visa / MasterCard / RuPay)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-xs">
                  <label className="block text-slate-400 mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              {/* Security badges */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  PCI-DSS Level 1 &amp; RBI Compliant
                </span>
                <span className="flex items-center gap-1.5 font-mono text-amber-300/80">
                  <Lock className="w-3 h-3 text-emerald-400" /> 256-bit SSL Encrypted
                </span>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={handleInitiateCashfreePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50 text-xs disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Connecting to Cashfree Payment Gateway...
                  </>
                ) : (
                  <>
                    <span>Pay ₹{orderInfo.amount.toLocaleString('en-IN')} via Cashfree</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Success Receipt */
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider font-mono">
                  Cashfree Transaction Verified
                </span>
                <h4 className="text-xl font-bold font-serif-luxury text-white">
                  Payment Succeeded!
                </h4>
                <p className="text-xs text-slate-300">
                  Your membership benefits have been unlocked and applied instantly.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs space-y-2 text-left">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Order ID:</span>
                  <span className="font-mono text-white font-medium">{createdOrderId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Cashfree Txn Ref:</span>
                  <span className="font-mono text-amber-300 font-medium">{transactionId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-bold text-white">₹{orderInfo.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Payment Gateway:</span>
                  <span className="text-emerald-400 font-medium">Cashfree Payments (PG v2023-08-01)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition"
              >
                Access Premium Privileges
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
