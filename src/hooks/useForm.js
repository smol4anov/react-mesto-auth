import React from 'react';

export function useForm(inputValues, messages) {
  const [values, setValues] = React.useState(inputValues);
  const [validationMessages, setValidationMessages] = React.useState(messages);
  const handleChange = (event) => {
    const { value, name, validationMessage } = event.target;
    setValues({ ...values, [name]: value });
    setValidationMessages({ ...validationMessages, [name]: validationMessage });
  };
  return { values, validationMessages, handleChange, setValues, setValidationMessages };
}