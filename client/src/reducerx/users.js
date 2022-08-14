import types from "./constants/action-types";
import initialState from "./initialState";

const {
   FETCH_USER,
   CREATE_USER,
   DELETE_USER,
   UPDATE_USER,
   LOGIN_USER,
   FETCH_SINGLE_USER,
} = types;

const operations = (users = initialState.users, { type, payload }) => {
   switch (type) {
      case FETCH_USER:
         return payload;
      case CREATE_USER:
         return [...users, payload];
      case LOGIN_USER:
         return (initialState.user = payload);
      case FETCH_SINGLE_USER:
         return users.filter((user) => user._id === payload._id);
      case DELETE_USER:
         return users.filter((user) => user._id !== payload);
      case UPDATE_USER:
         return users.map((user) =>
            user._id === payload._id ? payload : user
         );
      default:
         return users;
   }
};

export default operations;
