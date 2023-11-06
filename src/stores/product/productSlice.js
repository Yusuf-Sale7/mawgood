import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductEffects from "./productEffects";

const initialState = {
  details: {},
  similar: [],
  userReview: {
    id: "",
    username: "",
    name: "",
    date: "",
    rate: 0,
    comment: "",
  },
  isLoading: false,
  isLoadingSimiar: false,
  sendReviewPending: false,
};

// Review Product
export const reviewProduct = createAsyncThunk(
  "product/reviewProduct",
  (_, thunkAPI) => {
    const { userReview } = thunkAPI.getState().product;

    return ProductEffects.reviewProduct(userReview);
  }
);

// Get Product Details
export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  (id) => {
    return ProductEffects.getProductDetails(id);
  }
);

// Get Similar Products
export const getSimilarProducts = createAsyncThunk(
  "product/getSimilarProducts",
  (id) => {
    return ProductEffects.getSimilarProducts(id);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    patchUserReview: (state, action) => {
      Object.assign(state.userReview, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Get Product Details
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProductDetails.rejected, (state) => {
      state.isLoading = false;
    });

    // Review Product
    builder.addCase(reviewProduct.pending, (state) => {
      state.sendReviewPending = true;
    });
    builder.addCase(reviewProduct.fulfilled, (state, action) => {
      state.details = action.payload;
      state.sendReviewPending = false;
    });
    builder.addCase(reviewProduct.rejected, (state) => {
      state.sendReviewPending = false;
    });

    // Get Similar Products
    builder.addCase(getSimilarProducts.pending, (state) => {
      state.isLoadingSimiar = true;
    });
    builder.addCase(getSimilarProducts.fulfilled, (state, action) => {
      state.similar = action.payload.products;
      state.isLoadingSimiar = false;
    });
    builder.addCase(getSimilarProducts.rejected, (state) => {
      state.isLoadingSimiar = false;
    });
  },
});

export const { patchUserReview } = productSlice.actions;
export default productSlice.reducer;
