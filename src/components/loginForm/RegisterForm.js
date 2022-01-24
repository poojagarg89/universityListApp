import React, { useState } from 'react';
import loginImage from '../../assets/assets-login.png';
import InputComponent from '../../common-components/InputComponent';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../../common-components/HeaderComponent';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    loginId: '',
    password: '',
    confirmPass: '',
  });

  const [loginDetailsError, setLoginDetailsError] = useState({
    loginIdError: '',
    passwordError: '',
  });

  const [showMsg, setShowMsg] = useState('');

  const emailValidator = value => {
    let emailVal = value.toLowerCase();
    let emailPattern = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (emailVal && emailVal.length > 0) {
      let isValidEmail = emailPattern.test(emailVal);
      return isValidEmail;
    } else {
      return false;
    }
  };

  //onchange method for login Inputs
  const onLoginDetailsChange = event => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  //Register Click
  const onRegisterClick = () => {
    let isEmailValid = emailValidator(loginDetails.loginId);
    let isPassValid =
      loginDetails.password && loginDetails.password.length > 0 && loginDetails.password === loginDetails.confirmPass;
    if (isEmailValid && isPassValid) {
      setShowMsg('User registered successfully...!');
      setLoginDetailsError({
        loginIdError: '',
        passwordError: '',
      });
      setLoginDetails({
        loginId: '',
        password: '',
        confirmPass: '',
      });
    } else {
      setLoginDetailsError(prevState => ({
        ...prevState,
        loginIdError: !isEmailValid ? 'Please enter valid email' : '',
        passwordError: !isPassValid ? 'Password and Confirm password must be same' : '',
      }));
    }
  };

  //Cancel Click
  const onCancelClick = () => {
    setLoginDetailsError({
      loginIdError: '',
      passwordError: '',
    });
    setLoginDetails({
      loginId: '',
      password: '',
      confirmPass: '',
    });
    setShowMsg('');
  };

  const onLoginHereClick = () => {
    navigate('/login');
  };

  return (
    <div className="university-login-details">
      <HeaderComponent />
      <div className="university-image-form">
        <img src={loginImage} className="university-login-img" alt="loginImage" />
        <div className="login-details-form">
          <div className="login-header-text">Create Account</div>
          <p className="login-sub-text"></p>

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

          <InputComponent
            textValue={loginDetails.confirmPass}
            textName="confirmPass"
            onInputChange={onLoginDetailsChange}
            textLabel="Confirm Password"
            variant="outlined"
            errorMsg={loginDetailsError.confirmPassError}
            inputType="password"
            inputClass="password-input"
            errorClass="login-error-msg"
          />
          <div className="register-msg">{showMsg}</div>
          <button className="login-button" onClick={onRegisterClick}>
            Register
          </button>
          <button className="create-account-button" onClick={onCancelClick}>
            Cancel
          </button>

          <p className="login-sub-text">
            Already have an account?{' '}
            <span className="login-here-text" onClick={onLoginHereClick}>
              Login Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
