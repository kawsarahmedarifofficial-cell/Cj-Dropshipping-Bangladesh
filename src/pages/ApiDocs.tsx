import { useState } from 'react';

export default function ApiDocs() {
  const [apiKey, setApiKey] = useState('0k8B7fL9rhTH01ihielDkRniL9eXEfiC');
  const [secretKey, setSecretKey] = useState('zgxbFLY4nduPZ1CBEBBlh1WQUaLg8KxCB6HeuKSmxRKMj3If3CZV0kolknlyVm0L');
  const baseUrl = 'https://merrono.com/api/v1';

  const generateNewKeys = () => {
    const generateString = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };
    
    setApiKey(generateString(32));
    setSecretKey(generateString(64));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: add a simple notification or just copy silently. 
    // We'll keep it simple for now as it's a demo.
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-4 mb-6">
          <h2 className="text-sm font-medium text-gray-700">API Documentation</h2>
          <button 
            onClick={generateNewKeys}
            className="mt-2 sm:mt-0 bg-[#38bdf8] hover:bg-blue-500 text-white text-[10px] font-bold px-4 py-2 rounded transition-colors"
          >
            Generate New API Keys
          </button>
        </div>

        {/* API Credentials */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-800 mb-4">API Credentials</h3>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-xs font-bold text-gray-700 md:w-32 uppercase">API KEY</label>
              <div className="flex-1 flex gap-2">
                <input 
                  type="text" 
                  value={apiKey}
                  readOnly
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded outline-none bg-gray-50 text-gray-600"
                />
                <button 
                  onClick={() => handleCopy(apiKey)}
                  className="px-4 py-2 text-xs font-bold text-[#28a745] border border-[#28a745] rounded hover:bg-green-50 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label className="text-xs font-bold text-gray-700 md:w-32 uppercase">SECRET KEY</label>
              <div className="flex-1 flex gap-2">
                <input 
                  type="text" 
                  value={secretKey}
                  readOnly
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded outline-none bg-gray-50 text-gray-600"
                />
                <button 
                  onClick={() => handleCopy(secretKey)}
                  className="px-4 py-2 text-xs font-bold text-[#28a745] border border-[#28a745] rounded hover:bg-green-50 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Base URL */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Base URL</h3>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label className="text-xs font-bold text-gray-700 md:w-32">Base URL</label>
            <div className="flex-1 flex gap-2">
              <input 
                type="text" 
                value={baseUrl}
                readOnly
                className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded outline-none bg-gray-50 text-gray-600"
              />
              <button 
                onClick={() => handleCopy(baseUrl)}
                className="px-4 py-2 text-xs font-bold text-[#28a745] border border-[#28a745] rounded hover:bg-green-50 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* API Methods */}
        <div>
          <h3 className="text-sm font-bold text-gray-800 mb-4">API Methods</h3>
          
          <div className="border border-gray-100 rounded overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-800 bg-white">
                  <th className="px-4 py-3 whitespace-nowrap">Method</th>
                  <th className="px-4 py-3 whitespace-nowrap border-l border-gray-100">Endpoint</th>
                  <th className="px-4 py-3 whitespace-nowrap border-l border-gray-100">Description</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-600">
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="bg-[#28a745] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">GET</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">/products</td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">Get all products</td>
                </tr>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="bg-[#38bdf8] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">POS</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">/order/create</td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">Create new order</td>
                </tr>
                <tr className="border-b border-gray-100 bg-white">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="bg-[#28a745] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">GET</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">/order/{'{'}id{'}'}</td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">Get order details</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">DEL</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">/order/{'{'}id{'}'}</td>
                  <td className="px-4 py-3 whitespace-nowrap border-l border-gray-100">Delete an order</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
