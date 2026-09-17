import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Clock, 
  Settings as Cog, 
  Truck, 
  CheckCircle, 
  XCircle, 
  User, 
  AlertTriangle, 
  CreditCard, 
  RotateCcw, 
  ArrowDownToLine 
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: '0.00',
    totalProfit: '0.00',
    totalOrders: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalCustomers: 0,
    totalResellers: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    pendingPayments: 0,
    refundRequests: 0,
    withdrawRequests: 0
  });

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      
      {/* Financial Overview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Financial Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/admin/reports" className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Revenue</div>
              <div className="text-xl font-bold text-gray-800">৳ {stats.totalRevenue}</div>
            </div>
          </Link>
          <Link to="/admin/reports" className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Profit</div>
              <div className="text-xl font-bold text-gray-800">৳ {stats.totalProfit}</div>
            </div>
          </Link>
          <Link to="/admin/payments" className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center shrink-0">
              <CreditCard size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Pending Payments</div>
              <div className="text-xl font-bold text-gray-800">{stats.pendingPayments}</div>
            </div>
          </Link>
          <Link to="/admin/payments" className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center shrink-0">
              <ArrowDownToLine size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Withdraw Requests</div>
              <div className="text-xl font-bold text-gray-800">{stats.withdrawRequests}</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Order Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Orders Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Link to="/admin/orders" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium uppercase">Total</div>
              <Package size={16} className="text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.totalOrders}</div>
          </Link>
          
          <Link to="/admin/orders?status=pending" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium uppercase">Pending</div>
              <Clock size={16} className="text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.pendingOrders}</div>
          </Link>

          <Link to="/admin/orders?status=processing" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium uppercase">Processing</div>
              <Cog size={16} className="text-gray-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.processingOrders}</div>
          </Link>

          <Link to="/admin/orders?status=shipped" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium uppercase">Shipped</div>
              <Truck size={16} className="text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.shippedOrders}</div>
          </Link>

          <Link to="/admin/orders?status=delivered" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium uppercase">Delivered</div>
              <CheckCircle size={16} className="text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.deliveredOrders}</div>
          </Link>

          <Link to="/admin/orders?status=cancelled" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 font-medium uppercase">Cancelled</div>
              <XCircle size={16} className="text-red-500" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{stats.cancelledOrders}</div>
          </Link>
        </div>
      </div>

      {/* Users & Inventory */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Users & Inventory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link to="/admin/customers" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
              <User size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase">Customers</div>
              <div className="text-lg font-bold text-gray-800">{stats.totalCustomers}</div>
            </div>
          </Link>
          
          <Link to="/admin/resellers" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase">Resellers</div>
              <div className="text-lg font-bold text-gray-800">{stats.totalResellers}</div>
            </div>
          </Link>

          <Link to="/admin/products" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
              <Package size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase">Products</div>
              <div className="text-lg font-bold text-gray-800">{stats.totalProducts}</div>
            </div>
          </Link>

          <Link to="/admin/products?stock=low" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase">Low Stock</div>
              <div className="text-lg font-bold text-gray-800">{stats.lowStockProducts}</div>
            </div>
          </Link>

          <Link to="/admin/orders?status=refunded" className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center shrink-0">
              <RotateCcw size={20} />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium uppercase">Refunds</div>
              <div className="text-lg font-bold text-gray-800">{stats.refundRequests}</div>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
}
