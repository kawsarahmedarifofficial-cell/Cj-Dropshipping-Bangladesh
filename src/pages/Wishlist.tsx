import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      sellingPrice: item.price + 300, // Default markup
      image: item.image
    });
    removeFromWishlist(item.id);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex items-center gap-3 mb-8">
        <Heart size={28} className="text-green-600" />
        <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {wishlistItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-sm">
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Product</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100">Wholesale Price</th>
                  <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white border border-gray-100 rounded p-1 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                        <Link to={`/reseller/product/${item.id}`} className="font-medium text-gray-800 hover:text-green-600 transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      ৳ {item.price}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className={`p-2 rounded transition-colors flex items-center justify-center bg-green-600 text-white hover:bg-green-700`}
                          title="Add to Cart"
                        >
                          <ShoppingCart size={18} />
                        </button>
                        <button onClick={() => removeFromWishlist(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors" title="Remove">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Your wishlist is empty</h3>
            <p className="mb-6">Browse products and click the heart icon to add them to your wishlist.</p>
            <Link to="/" className="inline-flex bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition-colors">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
