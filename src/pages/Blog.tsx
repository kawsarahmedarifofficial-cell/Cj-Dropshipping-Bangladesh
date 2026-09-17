import { Link } from 'react-router-dom';
import { FileText, RotateCcw, HeadphonesIcon, ShieldCheck } from 'lucide-react';

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Web Development",
      category: "Service",
      description: "Web Development",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "আপনি কি উদ্যোক্তা হতে চাচ্ছেন?",
      category: "Business",
      description: "উদ্যোক্তা হয়ে নিজের ব্যবসা নিজেই করুন",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Outlate",
      category: "Business",
      description: "Merrono Outlate",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="flex-grow flex flex-col bg-[#f8f9fa]">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">Blog</h1>
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">"Blog"</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden bg-gray-100 border-b border-gray-100">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-[16px] font-bold text-gray-800 mb-1">{post.title}</h2>
                <p className="text-xs text-gray-400 italic mb-2">{post.category}</p>
                <p className="text-sm text-gray-500 mb-5 flex-grow">{post.description}</p>
                <div>
                  <button className="px-4 py-1.5 bg-green-50 text-green-600 text-sm font-medium rounded hover:bg-green-100 transition-colors">
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policies Footer Section */}
      <div className="bg-white border-t border-gray-100 mt-12 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <div className="flex flex-col items-center text-center group cursor-pointer px-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                <FileText className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium text-green-600 text-sm">Terms & conditions</h3>
            </div>
            
            <div className="flex flex-col items-center text-center group cursor-pointer px-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                <RotateCcw className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium text-green-600 text-sm">Return Policy</h3>
            </div>
            
            <div className="flex flex-col items-center text-center group cursor-pointer px-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                <HeadphonesIcon className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium text-green-600 text-sm">Support Policy</h3>
            </div>
            
            <div className="flex flex-col items-center text-center group cursor-pointer px-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-100 transition-colors">
                <ShieldCheck className="text-green-600" size={24} />
              </div>
              <h3 className="font-medium text-green-600 text-sm">Privacy Policy</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
