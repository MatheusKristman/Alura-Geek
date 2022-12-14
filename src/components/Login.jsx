import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import validate from "../ValidateLogin";
import { SearchContext } from "../App";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);
  const [registeredUserData, setRegisteredUserData] = useState({});
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailLoginInput = useRef();
  const passwordLoginInput = useRef();

  const { setIsUserLogged, setInCartPage, setCameFromCart, cameFromCart, footerMenuElement } = useContext(SearchContext);

  const navigate = useNavigate();

  useState(() => {
    function fetchRegisteredData() {
      window.scrollTo(0, 0);
      const registData = JSON.parse(localStorage.getItem("RegisteredData")) || {};
      setRegisteredUserData(registData);
      setInCartPage(false);
    }
    fetchRegisteredData();
    footerMenuElement.current.style.display = "none";
  }, []);

  useEffect(() => {
    function handleEmailPlaceholder() {
      if (loginData.email !== "") {
        setIsEmailFilled(true);
      } else {
        setIsEmailFilled(false);
      }
    }
    handleEmailPlaceholder();
  }, [loginData.email]);

  useEffect(() => {
    function handlePasswordPlaceholder() {
      if (loginData.password !== "") {
        setIsPasswordFilled(true);
      } else {
        setIsPasswordFilled(false);
      }
    }
    handlePasswordPlaceholder();
  }, [loginData.password]);

  useEffect(() => {
    if (!error.email && !error.password && emailLoginInput.current.value !== "" && passwordLoginInput.current.value !== "") {
      setIsSubmitting(true);
    }
  }, [error]);

  useEffect(() => {
    if (
      isSubmitting &&
      registeredUserData.email === loginData.email &&
      registeredUserData.password === loginData.password &&
      registeredUserData.hasOwnProperty("email") &&
      registeredUserData.hasOwnProperty("password")
    ) {
      setIsUserLogged(true);
      const userData = loginData;
      localStorage.setItem("UserData", JSON.stringify(userData));
      if (cameFromCart) {
        setCameFromCart("false");
        navigate("/cart");
      } else {
        navigate("/");
      }
    } else {
      if (
        loginData.email !== "" &&
        loginData.password !== "" &&
        (registeredUserData.email !== loginData.email || registeredUserData.password !== loginData.password)
      ) {
        setError({ ...error, email: "Cadastro n??o localizado!" });
        setIsSubmitting(false);
      }
    }
  }, [isSubmitting]);

  function handleChange(ref, type) {
    setLoginData({ ...loginData, [type]: ref.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(validate(loginData));
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <span className="login-title">Entre na sua conta</span>
        <form>
          <div className="login-email-wrapper">
            <input
              type="text"
              name="email"
              ref={emailLoginInput}
              onChange={() => handleChange(emailLoginInput.current, "email")}
              className={error.email ? "login-input-email login-error" : "login-input-email"}
            />
            <span className={isEmailFilled ? "login-placeholder login-email-active" : "login-placeholder"}>Digite seu email</span>
            {error.email && <small className="login-error-email">{error.email}</small>}
          </div>
          <div className="login-password-wrapper">
            <input
              type="password"
              name="password"
              ref={passwordLoginInput}
              onChange={() => handleChange(passwordLoginInput.current, "password")}
              className={error.password ? "login-input-password login-error" : "login-input-password"}
            />
            <span className={isPasswordFilled ? "login-placeholder login-password-active" : "login-placeholder"}>Digite sua senha</span>
            {error.password && <small className="login-error-password">{error.password}</small>}
          </div>
          <button onClick={handleSubmit} className="login-submit-btn">
            Entrar
          </button>
        </form>
        <button onClick={() => navigate("/register")} className="login-create-account">
          Crie sua conta
        </button>
      </div>
    </div>
  );
}

export default Login;
