import React, { useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";

import { handleInput } from "../../helpers/input";
import { deleteUser, updateUser } from "../../actions/users";
import { toast } from "react-toastify";

const Users = () => {
   const [usersData, setUsersData] = useState({
      email: "",
      _id: "",
   });
   const dispatch = useDispatch();
   const [user] = useCookies("user");
   const users = useSelector((state) => state.users);
   const closeRef = useRef();

   const [param] = useSearchParams();
   const search = param.get("search");

   const reset = () => {
      setUsersData({
         email: "",
         _id: "",
      });
   };

   const searchResult = users.filter(
      (user) =>
         user.email.toLowerCase() === search?.toLowerCase() ||
         user.fullname.toLowerCase() === search?.toLowerCase()
   );

   const usersInfo = () => (search ? searchResult : users);

   const usersTableData = usersInfo()
      .sort((a, b) => {
         if (a.fullname < b.fullname) return -1;
         if (a.fullname > b.fullname) return 1;
         return 0;
      })
      .map((user) => {
         return (
            <tr key={user._id}>
               <td className="product-name bold-text">{user.fullname}</td>
               <td className="bold-text">{user.email}</td>
               <td className="bold-text">
                  {moment(user.createdAt).format("DD/MM/YYYY")}
               </td>
               <td className="bold-text">
                  <button
                     className="btn btn-sm btn-success mr-1"
                     data-toggle="modal"
                     data-target="#updateUsersModal"
                     onClick={() => setUsersData({ ...usersData, ...user })}
                  >
                     Update
                  </button>
                  <button
                     className="btn btn-sm btn-danger"
                     onClick={() => {
                        handleDeleteUsers(user._id);
                     }}
                  >
                     Delete
                  </button>
               </td>
            </tr>
         );
      });

   const handleUpdateUsers = async (e) => {
      e.preventDefault();
      if (usersData.email === "") {
         toast.error("Fill in new email field", {autoClose: 2000});
      } else if (usersData._id === "") {
         toast.error("Refresh page and try again", {autoClose: 2000});
      } else {
         const res = await dispatch(updateUser(usersData, user.user.token));
         reset();
         if (res.status === 200) {
            toast.success("user updated successfully", {autoClose: 2000});
            setTimeout(() => {
               closeRef.current.click();
            }, 2000);
         } else {
            toast.error(`${res.data.message}`, {autoClose: 2000});
         }
      }
   };

   const handleDeleteUsers = async (id) => {
      await dispatch(deleteUser(id, user.user.token));
   };
   return (
      <div className="site-section">
         <div className="container">
            <div className="row mb-5">
               <div className="col-md-12">
                  <div className="site-blocks-table">
                     <table className="table table-bordered">
                        <thead>
                           <tr>
                              <th className="product-thumbnail">Fullname</th>
                              <th className="product-thumbnail">Email</th>
                              <th className="product-thumbnail">
                                 Date Created
                              </th>
                              <th className="product-thumbnail">action</th>
                           </tr>
                        </thead>
                        <tbody>{usersTableData}</tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>

         <div
            className="modal fade mt-5"
            id="updateUsersModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ marginTop: "10rem", zIndex: 10000 }}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">
                        Update User
                     </h5>
                     <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                     >
                        <span aria-hidden="true">&times;</span>
                     </button>
                  </div>
                  <div className="modal-body">
                     <form>
                        <div className="form-group row">
                           <div className="col-md-12">
                              <label
                                 for="c_email"
                                 className="text-black bold-text"
                              >
                                 New Email{" "}
                                 <span className="text-danger">*</span>
                              </label>
                              <input
                                 type="email"
                                 className="form-control"
                                 id="c_email"
                                 name="email"
                                 placeholder="enter new email"
                                 value={usersData.email}
                                 onChange={(e) => handleInput(e, setUsersData)}
                              />
                           </div>
                        </div>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        ref={closeRef}
                     >
                        Close
                     </button>
                     <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleUpdateUsers}
                     >
                        Update
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Users;
