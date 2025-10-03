import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';
import { Animations } from '../theme/gradients';

interface SeniorButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'premium' | 'ghost';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  size?: 'large' | 'medium' | 'small';
  hapticFeedback?: boolean;
  highContrast?: boolean;
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
  hapticFeedback = true,
  highContrast = false,
}) => {
  const getButtonStyle = (): ViewStyle => {
    // Enhanced touch targets for seniors (minimum 48x48 points)
    const minTouchTarget = 48;

    const baseStyle: ViewStyle = {
      minHeight: Math.max(
        size === 'large' ? Spacing.buttonHeight :
        size === 'medium' ? Spacing.buttonHeightSmall : 40,
        minTouchTarget
      ),
      minWidth: fullWidth ? undefined : minTouchTarget * 2, // Wider for better targeting
      paddingHorizontal: size === 'large' ? Spacing.lg :
                         size === 'medium' ? Spacing.base : Spacing.md,
      paddingVertical: size === 'large' ? Spacing.md :
                       size === 'medium' ? Spacing.sm : Spacing.xs,
      borderRadius: Spacing.radiusMedium,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      position: 'relative',
    };

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    if (disabled) {
      return {
        ...baseStyle,
        backgroundColor: Colors.buttonDisabled,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: Colors.buttonPrimary,
          ...Shadows.sm,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: highContrast ? Colors.white : Colors.buttonSecondary,
          borderWidth: highContrast ? 2 : 1,
          borderColor: highContrast ? Colors.textPrimary : Colors.border,
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: Colors.danger,
          ...Shadows.sm,
        };
      case 'success':
        return {
          ...baseStyle,
          backgroundColor: Colors.success,
          ...Shadows.sm,
        };
      case 'premium':
        return {
          ...baseStyle,
          backgroundColor: Colors.premium,
          ...Shadows.sm,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...Typography.button,
      textAlign: 'center',
      fontWeight: '600',
    };

    if (disabled) {
      return {
        ...baseStyle,
        color: Colors.textSecondary,
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
      activeOpacity={0.8} // Slightly more opaque for better visual feedback
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={`Tap to ${title.toLowerCase()}`}
      accessibilityState={{ disabled }}
      // Enhanced touch feedback for seniors
      touchSoundDisabled={false}
      // Larger hit slop for easier targeting
      hitSlop={{
        top: 8,
        bottom: 8,
        left: 8,
        right: 8,
      }}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[
        getTextStyle(),
        highContrast && styles.highContrastText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: Spacing.sm,
  },
  highContrastText: {
    fontWeight: '700', // Extra bold for high contrast
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});