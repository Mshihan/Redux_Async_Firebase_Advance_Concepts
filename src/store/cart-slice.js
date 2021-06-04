import { createSlice } from "@reduxjs/toolkit";
import { cartActions } from "./ui-slice";

const initialState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        state.totalQuantity++;
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.totalQuantity++;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        // state.items.remove(existingItem);
        state.items = state.items.filter((item) => item.id !== id);
        state.totalQuantity--;
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.totalQuantity--;
      }
    },
  },
});

///Action "Thunk" function
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-89bb8-default-rtdb.firebaseio.com/task.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Cart details sending failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent cart data successfully",
        })
      );
    } catch (error) {
      console.log(error.message);
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error..",
          message: "Sending cart data faild!",
        })
      );
    }
  };
};

export const cartManipulationAction = cartSlice.actions;
export default cartSlice.reducer;
