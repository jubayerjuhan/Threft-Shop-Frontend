import React from 'react'
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { Fragment } from "react";
import Loader from "./../Loader/Loader";

const Protectedroute = ({ isAdmin, component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector(state => state.user)
  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          {loading === false &&
            <Route
              {...rest} render={(props) => {
                if (!isAuthenticated) {
                  return <Redirect to='/login' />
                }
                if (isAdmin === true && user.role !== 'admin') {
                  return <Redirect to='/login' />
                }
                return <Component {...props} />
              }}
            />}
        </Fragment>
      )}
    </Fragment>

  )
}

export default Protectedroute
