import React, { Fragment, useEffect, useState } from "react";
import { MdEmail, MdOutlinePeopleOutline } from "react-icons/md";
import "../../PAGES/Login/Login.css";
import {
  clearError,
  editUserProfile,
  loadUser,
} from "../../REDUX/Actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../Components/Loader/Loader";
import { useHistory } from "react-router";
import { useAlert } from "react-alert";

const EditProfile = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const { loading, isUpdated, error } = useSelector((state) => state.profile);
  const profile = useSelector((state) => state.profile);
  const [regCredentials, setRegCredentials] = useState(initialState);
  const { name, email } = regCredentials;
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

  useEffect(() => {
    if (error) {
      dispatch(clearError());
      alert.error(error);
    }
  }, [error, alert, dispatch]);
  if (isUpdated) {
    dispatch(loadUser());
    history.push("/account");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    console.log(myForm);
    dispatch(editUserProfile(myForm));
  };
  return (
    <Fragment>
      {loading || profile.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="editProfile login">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="title">Edit-Profile</h1>
              <div className="inputSection">
                <MdOutlinePeopleOutline />
                <input
                  onChange={handleChange}
                  type="name"
                  className="textInput"
                  name="name"
                  required
                  placeholder="Enter Name"
                />
              </div>
              <div className="inputSection">
                <MdEmail />
                <input
                  onChange={handleChange}
                  className="textInput"
                  type="email"
                  name="email"
                  required
                  placeholder="Enter Email Address"
                />
              </div>
              {/* <div className="inputSection">
              <MdPassword />
              <input
                onChange={handleChange}
                className="textInput"
                type="password"
                name="password"
                required
                placeholder="Enter Password"
              />
            </div> */}
              {/* <div className="inputSection">
                <MdFilePresent />
                <input
                  className="textInput"
                  onChange={handleChange}
                  type="file"
                  name="avatar"
                  required
                />
              </div> */}
              <input
                type="submit"
                onClick={handleSubmit}
                className="btn btn-submit"
                value="Save"
              />
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default EditProfile;
