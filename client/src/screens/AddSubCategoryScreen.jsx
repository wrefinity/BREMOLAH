import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import Footer from "../components/footer/Footer";
import AddSubCategoryForm from "../components/form/AddSubCategoryForm";
import { fetchCat } from "../actions/category";

const AddSubCategoryScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      dispatch(fetchCat());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Add Sub Category" />
         <AddSubCategoryForm />
         <Footer />
      </Fragment>
   );
};

export default AddSubCategoryScreen;
