import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import PaymentForm from "../components/form/PaymentForm";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import { getProducts } from "../actions/product";

const PaymentScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      dispatch(getProducts());
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Payment" />
         <PaymentForm />
         <Footer />
      </Fragment>
   );
};

export default PaymentScreen;
