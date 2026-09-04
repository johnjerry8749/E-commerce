import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./components/context/AuthContext.jsx";

import AllHomecomponents from "./components/pages/AllHomecomponents.jsx";
import ProductDetails from "./components/pages/ProductDetails.jsx";
import Collections from "./components/pages/Collections.jsx";
import Contact from "./components/pages/Contact.jsx";
import About from "./components/pages/About.jsx";
import Cart from "./components/pages/Cart.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";

import AuthisAdmin from "./components/admin/pages/Users/AdminLogin.jsx";
import AuthDashboard from "./components/admin/pages/Dashboard.jsx";
import AddProduct from "./components/admin/pages/Product/AddProduct.jsx";
import ProductList from "./components/admin/pages/Product/ProductList.jsx";
import EditProduct from "./components/admin/pages/Product/EditProduct.jsx";

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if(!loading){
    return <div className="text-center p-5">Loading...</div>
  }

  if (!isAuthenticated) {
    console.log("Only Admin is Authorised")
    return <Navigate to="/Login" replace />;
    
  }

  if (!isAdmin) {
    console.log("You are not Allowed to Login Here")
    return <Navigate to="/" replace />;
    
  }

  return children;
};

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AllHomecomponents />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/Collections" element={<Collections />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/AuthisAdmin" element={<AuthisAdmin />} />

        <Route
          path="/AuthDashboard"
          element={
            <ProtectedAdminRoute>
              <AuthDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/AddProducts"
          element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/ProductList"
          element={
            <ProtectedAdminRoute>
              <ProductList />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/EditProduct"
          element={
            <ProtectedAdminRoute>
              <EditProduct />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
