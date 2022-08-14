import React from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

const Transactions = () => {
   const payments = useSelector((state) => state.payments);
   const [cookies] = useCookies();
   const user = cookies.user;

   const [param] = useSearchParams();
   const search = param.get("search");

   const filteredPayments = user.isAdmin
      ? payments
      : payments.filter((payment) => payment.userId === user._id);

   const searchResult = filteredPayments.filter(
      (payment) =>
         payment.reference.reference.toLowerCase() === search?.toLowerCase()
   );

   const transactionsInfo = () => (search ? searchResult : filteredPayments);

   const paymentsData = transactionsInfo()
      .sort(
         (a, b) =>
            new moment(b.createdAt).format("YYYYMMDD") -
            new moment(a.createdAt).format("YYYYMMDD")
      )
      .map((payment) => {
         return (
            <tr>
               <td className="product-name bold-text">{payment.product}</td>
               <td className="bold-text">&#8358;{payment.amount}</td>
               <td className="bold-text">
                  {moment(payment.createdAt).format("DD/MM/YYYY")}
               </td>
               <td className="bold-text">{payment.reference.reference}</td>
               <td className="bold-text">{payment.reference.status}</td>
            </tr>
         );
      });

   return (
      <div className="site-section">
         <div className="container">
            <div className="row mb-5">
               <form className="col-md-12" method="post">
                  <div className="site-blocks-table">
                     <table className="table table-hover">
                        <thead>
                           <tr>
                              <th className="product-thumbnail">Product</th>
                              <th className="product-thumbnail">Amount</th>
                              <th className="product-thumbnail">Date</th>
                              <th className="product-thumbnail">Reference</th>
                              <th className="product-thumbnail">Status</th>
                           </tr>
                        </thead>
                        <tbody>{paymentsData}</tbody>
                     </table>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Transactions;
