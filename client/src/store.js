import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import userSlice from "./reducers/userSlice";
import usersSlice from "./reducers/usersSlice";
import categoriesSlice from "./reducers/categoriesSlice";
import itemsSlice from "./reducers/itemsSlice";

const reducers = combineReducers({
   user: userSlice,
   users: usersSlice,
   categories: categoriesSlice,
   items: itemsSlice,
});

const persistConfig = {
   key: "root",
   storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
   reducer: persistedReducer,
   middleware: [thunk],
});

export default store;
