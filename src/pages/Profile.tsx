import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Camera, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { currentUser, userData } = useAuth();
  
  const [shopName, setShopName] = useState(userData?.displayName || '');
  const [yourName, setYourName] = useState(userData?.personalName || '');
  const [yourPhone, setYourPhone] = useState(userData?.phone || '');
  const [photoURL, setPhotoURL] = useState(userData?.photoURL || '');
  
  const [payoutMethod, setPayoutMethod] = useState(userData?.payoutMethod || 'bkash');
  const [payoutAccount, setPayoutAccount] = useState(userData?.payoutAccount || '');
  
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (userData) {
      setShopName(userData.displayName || '');
      setYourName(userData.personalName || '');
      setYourPhone(userData.phone || '');
      setPhotoURL(userData.photoURL || '');
      setPayoutMethod(userData.payoutMethod || 'bkash');
      setPayoutAccount(userData.payoutAccount || '');
    }
  }, [userData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    setLoading(true);
    setSuccessMsg('');
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        displayName: shopName,
        personalName: yourName,
        phone: yourPhone,
        photoURL,
        payoutMethod,
        payoutAccount
      });
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-700">Reseller Profile & Payout Settings</h2>
          {successMsg && (
            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-3 py-1 rounded">
              <CheckCircle size={14} /> {successMsg}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <form className="space-y-6 max-w-2xl" onSubmit={handleUpdateProfile}>
            {/* Branding */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-50">Store Branding</h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-1/4 text-xs font-medium text-gray-700">Shop / Store Name *</label>
                <input 
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none"
                  placeholder="e.g. Dream Electronics"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-1/4 text-xs font-medium text-gray-700">Store Logo URL</label>
                <div className="flex-1 flex gap-3">
                  <div className="w-12 h-12 flex-shrink-0 bg-gray-50 border border-gray-200 rounded overflow-hidden flex items-center justify-center">
                    {photoURL ? (
                      <img src={photoURL} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={20} className="text-gray-300" />
                    )}
                  </div>
                  <input 
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none self-center"
                    placeholder="https://example.com/logo.png"
                  />
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-50">Personal Details</h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-1/4 text-xs font-medium text-gray-700">Your Full Name</label>
                <input 
                  type="text" 
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-1/4 text-xs font-medium text-gray-700">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  value={yourPhone}
                  onChange={(e) => setYourPhone(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            {/* Payout Details */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-800 pb-2 border-b border-gray-50">Payout / Withdrawal Settings</h3>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label className="sm:w-1/4 text-xs font-medium text-gray-700">Payout Method</label>
                <select 
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none"
                >
                  <option value="bkash">bKash (Personal)</option>
                  <option value="nagad">Nagad (Personal)</option>
                  <option value="rocket">Rocket</option>
                  <option value="bank">Bank Account</option>
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start">
                <label className="sm:w-1/4 text-xs font-medium text-gray-700 mt-2">Account Details *</label>
                <div className="flex-1">
                  <textarea 
                    required
                    value={payoutAccount}
                    onChange={(e) => setPayoutAccount(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-green-500 outline-none"
                    placeholder={payoutMethod === 'bank' ? "Bank Name, Branch, Account Name, Account Number" : "01XXXXXXXXX"}
                  ></textarea>
                  <p className="text-[10px] text-gray-500 mt-1">This account will be used for all your profit withdrawals.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-[#28a745] hover:bg-green-700 text-white text-sm px-6 py-2.5 rounded font-medium transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile & Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
