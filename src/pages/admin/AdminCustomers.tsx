import { useState } from 'react';
import { 
  Search, UserX, UserCheck, Mail, Phone, MapPin, 
  ShoppingBag, DollarSign, Calendar
} from 'lucide-react';

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  
  const [customers, setCustomers] = useState([
    { id: 'CUST-1001', name: 'Rahim Uddin', email: 'rahim@example.com', phone: '01711223344', address: 'House 12, Road 5, Dhanmondi, Dhaka', totalOrders: 15, totalSpent: 45000, lastOrder: '2023-10-25', status: 'Active', registered: '2022-01-15' },
    { id: 'CUST-1002', name: 'Karim Hasan', email: 'karim@example.com', phone: '01811223344', address: 'Block C, Halishahar, Chattogram', totalOrders: 3, totalSpent: 8500, lastOrder: '2023-10-24', status: 'Active', registered: '2023-05-20' },
    { id: 'CUST-1003', name: 'Sumi Akter', email: 'sumi@example.com', phone: '01911223344', address: 'Mirpur 10, Dhaka', totalOrders: 0, totalSpent: 0, lastOrder: '-', status: 'Inactive', registered: '2023-10-01' },
    { id: 'CUST-1004', name: 'Jashim Ahmed', email: 'jashim@example.com', phone: '01611223344', address: 'Sylhet Sadar, Sylhet', totalOrders: 7, totalSpent: 12400, lastOrder: '2023-09-15', status: 'Blocked', registered: '2022-11-10' }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const toggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Blocked' ? 'Active' : 'Blocked';
    setCustomers(customers.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedCustomer?.id === id) {
      setSelectedCustomer({ ...selectedCustomer, status: newStatus });
    }
  };

  const filteredCustomers = customers.filter(c => {
    const matchesTab = filter === 'All' || c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-green-50 text-green-700 border-green-200 w-max">Active</span>;
      case 'Inactive': return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-300 w-max">Inactive</span>;
      case 'Blocked': return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-red-50 text-red-700 border-red-200 w-max">Blocked</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
      </div>

      {!selectedCustomer ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in">
          <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50 border-b border-gray-100">
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search name, email, or phone..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-[#28a745]" 
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
              {['All', 'Active', 'Inactive', 'Blocked'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${
                    filter === f ? 'bg-[#28a745] text-white border-[#28a745]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-4">Customer Info</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4 text-right">Orders</th>
                  <th className="px-6 py-4 text-right">Total Spent</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredCustomers.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{customer.name}</div>
                      <div className="text-xs text-gray-500 mt-1">ID: {customer.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 mb-1"><Mail size={12}/> {customer.email}</div>
                      <div className="flex items-center gap-1.5 text-gray-600"><Phone size={12}/> {customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      {customer.totalOrders}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-[#28a745]">
                      ৳{customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(customer.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); }}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No customers found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in space-y-6">
          <button 
            onClick={() => setSelectedCustomer(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm bg-white border border-gray-300 px-4 py-2 rounded-lg"
          >
            &larr; Back to Customers
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{selectedCustomer.name}</h3>
                    <p className="text-sm text-gray-500">{selectedCustomer.id}</p>
                  </div>
                  {getStatusBadge(selectedCustomer.status)}
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Email</p>
                      <p className="font-medium text-gray-800">{selectedCustomer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Phone</p>
                      <p className="font-medium text-gray-800">{selectedCustomer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Address</p>
                      <p className="font-medium text-gray-800">{selectedCustomer.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-500 text-xs">Registered On</p>
                      <p className="font-medium text-gray-800">{selectedCustomer.registered}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => toggleStatus(selectedCustomer.id, selectedCustomer.status)}
                    className={`w-full py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 ${
                      selectedCustomer.status === 'Blocked' 
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200' 
                        : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                    }`}
                  >
                    {selectedCustomer.status === 'Blocked' ? <UserCheck size={16} /> : <UserX size={16} />}
                    {selectedCustomer.status === 'Blocked' ? 'Unblock Customer' : 'Block Customer'}
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-800">{selectedCustomer.totalOrders}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Spent</p>
                    <p className="text-2xl font-bold text-[#28a745]">৳{selectedCustomer.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-800">Recent Orders</h3>
                  <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Items</th>
                        <th className="px-4 py-3 text-right">Total</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-blue-600">#ORD-5012</td>
                        <td className="px-4 py-3 text-gray-600">{selectedCustomer.lastOrder}</td>
                        <td className="px-4 py-3 text-gray-600">2 items</td>
                        <td className="px-4 py-3 text-right font-medium">৳ 2,450</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200">Delivered</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-blue-600">#ORD-4988</td>
                        <td className="px-4 py-3 text-gray-600">15 May, 2023</td>
                        <td className="px-4 py-3 text-gray-600">1 item</td>
                        <td className="px-4 py-3 text-right font-medium">৳ 1,200</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200">Delivered</span>
                        </td>
                      </tr>
                      {selectedCustomer.totalOrders > 2 && (
                        <tr className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-blue-600">#ORD-4720</td>
                          <td className="px-4 py-3 text-gray-600">02 Apr, 2023</td>
                          <td className="px-4 py-3 text-gray-600">4 items</td>
                          <td className="px-4 py-3 text-right font-medium">৳ 5,600</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs border border-green-200">Delivered</span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
