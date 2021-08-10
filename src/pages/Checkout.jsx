import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AppContext } from "../Context";
import { toast } from "react-toastify";
import { getWord } from "../translate";

export default function Checkout() {
  const { cart } = useContext(AppContext);
  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    time: "",
    comment: "",
  });
  const [cartTotal, setCartTotal] = useState(0);

  const handleChange = (e) => {
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
    if (formData.name === "" || formData.address === "" || formData.time === "") {
      return toast.error(getWord("errFillEmpty"));
    }

    const message = `
هذه رساله الطلب الخاصه بي

المنتجات المطلوبه:
${cart
  .map((item) => {
    return `${item.productName} ${item.productQuantity} ${item.productPrice}`;
  })
  .join("\n")}

المبلغ المطلوب + التوصيل: $${sumCartTotals() + 20}

=============

اسمي: ${formData.name}
العنوان: ${formData.address}
الوقت: ${formData.time}
التفاصيل: ${formData.comment || "لا يوجد"}


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
        <h2 className="checkout--title"></h2>
        <div className="checkout--content">
          <div className="checkout--summary">
            <section className="section">
              <h3 className="section--title">{getWord("computation")}</h3>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.productName} [{getWord("quantity")}: {item.quantity}]
                    <span className="price">${item.totalSum}</span>
                  </li>
                ))}
              </ul>
              <p>
                {getWord("delivery")}:<span className="price">$20</span>
              </p>
              <p>
                {getWord("summation")}:<span className="price">${cartTotal + 20}</span>
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
      </div>
    </div>
  );
}
