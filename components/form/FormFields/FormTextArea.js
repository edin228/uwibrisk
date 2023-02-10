import { useFormContext } from "react-hook-form";

export default function FormTextArea({ textareaLabel, ...rest }) {
  const { register } = useFormContext();
  const { name } = rest;

  return (
    <div>
      <label>{textareaLabel || name}</label>
      <textarea
        {...register(name,{
          required: true,
        })}
        htmlFor={name}
        id={name}
        {...rest}
      />
    </div>
  );
}
