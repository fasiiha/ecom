import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addReview,
  deleteReview,
  getAllReview,
  updateReview,
} from "../../services/reviewService";

export const fetchReviewItems = createAsyncThunk(
  "review/fetchReviewItems",
  async () => {
    const response = await getAllReview();
    return response.data;
  }
);

export const addReviewItem = createAsyncThunk(
  "review/addReviewItem",
  async (item) => {
    const response = await addReview(item);
    return response.data;
  }
);

export const removeReviewItem = createAsyncThunk(
  "review/removeReviewItem",
  async (id) => {
    await deleteReview(id);
    return id;
  }
);

export const updateReviewItem = createAsyncThunk(
  "review/updateReviewItem",
  async (item) => {
    const response = await updateReview(item);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchReviewItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReviewItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeReviewItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(updateReviewItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default reviewSlice.reducer;
