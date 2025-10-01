import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScamRiskLevel } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

interface ResultCardProps {
  riskLevel: ScamRiskLevel;
  explanation: string;
}

/**
 * Modern, color-coded result display with icon, color, and text
 * Designed for colorblind accessibility and visual impact
 */
export const ResultCard: React.FC<ResultCardProps> = ({ riskLevel, explanation }) => {
  const getResultConfig = () => {
    switch (riskLevel) {
      case 'RED':
        return {
          color: Colors.dangerRed,
          backgroundColor: '#FEF2F2', // Light red background
          icon: '🔴',
          label: 'SCAM',
          description: 'DO NOT RESPOND',
        };
      case 'YELLOW':
        return {
          color: Colors.warningYellow,
          backgroundColor: '#FFFBEB', // Light yellow background
          icon: '🟡',
          label: 'SUSPICIOUS',
          description: 'VERIFY SENDER',
        };
      case 'GREEN':
        return {
          color: Colors.safeGreen,
          backgroundColor: '#F0FDF4', // Light green background
          icon: '🟢',
          label: 'APPEARS SAFE',
          description: 'STILL BE CAREFUL',
        };
    }
  };

  const config = getResultConfig();

  return (
    <View style={[styles.container, { borderLeftColor: config.color, backgroundColor: config.backgroundColor }]}>
      <View style={styles.iconRow}>
        <Text style={styles.icon}>{config.icon}</Text>
        <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      </View>
      <Text style={[styles.description, { color: config.color }]}>{config.description}</Text>
      <View style={[styles.divider, { backgroundColor: config.color, opacity: 0.2 }]} />
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderLeftWidth: 8,
    borderRadius: 20,
    padding: Spacing.xl,
    marginVertical: Spacing.md,
    ...Shadows.xl,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 88,
    marginRight: Spacing.md,
  },
  label: {
    ...Typography.result,
    fontWeight: '900',
  },
  description: {
    ...Typography.headline,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  divider: {
    height: 2,
    borderRadius: 1,
    marginVertical: Spacing.lg,
  },
  explanation: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 32,
  },
});