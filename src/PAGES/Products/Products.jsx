import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import FeaturedProducts from "./../Homepage/Compos/Featured Products/FeaturedProducts";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
// import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import { getAllProducts } from "../../REDUX/Actions/productAction.js";
import "./Products.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loader from "./../../Components/Loader/Loader";
import MetaData from "./../../Components/MetaData/MetaData";
const Products = ({ match }) => {
  const dispatch = useDispatch();
  const { allProducts, error } = useSelector((state) => state.products);
  const alert = useAlert();
  const [page, setPage] = useState(1);
  console.log(page);
  const keyword = match.params.keyword;
  console.log(keyword);
  // const totalPagination = Math.ceil(
  //   allProducts?.productsCount / allProducts?.resultPerPage
  // );
  const [priceValue, setPriceValue] = useState([0, 250000000]);
  const categories = ["Phone", "Camera", "Laptop", "Shoes", "Gadget"];
  const [category, setCategory] = useState("");
  const handleCategory = (e) => {
    setCategory(e.target.value.toLowerCase());
  };

  //rating compo
  function valuetext(value) {
    return `${value}°C`;
  }
  const [rating, setRating] = useState(0);
  console.log(category);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getAllProducts(keyword, page, priceValue, category, rating));
  }, [alert, page, dispatch, error, keyword, priceValue, category, rating]);
  const handleChange = (e, value) => {
    setPriceValue(value);
  };

  return (
    <Fragment>
      <MetaData title="Products" />
      <div className="productHeading">
        <h2>Products</h2>
      </div>
      {!allProducts ? (
        <Loader />
      ) : allProducts && allProducts.length === 0 ? (
        <h1>No Products</h1>
      ) : (
        <Fragment>
          <div className="filterbox">
            <div className="price-filter">
              <p>Price: </p>
              <Slider
                value={priceValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />
            </div>
            <Box sx={{ minHeight: 120 }}>
              <FormControl onSubmit={(e) => e.preventDefault()} fullWidth>
                <InputLabel
                  style={{ marginTop: "5px" }}
                  id="demo-simple-select-label"
                >
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="Zinggg"
                  label="Category"
                  onChange={handleCategory}
                >
                  {categories.map((category) => (
                    <MenuItem value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <div className="ratingFilter">
              <p>Filter By Rating</p>
              <Slider
                aria-label="Rating Above"
                onChange={(e, value) => setRating(value)}
                defaultValue={rating}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={5}
              />
            </div>
          </div>

          <div className="productContainer">
            {allProducts.products.map((product) => (
              <FeaturedProducts product={product}></FeaturedProducts>
            ))}
          </div>
          {/* 
          <div className="pagination">
            <Pagination
              count={totalPagination}
              variant="outlined"
              page={page}
              color="primary"
              onChange={(e, value) => setPage(value)}
            />
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
