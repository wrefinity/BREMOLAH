import React from "react";
import { useSelector } from "react-redux";
import DiscoverSingles from "./DiscoverSingles";

const DiscoverCollections = () => {
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);

  const itemCount = () => {
    let proc = [];
    categories.forEach((cat) => {
      let num = products?.filter((pro) => pro.category === cat._id);
      proc.push({ len: num.length, name: cat.name, image: num[0]?.image });
    });
    return proc;
  };

  const categorizerMapper = itemCount().map((pro) => {
    return <DiscoverSingles key="{pro._id}" pro={pro} />;
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
