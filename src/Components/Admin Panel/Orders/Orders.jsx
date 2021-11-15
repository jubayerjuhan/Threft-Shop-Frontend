import React, { useEffect } from "react";
import { Fragment } from "react";
import { MdDeleteForever } from "react-icons/md";
import Sidebar from "./../Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  deleteOrder,
  getAllOrders,
} from "../../../REDUX/Actions/orderAction.js";
import { FiEdit } from "react-icons/fi";
import "./orders.css";
import { Link } from "react-router-dom";
import { clearErrors } from "./../../../REDUX/Actions/orderAction";
import { useAlert } from "react-alert";

const Orders = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrders);
  const { success, error } = useSelector((state) => state.deleteOrder);
  const rows = [];
  orders &&
    orders.forEach((order) =>
      rows.push({
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: `$${order.priceBreakdown.totalPrice}`,
      })
    );

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
          <div className="actionOfOrders">
            <Link
              to={`/admin/order/update/${params.getValue(params.id, "id")}`}
            >
              <FiEdit onClick={() => history.push()} />
            </Link>
            <MdDeleteForever
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            />
          </div>
        );
      },
    },
  ];

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (success) {
      alert.success("Order Deleted successfully");
      dispatch({ type: "DELETE_ORDER_RESET" });
    }
    dispatch(getAllOrders());
  }, [dispatch, success, alert, error]);

  return (
    <Fragment>
      <div className="dashboard">
        <Sidebar />
        <div
          className="myOrderContainer"
          style={{ height: 400, width: "100%" }}
        >
          <DataGrid
            className="grid"
            rows={rows}
            autoHeight
            autoPageSize
            columns={columns}
            pageSize={100}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Orders;
