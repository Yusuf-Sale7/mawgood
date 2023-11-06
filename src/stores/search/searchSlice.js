import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SearchEffects from "./searchEffects";

const initialState = {
  categoryProducts: [],
  searchResult: [],
  isLoading: false,
};

// Get Category
export const getCategory = createAsyncThunk(
  "search/getCategory",
  ({ category, sort, limit }) => {
    return SearchEffects.getCategory(category, sort, limit);
  }
);

// Search Products
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  ({ query, category, minPrice, maxPrice, rate, sort, limit }) => {
    return SearchEffects.searchProducts(
      query,
      category,
      minPrice,
      maxPrice,
      rate,
      sort,
      limit
    );
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: (builder) => {
    // Get Category
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categoryProducts = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategory.rejected, (state) => {
      state.isLoading = false;
    });

    // Search Products
    builder.addCase(searchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.searchResult = action.payload;
      state.isLoading = false;
    });
    builder.addCase(searchProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default searchSlice.reducer;
