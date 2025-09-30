import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

/**
 * Always-visible back button for easy navigation
 * Minimum 88pt touch target
 */
export const BackButton: React.FC<{ onPress?: () => void }> = ({ onPress }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Text style={styles.arrow}>←</Text>
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: Spacing.minTouchTarget,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  arrow: {
    fontSize: 36,
    color: Colors.black,
    marginRight: Spacing.sm,
  },
  text: {
    ...Typography.button,
    color: Colors.black,
  },
});