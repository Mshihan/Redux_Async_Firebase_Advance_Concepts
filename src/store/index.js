import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./ui-slice";
import cartMainpulationReducer from "./cart-slice";

const store = configureStore({
  reducer: { ui: cartReducer, cart: cartMainpulationReducer },
});

export default store;
