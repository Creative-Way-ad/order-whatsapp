import React from "react";
import { getWord } from "../translate";

export default function Footer() {
  return (
    <footer className="footer">
      <p>{getWord("copyright")}</p>
    </footer>
  );
}
