import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const addShippingAddress = async (data) => {
  try {
    const { response } = await axios.post(
      `${BASE_URL}${APIEndpoints.SHIPPING_ADDRESS}/add`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error adding ShippingAddress data:", error);
    throw error;
  }
};

export const getAllShippingAddress = async () => {
  try {
    const { response } = await axios.get(
      `${BASE_URL}${APIEndpoints.SHIPPING_ADDRESS}/all`
    );
    return response;
  } catch (error) {
    console.error("Error fetching ShippingAddress data:", error);
    throw error;
  }
};

export const deleteShippingAddress = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${APIEndpoints.SHIPPING_ADDRESS}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting ShippingAddress:", error);
    throw error;
  }
};

export const updateShippingAddress = async (data) => {
  try {
    const { response } = await axios.put(
      `${BASE_URL}${APIEndpoints.SHIPPING_ADDRESS}/update`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating ShippingAddress data:", error);
    throw error;
  }
};
