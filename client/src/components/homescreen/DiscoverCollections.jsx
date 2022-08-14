import React from "react";
import { useSelector } from "react-redux";

const DiscoverCollections = () => {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  const itemCount = () => {
    let proc = [];
    categories.forEach((cat) => {
      let num = products?.filter((pro) => pro.category === cat._id);
      proc.push({ len: num.length, name: cat.name, image: num[0].image });
    });
    return proc;
  };

  const categorizerMapper = itemCount().map((pro) => {
    return (
      <div className="col-lg-4">
        <div className="product-item sm-height bg-gray mb-4">
          <a href="/" className="product-category">
            {pro.name} <span>{pro.len} items</span>
          </a>
          <img src={pro.image} alt={pro.len} className="img-fluid" />
        </div>
      </div>
    );
  });
  return (
    <div className="site-section">
      <div className="container">
        <div className="title-section mb-5">
          <h2 className="text-uppercase">
            <span className="d-block">Discover</span> Breemolah Collections
          </h2>
        </div>
        <div className="row align-items-stretch">{categorizerMapper}</div>
      </div>
    </div>
  );
};
export default DiscoverCollections;
