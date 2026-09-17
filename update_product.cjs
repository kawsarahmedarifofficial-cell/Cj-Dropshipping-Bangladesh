const fs = require('fs');

let content = fs.readFileSync('src/pages/ProductDetails.tsx', 'utf8');

// Replace standard Add to cart logic with Proceed to Checkout
content = content.replace(
  "import { useParams, Link } from 'react-router-dom';",
  "import { useParams, Link, useNavigate } from 'react-router-dom';"
);

// Add useNavigate
content = content.replace(
  "const { addToWishlist, isInWishlist } = useWishlist();",
  "const { addToWishlist, isInWishlist } = useWishlist();\n  const navigate = useNavigate();"
);

// Update handleAddToCart to handleProceedToCheckout
content = content.replace(
  /const handleAddToCart = \(\) => \{[\s\S]*?setTimeout\(\(\) => setAddedToCart\(false\), 2000\);\n  \};/,
  `const handleProceedToCheckout = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      sellingPrice: sellingPrice === '' ? product.price : Number(sellingPrice),
      quantity: quantity,
      image: product.images[0]
    });
    navigate('/reseller/checkout');
  };`
);

// Add validation and profit logic in UI
content = content.replace(
  /<div className="relative flex-grow max-w-\[280px\]">[\s\S]*?<\/div>\n            <\/div>/,
  `<div className="flex-grow max-w-[280px]">
                <div className="relative">
                  <input 
                    type="number" 
                    min={product.price}
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Sell Price"
                    className={\`w-full px-4 py-2 border-2 rounded-lg outline-none text-center font-medium transition-colors \${sellingPrice !== '' && Number(sellingPrice) < product.price ? 'border-red-400 focus:border-red-500' : 'border-indigo-50 focus:border-indigo-100'}\`} 
                  />
                </div>
                {sellingPrice !== '' && Number(sellingPrice) < product.price && (
                  <div className="text-red-500 text-xs mt-1">Selling price cannot be less than base wholesale price</div>
                )}
                {sellingPrice !== '' && Number(sellingPrice) >= product.price && (
                  <div className="text-green-600 text-xs mt-1 font-medium">Estimated Profit: {(Number(sellingPrice) - product.price) * quantity} ৳</div>
                )}
              </div>
            </div>`
);

// Update button
content = content.replace(
  /<button \n                onClick=\{handleAddToCart\}[\s\S]*?<\/button>/,
  `<button 
                onClick={handleProceedToCheckout}
                disabled={sellingPrice !== '' && Number(sellingPrice) < product.price}
                className="bg-green-50 text-[#28a745] border border-[#28a745] px-6 py-2 text-sm flex items-center justify-center gap-2 hover:bg-[#28a745] hover:text-white transition-colors min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={16} /> Proceed to Checkout
              </button>`
);

fs.writeFileSync('src/pages/ProductDetails.tsx', content);
console.log('ProductDetails updated');
