import React, { Fragment, useEffect, useState } from "react";
import { MdLock } from "react-icons/md";
import { clearError, forgetPassword } from "./../../REDUX/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import Loader from "./../../Components/Loader/Loader";

const ForgetPassword = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isUpdated, error, loading } = useSelector(
    (state) => state.changePassword
  );

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      history.push("/login");
      alert.success("Please Check Your Email Address, We Have Sent A Link");
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
              <h1 className="title">Forget Password</h1>

              <div className="inputSection">
                <MdLock />
                <input
                  className="textInput"
                  onChange={handleChange}
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Your Account Email"
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

export default ForgetPassword;
