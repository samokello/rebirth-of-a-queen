import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import WelcomeBack from './components/WelcomeBack';
import CookieConsent from './components/CookieConsent';
import UserActivityTracker from './components/UserActivityTracker';

// Direct imports for better loading performance
import Home from './pages/Home';
import About from './pages/About';
import { ProgramsList as Programs } from './pages/Programs';
import OurPrograms from './pages/OurPrograms';
import Impact from './pages/Impact';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Mission from './pages/Mission';
import Education from './pages/Education';
import Fashion from './pages/Fashion';
import Fitness from './pages/Fitness';
import Leather from './pages/Leather';
import Photography from './pages/Photography';
import WhoWeAre from './pages/WhoWeAre';
import Team from './pages/Team';
import History from './pages/History';
import Partners from './pages/Partners';
import Volunteer from './pages/Volunteer';
import Donate from './pages/Donate';
import Partner from './pages/Partner';
import Careers from './pages/Careers';
import Shop from './pages/Shop';
import ShopNaivas from './pages/ShopNaivas';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Favorites from './pages/Favorites';
import ShoppingCart from './components/ShoppingCart';
import { useCart } from './context/CartContext';
import CartPage from './pages/Cart';

// CFK Africa style pages
import WhereWeWork from './pages/WhereWeWork';
import ClinicalCommunityHealth from './pages/ClinicalCommunityHealth';
import YouthLeadershipEducation from './pages/YouthLeadershipEducation';
import GirlsEmpowerment from './pages/GirlsEmpowerment';
import SportsDevelopment from './pages/SportsDevelopment';
import EquitableResearch from './pages/EquitableResearch';
import WaysToGive from './pages/WaysToGive';
import WorkWithUs from './pages/WorkWithUs';
import HerDreamsBook from './pages/HerDreamsBook';
import PublicationsResources from './pages/PublicationsResources';
import FinancialsReports from './pages/FinancialsReports';
import OurTeam from './pages/OurTeam';
import HowWeWork from './pages/HowWeWork';
import OurPartners from './pages/OurPartners';
import StoriesProgress from './pages/StoriesProgress';
import Newsroom from './pages/Newsroom';

// New pages for footer links
import MissionVision from './pages/MissionVision';
import Empowerment from './pages/Empowerment';
import Shelter from './pages/Shelter';
import Advocacy from './pages/Advocacy';
import Sponsor from './pages/Sponsor';
import Events from './pages/Events';
import Newsletter from './pages/Newsletter';
import News from './pages/News';
import Blog from './pages/Blog';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Support from './pages/Support';

// Admin pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminUsers from './pages/AdminUsers';
import AdminDonations from './pages/AdminDonations';
import AdminPrograms from './pages/AdminPrograms';
import AdminApplications from './pages/AdminApplications';
import AdminReports from './pages/AdminReports';
import AdminContent from './pages/AdminContent';
import AdminInventory from './pages/AdminInventory';
import AdminSettings from './pages/AdminSettings';
import AdminProfile from './pages/AdminProfile';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminShopSettings from './pages/AdminShopSettings';
import AdminSubscribers from './pages/AdminSubscribers';
import AdminBulkSMS from './pages/AdminBulkSMS';
import AdminLayout from './components/AdminLayout';

