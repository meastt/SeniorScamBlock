import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';

interface BackButtonProps {
  onPress?: () => void;
  title?: string;
  variant?: 'default' | 'ghost' | 'premium';
}

/**
 * Premium back button with sophisticated design
 * Accessible and elegant navigation component
 */
export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  title = 'Back',
  variant = 'default'
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case 'ghost':
        return {
          ...styles.container,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.borderMedium,
        };
      case 'premium':
        return {
          ...styles.container,
          backgroundColor: colors.premium,
          ...Shadows.sm,
        };
      default:
        return {
          ...styles.container,
          backgroundColor: colors.backgroundSecondary,
          ...Shadows.sm,
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'premium':
        return {
          ...styles.text,
          color: colors.textInverse,
        };
      default:
        return {
          ...styles.text,
          color: colors.textPrimary,
        };
    }
  };

  const getArrowStyle = () => {
    switch (variant) {
      case 'premium':
        return {
          ...styles.arrow,
          color: colors.textInverse,
        };
      default:
        return {
          ...styles.arrow,
          color: colors.primary,
        };
    }
  };

  const getIconContainerStyle = () => {
    return {
      ...styles.iconContainer,
      backgroundColor: colors.primaryLight,
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`Go back to previous screen`}
    >
      <View style={getIconContainerStyle()}>
        <Text style={getArrowStyle()}>←</Text>
      </View>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Spacing.comfortableTouchTarget,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Spacing.radiusLarge,
    marginHorizontal: Spacing.screenHorizontal,
    marginTop: Spacing.lg,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Spacing.radiusRound,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  arrow: {
    fontSize: Spacing.iconLarge,
    fontWeight: '700',
  },
  text: {
    ...Typography.callout,
    fontWeight: '600',
  },
});