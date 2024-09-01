import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const registerUser = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${APIConstant.USER}/register`,
      data
    );
    const { user, token } = response.data;

    return response.data;
  } catch (error) {
    console.error("Error registering User:", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${APIConstant.USER}/login`,
      data
    );
    const user = response.data.data.user;
    const token = response.data.data.token;
    console.log("user: ", user);
    console.log("token: ", token);
    console.log("user, token: ", { user, token });
    return { user, token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const resetPassword = async (id) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${APIConstant.USER}/reset-password`
    );
    return response.data;
  } catch (error) {
    console.error("Error reseting password:", error);
    throw error;
  }
};
