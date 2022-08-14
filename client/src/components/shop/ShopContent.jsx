import React, { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import { handleInput } from "../../helpers/input";

const ShopContent = () => {
   const [menu, setMenu] = useState({
      filter: "ALL",
      category: "",
      subCategory: "",
   });

   const [cookies] = useCookies();

   const user = cookies.user;
   const [param] = useSearchParams();
   const search = param.get("search");

   const products = useSelector((state) => state.products);

   const categories = useSelector((state) => state.categories);
   const subCategories = useSelector((state) => state.subCategories);

   const subCategoriesFilter = subCategories.filter(
      (subCat) => subCat.category === menu.category
   );

   //FILTER FOR PRODUCTS BASED ON CATEGORY
   const productsCategoryFilter = products.filter(
      (product) => product.category === menu.category
   );

   //FILTER FOR PRODUCTS BASED ON SUB CATEGORY
   const productsSubCatFilter = products.filter(
      (product) =>
         product.subCategory === menu.subCategory &&
         product.category === menu.category
   );

   //SEARCHED PRODUCTS
   const searchResult = products.filter(
      (product) => product.name.toLowerCase() === search?.toLowerCase()
   );

   //CATEGORIES OPTION DATA
   const categoriesOption = categories
      .sort((a, b) => {
         if (a.name < b.name) return -1;
         if (a.name > b.name) return 1;
         return 0;
      })
      .map((category) => {
         return (
            <option key={category._id} value={category._id}>
               {category.name.toUpperCase()}
            </option>
         );
      });

   //SUB CATEGORIES OPTION DATA
   const subCategoriesOption = subCategoriesFilter
      .sort((a, b) => {
         if (a.name < b.name) return -1;
         if (a.name > b.name) return 1;
         return 0;
      })
      .map((subCategory) => {
         return (
            <option key={subCategory._id} value={subCategory._id}>
               {subCategory.name.toUpperCase()}
            </option>
         );
      });

   //SHOP ITEMS
   const shopItems = () => {
      if (search) {
         return searchResult;
      } else {
         if (menu.filter.toUpperCase() === "ALL") {
            return products;
         } else if (
            menu.filter.toUpperCase() === "CATEGORY" &&
            menu.subCategory === ""
         ) {
            return productsCategoryFilter;
         } else if (
            menu.filter.toUpperCase() === "CATEGORY" &&
            menu.subCategory !== ""
         ) {
            return productsSubCatFilter;
         }
      }
   };
   const Products = shopItems()
      .sort((a, b) => {
         if (a.name < b.name) return -1;
         if (a.name > b.name) return 1;
         return 0;
      })
      .map((product) => {
         return (
            <div className="col-lg-4 col-md-4 item-entry mb-4">
               <Link to={user ? `/shop/${product._id}` : "/login"}>
                  <p className="product-item md-height bg-gray d-block">
                     <img
                        src={product.image}
                        alt={product.name.toUpperCase()}
                     />
                  </p>
                  <h2 className="item-title">
                     <p>{product.name.toUpperCase()}</p>
                  </h2>
                  <strong className="item-price">&#8358;{product.price}</strong>
               </Link>
            </div>
         );
      });

   return (
      <Fragment>
         <div className="site-section">
            <div className="container">
               <div className="row mb-5">
                  <div className="col-md-12 order-1">
                     <div className="row align">
                        <div className="col-md-12 mb-5">
                           <div className="float-md-left"></div>
                           <div className="d-flex">
                              {!search && (
                                 <Fragment>
                                    <select
                                       name="filter"
                                       onChange={(e) => handleInput(e, setMenu)}
                                       value={menu.filter}
                                       className="form-control h6 m-1"
                                       style={{
                                          backgroundColor: "rgba(0,0,0,0.05)",
                                       }}
                                    >
                                       <option selected>ALL</option>
                                       <option>CATEGORY</option>
                                    </select>
                                    {menu.filter.toUpperCase() ===
                                       "CATEGORY" && (
                                       <Fragment>
                                          <select
                                             name="category"
                                             onChange={(e) =>
                                                handleInput(e, setMenu)
                                             }
                                             className="form-control h6 m-1"
                                             value={menu.category}
                                             style={{
                                                backgroundColor:
                                                   "rgba(0,0,0,0.05)",
                                             }}
                                          >
                                             <option selected>
                                                Select category
                                             </option>
                                             {categoriesOption}
                                          </select>

                                          <select
                                             name="subCategory"
                                             onChange={(e) =>
                                                handleInput(e, setMenu)
                                             }
                                             className="form-control h6 m-1"
                                             value={menu.subCategory}
                                             style={{
                                                backgroundColor:
                                                   "rgba(0,0,0,0.05)",
                                             }}
                                          >
                                             <option selected>
                                                Select sub category
                                             </option>
                                             {subCategoriesOption}
                                          </select>
                                       </Fragment>
                                    )}
                                 </Fragment>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="row mb-5">{Products}</div>
                     <div className="row">
                        <div className="col-md-12 text-center"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};
export default ShopContent;
