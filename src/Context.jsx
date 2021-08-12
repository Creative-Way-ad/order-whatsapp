import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getWord } from "./translate";

export const AppContext = React.createContext();

export function AppContextProvider({ children }) {
  const defaulDataModal = {
    productName: "",
    productImage: "",
    productPrice: 0,
  };
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(defaulDataModal);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const handleOpenModal = (modalData) => {
    setOpenModal(true);
    setModalData(modalData);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalData(defaulDataModal);
  };

  const handleAddToCart = (product) => {
    setCart(cart.concat([product]));
    toast.success(getWord("ProductAddedToCart"));
  };

  const handleRemoveFromCart = (index) => {
    console.log(index);
    const tmpCart = [...cart];
    tmpCart.splice(index, 1);
    console.log(tmpCart);
    setCart(tmpCart);
    toast.success(getWord("ProductRemovedFromCart"));
  };

  const filterProducts = (filter) => {
    if (filter !== "-1") {
      axios
        .post("https://demo.aroma-perfume.net/backend/product/getProductShop", {
          filter: ` where car_product.id_cat = ${filter}`,
        })
        .then((res) => {
          setProducts(res.data.data);
        });
    } else {
      getAllProducts();
    }
  };

  const getAllProducts = () => {
    axios
      .post("https://demo.aroma-perfume.net/backend/product/getProductShop", {
        filter: " ",
      })
      .then((res) => {
        setProducts(res.data.data);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    const tempProducts = [];
    products.forEach((product) => {});
  }, [products]);

  return (
    <AppContext.Provider
      value={{
        openModal,
        modalData,
        handleOpenModal,
        handleCloseModal,
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        products,
        filterProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const tempProducts = [
  {
    id: 1,
    name: "منتج 1",
    price: 10,
    category: "فطار",
    image: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 2,
    name: "منتج 2",
    price: 20,
    category: "غذاء",
    image: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 3,
    name: "منتج 3",
    price: 30,
    category: "فطار",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 4,
    name: "منتج 4",
    price: 30,
    category: "غذاء",
    image: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 5,
    name: "منتج 5",
    price: 30,
    category: "غذاء",
    image: "https://images.pexels.com/photos/286283/pexels-photo-286283.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 6,
    name: "منتج 6",
    price: 30,
    category: "فطار",
    image: "https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 7,
    name: "منتج 7",
    price: 30,
    category: "حلويات",
    image: "https://images.pexels.com/photos/1854652/pexels-photo-1854652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
  {
    id: 8,
    name: "منتج 8",
    price: 30,
    category: "حلويات",
    image: "https://images.pexels.com/photos/853006/pexels-photo-853006.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    description:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى",
  },
];
