import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addOrder,
  deleteOrder,
  getAllOrder,
  getSpecificOrder,
  updateOrder,
} from "../../services/orderService";

export const fetchOrderItems = createAsyncThunk(
  "order/fetchOrderItems",
  async () => {
    const response = await getAllOrder();
    return response.data;
  }
);

export const fetchSpecificOrderItems = createAsyncThunk(
  "order/fetchSpecificOrderItems",
  async (userId) => {
    const response = await getSpecificOrder(userId);
    return response.data;
  }
);

export const addOrderItem = createAsyncThunk(
  "order/addOrderItem",
  async (item) => {
    const response = await addOrder(item);
    return response.data;
  }
);

export const removeOrderItem = createAsyncThunk(
  "order/removeOrderItem",
  async (id) => {
    await deleteOrder(id);
    return id;
  }
);

export const updateOrderItem = createAsyncThunk(
  "order/updateOrderItem",
  async (item) => {
    const response = await updateOrder(item);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchOrderItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchSpecificOrderItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecificOrderItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSpecificOrderItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrderItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeOrderItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateOrderItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default orderSlice.reducer;
