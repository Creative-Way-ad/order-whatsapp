import React, { useContext } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import CartIcon from "../components/CartIcon";
import { AppContext } from "../Context";

export default function Home() {
  const { products, cart, filterProducts } = useContext(AppContext);
  return (
    <div className="home">
      <Header />
      <div className="products">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
      {cart.length !== 0 && <CartIcon />}
    </div>
  );
}
