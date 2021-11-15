import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Sidebar from "./../Sidebar/Sidebar";
import { useParams } from "react-router";
import { MdOutlineEmojiPeople } from "react-icons/md";
import "./updateuserrole.css";
import { getSingleUser } from "../../../REDUX/Actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../Loader/Loader";
import { updateRole } from "./../../../REDUX/Actions/userAction";
import { useAlert } from "react-alert";
import { clearErrors } from "./../../../REDUX/Actions/orderAction";

const UpdateUserRole = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.singleUser);
  const { success, error } = useSelector((state) => state.updateUser);
  const [role, setRole] = useState("");

  const handleSubmit = () => {
    dispatch(updateRole(id, role));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }

    if (success) {
      alert.success("Role Updated Successfully");
      dispatch({ type: "UPDATE_USER_RESET" });
    }
    dispatch(getSingleUser(id));
  }, [dispatch, success, id, error, alert]);

  return (
    <Fragment>
      {loading || !user ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="dashboard">
            <Sidebar />
            <div className="updateUserWrapper">
              <h3>Choose New Role For {user.name}</h3>
              <div className="selectWrapper">
                <MdOutlineEmojiPeople />
                <select name="" id="" onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose One</option>
                  {user.role === "user" && <option value="admin">Admin</option>}
                  {user.role === "admin" && <option value="user">User</option>}
                </select>
              </div>
              <button className="submitBtn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateUserRole;
