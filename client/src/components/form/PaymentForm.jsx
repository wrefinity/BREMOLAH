import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import {toast} from "react-toastify"
import { useNavigate} from "react-router-dom";
import { handleInput, validateEmpty } from "../../helpers/input";
import PaymentButton from "../../paystackIntegration";
import moment from "moment";

const PaymentForm = () => {
   const [cookies] = useCookies();
   const navigate = useNavigate();
   const user = cookies.user;

   const cartProducts = useSelector((state) => state.cart);
   const totalPrice = cartProducts
   .map((cart) => cart.total)
   .reduce((a, b) => a + b, 0);


   const cartData = cartProducts
   .sort(
      (a, b) =>
         new moment(b.createdAt).format("YYYYMMDD") -
         new moment(a.createdAt).format("YYYYMMDD")
   )
   .map((product) => {
      return (
         <tr>
            <td className="text-black">{product.name} </td>
            <td className="text-black">{product.quantity}</td>
            <td className="text-black">&#8358; {product.price}</td>
         </tr>
      )
   })


   const [payment, setPayment] = useState({
      email: user?.email,
      userId: user?._id,
      amount: totalPrice,
      products: cartProducts,
      address: "",
      phoneNo: "",
      country: "",
      state: "",
      city: "",
      zip_code: "",
      fullname: user?.fullname,
   });
   const [checked, setChecked] = useState(false);

   const reset = () => {
      setPayment({
         email: "",
         userId: "",
         amount: [],
         products: "",
         address: "",
         phoneNo: "",
         country: "",
         state: "",
         city: "",
         zip_code: "",
         fullname: "",
      });
   };

   const checkPaymentForm = () => {
      const validate = validateEmpty(payment);
     
      if(validate && validate.hasOwnProperty("all")){
         toast.error(`${validate.all}`, {autoClose:2000})
      }
      else {
        setChecked(true);
      }
   };
   useEffect(() => {
      if (!payment.amount) {
         navigate(-1);
      }
   });

   return (
      <div className="site-section">
         <div className="container">
            <div className="row">
               <div className="col-md-4">
               <div className="site-blocks-table">
                     <table className="table table-sm table-hover">
                        <thead>
                           <tr>
                              <th colSpan={3}> Product Summary</th>
                              
                           </tr>
                           <tr>
                              <th >Product</th>
                              <th >Quantity</th>
                              <th >Price</th>
                           </tr>
                        </thead>
                        <tbody>{cartData}</tbody>
                     </table>
                  </div>

               </div>
               <div className="col-md-8">
                  <div>
                     <div className="p-3 p-lg-5 border">
                        <div className="container p-5 mb-4 bg-danger">
                           <h2 className="h3 mb-3 text-white text-center bold-text">
                              Payment
                           </h2>
                        </div>
                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_name"
                                 className="text-black bold-text"
                              >
                                 Name <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 name="fullname"
                                 value={payment.fullname}
                                 className="form-control"
                                 id="c_name"
                                 disabled
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_product"
                                 className="text-black bold-text"
                              >
                                 Email <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_product"
                                 name="product"
                                 value={payment.email}
                                 disabled
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_product"
                                 className="text-black bold-text"
                              >
                                 Amount(NGN){" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_product"
                                 name="amount"
                                 value={payment.amount}
                                 disabled
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_deliver_address"
                                 className="text-black bold-text"
                              >
                                 Deliver Address{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 name="address"
                                 value={payment.address}
                                 onChange={(e) => handleInput(e, setPayment)}
                                 id="c_deliver_address"
                                 placeholder="create deliver address"
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_phone-number"
                                 className="text-black bold-text"
                              >
                                 Phone Number{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 name="phoneNo"
                                 id="c_phone-number"
                                 value={payment.phoneNo}
                                 onChange={(e) => handleInput(e, setPayment)}
                                 placeholder="+2349121257575"
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_country"
                                 className="text-black bold-text"
                              >
                                 Country <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_country"
                                 name="country"
                                 value={payment.country}
                                 onChange={(e) => handleInput(e, setPayment)}
                                 placeholder="enter country"
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_state"
                                 className="text-black bold-text"
                              >
                                 State <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_state"
                                 placeholder="enter state"
                                 name="state"
                                 value={payment.state}
                                 onChange={(e) => handleInput(e, setPayment)}
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_city"
                                 className="text-black bold-text"
                              >
                                 City/town{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_city"
                                 placeholder="enter city/town"
                                 name="city"
                                 value={payment.city}
                                 onChange={(e) => handleInput(e, setPayment)}
                              />
                           </div>
                        </div>

                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 htmlFor="c_zip-code"
                                 className="text-black bold-text"
                              >
                                 Zip Code <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="text"
                                 className="form-control"
                                 id="c_zip-code"
                                 placeholder="enter zip code"
                                 name="zip_code"
                                 value={payment.zip_code}
                                 onChange={(e) => handleInput(e, setPayment)}
                              />
                           </div>
                        </div>

                        {!checked && (
                           <div className="form-group row">
                              <div className="col-lg-12">
                                 <button
                                    onClick={checkPaymentForm}
                                    className="btn btn-warning btn-lg btn-block bold-text"
                                 >
                                    Done
                                 </button>
                              </div>
                           </div>
                        )}
                        {checked && (
                           <div className="form-group row">
                              <div className="col-lg-12">
                                 <PaymentButton
                                    payment={payment}
                                    reset={reset}
                                    cartItemId={payment.userId}
                                 />
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
export default PaymentForm;
