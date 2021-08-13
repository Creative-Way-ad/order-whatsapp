import React, { useState, useContext, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { AppContext } from "../Context";
import { getWord } from "../translate";

export default function Menu() {
  const { filterProducts } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  const handleOpen = (e) => {
    const isNav = e.target.tagName === "NAV";
    const isDropDownUl = e.target.tagName === "LI" && e.target.className.includes("nav--item__dropdown");
    if (isNav || isDropDownUl) return null;
    if (open && e.target.dataset.filter) filterProducts(e.target.dataset.filter.trim());
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .post("https://demo.aroma-perfume.net/backend/product/allCat", {
        filter: "",
      })
      .then((res) => {
        const items = res.data.data;
        const parents = [...new Set(items.map((item) => item.parentName))];
        const tmpMenu = [];
        parents.forEach((parent) => {
          tmpMenu.push({
            name: parent,
            children: items.map((item) => item.parentName === parent && { id: item.catId, name: item.name }),
          });
        });
        setMenu(tmpMenu);
      });
  }, []);

  return (
    <div className="menu">
      <span className="menu__icon" onClick={handleOpen}>
        <FaBars />
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className="menu__content"
            onClick={handleOpen}
          >
            <motion.nav
              className="nav"
              onClick={handleOpen}
              animate={{ left: 0 }}
              initial={{ left: -400 }}
              exit={{ left: -400 }}
            >
              <span className="menu__close">
                <FaTimes />
              </span>
              <ul>
                <li className="nav__item" data-filter="-1">
                  {getWord("seeAll")}
                </li>
                {menu.map((item) => (
                  <li key={item.name} className="nav__item nav__item--dropdown">
                    {item.name}
                    <ul className="dropdown dropdown--open">
                      {item.children.map((child) => (
                        <li key={child.id} className="dropdown__item" data-filter={child.id}>
                          {child.name}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
