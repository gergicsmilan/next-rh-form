import { CircularProgress } from "@mui/material";
import { CSSProperties } from "react";

type Props = {
  isLoading: boolean;
  size?: string;
  style?: CSSProperties;
};

const defaultSize = "1.2rem";

const LoadingIndicator = ({ isLoading, size, style }: Props) =>
  isLoading ? (
    <CircularProgress
      style={{
        height: size ?? defaultSize,
        width: size ?? defaultSize,
        ...style,
      }}
    />
  ) : (
    <></>
  );

export default LoadingIndicator;
