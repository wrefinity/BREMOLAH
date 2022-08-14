import React from "react";
import { Link } from "react-router-dom";

const ShopBoard = () => {
   return (
      <div className="site-blocks-cover" data-aos="fade">
         <div className="container">
            <div className="row">
               <div className="col-md-6 ml-auto order-md-2 align-self-start">
                  <div className="site-block-cover-content">
                     <h2 className="sub-title">Welcome To</h2>
                     <h1>Bremolah Collections</h1>
                     <p>
                        <Link to="/shop" className="btn btn-danger p-2 text-center rounded-0">
                           Shop Now
                        </Link>
                     </p>
                  </div>
               </div>
               <div className="col-md-6 order-1 align-self-end">
                  <img
                     src="images/model_3.png"
                     alt="proimg"
                     className="img-fluid"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ShopBoard;
