import React, { useEffect, useState, createContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ImExit } from "react-icons/im";
import { BsTrashFill } from "react-icons/bs";
import { IconContext } from "react-icons";
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
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [contactUsData, setContactUsData] = useState({
    name: "",
    message: "",
  });
  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isMessageFilled, setIsMessageFilled] = useState(false);
  const [isCartMenuClicked, setIsCartMenuClicked] = useState(false);
  const [isUserMenuClicked, setIsUserMenuClicked] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const [productBuyed, setProductBuyed] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const nameFooterInput = useRef();
  const messageFooterInput = useRef();
  const productAddedElement = useRef();
  const productAddedElementTablet = useRef();
  const productAddedElementMobile = useRef();

  useEffect(() => {
    function fetchUserData() {
      const user = JSON.parse(localStorage.getItem("UserData")) || null;
      if (user !== null) {
        setIsUserLogged(true);
      }

      const cartProducts = JSON.parse(localStorage.getItem("CartProducts")) || [];
      setProductBuyed(cartProducts);
    }

    fetchUserData();
  }, []);

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

  useEffect(() => {
    function handleCartCount() {
      let cart = 0;
      for (let i = 0; i < productBuyed.length; i++) {
        cart = cart + productBuyed[i].quant;
      }
      setCartCount(cart);
    }
    handleCartCount();
  }, [productBuyed]);

  function handleSearch() {
    setIsSearchClicked(!isSearchClicked);
  }

  function handleClose() {
    setIsSearchClicked(false);
  }

  function handleChange(ref, type) {
    setContactUsData({ ...contactUsData, [type]: ref.value });
  }

  function handleCart() {
    if (isUserMenuClicked) {
      setIsUserMenuClicked(false);
    }
    setIsCartMenuClicked(!isCartMenuClicked);
  }

  function handleUserMenu(e) {
    if (isCartMenuClicked) {
      setIsCartMenuClicked(false);
    }
    setIsUserMenuClicked(!isUserMenuClicked);
  }

  function logoff() {
    localStorage.removeItem("UserData");
    setIsUserLogged(false);
    setIsUserMenuClicked(false);
  }

  function handleCartProdSubQuant(e) {
    let products = [...productBuyed];
    products = products.map((prod, index) =>
      Number(e.currentTarget.id.substring(3, 4)) === index ? { ...prod, quant: prod.quant > 1 ? prod.quant - 1 : prod.quant } : { ...prod }
    );
    setProductBuyed(products);
    localStorage.setItem("CartProducts", JSON.stringify(products));
  }

  function handleCartProdSumQuant(e) {
    let products = [...productBuyed];
    products = products.map((prod, index) => (Number(e.currentTarget.id.substring(3, 4)) === index ? { ...prod, quant: prod.quant + 1 } : { ...prod }));
    setProductBuyed(products);
    localStorage.setItem("CartProducts", JSON.stringify(products));
    console.log(products);
  }

  function handleDeleteProduct(e) {
    let products = [...productBuyed];
    products = products.filter((prod, index) => Number(e.currentTarget.id.substring(3, 4)) !== index);
    setProductBuyed(products);
    localStorage.setItem("CartProducts", JSON.stringify(products));
    console.log(products);
  }

  return (
    <SearchContext.Provider
      value={{
        setIsSearchClicked,
        setIsUserLogged,
        setProductBuyed,
        productBuyed,
        setCartCount,
        cartCount,
        productAdded,
        setProductAdded,
        setIsCartMenuClicked,
        productAddedElement,
        productAddedElementTablet,
        productAddedElementMobile,
      }}
    >
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
                  <i onClick={handleCart} className="fa-solid fa-cart-shopping"></i>
                  {productAdded && (
                    <div ref={productAddedElement} className="product-added-container">
                      <span className="product-added-title">Produto adicionado ao carrinho!</span>
                    </div>
                  )}
                  <div className="hw-cart-counter">{cartCount}</div>
                  {isCartMenuClicked && (
                    <div className="hw-cart-menu">
                      <div className="cart-container">
                        {productBuyed.length !== 0 ? (
                          productBuyed.map((product, index) => (
                            <div key={index} className="cart-element">
                              <div className="cart-images" style={{ backgroundImage: `url(/src/assets/products/${product.image})` }} />
                              <div className="cart-infos">
                                <span className="cart-infos-title">{product.prod}</span>
                                <div className="cart-counter-container">
                                  <button id={`btn${index}`} onClick={handleCartProdSubQuant}>
                                    <i className="fa-solid fa-minus"></i>
                                  </button>
                                  <span className="cart-counter">{product.quant}</span>
                                  <button id={`btn${index}`} onClick={handleCartProdSumQuant}>
                                    <i className="fa-solid fa-plus"></i>
                                  </button>
                                </div>
                                <IconContext.Provider value={{ color: "#FF9900", size: "1rem" }}>
                                  <button id={`del${index}`} onClick={handleDeleteProduct} className="cart-product-delete">
                                    <BsTrashFill />
                                  </button>
                                </IconContext.Provider>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span className="cart-empty">Seu carrinho está vazio :(</span>
                        )}
                      </div>
                      {productBuyed.length !== 0 ? <button className="cart-finish-btn">Finalizar Compra</button> : null}
                    </div>
                  )}
                </div>
                <div className="hw-user-logged">
                  <i onClick={handleUserMenu} className="fa-solid fa-user"></i>
                  {isUserMenuClicked && (
                    <div className="user-logged-container">
                      <h2 className="user-logged-title">Usuário Logado</h2>
                      <IconContext.Provider value={{ size: "1.3rem" }}>
                        <button onClick={logoff} className="user-logged-exit-btn">
                          <ImExit />
                          Sair
                        </button>
                      </IconContext.Provider>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="header-mobile-wrapper" style={isSearchClicked ? { justifyContent: "center" } : {}}>
              <div id="hwLeft" className="hw-left" style={isSearchClicked ? { display: "none" } : {}}>
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
                <button className="search-mobile-btn" onClick={handleSearch} style={isSearchClicked ? { display: "none" } : {}}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div id="hwRight" className="hw-right-l" style={isSearchClicked ? { display: "none" } : {}}>
                <div onClick={handleCart} className="hw-cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {productAdded && (
                    <div ref={productAddedElementTablet} className="product-added-container">
                      <span className="product-added-title">Produto adicionado ao carrinho!</span>
                    </div>
                  )}
                  <div className="hw-cart-counter">{cartCount}</div>
                  {isCartMenuClicked && (
                    <div className="hw-cart-menu">
                      <div className="cart-container">
                        {productBuyed.length !== 0 ? (
                          productBuyed.map((product, index) => (
                            <div key={index} className="cart-element">
                              <div className="cart-images" style={{ backgroundImage: `url(/src/assets/products/${product.image})` }} />
                              <div className="cart-infos">
                                <span className="cart-infos-title">{product.prod}</span>
                                <div className="cart-counter-container">
                                  <button id={`btn${index}`} onClick={handleCartProdSubQuant}>
                                    <i className="fa-solid fa-minus"></i>
                                  </button>
                                  <span className="cart-counter">{product.quant}</span>
                                  <button id={`btn${index}`} onClick={handleCartProdSumQuant}>
                                    <i className="fa-solid fa-plus"></i>
                                  </button>
                                </div>
                                <IconContext.Provider value={{ color: "#FF9900", size: "1rem" }}>
                                  <button id={`del${index}`} onClick={handleDeleteProduct} className="cart-product-delete">
                                    <BsTrashFill />
                                  </button>
                                </IconContext.Provider>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span className="cart-empty">Seu carrinho está vazio :(</span>
                        )}
                      </div>
                      {productBuyed.length !== 0 ? <button className="cart-finish-btn">Finalizar Compra</button> : null}
                    </div>
                  )}
                </div>
                <div className="hw-user-logged">
                  <i onClick={handleUserMenu} className="fa-solid fa-user"></i>
                  {isUserMenuClicked && (
                    <div className="user-logged-container">
                      <h2 className="user-logged-title">Usuário Logado</h2>
                      <IconContext.Provider value={{ size: "1.3rem" }}>
                        <button onClick={logoff} className="user-logged-exit-btn">
                          <ImExit />
                          Sair
                        </button>
                      </IconContext.Provider>
                    </div>
                  )}
                </div>
              </div>
              <div id="headerMobile" style={{ display: "none" }} className={isSearchClicked ? "header-input-div active" : "header-input-div"}>
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
            <div className="header-mobile-wrapper" style={isSearchClicked ? { justifyContent: "center" } : {}}>
              <div id="hwLeft" className="hw-left" style={isSearchClicked ? { display: "none" } : {}}>
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
              <div id="hwRight" className="hw-right" style={isSearchClicked ? { display: "none" } : {}}>
                <Link to="/register" className="register-btn">
                  Registrar
                </Link>
                <Link to="/login" className="login-btn">
                  Login
                </Link>
              </div>
              <button className="search-mobile-btn" onClick={handleSearch} style={isSearchClicked ? { display: "none" } : {}}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <div id="headerMobile" style={{ display: "none" }} className={isSearchClicked ? "header-input-div active" : "header-input-div"}>
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
                  <span className={isNameFilled ? "input-placeholder name-active" : "input-placeholder"}>Nome</span>
                </div>
                <div className="footer-textarea-message-wrapper">
                  <textarea
                    name="message"
                    autoComplete="off"
                    ref={messageFooterInput}
                    onChange={() => handleChange(messageFooterInput.current, "message")}
                    className="footer-textarea-message"
                  />
                  <span className={isMessageFilled ? "input-placeholder message-active" : "input-placeholder"}>Digite sua mensagem</span>
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
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/matheus-kristman-07a947171/">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </footer>

        <ul className="header-nav-menu-mobile">
          <li className="nav-home">
            <Link to="/">
              <i className="fa-solid fa-house"></i>
            </Link>
          </li>
          <li className="nav-cart">
            <i onClick={handleCart} className="fa-solid fa-cart-shopping"></i>
            {productAdded && (
              <div ref={productAddedElementMobile} className="product-added-container">
                <span className="product-added-title">Produto adicionado ao carrinho!</span>
              </div>
            )}
            <div className="hw-cart-counter">{cartCount}</div>
            {isCartMenuClicked && (
              <div className="hw-cart-menu">
                <div className="cart-container">
                  {productBuyed.length !== 0 ? (
                    productBuyed.map((product, index) => (
                      <div key={index} className="cart-element">
                        <div className="cart-images" style={{ backgroundImage: `url(/src/assets/products/${product.image})` }} />
                        <div className="cart-infos">
                          <span className="cart-infos-title">{product.prod}</span>
                          <div className="cart-counter-container">
                            <button id={`btn${index}`} onClick={handleCartProdSubQuant}>
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <span className="cart-counter">{product.quant}</span>
                            <button id={`btn${index}`} onClick={handleCartProdSumQuant}>
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <IconContext.Provider value={{ color: "#FF9900", size: "1rem" }}>
                            <button id={`del${index}`} onClick={handleDeleteProduct} className="cart-product-delete">
                              <BsTrashFill />
                            </button>
                          </IconContext.Provider>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="cart-empty">Seu carrinho está vazio :(</span>
                  )}
                </div>
                {productBuyed.length !== 0 ? (
                  <button className="cart-finish-btn">Finalizar Compra</button>
                ) : (
                  <button className="cart-finish-btn cart-finish-btn-disabled" disabled="true">
                    Finalizar Compra
                  </button>
                )}
              </div>
            )}
          </li>
          <li className="nav-user">
            <i onClick={handleUserMenu} className="fa-solid fa-user"></i>
            {isUserMenuClicked &&
              (isUserLogged ? (
                <div className="user-logged-container">
                  <h2 className="user-logged-title">Usuário Logado</h2>
                  <IconContext.Provider value={{ size: "1.3rem" }}>
                    <button onClick={logoff} className="user-logged-exit-btn">
                      <ImExit />
                      Sair
                    </button>
                  </IconContext.Provider>
                </div>
              ) : (
                <div className="user-logged-container">
                  <Link to="/login" onClick={handleUserMenu} className="user-logged-login-btn">
                    Login
                  </Link>
                  <Link to="/register" onClick={handleUserMenu} className="user-logged-register-btn">
                    Registrar
                  </Link>
                </div>
              ))}
          </li>
        </ul>
      </Router>
    </SearchContext.Provider>
  );
}

export default App;
