import types from "./constants/action-types";
import initState from "./initialState";

const {
   FETCH_PRODUCT,
   FETCH_SINGLE_PRODUCT,
   CREATE_PRODUCT,
   UPDATE_PRODUCT,
   DELETE_PRODUCT,
} = types;

const products = (products = initState.products, action) => {
   switch (action.type) {
      case FETCH_PRODUCT:
         return action.payload;

      case CREATE_PRODUCT:
         return [...products, action.payload];

      case DELETE_PRODUCT:
         return products.filter((pro) => pro._id !== action.payload);

      case FETCH_SINGLE_PRODUCT:
         return action.payload;

      case UPDATE_PRODUCT:
         return products.map((pro) =>
            action.payload._id === pro._id ? action.payload : pro
         );

      default:
         return products;
   }
};

export default products;
