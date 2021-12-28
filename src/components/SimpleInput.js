import { useState, useEffect } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const [formIsValid,setIsFormValid]=useState(false);

  const {
    value: enteredName,
    valueIsValid:enteredNameIsValid,
    hasErrors: nameInputHasErrors, // takhle priradime aliasy tem funkcim
    valueInputChange: nameInputChange,
    valueInputBlurHandler: nameInputBlurHandler,
    resetInput:resetNameInput,
  } = useInput(validateNameInput); // nebo: useInput(value => value.trim() !== '')

  function validateNameInput(value) {
    return value.trim() !== "";
  }

  const {
    value: enteredEmail,
    valueIsValid:enteredEmailIsValid,
    hasErrors: emailInputHasErrors,
    valueInputChange: emailInputChange,
    valueInputBlurHandler: emailInputBlurHandler,
    resetInput:resetEmailInput,
  } = useInput(value => value.includes('@')); 

  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  /*
  Nebo:
  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid=true;
  }
  */

  function formSubmission(event) {
    event.preventDefault();
    if (!enteredNameIsValid) {
      return;
    }
    console.log(enteredName);
    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasErrors
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasErrors
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmission}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChange}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputHasErrors && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChange}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasErrors && (
          <p className="error-text">
            E=mail must not be empty and must include '@' symbol.
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;

/*
const nameInputRef = useRef();

const enteredValue = nameInputRef.current.value;
console.log(enteredValue);

PRED POUZITIM CUSTOM HOOK USEINPUT:
//const [enteredName, setEnteredName] = useState("");
  //const [enteredEmail, setEnteredEmail] = useState("");
  // puvodni verze: const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // na zacatku jsme dali enteredNameIsValid true, aby se ten error neukazovalo hned po spusteni.
  // ale to by mohlo pozdeji zpusobovat chyby. neni to uplne spravne.
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  const [formIsValid, setIsFormValid] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  // bude to invalid, kdyz uz byla form touchnuta a zaroven je to enteredName invalidni.

  const enteredEmailIsValid =
    enteredEmail.trim() !== "" && enteredEmail.includes("@");
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

function nameInputChange(event) {
    setEnteredName(event.target.value);
  }

  function emailInputChange(event) {
    setEnteredEmail(event.target.value);
  }

  function nameInputBlurHandler(event) {
    setEnteredNameTouched(true);
  }

  function emailInputBlurHandler(event) {
    setEnteredEmailTouched(true);
  }

  function formSubmission(event) {
    event.preventDefault();
    setEnteredNameTouched(true); // predtim nez zcheckneme jestli je to valid.
    if (!enteredNameIsValid) {
      return;
    }
    console.log(enteredName);
    setEnteredName("");
    setEnteredEmail("");
    setEnteredNameTouched(false); // resettujeme touched state
    setEnteredEmailTouched(false);
  }
  */
