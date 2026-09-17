import { Bell, Gift, Building2, Banknote, Wallet, LineChart, MoveUpRight, MoveDownLeft, Clock, ShoppingCart, Heart, PackageCheck, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { userData } = useAuth();
  
  const walletBalance = userData?.walletBalance || 0;
  const totalProfit = userData?.totalEarnings || 0;
  
  return (
    <div className="space-y-6">
      {/* Alert Notice */}
      <div className="bg-[#28a745] text-white p-4 rounded-lg flex items-center gap-3">
        <Bell className="text-white" size={24} />
        <p className="text-sm font-medium">প্রথম অর্ডারের জন্য আপনার ওয়ালেটে 200 টাকা থাকতে হবে। ওয়ালেটে টাকা এড করতে এড ব্যালেন্স করুন।</p>
      </div>

      {/* Top Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Security Money */}
        <div className="bg-[#1f2937] text-white p-6 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-[#ff4757] rounded-lg flex items-center justify-center mb-4 relative z-10">
            <Gift size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-medium mb-2 relative z-10">Security Money</h3>
          <div className="text-3xl font-bold text-[#fbc531] mb-2 relative z-10">200.00 ৳</div>
          <p className="text-xs text-gray-300 relative z-10">এই টাকা ব্যালেন্সে রেখে তারপর Withdraw করতে হবে।</p>
        </div>

        {/* Add Balance */}
        <Link to="/reseller/wallet" className="bg-[#ff6b6b] text-white p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-opacity-90 transition-opacity">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Building2 size={24} className="text-white" />
          </div>
          <h3 className="text-sm font-medium">Add Balance</h3>
        </Link>

        {/* Withdraw */}
        <Link to="/reseller/wallet" className="bg-[#2ed573] text-white p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-opacity-90 transition-opacity">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
            <Banknote size={24} className="text-white" />
          </div>
          <h3 className="text-sm font-medium">Withdraw</h3>
        </Link>
      </div>

      {/* Financial Overview */}
      <div>
        <h3 className="text-[#3b82f6] text-sm font-medium flex items-center gap-2 mb-4">
          <span className="text-lg">$</span> Financial Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#ff7f50] text-white p-5 rounded-lg flex flex-col justify-between h-32">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <Wallet size={16} />
            </div>
            <div>
              <div className="font-bold text-xl mb-1">{walletBalance.toFixed(2)} ৳</div>
              <div className="text-xs opacity-90">Current Balance</div>
            </div>
          </div>
          
          <div className="bg-[#2ed573] text-white p-5 rounded-lg flex flex-col justify-between h-32">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <LineChart size={16} />
            </div>
            <div>
              <div className="font-bold text-xl mb-1">{totalProfit.toFixed(2)} ৳</div>
              <div className="text-xs opacity-90">Total Profit</div>
            </div>
          </div>
          
          <div className="bg-[#5352ed] text-white p-5 rounded-lg flex flex-col justify-between h-32">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <MoveUpRight size={16} />
            </div>
            <div>
              <div className="font-bold text-xl mb-1">{(userData?.totalDeposit || 0).toFixed(2)} ৳</div>
              <div className="text-xs opacity-90">Total Deposit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
