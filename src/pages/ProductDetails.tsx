import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Download, Mail, Twitter, Facebook, Linkedin, MessageCircle, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  // Mock product data
  const product = {
    id: id || '1451',
    name: 'Electric Grinder Machine 950 W NM-8600',
    price: 590.00,
    sku: '1451',
    category: 'Home Appliances',
    stock: 45,
    rating: 0,
    reviews: 0,
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=600',
    ],
    description: 'শক্তিশালী ৯৫০W মোটর: দ্রুত এবং দক্ষতার সাথে কঠিন শস্য বা মশলাকেও গুঁড়ো করার জন্য একটি শক্তিশালী মোটর।',
    features: [
      'ধারালো ছুরি (Eight-page knife): বিশেষ ভাবে ডিজাইন করা ব্লেড সর্বোচ্চ সূক্ষ্মতা এবং সমানভাবে গুঁড়ো করা নিশ্চিত করে।',
      'কম্প্যাক্ট ডিজাইন: মজবুত বডি এবং সহজে ধরার হ্যান্ডেল ব্যবহারের সুবিধা দেয়।',
      'বহুমুখী ব্যবহার: কফি বিন, শুকনো মশলা, শস্য, এবং অন্যান্য উপাদান গুঁড়ো করার জন্য আদর্শ।',
      'আপনার রান্নাঘরের জন্য এটি একটি অত্যাবশ্যকীয় এবং নির্ভরযোগ্য সরঞ্জাম।'
    ]
  };

  const [sellingPrice, setSellingPrice] = useState<number | ''>('');
  const [addedToCart, setAddedToCart] = useState(false);

  const handleProceedToCheckout = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sellingPrice: sellingPrice === '' ? product.price : Number(sellingPrice),
      quantity: quantity,
      image: product.images[0]
    });
    navigate('/reseller/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row p-6 lg:p-8">
          
          {/* Images Section */}
          <div className="w-full md:w-[45%] flex gap-4 pr-0 md:pr-8">
            <div className="w-20 flex flex-col gap-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-full aspect-square border-2 rounded-sm overflow-hidden bg-gray-50 flex-shrink-0 ${
                    activeImage === idx ? 'border-[#28a745]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-grow aspect-square rounded border border-gray-100 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              <img 
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-[55%] flex flex-col pt-6 md:pt-0">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{product.name}</h1>
            <div className="text-sm text-gray-500 mb-2">Product Code: {product.sku}</div>
            
            <div className="flex items-center gap-1 mb-4">
              <div className="flex text-gray-300">
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
              </div>
              <span className="text-gray-400 text-sm ml-1">(0 reviews)</span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-sm border-b border-gray-100 pb-4">
              <span className="text-gray-500">Sold by:</span>
              <span className="text-gray-800 font-medium">Inhouse product</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-sm text-gray-500 w-24 flex-shrink-0">Price:</span>
              <div>
                <span className="text-2xl font-bold text-[#28a745]">{product.price.toFixed(2)} ৳</span>
                <span className="text-sm text-gray-500 ml-1">/pc</span>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <label className="text-sm text-gray-500 w-24 flex-shrink-0">Sell Price:</label>
              <div className="flex-grow max-w-[280px]">
                <div className="relative">
                  <input 
                    type="number" 
                    min={product.price}
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Sell Price"
                    className={`w-full px-4 py-2 border-2 rounded-lg outline-none text-center font-medium transition-colors ${sellingPrice !== '' && Number(sellingPrice) < product.price ? 'border-red-400 focus:border-red-500' : 'border-indigo-50 focus:border-indigo-100'}`} 
                  />
                </div>
                {sellingPrice !== '' && Number(sellingPrice) < product.price && (
                  <div className="text-red-500 text-xs mt-1">Selling price cannot be less than base wholesale price</div>
                )}
                {sellingPrice !== '' && Number(sellingPrice) >= product.price && (
                  <div className="text-green-600 text-xs mt-1 font-medium">Estimated Profit: {(Number(sellingPrice) - product.price) * quantity} ৳</div>
                )}
              </div>
            </div>

            <div className="flex items-center mb-8 border-b border-gray-100 pb-8">
              <span className="text-sm text-gray-500 w-24 flex-shrink-0">Quantity:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 overflow-hidden h-9">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    readOnly 
                    className="w-10 h-full text-center text-sm font-medium outline-none bg-transparent" 
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">(In Stock)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={handleProceedToCheckout}
                disabled={sellingPrice !== '' && Number(sellingPrice) < product.price}
                className="bg-green-50 text-[#28a745] border border-[#28a745] px-6 py-2 text-sm flex items-center justify-center gap-2 hover:bg-[#28a745] hover:text-white transition-colors min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={16} /> Proceed to Checkout
              </button>
              {product.images.map((_, idx) => (
                <button key={idx} className="bg-[#28a745] text-white px-3 py-2 text-sm flex items-center gap-1 hover:bg-green-700 transition-colors">
                  <Download size={14} /> img{idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-[#28a745] mb-6">
              <button 
                onClick={() => addToWishlist({id: product.id, name: product.name, price: product.price, image: product.images[0]})}
                className="hover:underline"
              >
                {isInWishlist(product.id) ? 'Saved to wishlist' : 'Add to wishlist'}
              </button>
              <button className="hover:underline">
                Add to compare
              </button>
            </div>

            <div className="flex items-center gap-2">
               <span className="text-sm text-gray-500 w-24 flex-shrink-0">Share:</span>
               <div className="flex gap-1">
                 <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-sm cursor-pointer hover:opacity-90"><Mail size={16} /></div>
                 <div className="w-8 h-8 bg-sky-400 text-white flex items-center justify-center rounded-sm cursor-pointer hover:opacity-90"><Twitter size={16} /></div>
                 <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-sm cursor-pointer hover:opacity-90"><Facebook size={16} /></div>
                 <div className="w-8 h-8 bg-blue-700 text-white flex items-center justify-center rounded-sm cursor-pointer hover:opacity-90"><Linkedin size={16} /></div>
                 <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-sm cursor-pointer hover:opacity-90"><MessageCircle size={16} /></div>
               </div>
            </div>

          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar (Sold by) */}
        <div className="w-full lg:w-[250px] flex-shrink-0 flex flex-col gap-6">
          <div className="bg-white rounded border border-gray-100 p-4 shadow-sm">
            <h3 className="text-sm text-gray-500 mb-2">Sold by</h3>
            <div className="font-medium text-gray-800 mb-2">merrono</div>
            <div className="flex flex-col items-center justify-center border border-gray-100 rounded p-4">
              <div className="flex text-yellow-400 mb-1">
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star fill="currentColor" size={14} />
                <Star size={14} />
              </div>
              <div className="text-xs text-gray-500">(5 customer reviews)</div>
            </div>
          </div>
          
          <div className="bg-white rounded border border-gray-100 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Top Selling Products</h3>
            <div className="flex gap-3 items-center">
              <img src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=100" alt="Product" className="w-16 h-16 object-cover rounded border border-gray-100" />
              <div>
                <h4 className="text-sm text-gray-800 line-clamp-2 hover:text-green-600 cursor-pointer mb-1">Smart Mini Neck Massager Portable Electronic...</h4>
                <div className="text-[#28a745] font-bold text-sm">190.00 ৳</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Description) */}
        <div className="flex-grow bg-white rounded border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button className="px-6 py-4 text-sm font-bold text-gray-800 border-b-2 border-black">
              Description
            </button>
            <button className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors">
              reviews
            </button>
          </div>
          
          <div className="p-6 md:p-8 text-gray-700 text-sm leading-relaxed space-y-4">
            <p className="font-bold">মূল বৈশিষ্ট্য:</p>
            <p>{product.description}</p>
            {product.features.map((feature, idx) => (
              <p key={idx}>{feature}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
