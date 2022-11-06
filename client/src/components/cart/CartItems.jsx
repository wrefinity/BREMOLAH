import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import {
  fetchCart,
  removeFromCart,
  decrementIncrementQuantity,
} from "../../actions/cart";
const CartItems = () => {
  const [cookies] = useCookies();
  const dispatch = useDispatch();
  const [param] = useSearchParams();
  const search = param.get("search");
  const cartProducts = useSelector((state) => state.cart);

  const user = cookies.user;
  useEffect(() => {
    dispatch(fetchCart(user._id, user.token));
  }, [dispatch, user]);

  const handleRemoveItem = (cart) => {
    dispatch(removeFromCart(cart._id, user.token));
  };
  const handleIncrementQuantity = (cart) => {
    const data = { tagger: "increment" };
    dispatch(decrementIncrementQuantity(cart.productId._id, data, user.token));
  };
  const handleDecrementQuantity = (cart) => {
    const data = { tagger: "decrement" };
    dispatch(decrementIncrementQuantity(cart.productId._id, data, user.token));
  };

  const searchResult = cartProducts.filter(
    (product) => product?.name?.toLowerCase() === search?.toLowerCase()
  );

  const cartItems = () => (search ? searchResult : cartProducts);

  const cartData = cartItems()
    .sort(
      (a, b) =>
        new moment(b.createdAt).format("YYYYMMDD") -
        new moment(a.createdAt).format("YYYYMMDD")
    )
    .map((product) => {
      return (
        <tr key={product._id}>
          <td className="bold-text">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid input_img"
            />
          </td>
          <td className="product-name">
            <h2 className="h5 text-black">{product.name}</h2>
          </td>
          <td className="h5 text-black">
            {moment(product.createdAt).format("DD/MM/YYYY")}
          </td>
          <td className="h5 text-black">&#8358;{product.price}</td>
          <td className="h5 text-black">
            <button
              onClick={() => handleDecrementQuantity(product)}
              className="btn btn-sm btn-default"
            >
              <span className="text-danger fw-bold h4">-</span>
            </button>
            <span className="ml-2 mr-2">{product.quantity}</span>
            <button
              onClick={() => handleIncrementQuantity(product)}
              className="btn btn-sm btn-default"
            >
              <span className="text-success fw-bold h4">+</span>
            </button>
          </td>
          <td className="h5 text-black">&#8358;{product.total}</td>
          <td>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleRemoveItem(product)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });
  const totalPrice = cartProducts
    .map((cart) => cart.total)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="site-blocks-table">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Image</th>
                    <th className="product-name">Product</th>
                    <th className="product-name">Date Added</th>
                    <th className="product-price">Price</th>
                    <th className="product-price">Quantity</th>
                    <th className="product-price">SubTotal</th>
                    <th className="product-remove">Action</th>
                  </tr>
                </thead>
                <tbody>{cartData}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="row mb-5">
              <div className="col-md-6">
                <Link to="/shop">
                  <button className="btn btn-danger btn-sm btn-block">
                    Continue Shopping
                  </button>
                </Link>
              </div>
              <div className="col-md-6">
                <Link to={cartData.length <= 0 ? `/shop`: `/payment` }>
                  <button
                    className="btn btn-sm btn-success mr-1"
                    data-toggle="modal"
                  >
                    CheckOut
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">
                      Cart Total &#8358; {totalPrice}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
