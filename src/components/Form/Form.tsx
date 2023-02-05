import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export type FormContextType = {
  isLoading?: boolean;
};

type Props<T extends FieldValues, CT> = {
  onSubmit: SubmitHandler<T>;
  methods: UseFormReturn<T, CT>;
  children: React.ReactNode;
};

const Form = <
  TFormValues extends Record<string, any> = Record<string, any>,
  CT extends FormContextType = any
>({
  onSubmit,
  methods,
  children,
}: Props<TFormValues, CT>) => {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
