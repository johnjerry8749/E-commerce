import { Route, Routes } from "react-router-dom";

// =========================
// PUBLIC PAGES
// =========================
import AllHomecomponents from "./components/pages/AllHomecomponents.jsx";
import ProductDetails from "./components/pages/ProductDetails.jsx";
import Collections from "./components/pages/Collections.jsx";
import Contact from "./components/pages/Contact.jsx";
import About from "./components/pages/About.jsx";
import Cart from "./components/pages/Cart.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";



// =========================
// USER AUTHENITCATED PAGES
// =========================
import Checkout from "./components/pages/Checkout.jsx";

// =========================
// ADMIN PAGES
// =========================
import AuthisAdmin from "./components/admin/pages/Users/AdminLogin.jsx";
import AuthDashboard from "./components/admin/pages/Dashboard.jsx";
import AddProduct from "./components/admin/pages/Product/AddProduct.jsx";
import ProductList from "./components/admin/pages/Product/ProductList.jsx";
import Orders from "./components/admin/pages/Orders/OrderList.jsx";
import UserList from "./components/admin/pages/Users/UserList.jsx";
import Adminsettings from "./components/admin/pages/Adminsettings.jsx";

// =========================
// PROTECTED ROUTES
// =========================
import ProtectedAdminRoute from "./components/hook/AdminProtectedRoute.jsx";
import ProtectedUserRoute from "./components/hook/UserProtectedRoute.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        {/* =========================
            PUBLIC ROUTES
        ========================= */}

        <Route path="/" element={<AllHomecomponents />} />

        <Route path="/productdetails/:id" element={<ProductDetails />} />

        <Route path="/Collections" element={<Collections />} />

        <Route path="/Contact" element={<Contact />} />

        <Route path="/About" element={<About />} />

        <Route path="/Cart" element={<Cart />} />

        <Route path="/Login" element={<Login />} />

        <Route path="/Register" element={<Register />} />

        {/* Admin login is public */}
        <Route path="/AuthisAdmin" element={<AuthisAdmin />} />

        {/* =========================
            PROTECTED USER ROUTES
        ========================= */}

        <Route
          path="/checkout"
          element={
            <ProtectedUserRoute>
              <Checkout />
            </ProtectedUserRoute>
          }
        />

        {/* =========================
            PROTECTED ADMIN ROUTES
        ========================= */}

        <Route
          path="/AuthDashboard"
          element={
            <ProtectedAdminRoute>
              <AuthDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/AuthDashboard/AddProducts"
          element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/AuthDashboard/ProductLists"
          element={
            <ProtectedAdminRoute>
              <ProductList />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/AuthDashboard/Orders"
          element={
            <ProtectedAdminRoute>
              <Orders />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/AuthDashboard/UserLists"
          element={
            <ProtectedAdminRoute>
              <UserList />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/AuthDashboard/AdminSettings"
          element={
            <ProtectedAdminRoute>
              <Adminsettings />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
