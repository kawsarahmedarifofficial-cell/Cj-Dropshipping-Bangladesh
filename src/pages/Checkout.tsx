import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Checkout() {
  const { currentUser, userData } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [shippingArea, setShippingArea] = useState('inside_dhaka');
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [agreed, setAgreed] = useState(false);
  const [note, setNote] = useState('');

  // Calculations
  // Total of the wholesale price (cost to reseller)
  const wholesaleSubtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Total of the selling price (price shown to customer)
  const sellingSubtotal = cartItems.reduce((acc, item) => acc + ((item.sellingPrice || item.price) * item.quantity), 0);
  
  const deliveryFee = shippingArea === 'inside_dhaka' ? 80.00 : 150.00;
  const advancePayment = 0.00;
  const tax = 0.00;
  
  const total = sellingSubtotal + deliveryFee + tax - advancePayment;
  const profit = Math.max(0, sellingSubtotal - wholesaleSubtotal);

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Checkout Error</h2>
        <p className="text-gray-500 mb-8">Your cart is empty. Please add items before checking out.</p>
        <Link to="/" className="inline-block bg-[#28a745] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to place an order.");
      return;
    }
    
    if (!agreed) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        resellerId: currentUser.uid,
        resellerName: userData?.displayName || currentUser.email,
        customerName,
        customerPhone,
        customerAddress,
        shippingArea,
        note,
        items: cartItems,
        wholesaleSubtotal,
        sellingSubtotal,
        deliveryFee,
        totalToCollect: total,
        profit,
        status: 'Pending',
        deliveryStatus: 'Pending',
        courierPaymentStatus: 'Unpaid',
        paymentMethod,
        createdAt: serverTimestamp()
      });

      clearCart();
      alert('Order placed successfully!');
      navigate('/reseller/orders');
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          
          {/* Products */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-100 pb-2">Products</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 py-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-contain border border-gray-100 p-1" />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Shipping Information */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-100 pb-2">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Name"
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none focus:border-green-500" 
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone</label>
                <input 
                  type="tel" 
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Phone"
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none focus:border-green-500" 
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Address</label>
                <textarea 
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  rows={2}
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none focus:border-green-500 resize-none"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Shipping Area</label>
                <select 
                  value={shippingArea}
                  onChange={(e) => setShippingArea(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none focus:border-green-500 bg-white"
                >
                  <option value="inside_dhaka">Inside Dhaka (80 ৳)</option>
                  <option value="outside_dhaka">Outside Dhaka (150 ৳)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Delivery Type */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-100 pb-2">Delivery Type</h3>
            <div className="inline-flex items-center gap-2 border border-green-500 text-green-700 px-4 py-2 rounded text-sm cursor-pointer">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Home Delivery
            </div>
          </div>

          {/* Payment Option */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-100 pb-2">Payment Option</h3>
            <div className="flex flex-wrap gap-4 mb-6">
              <div 
                onClick={() => setPaymentMethod('cod')}
                className={`border rounded p-3 cursor-pointer flex flex-col items-center justify-center w-32 h-24 ${paymentMethod === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
              >
                <div className="text-orange-500 mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                </div>
                <span className="text-xs font-medium text-center">Cash On Delivery</span>
              </div>
              <div 
                onClick={() => setPaymentMethod('bkash')}
                className={`border rounded p-3 cursor-pointer flex flex-col items-center justify-center w-32 h-24 ${paymentMethod === 'bkash' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
              >
                <div className="text-pink-600 mb-2 font-bold text-xl">bKash</div>
                <span className="text-xs font-medium text-center">Bkash Personal</span>
              </div>
              <div 
                onClick={() => setPaymentMethod('nagad')}
                className={`border rounded p-3 cursor-pointer flex flex-col items-center justify-center w-32 h-24 ${paymentMethod === 'nagad' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
              >
                <div className="text-orange-600 mb-2 font-bold text-xl">নগদ</div>
                <span className="text-xs font-medium text-center">Nagad Personal</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-sm border-t border-gray-100 pt-6">
              <div className="flex flex-col items-center gap-2">
                <div className="text-gray-600">Your wallet balance : <span className="font-bold">0.05 ৳</span></div>
                <button type="button" className="bg-gray-400 text-white text-xs px-3 py-1.5 rounded cursor-not-allowed">Insufficient balance</button>
              </div>
              <div className="text-red-500 text-xs text-center md:text-left mt-4 md:mt-0">
                গ্রাহক অর্ডারের জন্য আপনার ওয়ালেটে 200 টাকা থাকতে হবে
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-xs text-gray-500 mb-1">Note</label>
              <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none focus:border-green-500 resize-none"
                rows={2}
              ></textarea>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-100 pb-2">Order Items</h3>
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm py-2">
                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                <span className="font-medium text-gray-800">{(item.sellingPrice || item.price).toFixed(2)} ৳</span>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800 mb-4 border-b border-gray-100 pb-2">Order Summary</h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{sellingSubtotal.toFixed(2)} ৳</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{tax.toFixed(2)} ৳</span>
              </div>
              <div className="flex justify-between text-gray-600 items-center">
                <span>Advance Payment</span>
                <div className="flex items-center gap-2">
                  <input type="text" className="w-20 border border-gray-200 rounded px-2 py-1 outline-none" />
                  <span>{advancePayment.toFixed(2)} ৳</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{deliveryFee.toFixed(2)} ৳</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-green-600 text-lg">{total.toFixed(2)} ৳</span>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-6">
              <input 
                type="checkbox" 
                id="terms" 
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-green-600" 
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree to the <Link to="/reseller/terms" className="text-green-600 hover:underline">terms and conditions</Link>, <Link to="/return-policy" className="text-green-600 hover:underline">Return Policy</Link> & <Link to="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#28a745] hover:bg-green-600 text-white font-bold py-3 rounded text-sm transition-colors mb-4 disabled:opacity-70"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>

            <div className="text-center">
              <Link to="/reseller/cart" className="text-xs text-green-600 hover:underline inline-flex items-center gap-1">
                <ArrowLeft size={12} /> Back to Cart
              </Link>
            </div>
          </div>

        </form>

        {/* Footer Links */}
        <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200 mb-12">
          <div className="text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-green-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <span className="text-[10px] text-green-600 font-medium">Terms & conditions</span>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-green-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <span className="text-[10px] text-green-600 font-medium">Return Policy</span>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-green-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <span className="text-[10px] text-green-600 font-medium">Support Policy</span>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-green-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <span className="text-[10px] text-green-600 font-medium">Privacy Policy</span>
          </div>
        </div>

      </div>
    </div>
  );
}
