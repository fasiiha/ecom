import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCart,
  deleteCart,
  getAllCart,
  updateCart,
} from "../../services/cartService";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await getAllCart(userId);
    console.log("cart: ", response.data);
    return response.data;
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (item) => {
    const response = await addCart(item);
    return response.data;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id) => {
    await deleteCart(id);
    return id;
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default cartSlice.reducer;
