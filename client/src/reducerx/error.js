import types from "./constants/action-types";
import initialState from "./initialState";

const { CREATE_ERROR } = types;

const operations = (error = initialState.error, { type, payload }) => {
  switch (type) {
    case CREATE_ERROR:
      return payload;
    default:
      return error;
  }
};

export default operations;
