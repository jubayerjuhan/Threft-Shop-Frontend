import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import "./myprofile.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Loader from "./../../Components/Loader/Loader";

const MyProfile = () => {
  const history = useHistory();
  const { user, loading } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="profileWrapper">
            <h1 className="pageTitle">Profile</h1>
            <div className="profile">
              <div className="imageSection">
                <img src={user?.avatar?.url} alt="" />
                <button
                  onClick={() => history.push("/profile/edit-profile")}
                  className="btn-submit"
                >
                  Edit Profile
                </button>
              </div>
              <div className="section">
                <div className="infoChild">
                  <h1 className="title">Name</h1>
                  <p className="subtitle">{user?.name}</p>
                </div>
                <div className="infoChild">
                  <h1 className="title">Email</h1>
                  <p className="subtitle">{user?.email}</p>
                </div>
                <div className="infoChild">
                  <h1 className="title">Joined On</h1>
                  <p className="subtitle">{user?.createdAt || "01-01-2021"}</p>
                </div>
                <div className="infoChild">
                  <Link to="/profile/change-password">
                    <button className="btn-submit">Change Password</button>
                  </Link>
                </div>
                <div className="infoChild">
                  <Link to="/orders/">
                    <button className="btn-submit">Edit Profile</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyProfile;
