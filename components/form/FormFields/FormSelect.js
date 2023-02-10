import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

export default function FormSelect({ selectLabel, formOptions, ...rest }) {
  const { register } = useFormContext();
  if (!formOptions) return null;
  const { name } = rest;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          opacity: 1,
          y: 0,
        },
        hidden: { opacity: 0, y: -10 },
      }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
      className="flex flex-col py-2"
    >
      <label className="font-bold pl-2 text-sm" htmlFor={name}>
        {selectLabel || name}
      </label>
      <select
        {...register(name, {
          required: true,
        })}
        id={name}
        className="form-input bg-zinc-400/20 p-2 rounded-lg"
        {...rest}
      >
        {formOptions.map(({ option, ...opt }, index) => (
          <option className="bg-zinc-700 text-white" key={index} {...opt}>
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
