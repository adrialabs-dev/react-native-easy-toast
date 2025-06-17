// src/hooks/ToastProvider.tsx
import React, { createContext, useContext, useCallback, useState } from "react";
import { ToastConfig } from "./useEasyToast";
import { CustomToast } from "./CustomToast";

interface ToastContextType {
  showToast: (config: ToastConfig) => void;
  showSuccess: (
    message: string,
    config?: Omit<ToastConfig, "message" | "type">
  ) => void;
  showError: (
    message: string,
    config?: Omit<ToastConfig, "message" | "type">
  ) => void;
  showInfo: (
    message: string,
    config?: Omit<ToastConfig, "message" | "type">
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  return (
    <ToastContext.Provider
      value={{ showToast, showSuccess, showError, showInfo }}
    >
      {children}
      {toast && <CustomToast {...toast} />}
    </ToastContext.Provider>
  );
};

export const useEasyToastProvider = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }
  return context;
};
