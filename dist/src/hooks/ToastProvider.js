"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEasyToastProvider = exports.ToastProvider = void 0;
// src/hooks/ToastProvider.tsx
const react_1 = __importStar(require("react"));
const CustomToast_1 = require("./CustomToast");
const ToastContext = (0, react_1.createContext)(undefined);
const ToastProvider = ({ children, }) => {
    const [toast, setToast] = (0, react_1.useState)(null);
    const showToast = (0, react_1.useCallback)((config) => {
        setToast(config);
        setTimeout(() => setToast(null), config.duration || 5000);
    }, []);
    const showSuccess = (0, react_1.useCallback)((message, config) => {
        showToast(Object.assign(Object.assign({}, config), { message, type: "success" }));
    }, [showToast]);
    const showError = (0, react_1.useCallback)((message, config) => {
        showToast(Object.assign(Object.assign({}, config), { message, type: "error" }));
    }, [showToast]);
    const showInfo = (0, react_1.useCallback)((message, config) => {
        showToast(Object.assign(Object.assign({}, config), { message, type: "info" }));
    }, [showToast]);
    return (<ToastContext.Provider value={{ showToast, showSuccess, showError, showInfo }}>
      {children}
      {toast && <CustomToast_1.CustomToast {...toast}/>}
    </ToastContext.Provider>);
};
exports.ToastProvider = ToastProvider;
const useEasyToastProvider = () => {
    const context = (0, react_1.useContext)(ToastContext);
    if (!context) {
        throw new Error("useToast debe usarse dentro de ToastProvider");
    }
    return context;
};
exports.useEasyToastProvider = useEasyToastProvider;
