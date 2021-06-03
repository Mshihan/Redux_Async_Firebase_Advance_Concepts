import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "./../../store/ui-slice";
import { useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const onClickCartShowHandler = () => {
    dispatch(cartActions.toggleCartShow());
  };

  return (
    <button className={classes.button} onClick={onClickCartShowHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
