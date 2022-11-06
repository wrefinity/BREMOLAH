import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";

import { handleInput, validateEmpty } from "../../helpers/input";
import { deleteCat, updateCat } from "../../actions/category";
import { useNavigate } from "react-router-dom";
const Categories = () => {
   const [category, setCategory] = useState({
      name: "",
      description: "",
      _id: "",
   });
   const [formErrors, setFormErrors] = useState({});
   const [isSubmit, setIsSubmit] = useState(false);

   const dispatch = useDispatch();
   const [user] = useCookies("user");
   const categories = useSelector((state) => state.categories);
   const closeRef = useRef();
   const referal = useRef();
   const navigate = useNavigate();

   const [param] = useSearchParams();
   const search = param.get("search");

   const reset = () => {
      setCategory({
         name: "",
         description: "",
         _id: "",
      });
   };

   const searchResult = categories.filter(
      (cat) => cat.name.toLowerCase() === search?.toLowerCase()
   );

   const Categories = () => (search ? searchResult : categories);

   const categoriesData = Categories()
      .sort((a, b) => {
         if (a.name < b.name) return -1;
         if (a.name > b.name) return 1;
         return 0;
      })
      .map((cat) => {
         return (
            <tr key={cat._id}>
               <td className="product-name bold-text">{cat.name}</td>
               <td className="bold-text">
                  {moment(cat.createdAt).format("DD/MM/YYYY")}
               </td>
               <td className="bold-text">{cat.description}</td>
               <td className="bold-text">
                  <button
                     className="btn btn-sm btn-success mr-1"
                     data-toggle="modal"
                     data-target="#updateCategoryModal"
                     onClick={() => setCategory({ ...category, ...cat })}
                  >
                     Update
                  </button>
                  <button
                     className="btn btn-sm btn-danger"
                     onClick={() => {
                        handleDeleteCategory(cat._id);
                     }}
                  >
                     Delete
                  </button>
               </td>
            </tr>
         );
      });

   const handleUpdateCategory = async (e) => {
      e.preventDefault();
      setFormErrors(validateEmpty(category));
      setIsSubmit(true);
   };

   useEffect(() => {
      referal.current();
   }, [formErrors]);

   const handleDeleteCategory = async (id) => {
      await dispatch(deleteCat(id, user.user.token));
   };

   const catUp = async () => {
      if (Object.keys(formErrors).length === 0 && isSubmit) {
         dispatch(updateCat(category, user.user.token, toast, closeRef));
         reset();
      }
   };
   referal.current = catUp;

   return (
      <div className="site-section">
         <div className="container">
            <div className="row mb-5">
               <div className="col-md-12">
                  <div className="site-blocks-table">
                     <table className="table table-bordered">
                        <thead>
                           <tr>
                              <th className="product-thumbnail">Name</th>
                              <th className="product-thumbnail">
                                 Date Created
                              </th>
                              <th className="product-thumbnail">Description</th>
                              <th className="product-thumbnail">action</th>
                           </tr>
                        </thead>
                        <tbody>{categoriesData}</tbody>
                     </table>
                  </div>
                  <button
                     className="btn btn-lg btn-danger"
                     onClick={() => navigate("/add-category")}
                  >
                     Add Category
                  </button>
               </div>
            </div>
         </div>

         <div
            className="modal fade mt-5"
            id="updateCategoryModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ marginTop: "10rem", zIndex: 10000 }}
         >
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">
                        Update Category
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
                     <form onSubmit={handleUpdateCategory}>
                        <div className="p-3 p-lg-5 border">
                           <div className="form-group row">
                              <div className="col-md-12">
                                 <label
                                    htmlFor="c_name"
                                    className="text-black bold-text"
                                 >
                                    Category Name{" "}
                                    <span className="text-danger">*</span>
                                 </label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    id="c_name"
                                    name="name"
                                    value={category.name}
                                    placeholder="enter new name"
                                    onChange={(e) => {
                                       handleInput(e, setCategory);
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="form-group row">
                              <div className="col-md-12">
                                 <label
                                    htmlFor="c_name"
                                    className="text-black bold-text"
                                 >
                                    Description{" "}
                                    <span className="text-danger">*</span>
                                 </label>
                                 <textarea
                                    id="c_message"
                                    cols="30"
                                    rows="7"
                                    name="description"
                                    value={category.description}
                                    className="form-control"
                                    onChange={(e) =>
                                       handleInput(e, setCategory)
                                    }
                                 ></textarea>
                              </div>
                              <p className="h5 text-danger m-2">
                                 {formErrors?.all}
                              </p>
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
                        onClick={handleUpdateCategory}
                        className="btn btn-danger"
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

export default Categories;