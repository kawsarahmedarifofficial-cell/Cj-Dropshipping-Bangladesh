import { useEffect, useState } from 'react';
import { Eye, Download } from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export default function Orders() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, 'orders'),
          where('resellerId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        // Sort by date locally since composite index might be needed otherwise
        ordersData.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [currentUser]);

  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-700">Purchase History</h2>
        <span className="text-sm text-gray-500 font-medium">Total: {orders.length}</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-700 font-semibold bg-gray-50">
              <th className="px-6 py-4 whitespace-nowrap">Invoice ID</th>
              <th className="px-6 py-4 whitespace-nowrap">Date</th>
              <th className="px-6 py-4 whitespace-nowrap">Customer Info</th>
              <th className="px-6 py-4 whitespace-nowrap">Wholesale<br/>Cost</th>
              <th className="px-6 py-4 whitespace-nowrap">Sell Price</th>
              <th className="px-6 py-4 whitespace-nowrap">Your Profit</th>
              <th className="px-6 py-4 whitespace-nowrap">Delivery<br/>Status</th>
              <th className="px-6 py-4 whitespace-nowrap">Payment</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">Loading orders...</td>
              </tr>
            ) : orders.length > 0 ? (
              orders.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors bg-white">
                  <td className="px-6 py-4 whitespace-pre-wrap text-[#2dd4bf] font-medium leading-relaxed">
                    {item.invoiceId}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString('en-GB') : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="font-medium text-gray-800 block">{item.customerName}</span>
                    <span className="text-gray-500">{item.customerPhone}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    ৳ {item.wholesaleTotal}
                  </td>
                  <td className="px-6 py-4 text-gray-800 font-bold">
                    ৳ {item.customSellingPrice}
                  </td>
                  <td className="px-6 py-4 text-green-600 font-bold">
                    ৳ {item.profit}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      item.deliveryStatus === 'Delivered' ? 'bg-green-100 text-green-700' :
                      item.deliveryStatus === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      item.deliveryStatus === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      item.courierPaymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {item.courierPaymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500 font-medium text-sm bg-gray-50">
                  No orders found. Start selling to see your history here!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
