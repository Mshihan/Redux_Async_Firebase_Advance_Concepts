import { cartActions } from "./ui-slice";
import { cartManipulationAction } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    dispatch(
      cartActions.showNotification({
        status: "pending",
        title: "Fetching data ...",
        message: "Fetching data from the server...",
      })
    );

    const sendFetchRequest = async () => {
      const response = await fetch(
        "https://react-http-89bb8-default-rtdb.firebaseio.com/task.json",
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Error Fetching Data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await sendFetchRequest();
      //   console.log(cartData);
      dispatch(
        cartManipulationAction.resetCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );

      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "Cart updated!!",
          message: "Cart updated successfully",
        })
      );
    } catch (error) {
      console.log(error.message);
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error fetching cart..",
          message: "Error fetching cart!!",
        })
      );
    }
  };
};

///Action "Thunk" function to send data
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
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
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
