import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";
const addCart = async (data) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${APIConstant.CART}/add`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Error adding Cart data:", error);
    throw error;
  }
};

const getAllCart = async () => {
  try {
    const response = await axios.get(`${BASE_URL}${APIConstant.CART}/all`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Cart data:", error);
    throw error;
  }
};

const deleteCart = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${APIConstant.CART}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Cart:", error);
    throw error;
  }
};

const updateCart = async (data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}${APIConstant.CART}/update`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating Cart data:", error);
    throw error;
  }
};

module.exports = {
  addCart,
  getAllCart,
  deleteCart,
  updateCart,
};
