import { useState, useEffect } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { 
  Search, Plus, Edit, Trash2, Copy, Eye, 
  Filter, ChevronDown, Check, X, Image as ImageIcon, 
  Upload, AlertCircle, ArrowLeft, CheckSquare, Square, Package
} from 'lucide-react';

type Product = {
  id: string;
  title: string;
  slug: string;
  sku: string;
  price: number;
  salePrice: number | null;
  costPrice: number;
  profitMargin: number;
  stock: number;
  category: string;
  status: 'Published' | 'Draft' | 'Unpublished';
  featured: boolean;
  resellingAvailable: boolean;
  image: string;
  tags: string;
  description: string;
};

export default function AdminProducts() {
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'list' | 'add' | 'edit' | 'view'>('list');
  const [stockFilter, setStockFilter] = useState('');

  useEffect(() => {
    if (searchParams.get('stock') === 'low') {
      setStockFilter('low');
    }
  }, [searchParams]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Premium Wireless Headphones',
      slug: 'premium-wireless-headphones',
      sku: 'WH-1000XM4',
      price: 2500,
      salePrice: 2200,
      costPrice: 1500,
      profitMargin: 700,
      stock: 45,
      category: 'Electronics',
      status: 'Published',
      featured: true,
      resellingAvailable: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
      tags: 'headphones, audio, wireless',
      description: 'High quality premium wireless headphones with noise cancellation.'
    },
    {
      id: '2',
      title: 'Minimalist Watch',
      slug: 'minimalist-watch',
      sku: 'MW-001',
      price: 1200,
      salePrice: null,
      costPrice: 600,
      profitMargin: 600,
      stock: 12,
      category: 'Accessories',
      status: 'Published',
      featured: false,
      resellingAvailable: true,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80',
      tags: 'watch, minimalist, accessory',
      description: 'A beautiful minimalist watch.'
    }
  ]);

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { globalSearchQuery = '' } = useOutletContext<{ globalSearchQuery?: string }>() || {};
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  
  // Use global search if available and not empty, otherwise local
  const searchQuery = globalSearchQuery || localSearchQuery;
  
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(pId => pId !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete));
    } else if (selectedProducts.length > 0) {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const openDeleteModal = (id?: string) => {
    if (id) setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleDuplicate = (product: Product) => {
    const duplicated = {
      ...product,
      id: Date.now().toString(),
      title: `${product.title} (Copy)`,
      slug: `${product.slug}-copy`,
      sku: `${product.sku}-COPY`,
      status: 'Draft' as const
    };
    setProducts([duplicated, ...products]);
  };

  const toggleStatus = (id: string, currentStatus: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, status: currentStatus === 'Published' ? 'Unpublished' : 'Published' };
      }
      return p;
    }));
  };

  const handleSaveProduct = (e: any) => {
    e.preventDefault();
    if (view === 'add') {
      const newProduct = {
        ...currentProduct,
        id: Date.now().toString(),
        profitMargin: (Number(currentProduct?.salePrice || currentProduct?.price) || 0) - (Number(currentProduct?.costPrice) || 0),
        status: currentProduct?.status || 'Draft',
        featured: currentProduct?.featured || false,
        resellingAvailable: currentProduct?.resellingAvailable || false,
      } as Product;
      setProducts([newProduct, ...products]);
    } else if (view === 'edit') {
      setProducts(products.map(p => {
        if (p.id === currentProduct?.id) {
          return {
            ...p,
            ...currentProduct,
            profitMargin: (Number(currentProduct?.salePrice || currentProduct?.price) || 0) - (Number(currentProduct?.costPrice) || 0),
          } as Product;
        }
        return p;
      }));
    }
    setView('list');
    setCurrentProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || p.category === categoryFilter;
    const matchesStatus = statusFilter === '' || p.status === statusFilter;
    let matchesStock = true;
    if (stockFilter === 'low') matchesStock = p.stock > 0 && p.stock < 10;
    if (stockFilter === 'out') matchesStock = p.stock === 0;
    if (stockFilter === 'in') matchesStock = p.stock >= 10;
    
    let matchesPrice = true;
    const actualPrice = p.salePrice || p.price;
    if (priceFilter === 'under1000') matchesPrice = actualPrice < 1000;
    if (priceFilter === '1000to5000') matchesPrice = actualPrice >= 1000 && actualPrice <= 5000;
    if (priceFilter === 'over5000') matchesPrice = actualPrice > 5000;

    return matchesSearch && matchesCategory && matchesStatus && matchesStock && matchesPrice;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {view === 'list' ? 'Manage Products' : view === 'add' ? 'Add New Product' : view === 'edit' ? 'Edit Product' : 'Product Details'}
        </h2>
        {view === 'list' && (
          <button 
            onClick={() => { setCurrentProduct({}); setView('add'); }}
            className="bg-[#28a745] hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors text-sm"
          >
            <Plus size={18} />
            Add Product
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
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] w-full sm:w-64"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
              
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] bg-white w-full sm:w-auto"
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Accessories">Accessories</option>
                <option value="Clothing">Clothing</option>
              </select>

              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] bg-white w-full sm:w-auto"
              >
                <option value="">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Unpublished">Unpublished</option>
              </select>

              <select 
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] bg-white w-full sm:w-auto"
              >
                <option value="">All Stock</option>
                <option value="in">In Stock (10+)</option>
                <option value="low">Low Stock (&lt;10)</option>
                <option value="out">Out of Stock (0)</option>
              </select>

              <select 
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745] bg-white w-full sm:w-auto"
              >
                <option value="">All Prices</option>
                <option value="under1000">Under ৳1,000</option>
                <option value="1000to5000">৳1,000 - ৳5,000</option>
                <option value="over5000">Over ৳5,000</option>
              </select>
            </div>

            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 w-full md:w-auto">
                <span className="text-sm font-medium text-blue-800">{selectedProducts.length} selected</span>
                <div className="flex gap-2">
                  <button className="text-xs bg-white border border-gray-300 hover:bg-gray-50 px-2 py-1 rounded text-gray-700 transition-colors">
                    Publish
                  </button>
                  <button className="text-xs bg-white border border-gray-300 hover:bg-gray-50 px-2 py-1 rounded text-gray-700 transition-colors">
                    Unpublish
                  </button>
                  <button 
                    onClick={() => openDeleteModal()}
                    className="text-xs bg-red-500 hover:bg-red-600 border border-red-600 px-2 py-1 rounded text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PRODUCT LIST TABLE */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider bg-gray-50">
                    <th className="px-4 py-4 w-12">
                      <button onClick={handleSelectAll} className="text-gray-400 hover:text-gray-600">
                        {selectedProducts.length === products.length && products.length > 0 ? (
                          <CheckSquare size={18} className="text-[#28a745]" />
                        ) : (
                          <Square size={18} />
                        )}
                      </button>
                    </th>
                    <th className="px-4 py-4 font-medium">Product</th>
                    <th className="px-4 py-4 font-medium">SKU / Stock</th>
                    <th className="px-4 py-4 font-medium">Pricing</th>
                    <th className="px-4 py-4 font-medium">Category</th>
                    <th className="px-4 py-4 font-medium">Status</th>
                    <th className="px-4 py-4 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-4 py-4">
                        <button onClick={() => handleSelectProduct(product.id)} className="text-gray-400 hover:text-gray-600">
                          {selectedProducts.includes(product.id) ? (
                            <CheckSquare size={18} className="text-[#28a745]" />
                          ) : (
                            <Square size={18} />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 cursor-pointer" onClick={() => { setCurrentProduct(product); setView('view'); }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            {product.image ? (
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-full h-full p-2 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800 line-clamp-1">{product.title}</div>
                            <div className="text-xs text-gray-500 flex gap-2 mt-0.5">
                              {product.featured && <span className="text-orange-500 font-medium">Featured</span>}
                              {product.resellingAvailable && <span className="text-blue-500 font-medium">Resellable</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-gray-800 font-medium">{product.sku}</div>
                        <div className={`text-xs mt-0.5 ${product.stock < 10 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                          {product.stock} in stock
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-800">৳ {product.salePrice || product.price}</span>
                          {product.salePrice && <span className="text-xs text-gray-400 line-through">৳ {product.price}</span>}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Profit: <span className="text-green-600 font-medium">৳ {product.profitMargin}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                        {product.category}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button 
                          onClick={() => toggleStatus(product.id, product.status)}
                          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                            product.status === 'Published' 
                              ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                              : product.status === 'Draft'
                              ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {product.status}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="flex justify-end gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => { setCurrentProduct(product); setView('view'); }}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors" 
                            title="View"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            onClick={() => { setCurrentProduct(product); setView('edit'); }}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" 
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDuplicate(product)}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition-colors" 
                            title="Duplicate"
                          >
                            <Copy size={16} />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(product.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" 
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Package size={48} className="text-gray-300 mb-4" />
                          <p className="text-lg font-medium text-gray-700">No products found</p>
                          <p className="text-sm">Try adjusting your filters or add a new product.</p>
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
        <form onSubmit={handleSaveProduct} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
                  <input 
                    type="text" required
                    value={currentProduct?.title || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    placeholder="e.g., Premium Wireless Headphones"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                    <input 
                      type="text"
                      value={currentProduct?.slug || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, slug: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                      placeholder="premium-wireless-headphones"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                    <input 
                      type="text" required
                      value={currentProduct?.sku || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, sku: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                      placeholder="WH-1000XM4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea 
                    rows={5}
                    value={currentProduct?.description || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    placeholder="Enter detailed product description..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input 
                    type="text"
                    value={currentProduct?.tags || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    placeholder="e.g. headphones, audio, premium (comma separated)"
                  />
                </div>
              </div>

              {/* Pricing & Inventory */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Pricing & Inventory</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price (৳) *</label>
                    <input 
                      type="number" required min="0"
                      value={currentProduct?.price || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (৳)</label>
                    <input 
                      type="number" min="0"
                      value={currentProduct?.salePrice || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, salePrice: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price (৳) *</label>
                    <input 
                      type="number" required min="0"
                      value={currentProduct?.costPrice || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, costPrice: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
                    <input 
                      type="number" required min="0"
                      value={currentProduct?.stock || ''}
                      onChange={(e) => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Profit Margin</label>
                    <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-green-600 font-bold">
                      ৳ {((Number(currentProduct?.salePrice) || Number(currentProduct?.price) || 0) - (Number(currentProduct?.costPrice) || 0))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Status & Organization */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Organization</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select 
                    value={currentProduct?.status || 'Draft'}
                    onChange={(e) => setCurrentProduct({...currentProduct, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Unpublished">Unpublished</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    value={currentProduct?.category || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>

                <div className="pt-2 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={currentProduct?.featured || false}
                      onChange={(e) => setCurrentProduct({...currentProduct, featured: e.target.checked})}
                      className="w-4 h-4 text-[#28a745] border-gray-300 rounded focus:ring-[#28a745]"
                    />
                    <span className="text-sm text-gray-700 font-medium">Featured Product</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={currentProduct?.resellingAvailable || false}
                      onChange={(e) => setCurrentProduct({...currentProduct, resellingAvailable: e.target.checked})}
                      className="w-4 h-4 text-[#28a745] border-gray-300 rounded focus:ring-[#28a745]"
                    />
                    <span className="text-sm text-gray-700 font-medium">Available for Reselling</span>
                  </label>
                </div>
              </div>

              {/* Product Image */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Product Image</h3>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                  {currentProduct?.image ? (
                    <div className="relative w-full aspect-square rounded overflow-hidden">
                      <img src={currentProduct.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className="text-gray-400 mb-2 group-hover:text-[#28a745] transition-colors" />
                      <div className="text-sm font-medium text-gray-700">Click to upload image</div>
                      <div className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</div>
                    </>
                  )}
                </div>
                {/* Dummy input just to simulate state change for demo */}
                <input 
                  type="text"
                  placeholder="Or paste image URL"
                  value={currentProduct?.image || ''}
                  onChange={(e) => setCurrentProduct({...currentProduct, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
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
              {view === 'add' ? 'Create Product' : 'Save Changes'}
            </button>
          </div>
        </form>
      )}

      {view === 'view' && currentProduct && (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
           <div className="flex flex-col md:flex-row gap-8">
             <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {currentProduct.image ? (
                    <img src={currentProduct.image} alt={currentProduct.title} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={64} className="text-gray-300" />
                  )}
                </div>
             </div>
             <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        currentProduct.status === 'Published' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : currentProduct.status === 'Draft'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>
                      {currentProduct.status}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                      {currentProduct.category}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{currentProduct.title}</h1>
                  <p className="text-sm text-gray-500 mt-1">SKU: {currentProduct.sku}</p>
                </div>

                <div className="flex items-end gap-3 py-4 border-y border-gray-100">
                  <div className="text-3xl font-bold text-gray-900">৳ {currentProduct.salePrice || currentProduct.price}</div>
                  {currentProduct.salePrice && (
                    <div className="text-lg text-gray-400 line-through mb-1">৳ {currentProduct.price}</div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stock Available</div>
                    <div className={`text-xl font-bold ${Number(currentProduct.stock) < 10 ? 'text-red-500' : 'text-gray-800'}`}>
                      {currentProduct.stock} Units
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="text-xs text-green-700 uppercase tracking-wider mb-1">Profit Margin</div>
                    <div className="text-xl font-bold text-green-700">৳ {currentProduct.profitMargin}</div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => { setView('edit'); }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit size={18} /> Edit Product
                  </button>
                  <button 
                    onClick={() => openDeleteModal(currentProduct.id)}
                    className="flex-1 bg-white border border-red-200 hover:bg-red-50 text-red-600 py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
             </div>
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
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Confirmation</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete {productToDelete ? 'this product' : `these ${selectedProducts.length} products`}? This action cannot be undone.
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
