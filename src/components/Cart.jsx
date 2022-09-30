import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import "./Cart.css";
import Success from "./Success";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [finishBuy, setFinishBuy] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { setInCartPage, setProductBuyed } = useContext(SearchContext);

  useEffect(() => {
    function fetchProducts() {
      window.scrollTo(0, 0);
      const products = JSON.parse(localStorage.getItem("CartProducts"));
      setCartProducts(products);
      const total = products
        .map((prod) => Number(prod.price.slice(3).replace(".", "").replace(",", ".")) * prod.quant)
        .reduce((sum, price) => sum + price);
      setTotal(total);

      if (location.pathname === "/cart") {
        setInCartPage(true);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    function handleFinishBuy() {
      if (finishBuy) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";

        setTimeout(() => {
          document.body.style.overflow = "auto";
          document.body.style.height = "auto";
          localStorage.removeItem("CartProducts");
          setProductBuyed([]);
          navigate("/");
        }, 3000);
      }
    }

    handleFinishBuy();
  }, [finishBuy]);

  function handleBuy() {
    setFinishBuy(true);
  }

  return (
    <div className="cart-page-container">
      {finishBuy && <Success />}
      <div className="cart-page-wrapper">
        <div className="cart-page-products">
          {cartProducts.map((product, index) => (
            <div key={index} className="cart-page-product">
              <div className="cart-page-product-wrapper">
                <div className="cart-page-product-image" style={{ backgroundImage: `url(/assets/products/${product.image})` }} />
                <div className="cart-page-product-info">
                  <span className="cart-page-product-title">{product.prod}</span>
                  <div className="cart-page-product-price-wrapper">
                    <span className="cart-page-product-price">{product.price}</span>
                    <div className="cart-page-quant-container">
                      <span>Quant.:</span>
                      <div className="cart-page-quant-box">
                        <span>{product.quant}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-page-finish-container">
          <h3 className="finish-total-price">
            Total: <span>R$ {String(total.toFixed(2)).replace(".", ",")}</span>
          </h3>
          <button onClick={handleBuy} className="cart-page-finish-buy-btn">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
