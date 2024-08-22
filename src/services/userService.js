import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${APIConstant.USER_BASE}/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
