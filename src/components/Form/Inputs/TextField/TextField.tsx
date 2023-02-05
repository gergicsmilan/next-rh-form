import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useMemo } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import LoadingIndicator from "../_components/LoadingIndicator";
import RequiredIndicator from "../_components/RequiredIndicator";

export type Props<T> = OutlinedInputProps & {
  name: Path<T>;
  rules?: RegisterOptions;
  allowAutoComplete?: boolean;
  hideError?: boolean;
  isLoading?: boolean;
};

const TextField = <T extends FieldValues>({
  name,
  rules,
  ...props
}: Props<T>) => {
  const methods = useFormContext<T>();
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>({ name, rules, control: methods.control });

  const isLoading = useMemo(
    () => !!props.isLoading || !!methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading, props.isLoading]
  );

  return (
    <FormControl
      fullWidth
      margin="dense"
      variant="outlined"
      disabled={props.disabled || isLoading || isSubmitting}
    >
      <InputLabel htmlFor={name} variant="outlined">
        <RequiredIndicator show={!!rules?.required && !!props.label} />
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...field}
        type="text"
        label={props.label}
        autoComplete={props.allowAutoComplete ? undefined : "off"}
        error={!!error}
        endAdornment={
          <>
            {!isLoading && props.endAdornment}
            <LoadingIndicator isLoading={isLoading} />
          </>
        }
      />
      {!props.hideError && (
        <FormHelperText error={!!error}>
          {error ? error.message : <wbr />}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextField;
