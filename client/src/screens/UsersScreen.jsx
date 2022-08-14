import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import Navbar from "../components/navbar/Navbar";
import Users from "../components/users/Users";
import { getUsers } from "../actions/users";
import { useCookies } from "react-cookie";

const UsersScreen = () => {
   const [cookies] = useCookies();
   const user = cookies.user;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "users" });
      dispatch(getUsers(user.token));
      return false;
   }, [dispatch, user.token]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Users" />
         <Users />
         <Footer />
      </Fragment>
   );
};

export default UsersScreen;
