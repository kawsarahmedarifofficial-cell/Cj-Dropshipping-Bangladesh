import { useState, useEffect } from 'react';
import { Wallet as WalletIcon, Plus, Banknote, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function Wallet() {
  const { currentUser, userData } = useAuth();
  
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const walletBalance = userData?.walletBalance || 0;

  useEffect(() => {
    if (!currentUser) return;
    const fetchWithdrawals = async () => {
      try {
        const q = query(collection(db, 'withdrawals'), where('resellerId', '==', currentUser.uid));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
        setWithdrawals(data);
      } catch (e) {
        console.error(e);
      } finally {
        setFetching(false);
      }
    };
    fetchWithdrawals();
  }, [currentUser]);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    const amount = Number(withdrawAmount);
    if (amount < 200) {
      alert("Minimum withdrawal amount is 200 ৳.");
      return;
    }
    
    // They must leave 200 in the wallet as security money!
    if (walletBalance - amount < 200) {
      alert("You must leave at least 200 ৳ in your wallet as security money.");
      return;
    }

    if (!userData?.payoutMethod || !userData?.payoutAccount) {
      alert("Please update your Payout Settings in your Profile first.");
      return;
    }

    setLoading(true);
    try {
      // Create request
      await addDoc(collection(db, 'withdrawals'), {
        resellerId: currentUser.uid,
        resellerName: userData?.displayName || currentUser.email,
        amount,
        payoutMethod: userData.payoutMethod,
        payoutAccount: userData.payoutAccount,
        status: 'Pending',
        createdAt: serverTimestamp()
      });

      // No longer deducting balance here, Admin will deduct upon approval

      alert("Withdrawal request submitted successfully!");
      setWithdrawModalOpen(false);
      setWithdrawAmount('');
      window.location.reload(); // Quick refresh
    } catch (e) {
      console.error(e);
      alert("Failed to request withdrawal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-[#28a745] mb-2">
        <WalletIcon size={20} />
        <h2 className="text-lg font-medium">My Wallet</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#ff7f50] text-white p-6 rounded-lg shadow-sm flex flex-col justify-center">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center mb-4">
            <WalletIcon size={16} />
          </div>
          <div className="text-2xl font-bold mb-1">{walletBalance.toFixed(2)} ৳</div>
          <div className="text-sm opacity-90">Current Wallet Balance</div>
        </div>

        <div onClick={() => setWithdrawModalOpen(true)} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-white mb-4">
            <Banknote size={32} />
          </div>
          <div className="text-[#28a745] font-medium text-sm">Request Withdraw</div>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-700">Withdrawal History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-700 font-semibold bg-gray-50">
                <th className="px-6 py-4 whitespace-nowrap">Date</th>
                <th className="px-6 py-4 whitespace-nowrap">Amount</th>
                <th className="px-6 py-4 whitespace-nowrap">Method</th>
                <th className="px-6 py-4 whitespace-nowrap">Account</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-gray-100">
              {fetching ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading...</td>
                </tr>
              ) : withdrawals.length > 0 ? (
                withdrawals.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 bg-white">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {item.createdAt ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">৳ {item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 uppercase">{item.payoutMethod}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.payoutAccount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        item.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 font-medium text-sm bg-gray-50">
                    No withdrawal history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {withdrawModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Banknote className="text-[#28a745]" /> Request Withdrawal
            </h3>
            
            <p className="text-xs text-gray-500 mb-4">
              Your available balance is ৳ {walletBalance.toFixed(2)}. Remember to leave ৳ 200 as security deposit.
            </p>

            <form onSubmit={handleWithdraw}>
              <div className="relative mb-6">
                <span className="absolute left-3 top-2.5 text-gray-500 font-medium">৳</span>
                <input 
                  type="number" 
                  required
                  min="200"
                  max={Math.max(0, walletBalance - 200)}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  placeholder="Amount"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-6">
                <p className="text-xs font-medium text-gray-700 mb-1">Payout Destination:</p>
                {userData?.payoutMethod ? (
                  <>
                    <p className="text-xs text-gray-600 uppercase">Method: {userData.payoutMethod}</p>
                    <p className="text-xs text-gray-600">Account: {userData.payoutAccount}</p>
                  </>
                ) : (
                  <p className="text-xs text-red-500">Please setup in Profile.</p>
                )}
              </div>

              <div className="flex gap-3 w-full">
                <button 
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-[#28a745] text-white rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Withdraw'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
