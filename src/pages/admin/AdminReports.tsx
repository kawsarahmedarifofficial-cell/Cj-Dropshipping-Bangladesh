import { useState } from 'react';
import { 
  BarChart3, TrendingUp, DollarSign, Download, 
  Calendar, PieChart as PieChartIcon, ShoppingBag, Users, FileText
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const salesData = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 2000, profit: 9800 },
  { name: 'Apr', revenue: 2780, profit: 3908 },
  { name: 'May', revenue: 1890, profit: 4800 },
  { name: 'Jun', revenue: 2390, profit: 3800 },
  { name: 'Jul', revenue: 3490, profit: 4300 },
];

const orderStatusData = [
  { name: 'Delivered', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Processing', value: 300 },
  { name: 'Cancelled', value: 200 },
];
const COLORS = ['#28a745', '#f59e0b', '#3b82f6', '#ef4444'];

export default function AdminReports() {
  const [activeReport, setActiveReport] = useState('sales');
  const [timeRange, setTimeRange] = useState('monthly');

  const reportTypes = [
    { id: 'sales', name: 'Sales & Revenue', icon: <TrendingUp size={16} /> },
    { id: 'orders', name: 'Order Status', icon: <ShoppingBag size={16} /> },
    { id: 'products', name: 'Product Performance', icon: <BarChart3 size={16} /> },
    { id: 'resellers', name: 'Reseller Performance', icon: <Users size={16} /> },
    { id: 'refunds', name: 'Refunds & Payouts', icon: <DollarSign size={16} /> }
  ];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Analytics & Reports</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} /> Export CSV
          </button>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <FileText size={16} /> Export PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {reportTypes.map(report => (
            <button
              key={report.id}
              onClick={() => setActiveReport(report.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeReport === report.id 
                  ? 'bg-[#28a745] text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {report.icon}
              {report.name}
            </button>
          ))}
        </div>

        {/* Report Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar size={18} className="text-[#28a745]" /> Time Range
            </h3>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {['daily', 'weekly', 'monthly', 'yearly'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
                    timeRange === range ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {activeReport === 'sales' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-800 mb-2">৳ 450,000</p>
                  <p className="text-sm text-green-600 flex items-center gap-1"><TrendingUp size={14}/> +12.5% from last period</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium mb-1">Net Profit</p>
                  <p className="text-3xl font-bold text-[#28a745] mb-2">৳ 125,000</p>
                  <p className="text-sm text-green-600 flex items-center gap-1"><TrendingUp size={14}/> +8.2% from last period</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-blue-600 mb-2">342</p>
                  <p className="text-sm text-green-600 flex items-center gap-1"><TrendingUp size={14}/> +15% from last period</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                <h4 className="font-bold text-gray-800 mb-4">Sales & Profit Overview ({timeRange})</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} tickFormatter={(val) => `৳${val}`} />
                    <RechartsTooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                    <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                    <Bar dataKey="profit" name="Profit" fill="#28a745" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeReport === 'orders' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col items-center justify-center">
                <h4 className="font-bold text-gray-800 w-full text-left mb-4">Order Status Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Legend iconType="circle" layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{fontSize: '14px'}} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeReport === 'products' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-800">Top Selling Products</h3>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">Product Name</th>
                      <th className="px-6 py-4 text-right">Units Sold</th>
                      <th className="px-6 py-4 text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">Premium Wireless Headphones</td>
                      <td className="px-6 py-4 text-right">145</td>
                      <td className="px-6 py-4 text-right font-medium text-[#28a745]">৳ 290,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">Smart Watch Series 8</td>
                      <td className="px-6 py-4 text-right">89</td>
                      <td className="px-6 py-4 text-right font-medium text-[#28a745]">৳ 222,500</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeReport === 'resellers' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-bold text-gray-800">Top Performing Resellers</h3>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase">
                    <tr>
                      <th className="px-6 py-4">Reseller Name</th>
                      <th className="px-6 py-4 text-right">Orders Generated</th>
                      <th className="px-6 py-4 text-right">Total Sales</th>
                      <th className="px-6 py-4 text-right">Commission Earned</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">Eviara Cobra Mart</td>
                      <td className="px-6 py-4 text-right">45</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-800">৳ 112,500</td>
                      <td className="px-6 py-4 text-right font-bold text-purple-600">৳ 11,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeReport === 'refunds' && (
            <div className="space-y-6 animate-in fade-in">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium mb-1">Total Refunds</p>
                  <p className="text-3xl font-bold text-red-600 mb-2">৳ 12,500</p>
                  <p className="text-sm text-gray-500">Across 8 orders</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500 font-medium mb-1">Total Payouts (Resellers)</p>
                  <p className="text-3xl font-bold text-purple-600 mb-2">৳ 45,000</p>
                  <p className="text-sm text-gray-500">Processed this period</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
