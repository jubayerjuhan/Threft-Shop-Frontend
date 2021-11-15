import Sidebar from "./../Sidebar/Sidebar";
import "./AddProducts.css";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { createProduct } from "./../../../REDUX/Actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useAlert } from "react-alert";
import Loader from "./../../Loader/Loader";
const AddProducts = () => {
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.addProduct);
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
    "Fashion Wear",
    "Health And Beauty",
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const createdProduct = new FormData();
    createdProduct.set("name", name);
    createdProduct.set("description", description);
    createdProduct.set("stock", stock);
    createdProduct.set("price", price);
    createdProduct.set("category", category);
    images.length > 0 &&
      images.forEach((image) => {
        createdProduct.append("images", image);
      });
    dispatch(createProduct(createdProduct, id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (success) {
      alert.success("Product created Successfully");
      dispatch({ type: "ADD_PRODUCT_RESET" });
    }
  }, [error, alert, success, id, dispatch]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        {loading ? (
          <Loader />
        ) : (
          <div className="productAddSideWrapper">
            <form action="" onSubmit={handleSubmit}>
              <h3>Add Products</h3>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                name="description"
                placeholder="Product Description"
                value={description}
                className="addDescripion"
                onChange={(e) => setDescription(e.target.value)}
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
        )}
      </div>
    </Fragment>
  );
};

export default AddProducts;
