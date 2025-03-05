import React from "react";

import NavBar from "../Navbar/NavBar"
import HeroSection from "../Herosection/HeroSection"
import WhoWeAre from "../Herosection/WhoWeAre";
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"
import Services from "../Herosection/Service";

const Home = () => {
  return (<>

  <NavBar/>
  <HeroSection/>
  <WhoWeAre/>
  <Services/>
  <Contact/>
  <Footer/>
  </>
    
  );
};

export default Home;
