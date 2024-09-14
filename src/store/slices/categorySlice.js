import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategoryAndSubcategory } from "../../services/categoryService";

export const fetchCategoryAndSubcategoryItems = createAsyncThunk(
  "category/fetchCategoryAndSubcategoryItems",
  async () => {
    const response = await getAllCategoryAndSubcategory();
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
      .addCase(fetchCategoryAndSubcategoryItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAndSubcategoryItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategoryAndSubcategoryItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
