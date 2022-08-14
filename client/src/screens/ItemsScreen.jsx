import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import Navbar from "../components/navbar/Navbar";
import Items from "../components/items/Items";
import { fetchCat } from "../actions/category";
import { fetchSubCat } from "../actions/subCategory";
import { getProducts } from "../actions/product";

const ItemsScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "products" });
      dispatch(fetchCat());
      dispatch(fetchSubCat());
      dispatch(getProducts());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Products" />
         <Items />
         <Footer />
      </Fragment>
   );
};

export default ItemsScreen;
