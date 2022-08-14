import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Transactions from "../components/transactions/Transactions";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import { fetchPayments } from "../actions/payment";
import { useCookies } from "react-cookie";

const TransactionsScreen = () => {
   const [cookies] = useCookies();
   const user = cookies.user;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "transactions" });
      dispatch(fetchPayments(user.token));
      return false;
   }, [dispatch, user.token]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Transactions" />
         <Transactions />
         <Footer />
      </Fragment>
   );
};

export default TransactionsScreen;
