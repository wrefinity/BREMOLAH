import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

import { handleInput, validateEmpty } from "../../helpers/input";
import { deleteSubCat, updateSubCat } from "../../actions/subCategory";
import moment from "moment";
import { toast } from "react-toastify";
const Categories = () => {
  const [subCategory, setSubCategory] = useState({
    name: "",
    category: "",
    description: "",
    _id: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const [user] = useCookies("user");
  const categories = useSelector((state) => state.categories);
  const subCategories = useSelector((state) => state.subCategories);
  const closeRef = useRef();
  const navigate = useNavigate();

  const [param] = useSearchParams();
  const search = param.get("search");

  const reset = () => {
    setSubCategory({
      name: "",
      category: "",
      description: "",
      _id: "",
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

  const searchResult = subCategories.filter(
    (subCat) => subCat.name.toLowerCase() === search?.toLowerCase()
  );
  const SubCategories = () => (search ? searchResult : subCategories);

  const subCategoriesData = SubCategories()
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    .map((subCat) => {
      return (
        <tr key={subCat._id}>
          <td className="product-name bold-text">{subCat.name}</td>
          {/* <td className="product-name bold-text">{subCat.category}</td> */}
          <td className="product-name bold-text">
            {categories.filter((cat) => subCat.category === cat._id)[0]?.name}
          </td>
          <td className="bold-text">
            {moment(subCat.createdAt).format("DD/MM/YYYY")}
          </td>
          <td className="bold-text">{subCat.description}</td>
          <td className="bold-text">
            <button
              className="btn btn-sm btn-success mr-1"
              data-toggle="modal"
              data-target="#updateCategoryModal"
              onClick={() =>
                setSubCategory({
                  ...subCategory,
                  ...subCat,
                })
              }
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                handleDeleteSubCategory(subCat._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

  const handleUpdateSubCategory = async (e) => {
    e.preventDefault();
    setFormErrors(validateEmpty(subCategory));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(updateSubCat(subCategory, user.user.token, toast, closeRef));
      reset();
    }
  }, [formErrors]);

  const handleDeleteSubCategory = async (id) => {
    await dispatch(deleteSubCat(id, user.user.token));
  };
  return (
    <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="site-blocks-table">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="product-thumbnail">Name</th>
                    <th className="product-thumbnail">Category</th>
                    <th className="product-thumbnail">Date Created</th>
                    <th className="product-thumbnail">Description</th>
                    <th className="product-thumbnail">action</th>
                  </tr>
                </thead>
                <tbody>{subCategoriesData}</tbody>
              </table>
            </div>
            <button
              className="btn btn-lg btn-danger"
              onClick={() => navigate("/add-sub-category")}
            >
              Add Sub Category
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade mt-5"
        id="updateCategoryModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ marginTop: "10rem", zIndex: 10000 }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdateSubCategory}>
                <div className="p-3 p-lg-5 border">
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
                        value={subCategory.name}
                        placeholder="enter new name"
                        onChange={(e) => {
                          handleInput(e, setSubCategory);
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label className="text-black bold-text">
                        Category <span className="text-danger">*</span>(
                        {
                          categories.filter(
                            (cat) => cat._id === subCategory.category
                          )[0]?.name
                        }
                        )
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
                    <p className="h5 text-danger m-2">{formErrors?.all}</p>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleUpdateSubCategory}
                className="btn btn-danger"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
