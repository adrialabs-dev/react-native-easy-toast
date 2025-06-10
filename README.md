# React Native Custom Toast Hook

A lightweight, customizable toast hook for React Native.

## Features

- 🚀 No Provider/Context needed
- 🎨 Fully customizable (colors, icons, images)
- ⏱️ Auto-dismiss after duration (default: 5s)
- 🏗️ Simple API with pre-configured types (success, error, info)
- 🎭 Smooth animations

## Installation

```bash
npm install react-native-easy-toast

```

## Usage

```typescript
import React from 'react';
import { View, Button } from 'react-native';
import { useCustomToast } from 'react-native-custom-toast-hook';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyComponent = () => {
  const { 
    CurrentToast,
    showSuccess,
    showError,
    showToast
  } = useEasyToast();

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Show Success"
        onPress={() => showSuccess('Operation completed!')}
      />
      
      <Button
        title="Show Error"
        onPress={() => showError('Something went wrong')}
      />
      
      <Button
        title="Custom Toast"
        onPress={() => showToast({
          message: 'Custom message',
          type: 'custom',
          icon: <Icon name="star" size={24} color="gold" />,
          containerStyle: { backgroundColor: 'purple' },
          duration: 3000,
        })}
      />
      
      <EasyToast />
    </View>
  );
};
```

## API

### Hook Methods
| Method        | Parameters                          | Description                     |
|---------------|------------------------------------|---------------------------------|
| `showToast`   | `ToastConfig`                      | Shows a fully customizable toast |
| `showSuccess` | `message: string`, `config?: Omit<ToastConfig, 'message'\|'type'>` | Shows success toast |
| `showError`   | `message: string`, `config?: Omit<ToastConfig, 'message'\|'type'>` | Shows error toast |
| `showInfo`    | `message: string`, `config?: Omit<ToastConfig, 'message'\|'type'>` | Shows info toast |

### `ToastConfig`
| Property         | Type               | Default     | Description                      |
|------------------|--------------------|-------------|----------------------------------|
| `message`        | `string`           | **Required**| Toast message text               |
| `type`           | `'success'\|'error'\|'info'\|'custom'` | `'info'` | Toast type (affects default color) |
| `duration`       | `number`           | `5000`      | Duration in milliseconds         |
| `icon`           | `React.ReactNode`  | `undefined` | Custom icon component            |
| `image`          | `string`           | `undefined` | Image URL                        |
| `textStyle`      | `object`           | `{}`        | Custom text styles               |
| `containerStyle` | `object`           | `{}`        | Custom container styles          |

## License

MIT# react-native-easy-toast
