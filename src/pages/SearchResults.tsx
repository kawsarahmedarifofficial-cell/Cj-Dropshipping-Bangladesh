import { useSearchParams, Link } from 'react-router-dom';

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Mock search results
  const allProducts = [
    { id: 1, name: 'Smart Watch Series 8', price: 1250, category: 'Watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Premium Wireless Headphones', price: 2500, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=200' },
    { id: 3, name: 'Bluetooth Speaker', price: 850, category: 'Electronics item', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=200' },
    { id: 4, name: 'Leather Wallet Men', price: 450, category: 'Gents Fashion', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=200' },
    { id: 5, name: 'Gaming Keyboard', price: 1800, category: 'Gadgets', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=200' },
    { id: 6, name: 'Ladies Handbag', price: 1200, category: 'Women Clothing & Fashion', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=200' },
  ];

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-grow bg-[#f4f7f6] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Search Results</h1>
        <p className="text-gray-600 mb-8">
          Showing results for: <span className="font-semibold text-gray-900">"{query}"</span>
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <Link to={`/reseller/product/${product.id}`} key={product.id} className="border border-gray-100 rounded hover:shadow-lg transition-shadow bg-white overflow-hidden group block">
                <div className="aspect-square bg-gray-50 p-4 relative">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">{product.name}</h3>
                  <div className="font-bold text-green-600">৳ {product.price.toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-sm text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">We couldn't find anything matching "{query}". Try adjusting your search.</p>
            <Link to="/" className="inline-block bg-[#28a745] text-white px-6 py-2 rounded font-medium hover:bg-green-600 transition-colors">
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
