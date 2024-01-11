"use client";

import { getErrorMessageByPropertyName } from "@/utils/schemaValidator";
import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  disabled,
  required,
  defaultValue,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
              disabled={disabled ? disabled : false}
              defaultValue={defaultValue}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
