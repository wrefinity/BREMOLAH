import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  qntyIncrement,
  qntyDecrement,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../../helpers/input";
import { toast } from "react-toastify";
import { createProducts } from "../../actions/product";
import { FileInput } from "./formHelpers";

const AddItemsForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discountPrice: "",
    quantity: 0,
    color: "",
    category: "",
    subCategory: "",
    description: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  const user = cookies.user;
  const referal = useRef();

  const handleInputImage = (name, value) => {
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const reset = () => {
    setProduct({
      name: "",
      price: "",
      discountPrice: "",
      quantity: 0,
      color: "",
      category: "",
      subCategory: "",
      description: "",
      image: null,
    });
  };

  const categoriesOption = categories
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .map((category) => {
      return (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      );
    });

  const subCategoriesOption = subCategories
    .filter((subCat) => subCat.category === product.category)
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .map((subCategory) => {
      return (
        <option key={subCategory._id} value={subCategory._id}>
          {subCategory.name}
        </option>
      );
    });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validateEmpty(product));
    setIsSubmit(true);
  };

  useEffect(() => {
    referal.current();
  }, [formErrors]);

  const aditem = async () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createProducts(product, user.token, toast));
      reset();
    }
    setLoading(false);
  };

  referal.current = aditem;

  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form onSubmit={handleAddProduct}>
              <div className="p-3 p-lg-5 border">
                <div className="container p-5 mb-4 bg-danger">
                  <h2 className="h3 mb-3 text-white text-center bold-text">
                    Add Product
                  </h2>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_name" className="text-black bold-text">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_name"
                      name="name"
                      value={product.name}
                      onChange={(e) => handleInput(e, setProduct)}
                      placeholder="enter product name"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black bold-text">
                      Price(NGN) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="enter price"
                      name="price"
                      value={product.price}
                      onChange={(e) => handleInput(e, setProduct)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black bold-text">
                      Discount Price(NGN){" "}
                      <span className="text-success">Optional</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={product.discountPrice}
                      placeholder="enter discount price"
                      name="discountPrice"
                      onChange={(e) => handleInput(e, setProduct)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label
                      htmlFor="c_quantity"
                      className="text-black bold-text"
                    >
                      Quantity <span className="text-danger">*</span>
                    </label>
                    <div
                      className="input-group mb-3"
                      style={{ maxWidth: "120px" }}
                    >
                      <div className="input-group-prepend">
                        <button
                          className="btn btn-outline-primary js-btn-minus"
                          type="button"
                          name="quantity"
                          onClick={(e) => {
                            qntyDecrement(
                              e,
                              setProduct,
                              product,
                              product.quantity
                            );
                          }}
                        >
                          -
                        </button>
                      </div>
                      <input
                        type="number"
                        className="form-control text-center"
                        value={product.quantity}
                        name="quantity"
                        onChange={(e) => handleInput(e, setProduct)}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-primary js-btn-plus"
                          type="button"
                          name="quantity"
                          onClick={(e) =>
                            qntyIncrement(
                              e,
                              setProduct,
                              product,
                              product.quantity
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black bold-text">
                      color <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter color"
                      value={product.color}
                      name="color"
                      onChange={(e) => handleInput(e, setProduct)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black bold-text">
                      Category <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="category"
                      onChange={(e) => {
                        handleInput(e, setProduct);
                      }}
                      value={product.category}
                    >
                      <option selected>Select category</option>
                      {categoriesOption}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black bold-text">
                      Sub Category<i>(select a category first)</i>{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="subCategory"
                      onChange={(e) => {
                        handleInput(e, setProduct);
                      }}
                      value={product.subCategory}
                    >
                      <option selected>Select sub category</option>
                      {subCategoriesOption}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_state" className="text-black bold-text">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="c_message"
                      cols="30"
                      rows="7"
                      name="description"
                      value={product.description}
                      className="form-control"
                      onChange={(e) => handleInput(e, setProduct)}
                    ></textarea>
                  </div>
                </div>

                <FileInput
                  namer="image"
                  label="Choose Image"
                  handleInputImage={handleInputImage}
                  type="image"
                  value={product.image}
                />

                <div className="form-group row">
                  <div className="col-lg-12">
                    <p className="h5 text-danger m-2">{formErrors?.all}</p>
                    {!loading && (
                      <button className="btn btn-danger btn-block bold-text">
                        Add Product
                      </button>
                    )}
                    {loading && (
                      <div className="d-flex justify-content-center">
                        <LineWave
                          color={loaderColor}
                          height={loaderSize}
                          width={loaderSize}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddItemsForm;
