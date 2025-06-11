import React, { useState, useCallback } from 'react';
import { View, Animated, Easing, StyleSheet, Text, Image } from 'react-native';

export type ToastType = 'success' | 'error' | 'info' | 'custom';

export interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  icon?: React.ReactNode;
  image?: string;
  textStyle?: object;
  containerStyle?: object;
}

const CustomToast = ({
  message,
  type = 'info',
  icon,
  image,
  textStyle = {},
  containerStyle = {},
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
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'info': return '#2196F3';
      default: return '#333333';
    }
  };

  return (
    <Animated.View style={[
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

export const useEasyToast = () => {
  const [toast, setToast] = useState<ToastConfig | null>(null);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
    setTimeout(() => setToast(null), config.duration || 5000);
  }, []);

  const showSuccess = useCallback((message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => {
    showToast({ ...config, message, type: 'success' });
  }, [showToast]);

  const showError = useCallback((message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => {
    showToast({ ...config, message, type: 'error' });
  }, [showToast]);

  const showInfo = useCallback((message: string, config?: Omit<ToastConfig, 'message' | 'type'>) => {
    showToast({ ...config, message, type: 'info' });
  }, [showToast]);

  const EasyToast = () => toast ? <CustomToast {...toast} /> : null;

  return { 
    EasyToast,
    showToast,
    showSuccess,
    showError,
    showInfo
  };
};