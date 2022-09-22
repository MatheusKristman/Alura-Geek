import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-wrapper">
        <span className="notfound-title">Error 404</span>
        <span className="notfound-desc">Pagina não encontrada</span>
        <Link to="/" className="notfound-link">
          Voltar para home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
