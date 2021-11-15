import React, { Fragment, useEffect, useState } from "react";
import { MdLock, MdLockOutline, MdVpnKey } from "react-icons/md";
import { changePassword, clearError } from "./../../REDUX/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import Loader from "./../../Components/Loader/Loader";

const ChangePassword = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isUpdated, error, loading } = useSelector(
    (state) => state.changePassword
  );

  const initialState = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [passwords, setPasswords] = useState(initialState);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  console.log(passwords);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changePassword(passwords));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      history.push("/account");
      alert.success("Password Updated Successfully");
    }
  }, [alert, dispatch, history, isUpdated, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="title">Change Password</h1>

              <div className="inputSection">
                <MdVpnKey />
                <input
                  className="textInput"
                  onChange={handleChange}
                  type="password"
                  name="oldPassword"
                  required
                  placeholder="Old Password"
                />
              </div>
              <div className="inputSection">
                <MdLockOutline />
                <input
                  onChange={handleChange}
                  type="password"
                  className="textInput"
                  name="newPassword"
                  required
                  placeholder="New Password"
                />
              </div>
              <div className="inputSection">
                <MdLock />
                <input
                  className="textInput"
                  onChange={handleChange}
                  type="password"
                  name="confirmPassword"
                  required
                  placeholder="Confirm Password"
                />
              </div>

              <input
                onClick={handleSubmit}
                type="submit"
                value="Submit"
                className="btn btn-submit"
              />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ChangePassword;
