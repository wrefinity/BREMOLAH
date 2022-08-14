import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LineWave } from "react-loader-spinner";
import {toast} from "react-toastify"

import { handleInput, loaderSize, validate, loaderColor } from "../../helpers/input";
import { createUsers } from "../../actions/users";
import { FileInput } from "./formHelpers";


const SignupForm = () => {
   const [signData, setSignData] = useState({
      fullname: "",
      password: "",
      email: "",
      confirmPassword: "",
      image: null,
   });
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const reset = () => {
      setSignData({
         fullname: "",
         password: "",
         email: "",
         confirmPassword: "",
         image: null,
      });
   };

   const handleInputImage = (name, value) => {
      setSignData((prev) => ({ ...prev, [name]: value }));
   };
   
   useEffect(() => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         setLoading(false)
         dispatch(createUsers(signData, navigate, toast))
         reset();
      }
      else{
         setLoading(false)
      }
   }, [formErrors])

   const handleOnSubmit = (e) => {
      e.preventDefault();
      setLoading(true)
      setFormErrors(validate(signData));
      setIsSubmit(true)
   }

   return (
      <div className="site-section">
         <div className="container">
            <div className="row">
               <div className="col-md-2"></div>
               <div className="col-md-8">
                  <form onSubmit={handleOnSubmit}>
                     <div className="p-3 p-lg-5 border">
                        <div className="container p-5 mb-4 bg-danger">
                           <h2 className="h3 mb-3 text-white text-center bold-text">
                              Sign up
                           </h2>
                        </div>
                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_fullname"
                                 className="text-black bold-text"
                              >
                                 Fullname <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_fullname"
                                 name="fullname"
                                 value={signData.fullname}
                                 onChange={(e) => handleInput(e, setSignData)}
                                 placeholder="enter your fullname"
                              />
                               <p className="text-danger">{formErrors.fullname}</p>
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_email"
                                 className="text-black bold-text"
                              >
                                 Email <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="email"
                                 className="form-control"
                                 id="c_email"
                                 value={signData.email}
                                 name="email"
                                 onChange={(e) => handleInput(e, setSignData)}
                                 placeholder="enter your email"
                              />
                              <p className="text-danger">{formErrors.email}</p>
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_password"
                                 className="text-black bold-text"
                              >
                                 Password <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="password"
                                 className="form-control"
                                 id="c_password"
                                 value={signData.password}
                                 name="password"
                                 onChange={(e) => handleInput(e, setSignData)}
                                 placeholder="create password"
                              />
                              <p className="text-danger">{formErrors.password}</p>
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_cPassword"
                                 className="text-black bold-text"
                              >
                                 Confirm Password{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="password"
                                 className="form-control"
                                 id="c_cPassword"
                                 name="confirmPassword"
                                 value={signData.confirmPassword}
                                 onChange={(e) => handleInput(e, setSignData)}
                                 placeholder="confirm your password"
                              />
                              <p className="text-danger">{formErrors.confirmPassword}</p>
                           </div>
                        </div>

                        <FileInput
                           namer="image"
                           label="Choose Image"
                           handleInputImage={handleInputImage}
                           type="image"
                           value={signData.image}
                        />
                              <p className="text-danger">{formErrors.image}</p>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <p>
                                 Already have an account?{" "}
                                 <Link
                                    to="/login"
                                    className="bold-text text-danger"
                                 >
                                    Login
                                 </Link>
                              </p>
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-lg-12">
                              {!loading && (
                                 <button className="btn btn-danger btn-block bold-text">
                                    Sign up
                                 </button>
                              )}
                              {loading && (
                                 <div className="d-flex justify-content-center">
                                    <LineWave
                                       color={loaderColor}
                                       height={loaderSize}
                                       width={loaderSize}
                                    />
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SignupForm;
