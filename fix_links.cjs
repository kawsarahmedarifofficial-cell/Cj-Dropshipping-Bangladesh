const fs = require('fs');
const path = require('path');

const routesToUpdate = [
  'dashboard', 'wallet', 'invest', 'orders', 'withdrawals', 'downloads',
  'payment-summary', 'products', 'earnings', 'profile', 'support', 'api-docs',
  'terms', 'cart', 'checkout', 'wishlist', 'compare', 'categories', 'search', 'blog', 'product'
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const route of routesToUpdate) {
        // match navigate("/route...")
        const toRegex = new RegExp(`navigate\\(\\[?\\"\\/(${route})(\\"|\\/|\\?)`, 'g');
        content = content.replace(toRegex, (match, p1, p2) => {
          changed = true;
          return `navigate("/reseller/${p1}${p2}`;
        });
        
        // match to="/route..."
        const toRegex2 = new RegExp(`to=\\"\\/(${route})(\\"|\\/|\\?)`, 'g');
        content = content.replace(toRegex2, (match, p1, p2) => {
          changed = true;
          return `to="/reseller/${p1}${p2}`;
        });
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir('src');
console.log('Done');
