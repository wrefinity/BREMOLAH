import React from "react";
import { Link } from "react-router-dom";

const ThanksContent = () => {
   return (
      <div className="site-section">
         <div className="container">
            <div className="row">
               <div className="col-md-12 text-center">
                  <span className="icon-check_circle display-3 text-success"></span>
                  <h2 className="display-3 text-black">Thank you!</h2>
                  <p className="lead mb-5">
                     You order was successfuly completed.
                  </p>
                  <p>
                     {" "}
                     <Link to="/shop">
                        <button className="btn btn-sm height-auto px-4 py-2 btn-primary">
                           Back to shop
                        </button>
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ThanksContent;
