import { DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, Download } from 'lucide-react';
import { Transaction } from '../types';

export default function Earnings() {
  const transactions: Transaction[] = [
    { id: 'TXN-1001', date: '2023-10-25 14:30', description: 'Profit from Order #ORD-9871', amount: 350, type: 'Credit', status: 'Completed' },
    { id: 'TXN-1002', date: '2023-10-23 10:15', description: 'Withdrawal to bKash', amount: 5000, type: 'Debit', status: 'Completed' },
    { id: 'TXN-1003', date: '2023-10-22 09:45', description: 'Profit from Order #ORD-9875', amount: 150, type: 'Credit', status: 'Completed' },
    { id: 'TXN-1004', date: '2023-10-21 16:20', description: 'Profit from Order #ORD-9840', amount: 420, type: 'Credit', status: 'Pending' },
    { id: 'TXN-1005', date: '2023-10-18 11:10', description: 'Withdrawal to Bank Account', amount: 10000, type: 'Debit', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Earnings & Payouts</h2>
        
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm">
          <CreditCard size={18} />
          Request Payout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 text-white shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Total Available Balance</p>
              <h3 className="text-3xl font-bold">৳ 12,450</h3>
            </div>
            <div className="bg-white/20 p-2 rounded-lg">
              <DollarSign size={24} className="text-white" />
            </div>
          </div>
          <div className="text-sm text-green-100">
            Available for immediate withdrawal
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 text-sm font-medium">Earned This Month</p>
            <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">৳ 8,320</h3>
          <p className="text-xs text-green-600 font-medium">+15% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 text-sm font-medium">Pending Payouts</p>
            <div className="bg-orange-50 text-orange-600 p-1.5 rounded-lg">
              <ClockIcon size={18} />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">৳ 420</h3>
          <p className="text-xs text-gray-500">Will be cleared in 2-3 days</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Transaction History</h3>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 font-medium transition-colors">
            <Download size={16} />
            Export CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-3 font-medium border-b border-gray-100">Date & Time</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Description</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100">Type</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100 text-right">Amount</th>
                <th className="px-6 py-3 font-medium border-b border-gray-100 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500">
                    <div>{txn.date.split(' ')[0]}</div>
                    <div className="text-xs mt-0.5">{txn.date.split(' ')[1]}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-800">{txn.description}</div>
                    <div className="text-xs text-gray-500 mt-1">Ref: {txn.id}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${txn.type === 'Credit' ? 'text-green-600' : 'text-red-500'}`}>
                      {txn.type === 'Credit' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {txn.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${txn.type === 'Credit' ? 'text-green-600' : 'text-gray-900'}`}>
                    {txn.type === 'Credit' ? '+' : '-'} ৳ {txn.amount}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      txn.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// A simple clock icon component to avoid adding another import right now
function ClockIcon({ size = 24, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}
