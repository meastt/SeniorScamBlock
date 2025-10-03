import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScamRiskLevel } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { Responsive } from '../theme/responsive';

interface ResultCardProps {
  riskLevel: ScamRiskLevel;
  explanation: string;
}

/**
 * Clear result display with proper visual hierarchy
 */
export const ResultCard: React.FC<ResultCardProps> = ({ riskLevel, explanation }) => {
  const getResultConfig = () => {
    switch (riskLevel) {
      case 'RED':
        return {
          color: Colors.danger,
          backgroundColor: Colors.dangerLight,
          label: '⚠️ High Risk - Likely Scam',
        };
      case 'YELLOW':
        return {
          color: Colors.warning,
          backgroundColor: Colors.warningLight,
          label: 'Suspicious - Be Careful',
        };
      case 'GREEN':
        return {
          color: Colors.success,
          backgroundColor: Colors.successLight,
          label: 'Appears Safe',
        };
    }
  };

  const config = getResultConfig();

  return (
    <View style={[styles.container, {
      backgroundColor: config.backgroundColor,
      borderColor: config.color,
    }]}>
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    marginVertical: Spacing.md,
    marginHorizontal: Spacing.screenHorizontal,
    borderWidth: 2,
    ...Shadows.card,
  },
  label: {
    ...Typography.title,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
  explanation: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
});