import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/Logo.png";
import "./footer.css";
const Footer = () => {
  return (
    <Fragment>
      <div className="footer-section">
        <div className="container">
          <div className="footer">
            <img className="logo" src={logo} alt="Logo" />
            <div className="quickLinks">
              <h6>Quick Links</h6>
              <Link to="/">Feature Products</Link>
              <Link to="/">Gadgets</Link>
              <Link to="/">Apparels</Link>
            </div>
            <div className="legal">
              <h6>Legals</h6>
              <Link to="/">Terms And Conditions</Link>
              <Link to="/">Data Policy</Link>
              <Link to="/">Cookies</Link>
            </div>
            <div className="address">
              <h6>Address</h6>
              <p>
                DN College Road, Nawabganj <br /> Dhaka - 1320, Bangladesh
              </p>
            </div>
            <div className="aboutUs">
              <h6>About Us</h6>
              <p>
                Well this is under development and I didn't Think Of It Right
                Now, So I will add it later
              </p>
            </div>
            <div className="contacts">
              <h6>Contacts</h6>
              <Link>Facebook</Link>
              <Link>Instagram</Link>
              <Link>Snapchat</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
