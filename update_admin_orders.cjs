const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminOrders.tsx', 'utf8');

// Ensure runTransaction is imported
if (!content.includes('runTransaction')) {
  content = content.replace(
    "import { collection, getDocs, doc, updateDoc, query, orderBy, increment } from 'firebase/firestore';",
    "import { collection, getDocs, doc, updateDoc, query, orderBy, increment, runTransaction } from 'firebase/firestore';"
  );
}

// Replace handleUpdateStatus
const newHandleUpdateStatus = `const handleUpdateStatus = async (orderId: string, currentStatus: string, newStatus: OrderStatus, resellerId: string, profit: number) => {
    if (currentStatus === newStatus) return;
    if (newStatus === 'Delivered' && !window.confirm('Marking as delivered will automatically add the profit to the reseller. Proceed?')) return;
    
    setUpdating(orderId);
    try {
      const orderRef = doc(db, 'orders', orderId);
      
      // Check if it's newly delivered and hasn't paid out profit yet
      if (newStatus === 'Delivered') {
        const orderDoc = orders.find(o => o.id === orderId);
        if (orderDoc && !orderDoc.profitPaid) {
          const resellerRef = doc(db, 'users', resellerId);
          
          await runTransaction(db, async (transaction) => {
            const userDoc = await transaction.get(resellerRef);
            if (!userDoc.exists()) {
              throw new Error("Reseller does not exist!");
            }
            
            // Increment walletBalance
            const currentBalance = userDoc.data().walletBalance || 0;
            const currentEarnings = userDoc.data().totalEarnings || 0;
            
            transaction.update(resellerRef, {
              walletBalance: currentBalance + (profit || 0),
              totalEarnings: currentEarnings + (profit || 0)
            });
            
            transaction.update(orderRef, {
              deliveryStatus: newStatus,
              profitPaid: true,
              courierPaymentStatus: 'Paid'
            });
          });
          
          // Update local state
          setOrders(orders.map(o => o.id === orderId ? { ...o, deliveryStatus: newStatus, profitPaid: true, courierPaymentStatus: 'Paid' } : o));
          setUpdating(null);
          return;
        }
      }
      
      const updates: any = { deliveryStatus: newStatus };
      await updateDoc(orderRef, updates);
      
      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, ...updates } : o));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdating(null);
    }
  };`;

content = content.replace(/const handleUpdateStatus = async \([\s\S]*?finally \{\s*setUpdating\(null\);\s*\}\s*\};/, newHandleUpdateStatus);

fs.writeFileSync('src/pages/admin/AdminOrders.tsx', content);
console.log('AdminOrders updated');
