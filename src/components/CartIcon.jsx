import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CartIcon() {
  return (
    <Link to="/checkout" className="cart-icon">
      <FaShoppingCart />
    </Link>
  );
}
