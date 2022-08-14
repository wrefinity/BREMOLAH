import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Footer from "../components/footer/Footer";
import SectionedPath from "../components/heading/SectionedPath";
import Navbar from "../components/navbar/Navbar";
import OrderSingleData from "../components/orders/OrderSingleData";
import { fetchPayments } from "../actions/payment";
import { useCookies } from "react-cookie";

const OrderSingleScreen = () => {
   const dispatch = useDispatch();
   const [cookies] = useCookies();
   const user = cookies.user;
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      dispatch(fetchPayments(user.token));
      return false;
   }, [dispatch, user]);
   return (
      <Fragment>
         <Navbar />
         <SectionedPath parentPath="Order" presentPath="Item" />
         <OrderSingleData />
         <Footer />
      </Fragment>
   );
};
export default OrderSingleScreen;
