import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import ShopContent from "../components/shop/ShopContent";
import Footer from "../components/footer/Footer";
import { fetchCat } from "../actions/category";
import { fetchSubCat } from "../actions/subCategory";
import { getProducts } from "../actions/product";

const ShopScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "shop" });
      dispatch(getProducts());
      dispatch(fetchCat());
      dispatch(fetchSubCat());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Shop" />
         <ShopContent />
         <Footer />
      </Fragment>
   );
};

export default ShopScreen;
