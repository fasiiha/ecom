import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";

const getAllCategoryAndSubcategory = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${APIConstant.CATEGORY}/fetch`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Cart data:", error);
    throw error;
  }
};

module.exports = {
  getAllCategoryAndSubcategory,
};
