import axios from "axios";
import APIConstant from "@/constant/APIConstant";

const Request = (options) => {
  const BASE_URL = process.env.BACKEND_API_PATH;

  const authToken = localStorage.getItem("token");

  const config = {
    headers: options["headers"],
    url: BASE_URL + options["url"],
    method: options["method"],
    data: options["body"],
  };

  if (authToken) {
    config.headers["access-token"] = authToken;
  }

  return axios
    .request(config)
    .then((response) => {
      if (response?.data) {
        return response.data;
      }
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        localStorage.clear();
        location.replace("/signin");
        return error;
      } else {
        return error.response.data;
      }
    });
};

export default Request;
