import React from "react";
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
export declare const useEasyToast: () => {
    EasyToast: () => React.JSX.Element | null;
    showToast: (config: ToastConfig) => void;
    showSuccess: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    showError: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
    showInfo: (message: string, config?: Omit<ToastConfig, "message" | "type">) => void;
};
