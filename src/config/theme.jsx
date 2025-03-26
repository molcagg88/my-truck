import { DefaultTheme } from 'react-native-paper';
import colors from './colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    background: colors.background,
    surface: colors.white,
    text: colors.text,
    error: colors.danger,
    disabled: colors.disabled,
    placeholder: colors.placeholder,
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: colors.notification,
  },
  roundness: 8,
  fonts: {
    ...DefaultTheme.fonts,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  sizes: {
    icon: {
      tiny: 16,
      small: 20,
      medium: 24,
      large: 30,
      xlarge: 40,
    },
    button: {
      small: 36,
      medium: 48,
      large: 56,
    },
  },
};
