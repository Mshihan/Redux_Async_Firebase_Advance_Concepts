import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const items = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((products) => (
          <CartItem
            item={{
              id: products.id,
              title: products.name,
              quantity: products.quantity,
              total: products.totalPrice,
              price: products.price,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
