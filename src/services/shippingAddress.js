import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const addShippingAddress = async (data) => {
  try {
    const { response } = await axios.post(
      `${BASE_URL}${APIConstant.SHIPPING_ADDRESS}/add`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error adding ShippingAddress data:", error);
    throw error;
  }
};

export const getAllShippingAddress = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}${APIConstant.SHIPPING_ADDRESS}/all/${id}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching ShippingAddress data:", error);
    throw error;
  }
};
