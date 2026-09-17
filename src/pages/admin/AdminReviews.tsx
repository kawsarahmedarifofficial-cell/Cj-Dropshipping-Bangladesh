import { useState } from 'react';
import { 
  Star, Search, Filter, CheckCircle, XCircle, EyeOff, AlertTriangle
} from 'lucide-react';

export default function AdminReviews() {
  const [filter, setFilter] = useState('All');
  const [reviews, setReviews] = useState([
    { id: 'REV-1', product: 'Premium Wireless Headphones', customer: 'Rahim Uddin', rating: 5, date: '2023-10-25', comment: 'Excellent product. Sound quality is amazing and battery life is exactly as advertised. Fast delivery too!', status: 'Pending', reported: false },
    { id: 'REV-2', product: 'Smart Watch Series 8', customer: 'Karim Hasan', rating: 2, date: '2023-10-24', comment: 'The band broke after 2 days. The seller is not responding. Do not buy this product.', status: 'Published', reported: true },
    { id: 'REV-3', product: 'Leather Wallet Men', customer: 'Sumi Akter', rating: 4, date: '2023-10-23', comment: 'Good quality leather, nice stitching. Bought it as a gift.', status: 'Published', reported: false },
    { id: 'REV-4', product: 'Bluetooth Speaker', customer: 'Jashim Ahmed', rating: 1, date: '2023-10-22', comment: 'Fake product. Doesn\'t match the description at all. Scam!', status: 'Hidden', reported: true }
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'All') return true;
    if (filter === 'Reported') return r.reported;
    return r.status === filter;
  });

  const getStatusBadge = (status: string, reported: boolean) => {
    if (reported) return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-red-50 text-red-700 border-red-200 flex items-center gap-1 w-max"><AlertTriangle size={12}/> Reported</span>;
    switch(status) {
      case 'Published': return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-green-50 text-green-700 border-green-200 w-max">Published</span>;
      case 'Pending': return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-orange-50 text-orange-700 border-orange-200 w-max">Pending</span>;
      case 'Hidden': return <span className="px-2.5 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-700 border-gray-300 w-max">Hidden</span>;
      default: return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5 text-yellow-400">
        {[1,2,3,4,5].map(star => (
          <Star key={star} size={14} fill={star <= rating ? 'currentColor' : 'none'} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'} />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Product Reviews</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-80">
            <input type="text" placeholder="Search product or customer..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-[#28a745]" />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
            {['All', 'Pending', 'Published', 'Hidden', 'Reported'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap border transition-colors ${
                  filter === f ? 'bg-[#28a745] text-white border-[#28a745]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4">Product & Customer</th>
                <th className="px-6 py-4">Rating & Review</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredReviews.map(review => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{review.product}</div>
                    <div className="text-xs text-gray-500 mt-1">by {review.customer} on {review.date}</div>
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <div className="mb-2">{renderStars(review.rating)}</div>
                    <p className="text-gray-600 line-clamp-2">{review.comment}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(review.status, review.reported)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      {review.status !== 'Published' && (
                        <button onClick={() => updateStatus(review.id, 'Published')} className="px-2.5 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded text-xs font-medium flex items-center gap-1 border border-green-200">
                          <CheckCircle size={14} /> Approve
                        </button>
                      )}
                      {review.status !== 'Hidden' && (
                        <button onClick={() => updateStatus(review.id, 'Hidden')} className="px-2.5 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded text-xs font-medium flex items-center gap-1 border border-gray-300">
                          <EyeOff size={14} /> Hide
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReviews.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
