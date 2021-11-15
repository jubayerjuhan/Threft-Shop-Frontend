import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearError,
  deleteProduct,
} from "../../../REDUX/Actions/productAction.js";
import { allAdminProducts } from "../../../REDUX/Actions/productAction.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader.jsx";
import { MdDeleteOutline } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import Dialog from "@mui/material/Dialog";
import "./AllProducts.css";
import Button from "@mui/material/Button";

const AllProducts = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const dp = useSelector((state) => state.deleteProduct);
  const { loading, error, allProducts } = useSelector(
    (state) => state.adminProducts
  );
  let rows = [];
  allProducts.length > 0 &&
    allProducts.forEach((product) =>
      rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        ratings: product.ratings,
        stock: product.stock,
      })
    );

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", type: "number", flex: 1 },
    { field: "ratings", headerName: "Ratings", type: "number", flex: 1 },
    { field: "stock", headerName: "Stock", type: "number", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      type: "number",
      renderCell: (cell) => {
        return (
          <div className="actionOfProducts">
            <Link to={`/admin/update-product/${cell.getValue(cell.id, "id")}`}>
              <BiEditAlt />
            </Link>
            <MdDeleteOutline
              onClick={() =>
                sendProductIdForDelete(cell.getValue(cell.id, "id"))
              }
            />
          </div>
        );
      },
    },
  ];

  const [open, setOpen] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState("");
  const sendProductIdForDelete = (id) => {
    setItemToBeDeleted(id);
    setOpen(true);
  };

  const handleDeleteProduct = () => {
    setOpen(false);
    dispatch(deleteProduct(itemToBeDeleted));
  };

  useEffect(() => {
    if (error || dp.error) {
      alert.error(error || dp.error);
      dispatch(clearError());
    }
    if (dp.success === true) {
      alert.success("Product Deleted Successfully");
      dispatch({ type: "DELETE_PRODUCT_RESET" });
    }
    dispatch(allAdminProducts());
  }, [error, dispatch, alert, dp]);
  return (
    <Fragment>
      {loading && rows.length > 0 ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="allProducts dataGrid">
              <DataGrid rows={rows} columns={columns} />
            </div>
          </div>
          <Dialog open={open}>
            <div className="dialogWrapper">
              <h3>Do You Want to delete this product</h3>
              <div className="actionButton">
                <Button onClick={() => setOpen(false)} varient="text">
                  NO
                </Button>
                <Button onClick={handleDeleteProduct} varient="text">
                  Yes
                </Button>
              </div>
            </div>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AllProducts;
