import React, { useState } from 'react';
import InputComponent from '../../common-components/InputComponent';
import HeaderComponent from '../../common-components/HeaderComponent';

export default function SubscriptionComponent() {
  const [emailVal, setEmailVal] = useState('');
  const [emailValError, setEmailValError] = useState('');

  const onEmailValChange = e => {
    setEmailVal(e.target.value);
  };

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

  const onSubscribeClick = () => {
    let isEmailValid = emailValidator(emailVal);
    let getEmailValues = window.localStorage.getItem('email');

    if (isEmailValid && getEmailValues !== emailVal) {
      window.localStorage.setItem('email', emailVal);
      setEmailVal('');
      setEmailValError('Email subscribed successfully...!');
    } else {
      setEmailValError('Please enter valid email');
    }
  };

  const onCancelClick = () => {
    setEmailVal('');
    setEmailValError('');
  };
  return (
    <div className="subscribe-main">
      <HeaderComponent showBackBtn />
      <div className="subscribe-input-details">
        <InputComponent
          textValue={emailVal}
          textName="emailVal"
          onInputChange={onEmailValChange}
          textLabel="Email"
          variant="outlined"
          errorMsg={emailValError}
          inputClass="subscribe-input"
          errorClass="subscribe-error-msg"
        />
      </div>
      <div className="subscribe-btn-section">
        <button className="subscribe-btn" onClick={onSubscribeClick}>
          Subscribe
        </button>
        <button className="subscribe-cancel-btn" onClick={onCancelClick}>
          Cancel
        </button>
      </div>
    </div>
  );
}
