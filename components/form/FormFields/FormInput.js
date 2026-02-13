import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

export default function FormInput({ inputLabel, type: enumType, ...rest }) {
  const { register } = useFormContext();
  const { name } = rest;
  const type = enumType.toLowerCase();

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
      {inputLabel && (
        <label className="font-bold pl-2 text-sm" htmlFor={name}>
          {inputLabel || name}
        </label>
      )}
      <input
        {...register(name, {
          required: true,
        })}
        id={name}
        type={type}
        className="form-input bg-zinc-400/20 p-2 rounded-lg"
        {...rest}
      />
    </motion.div>
  );
}
