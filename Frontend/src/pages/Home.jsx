import React from "react";
import FeaturedVehicles from "../componets/FeaturedVehicles.jsx";
import Testimonials from "../componets/Testimonials.jsx";
import NewsLetterBox from "../componets/NewsLetterBox.jsx";
import Hero from "../componets/Hero.jsx";
import Banner from "../componets/Banner.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedVehicles />
      <Banner />
      <Testimonials />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
