import React, { Fragment, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { AddToCart } from "../../actions/cart";

const ShopSingleData = () => {
   const [cookies] = useCookies();
   const user = cookies.user;
   const { productId } = useParams();
   const products = useSelector((state) => state.products);
   const productArray = products.filter((product) => product._id === productId);
   const product = productArray[0];
   const [cart] = useState({
      productId: product?._id,
      quantity: 1,
   });
   const dispatch = useDispatch();

   const handleAddToCart = async () => {
      const res = await dispatch(AddToCart(cart, user.token));
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
                              src={product?.image}
                              alt={product?.name}
                              className="img-fluid"
                           />
                        </p>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <h2 className="text-black">{product?.name}</h2>
                     <p className="mb-4">{product?.description}</p>
                     <p>
                        <strong className="text-primary h4">
                           &#8358;{product?.price}
                        </strong>
                     </p>
                     <p>
                        <button
                           onClick={handleAddToCart}
                           className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary m-3"
                        >
                           Add To Cart
                        </button>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};
export default ShopSingleData;
