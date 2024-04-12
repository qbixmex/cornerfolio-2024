import clsx from "clsx";
import { FaCircleExclamation, FaCircleCheck, FaTriangleExclamation, FaCircleInfo } from "react-icons/fa6";
import styles from "./toast.module.css";

type Props = {
  type?: "success" | "info" | "warning" | "error";
  children: string;
};

const Toast: React.FC<Readonly<Props>> = ({ type = "info", children }) => {
  return (
    <div
      className={clsx(
        `${styles.container} ${styles.slideLeft}`,
        {
          "bg-green-500": type === "success",
          "bg-blue-500": type === "info",
          "bg-amber-500": type === "warning",
          "bg-red-500": type === "error",
        }
      )}
    >
      { type === "success" && <FaCircleCheck /> }
      { type === "info" && <FaCircleInfo /> }
      { type === "warning" && <FaTriangleExclamation /> }
      { type === "error" && <FaCircleExclamation /> }
      <span className="text-lg">{children}</span>
    </div>
  );
};

export default Toast;
