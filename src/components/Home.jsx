import React, { useLayoutEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import data from "../data.json";
import "./Home.css";
import { useEffect } from "react";

function Home() {
  const [size, setSize] = useState(window.innerWidth);
  const [carouselSlideAF, setCarouselSlideAF] = useState(0);
  const [carouselSlideC, setCarouselSlideC] = useState(0);
  const [carouselSlideA, setCarouselSlideA] = useState(0);
  const [indexAf, setIndexAf] = useState(0);
  const [indexC, setIndexC] = useState(0);
  const [indexA, setIndexA] = useState(0);
  const [checkRightAf, setCheckRightAf] = useState(false);
  const [checkRightC, setCheckRightC] = useState(false);
  const [checkRightA, setCheckRightA] = useState(false);

  const { setIsSearchClicked, setInCartPage } = useContext(SearchContext);

  const afCarousel = useRef(null);
  const cCarousel = useRef(null);
  const aCarousel = useRef(null);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
      setCarouselSlideAF(0);
      setCarouselSlideC(0);
      setCarouselSlideA(0);

      if (document.body.offsetWidth > 1450) {
        setIndexAf(-1);
        setIndexC(-1);
        setIndexA(-1);
      } else {
        setIndexAf(0);
        setIndexC(0);
        setIndexA(0);
      }
    }

    window.addEventListener("resize", updateSize);
  });

  useEffect(() => {
    setInCartPage(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleHideRightAf() {
      if (document.body.offsetWidth > 1250 && indexAf === 1) {
        setCheckRightAf(true);
      } else if (document.body.offsetWidth > 1070 && indexAf === 2) {
        setCheckRightAf(true);
      } else if (document.body.offsetWidth > 870 && indexAf === 3) {
        setCheckRightAf(true);
      } else if (document.body.offsetWidth > 650 && indexAf === 4) {
        setCheckRightAf(true);
      } else if (document.body.offsetWidth > 420 && indexAf === 5) {
        setCheckRightAf(true);
      } else if (indexAf === 6) {
        setCheckRightAf(true);
      } else {
        setCheckRightAf(false);
      }
    }

    handleHideRightAf();
  }, [indexAf]);

  useEffect(() => {
    function handleHideRightC() {
      if (document.body.offsetWidth > 1250 && indexC === 1) {
        setCheckRightC(true);
      } else if (document.body.offsetWidth > 1070 && indexC === 2) {
        setCheckRightC(true);
      } else if (document.body.offsetWidth > 870 && indexC === 3) {
        setCheckRightC(true);
      } else if (document.body.offsetWidth > 650 && indexC === 4) {
        setCheckRightC(true);
      } else if (document.body.offsetWidth > 420 && indexC === 5) {
        setCheckRightC(true);
      } else if (indexC === 6) {
        setCheckRightC(true);
      } else {
        setCheckRightC(false);
      }
    }

    handleHideRightC();
  }, [indexC]);

  useEffect(() => {
    function handleHideRightA() {
      if (document.body.offsetWidth > 1250 && indexA === 1) {
        setCheckRightA(true);
      } else if (document.body.offsetWidth > 1070 && indexA === 2) {
        setCheckRightA(true);
      } else if (document.body.offsetWidth > 870 && indexA === 3) {
        setCheckRightA(true);
      } else if (document.body.offsetWidth > 650 && indexA === 4) {
        setCheckRightA(true);
      } else if (document.body.offsetWidth > 420 && indexA === 5) {
        setCheckRightA(true);
      } else if (indexA === 6) {
        setCheckRightA(true);
      } else {
        setCheckRightA(false);
      }
    }

    handleHideRightA();
  }, [indexA]);

  useEffect(() => {
    function changePositionAF() {
      afCarousel.current.style.transform = `translateX(-${carouselSlideAF}px)`;
    }

    changePositionAF();
  }, [carouselSlideAF]);

  useEffect(() => {
    function changePositionC() {
      cCarousel.current.style.transform = `translateX(-${carouselSlideC}px)`;
    }

    changePositionC();
  }, [carouselSlideC]);

  useEffect(() => {
    function changePositionA() {
      aCarousel.current.style.transform = `translateX(-${carouselSlideA}px)`;
    }

    changePositionA();
  }, [carouselSlideA]);

  function handleSearchBlur() {
    setIsSearchClicked(false);
  }

  function handleAfRightClick(e) {
    e.preventDefault();
    setCarouselSlideAF(carouselSlideAF + 210);

    if (size > 1450) {
      setIndexAf(-1);
    } else {
      handleIndexAfRight();
    }
  }

  function handleCRightClick(e) {
    e.preventDefault();
    setCarouselSlideC(carouselSlideC + 210);

    if (size > 1450) {
      setIndexC(-1);
    } else {
      handleIndexCRight();
    }
  }

  function handleARightClick(e) {
    e.preventDefault();
    setCarouselSlideA(carouselSlideA + 210);

    if (size > 1450) {
      setIndexA(-1);
    } else {
      handleIndexARight();
    }
  }

  function handleAfLeftClick(e) {
    e.preventDefault();
    setCarouselSlideAF(carouselSlideAF - 210);

    if (size > 1450) {
      setIndexAf(-1);
    } else {
      handleIndexAfLeft();
    }
  }

  function handleCLeftClick(e) {
    e.preventDefault();
    setCarouselSlideC(carouselSlideC - 210);

    if (size > 1450) {
      setIndexC(-1);
    } else {
      handleIndexCLeft();
    }
  }

  function handleALeftClick(e) {
    e.preventDefault();
    setCarouselSlideA(carouselSlideA - 210);

    if (size > 1450) {
      setIndexA(-1);
    } else {
      handleIndexALeft();
    }
  }

  function handleIndexAfRight() {
    if (size > 1250) {
      if (indexAf < 1) {
        setIndexAf(indexAf + 1);
      } else {
        setIndexAf(1);
      }
    } else if (size > 1070) {
      if (indexAf < 2) {
        setIndexAf(indexAf + 1);
      } else {
        setIndexAf(2);
      }
    } else if (size > 870) {
      if (indexAf < 3) {
        setIndexAf(indexAf + 1);
      } else {
        setIndexAf(3);
      }
    } else if (size > 650) {
      if (indexAf < 4) {
        setIndexAf(indexAf + 1);
      } else {
        setIndexAf(4);
      }
    } else if (size > 420) {
      if (indexAf < 5) {
        setIndexAf(indexAf + 1);
      } else {
        setIndexAf(5);
      }
    } else {
      if (indexAf < 6) {
        setIndexAf(indexAf + 1);
      } else {
        setIndexAf(6);
      }
    }
  }

  function handleIndexCRight() {
    if (size > 1250) {
      if (indexC < 1) {
        setIndexC(indexC + 1);
      } else {
        setIndexC(1);
      }
    } else if (size > 1070) {
      if (indexC < 2) {
        setIndexC(indexC + 1);
      } else {
        setIndexC(2);
      }
    } else if (size > 870) {
      if (indexC < 3) {
        setIndexC(indexC + 1);
      } else {
        setIndexC(3);
      }
    } else if (size > 650) {
      if (indexC < 4) {
        setIndexC(indexC + 1);
      } else {
        setIndexC(4);
      }
    } else if (size > 420) {
      if (indexC < 5) {
        setIndexC(indexC + 1);
      } else {
        setIndexC(5);
      }
    } else {
      if (indexC < 6) {
        setIndexC(indexC + 1);
      } else {
        setIndexC(6);
      }
    }
  }

  function handleIndexARight() {
    if (size > 1250) {
      if (indexA < 1) {
        setIndexA(indexA + 1);
      } else {
        setIndexA(1);
      }
    } else if (size > 1070) {
      if (indexA < 2) {
        setIndexA(indexA + 1);
      } else {
        setIndexA(2);
      }
    } else if (size > 870) {
      if (indexA < 3) {
        setIndexA(indexA + 1);
      } else {
        setIndexA(3);
      }
    } else if (size > 650) {
      if (indexA < 4) {
        setIndexA(indexA + 1);
      } else {
        setIndexA(4);
      }
    } else if (size > 420) {
      if (indexA < 5) {
        setIndexA(indexA + 1);
      } else {
        setIndexA(5);
      }
    } else {
      if (indexA < 6) {
        setIndexA(indexA + 1);
      } else {
        setIndexA(6);
      }
    }
  }

  function handleIndexAfLeft() {
    if (indexAf > 0) {
      setIndexAf(indexAf - 1);
    } else {
      setIndexAf(0);
    }
  }

  function handleIndexCLeft() {
    if (indexC > 0) {
      setIndexC(indexC - 1);
    } else {
      setIndexC(0);
    }
  }

  function handleIndexALeft() {
    if (indexA > 0) {
      setIndexA(indexA - 1);
    } else {
      setIndexA(0);
    }
  }

  return (
    <div className="home-container" onClick={handleSearchBlur}>
      <main className="home-hero">
        <h1>Dezembro Promocional</h1>
        <h3>Produtos selecionados com 33% de desconto</h3>
        <Link to="/products" className="link-hero">
          Ver Produtos
        </Link>
      </main>

      <section className="home-section">
        <div className="action-figures-wrapper">
          <div className="af-up">
            <h2>Action Figures</h2>
            <Link to="/products" className="link-af">
              Ver tudo
            </Link>
          </div>

          <div className="af-down">
            {size < 1880 ? (
              <button
                className="af-arrow-left"
                onClick={handleAfLeftClick}
                style={indexAf === 0 || indexAf === -1 ? { display: "none" } : { display: "flex" }}
              >
                <BsChevronLeft className="af-arrow-left-icon" />
              </button>
            ) : null}
            <div className="af-elements" ref={afCarousel}>
              {data["action-figures"].slice(0, 7).map((data, index) => (
                <div key={index} className="action-figure-container">
                  <div className="af-image-price" style={{ backgroundImage: `url(/src/assets/products/${data.image})` }}>
                    <span>{data.price}</span>
                  </div>
                  <div className="af-product-detail">
                    <div className="af-product-fade" />
                    <div className="af-product-name-crop">
                      <h3>{data.prod}</h3>
                    </div>
                    <button onClick={() => navigate(`/products/${data.prod}`)}>Ver produto</button>
                  </div>
                </div>
              ))}
            </div>
            {size < 1880 ? (
              <button
                className="af-arrow-right"
                onClick={handleAfRightClick}
                style={checkRightAf || indexAf === -1 ? { display: "none" } : { display: "flex" }}
              >
                <BsChevronRight className="af-arrow-right-icon" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="consoles-wrapper">
          <div className="c-up">
            <h2>Consoles</h2>
            <Link to="/products" className="link-c">
              Ver tudo
            </Link>
          </div>

          <div className="c-down">
            {size < 1880 ? (
              <button
                className="c-arrow-left"
                onClick={handleCLeftClick}
                style={indexC === 0 || indexC === -1 ? { display: "none" } : { display: "flex" }}
              >
                <BsChevronLeft className="c-arrow-left-icon" />
              </button>
            ) : null}
            <div className="c-elements" ref={cCarousel}>
              {data.consoles.slice(0, 7).map((data, index) => (
                <div key={index} className="c-container">
                  <div className="c-image-price" style={{ backgroundImage: `url(/src/assets/products/${data.image})` }}>
                    <span>{data.price}</span>
                  </div>
                  <div className="c-product-detail">
                    <div className="c-product-fade" />
                    <div className="c-product-name-crop">
                      <h3>{data.prod}</h3>
                    </div>
                    <button onClick={() => navigate(`/products/${data.prod}`)}>Ver produto</button>
                  </div>
                </div>
              ))}
            </div>
            {size < 1880 ? (
              <button
                className="c-arrow-right"
                onClick={handleCRightClick}
                style={checkRightC || indexC === -1 ? { display: "none" } : { display: "flex" }}
              >
                <BsChevronRight className="c-arrow-right-icon" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="accessories-wrapper">
          <div className="a-up">
            <h2>Acessórios</h2>
            <Link to="/products" className="link-a">
              Ver tudo
            </Link>
          </div>

          <div className="a-down">
            {size < 1880 ? (
              <button
                className="a-arrow-left"
                onClick={handleALeftClick}
                style={indexA === 0 || indexA === -1 ? { display: "none" } : { display: "flex" }}
              >
                <BsChevronLeft className="a-arrow-left-icon" />
              </button>
            ) : null}
            <div className="a-elements" ref={aCarousel}>
              {data.acessorios.slice(0, 7).map((data, index) => (
                <div key={index} className="a-container">
                  <div className="a-image-price" style={{ backgroundImage: `url(/src/assets/products/${data.image})` }}>
                    <span>{data.price}</span>
                  </div>
                  <div className="a-product-detail">
                    <div className="a-product-fade" />
                    <div className="a-product-name-crop">
                      <h3>{data.prod}</h3>
                    </div>
                    <button onClick={() => navigate(`/products/${data.prod}`)}>Ver produto</button>
                  </div>
                </div>
              ))}
            </div>
            {size < 1880 ? (
              <button
                className="a-arrow-right"
                onClick={handleARightClick}
                style={checkRightA || indexA === -1 ? { display: "none" } : { display: "flex" }}
              >
                <BsChevronRight className="a-arrow-right-icon" />
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
