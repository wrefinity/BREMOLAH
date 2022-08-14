import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";

const OrderList = () => {
   const orders = useSelector((state) => state.payments);
   const [filter, setFilter] = useState();


   const [param] = useSearchParams();
   const search = param.get("search");
   let orderFilter;
   switch (filter) {
      case "pending":
         orderFilter = orders.filter(
            (order) => order.status.toLowerCase() === "pending"
         );
         break;
      case "delivered":
         orderFilter = orders.filter(
            (order) => order.status.toLowerCase() === "delivered"
         );
         break;
      default:
         orderFilter = orders;
         break;
   }

   const searchResult = orders
      .filter(
         (payment) =>
            payment.reference.reference.toLowerCase() === search?.toLowerCase()
      )
      .map((payment) => {
         return (
            <tr>
               <td className="product-name bold-text">{payment.email}</td>
               <td className="product-name bold-text">{payment.product}</td>
               <td className="bold-text">&#8358;{payment.amount}</td>
               <td className="bold-text">
                  {moment(payment.createdAt).format("DD/MM/YYYY")}
               </td>
               <td className="bold-text">{payment.reference.reference}</td>
               <td className="bold-text">{payment.status}</td>
               <td className="bold-text">
                  <Link to={`/order/${payment._id}`}>
                     <button className="btn btn-sm btn-success mr-1 mb-1">
                        Review
                     </button>
                  </Link>
               </td>
            </tr>
         );
      });

   const paymentsData = orderFilter
      .sort(
         (a, b) =>
            new moment(b.createdAt).format("YYYYMMDD") -
            new moment(a.createdAt).format("YYYYMMDD")
      )
      .map((payment) => {
         return (
            <tr>
               <td className="product-name bold-text">{payment.email}</td>
               <td className="product-name bold-text">{payment.product}</td>
               <td className="bold-text">&#8358;{payment.amount}</td>
               <td className="bold-text">
                  {moment(payment.createdAt).format("DD/MM/YYYY")}
               </td>
               <td className="bold-text">{payment.reference.reference}</td>
               <td className="bold-text">{payment.status}</td>
               <td className="bold-text">
                  <Link to={`/order/${payment._id}`}>
                     <button className="btn btn-sm btn-success mr-1 mb-1">
                        Review
                     </button>
                  </Link>
               </td>
            </tr>
         );
      });

   const transactionsInfo = () => (search ? searchResult : paymentsData);
   return (
      <div className="site-section">
         <div className="container">
            <div className="row mb-5">
               <form className="col-md-12" method="post">
                  <select
                     name="filter"
                     onChange={(e) => setFilter(e.target.value)}
                     value={filter}
                     className="form-control h6 m-1"
                     style={{
                        backgroundColor: "rgba(0,0,0,0.05)",
                     }}
                  >
                     <option selected value="all">
                        ALL
                     </option>
                     <option value="pending">PENDING</option>
                     <option value="delivered">DELIVERED</option>
                  </select>
                  <div className="site-blocks-table">
                     <table className="table table-bordered">
                        <thead>
                           <tr>
                              <th className="product-thumbnail">Email</th>
                              <th className="product-thumbnail">Product</th>
                              <th className="product-thumbnail">Amount</th>
                              <th className="product-thumbnail">Date</th>
                              <th className="product-thumbnail">Reference</th>
                              <th className="product-thumbnail">Status</th>
                              <th className="product-thumbnail">
                                 Review Order
                              </th>
                           </tr>
                        </thead>
                        <tbody>{transactionsInfo()}</tbody>
                     </table>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default OrderList;
