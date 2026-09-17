import { LifeBuoy, MessageSquare, PhoneCall, FileQuestion, Send } from 'lucide-react';

export default function Support() {
  const faqs = [
    { q: 'How do I place an order for my customer?', a: 'Go to the Products page, find the product, click "Add to my store", set your selling price, and then proceed to checkout by entering your customer\'s delivery details.' },
    { q: 'When do I get my profit?', a: 'Your profit is credited to your Earnings balance as soon as the order is successfully marked as "Delivered" and payment is collected.' },
    { q: 'What happens if a customer returns a product?', a: 'If a product is defective or the wrong item was sent, we handle the return free of charge. Please refer to our Return & Refund Policy for detailed conditions.' },
    { q: 'Is there any hidden charge?', a: 'No, joining the platform and selling products is completely free. We only charge for the product cost and delivery fee.' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">How can we help you?</h2>
        <p className="text-gray-500">Search our knowledge base or contact our support team for assistance.</p>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <PackageIcon size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Order Issues</h3>
          <p className="text-sm text-gray-500">Tracking, delivery, modifications</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <LifeBuoy size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Returns & Refunds</h3>
          <p className="text-sm text-gray-500">Policies, processing, claims</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <DollarSignIcon size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Payments & Earnings</h3>
          <p className="text-sm text-gray-500">Withdrawals, profit calculation</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <FileQuestion size={24} />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Account Help</h3>
          <p className="text-sm text-gray-500">Profile, settings, verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MessageSquare size={24} className="text-green-600" />
            Send us a Message
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="What is this regarding?" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none h-32 resize-none" placeholder="Describe your issue in detail..."></textarea>
            </div>
            <button type="button" className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              <Send size={18} />
              Submit Ticket
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-white p-2 rounded-full shadow-sm text-green-600">
                <PhoneCall size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Call Support</p>
                <p className="font-bold text-gray-800">01613522986</p>
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-white p-2 rounded-full shadow-sm text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-bold text-gray-800">+880123456789</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileQuestion size={24} className="text-green-600" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h4 className="font-bold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-green-600 font-medium hover:text-green-700 hover:underline">
              View all FAQs &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageIcon({ size = 24 }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
}

function DollarSignIcon({ size = 24 }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
}
