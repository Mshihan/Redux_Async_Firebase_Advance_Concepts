import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartShow: false,
  notification: null,
};

const cartSlice = createSlice({
  name: "uiSlice",
  initialState: initialState,
  reducers: {
    toggleCartShow(state) {
      state.isCartShow = !state.isCartShow;
    },
    showNotification(state, action) {
      console.log(action.payload);
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
