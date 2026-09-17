import { useState, useEffect } from 'react';
import { DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, increment, runTransaction } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AdminPayments() {
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'withdrawals'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setWithdrawals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, resellerId: string, amount: number) => {
    if (!window.confirm('Mark this withdrawal as Completed and deduct from Reseller wallet?')) return;
    try {
      // Run transaction to safely deduct balance
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'users', resellerId);
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists()) {
          throw new Error("Reseller does not exist!");
        }
        
        const currentBalance = userDoc.data().walletBalance || 0;
        
        transaction.update(userRef, {
          walletBalance: currentBalance - amount
        });
        
        const withdrawalRef = doc(db, 'withdrawals', id);
        transaction.update(withdrawalRef, { status: 'Completed' });
      });
      
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'Completed' } : w));
    } catch (e) {
      console.error(e);
      alert("Failed to approve. Make sure reseller exists and has enough balance.");
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('Reject withdrawal?')) return;
    try {
      await updateDoc(doc(db, 'withdrawals', id), { status: 'Rejected' });
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'Rejected' } : w));
    } catch (e) {
      alert("Failed to reject.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Withdrawal Requests</h1>
        <button onClick={fetchWithdrawals} className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Reseller</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payout Method</th>
                <th className="px-6 py-4">Account Details</th>
                <th className="px-6 py-4 text-center">Status / Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading requests...</td>
                </tr>
              ) : withdrawals.length > 0 ? (
                withdrawals.map(req => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-600">
                      {req.createdAt ? new Date(req.createdAt.toDate()).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{req.resellerName}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">৳ {req.amount}</td>
                    <td className="px-6 py-4 text-gray-600 uppercase">{req.payoutMethod}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">{req.payoutAccount}</td>
                    <td className="px-6 py-4">
                      {req.status === 'Pending' ? (
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleApprove(req.id)} className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold hover:bg-green-200">
                            Approve
                          </button>
                          <button onClick={() => handleReject(req.id, req.resellerId, req.amount)} className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold hover:bg-red-200">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-center">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            req.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No withdrawal requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
