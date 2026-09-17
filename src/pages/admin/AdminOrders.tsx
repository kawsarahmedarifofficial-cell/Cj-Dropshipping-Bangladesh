import { useState, useEffect } from 'react';
import { Search, Eye, Filter, CheckCircle, Truck, Package, XCircle, Clock } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, increment, orderBy, query, runTransaction } from 'firebase/firestore';
import { db } from '../../lib/firebase';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // Create a query without complex indexing constraints first
      const q = query(collection(db, 'orders'));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Local sort
      ordersData.sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, currentStatus: string, newStatus: OrderStatus, resellerId: string, profit: number) => {
    if (currentStatus === newStatus) return;
    if (newStatus === 'Delivered' && !window.confirm('Marking as delivered will automatically add the profit to the reseller. Proceed?')) return;
    
    setUpdating(orderId);
    try {
      const orderRef = doc(db, 'orders', orderId);
      
      // Check if it's newly delivered and hasn't paid out profit yet
      if (newStatus === 'Delivered') {
        const orderDoc = orders.find(o => o.id === orderId);
        if (orderDoc && !orderDoc.profitPaid) {
          const resellerRef = doc(db, 'users', resellerId);
          
          await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(resellerRef);
            if (!userDoc.exists()) {
              throw new Error("Reseller does not exist!");
            }
            
            // Increment walletBalance
            const currentBalance = userDoc.data().walletBalance || 0;
            const currentEarnings = userDoc.data().totalEarnings || 0;
            
            transaction.update(resellerRef, {
              walletBalance: currentBalance + (profit || 0),
              totalEarnings: currentEarnings + (profit || 0)
            });
            
            transaction.update(orderRef, {
              deliveryStatus: newStatus,
              profitPaid: true,
              courierPaymentStatus: 'Paid'
            });
          });
          
          // Update local state
          setOrders(orders.map(o => o.id === orderId ? { ...o, deliveryStatus: newStatus, profitPaid: true, courierPaymentStatus: 'Paid' } : o));
          setUpdating(null);
          return;
        }
      }
      
      const updates: any = { deliveryStatus: newStatus };
      await updateDoc(orderRef, updates);
      
      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, ...updates } : o));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.invoiceId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.resellerName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || order.deliveryStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <button onClick={fetchOrders} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
          Refresh List
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by Invoice ID, Customer, or Reseller..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#28a745]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#28a745] text-sm font-medium text-gray-700"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4">Invoice ID & Date</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Reseller</th>
                <th className="px-6 py-4">Financials</th>
                <th className="px-6 py-4">Profit</th>
                <th className="px-6 py-4">Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading orders...</td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[#28a745]">{order.invoiceId}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {order.createdAt ? new Date(order.createdAt.toDate()).toLocaleString('en-GB') : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.customerName}</div>
                      <div className="text-gray-500 text-xs">{order.customerPhone}</div>
                      <div className="text-gray-500 text-xs truncate max-w-[200px]" title={order.customerAddress}>
                        {order.customerAddress} ({order.area === 'inside_dhaka' ? 'Inside' : 'Outside'} Dhaka)
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">{order.resellerName}</div>
                      <div className="text-xs text-gray-500 font-mono mt-1" title={order.resellerId}>
                        {order.resellerId?.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-500 flex justify-between w-32">
                        <span>Base Cost:</span><span className="font-medium text-gray-900">৳ {order.wholesaleSubtotal}</span>
                      </div>
                      <div className="text-xs text-gray-500 flex justify-between w-32 mt-1">
                        <span>Sell Price:</span><span className="font-bold text-gray-900">৳ {order.sellingSubtotal}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${order.profitPaid ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        ৳ {order.profit} {order.profitPaid && '(Paid)'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2 w-36">
                        <select
                          disabled={updating === order.id}
                          value={order.deliveryStatus || 'Pending'}
                          onChange={(e) => handleUpdateStatus(order.id, order.deliveryStatus, e.target.value as OrderStatus, order.resellerId, order.profit)}
                          className={`w-full px-2 py-1.5 text-xs font-bold rounded border focus:outline-none focus:ring-2 focus:ring-[#28a745] ${
                            order.deliveryStatus === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' :
                            order.deliveryStatus === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                            order.deliveryStatus === 'Processing' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' :
                            order.deliveryStatus === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700' :
                            'bg-gray-50 border-gray-200 text-gray-700'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        {updating === order.id && <span className="text-[10px] text-gray-400">Updating...</span>}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Package size={48} className="text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-900">No orders found</p>
                      <p className="text-sm">Try adjusting your filters or wait for new orders to come in.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
