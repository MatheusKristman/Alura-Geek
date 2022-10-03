import React, { useState, useRef, useEffect, useLayoutEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data.json";
import { SearchContext } from "../App";
import "./Products.css";

function Product() {
  const [productData, setProductData] = useState(data);
  const initialFilterCost = {
    cost1: false,
    cost2: false,
    cost3: false,
    cost4: false,
    cost5: false,
    cost6: false,
    all: false,
  };
  const [filterCost, setFilterCost] = useState(initialFilterCost);
  const [length, setLength] = useState(0);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [isMobileFilterClicked, setIsMobileFilterClicked] = useState(false);
  const [checkClick, setCheckClick] = useState(false);

  const productsBox = useRef(null);
  const actionFigureCheckInput = useRef();
  const consolesCheckInput = useRef();
  const accessoriesCheckInput = useRef();
  const costFilter1 = useRef();
  const costFilter2 = useRef();
  const costFilter3 = useRef();
  const costFilter4 = useRef();
  const costFilter5 = useRef();
  const costFilter6 = useRef();
  const costFilter7 = useRef();

  const navigate = useNavigate();

  const { setInCartPage, filterCateg, setFilterCateg, footerMenuElement } = useContext(SearchContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    costFilter7.current.checked = true;
    setFilterCost({ ...filterCost, all: true });
    setActiveAnimation(false);
    setInCartPage(false);
    footerMenuElement.current.style.display = "flex";
  }, []);

  useLayoutEffect(() => {
    const newLength = productsBox.current.children.length;
    setLength(newLength);

    setActiveAnimation(false);
    setActiveAnimation(true);

    setTimeout(() => {
      setActiveAnimation(false);
    }, 500);
  }, [filterCateg, filterCost, productData]);

  useEffect(() => {
    !filterCateg.actionFigure && !filterCateg.consoles && !filterCateg.accessories
      ? setFilterCateg({ ...filterCateg, allProducts: true })
      : setFilterCateg({ ...filterCateg, allProducts: false });
  }, [filterCateg.actionFigure, filterCateg.consoles, filterCateg.accessories]);

  useEffect(() => {
    let actionFigures = data["action-figures"];
    let consoles = data.consoles;
    let accessories = data.acessorios;

    if (filterCost.cost1) {
      actionFigures = actionFigures.filter((e) => Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 2000);
      consoles = consoles.filter((e) => Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 2000);
      accessories = accessories.filter((e) => Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 2000);
      setProductData({
        ["action-figures"]: actionFigures,
        consoles: consoles,
        acessorios: accessories,
      });
    }

    if (filterCost.cost2) {
      actionFigures = actionFigures.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 1001 &&
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 2000
        );
      });
      consoles = consoles.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 1001 &&
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 2000
        );
      });
      accessories = accessories.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 1001 &&
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 2000
        );
      });
      setProductData({
        ["action-figures"]: actionFigures,
        consoles: consoles,
        acessorios: accessories,
      });
    }

    if (filterCost.cost3) {
      actionFigures = actionFigures.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 501 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 1000
        );
      });
      consoles = consoles.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 501 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 1000
        );
      });
      accessories = accessories.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 501 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 1000
        );
      });
      setProductData({
        ["action-figures"]: actionFigures,
        consoles: consoles,
        acessorios: accessories,
      });
    }

    if (filterCost.cost4) {
      actionFigures = actionFigures.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 301 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 500
        );
      });
      consoles = consoles.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 301 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 500
        );
      });
      accessories = accessories.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 301 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 500
        );
      });
      setProductData({
        ["action-figures"]: actionFigures,
        consoles: consoles,
        acessorios: accessories,
      });
    }

    if (filterCost.cost5) {
      actionFigures = actionFigures.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 101 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 300
        );
      });
      consoles = consoles.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 101 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 300
        );
      });
      accessories = accessories.filter((e) => {
        return (
          Number(e.price.slice(3, e.price.length - 3).replace(".", "")) > 101 && Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 300
        );
      });
      setProductData({
        ["action-figures"]: actionFigures,
        consoles: consoles,
        acessorios: accessories,
      });
    }

    if (filterCost.cost6) {
      actionFigures = actionFigures.filter((e) => {
        return Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 100;
      });
      consoles = consoles.filter((e) => {
        return Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 100;
      });
      accessories = accessories.filter((e) => {
        return Number(e.price.slice(3, e.price.length - 3).replace(".", "")) <= 100;
      });
      setProductData({
        ["action-figures"]: actionFigures,
        consoles: consoles,
        acessorios: accessories,
      });
    }

    if (filterCost.all) {
      setProductData({ ["action-figures"]: actionFigures, consoles, acessorios: accessories });
    }
  }, [filterCost]);

  useEffect(() => {
    function handleFilter() {
      const filterContainer = document.querySelector(".product-filtering-container");
      const categContainer = document.querySelector(".product-category-container");
      const costContainer = document.querySelector(".product-price-container");

      if (checkClick) {
        console.log("checkado");
        if (isMobileFilterClicked && window.innerWidth <= 650) {
          categContainer.style.display = "block";
          costContainer.style.display = "block";
          categContainer.style.animation = "FadeFilterTextIn 0.5s ease 0.5s forwards";
          costContainer.style.animation = "FadeFilterTextIn 0.5s ease 0.5s forwards";
          filterContainer.style.animation = "FadeFilterIn 0.5s ease forwards";
        }

        if (!isMobileFilterClicked && window.innerWidth <= 650) {
          categContainer.style.animation = "none";
          costContainer.style.animation = "none";
          filterContainer.style.animation = "FadeFilterMobileOut 0.5s ease forwards";
          categContainer.style.display = "none";
          costContainer.style.display = "none";
        }

        if (isMobileFilterClicked && window.innerWidth <= 380) {
          categContainer.style.display = "block";
          costContainer.style.display = "block";
          categContainer.style.animation = "FadeFilterTextIn 0.5s ease 0.5s forwards";
          costContainer.style.animation = "FadeFilterTextIn 0.5s ease 0.5s forwards";
          filterContainer.style.animation = "FadeFilterMobileIn 0.5s ease forwards";
        }

        if (!isMobileFilterClicked && window.innerWidth <= 380) {
          categContainer.style.animation = "none";
          costContainer.style.animation = "none";
          filterContainer.style.animation = "FadeFilterOut 0.5s ease forwards";
          categContainer.style.display = "none";
          costContainer.style.display = "none";
        }

        if (window.innerWidth > 650) {
          categContainer.style.display = "block";
          costContainer.style.display = "block";
          categContainer.style.animation = "none";
          costContainer.style.animation = "none";
          filterContainer.style.animation = "none";
        }
      }
    }
    handleFilter();
  }, [isMobileFilterClicked]);

  function handleFilteringCateg(ref, type) {
    if (ref.current.checked) {
      setFilterCateg({ ...filterCateg, [type]: true });
    } else {
      setFilterCateg({ ...filterCateg, [type]: false });
    }
  }

  function handleFilteringCost(ref, type) {
    if (ref.current.checked) {
      setFilterCost({ ...initialFilterCost, [type]: true });
    }
  }

  function handleFilterMobile() {
    if (window.innerWidth <= 650) {
      console.log("clicado");
      setIsMobileFilterClicked(!isMobileFilterClicked);
      setCheckClick(true);
    }
  }

  // function handleNavigation(id) {
  //   navigate(id);
  // }

  return (
    <div className="product-container">
      <div className="product-up">
        <div className="product-title">
          <h2>Todos os produtos</h2>
        </div>
      </div>

      <div className="product-down">
        <div className="product-filtering">
          <h2
            className={isMobileFilterClicked && window.innerWidth <= 650 ? "product-filtering-title-active" : "product-filtering-title"}
            onClick={handleFilterMobile}
          >
            Filtros
          </h2>
          <div className="product-filtering-container">
            <div className="product-category-container">
              <h3 className="product-category-title">Categorias</h3>
              <div className="product-category">
                <label htmlFor="actionFiguresCateg" className="product-action-figures-categ-label">
                  Action Figures
                  <input
                    type="checkbox"
                    name="actionFiguresCateg"
                    id="actionFiguresCateg"
                    className="product-action-figures-categ-input"
                    checked={filterCateg.actionFigure}
                    ref={actionFigureCheckInput}
                    onClick={() => handleFilteringCateg(actionFigureCheckInput, "actionFigure")}
                  />
                  <span className="checkbox" />
                </label>

                <label htmlFor="consolesCateg" className="product-consoles-categ-label">
                  Consoles
                  <input
                    type="checkbox"
                    name="consolesCateg"
                    id="consolesCateg"
                    className="product-consoles-categ-input"
                    checked={filterCateg.consoles}
                    ref={consolesCheckInput}
                    onClick={() => handleFilteringCateg(consolesCheckInput, "consoles")}
                  />
                  <span className="checkbox" />
                </label>

                <label htmlFor="accessoriesCateg" className="product-accessories-categ-label">
                  Acessórios
                  <input
                    type="checkbox"
                    name="accessoriesCateg"
                    id="accessoriesCateg"
                    className="product-accessories-categ-input"
                    checked={filterCateg.accessories}
                    ref={accessoriesCheckInput}
                    onClick={() => handleFilteringCateg(accessoriesCheckInput, "accessories")}
                  />
                  <span className="checkbox" />
                </label>
              </div>
            </div>

            <div className="product-price-container">
              <h3 className="product-price-title">Preço</h3>
              <div className="product-price">
                <label htmlFor="price1" className="product-price-label">
                  Acima de R$2.000,00
                  <input
                    type="radio"
                    name="price"
                    id="price1"
                    className="product-price-input"
                    value="2001"
                    ref={costFilter1}
                    onClick={() => handleFilteringCost(costFilter1, "cost1")}
                  />
                  <span className="radio" />
                </label>
                <label htmlFor="price2" className="product-price-label">
                  Entre R$1.001,00 a R$2.000,00
                  <input
                    type="radio"
                    name="price"
                    id="price2"
                    className="product-price-input"
                    value="1001"
                    ref={costFilter2}
                    onClick={() => handleFilteringCost(costFilter2, "cost2")}
                  />
                  <span className="radio" />
                </label>
                <label htmlFor="price3" className="product-price-label">
                  Entre R$501,00 a R$1.000,00
                  <input
                    type="radio"
                    name="price"
                    id="price3"
                    className="product-price-input"
                    value="501"
                    ref={costFilter3}
                    onClick={() => handleFilteringCost(costFilter3, "cost3")}
                  />
                  <span className="radio" />
                </label>
                <label htmlFor="price4" className="product-price-label">
                  Entre R$301,00 a R$500,00
                  <input
                    type="radio"
                    name="price"
                    id="price4"
                    className="product-price-input"
                    value="301"
                    ref={costFilter4}
                    onClick={() => handleFilteringCost(costFilter4, "cost4")}
                  />
                  <span className="radio" />
                </label>
                <label htmlFor="price5" className="product-price-label">
                  Entre R$101,00 a R$300,00
                  <input
                    type="radio"
                    name="price"
                    id="price5"
                    className="product-price-input"
                    value="101"
                    ref={costFilter5}
                    onClick={() => handleFilteringCost(costFilter5, "cost5")}
                  />
                  <span className="radio" />
                </label>
                <label htmlFor="price6" className="product-price-label">
                  Abaixo de R$100,00
                  <input
                    type="radio"
                    name="price"
                    id="price6"
                    className="product-price-input"
                    value="100"
                    ref={costFilter6}
                    onClick={() => handleFilteringCost(costFilter6, "cost6")}
                  />
                  <span className="radio" />
                </label>
                <label htmlFor="price7" className="product-price-label">
                  Qualquer valor
                  <input
                    type="radio"
                    name="price"
                    id="price7"
                    className="product-price-input"
                    value="all"
                    ref={costFilter7}
                    onClick={() => handleFilteringCost(costFilter7, "all")}
                  />
                  <span className="radio" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div ref={productsBox} className="products-box" style={length !== 0 ? { display: "flex" } : { display: "none" }}>
          {filterCateg.actionFigure || filterCateg.allProducts
            ? productData["action-figures"].map((data, index) => (
                <div key={index} style={activeAnimation ? { animation: "FadeIn 0.5s ease forwards" } : {}} className="action-figure-container">
                  <div className="af-image-price-prod" style={{ backgroundImage: `url(/assets/products/${data.image})` }}>
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
              ))
            : null}

          {filterCateg.consoles || filterCateg.allProducts
            ? productData.consoles.map((data, index) => (
                <div key={index} style={activeAnimation ? { animation: "FadeIn 0.5s ease forwards" } : {}} className="c-container">
                  <div className="c-image-price-prod" style={{ backgroundImage: `url(/assets/products/${data.image})` }}>
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
              ))
            : null}

          {filterCateg.accessories || filterCateg.allProducts
            ? productData.acessorios.map((data, index) => (
                <div key={index} style={activeAnimation ? { animation: "FadeIn 0.5s ease forwards" } : {}} className="a-container">
                  <div className="a-image-price-prod" style={{ backgroundImage: `url(/assets/products/${data.image})` }}>
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
              ))
            : null}
        </div>
        {length === 0 && (
          <h2 style={activeAnimation ? { animation: "FadeIn 0.5s ease forwards" } : {}} className="product-not-found">
            Nenhum Produto foi encontrado
          </h2>
        )}
      </div>
    </div>
  );
}

export default Product;
