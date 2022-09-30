import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import validate from "../Validate";
import { SearchContext } from "../App";
import "./Register.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isEmailRegFilled, setIsEmailRegFilled] = useState(false);
  const [isPassRegFilled, setIsPassRegFilled] = useState(false);
  const [isPassConfirmRegFilled, setIsPassConfirmRegFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});

  const emailRegisterInput = useRef();
  const passwordRegisterInput = useRef();
  const passwordConfirmRegisterInput = useRef();

  const navigate = useNavigate();

  const { setInCartPage } = useContext(SearchContext);

  useEffect(() => {
    setInCartPage(false);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleEmailPlaceholder() {
      if (registerData.email !== "") {
        setIsEmailRegFilled(true);
      } else {
        setIsEmailRegFilled(false);
      }
    }
    handleEmailPlaceholder();
  }, [registerData.email]);

  useEffect(() => {
    function handlePasswordPlaceholder() {
      if (registerData.password !== "") {
        setIsPassRegFilled(true);
      } else {
        setIsPassRegFilled(false);
      }
    }
    handlePasswordPlaceholder();
  }, [registerData.password]);

  useEffect(() => {
    function handlePasswordConfirmPlaceholder() {
      if (registerData.passwordConfirm !== "") {
        setIsPassConfirmRegFilled(true);
      } else {
        setIsPassConfirmRegFilled(false);
      }
    }
    handlePasswordConfirmPlaceholder();
  }, [registerData.passwordConfirm]);

  useEffect(() => {
    if (
      !error.email &&
      !error.password &&
      !error.passwordConfirm &&
      registerData.email !== "" &&
      registerData.password !== "" &&
      registerData.passwordConfirm !== ""
    ) {
      setIsSubmitting(true);
    } else if (error.email) {
      emailRegisterInput.current.value = "";
      setRegisterData({ ...registerData, email: "" });
    } else if (error.password) {
      passwordRegisterInput.current.value = "";
      setRegisterData({ ...registerData, password: "" });
    } else if (error.passwordConfirm) {
      passwordConfirmRegisterInput.current.value = "";
      setRegisterData({ ...registerData, passwordConfirm: "" });
    }
  }, [error]);

  useEffect(() => {
    if (isSubmitting) {
      const registeredData = registerData;
      localStorage.setItem("RegisteredData", JSON.stringify(registeredData));
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSubmitting]);

  function handleChange(ref, type) {
    setRegisterData({ ...registerData, [type]: ref.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(validate(registerData));
  }

  return (
    <div className="register-container">
      {isSubmitting && (
        <div className="register-completed">
          <span>Registrado com sucesso</span>
          <small>Redirecionando...</small>
        </div>
      )}
      <form className="register-form-wrapper">
        <span className="register-title">Registre seus dados</span>
        <div className="register-email-wrapper">
          <input
            type="text"
            name="email"
            ref={emailRegisterInput}
            onChange={() => handleChange(emailRegisterInput.current, "email")}
            className={error.email ? "register-input-email error-input" : "register-input-email"}
          />
          <span className={isEmailRegFilled ? "register-placeholder email-register-active" : "register-placeholder"}>Digite seu email</span>
          <small className="error-email">{error.email}</small>
        </div>
        <div className="register-password1-wrapper">
          <input
            type="password"
            name="password"
            ref={passwordRegisterInput}
            onChange={() => handleChange(passwordRegisterInput.current, "password")}
            className={error.password ? "register-input-password1 error-input" : "register-input-password1"}
          />
          <span className={isPassRegFilled ? "register-placeholder password-register-active" : "register-placeholder"}>Digite sua senha</span>
          <small className="error-pass">{error.password}</small>
        </div>
        <div className="register-password2-wrapper">
          <input
            type="password"
            name="passwordConfirm"
            ref={passwordConfirmRegisterInput}
            onChange={() => handleChange(passwordConfirmRegisterInput.current, "passwordConfirm")}
            className={error.passwordConfirm ? "register-input-password2 error-input" : "register-input-password2"}
          />
          <span className={isPassConfirmRegFilled ? "register-placeholder password-confirm-register-active" : "register-placeholder"}>
            Confirme sua senha
          </span>
          <small className="error-passConf">{error.passwordConfirm}</small>
        </div>
        <button className="register-submit-btn" onClick={handleSubmit}>
          Enviar dados
        </button>
        <Link to="/login" className="login-link">
          Ja possui cadastro?
        </Link>
      </form>
    </div>
  );
}

export default Register;
