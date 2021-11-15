import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./FeatureProduct.css";

const FeaturedProducts = ({ product }) => {
  console.log(product);
  const options = {
    productcount: 5,
    value: product.ratings,
    size: 24,
    isHalf: true,
    edit: false,
    activeColor: "#ffd700",
  };
  return (
    <Link className="feat-product-card" to={`/product/${product._id}`}>
      {/* <div className="container"> */}
      <div className="image">
        <img
          className="img-responsive"
          src={product.images[0].url ? product.images[0].url : ""}
          alt=""
        />
      </div>
      <h5 className="title">{product.name}</h5>
      <ReactStars className="starwar" {...options} />
      <span>(456 Reviews)</span>
      <h5 className="product-price">${product.price}</h5>
      {/* </div> */}
    </Link>
  );
};

export default FeaturedProducts;
