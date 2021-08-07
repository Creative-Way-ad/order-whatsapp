import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { AppContext } from "../Context";
import { toast } from "react-toastify";

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
      sum += item.productPrice * item.productQuantity;
    });
    return sum;
  };

  const handleOrder = () => {
    if (formData.name === "" || formData.address === "" || formData.time === "") {
      return toast.error("يرجى ملء جميع الحقول");
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
        <h2 className="checkout--title">ارسال الطلب</h2>
        <div className="checkout--content">
          <div className="checkout--summary">
            <section className="section">
              <h3 className="section--title">الحساب</h3>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.productName} [الكمية: {item.productQuantity}]
                    <span className="price">${item.productPrice}</span>
                  </li>
                ))}
              </ul>
              <p>
                التوصيل:
                <span className="price">$20</span>
              </p>
              <p>
                المجموع الكلي:
                <span className="price">${cartTotal + 20}</span>
              </p>
              <button className="btn btn--primary" onClick={handleOrder}>
                اطلب الآن
              </button>
            </section>
          </div>
          <div className="checkout--info">
            <section className="section">
              <h3 className="section--title">معلومات عن المشتري</h3>
              <div className="form-group">
                <label htmlFor="name">اسم المشتري</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />
              </div>
            </section>
            <section className="section">
              <h3 className="section--title">مزيد من المعلومات عن الطلب</h3>
              <div className="form-group">
                <label htmlFor="address">عنوان التوصيل</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="time">وقت التوصيل</label>
                <input type="datetime-local" name="time" id="time" value={formData.time} onChange={handleChange} />
              </div>
            </section>
            <section className="section">
              <h3 className="section--title">تعليق</h3>
              <textarea id="comment" name="comment" value={formData.comment} onChange={handleChange}></textarea>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
