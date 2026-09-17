import { useState } from 'react';
import { 
  Plus, Edit, Trash2, Search, Calendar, Tag, Image as ImageIcon, 
  Eye, ToggleLeft, ToggleRight, Settings, CheckCircle
} from 'lucide-react';

export default function AdminCoupons() {
  const [activeTab, setActiveTab] = useState<'coupons' | 'banners' | 'popup'>('coupons');
  
  // Coupons State
  const [coupons, setCoupons] = useState([
    { id: 'CPN-1', code: 'NEWYEAR24', type: 'percentage', value: 15, startDate: '2023-12-25', endDate: '2024-01-05', limit: 100, used: 45, status: 'Active' },
    { id: 'CPN-2', code: 'WINTER300', type: 'fixed', value: 300, startDate: '2023-11-01', endDate: '2024-02-28', limit: 500, used: 312, status: 'Active' },
    { id: 'CPN-3', code: 'FLASH50', type: 'percentage', value: 50, startDate: '2023-10-10', endDate: '2023-10-12', limit: 50, used: 50, status: 'Inactive' }
  ]);
  const [couponModal, setCouponModal] = useState(false);

  // Banners State
  const [banners, setBanners] = useState([
    { id: 'BNR-1', title: 'Winter Collection Sale', link: '/category/winter', position: 'Homepage Hero', imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80', status: 'Active' },
    { id: 'BNR-2', title: 'Electronics Super Saver', link: '/category/electronics', position: 'Homepage Middle', imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80', status: 'Active' }
  ]);
  const [bannerModal, setBannerModal] = useState(false);

  // Popup State
  const [popup, setPopup] = useState({
    enabled: true,
    title: 'Get 10% Off Your First Order!',
    description: 'Sign up for our newsletter and receive a special discount code instantly.',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
    link: '/register',
    showDelay: 3
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Promotions & Offers</h2>
      </div>

      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('coupons')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'coupons' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500'}`}
        >
          <Tag className="inline w-4 h-4 mr-2" /> Discount Coupons
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'banners' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500'}`}
        >
          <ImageIcon className="inline w-4 h-4 mr-2" /> Offer Banners
        </button>
        <button
          onClick={() => setActiveTab('popup')}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'popup' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500'}`}
        >
          <Eye className="inline w-4 h-4 mr-2" /> Promotional Popup
        </button>
      </div>

      {activeTab === 'coupons' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between">
            <div className="relative w-72">
              <input type="text" placeholder="Search coupons..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:ring-[#28a745]" />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button onClick={() => setCouponModal(true)} className="bg-[#28a745] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus size={16} /> Add Coupon
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4">Validity</th>
                  <th className="px-6 py-4">Usage</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {coupons.map(c => (
                  <tr key={c.id}>
                    <td className="px-6 py-4 font-bold text-gray-800">{c.code}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {c.type === 'percentage' ? `${c.value}%` : `৳${c.value}`}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {c.startDate} to {c.endDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(c.used/c.limit)*100}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500">{c.used}/{c.limit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${c.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:bg-blue-50 p-1.5 rounded mr-2"><Edit size={16}/></button>
                      <button className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'banners' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-end">
            <button onClick={() => setBannerModal(true)} className="bg-[#28a745] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus size={16} /> Add Banner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map(b => (
              <div key={b.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <img src={b.imageUrl} alt={b.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{b.title}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">{b.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <Tag size={14} /> {b.position}
                  </p>
                  <p className="text-sm text-blue-600 truncate mb-4">{b.link}</p>
                  
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded text-sm font-medium border border-gray-200">
                      Edit
                    </button>
                    <button className="flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded text-sm font-medium border border-red-100">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'popup' && (
        <div className="max-w-3xl animate-in fade-in">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg">Popup Configuration</h3>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                Enable Popup
                <button onClick={() => setPopup({...popup, enabled: !popup.enabled})}>
                  {popup.enabled ? <ToggleRight size={32} className="text-[#28a745]" /> : <ToggleLeft size={32} className="text-gray-400" />}
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Popup Title</label>
                    <input type="text" value={popup.title} onChange={e => setPopup({...popup, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={popup.description} onChange={e => setPopup({...popup, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm h-24" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Link</label>
                    <input type="text" value={popup.link} onChange={e => setPopup({...popup, link: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Show After (Seconds)</label>
                    <input type="number" value={popup.showDelay} onChange={e => setPopup({...popup, showDelay: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Popup Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl overflow-hidden h-64 relative bg-gray-50 flex items-center justify-center group cursor-pointer">
                    <img src={popup.imageUrl} alt="Popup" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-sm font-medium">
                      Change Image
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button className="bg-[#28a745] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
                  Save Popup Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {couponModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-lg mb-4">Add New Coupon</h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">Coupon Code</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="e.g. SUMMER50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Discount Type</label>
                  <select className="w-full border rounded-lg px-3 py-2">
                    <option>Percentage (%)</option>
                    <option>Fixed Amount (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Value</label>
                  <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="e.g. 15" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Start Date</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">End Date</label>
                  <input type="date" className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Usage Limit</label>
                <input type="number" className="w-full border rounded-lg px-3 py-2" placeholder="e.g. 100" />
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setCouponModal(false)} className="flex-1 border py-2 rounded-lg font-medium">Cancel</button>
                <button onClick={() => setCouponModal(false)} className="flex-1 bg-[#28a745] text-white py-2 rounded-lg font-medium">Create Coupon</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {bannerModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-bold text-lg mb-4">Add Offer Banner</h3>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">Banner Title</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Winter Sale" />
              </div>
              <div>
                <label className="block font-medium mb-1">Position</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Homepage Hero</option>
                  <option>Homepage Middle</option>
                  <option>Category Page Top</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Target Link</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" placeholder="e.g. /category/sale" />
              </div>
              <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input type="url" className="w-full border rounded-lg px-3 py-2" placeholder="https://..." />
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setBannerModal(false)} className="flex-1 border py-2 rounded-lg font-medium">Cancel</button>
                <button onClick={() => setBannerModal(false)} className="flex-1 bg-[#28a745] text-white py-2 rounded-lg font-medium">Upload Banner</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
