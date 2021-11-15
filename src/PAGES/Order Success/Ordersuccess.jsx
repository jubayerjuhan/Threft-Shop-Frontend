import React from "react";
import { Link } from "react-router-dom";
import "./orderSuccess.css";
import { BsFillCheckCircleFill } from "react-icons/bs";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <BsFillCheckCircleFill />
      <h2>Order Successfully Placed</h2>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
