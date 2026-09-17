import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Search, Plus, Edit, Trash2, Eye, 
  ArrowLeft, ImageIcon, Upload, AlertCircle, Layers
} from 'lucide-react';

type Category = {
  id: string;
  title: string;
  slug: string;
  parentId: string | null;
  image: string;
  order: number;
  status: 'Active' | 'Inactive';
};

export default function AdminCategories() {
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'view'>('list');
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', title: 'Women Clothing & Fashion', slug: 'women-clothing-fashion', parentId: null, image: '', order: 1, status: 'Active' },
    { id: '1-1', title: 'Three pics', slug: 'three-pics', parentId: '1', image: '', order: 1, status: 'Active' },
    { id: '1-2', title: 'Saree', slug: 'saree', parentId: '1', image: '', order: 2, status: 'Active' },
    { id: '1-3', title: 'Womens Bag', slug: 'womens-bag', parentId: '1', image: '', order: 3, status: 'Active' },
    { id: '1-4', title: 'Two pics', slug: 'two-pics', parentId: '1', image: '', order: 4, status: 'Active' },
    { id: '1-5', title: '4 Pices', slug: '4-pices', parentId: '1', image: '', order: 5, status: 'Active' },
    { id: '1-6', title: 'Party Dress', slug: 'party-dress', parentId: '1', image: '', order: 6, status: 'Active' },
    { id: '1-7', title: 'Borka', slug: 'borka', parentId: '1', image: '', order: 7, status: 'Active' },
    { id: '1-8', title: 'One pis', slug: 'one-pis', parentId: '1', image: '', order: 8, status: 'Active' },

    { id: '2', title: 'Gadgets', slug: 'gadgets', parentId: null, image: '', order: 2, status: 'Active' },
    { id: '2-1', title: 'Tripod &Ring Light', slug: 'tripod-ring-light', parentId: '2', image: '', order: 1, status: 'Active' },
    { id: '2-2', title: 'Power Bank', slug: 'power-bank', parentId: '2', image: '', order: 2, status: 'Active' },
    { id: '2-3', title: 'Speaker', slug: 'speaker', parentId: '2', image: '', order: 3, status: 'Active' },
    { id: '2-3-1', title: 'Car Speaker', slug: 'car-speaker', parentId: '2-3', image: '', order: 1, status: 'Active' },
    { id: '2-4', title: 'keyboard', slug: 'keyboard', parentId: '2', image: '', order: 4, status: 'Active' },
    { id: '2-5', title: 'Humidifier', slug: 'humidifier', parentId: '2', image: '', order: 5, status: 'Active' },
    { id: '2-6', title: 'Headphone', slug: 'headphone', parentId: '2', image: '', order: 6, status: 'Active' },
    { id: '2-7', title: 'Multiple Accessories', slug: 'multiple-accessories', parentId: '2', image: '', order: 7, status: 'Active' },
    { id: '2-8', title: 'Wireless Microphone &Boya', slug: 'wireless-microphone-boya', parentId: '2', image: '', order: 8, status: 'Active' },
    { id: '2-9', title: 'Wireless Charger', slug: 'wireless-charger', parentId: '2', image: '', order: 9, status: 'Active' },
    { id: '2-10', title: 'Mobile Accessories', slug: 'mobile-accessories', parentId: '2', image: '', order: 10, status: 'Active' },
    { id: '2-11', title: 'Mobile Charger', slug: 'mobile-charger', parentId: '2', image: '', order: 11, status: 'Active' },
    { id: '2-12', title: 'Printer', slug: 'printer', parentId: '2', image: '', order: 12, status: 'Active' },
    { id: '2-12-1', title: 'Thermal Paper', slug: 'thermal-paper', parentId: '2-12', image: '', order: 1, status: 'Active' },
    { id: '2-13', title: 'Lighter', slug: 'lighter', parentId: '2', image: '', order: 13, status: 'Active' },
    { id: '2-14', title: 'Trimmer & Razor', slug: 'trimmer-razor', parentId: '2', image: '', order: 14, status: 'Active' },
    { id: '2-15', title: 'Earbuds', slug: 'earbuds', parentId: '2', image: '', order: 15, status: 'Active' },
    { id: '2-15-1', title: 'Neckband', slug: 'neckband', parentId: '2-15', image: '', order: 1, status: 'Active' },
    { id: '2-16', title: 'Cable', slug: 'cable', parentId: '2', image: '', order: 16, status: 'Active' },
    { id: '2-17', title: 'WIFI Router', slug: 'wifi-router', parentId: '2', image: '', order: 17, status: 'Active' },
    { id: '2-18', title: 'Camera', slug: 'camera', parentId: '2', image: '', order: 18, status: 'Active' },
    { id: '2-19', title: 'Drone', slug: 'drone', parentId: '2', image: '', order: 19, status: 'Active' },

    { id: '3', title: 'Watch', slug: 'watch', parentId: null, image: '', order: 3, status: 'Active' },
    { id: '3-1', title: 'Smart Watch', slug: 'smart-watch', parentId: '3', image: '', order: 1, status: 'Active' },
    { id: '3-2', title: 'Clock', slug: 'clock', parentId: '3', image: '', order: 2, status: 'Active' },
    { id: '3-3', title: 'Luxury Watch', slug: 'luxury-watch', parentId: '3', image: '', order: 3, status: 'Active' },
    { id: '3-4', title: 'Ladies watch', slug: 'ladies-watch', parentId: '3', image: '', order: 4, status: 'Active' },

    { id: '4', title: 'Gents Fashion', slug: 'gents-fashion', parentId: null, image: '', order: 4, status: 'Active' },
    { id: '4-1', title: 'Panjabi', slug: 'panjabi', parentId: '4', image: '', order: 1, status: 'Active' },

    { id: '5', title: 'All Gift item', slug: 'all-gift-item', parentId: null, image: '', order: 5, status: 'Active' },
    { id: '5-1', title: 'Gift item', slug: 'gift-item', parentId: '5', image: '', order: 1, status: 'Active' },

    { id: '6', title: 'Organic Product', slug: 'organic-product', parentId: null, image: '', order: 6, status: 'Active' },
    { id: '6-1', title: 'supplement food', slug: 'supplement-food', parentId: '6', image: '', order: 1, status: 'Active' },

    { id: '7', title: 'Electronics item', slug: 'electronics-item', parentId: null, image: '', order: 7, status: 'Active' },
    { id: '7-1', title: 'Charger Fan', slug: 'charger-fan', parentId: '7', image: '', order: 1, status: 'Active' },
    { id: '7-2', title: 'All Light & 3D Light', slug: 'all-light-3d-light', parentId: '7', image: '', order: 2, status: 'Active' },
    { id: '7-3', title: 'Electronics devices', slug: 'electronics-devices', parentId: '7', image: '', order: 3, status: 'Active' },
    { id: '7-4', title: 'Blender', slug: 'blender', parentId: '7', image: '', order: 4, status: 'Active' },
    { id: '7-5', title: 'RGB Light', slug: 'rgb-light', parentId: '7', image: '', order: 5, status: 'Active' },

    { id: '8', title: 'Home & Lifestyle', slug: 'home-lifestyle', parentId: null, image: '', order: 8, status: 'Active' },
    { id: '8-1', title: 'MACRAME', slug: 'macrame', parentId: '8', image: '', order: 1, status: 'Active' },
    { id: '8-2', title: 'Beauty', slug: 'beauty', parentId: '8', image: '', order: 2, status: 'Active' },
    { id: '8-3', title: 'Health', slug: 'health', parentId: '8', image: '', order: 3, status: 'Active' },
    { id: '8-4', title: 'Kitchen & Dining', slug: 'kitchen-dining', parentId: '8', image: '', order: 4, status: 'Active' },

    { id: '9', title: 'Kids Zone', slug: 'kids-zone', parentId: null, image: '', order: 9, status: 'Active' },
    { id: '9-1', title: 'Toy', slug: 'toy', parentId: '9', image: '', order: 1, status: 'Active' },
    { id: '9-2', title: 'Kids Accessories', slug: 'kids-accessories', parentId: '9', image: '', order: 2, status: 'Active' },
    { id: '9-3', title: 'Chocolate', slug: 'chocolate', parentId: '9', image: '', order: 3, status: 'Active' },

    { id: '10', title: 'Winter Collection', slug: 'winter-collection', parentId: null, image: '', order: 10, status: 'Active' },
    
    { id: '11', title: 'Global Product', slug: 'global-product', parentId: null, image: '', order: 11, status: 'Active' }
  ]);

  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const { globalSearchQuery = '' } = useOutletContext<{ globalSearchQuery?: string }>() || {};
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  
  // Use global search if available and not empty, otherwise local
  const searchQuery = globalSearchQuery || localSearchQuery;
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      // Delete category and its subcategories
      setCategories(categories.filter(c => c.id !== categoryToDelete && c.parentId !== categoryToDelete));
    }
    setDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const openDeleteModal = (id: string) => {
    setCategoryToDelete(id);
    setDeleteModalOpen(true);
  };

  const toggleStatus = (id: string) => {
    setCategories(categories.map(c => {
      if (c.id === id) {
        return { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return c;
    }));
  };

  const handleSaveCategory = (e: any) => {
    e.preventDefault();
    if (view === 'add') {
      const newCategory = {
        ...currentCategory,
        id: Date.now().toString(),
        status: currentCategory?.status || 'Active',
        order: Number(currentCategory?.order) || 0,
        parentId: currentCategory?.parentId || null,
        image: currentCategory?.image || '',
      } as Category;
      setCategories([...categories, newCategory]);
    } else if (view === 'edit') {
      setCategories(categories.map(c => {
        if (c.id === currentCategory?.id) {
          return {
            ...c,
            ...currentCategory,
            order: Number(currentCategory?.order) || 0,
          } as Category;
        }
        return c;
      }));
    }
    setView('list');
    setCurrentCategory(null);
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return '-';
    const parent = categories.find(c => c.id === parentId);
    return parent ? parent.title : 'Unknown';
  };

  const filteredCategories = categories.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Parent categories for dropdowns
  const parentCategories = categories.filter(c => c.parentId === null);

  // Group by parent for display (flattened tree)
  const displayCategories: any[] = [];
  
  const addChildren = (parentId: string | null, level: number) => {
    const children = filteredCategories.filter(c => c.parentId === parentId);
    children.forEach(child => {
      // Don't add if already added (prevents duplicates)
      if (!displayCategories.find(dc => dc.id === child.id)) {
        displayCategories.push({...child, level});
        addChildren(child.id, level + 1);
      }
    });
  };
  
  // Start with root categories
  addChildren(null, 0);
  
  // Add any orphaned children that matched search but their parent didn't
  filteredCategories.forEach(c => {
    if (!displayCategories.find(dc => dc.id === c.id)) {
      displayCategories.push({...c, level: 0}); 
      addChildren(c.id, 1); // add their children too if any
    }
  });


  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {view === 'list' ? 'Manage Categories' : view === 'add' ? 'Add New Category' : view === 'edit' ? 'Edit Category' : 'Category Details'}
        </h2>
        {view === 'list' && (
          <button 
            onClick={() => { setCurrentCategory({}); setView('add'); }}
            className="bg-[#28a745] hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
          >
            <Plus size={18} />
            Add Category
          </button>
        )}
        {view !== 'list' && (
          <button 
            onClick={() => setView('list')}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to List
          </button>
        )}
      </div>

      {view === 'list' && (
        <>
          {/* TOOLBAR & FILTERS */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search categories..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] w-full"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* LIST TABLE */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="px-6 py-4 font-medium">Category Name</th>
                    <th className="px-6 py-4 font-medium">Slug</th>
                    <th className="px-6 py-4 font-medium">Parent Category</th>
                    <th className="px-6 py-4 font-medium">Order</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {displayCategories.map((category: any) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 cursor-pointer" onClick={() => { setCurrentCategory(category); setView('view'); }}>
                        <div className="flex items-center gap-3" style={{ paddingLeft: `${category.level * 24}px` }}>
                          <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 shrink-0 border border-gray-200 flex items-center justify-center text-gray-400">
                            {category.image ? (
                              <img src={category.image} alt={category.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={20} />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{category.title}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {getParentName(category.parentId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {category.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleStatus(category.id)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            category.status === 'Active' 
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {category.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setCurrentCategory(category); setView('view'); }}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors" 
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => { setCurrentCategory(category); setView('edit'); }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(category.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {displayCategories.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Layers size={48} className="text-gray-300 mb-4" />
                          <p className="text-lg font-medium text-gray-700">No categories found</p>
                          <p className="text-sm">Try adjusting your search or add a new category.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {(view === 'add' || view === 'edit') && (
        <form onSubmit={handleSaveCategory} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Category Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Title *</label>
                    <input 
                      type="text" required
                      value={currentCategory?.title || ''}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        setCurrentCategory({...currentCategory, title, slug: currentCategory?.slug ? currentCategory.slug : slug});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                      placeholder="e.g., Electronics"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                    <input 
                      type="text" required
                      value={currentCategory?.slug || ''}
                      onChange={(e) => setCurrentCategory({...currentCategory, slug: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                      placeholder="e.g., electronics"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                    <select 
                      value={currentCategory?.parentId || ''}
                      onChange={(e) => setCurrentCategory({...currentCategory, parentId: e.target.value || null})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    >
                      <option value="">None (Top Level)</option>
                      {parentCategories
                        .filter(c => c.id !== currentCategory?.id) // Prevent self-referencing
                        .map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input 
                      type="number"
                      value={currentCategory?.order || ''}
                      onChange={(e) => setCurrentCategory({...currentCategory, order: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={currentCategory?.status || 'Active'}
                    onChange={(e) => setCurrentCategory({...currentCategory, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Category Image</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  {currentCategory?.image ? (
                    <div className="relative w-full aspect-square rounded overflow-hidden">
                      <img src={currentCategory.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className="text-gray-400 mb-2 group-hover:text-[#28a745] transition-colors" />
                      <div className="text-sm font-medium text-gray-700">Upload Image</div>
                      <div className="text-xs text-gray-500 mt-1">Icon or Banner</div>
                    </>
                  )}
                </div>
                <input 
                  type="text"
                  placeholder="Or paste image URL"
                  value={currentCategory?.image || ''}
                  onChange={(e) => setCurrentCategory({...currentCategory, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setView('list')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#28a745] hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
            >
              {view === 'add' ? 'Create Category' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {view === 'view' && currentCategory && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center shrink-0">
              {currentCategory.image ? (
                <img src={currentCategory.image} alt={currentCategory.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <ImageIcon size={32} className="text-gray-300" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{currentCategory.title}</h3>
              <p className="text-gray-500 mb-2">/{currentCategory.slug}</p>
              <div className="flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    currentCategory.status === 'Active' 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                  {currentCategory.status}
                </span>
                {currentCategory.parentId && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                    Child of: {getParentName(currentCategory.parentId)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3">
            <button 
              onClick={() => { setView('edit'); }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Edit size={18} /> Edit Category
            </button>
            <button 
              onClick={() => openDeleteModal(currentCategory.id!)}
              className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-600 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Category</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this category? Any subcategories will also be removed. This action cannot be undone.
              </p>
              <div className="flex gap-3 w-full">
                <button 
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteConfirm}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
