import {
  Autocomplete,
  AutocompleteValue,
  Chip,
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import texts from "@/plugins/Texts/texts";
import { useCallback, useMemo } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import RequiredIndicator from "./_components/RequiredIndicator";
import LoadingIndicator from "./_components/LoadingIndicator";

type Props<T extends FieldValues, O extends ValueType = {}> = TextFieldProps & {
  name: Path<T>;
  rules?: RegisterOptions;
  options: Option<O>[] | undefined;
  disableAutoComplete?: boolean;
  hideError?: boolean;
  endAdornment?: React.ReactNode;
  isReturnObj?: boolean;
  isLoading?: boolean;
};

const MultiSelect = <T extends FieldValues, O extends ValueType = {}>({
  name,
  rules,
  ...props
}: Props<T, O>) => {
  const methods = useFormContext<T>();
  const {
    field: { onChange, ...fieldMethods },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>({ name, rules, control: methods.control });

  const loadOptionLabelFromId = useCallback(
    (id: string) => props.options?.find((o) => o.id === id)?.label ?? "",
    [props.options]
  );

  const isLoading = useMemo(
    () => !!props.isLoading || !!methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading, props.isLoading]
  );

  return (
    <FormControl fullWidth margin="dense">
      <Autocomplete
        {...fieldMethods}
        className={props.className}
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
        limitTags={5}
        style={props.style}
        multiple
        disableCloseOnSelect
        onChange={(
          _: React.ChangeEvent<{}>,
          _value: AutocompleteValue<Option<O>[], false, false, string>
        ) => {
          const newValue = props.isReturnObj
            ? _value
            : _value?.map((v) => v?.id || v) ?? null;
          onChange(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="dense"
            variant={"outlined"}
            label={
              <>
                <RequiredIndicator show={!!rules?.required && !!props.label} />
                {props.label}
              </>
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
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Tooltip
              placement="top"
              title={
                option?.label ||
                loadOptionLabelFromId(option as unknown as string)
              }
              key={option?.id ?? option}
            >
              <Chip
                {...getTagProps({ index })}
                label={
                  option?.label ||
                  loadOptionLabelFromId(option as unknown as string)
                }
              />
            </Tooltip>
          ));
        }}
      />
      {!props.hideError && (
        <FormHelperText error={!!error}>
          {error ? error.message : <wbr />}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default MultiSelect;
