import React, { Fragment, useEffect, useState } from "react";
import { MdLock, MdLockOutline } from "react-icons/md";
import { clearError, resetPassword } from "./../../REDUX/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory, useParams } from "react-router";
import Loader from "./../../Components/Loader/Loader";

const PasswordReset = () => {
  const alert = useAlert();
  const history = useHistory();
  const { resetToken } = useParams();
  const dispatch = useDispatch();
  const { isUpdated, error, loading } = useSelector(
    (state) => state.changePassword
  );

  const initialState = {
    password: "",
    confirmPassword: "",
  };
  const [passwords, setPasswords] = useState(initialState);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };
  console.log(passwords);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(passwords, resetToken));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      history.push("/");
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
              <h1 className="title">Reset Password</h1>
              <div className="inputSection">
                <MdLockOutline />
                <input
                  onChange={handleChange}
                  type="password"
                  className="textInput"
                  name="password"
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

export default PasswordReset;
