import { Stack, styled } from "@mui/material";
import colors from "@/theme/colors";

export const Container = styled("div")`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 8px;
  min-height: 63px;
  margin-top: 16px;
  border: 2px dashed ${colors.darkGrey};
  border-radius: 0.8rem;
  color: ${colors.font};

  &:hover {
    border-color: ${colors.darkerGrey};
  }

  &.disabled {
    pointer-events: none;
  }

  &.error {
    border-color: ${colors.error};
  }

  &.on-drag-over {
    border-color: ${colors.primary};
  }
`;

export const ChipContainer = styled(Stack)`
  margin: 5px 0;
`;

export const Wrapper = styled("div")`
  display: flex;
  align-items: center;

  h3 {
    font-style: italic;
    font-size: 0.9rem;
  }
`;
