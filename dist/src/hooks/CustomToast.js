"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomToast = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CustomToast = ({ message, type = "info", icon, image, textStyle = {}, containerStyle = {}, position = "top", }) => {
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
            case "success":
                return "#4CAF50";
            case "error":
                return "#F44336";
            case "info":
                return "#2196F3";
            default:
                return "#333333";
        }
    };
    const getPositionToast = () => {
        switch (position) {
            case "top":
                return 50;
            case "middle":
                return 250;
            case "bottom":
                return 550;
        }
    };
    return (<react_native_1.Animated.View style={[
            styles.container,
            {
                backgroundColor: getBackgroundColor(),
                opacity: fadeAnim,
                top: getPositionToast(),
                transform: [
                    {
                        translateY: fadeAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                        }),
                    },
                ],
            },
            containerStyle,
        ]}>
      {icon && <react_native_1.View style={styles.iconContainer}>{icon}</react_native_1.View>}
      {image && <react_native_1.Image source={{ uri: image }} style={styles.image}/>}
      <react_native_1.Text style={[styles.text, textStyle]}>{message}</react_native_1.Text>
    </react_native_1.Animated.View>);
};
exports.CustomToast = CustomToast;
const styles = react_native_1.StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        // top: getPositionToast(),
        left: 0,
        right: 0,
        zIndex: 9999,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: "white",
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
