import React from "react";
import { Fragment } from "react";
import "./Cart.css";
import CartItems from "./CartItems";
import { useSelector } from "react-redux";
import { BsFillCartXFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import MetaData from "./../../Components/MetaData/MetaData";
import { useHistory } from "react-router";

const Cart = () => {
  const history = useHistory();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <div className="emptyCartPage">
          <BsFillCartXFill />
          <h2>There Is No Items On Your Cart</h2>
          <Link to="/products">Shop Now</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems?.map((item) => <CartItems item={item}></CartItems>)}

            <div className="grossTotal">
              <div>{""}</div>
              <div>
                <div className="total">
                  <h3>Subtotal</h3>
                  <h3 className="price">
                    {`$${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0
                    )}`}
                  </h3>
                </div>
                <div className="checkoutContainer">
                  <button onClick={() => history.push("/login?ref=shipping")}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
