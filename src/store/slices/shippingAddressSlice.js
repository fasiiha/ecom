import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addShippingAddress,
  getAllShippingAddress,
} from "../../services/shippingAddress";

export const fetchShippingAddressItems = createAsyncThunk(
  "shippingAddress/fetchShippingAddressItems",
  async (userId) => {
    const response = await getAllShippingAddress(userId);
    return response.data;
  }
);

export const addShippingAddressItem = createAsyncThunk(
  "shippingAddress/addShippingAddressItem",
  async (item) => {
    const response = await addShippingAddress(item);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShippingAddressItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShippingAddressItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchShippingAddressItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addShippingAddressItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default shippingAddressSlice.reducer;
