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
        // match to="/route" or to="/route/..." or navigate("/route") or navigate("/route/...")
        const toRegex = new RegExp(`(to|navigate)\\(\\[?\\"\\/(${route})(\\"|\\/|\\?)`, 'g');
        content = content.replace(toRegex, (match, p1, p2, p3) => {
          changed = true;
          return `${p1}("/reseller/${p2}${p3}`;
        });
        
        const toRegex2 = new RegExp(`(to|navigate)=\\"\\/(${route})(\\"|\\/|\\?)`, 'g');
        content = content.replace(toRegex2, (match, p1, p2, p3) => {
          changed = true;
          return `${p1}="/reseller/${p2}${p3}`;
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
