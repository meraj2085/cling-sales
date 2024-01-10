"use client";

import { ReactElement, ReactNode, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";

const FormConfig = {
  defaultValues: {},
  resolver: null,
};

const Form = ({ children, submitHandler, defaultValues, resolver }) => {
  const formConfig = { ...FormConfig };

  if (resolver) formConfig.resolver = resolver;
  if (defaultValues) formConfig.defaultValues = defaultValues;

  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    submitHandler(data);
    reset();
  };

  useEffect(() => reset(defaultValues), [defaultValues, reset, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
