import { useState } from 'react';
import { Search, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

function ProductCard({ product }: { product: Product }) {
  const [sellingPrice, setSellingPrice] = useState(product.price + 300);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sellingPrice: sellingPrice,
      image: product.image
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
      <div className="h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs font-medium text-green-600 mb-1">{product.category}</span>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto pt-4 border-t border-gray-50 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Cost Price:</span>
            <span className="font-bold text-gray-900">৳ {product.price}</span>
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Your Selling Price</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                ৳
              </div>
              <input 
                type="number" 
                className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none text-sm"
                placeholder="e.g. 1500"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
              />
            </div>
          </div>
          
          <button 
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-colors border ${
              added 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border-green-200 hover:border-green-600'
            }`}
          >
            {added ? (
              <>
                <Check size={18} />
                Added to Cart
              </>
            ) : (
              <>
                <Plus size={18} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const dummyProducts: Product[] = [
    { id: '1', name: 'Premium Wireless Headphones', price: 1200, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300' },
    { id: '2', name: 'Men\'s Casual Shirt', price: 850, category: 'Gents Fashion', image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?auto=format&fit=crop&q=80&w=300' },
    { id: '3', name: 'Smart Fitness Watch', price: 1500, category: 'Watch', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=300' },
    { id: '4', name: 'Organic Green Tea', price: 350, category: 'Organic Product', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=300' },
    { id: '5', name: 'Bluetooth Speaker', price: 950, category: 'Electronics item', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=300' },
    { id: '6', name: 'Women\'s Handbag', price: 1800, category: 'Women Clothing & Fashion', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=300' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Search products..."
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 bg-white">
            <option>All Categories</option>
            <option>Gadgets</option>
            <option>Fashion</option>
            <option>Electronics</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
