import axios from "axios";

/**
 * Create Axios instance with a base url and the main headers
 */
const axiosClient = axios.create({
  baseURL: `http://localhost:3001/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// using interceptors to clean redirects
/*
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res.status === 401) {
      window.location.href = "https://localhost:3000";
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);
*/
export default axiosClient;
