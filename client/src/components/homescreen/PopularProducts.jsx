import React from "react";
import { useSelector } from "react-redux";
import ProductSingle from "./ProductSingle";

const PopularProducts = () => {
  const products = useSelector((state) => state.products);
  const search_word = "popular";

  const searchPopular = products?.reduce((temp, product) => {
    if (
      product?.description.toLowerCase().includes(search_word) &&
      temp.length < 10
    )
      temp.push(product);
    return temp;
  }, []);

  const displayPopular = searchPopular.map((pro) => {
    return <ProductSingle key={pro._id} pro={pro} />;
  });

  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="title-section mb-5 col-12">
            <h2 className="text-uppercase">Popular Products</h2>
          </div>
        </div>
        <div className="row">{displayPopular}</div>
      </div>
    </div>
  );
};
export default PopularProducts;
