import { useState, useEffect } from 'react';
import { Search, Filter, Shield, CheckCircle, XCircle } from 'lucide-react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AdminResellers() {
  const [resellers, setResellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResellers();
  }, []);

  const fetchResellers = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'users'));
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // We assume anyone except explicit admin is a reseller/user in this system
      const filteredData = data.filter(u => u.email !== 'www.kawsarahmedarif@gmail.com');
      filteredData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
      setResellers(filteredData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    if (!confirm(`Are you sure you want to change status to ${status}?`)) return;
    try {
      await updateDoc(doc(db, 'users', id), { accountStatus: status });
      setResellers(resellers.map(r => r.id === id ? { ...r, accountStatus: status } : r));
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const filteredResellers = resellers.filter(r => 
    r.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reseller Management</h1>
        <button onClick={fetchResellers} className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
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
              placeholder="Search resellers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#28a745]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                <th className="px-6 py-4">Reseller Info</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Wallet & Earnings</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Loading resellers...</td>
                </tr>
              ) : filteredResellers.length > 0 ? (
                filteredResellers.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                          {r.photoURL ? (
                            <img src={r.photoURL} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Shield className="w-full h-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{r.displayName || r.personalName || 'No Name'}</div>
                          <div className="text-xs text-gray-500">Joined: {r.createdAt ? new Date(r.createdAt.toDate()).toLocaleDateString() : 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div>{r.email}</div>
                      <div>{r.phone || 'No Phone'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-600">৳ {r.walletBalance || 0}</div>
                      <div className="text-xs text-gray-500">Earned: ৳ {r.totalEarnings || 0}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        r.accountStatus === 'Approved' ? 'bg-green-100 text-green-700' :
                        r.accountStatus === 'Blocked' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {r.accountStatus || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {r.accountStatus !== 'Approved' && (
                          <button onClick={() => updateStatus(r.id, 'Approved')} className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold hover:bg-green-200 flex items-center gap-1">
                            <CheckCircle size={14} /> Approve
                          </button>
                        )}
                        {r.accountStatus !== 'Blocked' && (
                          <button onClick={() => updateStatus(r.id, 'Blocked')} className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold hover:bg-red-200 flex items-center gap-1">
                            <XCircle size={14} /> Block
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">No resellers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
