import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartShow: false,
};

const cartSlice = createSlice({
  name: "uiSlice",
  initialState: initialState,
  reducers: {
    toggleCartShow(state) {
      console.log("Executing");
      state.isCartShow = !state.isCartShow;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
