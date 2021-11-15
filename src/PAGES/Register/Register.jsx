import React, { Fragment, useEffect, useState } from "react";
import { MdEmail, MdOutlinePeopleOutline, MdPassword } from "react-icons/md";
import { clearError, reqRegister } from "./../../REDUX/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router";
import Loader from "./../../Components/Loader/Loader";
import "../Login/Login.css";
import { Link } from "react-router-dom";

const Register = () => {
  const alert = useAlert();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.user
  );
  if (isAuthenticated) {
    history.push("/");
  }
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const [regCredentials, setRegCredentials] = useState(initialState);
  const { name, email, password } = regCredentials;
  const [avatar, setAvatar] = useState("");
  console.log(avatar);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setRegCredentials({ ...regCredentials, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    console.log(myForm);
    dispatch(reqRegister(myForm));
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
              <h1 className="title">Register</h1>
              <div className="inputSection">
                <MdOutlinePeopleOutline />
                <input
                  className="textInput"
                  onChange={handleChange}
                  type="name"
                  name="name"
                  required
                  placeholder="Enter Name"
                />
              </div>
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
                  className="textInput"
                  onChange={handleChange}
                  type="password"
                  name="password"
                  required
                  placeholder="Enter Password"
                />
              </div>
              <div className="inputSection">
                <input
                  onChange={handleChange}
                  className="textInput"
                  type="file"
                  name="avatar"
                  required
                />
              </div>
              <p className="paragraph">
                No, <Link to="/login">Already Have a Account?</Link>
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

export default Register;
