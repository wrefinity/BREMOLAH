import {
  axiosGetHeader,
  axiosPost,
  axiosUpdateHeader,
  axiosPostHeader,
  axiosDelete,
} from "../helpers/request";
import userRoutes from "./routesAll";
import types from "../reducerx/constants/action-types";

const { FETCH_USER, DELETE_USER, UPDATE_USER } =
  types;
const { urlUsers } = userRoutes;

export const getUsers = (token) => async (dispatch) => {
  try {
    const res = await axiosGetHeader(urlUsers, token);
    if (res.status === 200) {
      dispatch({ type: FETCH_USER, payload: res.data });
    }
  } catch (error) {
  }
};

export const loginUser =
  (credentials, navigate, setCookies, toast) => async (dispatch) => {
    try {
      const response = await axiosPost(`${urlUsers}/login`, credentials);
      if (response?.status === 200) {
        if (response.data.token) {
          toast.success ("Login Success", { autoClose: 2000 });
          setCookies("user", JSON.stringify(response.data), { path: "/" });
          navigate("/shop");
        }
      } else {
         toast.error(`${response.data?.message}`, { autoClose: 2000 });
        }
      } catch (error) {
      toast.error("Oops! try again", { autoClose: 2000 });
    }
  };

export const createUsers =
  (users, navigate, toast) => async (dispatch) => {
    try {
      const res = await axiosPost(urlUsers, users);
      if (res.status === 200) {
        toast.success("Registered Successfully", { autoClose: 2000 });
        navigate("/login");
      } else {
        toast.error(`${res.data?.message}`, {autoClose: 2000})
      };
    } catch (error) {
      toast.error("Oops! try again", { autoClose: 2000 });
    }
  };

export const updateUser = (updatedUser, token) => async (dispatch) => {
  try {
    const res = await axiosUpdateHeader(
      `${urlUsers}/${updatedUser._id}`,
      updatedUser,
      token
    );
    if (res.status === 200) {
      dispatch({ type: UPDATE_USER, payload: res.data });
      return { status: res.status, data: res.data };
    } else {
      return { status: res.status, data: res.data };
    }
  } catch (error) {
  }
};

export const deleteUser = (id, token) => async (dispatch) => {
  try {
    const res = await axiosDelete(`${urlUsers}/${id}`, token);
    if (res.status === 200) {
      dispatch({ type: DELETE_USER, payload: id });
      return { status: res.status, data: res.data };
    }
  } catch (error) {
  }
};

export const changePassword = async (password, token) => {
  try {
    const res = await axiosPostHeader(
      `${urlUsers}/changePassword`,
      password,
      token
    );
    return { status: res.status, data: res.data };
  } catch (er) {
  }
};

export const changeImage = async (image, token) => {
  try {
    const res = await axiosPostHeader(`${urlUsers}/changeImage`, image, token);
    return { status: res.status, data: res.data };
  } catch (er) {
  }
};
