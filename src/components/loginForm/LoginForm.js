import React, { useState } from 'react';
import loginImage from '../../assets/assets-login.png';
import InputComponent from '../../common-components/InputComponent';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../common-components/HeaderComponent';

export default function LoginForm() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    loginId: '',
    password: '',
  });

  const [loginDetailsError, setLoginDetailsError] = useState({
    loginIdError: '',
    passwordError: '',
  });

  //onchange method for login Inputs
  const onLoginDetailsChange = event => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  //Login Click
  const onLoginClick = () => {
    const isEmailValid = loginDetails.loginId.length > 0 && loginDetails.loginId === 'pooja.agarwal@gmail.com';
    const isPassValid = loginDetails.password.length > 0 && loginDetails.password === 'Pooja@123';

    if (isEmailValid && isPassValid) {
      navigate('/', { state: { name: 'Pooja Agarwal' } });
    } else {
      setLoginDetailsError(prevState => ({
        ...prevState,
        loginIdError: !isEmailValid ? 'Please enter valid email' : '',
        passwordError: !isPassValid ? 'Please enter valid password' : '',
      }));
    }
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="university-login-details">
      <HeaderComponent />
      <div className="university-image-form">
        <img src={loginImage} className="university-login-img" alt="loginImage" />
        <div className="login-details-form">
          <div className="login-header-text">Welcome Back :)</div>
          <p className="login-sub-text">
            To keep connected please login with your personal information
            <br /> by email address and password
          </p>

          <InputComponent
            textValue={loginDetails.loginId}
            textName="loginId"
            onInputChange={onLoginDetailsChange}
            textLabel="Email"
            variant="outlined"
            errorMsg={loginDetailsError.loginIdError}
            inputClass="loginId-input"
            errorClass="login-error-msg"
          />

          <InputComponent
            textValue={loginDetails.password}
            textName="password"
            onInputChange={onLoginDetailsChange}
            textLabel="Password"
            variant="outlined"
            errorMsg={loginDetailsError.passwordError}
            inputType="password"
            inputClass="password-input"
            errorClass="login-error-msg"
          />

          <button className="login-button" onClick={onLoginClick}>
            Login Now
          </button>
          <button className="create-account-button" onClick={onRegisterClick}>
            Create Account
          </button>
          {/* {showLoginForm && this.displayLoginForm()}
          {!showLoginForm && showSecurityForm && this.displaySecurityForm()}
          {!showLoginForm && !showSecurityForm && showChangePassForm && this.displayChangePasswordForm()} */}
        </div>
      </div>
    </div>
  );
}
