import axios from "axios";
import BASE_URL from "../config/baseUrls";

export const addReview = async (data) => {
  try {
    const { response } = await axios.post(
      `${BASE_URL}${APIEndpoints.REVIEW}/add`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error adding Review data:", error);
    throw error;
  }
};

export const getAllReview = async () => {
  try {
    const { response } = await axios.get(
      `${BASE_URL}${APIEndpoints.REVIEW}/all`
    );
    return response;
  } catch (error) {
    console.error("Error fetching Review data:", error);
    throw error;
  }
};

export const deleteReview = async (id) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}${APIEndpoints.REVIEW}/delete/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting Review:", error);
    throw error;
  }
};

export const updateReview = async (data) => {
  try {
    const { response } = await axios.put(
      `${BASE_URL}${APIEndpoints.REVIEW}/update`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating Review data:", error);
    throw error;
  }
};
