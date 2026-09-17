const fs = require('fs');

let content = fs.readFileSync('src/pages/Checkout.tsx', 'utf8');

// Update delivery fee logic
content = content.replace(
  "const [district, setDistrict] = useState('Comilla');",
  "const [shippingArea, setShippingArea] = useState('inside_dhaka');"
);
content = content.replace(
  "const [thana, setThana] = useState('Debidwar');",
  ""
);
content = content.replace(
  "const deliveryFee = 120.00; // Hardcoded for this mockup",
  "const deliveryFee = shippingArea === 'inside_dhaka' ? 80.00 : 150.00;"
);

// Update firestore document write
content = content.replace(
  /district,[\s\n]*thana,/,
  "shippingArea,"
);
content = content.replace(
  "deliveryStatus: 'Pending',",
  "status: 'Pending',\n        deliveryStatus: 'Pending'," // Adding 'status' as 'Pending' as requested by the prompt for the table
);

// Redirect to /reseller/orders directly instead of rendering orderPlaced UI if requested, but prompt says "redirect reseller to /reseller/orders with success toast alert". 
// Currently it sets `setOrderPlaced(true)`. Let's use navigate.
content = content.replace(
  "setOrderId(orderRef.id);\n      setOrderPlaced(true);\n      clearCart();",
  "clearCart();\n      alert('Order placed successfully!');\n      navigate('/reseller/orders');"
);

// Drop the `if (orderPlaced)` block entirely
content = content.replace(
  /if \(orderPlaced\) \{[\s\S]*?return \([\s\S]*?\}[\s\n]*return \(/,
  "return ("
);

// Update Shipping Information form
content = content.replace(
  /<div>[\s\n]*<label className="block text-xs text-gray-500 mb-1">District<\/label>[\s\n]*<select[\s\S]*?<\/select>[\s\n]*<\/div>[\s\n]*<div>[\s\n]*<label className="block text-xs text-gray-500 mb-1">Thana\/Upazila<\/label>[\s\n]*<select[\s\S]*?<\/select>[\s\n]*<\/div>/,
  `<div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Shipping Area</label>
                <select 
                  value={shippingArea}
                  onChange={(e) => setShippingArea(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 outline-none focus:border-green-500 bg-white"
                >
                  <option value="inside_dhaka">Inside Dhaka (80 ৳)</option>
                  <option value="outside_dhaka">Outside Dhaka (150 ৳)</option>
                </select>
              </div>`
);

fs.writeFileSync('src/pages/Checkout.tsx', content);
console.log('Checkout updated');
