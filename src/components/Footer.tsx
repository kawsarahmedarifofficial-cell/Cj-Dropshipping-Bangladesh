import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1c29] text-gray-400 text-sm mt-auto">
      <div className="container mx-auto px-4 py-12 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: About */}
          <div className="space-y-6">
            <div className="flex items-center text-3xl font-bold tracking-tight bg-white p-2 w-fit rounded">
              <span className="text-green-600">M</span>
              <span className="text-[#0b1c2c] ml-1">MERRONO</span>
            </div>
            
            <p className="text-xs leading-relaxed text-gray-400">
              merrono.com বাংলাদেশের অন্যতম বিশ্বস্ত ও আধুনিক ড্রপশিপিং প্ল্যাটফর্ম, যা আপনাকে স্টক, প্যাকেজিং বা ডেলিভারির ঝামেলা ছাড়াই বিনামূল্যে অনলাইন ব্যবসা পরিচালনার সুযোগ দিচ্ছে।
            </p>
            <p className="text-xs leading-relaxed text-gray-400">
              এখানে আপনি বিনিয়োগ ছাড়াই পাইকারি মূল্যে হাজারো পণ্য নিয়ে নিজের ব্র্যান্ডের নামে ব্যবসা শুরু করতে পারেন। পণ্য সাপ্লাই, অর্ডার প্রসেসিং ও ডেলিভারির দায়িত্ব আমাদের।
            </p>
            <p className="text-xs leading-relaxed text-gray-400">
              আমাদের লক্ষ্য হলো - ব্যবসাকে সহজ করা, উদ্যোক্তাদের ক্ষমতায়ন, এবং একটি আধুনিক ও টেকসই ই-কমার্স ইকোসিস্টেম তৈরি করা।
            </p>
            
            <div className="flex w-full">
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-transparent border border-gray-600 px-3 py-2 rounded-l text-white outline-none w-full text-xs focus:border-green-500"
              />
              <button className="bg-[#5c6ac4] text-white px-4 py-2 rounded-r hover:bg-[#4b58a7] transition-colors text-xs font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
            
            <div className="flex gap-2">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-8 cursor-pointer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-8 cursor-pointer" />
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider flex items-center gap-2 border-b border-gray-700 pb-2">
              <Phone size={16} /> CONTACT INFO
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-300 font-medium mb-1">Address:</div>
                  <div className="text-xs leading-relaxed">KP Ghosh Street, Kosaituli,<br/>Bangshal, Dhaka</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-300 font-medium mb-1">Phone</div>
                  <div className="text-xs">01613522986</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-300 font-medium mb-1">Email</div>
                  <div className="text-xs">merrono@gmail.com</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Join Our Community */}
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider flex items-center gap-2 border-b border-gray-700 pb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> JOIN OUR COMMUNITY
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Join facebook page</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Join Whatsapp Group</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> join facebook Group</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> join Telegram channel</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Dropshipping Video 1</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Dropshipping Video 2</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Dropshipping Video 3</Link></li>
            </ul>
          </div>

          {/* Column 4: My Account */}
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-wider flex items-center gap-2 border-b border-gray-700 pb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> MY ACCOUNT
            </h4>
            <ul className="space-y-3">
              <li><Link to="/login" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Login</Link></li>
              <li><Link to="/reseller/orders" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Order History</Link></li>
              <li><Link to="/reseller/wishlist" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> My Wishlist</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Track Order</Link></li>
              <li><Link to="/" className="hover:text-green-400 transition-colors flex items-center gap-2 text-xs"><ChevronRight size={14} className="text-gray-600" /> Be an affiliate partner</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-[#161824] py-4">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500">
            © Copyright {new Date().getFullYear()} merrono, All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors">
              <Facebook size={16} className="text-gray-400 hover:text-white transition-colors" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#FF0000] transition-colors">
              <Youtube size={16} className="text-gray-400 hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
