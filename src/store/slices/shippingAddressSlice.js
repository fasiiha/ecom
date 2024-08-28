import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addShippingAddress,
  deleteShippingAddress,
  getAllShippingAddress,
  updateShippingAddress,
} from "../../services/shippingAddressService";

export const fetchShippingAddressItems = createAsyncThunk(
  "shippingAddress/fetchShippingAddressItems",
  async () => {
    const response = await getAllShippingAddress();
    console.log("ShippingAddress: ", response.data);
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

export const removeShippingAddressItem = createAsyncThunk(
  "shippingAddress/removeShippingAddressItem",
  async (id) => {
    await deleteShippingAddress(id);
    return id;
  }
);

export const updateShippingAddressItem = createAsyncThunk(
  "shippingAddress/updateShippingAddressItem",
  async (item) => {
    const response = await updateShippingAddress(item);
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
      })
      .addCase(removeShippingAddressItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateShippingAddressItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default shippingAddressSlice.reducer;
