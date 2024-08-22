import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const addOrder = async (data) => {
  try {
    const { response } = await axios.post(
      `${BASE_URL}${APIEndpoints.ORDER}/add`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error adding Order data:", error);
    throw error;
  }
};

export const getAllOrder = async () => {
  try {
    const { response } = await axios.get(
      `${BASE_URL}${APIEndpoints.ORDER}/all`
    );
    return response;
  } catch (error) {
    console.error("Error fetching Order data:", error);
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${APIEndpoints.ORDER}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

export const updateOrder = async (data) => {
  try {
    const { response } = await axios.put(
      `${BASE_URL}${APIEndpoints.ORDER}/update`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating Order data:", error);
    throw error;
  }
};