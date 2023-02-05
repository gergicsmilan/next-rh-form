import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Chip,
  FormHelperText,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import texts from "@/plugins/Texts/texts";
import { useCallback, useMemo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import LoadingIndicator from "../_components/LoadingIndicator";
import { ChipContainer, Container, Wrapper } from "./FileDropStyles";

export type Props<T> = DropzoneOptions & {
  name: Path<T>;
  rules?: RegisterOptions;
  hideError?: boolean;
  isLoading?: boolean;
};

const FileDrop = <T extends FieldValues>({
  name,
  rules,
  multiple,
  accept,
  ...props
}: Props<T>) => {
  const [dragOver, setDragOver] = useState(false);
  const methods = useFormContext<T>();
  const {
    field: { value: _value, onChange, ...fieldMethods },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController<T>({ name, rules, control: methods.control });

  const value = useMemo(
    (): File[] => (multiple ? _value : _value ? [_value] : []),
    [_value, multiple]
  );

  const isLoading = useMemo(
    () => !!props.isLoading || !!methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading, props.isLoading]
  );

  const getClassNames = useMemo(() => {
    const errorClass = !!error ? "error" : undefined;
    const dragOverClass = dragOver ? "on-drag-over" : undefined;
    const disabledClass =
      isLoading || isSubmitting || props.disabled ? "disabled" : undefined;
    return [errorClass, dragOverClass, disabledClass].join(" ");
  }, [dragOver, error, isLoading, isSubmitting, props.disabled]);

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple,
    accept,
    disabled: isLoading || isSubmitting || props.disabled,
    onDropRejected: () =>
      !value.length &&
      !accept?.length &&
      methods.setError(name, {
        type: "custom",
        message: texts.validatorTexts.notCorrectFileFormat,
      }),
    onDragEnter: () => setDragOver(true),
    onDrop: () => setDragOver(false),
    onDragLeave: () => setDragOver(false),
    onDropAccepted: (files: File[]) => {
      onChange(multiple ? [...value, ...files] : files[0]);
      error && methods.clearErrors(name);
    },
    ...props,
  });

  const handleDelete = useCallback(
    (file: File) => {
      const newValue = multiple
        ? (value as File[]).filter((f) => f.name !== file.name)
        : null;
      onChange(newValue);
    },
    [multiple, onChange, value]
  );

  return (
    <>
      <Container className={getClassNames} {...getRootProps()}>
        <input {...getInputProps({ ...fieldMethods })} />
        <Wrapper>
          <Typography component="h3">{texts.fileUploadTitle}</Typography>
          {!isLoading && (
            <Tooltip title={texts.selectFile}>
              <IconButton onClick={open} color="primary" size="small">
                <CloudUploadIcon
                  style={{ width: "1.3rem", height: "1.3rem" }}
                />
              </IconButton>
            </Tooltip>
          )}
          <LoadingIndicator
            isLoading={isLoading}
            style={{ marginLeft: "0.8rem" }}
          />
        </Wrapper>
        {!!value.length && (
          <ChipContainer direction="row" spacing={1}>
            {value.map((f, i) => (
              <Chip
                key={f.name + i}
                label={f.name}
                onDelete={() => handleDelete(f)}
              />
            ))}
          </ChipContainer>
        )}
      </Container>
      {!props.hideError && (
        <FormHelperText error={!!error}>
          {error ? error.message : <wbr />}
        </FormHelperText>
      )}
    </>
  );
};

export default FileDrop;
