import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppContext } from "../Context";

export default function CartIcon() {
  const { cart } = useContext(AppContext);

  return (
    <Link to="/checkout" className="cart-icon">
      <span className="num">{cart.length}</span>
      <FaShoppingCart />
    </Link>
  );
}
