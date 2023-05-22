import { FC } from "react";
import Spinner from "../Spinners/Spinner";
type Props = {
  loading: boolean;
  text: string;
  style: string;
  type?: "button" | "submit" | "reset" | undefined;
};
const LoadingButton: FC<Props> = ({ loading, text, type, style }) => {
  return (
    <button type={type ? type : "button"} className={style}>
      {loading ? <Spinner /> : text}
    </button>
  );
};

export default LoadingButton;
