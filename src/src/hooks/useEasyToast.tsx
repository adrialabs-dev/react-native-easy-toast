import React, { useState, useCallback } from "react";
import { CustomToast } from "./CustomToast";

export type ToastType = "success" | "error" | "info" | "custom";
export type ToastPosition = "top" | "middle" | "bottom";

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  icon?: React.ReactNode;
  image?: string;
  textStyle?: object;
  containerStyle?: object;
  position?: ToastPosition;
}

export const useEasyToast = () => {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
    setTimeout(() => setToast(null), config.duration || 5000);
  }, []);

  const showSuccess = useCallback(
    (message: string, config?: Omit<ToastConfig, "message" | "type">) => {
      showToast({ ...config, message, type: "success" });
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, config?: Omit<ToastConfig, "message" | "type">) => {
      showToast({ ...config, message, type: "error" });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, config?: Omit<ToastConfig, "message" | "type">) => {
      showToast({ ...config, message, type: "info" });
    },
    [showToast]
  );

  const EasyToast = () => (toast ? <CustomToast {...toast} /> : null);

  return {
    EasyToast,
    showToast,
    showSuccess,
    showError,
    showInfo,
  };
};
