'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white">
        <Navbar/>
      </div>
      
      <div className="pt-12"> 
        <div className="px-6 md:px-16 lg:px-32">
          <HeaderSlider />
          <HomeProducts />
          <div className="px-6 md:px-16 lg:px-32" id="home-products">
          
          </div>
          <FeaturedProduct />
          <Banner />
          {/* <NewsLetter /> */}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;