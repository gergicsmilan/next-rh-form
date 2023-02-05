import {
  Autocomplete,
  AutocompleteValue,
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
} from "@mui/material";
import texts from "@/plugins/Texts/texts";
import { SyntheticEvent, useCallback, useMemo } from "react";
import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import LoadingIndicator from "../_components/LoadingIndicator";
import RequiredIndicator from "../_components/RequiredIndicator";

type Props<T extends FieldValues, O extends ValueType = {}> = Omit<
  TextFieldProps,
  "name"
> & {
  name: Path<T>;
  rules?: RegisterOptions;
  options: Option<O>[] | undefined;
  disableAutoComplete?: boolean;
  hideError?: boolean;
  endAdornment?: React.ReactNode;
  isReturnObj?: boolean;
  isLoading?: boolean;
};

const SingleSelect = <T extends FieldValues, O extends ValueType = {}>({
  name,
  rules,
  ...props
}: Props<T, O>) => {
  const methods = useFormContext<T>();
  const {
    field: { onChange, value, ...fieldMethods },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>({ name, rules, control: methods.control });

  const loadOptionLabelFromId = useCallback(
    (id: string) => props.options?.find((o) => o.id === id)?.label ?? "",
    [props.options]
  );

  const loadObjFromId = useCallback(
    (id: string) => props.options?.find((o) => o.id === id),
    [props.options]
  );

  const initValue = useMemo(() => {
    if (value == null || value === "") return null;
    if (typeof value === "string" && props.isReturnObj)
      return loadObjFromId(value);
    return value?.id || value;
  }, [loadObjFromId, props.isReturnObj, value]);

  const isLoading = useMemo(
    () => !!props.isLoading || !!methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading, props.isLoading]
  );

  return (
    <FormControl fullWidth margin="dense">
      <Autocomplete
        {...fieldMethods}
        value={initValue}
        options={props.options ?? []}
        placeholder={props.placeholder}
        noOptionsText={texts.noData}
        getOptionLabel={(option) =>
          option.label || loadOptionLabelFromId(option as unknown as string)
        }
        isOptionEqualToValue={(option, value) =>
          option?.id === value?.id ||
          option?.id === (value as unknown as string)
        }
        disabled={props.disabled || isLoading || isSubmitting}
        style={props.style}
        onChange={(
          _: SyntheticEvent<Element, Event>,
          _value: AutocompleteValue<
            Option<O>,
            PathValue<T, Path<T>>,
            undefined,
            undefined
          >
        ) => {
          const newValue = (_value as Option<O> | null) ?? null;
          onChange(props.isReturnObj ? newValue : newValue?.id ?? null);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="dense"
            variant="outlined"
            label={
              props.label && (
                <>
                  <RequiredIndicator
                    show={!!rules?.required && !!props.label}
                  />
                  {props.label}
                </>
              )
            }
            error={!!error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  {props.endAdornment}
                  {<LoadingIndicator isLoading={isLoading} />}
                </>
              ),
            }}
          />
        )}
      />
      {!props.hideError && (
        <FormHelperText error={!!error}>
          {error ? error.message : <wbr />}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SingleSelect;
