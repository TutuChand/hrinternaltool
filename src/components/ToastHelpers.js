import { toast } from "react-hot-toast";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import styles from "../styles/toaststyles.module.css";

export const showSuccessToast = (message) => {
  toast.success(message, {
    icon: <FaCheckCircle color="#22c55e" />,
    className: styles.customSuccessToast, 
    duration: 5000,
    style: { "--toast-duration": "5000ms" },
  });
};

export const showWarningToast = (message) => {
  toast(message, {
    icon: <FaExclamationTriangle color="#f59e0b" />,
    className: styles.customWarningToast,
    duration: 5000,
    style: { "--toast-duration": "5000ms" },
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    icon: <FaTimesCircle color="#dc2626" />,
    className: styles.customErrorToast,
    duration: 5000,
    style: { "--toast-duration": "5000ms" },
  });
};
