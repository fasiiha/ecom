import axios from "axios";
import BASE_URL from "../config/baseUrls";
import APIConstant from "@/constant/APIConstant";

export const addProduct = async (productData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}${APIConstant.PRODUCT_BASE}/add`,
      productData
    );
    return data;
  } catch (error) {
    console.error("Error adding product data:", error);
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${APIConstant.PRODUCT_BASE}/all`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
