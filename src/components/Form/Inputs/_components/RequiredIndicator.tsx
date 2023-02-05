import colors from "@/theme/colors";

type Props = {
  show: boolean;
};

export const REQUIRED_CHAR = "*";

const RequiredIndicator = ({ show }: Props) =>
  show ? <span style={{ color: colors.error }}>{REQUIRED_CHAR}</span> : <></>;

export default RequiredIndicator;
