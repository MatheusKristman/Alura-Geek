import React, { useState, useRef, useEffect } from "react";
import "./Login.css";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isPasswordFilled, setIsPasswordFilled] = useState(false);

  const emailLoginInput = useRef();
  const passwordLoginInput = useRef();

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

  function handleChange(ref, type) {
    setLoginData({ ...loginData, [type]: ref.value });
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
              className="login-input-email"
            />
            <span
              className={
                isEmailFilled ? "login-placeholder login-email-active" : "login-placeholder"
              }
            >
              Digite seu email
            </span>
          </div>
          <div className="login-password-wrapper">
            <input
              type="password"
              name="password"
              ref={passwordLoginInput}
              onChange={() => handleChange(passwordLoginInput.current, "password")}
              className="login-input-password"
            />
            <span
              className={
                isPasswordFilled ? "login-placeholder login-password-active" : "login-placeholder"
              }
            >
              Digite sua senha
            </span>
          </div>
          <button className="login-submit-btn">Entrar</button>
        </form>
        <button className="login-create-account">Crie sua conta</button>
      </div>
    </div>
  );
}

export default Login;
