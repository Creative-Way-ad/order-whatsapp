import React, { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AppContext } from "../Context";

export default function Menu() {
  const { filterProducts } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const handleOpen = (e) => {
    console.log(e.target.tagName, e.target.className);
    const isNav = e.target.tagName === "NAV";
    const isDropDownUl = e.target.tagName === "LI" && e.target.className.includes("nav--item__dropdown");
    if (isNav || isDropDownUl) return null;
    if (open && e.target.dataset.filter) filterProducts(e.target.dataset.filter.trim());
    setOpen(!open);
  };

  return (
    <div className="menu">
      <span className="menu--icon" onClick={handleOpen}>
        <FaBars />
      </span>
      <div className={`menu--content ${open && "menu--content__open"}`} onClick={handleOpen}>
        <nav className={`nav ${open && "nav__open"}`} onClick={handleOpen}>
          <span className="menu--close">
            <FaTimes />
          </span>
          <ul>
            <li className="nav--item" data-filter="all">
              عرض الكل
            </li>
            <li className="nav--item" data-filter="فطار">
              فطار
            </li>
            <li className="nav--item" data-filter="غذاء">
              غذاء
            </li>
            <li className="nav--item nav--item__dropdown">
              اكلات جانبية
              <ul className="dropdown dropdown__open">
                <li className="dropdown--item" data-filter="حلويات">
                  حلويات
                </li>
                <li className="dropdown--item" data-filter="لا شئ">
                  لا شئ
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
