const fs = require('fs');

let content = fs.readFileSync('src/components/DashboardLayout.tsx', 'utf8');

const routesToUpdate = [
  'dashboard', 'wallet', 'invest', 'orders', 'withdrawals', 'downloads',
  'payment-summary', 'products', 'earnings', 'profile', 'support', 'api-docs',
  'wishlist'
];

for (const route of routesToUpdate) {
  const regex = new RegExp(`path: '\\/(${route})'`, 'g');
  content = content.replace(regex, (match, p1) => {
    return `path: '/reseller/${p1}'`;
  });
}

fs.writeFileSync('src/components/DashboardLayout.tsx', content);
console.log('DashboardLayout updated');
