import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import Navbar from "../components/navbar/Navbar";
import CartItems from "../components/cart/CartItems";
import Footer from "../components/footer/Footer";
import Path from "../components/heading/Path";
import actionTypes from "../reducerx/constants/action-types";
import { fetchCart } from "../actions/cart";

const CartScreen = () => {
   const [cookies] = useCookies();
   const user = cookies.user;
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "cart" });
      dispatch(fetchCart(user._id, user.token));
      return false;
   }, [dispatch, user._id, user.token]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Cart" />
         <CartItems />
         <Footer />
      </Fragment>
   );
};

export default CartScreen;
