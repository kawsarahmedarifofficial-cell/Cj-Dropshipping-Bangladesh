import { Link } from 'react-router-dom';
import { ArrowLeft, RefreshCcw } from 'lucide-react';

export default function Compare() {
  return (
    <div className="container mx-auto px-4 py-8 flex-grow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <RefreshCcw size={28} className="text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">Compare Products</h1>
        </div>
        <Link to="/" className="flex items-center gap-2 text-green-600 font-medium hover:text-green-700 transition-colors">
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
        <RefreshCcw size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">No products to compare</h3>
        <p className="text-gray-500 mb-6">Add products to comparison list to see their differences.</p>
        <Link to="/" className="inline-flex bg-green-600 text-white px-6 py-2 rounded font-medium hover:bg-green-700 transition-colors">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
