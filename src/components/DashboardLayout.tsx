import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet,
  TrendingUp,
  History,
  Download,
  CreditCard,
  Heart,
  HelpCircle,
  User,
  FileCode,
  Menu,
  X,
  RefreshCcw,
  ShoppingCart,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/auth';

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const resellerInfo = {
    shopName: userData?.displayName || currentUser.displayName || "Your Shop Name",
    id: currentUser.uid.substring(0, 5).toUpperCase(),
    phone: currentUser.email || "No email",
    balance: (userData?.walletBalance || 0).toFixed(2),
    photoURL: userData?.photoURL || currentUser.photoURL
  };

  const navItems = [
    { name: 'Dashboard', path: '/reseller/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'My Wallet', path: '/reseller/wallet', icon: <Wallet size={18} /> },
    { name: 'Invest', path: '/reseller/invest', icon: <TrendingUp size={18} /> },
    { name: 'Purchase History', path: '/reseller/orders', icon: <History size={18} />, badge: 'New' },
    { name: 'Withdraw History', path: '/reseller/withdrawals', icon: <RefreshCcw size={18} /> },
    { name: 'Downloads', path: '/reseller/downloads', icon: <Download size={18} /> },
    { name: 'Payment Summary', path: '/reseller/payment-summary', icon: <CreditCard size={18} /> },
    { name: 'Wishlist', path: '/reseller/wishlist', icon: <Heart size={18} /> },
    { name: 'Support Ticket', path: '/reseller/support', icon: <HelpCircle size={18} /> },
    { name: 'Manage Profile', path: '/reseller/profile', icon: <User size={18} /> },
    { name: 'API Documentation', path: '/reseller/api-docs', icon: <FileCode size={18} /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-grow bg-[#f8f9fa] container mx-auto px-4 py-8 max-w-[1400px]">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden bg-white p-4 border-b flex justify-between items-center rounded-lg shadow-sm mb-4">
        <h2 className="font-bold text-lg text-gray-800">My Panel</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-gray-100 rounded">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        w-full md:w-[280px] bg-white flex-shrink-0 rounded-lg shadow-sm
        ${isSidebarOpen ? 'block mb-4' : 'hidden md:block'}
      `}>
        {/* Profile Card */}
        <div className="bg-[#28a745] text-white p-6 rounded-t-lg flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden mb-3 p-1">
             {resellerInfo.photoURL ? (
               <img src={resellerInfo.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
             ) : (
               <div className="w-full h-full rounded-full border border-gray-200 bg-gray-50 flex items-center justify-center text-[#28a745]">
                 <User size={32} />
               </div>
             )}
          </div>
          <div className="text-xs mb-1 opacity-90">ID: {resellerInfo.id}</div>
          <div className="font-bold text-sm mb-1">{resellerInfo.shopName}</div>
          <div className="text-xs mb-3 opacity-90">{resellerInfo.phone}</div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1">
            <span className="w-3 h-3 rounded-full border border-white/50 flex items-center justify-center text-[8px]">৳</span>
            {resellerInfo.balance} ৳
          </div>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-[#28a745] text-white' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="flex-shrink-0 opacity-80">{item.icon}</span>
              <span className="flex-grow">{item.name}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  window.location.pathname === item.path ? 'bg-white text-green-600' : 'bg-[#28a745] text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded transition-colors text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <span className="flex-shrink-0 opacity-80"><LogOut size={18} /></span>
            <span className="flex-grow text-left">Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0 md:ml-6">
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
