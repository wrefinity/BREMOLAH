import types from "../reducerx/constants/action-types";
import {
   axiosGetHeader,
   axiosPostHeader,
   axiosUpdateHeader,
} from "../helpers/request";
import paymentRoute from "./routesAll";

const { CREATE_PAYMENT, FETCH_PAYMENT, UPDATE_PAYMENT } = types;
var { urlCreateGetDeleteUpdatePayment } = paymentRoute;

export const createPayments = (payment, token) => async (dispatch) => {
   try {
      const res = await axiosPostHeader(
         urlCreateGetDeleteUpdatePayment,
         payment,
         token
      );
      if (res.status === 200) {
         dispatch({ type: CREATE_PAYMENT, payload: res.data });
         return { status: res.status, data: res.data };
      } else {
         return { status: res.status, data: res.data };
      }
   } catch (error) {
   }
};

export const updatePayments = (payment, token) => async (dispatch) => {
   try {
      const res = await axiosUpdateHeader(
         `${urlCreateGetDeleteUpdatePayment}/${payment._id}`,
         payment,
         token
      );
      if (res.status === 200) {
         dispatch({ type: UPDATE_PAYMENT, payload: res.data });
         return { status: res.status, data: "status update successfully" };
      } else {
         return { status: res.status, data: res.data };
      }
   } catch (error) {
   }
};

export const fetchPayments = (token) => async (dispatch) => {
   try {
      const res = await axiosGetHeader(urlCreateGetDeleteUpdatePayment, token);
      if (res.status === 200) {
         dispatch({ type: FETCH_PAYMENT, payload: res.data });
         return { status: res.status, data: res.data };
      } else {
         return { status: res.status, data: res.data };
      }
   } catch (error) {
   }
};