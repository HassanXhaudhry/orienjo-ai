import axios from "axios";

const api = axios.create({
  baseURL:"",
  // timeout: 4000,
});
// export const apiFormData = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });
export const apiFormDataWithToken =(token)=> axios.create({
  baseURL: "",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});

export const apiWithToken = (token) => axios.create({
  baseURL: "",
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});



export default api;