import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./Product.css";
import data from "../data.json";

function Product() {  
  const [loading, setLoading] = useState(false)
  const [productSelected, setProductSelected] = useState([]);
  const [productRecommendation, setProductRecommendation] = useState([]);
  const [quant, setQuant] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSelectedData(id) {
      setLoading(true);
      window.scrollTo(0, 0);
      let products = [];
      let productSel = [];
      let productRec = [];
      await data['action-figures'].forEach((e) => products.push(e));
      await data.consoles.forEach((e) => products.push(e));
      await data.acessorios.forEach((e) => products.push(e));
      productSel = await products.filter(product => product.prod === id);
      products = products.filter(prod => prod.prod !== id);
      console.log(products);
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
        quant === 0 ?
          setQuant(0) :
          setQuant(quant - 1);
    }
  }

  return (
    <div className="product-selected-container">
      {!loading && productSelected.map((data, index) => (
        <div key={index} className="product-selected-wrapper">
          <div className="product-selected-images">
            <img src={`/src/assets/products/${data.image}`} alt={data.prod}/>
          </div>
          <div className="product-selected-infos">
            <h2 className="product-selected-title">{id}</h2>
            <div className="product-selected-line" />
            <p className="product-selected-desc">{data.desc}</p>
            <h2 className="product-selected-price">{data.price}</h2>
            <div className="product-selected-buy-wrapper">
              <div className="product-selected-amount-container">
                <button onClick={() => handleQuant("-")}><i className="fa-solid fa-minus"></i></button>
                <span className="product-selected-amount">{quant}</span>
                <button onClick={() => handleQuant("+")}><i className="fa-solid fa-plus"></i></button>
              </div>
              <button className="product-selected-buy">Comprar</button>
            </div>
          </div>
        </div>
      ))}

      <div className="product-recommendation-container">
        <h2 className="product-recommendation-title">Produtos Relacionados</h2>
        <div className="product-recommendation-wrapper">
          {!loading && productRecommendation.map((data, index) => (
            <div key={index} style={{ animation: "FadeIn 0.5s ease forwards" }} className="product-recommendation">
              <div className="product-image-price" style={{ backgroundImage: `url(/src/assets/products/${data.image})` }}>
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
      </div>
    </div>
  )
}

export default Product