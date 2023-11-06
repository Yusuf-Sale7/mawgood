import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserEffects from "./userEffects";
import { toast } from "react-toastify";
import i18next from "i18next";

const initialState = {
  user: { username: null, inCart: [], favorites: [] },
  favorites: [],
  cart: [],
  isLoading: true,
};

// Get user's favorites
export const getUserFavorites = createAsyncThunk(
  "user/getUserFavorites",
  (_, thunkAPI) => {
    const { username } = thunkAPI.getState().user.user;
    return UserEffects.getUserFavorites(username);
  }
);

// Add product to favorites
export const addFavoriteProduct = createAsyncThunk(
  "user/addFavoriteProduct",
  (id, thunkAPI) => {
    const { username } = thunkAPI.getState().user.user;
    return UserEffects.addFavoriteProduct(username, id);
  }
);

// Remove product from favorites
export const removeFavoriteProduct = createAsyncThunk(
  "user/removeFavoriteProduct",
  (id, thunkAPI) => {
    const { username } = thunkAPI.getState().user.user;
    return UserEffects.removeFavoriteProduct(username, id);
  }
);

// Get cart products
export const getCart = createAsyncThunk("user/getCart", (_, thunkAPI) => {
  const { username } = thunkAPI.getState().user.user;
  return UserEffects.getCart(username);
});

// Update cart
export const updateCart = createAsyncThunk(
  "user/updateCart",
  ({ id, quantity, size, color }, thunkAPI) => {
    const { username } = thunkAPI.getState().user.user;
    return UserEffects.updateCart(username, id, quantity, size, color);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    patchUserInfo: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get user's favorites
    builder.addCase(getUserFavorites.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload.favorites;
      state.user = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(getUserFavorites.rejected, (state) => {
      state.isLoading = false;
    });

    // Add product to favorites
    builder.addCase(addFavoriteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFavoriteProduct.fulfilled, (state, action) => {
      state.favorites = action.payload.favorites;
      state.user = action.payload.user;
      state.isLoading = false;
      toast.success(i18next.t("common.add_to_fav_msg"));
    });
    builder.addCase(addFavoriteProduct.rejected, (state) => {
      state.isLoading = false;
    });

    // Remove product from favorites
    builder.addCase(removeFavoriteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFavoriteProduct.fulfilled, (state, action) => {
      state.favorites = action.payload.favorites;
      state.user = action.payload.user;
      state.isLoading = false;
      toast.info(i18next.t("common.remove_from_fav_msg"));
    });
    builder.addCase(removeFavoriteProduct.rejected, (state) => {
      state.isLoading = false;
    });

    // Get cart products
    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.isLoading = false;
    });

    // Update cart
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.cart = action.payload;
      // Update user state to get the number of products in cart every change to view it in navbar & topbar
      state.user = action.payload.user;
      state.isLoading = false;
      toast.success(i18next.t("common.update_cart_msg"));
    });
  },
});

export const { patchUserInfo } = userSlice.actions;
export default userSlice.reducer;
