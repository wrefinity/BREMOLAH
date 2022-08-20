import React, { Fragment } from "react";
// import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { AddToCart } from "../../actions/cart";
import { useParams } from "react-router-dom";

const ShopSingleData = () => {
  //   const [cookies] = useCookies();
  //   const user = cookies.user;
  const { productId } = useParams();
  const products = useSelector((state) => state.products);
  const productArray = products.filter((product) => product._id === productId);
  const product = productArray[0];
  const text = `Hi, i want to order for the product: ${product?.name} for the price: ${product?.price} with the description: ${product?.description}`;
  // const [cart] = useState({
  //    productId: product?._id,
  //    quantity: 1,
  // });
  // const dispatch = useDispatch();

  // const handleAddToCart = async () => {
  //    const res = await dispatch(AddToCart(cart, user.token));
  //    if (res.status === 200) {
  //       toast.success(`${res.data}`, {autoClose: 2000});
  //    } else {
  //       toast.error(`${res.data}`, {autoClose: 2000});
  //    }
  // };
  // onClick={handleAddToCart}

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
                <a
                  href={`https://api.whatsapp.com/send?phone=2348068659608&text=${text}`}
                >
                  <button className="buy-now btn btn-sm height-auto px-4 py-3 btn-primary m-3">
                    Add To Cart
                  </button>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default ShopSingleData;
