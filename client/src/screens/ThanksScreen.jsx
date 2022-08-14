import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import ThanksContents from "../components/Thanks/ThanksContent";

const ThanksScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Thanks" />
         <ThanksContents />
      </Fragment>
   );
};

export default ThanksScreen;
