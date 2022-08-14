import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import Navbar from "../components/navbar/Navbar";
import ProfileComponents from "../components/profile/ProfileComponents";

const ProfileScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Profile" />
         <ProfileComponents />
         <Footer />
      </Fragment>
   );
};

export default ProfileScreen;
