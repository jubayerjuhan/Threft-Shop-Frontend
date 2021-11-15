import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import "./updateProducts.css";
import {
  getSingleProduct,
  updateProductInDatabase,
} from "./../../../REDUX/Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useAlert } from "react-alert";

const UpdateProducts = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.updateProduct);
  const alert = useAlert();
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const categories = [
    "Appparel",
    "Gadgets",
    "Phone",
    "Jewelry",
    "Laptop",
    "Health And Beauty",
  ];

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.set("name", name);
    updatedProduct.set("stock", stock);
    updatedProduct.set("price", price);
    updatedProduct.set("category", category);
    images.length > 0 &&
      images.forEach((image) => {
        updatedProduct.append("images", image);
      });
    dispatch(updateProductInDatabase(updatedProduct, id));
  };

  useEffect(() => {
    if (success) {
      alert.success("Product Updated Successfully");
      dispatch({ type: "UPDATE_PRODUCT_RESET" });
    }
    dispatch(getSingleProduct(id));
  }, [error, alert, success, id, dispatch]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="productAddSideWrapper">
          <form action="" onSubmit={handleSubmit}>
            <h3>Update Product</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="number"
              name="stock"
              value={stock}
              required={true}
              placeholder="Product Stock"
              onChange={(e) => setStock(e.target.value)}
            />
            <input
              type="number"
              name="price"
              value={price}
              required={true}
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              name="category"
              id=""
              value={category}
              required={true}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            <label for="file-upload" className="file-upload">
              Upload Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              id="file-upload"
              hidden
            />
            <input type="submit" onclick={handleSubmit} />
            <div className="imagePreview">
              {imagePreview.map((image, index) => (
                <img src={image} key={index} alt="" />
              ))}
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProducts;
