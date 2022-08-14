import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import SignupForm from "../components/form/SignupForm";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";

const SignupScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Sign up" />
         <SignupForm />
         <Footer />
      </Fragment>
   );
};

export default SignupScreen;
