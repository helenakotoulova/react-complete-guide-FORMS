import useInputMine from "../hooks/use-input-mine";
import { useState, useEffect } from "react";

const BasicForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const {
    enteredValue: enteredFirstName,
    valueIsValid: firstNameIsValid,
    inputValueHasErrors: firstNameHasErrors,
    valueInputChangeHandler: firstNameChangeHandler,
    valueInputBlurHandler: firstNameBlurHandler,
    resetInput: resetFirstName,
  } = useInputMine(validateFirstName);

  function validateFirstName(value) {
    return value.trim() !== "";
  }

  const {
    enteredValue: enteredLastName,
    valueIsValid: lastNameIsValid,
    inputValueHasErrors: lastNameHasErrors,
    valueInputChangeHandler: lastNameChangeHandler,
    valueInputBlurHandler: lastNameBlurHandler,
    resetInput: resetLastName,
  } = useInputMine((value) => value.trim() !== "");

  const {
    enteredValue: enteredEmail,
    valueIsValid: emailIsValid,
    inputValueHasErrors: emailHasErrors,
    valueInputChangeHandler: emailChangeHandler,
    valueInputBlurHandler: emailBlurHandler,
    resetInput: resetEmail,
  } = useInputMine(validateEmail);

  function validateEmail(value) {
    return value.trim() !== "" && value.includes("@");
  }

  useEffect(() => {
    if (firstNameIsValid && lastNameIsValid && emailIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [firstNameIsValid, lastNameIsValid, emailIsValid]);

  function submitFormHandler(event) {
    event.preventDefault();
    if (!formIsValid) {
    //if (!firstNameIsValid || !lastNameIsValid || !emailIsValid) {
      return;
    }
    resetFirstName();
    resetLastName();
    resetEmail();
  }

  const firstNameClasses = firstNameHasErrors
    ? "form-control invalid"
    : "form-control";

  const lastNameClasses = lastNameHasErrors
    ? "form-control invalid"
    : "form-control";

  const emailClasses = emailHasErrors ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={submitFormHandler}>
      <div className={firstNameClasses}>
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          id="name"
          value={enteredFirstName}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
        />
      </div>
      {firstNameHasErrors && (
        <p className="error-text">First Name must not be empty.</p>
      )}
      <div className={lastNameClasses}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={enteredLastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
        />
      </div>
      {lastNameHasErrors && (
        <p className="error-text">Last Name must not be empty.</p>
      )}
      <div className={emailClasses}>
        <label htmlFor="lastName">Email</label>
        <input
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
      </div>
      {emailHasErrors && (
        <p className="error-text">
          Email must not be empty and has to include @.
        </p>
      )}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
