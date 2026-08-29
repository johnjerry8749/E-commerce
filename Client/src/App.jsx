import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<AllHomecomponents />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/Collections" element={<Collections />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      {/* ADMIN ROUTES LOGIN */}
      <Routes>
        <Route path="/AuthisAdmin" element={<AuthisAdmin />} />

        {/* AUTHORISED ADMIN ROUTES BEGIN */}
        <Route path="/AuthDashboard" element={<AuthDashboard />} />
        <Route path="/AddProducts" element={<AddProduct />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/EditProduct" element={<EditProduct />} />
      </Routes>
    </div>
  );
};

export default App;
