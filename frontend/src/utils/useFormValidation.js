import { useCallback, useState } from "react";

export function useFormValidation(initialValues= {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const {name, value, validationMessage, form } = evt.target;
    setValues((oldValues) => ({...oldValues, [name]: value}));
    setErrors((oldErrors) => ({...oldErrors, [name]: validationMessage}));
    setIsValid(form.checkValidity());
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => ({...oldValues, [name]: value}));
  }, [])

  const setError = (validationMessage, name) => {
    setErrors((oldValues) => ({...oldValues, [name]: validationMessage}));
  }

  const reset =  useCallback((initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
    setIsValid(false);
  }, [])



  return { values, errors, isValid, initialValues, handleChange, setValue, setError, reset, setIsValid }
}