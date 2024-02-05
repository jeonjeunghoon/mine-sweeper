import { ChangeEvent, FormEvent, useState } from "react";

type Args = {
  initialValues: Record<string, string>;
  initializedErrors: Record<string, string> | null;
  submitForm: () => void;
  validateInput: (values: Record<string, string>) => Record<string, string>;
  validateForm: (values: Record<string, string>) => string;
};

export const useForm = ({
  initialValues,
  initializedErrors,
  submitForm,
  validateInput,
  validateForm,
}: Args) => {
  const [values, setValues] = useState(initialValues);
  const [inputErrors, setInputErrors] = useState(initializedErrors);
  const [formError, setFormError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value,
    };

    const newErrors = validateInput(newValues);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setInputErrors(newErrors);
      return;
    }

    setInputErrors(initializedErrors);
    setValues(newValues);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newError = validateForm(values);

    if (newError !== "") {
      setFormError(newError);
      return;
    }

    setFormError("");
    submitForm();
  };

  return { values, inputErrors, formError, handleChange, handleSubmit };
};
