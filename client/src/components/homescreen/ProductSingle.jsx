import React from 'react'

const ProductSingle = ({pro}) => {
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
  )
}

export default ProductSingle