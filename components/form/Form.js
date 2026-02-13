import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import * as Fields from "./FormFields";

export default function Form({ style, id, fields = [] }) {
  const { handleSubmit, getValues, ...methods } = useForm();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  if (!fields) return null;

  const onSubmit = async (values) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify({ id, ...values }),
      });

      if (!response.ok)
        throw new Error(`Something went wrong submitting the form.`);

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) return <p>Form submitted. We&apos;ll be in touch!</p>;
  return (
    <FormProvider {...methods}>
      <form className={style} onSubmit={handleSubmit(onSubmit)}>
        {fields?.map(({ __typename, ...field }, index) => {
          const Field = Fields[__typename];

          if (!Field) return null;

          return <Field key={index} {...field} />;
        })}

        <button
          className="gold-gradient text-white rounded-lg p-2 mt-12"
          type="submit"
        >
          Submit
        </button>
        {error && <span>{error}</span>}
      </form>
    </FormProvider>
  );
}
