import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScamRiskLevel } from '../types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

interface ResultCardProps {
  riskLevel: ScamRiskLevel;
  explanation: string;
}

/**
 * Color-coded result display with icon, color, and text
 * For colorblind accessibility
 */
export const ResultCard: React.FC<ResultCardProps> = ({ riskLevel, explanation }) => {
  const getResultConfig = () => {
    switch (riskLevel) {
      case 'RED':
        return {
          color: Colors.dangerRed,
          icon: '🔴',
          label: 'SCAM',
          description: 'DO NOT RESPOND',
        };
      case 'YELLOW':
        return {
          color: Colors.warningYellow,
          icon: '🟡',
          label: 'SUSPICIOUS',
          description: 'VERIFY SENDER',
        };
      case 'GREEN':
        return {
          color: Colors.safeGreen,
          icon: '🟢',
          label: 'APPEARS SAFE',
          description: 'STILL BE CAREFUL',
        };
    }
  };

  const config = getResultConfig();

  return (
    <View style={[styles.container, { borderColor: config.color }]}>
      <View style={styles.iconRow}>
        <Text style={styles.icon}>{config.icon}</Text>
        <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
      </View>
      <Text style={[styles.description, { color: config.color }]}>{config.description}</Text>
      <View style={styles.divider} />
      <Text style={styles.explanation}>{explanation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderWidth: 6,
    borderRadius: 16,
    padding: Spacing.xl,
    marginVertical: Spacing.md,
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
  },
  description: {
    ...Typography.headline,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  divider: {
    height: 3,
    backgroundColor: Colors.black,
    marginVertical: Spacing.lg,
  },
  explanation: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});