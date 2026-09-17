import { useState } from 'react';
import { 
  Search, Truck, Edit, Settings, Search as SearchIcon, Plus, 
  MapPin, CheckCircle, XCircle, Clock, AlertCircle, RotateCcw, 
  Package, ToggleLeft, ToggleRight, ArrowLeft
} from 'lucide-react';

type CourierStatus = 'Active' | 'Inactive';

type Courier = {
  id: string;
  name: string;
  insideDhaka: number;
  outsideDhaka: number;
  status: CourierStatus;
  contactNumber?: string;
  trackingUrl?: string;
};

type ShipmentStatus = 'Pending' | 'Ready for Pickup' | 'Picked Up' | 'In Transit' | 'Delivered' | 'Failed' | 'Returned';

type Shipment = {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  courierName: string;
  trackingNumber: string;
  status: ShipmentStatus;
  date: string;
  timeline: {
    status: ShipmentStatus;
    date: string;
    note?: string;
  }[];
};

export default function AdminShipping() {
  const [activeTab, setActiveTab] = useState<'couriers' | 'shipments' | 'settings'>('shipments');
  
  // Couriers State
  const [couriers, setCouriers] = useState<Courier[]>([
    { id: 'C-01', name: 'Pathao', insideDhaka: 60, outsideDhaka: 120, status: 'Active', trackingUrl: 'https://pathao.com/tracking?consignment={tracking}' },
    { id: 'C-02', name: 'RedX', insideDhaka: 60, outsideDhaka: 130, status: 'Active', trackingUrl: 'https://redx.com.bd/track?trackingId={tracking}' },
    { id: 'C-03', name: 'Steadfast', insideDhaka: 50, outsideDhaka: 100, status: 'Active', trackingUrl: 'https://steadfast.com.bd/tracking/{tracking}' },
    { id: 'C-04', name: 'Sundarban Courier', insideDhaka: 70, outsideDhaka: 150, status: 'Inactive' }
  ]);

  // Shipments State
  const [searchQuery, setSearchQuery] = useState('');
  const [shipmentFilter, setShipmentFilter] = useState<ShipmentStatus | 'All'>('All');
  const [shipments, setShipments] = useState<Shipment[]>([
    { 
      id: 'SHP-1001', orderId: 'ORD-2023-1001', customerName: 'Rahim Uddin', address: 'House 12, Road 5, Dhanmondi, Dhaka', 
      courierName: 'Pathao', trackingNumber: 'PTH-1001567', status: 'Delivered', date: '2023-10-22T10:30:00',
      timeline: [
        { status: 'Ready for Pickup', date: '2023-10-22T10:30:00' },
        { status: 'Picked Up', date: '2023-10-22T14:00:00' },
        { status: 'In Transit', date: '2023-10-23T09:00:00' },
        { status: 'Delivered', date: '2023-10-24T11:30:00' }
      ]
    },
    { 
      id: 'SHP-1002', orderId: 'ORD-2023-1002', customerName: 'Karim Hasan', address: 'Block C, Halishahar, Chattogram', 
      courierName: 'RedX', trackingNumber: 'RDX-987654', status: 'In Transit', date: '2023-10-24T14:15:00',
      timeline: [
        { status: 'Ready for Pickup', date: '2023-10-24T14:15:00' },
        { status: 'Picked Up', date: '2023-10-25T10:00:00' },
        { status: 'In Transit', date: '2023-10-25T16:30:00' }
      ]
    },
    { 
      id: 'SHP-1003', orderId: 'ORD-2023-1003', customerName: 'Jashim Ahmed', address: 'Sylhet Sadar, Sylhet', 
      courierName: 'Steadfast', trackingNumber: 'STF-554433', status: 'Ready for Pickup', date: '2023-10-25T11:00:00',
      timeline: [
        { status: 'Ready for Pickup', date: '2023-10-25T11:00:00' }
      ]
    }
  ]);

  const [selectedCourier, setSelectedCourier] = useState<Courier | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // Modals
  const [courierModalOpen, setCourierModalOpen] = useState(false);
  const [courierFormData, setCourierFormData] = useState<Partial<Courier>>({ status: 'Active' });

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('Pending');
  const [statusNote, setStatusNote] = useState('');

  const [trackModalOpen, setTrackModalOpen] = useState(false);

  // Handlers
  const handleToggleCourier = (id: string) => {
    setCouriers(couriers.map(c => 
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
  };

  const handleCourierSubmit = (e: any) => {
    e.preventDefault();
    if (selectedCourier) {
      setCouriers(couriers.map(c => c.id === selectedCourier.id ? { ...c, ...courierFormData } as Courier : c));
    } else {
      const newCourier: Courier = {
        id: `C-0${couriers.length + 1}`,
        name: courierFormData.name || '',
        insideDhaka: Number(courierFormData.insideDhaka) || 0,
        outsideDhaka: Number(courierFormData.outsideDhaka) || 0,
        status: courierFormData.status as CourierStatus || 'Active',
        trackingUrl: courierFormData.trackingUrl
      };
      setCouriers([...couriers, newCourier]);
    }
    setCourierModalOpen(false);
    setCourierFormData({ status: 'Active' });
    setSelectedCourier(null);
  };

  const handleStatusSubmit = (e: any) => {
    e.preventDefault();
    if (selectedShipment) {
      const updatedTimeline = [...selectedShipment.timeline, { status: newStatus, date: new Date().toISOString(), note: statusNote }];
      const updated = shipments.map(s => s.id === selectedShipment.id ? { ...s, status: newStatus, timeline: updatedTimeline } : s);
      setShipments(updated);
      setSelectedShipment({ ...selectedShipment, status: newStatus, timeline: updatedTimeline });
      setStatusModalOpen(false);
      setStatusNote('');
    }
  };

  const openCourierModal = (courier?: Courier) => {
    if (courier) {
      setSelectedCourier(courier);
      setCourierFormData(courier);
    } else {
      setSelectedCourier(null);
      setCourierFormData({ status: 'Active' });
    }
    setCourierModalOpen(true);
  };

  const getStatusColor = (status: ShipmentStatus) => {
    switch(status) {
      case 'Pending': 
      case 'Ready for Pickup': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Picked Up':
      case 'In Transit': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'Failed':
      case 'Returned': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ShipmentStatus) => {
    switch(status) {
      case 'Pending':
      case 'Ready for Pickup': return <Clock size={16} />;
      case 'Picked Up': return <Package size={16} />;
      case 'In Transit': return <Truck size={16} />;
      case 'Delivered': return <CheckCircle size={16} />;
      case 'Failed': return <XCircle size={16} />;
      case 'Returned': return <RotateCcw size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  const filteredShipments = shipments.filter(s => {
    const matchesTab = shipmentFilter === 'All' || s.status === shipmentFilter;
    const matchesSearch = s.orderId.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Shipping & Logistics</h2>
      </div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setActiveTab('shipments')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'shipments' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Truck className="inline-block w-4 h-4 mr-2" />
          Shipments
        </button>
        <button
          onClick={() => setActiveTab('couriers')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'couriers' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Package className="inline-block w-4 h-4 mr-2" />
          Courier Services
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
            activeTab === 'settings' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Settings className="inline-block w-4 h-4 mr-2" />
          Shipping Rates & Rules
        </button>
      </div>

      {/* SHIPMENTS TAB */}
      {activeTab === 'shipments' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Search Tracking ID, Order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] w-full bg-white"
                />
                <SearchIcon size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide pb-1 md:pb-0">
                {['All', 'Ready for Pickup', 'Picked Up', 'In Transit', 'Delivered', 'Failed', 'Returned'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setShipmentFilter(status as ShipmentStatus | 'All')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${
                      shipmentFilter === status ? 'bg-[#28a745] text-white border-[#28a745]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="px-6 py-4 font-medium">Tracking Number</th>
                    <th className="px-6 py-4 font-medium">Order Details</th>
                    <th className="px-6 py-4 font-medium">Courier</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {filteredShipments.map(shp => (
                    <tr key={shp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div 
                          className="font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-2"
                          onClick={() => { setSelectedShipment(shp); setTrackModalOpen(true); }}
                        >
                          {shp.trackingNumber}
                        </div>
                        <div className="text-xs text-gray-500">{new Date(shp.date).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800">{shp.orderId}</div>
                        <div className="text-xs text-gray-500">{shp.customerName}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[250px]">{shp.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                        {shp.courierName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-max ${getStatusColor(shp.status)}`}>
                          {getStatusIcon(shp.status)}
                          {shp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => { setSelectedShipment(shp); setTrackModalOpen(true); }}
                            className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded text-xs font-medium transition-colors"
                          >
                            Track
                          </button>
                          <button 
                            onClick={() => { 
                              setSelectedShipment(shp); 
                              setNewStatus(shp.status); 
                              setStatusModalOpen(true); 
                            }}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-medium transition-colors"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredShipments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        No shipments found matching the criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* COURIERS TAB */}
      {activeTab === 'couriers' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => openCourierModal()}
              className="bg-[#28a745] hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
            >
              <Plus size={16} /> Add Courier
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {couriers.map(courier => (
              <div key={courier.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{courier.name}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${courier.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {courier.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleToggleCourier(courier.id)}
                    className="text-gray-400 hover:text-gray-600"
                    title="Toggle Status"
                  >
                    {courier.status === 'Active' ? (
                      <ToggleRight size={28} className="text-[#28a745]" />
                    ) : (
                      <ToggleLeft size={28} />
                    )}
                  </button>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Inside Dhaka</div>
                      <div className="font-bold text-gray-800">৳ {courier.insideDhaka}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Outside Dhaka</div>
                      <div className="font-bold text-gray-800">৳ {courier.outsideDhaka}</div>
                    </div>
                  </div>
                  {courier.trackingUrl && (
                    <div className="text-xs text-gray-500 truncate">
                      <strong>Tracking URL:</strong> {courier.trackingUrl}
                    </div>
                  )}
                  <button 
                    onClick={() => openCourierModal(courier)}
                    className="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors flex justify-center items-center gap-2"
                  >
                    <Edit size={16} /> Edit Settings
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl space-y-6 animate-in fade-in">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Global Shipping Rules</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-800">Free Shipping Threshold</div>
                    <div className="text-sm text-gray-500">Automatically offer free shipping on orders above a certain amount.</div>
                  </div>
                  <ToggleLeft size={32} className="text-gray-300" />
                </label>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-800">Enable Cash on Delivery (COD)</div>
                    <div className="text-sm text-gray-500">Allow customers to pay upon receiving the order.</div>
                  </div>
                  <ToggleRight size={32} className="text-[#28a745]" />
                </label>
              </div>
              <div className="pt-4 border-t border-gray-50">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <div className="font-medium text-gray-800">Require Package Dimensions</div>
                    <div className="text-sm text-gray-500">Calculate shipping based on volumetric weight.</div>
                  </div>
                  <ToggleLeft size={32} className="text-gray-300" />
                </label>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
              <button className="bg-[#28a745] hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COURIER MODAL */}
      {courierModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {selectedCourier ? 'Edit Courier' : 'Add New Courier'}
            </h3>
            <form onSubmit={handleCourierSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Courier Name *</label>
                <input 
                  type="text" 
                  required
                  value={courierFormData.name || ''}
                  onChange={(e) => setCourierFormData({...courierFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inside Dhaka (৳) *</label>
                  <input 
                    type="number" 
                    required
                    value={courierFormData.insideDhaka || ''}
                    onChange={(e) => setCourierFormData({...courierFormData, insideDhaka: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Outside Dhaka (৳) *</label>
                  <input 
                    type="number" 
                    required
                    value={courierFormData.outsideDhaka || ''}
                    onChange={(e) => setCourierFormData({...courierFormData, outsideDhaka: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tracking URL Pattern</label>
                <input 
                  type="text" 
                  value={courierFormData.trackingUrl || ''}
                  onChange={(e) => setCourierFormData({...courierFormData, trackingUrl: e.target.value})}
                  placeholder="e.g. https://domain.com/track/{tracking}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                />
                <p className="text-xs text-gray-500 mt-1">Use {'{tracking}'} as a placeholder for the tracking ID.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  value={courierFormData.status}
                  onChange={(e) => setCourierFormData({...courierFormData, status: e.target.value as CourierStatus})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setCourierModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#28a745] text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL */}
      {statusModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Update Shipment Status</h3>
            <p className="text-sm text-gray-500 mb-4">
              Tracking: <strong>{selectedShipment?.trackingNumber}</strong>
            </p>
            <form onSubmit={handleStatusSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">New Status</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {['Pending', 'Ready for Pickup', 'Picked Up', 'In Transit', 'Delivered', 'Failed', 'Returned'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Note (Optional)</label>
                <textarea 
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="e.g. Delayed due to weather..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                ></textarea>
              </div>
              <div className="flex gap-3 w-full">
                <button 
                  type="button"
                  onClick={() => setStatusModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRACKING MODAL */}
      {trackModalOpen && selectedShipment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Shipment Tracking</h3>
                <p className="text-sm text-gray-500">{selectedShipment.trackingNumber}</p>
              </div>
              <button onClick={() => setTrackModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={24} />
              </button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-medium text-gray-800">{selectedShipment.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Courier:</span>
                <span className="font-medium text-gray-800">{selectedShipment.courierName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Status:</span>
                <span className={`font-bold ${
                  selectedShipment.status === 'Delivered' ? 'text-green-600' :
                  selectedShipment.status === 'Failed' || selectedShipment.status === 'Returned' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {selectedShipment.status}
                </span>
              </div>
            </div>

            <h4 className="font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Tracking Timeline</h4>
            <div className="relative pl-4 space-y-6 before:absolute before:inset-0 before:ml-[1.2rem] before:h-full before:w-0.5 before:bg-gray-200">
              {selectedShipment.timeline.map((event, index) => (
                <div key={index} className="relative flex items-start gap-4 group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-blue-100 text-blue-600 shadow shrink-0 z-10 -ml-[1.4rem]">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-100 shadow-sm w-full">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-bold text-gray-800 text-sm">{event.status}</h4>
                      <span className="text-xs text-gray-500">{new Date(event.date).toLocaleString()}</span>
                    </div>
                    {event.note && <p className="text-sm text-gray-600">{event.note}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setTrackModalOpen(false)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
