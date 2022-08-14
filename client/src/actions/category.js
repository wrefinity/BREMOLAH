import types from "../reducerx/constants/action-types";
import {
  axiosGet,
  axiosPostHeader,
  axiosDelete,
  axiosUpdateHeader,
} from "../helpers/request";
import carteRoutes from "./routesAll";

const { CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY, FETCH_CATEGORY } =
  types;
const { urlCreateGetDeleteCategory } = carteRoutes;

export const createCat = (category, token, toast) => async (dispatch) => {
  try {
    const res = await axiosPostHeader(
      urlCreateGetDeleteCategory,
      category,
      token
    );
    if (res.status === 200) {
      dispatch({ type: CREATE_CATEGORY, payload: res.data });
      toast.success("Category updated successfully", { autoClose: 2000 });
    } else {
      toast.error(`${res.data}`, { autoClose: 2000 });
    }
  } catch (error) {
    toast.error("Oops, an error has occured", { autoClose: 2000 });
  }
};

export const fetchCat = () => async (dispatch) => {
  try {
    const res = await axiosGet(urlCreateGetDeleteCategory);
    if (res.status === 200) {
      dispatch({ type: FETCH_CATEGORY, payload: res.data });
    }
  } catch (error) {
  }
};

export const updateCat = (category, token, toast, closeRef) => async (dispatch) => {
  try {
    const res = await axiosUpdateHeader(
      `${urlCreateGetDeleteCategory}/${category._id}`,
      category,
      token
    );
    if (res.status === 200) {
      dispatch({ type: UPDATE_CATEGORY, payload: res.data });
      toast.success("Category updated successfully", { autoClose: 2000 });
      closeRef.current.click()
    } else {
      toast.success(`${res.data}`, { autoClose: 2000 });
    }
  } catch (error) {
    toast.error("Oops, an error has occured", { autoClose: 2000 });
  }
};

export const deleteCat = (id, token) => async (dispatch) => {
  try {
    const res = await axiosDelete(`${urlCreateGetDeleteCategory}/${id}`, token);
    if (res.status === 200) {
      dispatch({ type: DELETE_CATEGORY, payload: id });
      return { status: res.status, data: res.data };
    }
  } catch (error) {
  }
};
