import React from "react";
import { Animated, Easing, View, StyleSheet, Image, Text } from "react-native";
import { ToastConfig } from "./useEasyToast";

export const CustomToast = ({
  message,
  type = "info",
  icon,
  image,
  textStyle = {},
  containerStyle = {},
  position = "top",
}: ToastConfig) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
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

  return (
    <Animated.View
      style={[
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
        
      ]}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={[styles.text, textStyle]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
