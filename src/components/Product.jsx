import React, { useEffect, useState, useLayoutEffect, useRef, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./Product.css";
import data from "../data.json";
import { SearchContext } from "../App";

function Product() {
  const [size, setSize] = useState(window.innerWidth);
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [index, setIndex] = useState(0);
  const [checkRight, setCheckRight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productSelected, setProductSelected] = useState([]);
  const [productRecommendation, setProductRecommendation] = useState([]);
  const [quant, setQuant] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const carousel = useRef();

  const {
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
    setInCartPage,
    isUserLogged,
    setCameFromProduct,
    setSaveUrl,
    setSearchData,
  } = useContext(SearchContext);

  useEffect(() => {
    setQuant(1);
    setInCartPage(false);
    window.scrollTo(0, 0);
  }, [id]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
      setCarouselSlide(0);

      if (document.body.offsetWidth > 1450) {
        setIndex(-1);
      } else {
        setIndex(0);
      }
    }

    window.addEventListener("resize", updateSize);
  });

  useEffect(() => {
    setCarouselSlide(0);

    if (document.body.offsetWidth > 1450) {
      setIndex(-1);
    } else {
      setIndex(0);
    }
  }, [productSelected]);

  useEffect(() => {
    function handleHideRight() {
      if (document.body.offsetWidth > 1070 && index === 1) {
        setCheckRight(true);
      } else if (document.body.offsetWidth > 850 && index === 2) {
        setCheckRight(true);
      } else if (document.body.offsetWidth > 640 && index === 3) {
        setCheckRight(true);
      } else if (document.body.offsetWidth > 425 && index === 4) {
        setCheckRight(true);
      } else if (index === 5) {
        setCheckRight(true);
      } else {
        setCheckRight(false);
      }
    }

    handleHideRight();
  }, [index]);

  useEffect(() => {
    function changePosition() {
      carousel.current.style.transform = `translateX(-${carouselSlide}px)`;
    }

    changePosition();
  }, [carouselSlide]);

  useEffect(() => {
    async function fetchSelectedData(id) {
      setLoading(true);
      window.scrollTo(0, 0);
      let products = [];
      let productSel = [];
      let productRec = [];
      await data["action-figures"].forEach((e) => products.push(e));
      await data.consoles.forEach((e) => products.push(e));
      await data.acessorios.forEach((e) => products.push(e));
      productSel = await products.filter((product) => product.prod === id);
      products = products.filter((prod) => prod.prod !== id);
      while (productRec.length < 6) {
        const index = Math.floor(Math.random() * products.length);
        if (productRec.indexOf(products[index]) === -1) {
          productRec.push(products[index]);
        }
      }
      setProductSelected(await productSel);
      setProductRecommendation(productRec);
    }
    fetchSelectedData(id);
  }, [id]);

  useEffect(() => {
    if (productSelected.length !== 0) {
      setLoading(false);
    }
  }, [productSelected]);

  function handleQuant(operation) {
    switch (operation) {
      case "+":
        setQuant(quant + 1);
        break;
      case "-":
        quant === 1 ? setQuant(1) : setQuant(quant - 1);
    }
  }

  function handleRightClick(e) {
    e.preventDefault();
    setCarouselSlide(carouselSlide + 210);

    if (size > 1070) {
      setIndex(-1);
    } else {
      handleIndexRight();
    }
  }

  function handleLeftClick(e) {
    e.preventDefault();
    setCarouselSlide(carouselSlide - 210);

    if (size > 1450) {
      setIndex(-1);
    } else {
      handleIndexLeft();
    }
  }

  function handleIndexRight() {
    if (size > 1070) {
      if (index < 1) {
        setIndex(index + 1);
      } else {
        setIndex(1);
      }
    } else if (size > 850) {
      if (index < 2) {
        setIndex(index + 1);
      } else {
        setIndex(2);
      }
    } else if (size > 640) {
      if (index < 3) {
        setIndex(index + 1);
      } else {
        setIndex(3);
      }
    } else if (size > 425) {
      if (index < 4) {
        setIndex(index + 1);
      } else {
        setIndex(4);
      }
    } else {
      if (index < 5) {
        setIndex(index + 1);
      } else {
        setIndex(5);
      }
    }
  }

  function handleIndexLeft() {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(0);
    }
  }

  function handleBuy() {
    const product = {
      prod: productSelected[0].prod,
      price: productSelected[0].price,
      image: productSelected[0].image,
      quant: quant,
    };
    let saveProd = productBuyed;
    if (!isUserLogged) {
      setCameFromProduct(true);
      setSaveUrl(location.pathname);
      navigate("/login");
    } else {
      if (product.quant !== 0) {
        if (saveProd.find((prod) => prod.prod === product.prod)) {
          saveProd = saveProd.map((prod) => (prod.prod === product.prod ? { ...prod, quant: prod.quant + product.quant } : { ...prod }));
          setProductBuyed(saveProd);
          setCartCount(cartCount + product.quant);
          localStorage.setItem("CartProducts", JSON.stringify(saveProd));
          setIsCartMenuClicked(false);
          setProductAdded(true);
          window.scrollTo(0, 0);
          setTimeout(() => {
            productAddedElement.current.style.animation = "FadeOutProduct 1s ease forwards";
            productAddedElementTablet.current.style.animation = "FadeOutProduct 1s ease forwards";
            productAddedElementMobile.current.style.animation = "FadeOutProduct 1s ease forwards";
          }, 2100);
          setTimeout(() => {
            setProductAdded(false);
          }, 4000);
        } else {
          saveProd.push(product);
          setProductBuyed(saveProd);
          setCartCount(cartCount + product.quant);
          localStorage.setItem("CartProducts", JSON.stringify(saveProd));
          setIsCartMenuClicked(false);
          setProductAdded(true);
          window.scrollTo(0, 0);
          setTimeout(() => {
            productAddedElement.current.style.animation = "FadeOutProduct 1s ease forwards";
            productAddedElementTablet.current.style.animation = "FadeOutProduct 1s ease forwards";
            productAddedElementMobile.current.style.animation = "FadeOutProduct 1s ease forwards";
          }, 2100);
          setTimeout(() => {
            setProductAdded(false);
          }, 4000);
        }
      }
    }
  }

  return (
    <div className="product-selected-container">
      {!loading &&
        productSelected.map((data, index) => (
          <div key={index} className="product-selected-wrapper">
            <div className="product-selected-images">
              <img src={`/assets/products/${data.image}`} alt={data.prod} />
            </div>
            <div className="product-selected-infos">
              <h2 className="product-selected-title">{id}</h2>
              <div className="product-selected-line" />
              <p className="product-selected-desc">{data.desc}</p>
              <h2 className="product-selected-price">{data.price}</h2>
              <div className="product-selected-buy-wrapper">
                <div className="product-selected-amount-container">
                  <button onClick={() => handleQuant("-")}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="product-selected-amount">{quant}</span>
                  <button onClick={() => handleQuant("+")}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button onClick={handleBuy} className="product-selected-buy">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}

      <div className="product-recommendation-container">
        <h2 className="product-recommendation-title">Produtos Relacionados</h2>
        <div className="product-recommendation-wrapper">
          {size < 1370 ? (
            <button
              onClick={handleLeftClick}
              className="prod-arrow-left"
              style={index === 0 || index === -1 ? { display: "none" } : { display: "flex" }}
            >
              <BsChevronLeft className="prod-arrow-left-icon" />
            </button>
          ) : null}
          <div ref={carousel} className="product-recommendation-elements">
            {!loading &&
              productRecommendation.map((data, index) => (
                <div key={index} style={{ animation: "FadeIn 0.5s ease forwards" }} className="product-recommendation">
                  <div className="product-image-price" style={{ backgroundImage: `url(/assets/products/${data.image})` }}>
                    <span>{data.price}</span>
                  </div>
                  <div className="product-detail">
                    <div className="product-fade" />
                    <div className="product-name-crop">
                      <h3>{data.prod}</h3>
                    </div>
                    <button onClick={() => navigate(`/products/${data.prod}`)}>Ver produto</button>
                  </div>
                </div>
              ))}
          </div>
          {size < 1370 ? (
            <button
              onClick={handleRightClick}
              style={checkRight || index === -1 ? { display: "none" } : { display: "flex" }}
              className="prod-arrow-right"
            >
              <BsChevronRight className="prod-arrow-right-icon" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Product;
