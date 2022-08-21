import React from "react";

const DiscoverSingles = ({ pro }) => {
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
};

export default DiscoverSingles;
