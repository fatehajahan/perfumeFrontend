import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import './App.css'
import Home from "./mainPage/Home/Home"
import Navbar from "./components/Home/Navbar/Navbar";
import Contact from "./components/Contact/Contact";
import AddCart from "./mainPage/AddCart/AddCart";
import ViewCart from "./mainPage/ViewCart/ViewCart";
import Registration from "./mainPage/Registration/Registration";
import Login from "./mainPage/Login/Login";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import CreateCategory from "./Admin/Categories/CreateCategory";
import CategoryList from "./Admin/Categories/CategoryList";
import CreateProduct from "./Admin/Products/CreateProduct";
import CategoryUpdate from "./Admin/Categories/CategoryUpdate";
import CreateSubCategory from "./Admin/SubCategory/CreateSubCategory";
import ProductLists from "./Admin/Products/ProductLists";
import ProductUpdate from "./Admin/Products/ProductUpdate";
import SubCategoryList from "./Admin/SubCategory/SubCategoryList";
import OtpVerify from "./mainPage/OtpVerify/OtpVerify";
import AuthProvider from "./provider/AuthProvider";
import PrivateRoute from "./Admin/PrivateRoute";
import BuyPerfumes from "./mainPage/BuyPerfumes/BuyPerfumes";
import Orders from "./Admin/Order/Orders";
import ProductBuy from "./mainPage/ProductBuy/ProductBuy";
import Exclusive from "./mainPage/Exclusive/Exclusive";
import Footer from "./components/Home/Footer/Footer";
import Women from "./mainPage/Women/Women";
import Men from "./mainPage/Men/Men";
import Payment from "./mainPage/Payment/Payment";
import AboutUs from "./mainPage/AboutUs/AboutUs";

const Layout = () => {
  const [cartOpen, setCartOpen] = useState(false)
  console.log("Layout is rendering, setCartOpen exists:", typeof setCartOpen);

  return (
    <>
      <Navbar setCartOpen={setCartOpen} />
      <AddCart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <Outlet />
      <Footer />
      {cartOpen && (
        <div
          className="fixed inset-0 bg-[#00000049]"
          onClick={() => {
            setCartOpen(false)
          }}
        ></div>
      )}
    </>
  );
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* Public/User Layout */}
      <Route element={<Layout />}>
        <Route path="/homePage" element={<Home />} />
        <Route path="/buyPerfumes" element={<BuyPerfumes />} />
        <Route path="/buyExclusive" element={<Exclusive />} />
        <Route path="/womenPerfumes" element={<Women />} />
        <Route path="/menPerfumes" element={<Men />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/mycart" element={<ViewCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/:id" element={<ProductBuy />} />
      </Route>

      {/* Public Routes outside layout */}
      <Route path="/" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verification" element={<OtpVerify />} />

      {/* Admin Layout */}
      <Route element={
        <PrivateRoute>
          <AdminDashboard />
        </PrivateRoute>
      }>
        <Route path="/adminPanel" element={<div className="flex items-center justify-center h-full bg-white rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 font-urbanist">
            Welcome to the Inessa Admin Dashboard
          </h1>
        </div>} />
        <Route path="/createcategory" element={<CreateCategory />} />
        <Route path="/categorylist" element={<CategoryList />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/updatecategory/:id" element={<CategoryUpdate />} />
        <Route path="/updateProduct/:id" element={<ProductUpdate />} />
        <Route path="/createsubcategory" element={<CreateSubCategory />} />
        <Route path="/subCategoryList" element={<SubCategoryList />} />
        <Route path="/productList" element={<ProductLists />} />
        <Route path="/updateProduct/:id" element={<ProductLists />} />
        <Route path="/orderList" element={<Orders />} />
      </Route>

    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
