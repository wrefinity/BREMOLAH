import React, { Fragment } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import { toast } from "react-toastify";

import urlRoutes from "../../actions/routesAll";
import { updatePayments } from "../../actions/payment";

const OrderSingleData = () => {
   const [cookies] = useCookies();
   const user = cookies.user;
   const { orderId } = useParams();
   const orders = useSelector((state) => state.payments);
   const orderArray = orders.filter((order) => order._id === orderId);
   const order = orderArray[0];
   const dispatch = useDispatch();

   const status = order?.status === "pending" ? "delivered" : "pending";

   const handleChangeStatus = async () => {
      const res = await dispatch(
         updatePayments({ ...order, status }, user.token)
      );
      if (res.status === 200) {
         toast.success(`${res.data}`, {autoClose: 2000});
      } else {
         toast.error(`${res.data}`, {autoClose: 2000});
      }
   };

   return (
      <Fragment>
         <div className="site-section">
            <div className="container">
               <div className="row">
                  <div className="col-md-6">
                     <div className="item-entry">
                        <p className="product-item md-height bg-gray d-block">
                           <img
                              src={`${urlRoutes.baseUrl}${order?.image}`}
                              alt={order?.name}
                              className="img-fluid"
                           />
                        </p>
                     </div>
                  </div>
                  <div
                     className="col-md-6 px-4"
                     style={{ textColor: "rgba(0,0,0,0.8)" }}
                  >
                     <h4 className="">NAME: {order?.fullname}</h4>
                     <h4 className="">PRODUCT: {order?.product}</h4>
                     <h4 className="">EMAIL: {order?.email}</h4>
                     <h4 className="">PAYMENT: {order?.reference?.status}</h4>
                     <h4 className="">
                        DATE: {moment(order?.createdAt).format("DD/MM/YYYY")}
                     </h4>
                     <h4 className="">CONTACT: {order?.phoneNo}</h4>
                     <h4 className="">COUNTRY: {order?.country}</h4>
                     <h4 className="">STATE: {order?.state}</h4>
                     <h4 className="">CITY: {order?.city}</h4>
                     <h4 className="">ADDRESS: {order?.address}</h4>
                     <h4 className="">
                        PAYMENT REFERENCE: {order?.reference?.reference}
                     </h4>
                     <p className="height-auto h4 fw-bold">
                        <p className="">
                           STATUS:{" "}
                           <span
                              className={
                                 order?.status === "pending"
                                    ? "text-warning"
                                    : "text-success"
                              }
                           >
                              {" "}
                              {order?.status}
                           </span>
                        </p>
                     </p>
                     <button
                        onClick={handleChangeStatus}
                        className="buy-now btn btn-sm px-4, py-3 height-auto btn-danger m-3"
                     >
                        Change Status
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};
export default OrderSingleData;
