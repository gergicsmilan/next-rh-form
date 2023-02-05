import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { useCallback, useMemo, useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import LoadingIndicator from "../_components/LoadingIndicator";
import RequiredIndicator from "../_components/RequiredIndicator";

type Props<T extends FieldValues> = OutlinedInputProps & {
  name: Path<T>;
  rules?: RegisterOptions;
  disableAutoComplete?: boolean;
  hideError?: boolean;
  isLoading?: boolean;
};

const PasswordField = <T extends FieldValues>({
  name,
  rules,
  ...props
}: Props<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const methods = useFormContext<T>();
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>({ name, rules, control: methods.control });

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword, setShowPassword]);

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
      <InputLabel htmlFor={name}>
        <RequiredIndicator show={!!rules?.required && !!props.label} />
        {props.label}
      </InputLabel>
      <OutlinedInput
        {...field}
        type={showPassword ? "text" : "password"}
        autoComplete={props.disableAutoComplete ? "new-password" : ""}
        error={!!error}
        label={props.label}
        endAdornment={
          <InputAdornment position="end">
            {!props.isLoading && (
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            )}
            <LoadingIndicator isLoading={isLoading} />
          </InputAdornment>
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

export default PasswordField;
