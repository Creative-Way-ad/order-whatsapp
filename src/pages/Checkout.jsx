import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AppContext } from "../Context";
import { toast } from "react-toastify";
import { getWord } from "../translate";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function Checkout() {
  const { cart, handleRemoveFromCart } = useContext(AppContext);
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    address: "",
    time: "",
    comment: "",
  });
  const delivery = 20;
  const [cartTotal, setCartTotal] = useState(0);

  const handleChange = (e) => {
    // if (e.target.name === "phone") {
    //   if (e.target.value.match(/^([^0-9]*)$/g)) {
    //     return e.preventDefault();
    //   }
    // }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sumCartTotals = () => {
    let sum = 0;
    cart.map((item) => {
      sum += item.totalSum;
    });
    return sum;
  };

  const handleOrder = () => {
    if (formData.name === "" || formData.phone === "" || formData.address === "" || formData.time === "") {
      return toast.error(getWord("errFillEmpty"));
    }

    let optionsString = "[";
    cart.forEach(
      (el) => (optionsString += JSON.stringify({ size: el.size, extras: el.extras, crust: el.crust }) + ", ")
    );
    optionsString = optionsString.slice(0, -2);
    optionsString += "]";

    axios
      .post("https://demo.aroma-perfume.net/backend/product/createOrder", {
        paymentMethod: 1,
        deliveryTime: formData.time,
        address: formData.address,
        customerName: formData.name,
        phone: formData.phone,
        comment: formData.comment,
        productId: String(cart.map((item) => item.productId)),
        options: optionsString,
        cost: String(cartTotal + delivery),
      })
      .then((res) => {
        console.log(res, optionsString);
      });

    const message = `
هذه رساله الطلب الخاصه بي

المنتجات المطلوبه:
${cart
  .map((item) => {
    return `${item.productName}, بعدد: ${item.quantity}, بثمن: ${item.totalSum} ${getWord("unit")}`;
  })
  .join("\n")}

المبلغ المطلوب + التوصيل: ${sumCartTotals() + delivery} ${getWord("unit")}  

=============

اسمي: ${formData.name}
الهاتف: ${formData.phone}
العنوان: ${formData.address}
التفاصيل: ${formData.comment || "لا يوجد"}
التاريخ: ${new Date(formData.time).toLocaleDateString()}
الوقت: ${new Date(formData.time).toLocaleTimeString()}

    `;
    window.location.href = `https://wa.me/+201008252601?text=${encodeURIComponent(message)}`;
  };

  useEffect(() => {
    setCartTotal(sumCartTotals());
  }, [cart]);

  return (
    <div className="checkout">
      <Header />
      <div className="container">
        {cart.length > 0 ? (
          <>
            <h2 className="checkout--title">{getWord("sendApplication")}</h2>
            <div className="checkout--content">
              <div className="checkout--summary">
                <section className="section">
                  <h3 className="section--title">{getWord("computation")}</h3>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}>
                        <span className="remove" onClick={() => handleRemoveFromCart(index)}>
                          <FaTrashAlt />
                        </span>
                        {item.productName} [{getWord("quantity")}: {item.quantity}]
                        <span className="price">{item.totalSum} {getWord("unit")}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    {getWord("delivery")}:<span className="price">20 {getWord("unit")}</span>
                  </p>
                  <p>
                    {getWord("summation")}:<span className="price">{cartTotal + delivery} {getWord("unit")}</span>
                  </p>
                  <button className="btn btn--primary" onClick={handleOrder}>
                    {getWord("orderNow")}
                  </button>
                </section>
              </div>
              <div className="checkout--info">
                <section className="section">
                  <h3 className="section--title">{getWord("buyerInfo")}</h3>
                  <div className="form-group">
                    <label htmlFor="name">{getWord("buyerName")}</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{getWord("buyerPhone")}</label>
                    <input type="number" name="phone" id="phone" value={formData.phone} onChange={handleChange} />
                  </div>
                </section>
                <section className="section">
                  <h3 className="section--title">{getWord("orderMoreInfo")}</h3>
                  <div className="form-group">
                    <label htmlFor="address">{getWord("orderAddress")}</label>
                    <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">{getWord("orderTime")}</label>
                    <input type="datetime-local" name="time" id="time" value={formData.time} onChange={handleChange} />
                  </div>
                </section>
                <section className="section">
                  <h3 className="section--title">{getWord("orderComment")}</h3>
                  <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
                </section>
              </div>
            </div>
          </>
        ) : (
          <h2 className="checkout--title">{getWord("cartIsEmpty")}</h2>
        )}
      </div>
    </div>
  );
}
