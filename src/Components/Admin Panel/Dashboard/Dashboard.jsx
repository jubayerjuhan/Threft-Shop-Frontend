import React from "react";
import { Fragment, useEffect } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import "./dashboard.css";
import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";
import { getAllOrders } from "../../../REDUX/Actions/orderAction.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../Loader/Loader";
import { allAdminProducts } from "./../../../REDUX/Actions/productAction";
import { getAllUsers } from "../../../REDUX/Actions/userAction.js";

const Dashboard = () => {
  const { orders } = useSelector((state) => state.adminOrders);
  const { allProducts } = useSelector((state) => state.adminProducts);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  let totalOrderPrice = 0;
  let stockOutProduct = 0;
  let inStockProduct = 0;

  if (orders) {
    for (let i = 0; i < orders.length; i++) {
      totalOrderPrice += orders[i].priceBreakdown.totalPrice;
    }
  }

  if (allProducts) {
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].stock === 0) {
        stockOutProduct += 1;
      }
      if (allProducts[i].stock > 0) {
        inStockProduct += 1;
      }
    }
  }

  const data = {
    labels: ["In Stock", "Out Of Stock"],

    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [inStockProduct, stockOutProduct],
      },
    ],
  };

  console.log("inst", inStockProduct, stockOutProduct);

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(allAdminProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Fragment>
      {!orders || !allProducts || !users ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <Grid container spacing={1}>
              <Grid item md={8}>
                <div className="heroInfo">
                  <div>
                    <p>Product</p>
                    <h3>{allProducts.length}</h3>
                  </div>
                  <div>
                    <p>User</p>
                    <h3>{users.length}</h3>
                  </div>
                  <div>
                    <p>Orders</p>
                    <h3>{orders.length}</h3>
                  </div>
                </div>
              </Grid>
              <Grid item md={4} xs={12}>
                <div className="priceInfo">
                  <h3 className="sellTotal">Total Sell</h3>
                  <h1>{`$${totalOrderPrice.toFixed(2)}`}</h1>
                </div>
              </Grid>
              <Grid item md={6} xs={12}>
                <div className="stockChart">
                  <h3>Product Stock Status</h3>
                  <Doughnut data={data} height={40} width={70} />
                </div>
              </Grid>
              <Grid item md={6} xs={12}></Grid>
            </Grid>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
