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
          icon: '⚠️',
          label: 'High Risk - Likely Scam',
        };
      case 'YELLOW':
        return {
          color: Colors.warning,
          backgroundColor: Colors.warningLight,
          icon: '⚡',
          label: 'Suspicious - Be Careful',
        };
      case 'GREEN':
        return {
          color: Colors.success,
          backgroundColor: Colors.successLight,
          icon: '✓',
          label: 'Appears Safe',
        };
    }
  };

  const config = getResultConfig();

  return (
    <View style={[styles.container, {
      backgroundColor: config.backgroundColor,
      borderLeftColor: config.color,
    }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{config.icon}</Text>
        <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      </View>

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
    borderLeftWidth: 4,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: Spacing.iconLarge,
    marginRight: Spacing.sm,
  },
  label: {
    ...Typography.title,
    fontWeight: '700',
    flex: 1,
  },
  explanation: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
});