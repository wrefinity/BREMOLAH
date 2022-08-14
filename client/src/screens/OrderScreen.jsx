import React, { Fragment, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import Footer from "../components/footer/Footer";
import OrderList from "../components/orders/OrderList";
import { fetchPayments } from "../actions/payment";
import { useCookies } from "react-cookie";

const OrderScreen = () => {
   const dispatch = useDispatch();
   const [cookies] = useCookies();
   const user = cookies.user;
   const referral = useRef();


   useEffect(() => {
      referral.current()
      return false;
   }, [dispatch]);

   const getData = ()=>{
      dispatch(fetchPayments(user.token));
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "orders" });
   }

   referral.current = getData

   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Orders" />
         <OrderList />
         <Footer />
      </Fragment>
   );
};

export default OrderScreen;
