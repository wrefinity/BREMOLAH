import { combineReducers } from "redux";

import products from "./product";
import users from "./users";
import payments from "./payment";
import categories from "./cartegory";
import subCategories from "./subCategory";
import cart from "./cart";
import currentPage from "./currentPage";
import error from "./error";

export default combineReducers({
   products,
   users,
   payments,
   categories,
   subCategories,
   cart,
   currentPage,
   error
});
