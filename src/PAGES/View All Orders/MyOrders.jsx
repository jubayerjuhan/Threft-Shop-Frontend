import React, { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "../../REDUX/Actions/orderAction.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
import "./myorders.css";
import Loader from "./../../Components/Loader/Loader";

const MyOrders = () => {
  const dispatch = useDispatch();
  const rows = [];
  const { orders, loading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  console.log(orders);
  orders &&
    orders.forEach((order) =>
      rows.push({
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: `$${order.priceBreakdown.totalPrice}`,
      })
    );
  console.log(rows);

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Quantity",
      type: "number",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Order Amount",
      type: "number",
      flex: 1,
    },
    {
      field: "viewOrder",
      headerName: "Action",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <Link to={`/orders/${params.getValue(params.id, "id")}`}>
            <MdLaunch />
          </Link>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div
          className="myOrderContainer"
          style={{ height: 400, width: "100%" }}
        >
          <div className="nameContainer">
            <h3>{user.name}'s Order</h3>
          </div>
          <DataGrid
            className="grid"
            rows={rows}
            columns={columns}
            pageSize={5}
          />
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
