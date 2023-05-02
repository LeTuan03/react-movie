import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./GlobalStyles.css";

export default function DefaultLayout({ children }) {
  return (
    <div className="body">
      <Header />
      <div
      className="content"
      >{children}</div>
      <Footer />
    </div>
  );
}
