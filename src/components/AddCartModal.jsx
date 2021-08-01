import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { AppContext } from "../Context";

export default function AddCartModal() {
  const { openModal, handleCloseModal, modalData, handleAddToCart } = useContext(AppContext);

  const [formData, setFormData] = useState({
    ...modalData,
    productQuantity: 1,
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToCart(formData);
    handleCloseModal();
  };

  useEffect(() => {
    setFormData({ ...formData, ...modalData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            animate={{ top: "35%" }}
            initial={{ top: "-10%" }}
            exit={{ top: "-30%" }}
            className="modal--content"
          >
            <header className="modal--header">
              <h3 className="modal--title">{modalData.productName}</h3>
              <FaTimes className="modal--close" onClick={handleCloseModal} />
            </header>
            <div className="main">
              <img src={modalData.productImage} alt={modalData.productName} />
              <spam className="price">${modalData.productPrice}</spam>
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="productQuantity">الكمية</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.productQuantity}
                    id="productQuantity"
                    name="productQuantity"
                    onChange={handleFormChange}
                  />
                </div>
              </form>
            </div>
            <footer className="modal--footer">
              <button id="submit" className="btn btn--primary" onClick={handleSubmit}>
                اضف للسلة
              </button>
              <button id="close" className="btn btn--danger__light" onClick={handleCloseModal}>
                اغلاق
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
