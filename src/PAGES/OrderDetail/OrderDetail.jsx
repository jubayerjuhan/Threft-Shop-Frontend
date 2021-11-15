import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router";
import { getSingleOrder } from "../../REDUX/Actions/orderAction.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./orderdetail.css";

const OrderDetail = () => {
  const { order } = useSelector((state) => state.singleOrder);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getSingleOrder(id));
  }, [dispatch, id]);
  return (
    <Fragment>
      {order && (
        <Fragment>
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
                  {order.paymentInfo.status === "succeeded" ? "Paid" : "Unpaid"}
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetail;
