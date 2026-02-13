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
        if (value["Estimated Revenue"] >= 10000 && value["Industry"] != "") {
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

  if (success)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-[-80px]">
        <motion.img
          src={`/Asset 6.png`}
          className="flex w-3/4 my-4 xl:w-1/2"
        />
        <div className="my-4 text-5xl font-bold text-center text-yellow-500">Thank You!</div>
        <div className="text-lg font-bold text-center">
          We&apos;ll be in touch soon!
        </div>
      </div>
    );
  return (
    <FormProvider {...methods}>
      <form className={style} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full h-full lg:flex-row">
          <div className="flex flex-col w-full h-full transition-all duration-100 ease-out">
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
          className="p-2 mt-12 text-white rounded-lg gold-gradient"
          type="submit"
        >
          Submit
        </button>
        {error && <span>{error}</span>}
      </form>
    </FormProvider>
  );
}
