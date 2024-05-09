import React from "react";

export function useInput(initialValue = null) {
  const [value, setValue] = React.useState(initialValue);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [errorVisible, setErrorVisible] = React.useState(false);

  const validations = [];

  function setValidation(action, message) {
    validations.push({ action, message });
  }

  function validate(value) {
    setErrorMessage(null);
    setErrorVisible(false);
    setValue(value);

    for (let validation of validations) {
      if (validation.action(value)) {
        setErrorMessage(validation.message);
        setErrorVisible(true);
        setValue(null);
        return false;
      }
    }

    return true;
  }

  return { value, errorMessage, errorVisible, setValidation, validate };
}
