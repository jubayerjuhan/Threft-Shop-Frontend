import React, { Fragment } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../Images/Logo.png";

const Navbar = () => {
  return (
    <Fragment>
      <ReactNavbar
        logo={logo}
        burgerColor="crimson"
        nav1justifyContent="flex-end"
        nav2justifyContent="space-around"
        nav3justifyContent="space-around"
        nav4justifyContent="space-around"
        link1Text="Home"
        link2Text="Products"
        link3Text="About Us"
        link4Text="Contact Us"
        link1Url="/"
        link2Url="/products"
        link3Url="/about-us"
        link4Url="/contact-us"
        link1Color="#fff"
        link1Family="Inter"
        cartIconUrl="/cart"
      ></ReactNavbar>
    </Fragment>
  );
};

export default Navbar;
