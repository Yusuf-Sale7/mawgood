import { configureStore } from "@reduxjs/toolkit";
import userSilce from "./user/userSilce";
import homeSlice from "./home/homeSlice";
import searchSlice from "./search/searchSlice";
import productSlice from "./product/productSlice";
import contactSlice from "./contact/contactSlice";

const store = configureStore({
  reducer: {
    user: userSilce,
    home: homeSlice,
    search: searchSlice,
    product: productSlice,
    contact: contactSlice,
  },
});

export default store;
