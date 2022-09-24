import React, { useEffect, useState, createContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Product from "./components/Product";
import NotFound from "./components/NotFound";
import Logo from "./assets/Logo.png";
import "./App.css";

export const SearchContext = createContext();

function App() {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(true);
  const [contactUsData, setContactUsData] = useState({
    name: "",
    message: ""
  });
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isMessageFilled, setIsMessageFilled] = useState(false);

  const nameFooterInput = useRef();
  const messageFooterInput = useRef();

  useEffect(() => {
    function handleAnimation() {
      const header = document.querySelector("#headerMobile");

      if (!isSearchClicked) {
        header.style.animation = "searchFadeOut 0.5s ease forwards";
        setTimeout(() => {
          header.style.display = "none";
        }, 500);
      } else {
        header.style = {};
      }
    }

    handleAnimation();
  }, [isSearchClicked]);

  useEffect(() => {
    function handleNamePlaceholder() {
      if (contactUsData.name !== "") {
        setIsNameFilled(true);
      } else {
        setIsNameFilled(false);
      }
    }
    handleNamePlaceholder();
  }, [contactUsData.name]);

  useEffect(() => {
    function handleMessagePlaceholder() {
      if (contactUsData.message !== "") {
        setIsMessageFilled(true);
      } else {
        setIsMessageFilled(false);
      }
    }
    handleMessagePlaceholder();
  }, [contactUsData.message]);

  function handleSearch() {
    setIsSearchClicked(!isSearchClicked);
  }

  function handleClose() {
    setIsSearchClicked(false);
  }

  function handleChange(ref, type) {
    setContactUsData({ ...contactUsData, [type]: ref.value });
  }

  return (
    <SearchContext.Provider value={setIsSearchClicked}>
      <Router>
        {isUserLogged ? (
          <header className="home-header">
            <div className="header-wrapper">
              <div className="hw-left">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
                <div className="header-input-div">
                  <input type="text" name="searchProduct" />
                  <button className="search-btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="hw-right-l">
                <div className="hw-cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <div className="hw-cart-counter">0</div>
                </div>
                <div className="hw-user-logged">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
            </div>
            <div
              className="header-mobile-wrapper"
              style={isSearchClicked ? { justifyContent: "center" } : {}}
            >
              <div
                id="hwLeft"
                className="hw-left"
                style={isSearchClicked ? { display: "none" } : {}}
              >
                <img src={Logo} alt="Logo" />
                <button
                  className="search-mobile-btn"
                  onClick={handleSearch}
                  style={isSearchClicked ? { display: "none" } : {}}
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div
                id="hwRight"
                className="hw-right-l"
                style={isSearchClicked ? { display: "none" } : {}}
              >
                <div className="hw-cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <div className="hw-cart-counter">10</div>
                </div>
                <div className="hw-user-logged">
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
              <div
                id="headerMobile"
                className={isSearchClicked ? "header-input-div active" : "header-input-div"}
              >
                <input type="text" name="searchProduct" />
                <button className="search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <button onClick={handleClose} className="close-search-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </header>
        ) : (
          <header className="home-header">
            <div className="header-wrapper">
              <div className="hw-left">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
                <div className="header-input-div">
                  <input type="text" name="searchProduct" />
                  <button className="search-btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
              <div className="hw-right">
                <Link to="/register" className="register-btn">
                  Registrar
                </Link>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </div>
            </div>
            <div
              className="header-mobile-wrapper"
              style={isSearchClicked ? { justifyContent: "center" } : {}}
            >
              <div
                id="hwLeft"
                className="hw-left"
                style={isSearchClicked ? { display: "none" } : {}}
              >
                <img src={Logo} alt="Logo" />
              </div>
              <div
                id="hwRight"
                className="hw-right"
                style={isSearchClicked ? { display: "none" } : {}}
              >
                <Link to="/register" className="register-btn">
                  Registrar
                </Link>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </div>
              <button
                className="search-mobile-btn"
                onClick={handleSearch}
                style={isSearchClicked ? { display: "none" } : {}}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <div
                id="headerMobile"
                className={isSearchClicked ? "header-input-div active" : "header-input-div"}
              >
                <input type="text" name="searchProduct" />
                <button className="search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <button onClick={handleClose} className="close-search-btn">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          </header>
        )}

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/products/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="home-footer">
          <div className="home-footer-container">
            <div className="home-footer-wrapper">
              <div className="home-footer-logo-item">
                <img src={Logo} alt="Logo Footer" />
              </div>
              <div className="home-footer-links-item">
                <ul className="home-footer-links">
                  <li>Quem somos nós</li>
                  <li>Política de privacidade</li>
                  <li>Programa fidelidade</li>
                  <li>Nossas lojas</li>
                  <li>Quero ser franqueado</li>
                  <li>Anuncie aqui</li>
                </ul>
              </div>
              <div className="home-footer-message-item">
                <span className="home-footer-message-title">Fale conosco</span>
                <div className="footer-input-name-wrapper">
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    ref={nameFooterInput}
                    onChange={() => handleChange(nameFooterInput.current, "name")}
                    className="footer-input-name"
                  />
                  <span
                    className={isNameFilled ? "input-placeholder name-active" : "input-placeholder"}
                  >
                    Nome
                  </span>
                </div>
                <div className="footer-textarea-message-wrapper">
                  <textarea
                    name="message"
                    autoComplete="off"
                    ref={messageFooterInput}
                    onChange={() => handleChange(messageFooterInput.current, "message")}
                    className="footer-textarea-message"
                  />
                  <span
                    className={
                      isMessageFilled ? "input-placeholder message-active" : "input-placeholder"
                    }
                  >
                    Digite sua mensagem
                  </span>
                </div>
                <button className="home-footer-message-btn">Enviar mensagem</button>
              </div>
            </div>
            <div className="dev-wrapper">
              <small>Desenvolvido por Matheus Kristman</small>
              <div className="dev-links-wrapper">
                <a target="_blank" rel="noreferrer" href="https://github.com/MatheusKristman">
                  <i className="fa-brands fa-square-github"></i>
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/matheus-kristman-07a947171/"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>

        <ul className="header-nav-menu-mobile">
          <li className="nav-home">
            <i className="fa-solid fa-house"></i>
          </li>
          <li className="nav-cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <div className="hw-cart-counter">99</div>
          </li>
          <li className="nav-user">
            <i className="fa-solid fa-user"></i>
          </li>
        </ul>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
