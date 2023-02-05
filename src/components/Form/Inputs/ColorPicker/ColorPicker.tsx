import {
  FormHelperText,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@mui/material";
import { useMemo, useState } from "react";
import { ColorResult } from "react-color";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import LoadingIndicator from "../_components/LoadingIndicator";
import RequiredIndicator from "../_components/RequiredIndicator";
import {
  Backdrop,
  ColorIndicator,
  StyledChromePicker,
  StyledFormControl,
} from "./ColorPickerStyles";

type Props<T extends FieldValues> = OutlinedInputProps & {
  name: Path<T>;
  rules?: RegisterOptions;
  hideError?: boolean;
  isLoading?: boolean;
};

const DEFAULT_COLOR = "#ffffff";

const ColorPicker = <T extends FieldValues>({
  name,
  rules,
  ...props
}: Props<T>) => {
  const [isColorPickerOpen, setColorPickerOpen] = useState(false);
  const methods = useFormContext<T>();
  const {
    field: { value, onChange, ...fieldMethods },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>({ name, rules, control: methods.control });

  const isLoading = useMemo(
    () => !!props.isLoading || !!methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading, props.isLoading]
  );

  const disabled = useMemo(
    () => props.disabled || isLoading || isSubmitting,
    [isLoading, isSubmitting, props.disabled]
  );

  return (
    <>
      <StyledFormControl
        focused={isColorPickerOpen}
        fullWidth
        margin="dense"
        disabled={disabled}
      >
        <InputLabel htmlFor={name}>
          <RequiredIndicator show={!!rules?.required && !!props.label} />
          {props.label}
        </InputLabel>
        <OutlinedInput
          {...fieldMethods}
          disabled={disabled}
          value={value ?? ""}
          label={props.label}
          autoComplete="off"
          error={!!error}
          onFocus={() => setColorPickerOpen(true)}
          endAdornment={
            <>
              <ColorIndicator
                style={{ background: value ? value : DEFAULT_COLOR }}
                onClick={() => !disabled && setColorPickerOpen(true)}
              />
              <LoadingIndicator isLoading={isLoading} />
            </>
          }
        />
        {isColorPickerOpen && (
          <StyledChromePicker
            color={value ?? DEFAULT_COLOR}
            onChange={(color: ColorResult) => onChange(color.hex)}
          />
        )}
        {!props.hideError && (
          <FormHelperText error={!!error}>
            {error ? error.message : <wbr />}
          </FormHelperText>
        )}
      </StyledFormControl>
      {isColorPickerOpen && (
        <Backdrop onClick={() => setColorPickerOpen(false)} />
      )}
    </>
  );
};

export default ColorPicker;
