import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  clearErrors,
  getSingleOrder,
  updateOrder,
} from "./../../../REDUX/Actions/orderAction";
import Loader from "./../../Loader/Loader";
import Sidebar from "./../Sidebar/Sidebar";
import "./updateorder.css";
import { useAlert } from "react-alert";

const UpdateOrder = () => {
  const alert = useAlert();
  const { order, loading } = useSelector((state) => state.singleOrder);
  const {
    success,
    error,
    loading: updateOrderLoading,
  } = useSelector((state) => state.updateOrder);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (success) {
      alert.success(`Product Status Updated`);
      dispatch({ type: "UPDATE_ORDER_RESET" });
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getSingleOrder(id, status));
  }, [dispatch, success, id, error, alert, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateOrder(id, status));
  };
  return (
    <Fragment>
      {!order || loading || updateOrderLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div
              className="updateOrderWrapper"
              style={
                order.orderStatus === "Delivered"
                  ? { display: "block" }
                  : { display: "grid" }
              }
            >
              <div className="orderPage">
                <h1 className="orderId">Order #{order._id}</h1>
                <div className="shippingDetails">
                  <h2>Shipping Details</h2>
                  <p>
                    <span>Name : </span>
                    {user.name}
                  </p>
                  <p>
                    <span>Address : </span>
                    {order.shippingInfo.street}, {order.shippingInfo.city}, #
                    {order.shippingInfo.zipcode}, {order.shippingInfo.country}
                  </p>
                  <p>
                    <span>Name :</span>
                    {user.name}
                  </p>
                </div>

                <div className="deliveryStatus">
                  <h3>
                    Order Status:{" "}
                    <span
                      className={
                        order.orderStatus === "Delivered"
                          ? "greenFont"
                          : "crimsonFont"
                      }
                    >
                      {order.orderStatus}
                    </span>
                  </h3>
                </div>
                <div className="paymentStatus">
                  <h3>
                    Payment Status:{" "}
                    <span>
                      {order.paymentInfo.status === "succeeded"
                        ? "Paid"
                        : "Unpaid"}
                    </span>
                  </h3>
                </div>

                <h2 className="priceBreakdownTitle">Price Breakdown</h2>
                <div className="priceSection">
                  <div>
                    <p>Subtotal</p>
                    <p>{`$${order.priceBreakdown.subtotal}`}</p>
                  </div>
                  <div>
                    <p>Shipping Charges</p>
                    <p>{`$${order.priceBreakdown.shippingCharge}`}</p>
                  </div>
                  <div>
                    <p>GST/VAT</p>
                    <p>{`$${order.priceBreakdown.gst}`}</p>
                  </div>
                  <div className="totalPrice">
                    <p>Total Price</p>
                    <p>{`$${order.priceBreakdown.totalPrice}`}</p>
                  </div>
                </div>
                {console.log("status", status)}
                <div className="orderItems">
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, i) => (
                    <div className="items">
                      <span>
                        <img src={item.image[0].url} alt="" />
                        <p>{item.name}</p>
                      </span>
                      <span>x {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="updateSide">
                {order.orderStatus === "Delivered" ? (
                  ""
                ) : (
                  <Fragment>
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="Processing">Choose Status</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                    <button onClick={handleSubmit} className="subButton">
                      Submit
                    </button>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateOrder;
