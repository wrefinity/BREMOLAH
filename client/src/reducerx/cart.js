import initState from "./initialState";
import types from "./constants/action-types";

const { CREATE_CART, DELETE_CART, FETCH_CART } = types;

const cart = (cart = initState.cart, action) => {
   switch (action.type) {
      case FETCH_CART:
         return action.payload;
      case CREATE_CART:
         return [...cart, action.payload];

      case DELETE_CART:
         return cart.filter((cart) => cart._id !== action.payload);

      default:
         return cart;
   }
};

export default cart;
