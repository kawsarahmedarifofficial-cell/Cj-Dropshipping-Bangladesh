import { useState } from 'react';
import { 
  Users, Shield, Key, Search, Plus, Edit, Trash2, 
  CheckCircle, XCircle, AlertTriangle, Eye, Clock, ShieldAlert,
  Activity, ArrowRight
} from 'lucide-react';

export default function AdminUsers() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  
  // User Management
  const [users, setUsers] = useState([
    { id: 'ADM-001', name: 'Hasib Rahman', email: 'hasib@admin.com', role: 'Super Admin', status: 'Active', lastLogin: '10 mins ago' },
    { id: 'ADM-002', name: 'Tanvir Hossain', email: 'tanvir@admin.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
    { id: 'ADM-003', name: 'Nadia Islam', email: 'nadia@admin.com', role: 'Support Agent', status: 'Active', lastLogin: '1 day ago' },
    { id: 'ADM-004', name: 'Fahim Ahmed', email: 'fahim@admin.com', role: 'Order Operator', status: 'Inactive', lastLogin: '2 weeks ago' },
    { id: 'ADM-005', name: 'Raju Hasan', email: 'raju@admin.com', role: 'Finance Staff', status: 'Blocked', lastLogin: '1 month ago' },
  ]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userModal, setUserModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState<string | null>(null);
  const [deleteRoleModal, setDeleteRoleModal] = useState<string | null>(null);

  // Role Management
  const [roles, setRoles] = useState([
    { id: 'R-1', name: 'Super Admin', description: 'Full access to all system features.', usersCount: 1 },
    { id: 'R-2', name: 'Admin', description: 'Access to most features, cannot manage super admins.', usersCount: 2 },
    { id: 'R-3', name: 'Order Operator', description: 'Manage orders, shipments, and inventory.', usersCount: 3 },
    { id: 'R-4', name: 'Support Agent', description: 'Manage tickets and customer communication.', usersCount: 4 },
    { id: 'R-5', name: 'Finance Staff', description: 'Manage payouts, refunds, and financial reports.', usersCount: 1 },
    { id: 'R-6', name: 'Content Manager', description: 'Manage products, categories, banners.', usersCount: 2 },
  ]);
  const [roleModal, setRoleModal] = useState(false);

  // Permissions Configuration Matrix
  const [permissionsMatrix, setPermissionsMatrix] = useState<any>({
    'Order Operator': {
      orders: ['View', 'Edit', 'Approve', 'Reject'],
      products: ['View'],
      customers: ['View'],
      finance: [],
      reports: ['Export'],
      settings: []
    }
  });
  const [selectedRoleForPermission, setSelectedRoleForPermission] = useState('Order Operator');
  const [permissionModal, setPermissionModal] = useState(false);

  // Activity Logs
  const activityLogs = [
    { id: 1, user: 'Hasib Rahman', action: 'Updated system settings', time: '10:45 AM today', status: 'success' },
    { id: 2, user: 'Tanvir Hossain', action: 'Approved payout for Reseller R-102', time: '09:30 AM today', status: 'success' },
    { id: 3, user: 'Fahim Ahmed', action: 'Attempted to delete order (Permission Denied)', time: 'Yesterday 04:15 PM', status: 'denied' },
    { id: 4, user: 'Nadia Islam', action: 'Resolved support ticket #TKT-1021', time: 'Yesterday 11:20 AM', status: 'success' },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1 w-max"><CheckCircle size={12}/> Active</span>;
      case 'Inactive': return <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1 w-max"><Clock size={12}/> Inactive</span>;
      case 'Blocked': return <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1 w-max"><ShieldAlert size={12}/> Blocked</span>;
      default: return null;
    }
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter(r => r.id !== id));
    setDeleteRoleModal(null);
  };

  const handleDeactivate = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'Blocked' } : u));
    setDeactivateModal(null);
  };

  const availablePermissions = ['View only', 'Add', 'Edit', 'Delete', 'Approve', 'Reject', 'Refund', 'Export reports', 'Manage settings'];
  const modules = ['Orders', 'Products', 'Customers', 'Finance', 'Reports', 'Settings'];

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Users & Roles</h2>
      </div>

      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => { setActiveTab('users'); setSelectedUser(null); }}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'users' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Users className="inline w-4 h-4 mr-2" /> Staff Users
        </button>
        <button
          onClick={() => { setActiveTab('roles'); setSelectedUser(null); }}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'roles' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Shield className="inline w-4 h-4 mr-2" /> Roles & Permissions
        </button>
        <button
          onClick={() => { setActiveTab('logs'); setSelectedUser(null); }}
          className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${activeTab === 'logs' ? 'border-[#28a745] text-[#28a745]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          <Activity className="inline w-4 h-4 mr-2" /> Activity Logs
        </button>
      </div>

      {activeTab === 'users' && !selectedUser && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-between flex-wrap gap-4">
            <div className="relative w-full md:w-72">
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full text-sm focus:ring-[#28a745]" 
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <button onClick={() => setUserModal(true)} className="bg-[#28a745] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus size={16} /> Add User
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Last Login</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredUsers.map(user => (
                  <tr 
                    key={user.id} 
                    onClick={() => setSelectedUser(user)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-700">{user.role}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{user.lastLogin}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                        className="text-blue-600 hover:bg-blue-50 p-1.5 rounded mr-2"
                      >
                        <Eye size={16}/>
                      </button>
                      {user.role !== 'Super Admin' && user.status !== 'Blocked' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); setDeactivateModal(user.id); }}
                          className="text-red-600 hover:bg-red-50 p-1.5 rounded"
                        >
                          <ShieldAlert size={16}/>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && selectedUser && (
        <div className="animate-in fade-in space-y-6">
          <button 
            onClick={() => setSelectedUser(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm bg-white border border-gray-300 px-4 py-2 rounded-lg"
          >
            &larr; Back to Users
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-gray-400">{selectedUser.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
                <p className="text-gray-500 mb-3">{selectedUser.email}</p>
                <div className="mb-6">{getStatusBadge(selectedUser.status)}</div>
                
                <div className="w-full space-y-3">
                  <button className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm border border-blue-200">
                    Edit Profile
                  </button>
                  <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg font-medium text-sm border border-gray-200">
                    Reset Password
                  </button>
                  {selectedUser.role !== 'Super Admin' && (
                    <button 
                      onClick={() => setDeactivateModal(selectedUser.id)}
                      className="w-full py-2 bg-red-50 text-red-700 rounded-lg font-medium text-sm border border-red-200"
                    >
                      {selectedUser.status === 'Blocked' ? 'Unblock User' : 'Deactivate User'}
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 border-b pb-2 mb-4">Role & Access</h4>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Current Role</p>
                    <p className="font-bold text-gray-800 text-lg flex items-center gap-2">
                      <Shield className="text-[#28a745]" size={20} />
                      {selectedUser.role}
                    </p>
                  </div>
                  <button className="text-blue-600 font-medium text-sm hover:underline">Change Role</button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 border-b pb-2 mb-4">Recent Activity Logs</h4>
                <div className="space-y-4">
                  {activityLogs.filter(log => log.user === selectedUser.name).map((log, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${log.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="text-gray-800 font-medium">{log.action}</p>
                        <p className="text-xs text-gray-500">{log.time}</p>
                      </div>
                    </div>
                  ))}
                  {activityLogs.filter(log => log.user === selectedUser.name).length === 0 && (
                    <p className="text-sm text-gray-500">No recent activity found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex justify-end">
            <button onClick={() => setRoleModal(true)} className="bg-[#28a745] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <Plus size={16} /> Create Role
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map(role => (
              <div key={role.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative group">
                {role.name !== 'Super Admin' && (
                  <div className="absolute top-4 right-4 hidden group-hover:flex gap-2">
                    <button onClick={() => { setSelectedRoleForPermission(role.name); setPermissionModal(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded bg-white shadow-sm border"><Key size={14}/></button>
                    <button onClick={() => setDeleteRoleModal(role.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded bg-white shadow-sm border"><Trash2 size={14}/></button>
                  </div>
                )}
                
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-2">
                  <Shield size={20} className={role.name === 'Super Admin' ? 'text-purple-600' : 'text-[#28a745]'} /> 
                  {role.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 h-10">{role.description}</p>
                <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                    {role.usersCount} {role.usersCount === 1 ? 'User' : 'Users'}
                  </span>
                  {role.name !== 'Super Admin' && (
                    <button onClick={() => { setSelectedRoleForPermission(role.name); setPermissionModal(true); }} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                      Edit Permissions <ArrowRight size={14}/>
                    </button>
                  )}
                  {role.name === 'Super Admin' && (
                    <span className="text-xs text-gray-400 italic">Uneditable</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-800">System Access & Activity Logs</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action Event</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activityLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{log.user}</td>
                  <td className="px-6 py-4 text-gray-600">{log.action}</td>
                  <td className="px-6 py-4 text-gray-500 text-xs">{log.time}</td>
                  <td className="px-6 py-4">
                    {log.status === 'success' 
                      ? <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-medium border border-green-200">Success</span>
                      : <span className="text-red-600 bg-red-50 px-2 py-1 rounded text-xs font-medium border border-red-200">Denied / Failed</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Deactivate User Modal */}
      {deactivateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Block User?</h3>
            <p className="text-sm text-gray-500 mb-6">This user will lose all access to the admin panel immediately. They will be logged out of active sessions.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeactivateModal(null)} className="flex-1 border py-2 rounded-lg font-medium text-gray-700">Cancel</button>
              <button onClick={() => handleDeactivate(deactivateModal)} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium">Yes, Block User</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Role Modal */}
      {deleteRoleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Delete Role?</h3>
            <p className="text-sm text-gray-500 mb-6">This role will be permanently deleted. Users assigned to this role might lose their access.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteRoleModal(null)} className="flex-1 border py-2 rounded-lg font-medium text-gray-700">Cancel</button>
              <button onClick={() => handleDeleteRole(deleteRoleModal)} className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Permission Matrix Modal */}
      {permissionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-bold text-xl text-gray-800">Edit Permissions</h3>
                <p className="text-sm text-gray-500">Role: <span className="font-semibold text-gray-800">{selectedRoleForPermission}</span></p>
              </div>
              <button onClick={() => setPermissionModal(false)} className="text-gray-400 hover:text-gray-700"><XCircle size={24}/></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-700 border-r">Module</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Permissions Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {modules.map(module => (
                      <tr key={module}>
                        <td className="px-4 py-3 font-medium text-gray-800 border-r bg-gray-50/50 w-48">{module}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-4">
                            {availablePermissions.map(perm => (
                              <label key={perm} className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                  type="checkbox" 
                                  className="w-4 h-4 rounded border-gray-300 text-[#28a745] focus:ring-[#28a745]"
                                  defaultChecked={['View only', 'Add'].includes(perm)}
                                />
                                <span className="text-gray-600 group-hover:text-gray-900">{perm}</span>
                              </label>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Secure Access Control Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg flex gap-3 border border-blue-100">
                <Shield className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 text-sm">Secure Access Control Active</h4>
                  <p className="text-blue-700 text-xs mt-1">Changes to role permissions take effect immediately. Users currently logged in with this role may experience "Permission Denied" if attempting to access restricted features.</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 flex justify-end gap-3">
              <button onClick={() => setPermissionModal(false)} className="px-6 py-2 border rounded-lg font-medium text-gray-700 bg-white">Cancel</button>
              <button onClick={() => setPermissionModal(false)} className="px-6 py-2 bg-[#28a745] text-white rounded-lg font-medium">Save Permissions</button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {userModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Add New User</h3>
              <button onClick={() => setUserModal(false)} className="text-gray-400 hover:text-gray-700"><XCircle size={20}/></button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 focus:ring-[#28a745]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input type="email" className="w-full border rounded-lg px-3 py-2 focus:ring-[#28a745]" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block font-medium mb-1">Assign Role</label>
                <select className="w-full border rounded-lg px-3 py-2 focus:ring-[#28a745]">
                  <option>Admin</option>
                  <option>Order Operator</option>
                  <option>Support Agent</option>
                  <option>Finance Staff</option>
                  <option>Content Manager</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Temporary Password</label>
                <input type="password" className="w-full border rounded-lg px-3 py-2 focus:ring-[#28a745]" placeholder="••••••••" />
                <p className="text-xs text-gray-500 mt-1">User will be prompted to change this on first login.</p>
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setUserModal(false)} className="flex-1 border py-2 rounded-lg font-medium text-gray-700">Cancel</button>
                <button onClick={() => setUserModal(false)} className="flex-1 bg-[#28a745] text-white py-2 rounded-lg font-medium">Create User</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      {roleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Create New Role</h3>
              <button onClick={() => setRoleModal(false)} className="text-gray-400 hover:text-gray-700"><XCircle size={20}/></button>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <label className="block font-medium mb-1">Role Name</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2 focus:ring-[#28a745]" placeholder="e.g. Marketing Lead" />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea className="w-full border rounded-lg px-3 py-2 focus:ring-[#28a745] h-24" placeholder="Describe the responsibilities of this role..."></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button onClick={() => setRoleModal(false)} className="flex-1 border py-2 rounded-lg font-medium text-gray-700">Cancel</button>
                <button onClick={() => setRoleModal(false)} className="flex-1 bg-[#28a745] text-white py-2 rounded-lg font-medium">Create Role</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
