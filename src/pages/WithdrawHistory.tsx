import { Plus } from 'lucide-react';

export default function WithdrawHistory() {
  type WithdrawItem = {
    id: number;
    amount: string;
    method: string;
    status: string;
    note: string;
    date: string;
  };

  const withdrawHistory: WithdrawItem[] = [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-700">Withdrawal History</h2>
          <button className="bg-[#28a745] hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded transition-colors flex items-center gap-1">
            <Plus size={14} />
            Add New Withdraw
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-700 font-semibold bg-white">
                <th className="px-6 py-4 whitespace-nowrap">#</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Method</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Note</th>
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-100">
              {withdrawHistory.length > 0 ? (
                withdrawHistory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status === 'Paid' ? (
                        <span className="bg-[#28a745] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                          {item.status}
                        </span>
                      ) : (
                        <span className="text-gray-600">{item.status}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.note}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 font-medium text-sm bg-gray-50">
                    No withdrawal history found.
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

