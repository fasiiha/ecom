import axios from "axios";
import BASE_URL from "../config/baseUrls";
import APIConstant from "@/constant/APIConstant";

export const addPayment = async (data) => {
  try {
    const { response } = await axios.post(
      `${BASE_URL}${APIConstant.PAYMENT}/add`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error adding Payment data:", error);
    throw error;
  }
};

export const getAllPayment = async () => {
  try {
    const { response } = await axios.get(
      `${BASE_URL}${APIConstant.PAYMENT}/all`
    );
    return response;
  } catch (error) {
    console.error("Error fetching Payment data:", error);
    throw error;
  }
};

export const deletePayment = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${APIConstant.PAYMENT}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Payment:", error);
    throw error;
  }
};

export const updatePayment = async (data) => {
  try {
    const { response } = await axios.put(
      `${BASE_URL}${APIConstant.PAYMENT}/update`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating Payment data:", error);
    throw error;
  }
};
