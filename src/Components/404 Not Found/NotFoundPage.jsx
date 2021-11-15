import React from "react";
import notFound from "../../Images/notfound.svg";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notfound">
      <div className="notFoundWrapper">
        <img src={notFound} alt="NotFound" />
        <div className="txtContainer">
          <h1>404 Not Found</h1>
          <h3>Page Not Found</h3>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
