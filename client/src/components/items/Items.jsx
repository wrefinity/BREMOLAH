import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { deleteProduct, getProducts } from "../../actions/product";
import { useCookies } from "react-cookie";
import { truncate } from "../../helpers/input";

const Items = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getProducts());
   }, [dispatch]);

   const products = useSelector((state) => state.products);
   const [cookies] = useCookies();
   const user = cookies.user;

   const [param] = useSearchParams();
   const search = param.get("search");

   const categories = useSelector((state) => state.categories);
   const subCategories = useSelector((state) => state.subCategories);

   const handleDeleteProduct = async (id) => {
      await dispatch(deleteProduct(id, user.token));
   };

   //SEARCHED PRODUCTS
   const searchResult = products.filter(
      (product) => product.name.toLowerCase() === search?.toLowerCase()
   );

   const Products = () => (search ? searchResult : products);

   //PRODUCT LIST
   const productsData = Products()
      .sort((a, b) => {
         if (a.name < b.name) return -1;
         if (a.name > b.name) return 1;
         return 0;
      })
      .map((pro) => {
         return (
            <tr>
               <td className="product-name bold-text">{pro.name}</td>
               <td className="bold-text">
                  <img
                     src={pro.image}
                     alt="cart item"
                     className="img-fluid"
                  />
               </td>
               <td className="bold-text">&#8358;{pro.price}</td>
               <td className="bold-text">
                  {
                     categories.filter((cat) => pro.category === cat._id)[0]
                        ?.name
                  }
               </td>
               <td className="bold-text">
                  {
                     subCategories.filter(
                        (subCat) => pro.subCategory === subCat._id
                     )[0]?.name
                  }
               </td>
               <td className="bold-text">{truncate(pro.description, 40)} </td>
               <td className="bold-text">
                  <Link to={`/update-product/${pro._id}`}>
                     <button className="btn btn-sm btn-success mr-1 mb-1">
                        Update
                     </button>
                  </Link>
                  <button
                     className="btn btn-sm btn-danger"
                     onClick={() => {
                        handleDeleteProduct(pro._id);
                     }}
                  >
                     Delete
                  </button>
               </td>
            </tr>
         );
      });

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
                              <th className="product-thumbnail">Image</th>
                              <th className="product-thumbnail">Price</th>
                              <th className="product-thumbnail">Category</th>
                              <th className="product-thumbnail">
                                 Sub Category
                              </th>
                              <th className="product-thumbnail">Description</th>
                              <th className="product-thumbnail">action</th>
                           </tr>
                        </thead>
                        <tbody>{productsData}</tbody>
                     </table>
                  </div>
                  <Link to="/add-item">
                     <button className="btn btn-lg btn-danger">
                        Add Product
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Items;
