import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import Categories from "../components/categories/Categories";
import Footer from "../components/footer/Footer";
import actionTypes from "../reducerx/constants/action-types";
import Path from "../components/heading/Path";
import Navbar from "../components/navbar/Navbar";
import { fetchCat } from "../actions/category";

const CategoriesScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "categories" });
      dispatch(fetchCat());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Categories" />
         <Categories />
         <Footer />
      </Fragment>
   );
};

export default CategoriesScreen;
