import types from "../reducerx/constants/action-types";
import {
  axiosGetHeader,
  axiosPostHeader,
  axiosDelete,
  axiosUpdateHeader,
} from "../helpers/request";
import carteRoutes from "./routesAll";

const { CREATE_CART, DELETE_CART, FETCH_CART } = types;
const { urlCreateGetDeleteCart } = carteRoutes;

export const AddToCart = (cart, token) => async (dispatch) => {
  try {
    const res = await axiosPostHeader(urlCreateGetDeleteCart, cart, token);
    if (res?.status === 200) {
      dispatch({ type: CREATE_CART, payload: res?.data });
      return { status: res?.status, data: "Product added to catalogue" };
    } else {
      return { status: res?.status, data: res?.data };
    }
  } catch (error) {}
};

export const removeFromCart = (id, token) => async (dispatch) => {
  try {
    const res = await axiosDelete(`${urlCreateGetDeleteCart}/${id}`, token);
    if (res.status === 200) {
      dispatch({ type: DELETE_CART, payload: id });
      return { status: res?.status, data: res?.data };
    }
  } catch (error) {}
};

export const fetchCart = (id, token) => async (dispatch) => {
  try {
    const res = await axiosGetHeader(`${urlCreateGetDeleteCart}/${id}`, token);
    if (res?.status === 200) {
      dispatch({ type: FETCH_CART, payload: res?.data });
    }
  } catch (error) {}
};

// TODO
export const decrementIncrementQuantity =
  (productId, data, token) => async (dispatch) => {
    try {
      const res = await axiosUpdateHeader(
        `${urlCreateGetDeleteCart}/${productId}`,
        data,
        token
      );
      if (res?.status === 200) {
        dispatch({ type: FETCH_CART, payload: res?.data });
      }
    } catch (error) {}
  };
