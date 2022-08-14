import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { LineWave } from "react-loader-spinner";

import {
  handleInput,
  loaderSize,
  loaderColor,
  validateEmpty,
} from "../../helpers/input";
import { createSubCat } from "../../actions/subCategory";
import { toast } from "react-toastify";

const AddCategoryForm = () => {
  const [subCategory, setSubCategory] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [user] = useCookies("user");

  const categories = useSelector((state) => state.categories);

  const reset = () => {
    setSubCategory({
      name: "",
      category: "",
      description: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validateEmpty(subCategory));
    setIsSubmit(true);  
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createSubCat(subCategory, user.user.token, toast));
      reset();
    } 
    setLoading(false)
      
  }, [formErrors]);



  return (
    <div className="site-section">
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="p-3 p-lg-5 border">
                <div className="container p-5 mb-4 bg-danger">
                  <h2 className="h3 mb-3 text-white text-center bold-text">
                    Add Sub Category
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
                      value={subCategory.name}
                      placeholder="enter sub category name"
                      onChange={(e) => {
                        handleInput(e, setSubCategory);
                      }}
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
                        handleInput(e, setSubCategory);
                      }}
                      value={subCategory.category}
                    >
                      <option selected>Select category</option>
                      {categoriesOption}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label className="text-black bold-text">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="c_message"
                      cols="30"
                      rows="7"
                      name="description"
                      value={subCategory.description}
                      className="form-control"
                      onChange={(e) => handleInput(e, setSubCategory)}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                  <p className="h5 text-danger m-2">{formErrors?.all}</p>
                    {!loading && (
                      <button className="btn btn-danger btn-block bold-text">
                        Add Sub Category
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

export default AddCategoryForm;
