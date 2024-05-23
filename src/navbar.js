import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [navSize, setNavSize] = useState("5rem");
  const [navColor, setNavColor] = useState("transparent");

  const listenScrollEvent = () => {
    if (location.pathname.startsWith("/product")) {
      window.scrollY > 10 ? setNavColor("#2D3142") : setNavColor("#2D3142");
      window.scrollY>10? setNavSize("5rem") : setNavSize("5rem");
    } else {
      window.scrollY > 10 ? setNavColor("#2D3142") : setNavColor("transparent");
      window.scrollY > 10 ? setNavSize("5rem") : setNavSize("8rem");
    }
   
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.startsWith("/product")) {
      setNavColor("#2D3142"); // Change to the desired color for ProductView page
    } else {
      setNavColor("transparent");
    }
  }, [location.pathname]);

  return (
    <nav style={{ backgroundColor: navColor, height: navSize, transition: "all 0.5s" }}>
      <div>
        <img src="/image/logo.png" className="nav_logo" alt="Logo" />
      </div>
      <ul>
        <li><a href="/" className="nav_link">Home</a></li>
        <li><a href="/myprofile" className="nav_link">My Profile</a></li>
       
      </ul>
    </nav>
  );
};

export default Navbar;
