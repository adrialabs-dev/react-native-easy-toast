import React from "react";
import { ToastConfig } from "./useEasyToast";
interface ToastContextType {
    showToast: (config: ToastConfig) => void;
    showSuccess: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    showError: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    showInfo: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
}
export declare const ToastProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useEasyToastProvider: () => ToastContextType;
export {};
