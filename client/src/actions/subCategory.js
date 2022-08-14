import types from "../reducerx/constants/action-types";
import {
  axiosGet,
  axiosPostHeader,
  axiosUpdateHeader,
  axiosDelete,
} from "../helpers/request";
import carteRoutes from "./routesAll";

const {
  CREATE_SUB_CATEGORY,
  DELETE_SUB_CATEGORY,
  FETCH_SUB_CATEGORY,
  UPDATE_SUB_CATEGORY,
} = types;
const { urlCreateGetDeleteSubCategory } = carteRoutes;

export const createSubCat = (subCategory, token, toast) => async (dispatch) => {
  try {
    const res = await axiosPostHeader(
      urlCreateGetDeleteSubCategory,
      subCategory,
      token
    );
    if (res.status === 200) {
      dispatch({ type: CREATE_SUB_CATEGORY, payload: res.data });
      toast.success("sub-category added", { autoClose: 2000 });
    } else {
      toast.error("an error occureed", { autoClose: 2000 });
    }
  } catch (error) {
    toast.error(`${error.message}`, { autoClose: 2000 });
  }
};

export const fetchSubCat = () => async (dispatch) => {
  const res = await axiosGet(urlCreateGetDeleteSubCategory);
  dispatch({ type: FETCH_SUB_CATEGORY, payload: res.data });
};

export const updateSubCat =
  (subCategory, token, toast, closeRef) => async (dispatch) => {
    try {
      const res = await axiosUpdateHeader(
        `${urlCreateGetDeleteSubCategory}/${subCategory._id}`,
        subCategory,
        token
      );

      if (res.status === 200) {
        dispatch({ type: UPDATE_SUB_CATEGORY, payload: res.data });
        toast.success("Sub category updated successfully", { autoClose: 2000 });
        closeRef.current.click();
      } else {
        toast.error(`${res.data}`, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Oops, an error has occured", { autoClose: 2000 });
    }
  };

export const deleteSubCat = (id, token) => async (dispatch) => {
  try {
    const res = await axiosDelete(
      `${urlCreateGetDeleteSubCategory}/${id}`,
      token
    );
    if (res.status === 200) {
      dispatch({ type: DELETE_SUB_CATEGORY, payload: id });
      return { status: res.status, data: res.data };
    }
  } catch (error) {
  }
};
