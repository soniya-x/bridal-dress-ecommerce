import { useState } from "react";

// CSS imports

import "./App.css";
import "./Assets/CSS/Header.css";
import "./Assets/CSS/Menu.css";
import "./Assets/CSS/HomeImage.css";
import "./Assets/CSS/productCard.css";
import "./Assets/CSS/itemDetails.css";
import "./Assets/CSS/Login.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Component imports
import Footer from "./components/Footer";
import Header from "./components/Header";

// Screen imports
import { Routes, Route } from "react-router-dom";

import SearchHeader from "./screens/SearchHeader.jsx";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import ItemDetails from "./screens/ItemDetails.jsx";
import Dashboard from "./screens/Dashboard.jsx";
import MyOrder from "./screens/MyOrder.jsx";
import CartData from "./screens/Cart.jsx";
import WishList from "./screens/WishList.jsx";
import ReviewOrder from "./screens/ReviewOrder.jsx";
import OrderDetails from "./screens/OrderDetails.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app-main">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-body">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/search" element={<SearchHeader />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/itemdetails" element={<ItemDetails />} />
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/myorder" element={<MyOrder />}></Route>
            <Route path="/cart" element={<CartData />}></Route>
            <Route path="/wishlist" element={<WishList />}></Route>
            <Route path="/revieworder" element={<ReviewOrder />}></Route>
            <Route path="/orderdetails" element={<OrderDetails />}></Route>
            revieworder
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
