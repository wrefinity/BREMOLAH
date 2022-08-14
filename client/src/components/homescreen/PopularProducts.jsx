import React from "react";
import { useSelector } from "react-redux";

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
    return (
      <div className="col-lg-4 col-md-6 item-entry mb-4">
        <a href="/login" className="product-item md-height bg-gray d-block">
          <img src={pro.image} alt={pro._id} className="img-fluid" />
        </a>
        <h2 className="item-title text-center">
          <p className="text-dark ">{pro.name}</p>
          <strong className="item-price">&#8358; {pro.price}</strong>
        </h2>
      </div>
    );
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
