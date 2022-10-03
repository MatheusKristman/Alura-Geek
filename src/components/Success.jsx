import React, { useEffect, useContext } from "react";
import { SearchContext } from "../App";
import "./Success.css";

function Success() {
  const { footerMenuElement } = useContext(SearchContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    footerMenuElement.current.style.display = "flex";
  }, []);

  return (
    <div className="success-container">
      <div className="success-box">
        <h2>Compra finalizada com sucesso!</h2>
        <small>Redirecionando...</small>
      </div>
    </div>
  );
}

export default Success;
