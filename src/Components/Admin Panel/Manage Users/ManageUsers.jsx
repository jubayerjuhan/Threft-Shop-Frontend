import React, { useEffect } from "react";
import { Fragment } from "react";
import { MdDeleteForever } from "react-icons/md";
import Sidebar from "./../Sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { deleteUser, getAllUsers } from "../../../REDUX/Actions/userAction.js";
import { FiEdit } from "react-icons/fi";
import "../Orders/orders.css";
import { Link } from "react-router-dom";
import { clearErrors } from "./../../../REDUX/Actions/orderAction";
import { useAlert } from "react-alert";

const Users = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.allUsers);
  const { success, error } = useSelector((state) => state.deleteUser);
  const rows = [];
  users &&
    users.forEach((user) =>
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      })
    );

  const columns = [
    { field: "id", headerName: "ID", flex: 2 },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
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
            <Link to={`/admin/user/update/${params.getValue(params.id, "id")}`}>
              <FiEdit onClick={() => history.push()} />
            </Link>
            <MdDeleteForever
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            />
          </div>
        );
      },
    },
  ];

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (success) {
      alert.success("User Deleted");
      dispatch({ type: "DELETE_USER_RESET" });
    }
    dispatch(getAllUsers());
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
            columns={columns}
            pageSize={10}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Users;
