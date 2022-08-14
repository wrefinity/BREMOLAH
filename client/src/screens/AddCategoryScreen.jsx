import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import Footer from "../components/footer/Footer";
import AddCategoryForm from "../components/form/AddCategoryForm";

const AddCategoryScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Add Category" />
         <AddCategoryForm />
         <Footer />
      </Fragment>
   );
};

export default AddCategoryScreen;
