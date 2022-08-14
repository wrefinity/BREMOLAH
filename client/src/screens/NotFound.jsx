import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";

import actionTypes from "../reducerx/constants/action-types";
import Navbar from "../components/navbar/Navbar";
import Path from "../components/heading/Path";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch({ type: actionTypes.SET_CURRENT_PAGE, payload: "" });
      return false;
   }, [dispatch]);
   return (
      <Fragment>
         <Navbar />
         <Path presentPath="Page not found" />
         <div className="site-section">
            <div className="container">
               <div className="row">
                  <div className="col-md-12 text-center">
                     <h1 className="display-1 text-danger">404</h1>
                     <h2 className="display-3 text-danger">Page Not Found</h2>
                     <p>
                        <Link to="/">
                           <button className="btn btn-sm height-auto px-4 py-2 btn-primary">
                              Back to Home
                           </button>
                        </Link>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default NotFoundScreen;
