import React from "react";
import { Fragment } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import TextField from "@mui/material/TextField";
import "./manageReview.css";
import Rating from "@mui/material/Rating";

import {
  deleteReview,
  getSingleProduct,
} from "../../../REDUX/Actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { clearErrors } from "./../../../REDUX/Actions/orderAction";

const ManageReviews = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { singleProduct } = useSelector((state) => state.singleProduct);
  const { success, error } = useSelector((state) => state.deleteProduct);
  const [productId, setProductId] = useState("");

  const rows = [];
  singleProduct &&
    singleProduct.reviews.forEach((review) =>
      rows.push({
        id: review._id,
        name: review.name,
        comment: review.comment,
        rating: review.rating,
      })
    );
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 2,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 1,
      renderCell: (params) => {
        return (
          <Rating
            name="read-only"
            value={params.getValue(params.id, "rating")}
            readOnly
          />
        );
      },
    },
    {
      field: "viewOrder",
      headerName: "Action",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="actionOfOrders">
            <MdDeleteForever
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            />
          </div>
        );
      },
    },
  ];

  const deleteReviewHandler = (id) => {
    console.log(productId, id);
    dispatch(deleteReview(productId, id));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getSingleProduct(productId));
    }
    if (success) {
      alert.success("Review Deleted Successfully");
      dispatch({ type: "DELETE_REVIEW_RESET" });
    }
    if (error) {
      alert.error(error);
      clearErrors();
    }
  }, [error, alert, success, productId, dispatch]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div className="reviewManageWrappper">
          <div className="reviewIdSubmit">
            <TextField
              style={{ width: "250px" }}
              id="outlined-basic"
              label="Product Id"
              variant="outlined"
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
          {singleProduct && [
            singleProduct.reviews.length <= 0 ? (
              <h3>No Reviews Found</h3>
            ) : (
              <DataGrid
                className="grid"
                rows={rows}
                autoHeight
                autoPageSize
                columns={columns}
                pageSize={100}
              />
            ),
          ]}
        </div>
      </div>
    </Fragment>
  );
};

export default ManageReviews;
