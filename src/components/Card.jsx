import React, { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { AppContext } from "../Context";

export default function Card({ id, image, name, description, price }) {
  const { handleOpenModal } = useContext(AppContext);

  return (
    <div className="card">
      <div className="card--image">
        <div
          className="card--image__overlay"
          onClick={() => {
            handleOpenModal({
              productId: id,
              productName: name,
              productImage: image,
              productPrice: price,
            });
          }}
        >
          <FaCartPlus />
        </div>
        <img src={image} alt={name} />
      </div>
      <h3 className="card--title">{name}</h3>
      <p className="card--description">{description}</p>
    </div>
  );
}
