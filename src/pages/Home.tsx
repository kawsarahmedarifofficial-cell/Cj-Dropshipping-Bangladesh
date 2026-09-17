import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle, Truck, ShieldCheck, DollarSign, Store, TrendingUp, User, Star, ShoppingCart } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Women Clothing & Fashion', icon: '👗' },
    { name: 'Gadgets', icon: '📱' },
    { name: 'Watch', icon: '⌚' },
    { name: 'Gents Fashion', icon: '👕' },
    { name: 'All Gift item', icon: '🎁' },
    { name: 'Organic Product', icon: '🌿' },
    { name: 'Electronics item', icon: '💻' },
    { name: 'Home & Lifestyle', icon: '🏠' },
    { name: 'Kids Zone', icon: '🧸' },
    { name: 'Winter Collection', icon: '🧥' },
    { name: 'Global Product', icon: '🌍' },
  ];

  const categoryCards = [
    { name: 'Gadgets', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=200' },
    { name: 'Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
    { name: 'Electronics item', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=200' },
    { name: 'MACRAME', image: 'https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Kids Zone', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=200' },
    { name: 'Global Product', image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&q=80&w=200' },
  ];

  return (
    <div className="flex-grow bg-[#f4f7f6]">
      {/* Main Layout: Sidebar + Hero */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Categories Sidebar */}
          <div className="hidden lg:block w-[260px] flex-shrink-0 bg-white shadow-sm">
            <div className="bg-[#e8f5e9] p-4 flex justify-between items-center border-b border-green-100">
              <h3 className="font-semibold text-gray-800 text-[15px]">Categories</h3>
              <Link to="/reseller/categories" className="text-[13px] text-gray-600 hover:text-green-600">See All &gt;</Link>
            </div>
            <div className="py-2">
              <ul className="space-y-0.5">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <Link to={`/reseller/search?q=${encodeURIComponent(cat.name)}`} className="flex items-center px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors">
                      <span className="mr-3 text-lg opacity-70">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Hero Section & Categories */}
          <div className="flex-grow flex flex-col gap-4 overflow-hidden min-w-0">
            {/* Banner Image Area */}
            <div className="relative rounded-md overflow-hidden bg-[#071d2b] w-full" style={{ aspectRatio: '21/8' }}>
               {/* This simulates the complex banner from the screenshot */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#071d2b] to-[#0c3140] z-0"></div>
               
               <div className="relative z-10 w-full h-full flex items-center p-8">
                 <div className="w-1/2 text-white">
                   <div className="flex items-center mb-4">
                      <span className="text-green-500 text-4xl font-bold mr-2">M</span>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold leading-none tracking-wide">MERRONO</span>
                        <span className="text-[9px] text-green-500 tracking-widest mt-1">.COM</span>
                      </div>
                   </div>
                   
                   <p className="text-[#f1c40f] text-xs font-bold tracking-wider mb-2">BUILD YOUR BUSINESS. CREATE FREEDOM.</p>
                   <h1 className="text-4xl lg:text-5xl font-extrabold mb-1">START YOUR</h1>
                   <h1 className="text-4xl lg:text-5xl font-extrabold text-[#28a745] mb-4">DROPSHIPPING <span className="text-white">JOURNEY</span></h1>
                   
                   <div className="flex items-center space-x-4 text-xs font-semibold mb-6 tracking-wide">
                     <span>SELL ONLINE</span>
                     <span className="w-1 h-1 bg-white rounded-full"></span>
                     <span>EARN DAILY</span>
                     <span className="w-1 h-1 bg-white rounded-full"></span>
                     <span>NO STOCK NEEDED</span>
                   </div>
                   
                   <Link to="/register" className="inline-flex bg-[#28a745] hover:bg-green-600 text-white px-6 py-2.5 font-bold rounded items-center shadow-lg transition-colors">
                     <ShoppingCart size={18} className="mr-2" />
                     JOIN MERRONO TODAY!
                  </Link>
                 </div>
                 
                 {/* Right side decorations (simulated) */}
                 <div className="w-1/2 h-full relative hidden md:block">
                   <div className="absolute bottom-0 right-0 w-full h-[90%] bg-contain bg-no-repeat bg-right-bottom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400')" }}></div>
                 </div>
               </div>

               {/* Carousel Controls */}
               <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 shadow z-20 hover:bg-white">
                 <ChevronLeft size={20} />
               </button>
               <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-800 shadow z-20 hover:bg-white">
                 <ChevronRight size={20} />
               </button>
            </div>

            {/* Sub Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categoryCards.map((card, idx) => (
                <div key={idx} className="bg-white rounded p-3 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="aspect-square mb-2 overflow-hidden flex items-center justify-center bg-gray-50 rounded">
                    <img src={card.image} alt={card.name} className="object-cover w-full h-full hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-[13px] text-gray-700">{card.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Todays Deal Sidebar */}
          <div className="hidden xl:block w-[240px] flex-shrink-0 bg-white">
             <div className="bg-[#e8f5e9] p-4 flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 text-[15px]">Todays Deal</h3>
              <span className="bg-[#28a745] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Hot</span>
            </div>
            <div className="bg-[#28a745] p-3 space-y-3 min-h-[400px]">
              {[1, 2, 3].map((item) => (
                <Link to={`/reseller/product/${item}`} key={item} className="bg-white p-2 flex items-center justify-center h-[120px] shadow-sm relative group cursor-pointer block">
                  <img src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=150`} alt="Deal" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products (Simulation based on screenshot) */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white p-6 rounded-md">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 inline-block pb-1">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {[1, 2, 3, 4, 5].map((i) => (
               <Link to={`/reseller/product/${i}`} key={i} className="border border-gray-100 rounded hover:shadow-lg transition-shadow bg-white overflow-hidden group block">
                 <div className="aspect-square bg-gray-50 p-4 relative">
                   <img src={`https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200`} alt="Product" className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                 </div>
                 <div className="p-3">
                   <div className="text-xs text-gray-500 mb-1">Watch</div>
                   <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">Smart Watch Series {i}</h3>
                   <div className="font-bold text-green-600">৳ 1,250</div>
                </div>
              </Link>
             ))}
          </div>
        </div>
      </div>
      
      {/* Footer is handled by Footer component */}
    </div>
  );
}
