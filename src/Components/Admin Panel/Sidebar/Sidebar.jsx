import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { GoPackage } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { MdOutlineReviews } from "react-icons/md";
import logo from "../../../Images/logo2.png";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <Fragment>
      <div className="sidebar">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <Link to="/admin/dashboard">
          <p>
            <AiOutlineDashboard /> Dashboard
          </p>
        </Link>
        <Link to="/admin/all-products">
          <p>
            <GoPackage /> Products
          </p>
        </Link>
        <Link to="/admin/add-products">
          <p>
            <GoPackage /> Add Products
          </p>
        </Link>
        <Link to="/admin/orders">
          <p>
            <GoPackage /> Orders
          </p>
        </Link>
        <Link to="/admin/manage-users">
          <p>
            <FiUsers /> Users
          </p>
        </Link>
        <Link to="/admin/manage-reviews">
          <p>
            <MdOutlineReviews /> Reviews
          </p>
        </Link>
      </div>
    </Fragment>
  );
};

export default Sidebar;
