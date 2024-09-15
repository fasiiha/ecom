import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllSubcategory } from "../../services/subcategoryService";

export const fetchSubcategoryItems = createAsyncThunk(
  "subcategory/fetchSubcategoryItems",
  async () => {
    const response = await getAllSubcategory();
    return response.data;
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const subcategorySlice = createSlice({
  name: "Subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategoryItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSubcategoryItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSubcategoryItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default subcategorySlice.reducer;
