import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import Footer from "../components/footer/Footer";
import AddItemsForm from "../components/form/AddItemForm";
import { fetchCat } from "../actions/category";
import { fetchSubCat } from "../actions/subCategory";

const AddItemsScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      dispatch(fetchCat());
      dispatch(fetchSubCat());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Add Product" />
         <AddItemsForm />
         <Footer />
      </Fragment>
   );
};

export default AddItemsScreen;
