import React from "react";

const MostRated = () => {
  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="title-section text-center mb-5 col-12">
            <h2 className="text-uppercase">Most Rated</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 block-3">
            <div className="nonloop-block-3 owl-carousel">
              <div className="item">
                <div className="item-entry">
                  <a
                    href="#"
                    className="product-item md-height bg-gray d-block"
                  >
                    <img
                      src="images/model_1.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <h2 className="item-title">
                    <a href="#">Smooth Cloth</a>
                  </h2>
                  <strong className="item-price">
                    <del>$46.00</del> $28.00
                  </strong>
                  <div className="star-rating">
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="item-entry">
                  <a
                    href="#"
                    className="product-item md-height bg-gray d-block"
                  >
                    <img
                      src="images/prod_3.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <h2 className="item-title">
                    <a href="#">Blue Shoe High Heels</a>
                  </h2>
                  <strong className="item-price">
                    <del>$46.00</del> $28.00
                  </strong>

                  <div className="star-rating">
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="item-entry">
                  <a
                    href="#"
                    className="product-item md-height bg-gray d-block"
                  >
                    <img
                      src="images/model_5.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <h2 className="item-title">
                    <a href="#">Denim Jacket</a>
                  </h2>
                  <strong className="item-price">
                    <del>$46.00</del> $28.00
                  </strong>

                  <div className="star-rating">
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="item-entry">
                  <a
                    href="#"
                    className="product-item md-height bg-gray d-block"
                  >
                    <img
                      src="images/prod_1.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <h2 className="item-title">
                    <a href="#">Leather Green Bag</a>
                  </h2>
                  <strong className="item-price">
                    <del>$46.00</del> $28.00
                  </strong>
                  <div className="star-rating">
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="item-entry">
                  <a
                    href="#"
                    className="product-item md-height bg-gray d-block"
                  >
                    <img
                      src="images/model_7.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <h2 className="item-title">
                    <a href="#">Yellow Jacket</a>
                  </h2>
                  <strong className="item-price">$58.00</strong>
                  <div className="star-rating">
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
                    <span className="icon-star2 text-warning"></span>
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

export default MostRated;
