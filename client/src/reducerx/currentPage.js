import initState from "./initialState";
import types from "./constants/action-types";

const { SET_CURRENT_PAGE, UPDATE_CURRENT_PAGE } = types;

const currentPage = (currentPage = initState.currentPage, action) => {
   switch (action.type) {
      case SET_CURRENT_PAGE:
         return action.payload;
      case UPDATE_CURRENT_PAGE:
         return action.payload;
      default:
         return currentPage;
   }
};

export default currentPage;
