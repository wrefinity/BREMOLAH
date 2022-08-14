import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import LoginForm from "../components/form/LoginForm";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";

const LoginScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Login" />
         <LoginForm />
         <Footer />
      </Fragment>
   );
};

export default LoginScreen;
