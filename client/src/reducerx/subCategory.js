import types from "./constants/action-types";
import initState from "./initialState";

const {
   CREATE_SUB_CATEGORY,
   FETCH_SUB_CATEGORY,
   DELETE_SUB_CATEGORY,
   UPDATE_SUB_CATEGORY,
} = types;

const subCategoryFunc = (subCategories = initState.subCategories, { type, payload }) => {
   switch (type) {
      case FETCH_SUB_CATEGORY:
         return payload;

      case CREATE_SUB_CATEGORY:
         return [...subCategories, payload];

      case DELETE_SUB_CATEGORY:
         return subCategories.filter((cat) => cat._id !== payload);
      case UPDATE_SUB_CATEGORY:
         return subCategories.map((subCategory) =>
            subCategory._id === payload._id ? payload : subCategory
         );
      default:
         return subCategories;
   }
};

export default subCategoryFunc