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
            key={product.id_product}
            id={product.id_product}
            image={`https://demo.aroma-perfume.net/backend/uploads/${product.url_img}`}
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
