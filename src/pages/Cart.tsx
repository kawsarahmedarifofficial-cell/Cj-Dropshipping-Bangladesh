import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 120; // Default estimate
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingCart size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any products to your store cart yet.</p>
        <Link to="/" className="inline-block bg-[#28a745] hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <div className="col-span-3">Product</div>
              <div className="col-span-1 text-center">Cost Price</div>
              <div className="col-span-1 text-center">Quantity</div>
              <div className="col-span-1 text-right">Subtotal</div>
            </div>

            <div className="divide-y divide-gray-100">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center">
                  <div className="col-span-3 flex items-center gap-4">
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} />
                    </button>
                    <div className="w-16 h-16 bg-gray-50 rounded p-1 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <Link to={`/reseller/product/${item.id}`} className="font-medium text-gray-800 hover:text-green-600 transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                  </div>
                  
                  <div className="col-span-1 text-center font-medium text-gray-600 hidden md:block">
                    ৳ {item.price}
                  </div>
                  
                  <div className="col-span-1 flex justify-center">
                    <div className="flex items-center border border-gray-200 rounded">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600">-</button>
                      <input type="text" value={item.quantity} readOnly className="w-10 text-center text-sm font-medium outline-none" />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600">+</button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 text-right font-bold text-gray-900 hidden md:block">
                    ৳ {item.price * item.quantity}
                  </div>
                  
                  {/* Mobile Price Display */}
                  <div className="md:hidden flex justify-between items-center w-full pt-2">
                    <span className="text-gray-500">৳ {item.price} x {item.quantity}</span>
                    <span className="font-bold text-gray-900">৳ {item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            <button onClick={clearCart} className="text-red-500 font-medium hover:text-red-600 transition-colors text-sm">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 pb-4 border-b border-gray-100">Wholesale Totals</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">৳ {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Est. Delivery Fee</span>
                <span className="font-medium text-gray-900">৳ {deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="font-bold text-gray-800">Est. Wholesale Cost</span>
                <span className="font-bold text-xl text-green-600">৳ {total}</span>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                *Final delivery fee calculated at checkout based on location.
              </div>
            </div>

            <Link to="/reseller/checkout" className="w-full bg-[#28a745] hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              Proceed to Checkout
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
