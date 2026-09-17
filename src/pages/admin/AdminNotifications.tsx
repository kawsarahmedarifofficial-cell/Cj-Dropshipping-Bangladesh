import { useState } from 'react';
import { 
  Bell, Check, Trash2, ShoppingBag, DollarSign, 
  RotateCcw, Users, AlertTriangle, MessageSquare, Settings, AlertCircle
} from 'lucide-react';

export default function AdminNotifications() {
  const [filter, setFilter] = useState('All');
  const [notifications, setNotifications] = useState([
    { id: 'N-1', type: 'Order', title: 'New Order Received', message: 'Order ORD-2023-1005 placed by Rahim Uddin (৳2,500)', time: '5 mins ago', read: false },
    { id: 'N-2', type: 'Payment', title: 'Payment Confirmed', message: 'bKash payment for ORD-2023-1004 has been verified', time: '1 hour ago', read: false },
    { id: 'N-3', type: 'Stock', title: 'Low Stock Alert', message: 'Premium Wireless Headphones are running low (3 items left)', time: '2 hours ago', read: true },
    { id: 'N-4', type: 'Reseller', title: 'New Reseller Application', message: 'Eviara Cobra Mart has applied for Reseller status', time: '5 hours ago', read: false },
    { id: 'N-5', type: 'Support', title: 'New Ticket Opened', message: 'Karim Hasan opened a High priority ticket', time: '1 day ago', read: true },
    { id: 'N-6', type: 'Refund', title: 'Refund Requested', message: 'Customer requested refund for ORD-2023-0988', time: '1 day ago', read: true },
    { id: 'N-7', type: 'System', title: 'System Update', message: 'Admin panel maintenance scheduled for tonight at 2 AM', time: '2 days ago', read: true }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Order': return <ShoppingBag size={20} className="text-blue-500" />;
      case 'Payment': return <DollarSign size={20} className="text-green-500" />;
      case 'Refund': return <RotateCcw size={20} className="text-purple-500" />;
      case 'Reseller': return <Users size={20} className="text-orange-500" />;
      case 'Stock': return <AlertTriangle size={20} className="text-red-500" />;
      case 'Support': return <MessageSquare size={20} className="text-teal-500" />;
      case 'System': return <Settings size={20} className="text-gray-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'Order': return 'bg-blue-100';
      case 'Payment': return 'bg-green-100';
      case 'Refund': return 'bg-purple-100';
      case 'Reseller': return 'bg-orange-100';
      case 'Stock': return 'bg-red-100';
      case 'Support': return 'bg-teal-100';
      case 'System': return 'bg-gray-200';
      default: return 'bg-gray-100';
    }
  };

  const filtered = notifications.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.read;
    return n.type === filter;
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <div className="flex gap-2">
          <button onClick={markAllRead} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
            <Check size={16} /> Mark all as read
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
        {['All', 'Unread', 'Order', 'Payment', 'Stock', 'Reseller', 'Support', 'System'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors border ${
              filter === f ? 'bg-[#28a745] text-white border-[#28a745]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filtered.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-gray-50 flex items-start gap-4 transition-colors ${!notification.read ? 'bg-blue-50/30' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${getBg(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm md:text-base truncate ${!notification.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{notification.time}</span>
                  </div>
                  <p className={`text-sm ${!notification.read ? 'text-gray-800' : 'text-gray-500'}`}>
                    {notification.message}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!notification.read && (
                    <button 
                      onClick={() => markAsRead(notification.id)}
                      className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <Bell size={48} className="text-gray-300 mb-4" />
            <p className="font-medium text-lg text-gray-600">All caught up!</p>
            <p className="text-sm">You have no {filter !== 'All' ? filter.toLowerCase() : ''} notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
