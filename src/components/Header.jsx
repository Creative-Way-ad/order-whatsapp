import React from "react";
import Menu from "./Menu";
import { getWord } from "../translate";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header--content">
          <h1 className="header--titile">
            <Link to="/">{getWord("SiteTitle")}</Link>
          </h1>
          <Menu />
        </div>
      </div>
    </header>
  );
}
