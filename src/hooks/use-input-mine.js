import { useReducer } from "react";

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      enteredValue: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "BLUR") {
    return {
      enteredValue: state.enteredValue,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return {
      //defaultInputState, // takhle to nejde zapsat. Slo by jako return defaultInputState. bez tech {}. protoze to by bylo return {{}}, ten defaultINputState uz je v{}, jde o objekt.
      enteredValue: '',
      isTouched: false,
    };
  }
  return defaultInputState;
};

const defaultInputState = { enteredValue: "", isTouched: false };

function useInputMine(validateValue) {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    defaultInputState
  );

  function valueInputChangeHandler(event) {
    dispatchInput({ type: "CHANGE", value: event.target.value });
  }

  function valueInputBlurHandler() {
    dispatchInput({ type: "BLUR" });
  }

  function resetInput() {
    dispatchInput({ type: "RESET" });
  }

  const valueIsValid = validateValue(inputState.enteredValue);
  const inputValueHasErrors = !valueIsValid && inputState.isTouched;

  return {
    enteredValue: inputState.enteredValue,
    valueIsValid,
    inputValueHasErrors,
    valueInputChangeHandler,
    valueInputBlurHandler,
    resetInput,
  };
}

export default useInputMine;
