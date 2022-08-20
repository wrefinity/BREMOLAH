import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { LineWave } from "react-loader-spinner";
import { toast } from "react-toastify";

import { handleInput, loaderSize, loaderColor, validateEmpty } from "../../helpers/input";
import { createCat } from "../../actions/category";

const AddCategoryForm = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [user] = useCookies("user");
  const referal = useRef();

  const reset = () => {
    setCategory({
      name: "",
      description: "",
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormErrors(validateEmpty(category));
    setIsSubmit(true);  
  };

  useEffect(() => {
    referal.current();
  }, [formErrors]);

  const addCat = async () => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(createCat(category, user.user.token, toast));
      reset();
    } 
    setLoading(false)
  };

  referal.current = addCat;
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
                    Add Category
                  </h2>
                </div>

                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_name" className="text-black bold-text">
                      Category Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_name"
                      name="name"
                      value={category.name}
                      placeholder="enter category name"
                      onChange={(e) => {
                        handleInput(e, setCategory);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-12">
                    <label htmlFor="c_name" className="text-black bold-text">
                      Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="c_message"
                      cols="30"
                      rows="7"
                      name="description"
                      value={category.description}
                      className="form-control"
                      onChange={(e) => handleInput(e, setCategory)}
                    ></textarea>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-lg-12">
                  <p className="h5 text-danger m-2">{formErrors?.all}</p>
                    {!loading && (
                      <button className="btn btn-danger btn-block bold-text">
                        Add Category
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
