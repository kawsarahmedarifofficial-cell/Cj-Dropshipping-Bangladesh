/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Earnings from './pages/Earnings';
import Profile from './pages/Profile';
import Support from './pages/Support';
import Terms from './pages/Terms';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import SearchResults from './pages/SearchResults';
import Blog from './pages/Blog';
import Wallet from './pages/Wallet';
import Invest from './pages/Invest';
import WithdrawHistory from './pages/WithdrawHistory';
import Downloads from './pages/Downloads';
import PaymentSummary from './pages/PaymentSummary';
import ApiDocs from './pages/ApiDocs';

import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminResellers from './pages/admin/AdminResellers';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminPayments from './pages/admin/AdminPayments';
import AdminShipping from './pages/admin/AdminShipping';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminReviews from './pages/admin/AdminReviews';
import AdminReports from './pages/admin/AdminReports';
import AdminSupport from './pages/admin/AdminSupport';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminUsers from './pages/admin/AdminUsers';

import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
        <Routes>
          {/* Admin Routes (No Header/Footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/resellers" element={<AdminResellers />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/shipping" element={<AdminShipping />} />
            <Route path="/admin/coupons" element={<AdminCoupons />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/support" element={<AdminSupport />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>

          {/* Main App Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-grow flex flex-col">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/reseller/terms" element={<Terms />} />
                  <Route path="/reseller/cart" element={<Cart />} />
                  <Route path="/reseller/checkout" element={<Checkout />} />
                  <Route path="/reseller/wishlist" element={<Wishlist />} />
                  <Route path="/reseller/compare" element={<Compare />} />
                  <Route path="/reseller/categories" element={<Categories />} />
                  <Route path="/reseller/search" element={<SearchResults />} />
                  <Route path="/reseller/blog" element={<Blog />} />
                  <Route path="/reseller/product/:id" element={<ProductDetails />} />
                  
                  {/* Dashboard Routes */}
                  <Route element={<DashboardLayout />}>
                    <Route path="/reseller/dashboard" element={<Dashboard />} />
                    <Route path="/reseller/wallet" element={<Wallet />} />
                    <Route path="/reseller/invest" element={<Invest />} />
                    <Route path="/reseller/orders" element={<Orders />} />
                    <Route path="/reseller/withdrawals" element={<WithdrawHistory />} />
                    <Route path="/reseller/downloads" element={<Downloads />} />
                    <Route path="/reseller/payment-summary" element={<PaymentSummary />} />
                    <Route path="/reseller/products" element={<Products />} />
                    <Route path="/reseller/earnings" element={<Earnings />} />
                    <Route path="/reseller/profile" element={<Profile />} />
                    <Route path="/reseller/support" element={<Support />} />
                    <Route path="/reseller/api-docs" element={<ApiDocs />} />
                  </Route>
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
    </WishlistProvider>
    </CartProvider>
  );
}
