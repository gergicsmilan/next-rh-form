import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
} from "@mui/material";
import React, { useMemo } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";

type Props<T extends FieldValues> = Omit<FormControlLabelProps, "control"> & {
  name: Path<T>;
  rules?: RegisterOptions;
  hideError?: boolean;
  isLoading?: boolean;
  style?: React.CSSProperties | undefined;
};

const Check = <T extends FieldValues>({ name, rules, ...props }: Props<T>) => {
  const methods = useFormContext<T>();
  const {
    field: { value, ...fieldMethods },
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
      disabled={props.disabled || isLoading || isSubmitting}
    >
      <FormControlLabel
        {...fieldMethods}
        label={props.label ?? ""}
        checked={!!value}
        style={props.style}
        control={<Checkbox size="small" />}
      />
      {!props.hideError && (
        <FormHelperText error={!!error}>
          {error ? error.message : <wbr />}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Check;
