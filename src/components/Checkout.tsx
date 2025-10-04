import React, { useState } from 'react';
import { X, Check, CreditCard, MapPin, User, Mail, Phone } from 'lucide-react';
import { CartItem, Product, ShippingAddress, supabase } from '../lib/ecommerce';
import { clearSessionId } from '../lib/ecommerce';

interface CheckoutProps {
  cartItems: (CartItem & { product: Product })[];
  onClose: () => void;
  onSuccess: (orderNumber: string) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cartItems, onClose, onSuccess }) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [submitting, setSubmitting] = useState(false);

  const [shippingInfo, setShippingInfo] = useState<ShippingAddress>({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Rwanda',
  });

  const [customerInfo, setCustomerInfo] = useState({
    email: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shippingCost = subtotal >= 100 ? 0 : 10;
  const total = subtotal + tax + shippingCost;

  const handleSubmitOrder = async () => {
    setSubmitting(true);

    try {
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: shippingInfo.full_name,
          customer_email: customerInfo.email,
          customer_phone: shippingInfo.phone,
          shipping_address: shippingInfo,
          billing_address: shippingInfo,
          subtotal,
          tax,
          shipping_cost: shippingCost,
          discount: 0,
          total,
          status: 'processing',
          payment_status: 'paid',
          payment_method: paymentMethod,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        product_sku: item.product.sku,
        quantity: item.quantity,
        unit_price: item.product.price,
        total_price: item.product.price * item.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

      if (itemsError) throw itemsError;

      for (const item of cartItems) {
        await supabase.from('cart_items').delete().eq('id', item.id);
      }

      clearSessionId();
      onSuccess(order.order_number);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-3xl font-bold mb-2">Checkout</h2>
            <div className="flex items-center gap-4 mt-6">
              <div
                className={`flex items-center gap-2 ${
                  step === 'shipping' ? 'text-white' : 'text-blue-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'shipping' ? 'bg-white text-blue-600' : 'bg-blue-500'
                  }`}
                >
                  1
                </div>
                <span className="font-semibold">Shipping</span>
              </div>
              <div className="flex-1 h-0.5 bg-blue-500" />
              <div
                className={`flex items-center gap-2 ${
                  step === 'payment' ? 'text-white' : 'text-blue-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'payment' ? 'bg-white text-blue-600' : 'bg-blue-500'
                  }`}
                >
                  2
                </div>
                <span className="font-semibold">Payment</span>
              </div>
              <div className="flex-1 h-0.5 bg-blue-500" />
              <div
                className={`flex items-center gap-2 ${
                  step === 'review' ? 'text-white' : 'text-blue-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 'review' ? 'bg-white text-blue-600' : 'bg-blue-500'
                  }`}
                >
                  3
                </div>
                <span className="font-semibold">Review</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {step === 'shipping' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Shipping Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.full_name}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, full_name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                        <Mail className="w-4 h-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                      <MapPin className="w-4 h-4" />
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address_line1}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address_line1: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address_line2}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address_line2: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">City</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">
                        State/Province
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700 mb-2 block">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.postal_code}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, postal_code: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep('payment')}
                  disabled={
                    !shippingInfo.full_name ||
                    !customerInfo.email ||
                    !shippingInfo.phone ||
                    !shippingInfo.address_line1 ||
                    !shippingInfo.city
                  }
                  className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-lg font-bold text-lg transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-6 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                      <div className="text-left">
                        <div className="font-bold text-slate-900">Credit / Debit Card</div>
                        <div className="text-sm text-slate-600">Pay securely with your card</div>
                      </div>
                      {paymentMethod === 'card' && (
                        <Check className="w-6 h-6 text-blue-600 ml-auto" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('momo')}
                    className={`w-full p-6 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'momo'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Phone className="w-8 h-8 text-blue-600" />
                      <div className="text-left">
                        <div className="font-bold text-slate-900">Mobile Money</div>
                        <div className="text-sm text-slate-600">Pay with MTN or Airtel Money</div>
                      </div>
                      {paymentMethod === 'momo' && (
                        <Check className="w-6 h-6 text-blue-600 ml-auto" />
                      )}
                    </div>
                  </button>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('shipping')}
                    className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Review Your Order</h3>

                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-slate-900">{item.product.name}</div>
                          <div className="text-sm text-slate-600">Quantity: {item.quantity}</div>
                        </div>
                        <div className="font-bold text-slate-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-bold text-slate-900 mb-3">Shipping Address</h4>
                  <p className="text-slate-700">
                    {shippingInfo.full_name}
                    <br />
                    {shippingInfo.address_line1}
                    {shippingInfo.address_line2 && (
                      <>
                        <br />
                        {shippingInfo.address_line2}
                      </>
                    )}
                    <br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postal_code}
                    <br />
                    {shippingInfo.country}
                    <br />
                    {shippingInfo.phone}
                  </p>
                </div>

                <div className="mb-6 p-4 bg-slate-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Tax (18%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-300">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('payment')}
                    className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={submitting}
                    className="flex-1 py-4 bg-green-600 hover:bg-green-700 disabled:bg-slate-300 text-white rounded-lg font-bold text-lg transition-colors"
                  >
                    {submitting ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
