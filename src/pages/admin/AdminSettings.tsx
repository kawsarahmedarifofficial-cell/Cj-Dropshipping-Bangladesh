import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Store, Truck, MapPin, Search, Globe, CreditCard, Shield, Mail, Smartphone, Bell, Eye, Image } from 'lucide-react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<any>({
    general: {
      siteName: 'MERRONO.COM',
      contactEmail: 'admin@merrono.com',
      contactPhone: '01628952048',
      supportWhatsapp: '01628952048',
      address: 'Dhaka, Bangladesh',
      currency: 'BDT (৳)',
    },
    integrations: {
      steadfastEnabled: true,
      redxEnabled: false,
    },
    seo: {
      metaTitle: 'MERRONO.COM - Premium Dropshipping Platform',
      metaDescription: 'Start your zero-investment online business today.',
      facebookUrl: 'https://facebook.com',
      instagramUrl: 'https://instagram.com',
    },
    legal: {
      termsUrl: '/terms',
      privacyUrl: '/privacy',
    }
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'config', 'platformSettings');
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setSettings({ ...settings, ...snap.data() });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'config', 'platformSettings');
      await setDoc(docRef, settings, { merge: true });
      alert("Settings saved successfully!");
    } catch (e) {
      alert("Failed to save settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Platform Settings</h1>
        <button onClick={handleSave} disabled={loading} className="bg-[#28a745] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
          <Save size={18} /> {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="flex flex-col p-2">
              <button onClick={() => setActiveTab('general')} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'general' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Store size={18} /> General Info
              </button>
              <button onClick={() => setActiveTab('shipping')} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'shipping' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Truck size={18} /> Shipping & APIs
              </button>
              <button onClick={() => setActiveTab('seo')} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'seo' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Globe size={18} /> SEO & Social
              </button>
              <button onClick={() => setActiveTab('legal')} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === 'legal' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Shield size={18} /> Legal Pages
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-grow bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                  <input type="text" value={settings.general.siteName} onChange={(e) => setSettings({...settings, general: {...settings.general, siteName: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select value={settings.general.currency} onChange={(e) => setSettings({...settings, general: {...settings.general, currency: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]">
                    <option value="BDT (৳)">BDT (৳)</option>
                    <option value="USD ($)">USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                  <input type="email" value={settings.general.contactEmail} onChange={(e) => setSettings({...settings, general: {...settings.general, contactEmail: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Support Phone</label>
                  <input type="tel" value={settings.general.contactPhone} onChange={(e) => setSettings({...settings, general: {...settings.general, contactPhone: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Office Address</label>
                  <textarea value={settings.general.address} onChange={(e) => setSettings({...settings, general: {...settings.general, address: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" rows={2}></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Courier Integrations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                  <h4 className="font-bold text-gray-800">Steadfast Courier</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.integrations.steadfastEnabled} onChange={(e) => setSettings({...settings, integrations: {...settings.integrations, steadfastEnabled: e.target.checked}})} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#28a745]"></div>
                  </label>
                </div>
                <div className="border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                  <h4 className="font-bold text-gray-800">REDX</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.integrations.redxEnabled} onChange={(e) => setSettings({...settings, integrations: {...settings.integrations, redxEnabled: e.target.checked}})} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#28a745]"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">SEO & Social Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Global Meta Title</label>
                  <input type="text" value={settings.seo.metaTitle} onChange={(e) => setSettings({...settings, seo: {...settings.seo, metaTitle: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Global Meta Description</label>
                  <textarea value={settings.seo.metaDescription} onChange={(e) => setSettings({...settings, seo: {...settings.seo, metaDescription: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:ring-[#28a745]"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input type="text" value={settings.seo.facebookUrl} onChange={(e) => setSettings({...settings, seo: {...settings.seo, facebookUrl: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'legal' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">Legal Policies</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions URL Path</label>
                  <input type="text" value={settings.legal.termsUrl} onChange={(e) => setSettings({...settings, legal: {...settings.legal, termsUrl: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Privacy Policy URL Path</label>
                  <input type="text" value={settings.legal.privacyUrl} onChange={(e) => setSettings({...settings, legal: {...settings.legal, privacyUrl: e.target.value}})} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-[#28a745]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
