import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [isEmailRegFilled, setIsEmailRegFilled] = useState(false);
  const [isPassRegFilled, setIsPassRegFilled] = useState(false);
  const [isPassConfirmRegFilled, setIsPassConfirmRegFilled] = useState(false);

  const emailRegisterInput = useRef();
  const passwordRegisterInput = useRef();
  const passwordConfirmRegisterInput = useRef();

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

  function handleChange(ref, type) {
    setRegisterData({ ...registerData, [type]: ref.value });
  }

  return (
    <div className="register-container">
      <form className="register-form-wrapper">
        <span className="register-title">Registre seus dados</span>
        <div className="register-email-wrapper">
          <input
            type="text"
            name="email"
            ref={emailRegisterInput}
            onChange={() => handleChange(emailRegisterInput.current, "email")}
            className="register-input-email"
          />
          <span
            className={
              isEmailRegFilled
                ? "register-placeholder email-register-active"
                : "register-placeholder"
            }
          >
            Digite seu email
          </span>
        </div>
        <div className="register-password1-wrapper">
          <input
            type="password"
            name="password"
            ref={passwordRegisterInput}
            onChange={() => handleChange(passwordRegisterInput.current, "password")}
            className="register-input-password1"
          />
          <span
            className={
              isPassRegFilled
                ? "register-placeholder password-register-active"
                : "register-placeholder"
            }
          >
            Digite sua senha
          </span>
        </div>
        <div className="register-password2-wrapper">
          <input
            type="password"
            name="passwordConfirm"
            ref={passwordConfirmRegisterInput}
            onChange={() => handleChange(passwordConfirmRegisterInput.current, "passwordConfirm")}
            className="register-input-password2"
          />
          <span
            className={
              isPassConfirmRegFilled
                ? "register-placeholder password-confirm-register-active"
                : "register-placeholder"
            }
          >
            Confirme sua senha
          </span>
        </div>
        <button className="register-submit-btn">Enviar dados</button>
        <Link to="/login" className="login-link">
          Ja possui cadastro?
        </Link>
      </form>
    </div>
  );
}

export default Register;
