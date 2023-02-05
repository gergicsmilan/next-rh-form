import PrimaryButton from "@/components/Elements/Buttons/PrimaryButton";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
  useMemo,
} from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  text: string;
  onClick?: Function;
  type?: ButtonHTMLAttributes<{}>["type"];
  disabled?: boolean;
  style?: CSSProperties;
};

const SubmitButton = ({
  text,
  type = "submit",
  onClick,
  disabled,
  style,
}: Props) => {
  const methods = useFormContext();

  const isSubmitting = useMemo(
    () => methods.formState.isSubmitting,
    [methods.formState.isSubmitting]
  );

  const isLoading = useMemo(
    () => !!methods.control._options.context?.isLoading,
    [methods.control._options.context?.isLoading]
  );

  return (
    <PrimaryButton
      id={text}
      style={{ marginTop: "1rem", float: "none", ...style }}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      type={type}
      disabled={disabled || isLoading || isSubmitting}
    >
      {text}
      {isSubmitting && (
        <CircularProgress size="1rem" style={{ marginLeft: "1rem" }} />
      )}
    </PrimaryButton>
  );
};

SubmitButton.defaultProps = {
  type: "submit",
};

export default SubmitButton;
