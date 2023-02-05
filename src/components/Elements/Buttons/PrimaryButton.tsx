import Button from "@mui/material/Button";
import { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "variant" | "color">;

const PrimaryButton = (props: Props) => (
  <Button
    {...props}
    className={` ${props.className}`}
    variant="contained"
    color="primary"
    disableRipple
    style={{ float: "right", ...props.style }}
  >
    {props.children}
  </Button>
);

export default PrimaryButton;
