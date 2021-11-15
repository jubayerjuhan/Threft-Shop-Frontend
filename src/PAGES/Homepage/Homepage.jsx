import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Homepage.css";
import FeaturedProducts from "./Compos/Featured Products/FeaturedProducts";
import MetaData from "./../../Components/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getAllProducts,
} from "../../REDUX/Actions/productAction.js";
import Loader from "../../Components/Loader/Loader.jsx";
import { useAlert } from "react-alert";

const Homepage = () => {
  const { allProducts, loading, error } = useSelector(
    (state) => state.products
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllProducts());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="The Thrift Shop" />
          <div className="banner">
            <p>Welcome To Ecommerce</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#component">
              <button>
                Scroll Down <CgMouse />
              </button>
            </a>
          </div>
          <h6 className="collection-title">Featured Products</h6>
          <div className="featProduct-container" id="component">
            {allProducts?.products?.map((product, i) => (
              <FeaturedProducts key={i} product={product}></FeaturedProducts>
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Homepage;
