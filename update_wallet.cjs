const fs = require('fs');

let content = fs.readFileSync('src/pages/Wallet.tsx', 'utf8');

// Remove deduction
content = content.replace(
  /\/\/ Deduct balance[\s\S]*?walletBalance: increment\(-amount\)[\s\S]*?\}\);/,
  "// No longer deducting balance here, Admin will deduct upon approval"
);

fs.writeFileSync('src/pages/Wallet.tsx', content);
console.log('Wallet updated');
