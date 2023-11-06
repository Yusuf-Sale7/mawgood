import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContactEffects from "./contactEffects";

const initialState = {
  contactForm: {
    name: "",
    email: "",
    subject: "",
    message: "",
  },
  message: null,
  isLoading: false,
};

// Send Message
export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  (message) => {
    return ContactEffects.sendMessage(message);
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    patchContactForm: (state, action) => {
      Object.assign(state.contactForm, action.payload);
    },
  },
  extraReducers: (builder) => {
    // Send Message
    builder.addCase(sendMessage.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { patchContactForm } = contactSlice.actions;
export default contactSlice.reducer;
