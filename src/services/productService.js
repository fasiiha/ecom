import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const addProduct = async (productData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}${APIConstant.PRODUCT}/add`,
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
    const { data } = await axios.get(`${BASE_URL}${APIConstant.PRODUCT}/all`);
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getLatestProducts = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${APIConstant.PRODUCT}/latest`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}${APIConstant.PRODUCT}/specific/${productId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};
