import React from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../REDUX/Actions/cartAction.js";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  console.log(item);
  const increaseQuantity = (id, quantity, stock) => {
    if (quantity >= stock) {
      return;
    }
    const newQuantity = quantity + 1;
    dispatch(addToCart(id, newQuantity));
  };
  const decreaseQuantity = (id, quantity, stock) => {
    if (quantity <= 1) {
      return;
    }
    const newQuantity = quantity - 1;
    dispatch(addToCart(id, newQuantity));
  };
  return (
    <Fragment>
      <div className="cartItems">
        <div className="itemInfo m10">
          <img src={item.image.url} alt="Product Img" />
          <div className="itemTxtInfo">
            <h4 className="name">{item.name}</h4>
            <p className="price">{`Price : $${item.price}`}</p>
            <button onClick={() => dispatch(removeFromCart(item.product))}>
              Remove
            </button>
          </div>
        </div>
        <div className="quantity m10">
          <button
            onClick={() =>
              decreaseQuantity(item.product, item.quantity, item.stock)
            }
          >
            -
          </button>
          <input type="number" value={item.quantity} readOnly />
          <button
            onClick={() =>
              increaseQuantity(item.product, item.quantity, item.stock)
            }
          >
            +
          </button>
        </div>
        <div className="total m10">{`$${item.price * item.quantity}`}</div>
      </div>
    </Fragment>
  );
};

export default CartItems;
