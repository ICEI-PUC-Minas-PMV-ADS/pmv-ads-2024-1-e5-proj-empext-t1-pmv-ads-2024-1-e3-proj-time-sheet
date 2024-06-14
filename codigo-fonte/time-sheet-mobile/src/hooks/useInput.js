import React from "react";

export function useInput(initialValue = null) {
  const [value, setValue] = React.useState(initialValue);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [errorVisible, setErrorVisible] = React.useState(false);
  const [ignoreError, setIgnoreError] = React.useState(undefined);
  const isFirstRender = React.useRef(true);


  function skipValidation(opc) {
    setIgnoreError(opc);
    setErrorMessage(null);
    setErrorVisible(false);
  }

  const validations = [];

  function setValidation(action, message) {
    validations.push({ action, message });
  }

  function validate(value) {
    setErrorMessage(null);
    setErrorVisible(false);
    setValue(value);

    if (!ignoreError) {
      for (let validation of validations) {
        if (validation.action(value)) {
          setErrorMessage(validation.message);
          setErrorVisible(true);
          setValue(null);
          return false;
        }
      }
    }

    return true;
  }

  React.useEffect(() => {

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      validate(value);
    }
      
  }, [ignoreError])

  return { value, errorMessage, errorVisible, setValidation, validate, skipValidation };
}
