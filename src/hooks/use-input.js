import { useState } from "react";

function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  
  const valueIsValid = validateValue(enteredValue);
  const hasErrors = !valueIsValid && isTouched;

  function valueInputChange(event) {
    setEnteredValue(event.target.value);
  }

  function valueInputBlurHandler(event) {
    setIsTouched(true);
  }

  function resetInput() {
      setEnteredValue('');
      setIsTouched(false);
  }

  return ({
  value: enteredValue,
  valueIsValid,
  hasErrors, // slo by to zapsat jako hasErrors:hasErrors, ale pomoci moderniho JS to lze zapsat i zkracene
  valueInputChange,
  valueInputBlurHandler,
  resetInput,
  })
  ;
}

export default useInput;
