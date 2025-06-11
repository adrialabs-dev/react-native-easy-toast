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
exports.useEasyToast = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const CustomToast = ({ message, type = 'info', icon, image, textStyle = {}, containerStyle = {}, }) => {
    const fadeAnim = react_1.default.useRef(new react_native_1.Animated.Value(0)).current;
    react_1.default.useEffect(() => {
        react_native_1.Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: react_native_1.Easing.ease,
            useNativeDriver: true,
        }).start();
    }, []);
    const getBackgroundColor = () => {
        switch (type) {
            case 'success': return '#4CAF50';
            case 'error': return '#F44336';
            case 'info': return '#2196F3';
            default: return '#333333';
        }
    };
    return (<react_native_1.Animated.View style={[
            styles.container,
            {
                backgroundColor: getBackgroundColor(),
                opacity: fadeAnim,
                transform: [{
                        translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                        }),
                    }],
            },
            containerStyle
        ]}>
      {icon && <react_native_1.View style={styles.iconContainer}>{icon}</react_native_1.View>}
      {image && <react_native_1.Image source={{ uri: image }} style={styles.image}/>}
      <react_native_1.Text style={[styles.text, textStyle]}>{message}</react_native_1.Text>
    </react_native_1.Animated.View>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 9999,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        flexShrink: 1,
    },
    iconContainer: {
        marginRight: 10,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
});
const useEasyToast = () => {
    const [toast, setToast] = (0, react_1.useState)(null);
    const showToast = (0, react_1.useCallback)((config) => {
        setToast(config);
        setTimeout(() => setToast(null), config.duration || 5000);
    }, []);
    const showSuccess = (0, react_1.useCallback)((message, config) => {
        showToast(Object.assign(Object.assign({}, config), { message, type: 'success' }));
    }, [showToast]);
    const showError = (0, react_1.useCallback)((message, config) => {
        showToast(Object.assign(Object.assign({}, config), { message, type: 'error' }));
    }, [showToast]);
    const showInfo = (0, react_1.useCallback)((message, config) => {
        showToast(Object.assign(Object.assign({}, config), { message, type: 'info' }));
    }, [showToast]);
    const EasyToast = () => toast ? <CustomToast {...toast}/> : null;
    return {
        EasyToast,
        showToast,
        showSuccess,
        showError,
        showInfo
    };
};
exports.useEasyToast = useEasyToast;
