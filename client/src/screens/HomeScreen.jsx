import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import ShopBoard from "../components/homescreen/ShopBoard";
import DiscoverCollections from "../components/homescreen/DiscoverCollections";
import PopularProducts from "../components/homescreen/PopularProducts";
// import MostRated from "../components/homescreen/MostRated";
import Footer from "../components/footer/Footer";
import { fetchCat } from "../actions/category";
import { fetchSubCat } from "../actions/subCategory";
import { getProducts } from "../actions/product";

const HomeScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      dispatch(fetchCat());
      dispatch(fetchSubCat());
      dispatch(getProducts());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <ShopBoard />
         <DiscoverCollections />
         <PopularProducts />
         {/* <MostRated /> */}
         <Footer />
      </Fragment>
   );
};

export default HomeScreen;
