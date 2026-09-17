export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-12 flex-grow">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center border-b pb-6">Terms & Conditions</h1>
        
        <div className="prose max-w-none text-gray-600 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. General Terms</h2>
            <p>
              Welcome to our dropshipping platform. By accessing or using our services, you agree to be bound by these Terms and Conditions. 
              These terms apply to all sellers, resellers, and users of the platform. We reserve the right to update or modify these terms 
              at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Users must provide accurate and complete information during registration.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You agree not to use the platform for any illegal or unauthorized purpose.</li>
              <li>Sellers must not mislead their customers regarding product quality, price, or delivery times.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">3. Payments & Fees</h2>
            <p className="mb-4">
              Our platform operates on a margin-based model. The cost price of the product is fixed by the platform or suppliers.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You set your own selling price above the cost price.</li>
              <li>The difference between the selling price and the cost price (plus delivery fee) is your profit.</li>
              <li>Profits are credited to your virtual wallet only after successful delivery to the end customer.</li>
              <li>Withdrawal requests are processed within 2-3 business days.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">4. Delivery & Returns</h2>
            <p className="mb-4">
              We manage the fulfillment and logistics on your behalf.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Delivery timeframes are estimates and may vary based on location.</li>
              <li>In case of a defective or damaged product, the customer must report it within 3 days of delivery.</li>
              <li>Return shipping costs for defective items will be borne by the platform.</li>
              <li>If a customer refuses delivery (return to sender), the delivery fee may be deducted from the seller's account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">5. Limitations & Liability</h2>
            <p>
              The platform serves as an intermediary between suppliers, resellers, and delivery services. We shall not be held liable 
              for indirect, incidental, or consequential damages arising from the use of our services. Product warranties, if any, 
              are provided by the original manufacturer or supplier.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
