import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../Context";
import axios from "axios";
import { getWord } from "../translate";

export default function AddCartModal() {
  const { openModal, handleCloseModal, modalData, handleAddToCart } = useContext(AppContext);

  const [formData, setFormData] = useState();
  const [options, setOptions] = useState({});

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sumAllSelectedOptions = () => {
    let sum = options.size ? 0 : formData.productPrice;
    Object.keys(options).forEach((key) => {
      options[key].forEach((el) => {
        if (el.name === "size") {
          el.value === formData[el.name] && (sum += el.price);
        } else {
          el.value === formData[el.name] && (sum += el.price);
        }
      });
    });
    console.log(sum);
    sum *= formData?.quantity;
    console.log(sum);
    return sum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToCart({ ...formData, totalSum: sumAllSelectedOptions() });
    handleCloseModal();
  };

  useEffect(() => {
    setFormData({ ...formData, ...modalData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalData]);

  useEffect(() => {
    axios
      .post("https://demo.aroma-perfume.net/backend/product/getProductOption", {
        id: String(modalData.productId),
      })
      .then((res) => {
        setOptions(res.data.data);
        const tmpFormData = { ...modalData, quantity: 1 };
        Object.keys(res.data.data).forEach((key) => {
          if (key === "size") tmpFormData[key] = res.data.data[key][0].value;
          else tmpFormData[key] = "";
        });
        setFormData(tmpFormData);
      });
  }, [modalData]);

  return (
    <AnimatePresence>
      {openModal && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="modal"
          onClick={(e) => !e.target.closest(".modal--content") && handleCloseModal()}
        >
          <motion.div
            animate={{ top: "50%" }}
            initial={{ top: "-10%" }}
            exit={{ top: "-50%" }}
            className="modal--content"
          >
            <header className="modal--header">
              <h3 className="modal--title">{modalData.productName}</h3>
              <FaTimes className="modal--close" onClick={handleCloseModal} />
            </header>
            <div className="main">
              <img src={modalData.productImage} alt={modalData.productName} />
              <span className="price">{modalData.productPrice}  {getWord("unit")}</span>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="quantity">الكمية</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    id="quantity"
                    name="quantity"
                    onChange={handleFormChange}
                  />
                </div>
                {Object.keys(options).map((key, index) => (
                  <div className="form-group" key={key}>
                    <label htmlFor={`option${index}`}>{getWord(key)}</label>
                    <select id={`option${index}`} name={key} onChange={handleFormChange}>
                      {key !== "size" && (
                        <option key={index} value="">
                          None
                        </option>
                      )}
                      {options[key].map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.value} [{option.price}  {getWord("unit")}]
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </form>
            </div>
            <footer className="modal--footer">
              <button id="submit" className="btn btn--primary" onClick={handleSubmit}>
                {getWord("addCart")}
              </button>
              <button id="close" className="btn btn--danger__light" onClick={handleCloseModal}>
                {getWord("close")}
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
