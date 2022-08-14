import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { truncate } from "../../helpers/input";

const SectiondPath = (props) => {
   const { parentPath, presentPath } = props;

   const [cookies, , removeCookies] = useCookies(),
      navigate = useNavigate(),
      user = cookies.user;

   const handleLogout = () => {
      removeCookies("user");
      navigate("/");
   };
   return (
      <div className="bg-light py-3">
         <div className="container">
            <div className="row">
               <div className="col-md-12 mb-0">
                  <Link to="/">Home</Link> <span className="mx-2 mb-0">/</span>{" "}
                  <Link to={`/${parentPath.toLowerCase()}`}>{parentPath}</Link>
                  <span className="mx-2 mb-0">/</span>{" "}
                  <strong className="text-black">
                     {truncate(presentPath, 9)}
                  </strong>
                  {user && (
                     <button
                        className="btn btn-sm btn-danger float-right d-small"
                        onClick={handleLogout}
                     >
                        Logout
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SectiondPath;
