import FormControl from "@mui/material/FormControl";
import { ChromePicker } from "react-color";
import { styled } from "@mui/material";

export const StyledFormControl = styled(FormControl)`
  div,
  input {
    cursor: pointer;

    &:disabled {
      cursor: default;
    }
  }
`;

export const StyledChromePicker = styled(ChromePicker)`
  position: absolute;
  top: 61px;
  z-index: 90000;
`;

export const ColorIndicator = styled("div")`
  height: 25px;
  width: 25px;
  border-radius: 0.5rem;
`;

export const Backdrop = styled("div")`
  position: fixed;
  inset: 0px;
  z-index: 89999;
`;
