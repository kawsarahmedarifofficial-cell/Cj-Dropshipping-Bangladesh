import { Link } from 'react-router-dom';
import { FileText, RotateCcw, HeadphonesIcon, ShieldCheck } from 'lucide-react';

type SubCategory = {
  name: string;
  items?: string[];
};

type Category = {
  name: string;
  subcategories: SubCategory[];
};

export default function Categories() {
  const categories: Category[] = [
    {
      name: "Women Clothing & Fashion",
      subcategories: [
        { name: "Three pics" },
        { name: "Saree" },
        { name: "Womens Bag" },
        { name: "Two pics" },
        { name: "4 Pices" },
        { name: "Party Dress" },
        { name: "Borka" },
        { name: "One pis" },
      ]
    },
    {
      name: "Gadgets",
      subcategories: [
        { name: "Tripod &Ring Light" },
        { name: "Power Bank" },
        { name: "Speaker", items: ["Car Speaker"] },
        { name: "keyboard" },
        { name: "Humidifier" },
        { name: "Headphone" },
        { name: "Multiple Accessories" },
        { name: "Wireless Microphone &Boya" },
        { name: "Wireless Charger" },
        { name: "Mobile Accessories" },
        { name: "Mobile Charger" },
        { name: "Printer", items: ["Thermal Paper"] },
        { name: "Lighter" },
        { name: "Trimmer & Razor" },
        { name: "Earbuds", items: ["Neckband"] },
        { name: "Cable" },
        { name: "WIFI Router" },
        { name: "Camera" },
        { name: "Drone" },
      ]
    },
    {
      name: "Watch",
      subcategories: [
        { name: "Smart Watch" },
        { name: "Clock" },
        { name: "Luxury Watch" },
        { name: "Ladies watch" },
      ]
    },
    {
      name: "Gents Fashion",
      subcategories: [
        { name: "Panjabi" },
      ]
    },
    {
      name: "All Gift item",
      subcategories: [
        { name: "Gift item" },
      ]
    },
    {
      name: "Organic Product",
      subcategories: [
        { name: "supplement food" },
      ]
    },
    {
      name: "Electronics item",
      subcategories: [
        { name: "Charger Fan" },
        { name: "All Light & 3D Light" },
        { name: "Electronics devices" },
        { name: "Blender" },
        { name: "RGB Light" },
      ]
    },
    {
      name: "Home & Lifestyle",
      subcategories: [
        { name: "MACRAME" },
        { name: "Beauty" },
        { name: "Health" },
        { name: "Kitchen & Dining" },
      ]
    },
    {
      name: "Kids Zone",
      subcategories: [
        { name: "Toy" },
        { name: "Kids Accessories" },
        { name: "Chocolate" },
      ]
    },
    {
      name: "Winter Collection",
      subcategories: []
    },
    {
      name: "Global Produtc",
      subcategories: []
    }
  ];

  return (
    <div className="flex-grow flex flex-col bg-[#f8f9fa]">
      <div className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">All Categories</h1>
          <div className="text-sm text-gray-500">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">"All Categories"</span>
          </div>
        </div>

        <div className="space-y-6">
          {categories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-800">{category.name}</h2>
              </div>
              
              {category.subcategories.length > 0 && (
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                    {category.subcategories.map((sub, subIdx) => (
                      <div key={subIdx} className="text-sm">
                        <Link to={`/reseller/search?q=${encodeURIComponent(sub.name)}`} className="text-gray-700 hover:text-green-600 transition-colors block mb-1">
                          {sub.name}
                        </Link>
                        {sub.items && sub.items.length > 0 && (
                          <div className="pl-4 space-y-1 mt-1 border-l-2 border-gray-100 ml-2">
                            {sub.items.map((item, itemIdx) => (
                              <Link key={itemIdx} to={`/reseller/search?q=${encodeURIComponent(item)}`} className="text-gray-500 hover:text-green-600 transition-colors text-xs block">
                                {item}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
