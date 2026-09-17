import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, RefreshCcw, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { logout } from '../lib/auth';

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="border-b border-gray-100 py-2 text-[13px] text-gray-600">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>Whatsapp: 01628952048 Helpline: 01628952048</div>
          <div className="flex space-x-4">
            {currentUser ? (
              <>
                <span className="text-green-700 font-medium">{currentUser.displayName || currentUser.email}</span>
                <Link to="/reseller/dashboard" className="hover:text-green-600 transition-colors">Dashboard</Link>
                <button onClick={handleLogout} className="hover:text-green-600 transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-600 transition-colors">Login</Link>
                <Link to="/register" className="hover:text-green-600 transition-colors">Registration</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-6 flex flex-wrap lg:flex-nowrap justify-between items-center gap-6 border-b border-gray-100">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="flex items-center text-3xl font-bold tracking-tight">
            <div className="relative flex items-center">
              <span className="text-green-600">M</span>
              <span className="text-[#0b1c2c] ml-1">MERRONO</span>
            </div>
            <div className="flex flex-col justify-end ml-1 pb-1">
              <span className="text-[10px] text-green-600 leading-none font-bold tracking-widest uppercase mt-4">.COM</span>
            </div>
          </div>
        </Link>

        {/* Search */}
        <div className="flex-grow max-w-3xl w-full order-3 lg:order-none">
          <form onSubmit={handleSearch} className="flex border border-gray-200 rounded-full overflow-hidden">
            <input 
              type="text" 
              placeholder="I am shopping for..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 pr-4 py-2.5 w-full outline-none text-sm"
            />
            <button type="submit" className="bg-[#28a745] text-white px-8 py-2.5 hover:bg-green-600 transition-colors flex items-center justify-center min-w-[60px]">
              <Search size={20} />
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-8 text-gray-700 text-[13px]">
          <Link to="/reseller/compare" className="flex items-center gap-2 cursor-pointer hover:text-green-600 group">
            <div className="relative">
              <RefreshCcw size={22} className="text-gray-600 group-hover:text-green-600" />
              <span className="absolute -top-2 -right-2 bg-[#28a745] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">0</span>
            </div>
            <span>Compare</span>
          </Link>
          <Link to="/reseller/wishlist" className="flex items-center gap-2 cursor-pointer hover:text-green-600 group">
            <div className="relative">
              <Heart size={22} className="text-gray-600 group-hover:text-green-600" />
              <span className="absolute -top-2 -right-2 bg-[#28a745] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{wishlistCount}</span>
            </div>
            <span>Wishlist</span>
          </Link>
          <Link to="/reseller/cart" className="flex items-center gap-2 cursor-pointer hover:text-green-600 group">
            <div className="relative">
              <ShoppingCart size={22} className="text-gray-600 group-hover:text-green-600" />
              <span className="absolute -top-2 -right-2 bg-[#28a745] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{cartCount}</span>
            </div>
            <span>Cart</span>
          </Link>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="bg-white shadow-sm hidden md:block">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-12 text-gray-700 text-[15px] py-3 justify-center">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <Link to="/reseller/categories" className="hover:text-green-600 transition-colors">Categories</Link>
            <Link to="/" className="hover:text-green-600 transition-colors">Flash Sale</Link>
            <Link to="/reseller/blog" className="hover:text-green-600 transition-colors">Business</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
