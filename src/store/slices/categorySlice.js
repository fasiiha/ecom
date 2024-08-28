import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategory } from "../../services/categoryService";

export const fetchCategoryItems = createAsyncThunk(
  "category/fetchCategoryItems",
  async () => {
    const response = await getAllCategory();
    console.log("Category: ", response.data);
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategoryItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
