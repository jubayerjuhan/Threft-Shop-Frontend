import React, { Fragment, useEffect, useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, reqLoginUser } from "../../REDUX/Actions/userAction.js";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";
import Loader from "./../../Components/Loader/Loader";
import { Link } from "react-router-dom";

const Login = ({ location }) => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );
  console.log("location", location);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  if (isAuthenticated) {
    history.push(redirect);
  }
  const initialState = {
    email: "",
    password: "",
  };
  const [loginCredentials, setLoginCredentials] = useState(initialState);
  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(reqLoginUser(loginCredentials.email, loginCredentials.password));
  };
  useEffect(() => {
    dispatch(clearError());
    if (error) {
      alert.error(error);
    }
  }, [alert, dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="title">Login</h1>
              <div className="inputSection">
                <MdEmail />
                <input
                  onChange={handleChange}
                  type="email"
                  className="textInput"
                  name="email"
                  required
                  placeholder="Enter Email Address"
                />
              </div>
              <div className="inputSection">
                <MdPassword />
                <input
                  onChange={handleChange}
                  type="password"
                  className="textInput"
                  name="password"
                  required
                  placeholder="Enter Password"
                />
              </div>
              <p className="paragraph">
                <Link to="/forget-password">Forget Password</Link>
              </p>
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

export default Login;
