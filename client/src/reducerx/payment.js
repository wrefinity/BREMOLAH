import initState from "./initialState";
import types from "./constants/action-types";

const { CREATE_PAYMENT, FETCH_PAYMENT, FETCH_SINGLE_PAYMENT, UPDATE_PAYMENT } =
   types;

const paymentFunc = (payments = initState.payments, action) => {
   switch (action.type) {
      case FETCH_PAYMENT:
         return action.payload;

      case CREATE_PAYMENT:
         return [...payments, action.payload];

      case FETCH_SINGLE_PAYMENT:
         return action.payload;
      case UPDATE_PAYMENT:
         return payments.map((payment) =>
            payment._id === action.payload._id ? action.payload : payment
         );
      default:
         return payments;
   }
};
export default paymentFunc;