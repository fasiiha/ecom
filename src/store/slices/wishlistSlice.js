import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addWishlist,
  deleteWishlist,
  getAllWishlist,
  updateWishlist,
} from "../../services/wishlistService";

export const fetchWishlistItems = createAsyncThunk(
  "wishlist/fetchWishlistItems",
  async () => {
    const response = await getAllWishlist();
    console.log("Wishlist: ", response.data);
    return response.data;
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addWishlistItem",
  async (item) => {
    const response = await addWishlist(item);
    return response.data;
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeWishlistItem",
  async (id) => {
    await deleteWishlist(id);
    return id;
  }
);

export const updateWishlistItem = createAsyncThunk(
  "wishlist/updateWishlistItem",
  async (item) => {
    const response = await updateWishlist(item);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateWishlistItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default wishlistSlice.reducer;