import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllProduct,
  getLatestProducts,
  getProductById,
} from "../../services/productService";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await getAllProduct();
    return response.data;
  }
);

export const fetchLatestProduct = createAsyncThunk(
  "product/fetchLatestProduct",
  async () => {
    const response = await getLatestProducts();
    return response.data;
  }
);

export const fetchSpecificProduct = createAsyncThunk(
  "product/fetchSpecificProduct",
  async (productId) => {
    const response = await getProductById(productId);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchLatestProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLatestProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLatestProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpecificProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecificProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchSpecificProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
