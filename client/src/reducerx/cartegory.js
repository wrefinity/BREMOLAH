import types from "./constants/action-types";
import initState from "./initialState";

const { CREATE_CATEGORY, FETCH_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } =
   types;

const categoryFunc =  (categories = initState.categories, { type, payload }) => {
   switch (type) {
      case FETCH_CATEGORY:
         return payload;

      case CREATE_CATEGORY:
         return [...categories, payload];

      case DELETE_CATEGORY:
         return categories.filter((cat) => cat._id !== payload);

      case UPDATE_CATEGORY:
         return categories.map((category) =>
            category._id === payload._id ? payload : category
         );
      default:
         return categories;
   }
};
export default categoryFunc;