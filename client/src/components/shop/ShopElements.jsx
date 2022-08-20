import React from "react";
import { useCookies } from "react-cookie";
import { Link} from "react-router-dom";

const ShopElements = ({ product }) => {
    const [cookies] = useCookies();
    const user = cookies.user;
  return (
    <div className="col-lg-4 col-md-4 item-entry mb-4">
      <Link to={user ? `/shop/${product._id}` : "/login"}>
        <p className="product-item md-height bg-gray d-block">
          <img src={product.image} alt={product.name.toUpperCase()} />
        </p>
        <h2 className="item-title">
          <p>{product.name.toUpperCase()}</p>
        </h2>
        <strong className="item-price">&#8358;{product.price}</strong>
      </Link>
    </div>
  );
};

export default ShopElements;
