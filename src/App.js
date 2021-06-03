import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
let isInitial = true;

function App() {
  const isCartShow = useSelector((state) => state.ui.isCartShow);
  const cart = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        cartActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data",
        })
      );
      const response = await fetch(
        "https://react-http-89bb8-default-rtdb.firebaseio.com/task.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response) {
        dispatch(
          cartActions.showNotification({
            status: "error",
            title: "Error!..",
            message: "Sending cart data faild!",
          })
        );
      }

      dispatch(
        cartActions.showNotification({
          status: "success",
          title: "Success!!",
          message: "Sent cart data successfully",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        cartActions.showNotification({
          status: "error",
          title: "Error!..",
          message: "Sending cart data faild!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={Notification.message}
        />
      )}
      <Layout>
        {isCartShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
