import React from 'react';
import { TextField, FormHelperText } from '@mui/material';

export default function InputComponent({
  onInputChange,
  id,
  textName,
  textLabel,
  variant,
  textValue,
  errorMsg,
  defaultText,
  inputType,
  inputClass,
  errorClass,
}) {
  const handleChange = event => {
    onInputChange(event);
  };

  return (
    <div className="input-comp">
      <TextField
        id={id}
        label={textLabel}
        name={textName}
        value={textValue}
        onChange={handleChange}
        variant={variant}
        defaultValue={defaultText}
        type={inputType ? inputType : 'text'}
        className={inputClass}
      />
      {errorMsg && (
        <FormHelperText style={{ color: 'red', fontSize: '14px' }} className={errorClass}>
          {errorMsg}
        </FormHelperText>
      )}
    </div>
  );
}
