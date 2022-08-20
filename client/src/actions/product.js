import {
  axiosGet,
  axiosPostHeader,
  axiosUpdateHeader,
  axiosDelete,
} from "../helpers/request";

import productRoutes from "./routesAll";

import types from "../reducerx/constants/action-types";

const { FETCH_PRODUCT, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } = types;
const { urlCreateGetDeleteUpdateProduct } = productRoutes;

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axiosGet(urlCreateGetDeleteUpdateProduct);
    if (res?.status === 200) {
      dispatch({ type: FETCH_PRODUCT, payload: res?.data });
    }
  } catch (error) {
  }
};

export const createProducts = (product, token, toast) => async (dispatch) => {
  try {
    const res = await axiosPostHeader(
      urlCreateGetDeleteUpdateProduct,
      product,
      token
    );
    if (res?.status === 200) {
      dispatch({ type: CREATE_PRODUCT, payload: res?.data });
      toast.success("product added successfully", { autoClose: 2000 });
    } else {
      toast.error(`${res?.data}`, { autoClose: 2000 });
    }
  } catch (error) {
    toast.error(`Something went wrong`, { autoClose: 2000 });
  }
};

export const updateProduct =
  (updatedProduct, token, toast, navigate) => async (dispatch) => {
    try {
      const res = await axiosUpdateHeader(
        `${urlCreateGetDeleteUpdateProduct}/${updatedProduct._id}`,
        updatedProduct,
        token
      );
      if (res?.status === 200) {
        dispatch({ type: UPDATE_PRODUCT, payload: res?.data });
        toast.success(`product updated successfully`, { autoClose: 2000 });
        navigate("/items");
      } else {
        toast.error(`${res?.data}`, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(`Something went wrong`, { autoClose: 2000 });
    }
  };

export const deleteProduct = (id, token) => async (dispatch) => {
  try {
    const res = await axiosDelete(
      `${urlCreateGetDeleteUpdateProduct}/${id}`,
      token
    );
    if (res?.status === 200) {
      dispatch({ type: DELETE_PRODUCT, payload: id });
      return { status: res?.status, data: res?.data };
    } else {
      return { status: res?.status, data: res?.data };
    }
  } catch (error) {
  }
};
