import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProduct, getProductById } from "../../services/productService";

export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await getAllProduct();
    console.log("products: ", response.data);
    return response.data;
  }
);

export const fetchSpecificProduct = createAsyncThunk(
  "product/fetchSpecificProduct",
  async (productId) => {
    const response = await getProductById(productId);
    console.log("products: ", response.data);
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