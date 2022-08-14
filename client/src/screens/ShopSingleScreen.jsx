import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Footer from "../components/footer/Footer";
import SectionedPath from "../components/heading/SectionedPath";
import Navbar from "../components/navbar/Navbar";
import ShopSingleData from "../components/ShopSingle/ShopSingleData";
import { getProducts } from "../actions/product";
import { useParams } from "react-router-dom";

const ShopSingleScreen = () => {
   const dispatch = useDispatch(),
      products = useSelector((state) => state.products),
      { productId } = useParams(),
      product = products.filter((pro) => pro._id === productId)[0].name;
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      dispatch(getProducts());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <SectionedPath parentPath="Shop" presentPath={product} />
         <ShopSingleData />
         <Footer />
      </Fragment>
   );
};
export default ShopSingleScreen;
