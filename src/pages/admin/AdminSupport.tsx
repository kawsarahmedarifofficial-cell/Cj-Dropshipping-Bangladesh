import { useState } from 'react';
import { 
  Search, MessageSquare, AlertCircle, CheckCircle, Clock, 
  User, Send, Paperclip
} from 'lucide-react';

export default function AdminSupport() {
  const [filter, setFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [tickets, setTickets] = useState([
    { id: 'TKT-1021', subject: 'Missing item in order ORD-2023-1001', customer: 'Rahim Uddin', type: 'Customer', priority: 'High', status: 'Open', date: '2023-10-25', lastReply: 'Customer', messages: [{ sender: 'Customer', time: '10:00 AM', text: 'I received the package but the headphones are missing.' }] },
    { id: 'TKT-1022', subject: 'Payout not received', customer: 'Eviara Cobra Mart', type: 'Reseller', priority: 'Critical', status: 'Pending', date: '2023-10-24', lastReply: 'Admin', messages: [{ sender: 'Reseller', time: '09:00 AM', text: 'My payout from yesterday is still pending.' }, { sender: 'Admin', time: '11:00 AM', text: 'We are investigating the delay with our bank partner. Will update you shortly.' }] },
    { id: 'TKT-1023', subject: 'How to use coupon code?', customer: 'Karim Hasan', type: 'Customer', priority: 'Low', status: 'Resolved', date: '2023-10-22', lastReply: 'Admin', messages: [{ sender: 'Customer', time: '02:00 PM', text: 'Where do I enter the NEWYEAR coupon code?' }, { sender: 'Admin', time: '03:00 PM', text: 'You can enter it on the checkout page under the order summary.' }] }
  ]);

  const [replyText, setReplyText] = useState('');

  const filteredTickets = tickets.filter(t => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Medium': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Open': return 'border-red-200 text-red-700 bg-red-50';
      case 'Pending': return 'border-orange-200 text-orange-700 bg-orange-50';
      case 'Resolved': return 'border-green-200 text-green-700 bg-green-50';
      case 'Closed': return 'border-gray-300 text-gray-700 bg-gray-100';
      default: return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  const handleSendReply = () => {
    if (replyText.trim() && selectedTicket) {
      const updatedTickets = tickets.map(t => {
        if (t.id === selectedTicket.id) {
          const newMessages = [...t.messages, { sender: 'Admin', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), text: replyText }];
          const updatedTicket = { ...t, messages: newMessages, lastReply: 'Admin' };
          setSelectedTicket(updatedTicket);
          return updatedTicket;
        }
        return t;
      });
      setTickets(updatedTickets);
      setReplyText('');
    }
  };

  const updateStatus = (status: string) => {
    if (selectedTicket) {
      const updatedTickets = tickets.map(t => t.id === selectedTicket.id ? { ...t, status } : t);
      setTickets(updatedTickets);
      setSelectedTicket({ ...selectedTicket, status });
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col pb-6">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-2xl font-bold text-gray-800">Support Center</h2>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Ticket List */}
        <div className={`w-full md:w-1/3 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${selectedTicket ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-gray-100 shrink-0">
            <div className="relative mb-3">
              <input type="text" placeholder="Search tickets..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-[#28a745]" />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {['All', 'Open', 'Pending', 'Resolved', 'Closed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                    filter === f ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 p-2">
            {filteredTickets.map(ticket => (
              <div 
                key={ticket.id} 
                onClick={() => setSelectedTicket(ticket)}
                className={`p-3 rounded-lg mb-2 cursor-pointer border transition-colors ${selectedTicket?.id === ticket.id ? 'border-[#28a745] bg-green-50/30' : 'border-transparent hover:bg-gray-50'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-gray-500">{ticket.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span>
                </div>
                <h4 className="font-bold text-gray-800 text-sm line-clamp-1 mb-1">{ticket.subject}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">{ticket.customer}</span>
                  <span className={`px-2 py-0.5 rounded border font-medium ${getStatusColor(ticket.status)}`}>{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Chat / Detail */}
        {selectedTicket ? (
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center shrink-0 bg-gray-50">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button className="md:hidden text-gray-500" onClick={() => setSelectedTicket(null)}>
                    &larr; Back
                  </button>
                  <h3 className="font-bold text-gray-800">{selectedTicket.subject}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getStatusColor(selectedTicket.status)}`}>
                    {selectedTicket.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <User size={12} /> {selectedTicket.customer} ({selectedTicket.type}) &bull; {selectedTicket.date}
                </p>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedTicket.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white font-medium"
                >
                  <option value="Open">Mark Open</option>
                  <option value="Pending">Mark Pending</option>
                  <option value="Resolved">Mark Resolved</option>
                  <option value="Closed">Mark Closed</option>
                </select>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {selectedTicket.messages.map((msg: any, i: number) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end' : 'items-start'}`}>
                  <div className="text-xs text-gray-500 mb-1 px-1">{msg.sender} &bull; {msg.time}</div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'Admin' 
                      ? 'bg-[#28a745] text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Input */}
            <div className="p-4 border-t border-gray-100 bg-white shrink-0">
              <div className="flex items-end gap-2">
                <button className="p-2.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                  <Paperclip size={20} />
                </button>
                <textarea 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#28a745]"
                  rows={3}
                ></textarea>
                <button 
                  onClick={handleSendReply}
                  disabled={!replyText.trim()}
                  className="p-3 bg-[#28a745] text-white rounded-xl hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-0.5"
                >
                  <Send size={20} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-2 px-12">
                <label className="flex items-center gap-2 text-xs text-gray-500 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#28a745] focus:ring-[#28a745]" />
                  Add as internal note (hidden from customer)
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-center text-gray-400">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p className="font-medium text-gray-500">Select a ticket to view conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
