import { FormProvider, useForm } from "react-hook-form";

import * as Fields from "./FormFields";

export default function Form({ style, fields = [] }) {
  const { handleSubmit, getValues, ...methods } = useForm();
  if (!fields) return null;

  const onSubmit = (data) => console.log(data);
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
      </form>
    </FormProvider>
  );
}
