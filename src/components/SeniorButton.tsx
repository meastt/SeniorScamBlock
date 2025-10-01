import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';

interface SeniorButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'premium' | 'ghost';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'large' | 'medium' | 'small';
}

/**
 * Premium button component designed for seniors
 * Sophisticated design with excellent accessibility and premium feel
 */
export const SeniorButton: React.FC<SeniorButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  fullWidth = false,
  size = 'large',
}) => {
  const getButtonStyle = (): ViewStyle => {
    const responsiveHeight = Responsive.getButtonHeight();
    const baseStyle: ViewStyle = {
      minHeight: size === 'large' ? responsiveHeight : 
                 size === 'medium' ? responsiveHeight * 0.8 : 
                 responsiveHeight * 0.7,
      minWidth: size === 'large' ? Spacing.buttonMinWidth : 
                size === 'medium' ? Spacing.buttonMinWidth * 0.8 : 
                Spacing.buttonMinWidth * 0.7,
      paddingHorizontal: size === 'large' ? Spacing.buttonPadding : 
                         size === 'medium' ? Spacing.xl : Spacing.lg,
      paddingVertical: size === 'large' ? Spacing.xl : 
                       size === 'medium' ? Spacing.lg : Spacing.md,
      borderRadius: size === 'large' ? Spacing.radiusXLarge : 
                    size === 'medium' ? Spacing.radiusLarge : Spacing.radiusMedium,
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
        backgroundColor: Colors.buttonDisabled,
        ...Shadows.none,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: Colors.buttonPrimary,
          ...Shadows.button,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: Colors.buttonSecondary,
          borderWidth: 1,
          borderColor: Colors.borderMedium,
          ...Shadows.sm,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: Colors.buttonDanger,
          ...Shadows.button,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: Colors.buttonSuccess,
          ...Shadows.button,
        };
      case 'premium':
        return {
          ...baseStyle,
          backgroundColor: Colors.premium,
          ...Shadows.premium,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: Colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...(size === 'large' ? Typography.button : 
          size === 'medium' ? Typography.callout : Typography.caption),
      textAlign: 'center',
      fontWeight: '600',
    };

    if (disabled) {
      return {
        ...baseStyle,
        color: Colors.textTertiary,
      };
    }

    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
      case 'premium':
        return {
          ...baseStyle,
          color: Colors.textInverse,
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: Colors.textPrimary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: Colors.primary,
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
      accessibilityRole="button"
      accessibilityLabel={title}
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