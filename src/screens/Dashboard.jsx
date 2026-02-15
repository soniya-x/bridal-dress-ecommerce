import React from "react";
import HomeImage from "../components/HomeImage";
import ProductCard from "../components/productCard";
import Footer from "../components/Footer";
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const mobile = useSelector((state) => state.mobile);


  return (
    <div>
      <HomeImage />
      <ProductCard />
    </div>
  );
};

export default Dashboard;
