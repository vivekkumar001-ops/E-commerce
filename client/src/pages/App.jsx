import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Pagenotfound from "./Pagenotfound";
import Aboutus from "./Aboutus";
import CartPage from "./CartPage";
import Policy from "./Policy";
import Contactus from "./Contactus";
import Register from "./auth/Register";
import Login from "./auth/Login";
import ForgotPassword from "./auth/ForgotPassword";
import AdminDashboard from "../pages/admin/AdminDashboard";
import PrivateRoutes from "../components/Routes/PrivateRoutes";
import AdminRoutes from "../components/Routes/AdminRoutes";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import Products from "./admin/Products";
import UpdateProduct from "./admin/UpdateProduct";
import Dashboard from "./user/Dashboard";
import Profile from "./user/Profile";
// import Orders from "./user/Orders";
import Users from "./admin/Users";
// import AdminOrders from "./admin/AdminOrders";




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/pagenotfound" element={<Pagenotfound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

      <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route path="user" element={<Dashboard />} />
        {/* <Route path="user/orders" element={<Orders />} /> */}
        <Route path="user/profile" element={<Profile />} />
      </Route>
      <Route path="/dashboard" element={<AdminRoutes />}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        {/* <Route path="admin/orders" element={<AdminOrders />} /> */}
      </Route>

      </Routes >
    </>

  );
}

export default App;
