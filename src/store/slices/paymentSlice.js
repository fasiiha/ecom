import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPayment,
  deletePayment,
  getAllPayment,
  updatePayment,
} from "../../services/paymentService";

export const fetchPaymentItems = createAsyncThunk(
  "payment/fetchPaymentItems",
  async () => {
    const response = await getAllPayment();
    console.log("Payment: ", response.data);
    return response.data;
  }
);

export const addPaymentItem = createAsyncThunk(
  "payment/addPaymentItem",
  async (item) => {
    const response = await addPayment(item);
    return response.data;
  }
);

export const removePaymentItem = createAsyncThunk(
  "payment/removePaymentItem",
  async (id) => {
    await deletePayment(id);
    return id;
  }
);

export const updatePaymentItem = createAsyncThunk(
  "payment/updatePaymentItem",
  async (item) => {
    const response = await updatePayment(item);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaymentItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPaymentItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPaymentItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removePaymentItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updatePaymentItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default paymentSlice.reducer;
