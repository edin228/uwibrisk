import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import * as Fields from "./FormFields";

export default function ContactForm({ style, id, fields = [] }) {
  const { handleSubmit, getValues, watch, ...methods } = useForm();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [watchBusinessQuestions, setwatchBusinessQuestions] = useState(true);
  const [showProducerPanel, setShowProducerPanel] = useState(false);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
      if (name == "InsuranceType") {
        if (value[name] == "Business Insurance") {
          setwatchBusinessQuestions(true);
        } else {
          setwatchBusinessQuestions(false);
        }
      }
      if (name == "Estimated Revenue" || name == "Industry") {
        if (value["Estimated Revenue"] >= 10000 && value["Industry"] != '') {
          setShowProducerPanel(true);
        } else {
          setShowProducerPanel(false);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
        <div className="flex flex-col lg:flex-row w-full h-full">
          <div className="flex flex-col w-full h-full duration-100 transition-all ease-out">
            {fields?.map(({ __typename, ...field }, index) => {
              const Field = Fields[__typename];
              if (!Field) return null;
              if (
                field.name == "Industry" ||
                field.name == "Estimated Revenue"
              ) {
                return (
                  watchBusinessQuestions && <Field key={index} {...field} />
                );
              } else {
                return <Field key={index} {...field} />;
              }
            })}
          </div>
        </div>
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
