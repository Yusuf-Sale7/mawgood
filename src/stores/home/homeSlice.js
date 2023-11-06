import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HomeEffects from "./homeEffects";

const initialState = {
  categories: [],
  topCategories: [],
  topProducts: [],
  partners: [],
  offers: [],
  isLoading: false,
  tcIsLoading: false,
  offersIsLoading: false,
};

// Get Categories
export const getCategories = createAsyncThunk("home/getCategories", () => {
  return HomeEffects.getCategories();
});

// Get Top Categories
export const getTopCategories = createAsyncThunk(
  "home/getTopCategories",
  () => {
    return HomeEffects.getTopCategories();
  }
);

// Get Top Products
export const getTopProducts = createAsyncThunk("home/getTopProducts", () => {
  return HomeEffects.getTopProducts();
});

// Get Offers
export const getOffers = createAsyncThunk("home/getOffers", () => {
  return HomeEffects.getOffers();
});

// Get Partners
export const getPartners = createAsyncThunk("home/getPartners", () => {
  return HomeEffects.getPartners();
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    // Get Categories
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });

    // Get Top Categories
    builder.addCase(getTopCategories.pending, (state) => {
      state.tcIsLoading = true;
    });
    builder.addCase(getTopCategories.fulfilled, (state, action) => {
      state.topCategories = action.payload;
      state.tcIsLoading = false;
    });
    builder.addCase(getTopCategories.rejected, (state) => {
      state.tcIsLoading = false;
    });

    // Get Offers
    builder.addCase(getOffers.pending, (state) => {
      state.offersIsLoading = true;
    });
    builder.addCase(getOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.offersIsLoading = false;
    });
    builder.addCase(getOffers.rejected, (state) => {
      state.offersIsLoading = false;
    });

    // Get Top Products
    builder.addCase(getTopProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTopProducts.fulfilled, (state, action) => {
      state.topProducts = action.payload.products;
      state.isLoading = false;
    });
    builder.addCase(getTopProducts.rejected, (state) => {
      state.isLoading = false;
    });

    // Get Partners
    builder.addCase(getPartners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPartners.fulfilled, (state, action) => {
      state.partners = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPartners.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default homeSlice.reducer;
