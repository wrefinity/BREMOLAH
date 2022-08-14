import axios from "../axiosCalls";

export const axiosGet = async (route) => {
   try {
      const res = await axios.get(route);
      return { status: res.status, data: res.data };
   } catch (e) {
   }
};

export const axiosGetHeader = async (route, token) => {
   const config = {
      headers: {
         token: "Bearer " + token,
      },
   };
   try {
      const res = await axios.get(route, config);
      return { status: res.status, data: res.data };
   } catch (e) {
   }
};

export const axiosDelete = async (route, token) => {
   const config = {
      headers: {
         token: "Bearer " + token,
      },
   };
   try {
      const res = await axios.delete(route, config);
      return { status: res.status, data: res.data };
   } catch (e) {
   }
};

export const axiosPost = async (route, credentials) => {
   try {
      const res = await axios.post(route, credentials);
      return { status: res.status, data: res.data };
   } catch (e) {
      return { status: 404, data: "Check network connection" };
   }
};

export const axiosPostHeader = async (route, credentials, token) => {
   const config = {
      headers: {
         token: "Bearer " + token,
      },
   };
   try {
      const res = await axios.post(route, credentials, config);
      return { status: res.status, data: res.data };
   } catch (e) {
   }
};
export const axiosUpdate = async (route, credentials) => {
   try {
      const res = await axios.patch(route, credentials);
      return { status: res.status, data: res.data };
   } catch (e) {
   }
};
export const axiosUpdateHeader = async (route, credentials, token) => {
   const config = {
      headers: {
         token: "Bearer " + token,
      },
   };
   try {
      const res = await axios.patch(route, credentials, config);
      return { status: res.status, data: res.data };
   } catch (e) {
   }
};