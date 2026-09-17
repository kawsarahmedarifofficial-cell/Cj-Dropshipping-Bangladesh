const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/AdminPayments.tsx', 'utf8');

const newHandleApprove = `const handleApprove = async (id: string, resellerId: string, amount: number) => {
    if (!window.confirm('Mark this withdrawal as Completed and deduct from Reseller wallet?')) return;
    try {
      // Run transaction to safely deduct balance
      await runTransaction(db, async (transaction) => {
        const userRef = doc(db, 'users', resellerId);
        const userDoc = await transaction.get(userRef);
        
        if (!userDoc.exists()) {
          throw new Error("Reseller does not exist!");
        }
        
        const currentBalance = userDoc.data().walletBalance || 0;
        
        transaction.update(userRef, {
          walletBalance: currentBalance - amount
        });
        
        const withdrawalRef = doc(db, 'withdrawals', id);
        transaction.update(withdrawalRef, { status: 'Completed' });
      });
      
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'Completed' } : w));
    } catch (e) {
      console.error(e);
      alert("Failed to approve. Make sure reseller exists and has enough balance.");
    }
  };`;

content = content.replace(/const handleApprove = async \([\s\S]*?\} catch \(e\) \{\s*alert\("Failed to approve\."\);\s*\}\s*\};/, newHandleApprove);

// Update calls to handleApprove to include resellerId and amount
content = content.replace(
  /onClick=\{\(\) => handleApprove\(item\.id\)\}/g,
  "onClick={() => handleApprove(item.id, item.resellerId, item.amount)}"
);

// Update handleReject to not refund
const newHandleReject = `const handleReject = async (id: string) => {
    if (!window.confirm('Reject withdrawal?')) return;
    try {
      await updateDoc(doc(db, 'withdrawals', id), { status: 'Rejected' });
      setWithdrawals(withdrawals.map(w => w.id === id ? { ...w, status: 'Rejected' } : w));
    } catch (e) {
      alert("Failed to reject.");
    }
  };`;

content = content.replace(/const handleReject = async \([\s\S]*?\} catch \(e\) \{\s*alert\("Failed to reject\."\);\s*\}\s*\};/, newHandleReject);

// Update calls to handleReject to just take id
content = content.replace(
  /onClick=\{\(\) => handleReject\(item\.id, item\.resellerId, item\.amount\)\}/g,
  "onClick={() => handleReject(item.id)}"
);

// Ensure runTransaction is imported
if (!content.includes('runTransaction')) {
  content = content.replace(
    "import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';",
    "import { collection, getDocs, doc, updateDoc, increment, runTransaction } from 'firebase/firestore';"
  );
}

fs.writeFileSync('src/pages/admin/AdminPayments.tsx', content);
console.log('AdminPayments updated');
