import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

interface SeniorButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Modern, large button designed for seniors
 * Beautiful shadows, vibrant colors, minimum 88pt height for easy tapping
 */
export const SeniorButton: React.FC<SeniorButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  fullWidth = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      minHeight: Spacing.buttonHeight,
      minWidth: Spacing.buttonMinWidth,
      paddingHorizontal: Spacing.lg,
      paddingVertical: Spacing.md,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      ...Shadows.lg,
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: Colors.disabledButton,
        shadowOpacity: 0,
        elevation: 0,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: Colors.primaryButton,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.white,
          borderWidth: 2,
          borderColor: Colors.border,
          ...Shadows.md,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: Colors.dangerRed,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: Colors.safeGreen,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...Typography.button,
      textAlign: 'center',
      fontWeight: '700',
    };

    if (disabled) {
      return {
        ...baseStyle,
        color: Colors.white,
      };
    }

    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
        return {
          ...baseStyle,
          color: Colors.white,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: Colors.textPrimary,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: Spacing.sm,
  },
});