function AppContent() {
  const { items: cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart } = useCart();
  return (
    <>
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
      
      {/* User Activity Tracker - tracks all user interactions */}
      <UserActivityTracker />
      
      {/* Welcome Back Modal - shows personalized welcome message */}
      <WelcomeBack />
      
      {/* Cookie Consent Banner - manages cookie preferences */}
      <CookieConsent />
      
      {/* Cookie Status Indicator removed per request */}
      
      <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/programs" element={<Layout><Programs /></Layout>} />
            <Route path="/our-programs" element={<Layout><OurPrograms /></Layout>} />
            <Route path="/impact" element={<Layout><Impact /></Layout>} />
            <Route path="/get-involved" element={<Layout><GetInvolved /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/mission" element={<Layout><Mission /></Layout>} />
            <Route path="/education" element={<Layout><Education /></Layout>} />
            <Route path="/fashion" element={<Layout><Fashion /></Layout>} />
            <Route path="/fitness" element={<Layout><Fitness /></Layout>} />
            <Route path="/leather" element={<Layout><Leather /></Layout>} />
            <Route path="/photography" element={<Layout><Photography /></Layout>} />
            <Route path="/who-we-are" element={<Layout><WhoWeAre /></Layout>} />
            <Route path="/team" element={<Layout><Team /></Layout>} />
            <Route path="/history" element={<Layout><History /></Layout>} />
            <Route path="/partners" element={<Layout><Partners /></Layout>} />
            <Route path="/volunteer" element={<Layout><Volunteer /></Layout>} />
            <Route path="/donate" element={<Layout><Donate /></Layout>} />
            <Route path="/partner" element={<Layout><Partner /></Layout>} />
            <Route path="/careers" element={<Layout><Careers /></Layout>} />
            <Route path="/signup" element={<Layout><Signup /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="/shop" element={<Layout><ShopNaivas /></Layout>} />
            <Route path="/product/:productId" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="/order-success" element={<Layout><OrderSuccess /></Layout>} />
            <Route path="/orders" element={<Layout><OrderHistory /></Layout>} />
            <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
            <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />

            
            {/* CFK Africa Style Routes - Our Impact */}
            <Route path="/where-we-work" element={<Layout><WhereWeWork /></Layout>} />
            <Route path="/clinical-community-health" element={<Layout><ClinicalCommunityHealth /></Layout>} />
            <Route path="/youth-leadership-education" element={<Layout><YouthLeadershipEducation /></Layout>} />
            <Route path="/girls-empowerment" element={<Layout><GirlsEmpowerment /></Layout>} />
            <Route path="/sports-development" element={<Layout><SportsDevelopment /></Layout>} />
            <Route path="/equitable-research" element={<Layout><EquitableResearch /></Layout>} />
            
            {/* CFK Africa Style Routes - Take Action */}
            <Route path="/ways-to-give" element={<Layout><WaysToGive /></Layout>} />
            <Route path="/work-with-us" element={<Layout><WorkWithUs /></Layout>} />
            <Route path="/her-dreams-book" element={<Layout><HerDreamsBook /></Layout>} />
            
            {/* CFK Africa Style Routes - Resources */}
            <Route path="/publications-resources" element={<Layout><PublicationsResources /></Layout>} />
            <Route path="/financials-reports" element={<Layout><FinancialsReports /></Layout>} />
            
            {/* CFK Africa Style Routes - About Us */}
            <Route path="/our-team" element={<Layout><OurTeam /></Layout>} />
            <Route path="/how-we-work" element={<Layout><HowWeWork /></Layout>} />
            <Route path="/our-partners" element={<Layout><OurPartners /></Layout>} />
            
            {/* CFK Africa Style Routes - Other */}
            <Route path="/stories-progress" element={<Layout><StoriesProgress /></Layout>} />
            <Route path="/newsroom" element={<Layout><Newsroom /></Layout>} />
            
            {/* New Footer Link Routes */}
            <Route path="/mission-vision" element={<Layout><MissionVision /></Layout>} />
            <Route path="/empowerment" element={<Layout><Empowerment /></Layout>} />
            <Route path="/shelter" element={<Layout><Shelter /></Layout>} />
            <Route path="/advocacy" element={<Layout><Advocacy /></Layout>} />
            <Route path="/sponsor" element={<Layout><Sponsor /></Layout>} />
            <Route path="/events" element={<Layout><Events /></Layout>} />
            <Route path="/newsletter" element={<Layout><Newsletter /></Layout>} />
            <Route path="/news" element={<Layout><News /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/resources" element={<Layout><Resources /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/support" element={<Layout><Support /></Layout>} />
            
            {/* Admin Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/analytics" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminAnalytics />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/programs" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminPrograms />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/users" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/donations" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminDonations />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/applications" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminApplications />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/reports" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminReports />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/financials" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminReports />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/content" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminContent />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/inventory" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminInventory />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminSettings />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/profile" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminProfile />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/announcements" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminAnnouncements />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/products" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminOrders />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/shop-settings" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminShopSettings />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/subscribers" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminSubscribers />
                </AdminLayout>
              </AdminPrivateRoute>
            } />
            <Route path="/admin/bulk-sms" element={
              <AdminPrivateRoute>
                <AdminLayout>
                  <AdminBulkSMS />
                </AdminLayout>
              </AdminPrivateRoute>
            } />

            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AdminAuthProvider>
        <AuthProvider>
          <UserProvider>
            <CartProvider>
              <FavoritesProvider>
                <WishlistProvider>
                  <AppContent />
                </WishlistProvider>
              </FavoritesProvider>
            </CartProvider>
          </UserProvider>
        </AuthProvider>
      </AdminAuthProvider>
    </NotificationProvider>
  );
} 