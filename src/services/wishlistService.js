import APIConstant from "@/constant/APIConstant";
import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const addWishlist = async (data) => {
  try {
    const { response } = await axios.post(
      `${BASE_URL}${APIConstant.WISHLIST}/add`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error adding Wishlist data:", error);
    throw error;
  }
};

export const getSpecificWishlist = async () => {
  try {
    const { response } = await axios.get(
      `${BASE_URL}${APIConstant.WISHLIST}/all`
    );
    return response;
  } catch (error) {
    console.error("Error fetching Wishlist data:", error);
    throw error;
  }
};

export const getAllWishlist = async () => {
  try {
    const { response } = await axios.get(
      `${BASE_URL}${APIConstant.WISHLIST}/all`
    );
    return response;
  } catch (error) {
    console.error("Error fetching Wishlist data:", error);
    throw error;
  }
};

export const deleteWishlist = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${APIConstant.WISHLIST}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Wishlist:", error);
    throw error;
  }
};
