import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import SubCategories from "../components/categories/SubCategories";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import Navbar from "../components/navbar/Navbar";
import { fetchCat } from "../actions/category";
import { fetchSubCat } from "../actions/subCategory";

const SubCategoriesScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({
         type: actionTypes.SET_CURRENT_PAGE,
         payload: "subCategories",
      });
      dispatch(fetchCat());
      dispatch(fetchSubCat());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="SubCategories" />
         <SubCategories />
         <Footer />
      </Fragment>
   );
};

export default SubCategoriesScreen;
