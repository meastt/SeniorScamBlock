import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

interface SeniorButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Large, high-contrast button designed for seniors
 * Minimum 88pt height for easy tapping
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
      borderRadius: 8,
      borderWidth: 3,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: Colors.disabledButton,
        borderColor: Colors.disabledButton,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: Colors.primaryButton,
          borderColor: Colors.black,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.white,
          borderColor: Colors.black,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: Colors.dangerRed,
          borderColor: Colors.black,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...Typography.button,
      textAlign: 'center',
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
        return {
          ...baseStyle,
          color: Colors.white,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: Colors.black,
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
      activeOpacity={0.7}
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