import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Package,
  Layers,
  ShoppingCart,
  User,
  CreditCard,
  Truck,
  Tag,
  Star,
  BarChart2,
  Headset,
  Bell,
  ShieldAlert,
  Search
} from 'lucide-react';

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isAdminLoggedIn !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={18} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Layers size={18} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={18} /> },
    { name: 'Resellers', path: '/admin/resellers', icon: <Users size={18} /> },
    { name: 'Customers', path: '/admin/customers', icon: <User size={18} /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={18} /> },
    { name: 'Shipping', path: '/admin/shipping', icon: <Truck size={18} /> },
    { name: 'Coupons / Offers', path: '/admin/coupons', icon: <Tag size={18} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <Star size={18} /> },
    { name: 'Reports', path: '/admin/reports', icon: <BarChart2 size={18} /> },
    { name: 'Support', path: '/admin/support', icon: <Headset size={18} /> },
    { name: 'Notifications', path: '/admin/notifications', icon: <Bell size={18} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={18} /> },
    { name: 'Admin Users & Roles', path: '/admin/users', icon: <ShieldAlert size={18} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck size={24} className="text-[#28a745]" />
            <span className="font-bold text-lg">Admin Portal</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
            Management
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                    isActive 
                      ? 'bg-[#28a745] text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800 sticky bottom-0 bg-gray-900">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg transition-colors text-sm font-medium text-gray-300 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 lg:px-8 justify-between shrink-0">
          <div className="flex items-center flex-1">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 mr-4"
            >
              <Menu size={20} />
            </button>
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 max-w-md w-full">
              <Search size={18} className="text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-gray-200 mx-1"></div>
            <div className="text-sm text-gray-600 hidden sm:block">
              Welcome, Admin
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold border border-gray-300">
              A
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 lg:p-8 bg-gray-50">
          <Outlet context={{ globalSearchQuery, setGlobalSearchQuery }} />
        </main>
      </div>
    </div>
  );
}
