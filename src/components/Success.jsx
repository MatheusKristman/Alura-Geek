import React, { useEffect } from "react";
import "./Success.css";

function Success() {
  useEffect(() => {
    window.scrollTo(0, 0);
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
