import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import "./Search.css";
import MetaData from "./../MetaData/MetaData";

const Search = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    }
  };
  return (
    <Fragment>
      <MetaData title="Search Products" />
      <div>
        <form className="searchBox" onSubmit={searchHandler}>
          <input
            type="search"
            name="search"
            placeholder="Search Product....."
            onChange={(e) => setKeyword(e.target.value)}
            id=""
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    </Fragment>
  );
};

export default Search;
