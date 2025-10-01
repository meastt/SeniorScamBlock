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
 * Premium result display with sophisticated visual hierarchy
 * Clear, accessible design with emotional impact
 */
export const ResultCard: React.FC<ResultCardProps> = ({ riskLevel, explanation }) => {
  const getResultConfig = () => {
    switch (riskLevel) {
      case 'RED':
        return {
          color: Colors.dangerRed,
          backgroundColor: Colors.dangerRedLight,
          borderColor: Colors.dangerRed,
          icon: '⚠️',
          label: 'SCAM DETECTED',
          description: 'Do not respond or click any links',
          urgency: 'HIGH RISK',
        };
      case 'YELLOW':
        return {
          color: Colors.warningYellow,
          backgroundColor: Colors.warningYellowLight,
          borderColor: Colors.warningYellow,
          icon: '🔍',
          label: 'SUSPICIOUS',
          description: 'Verify the sender before responding',
          urgency: 'MEDIUM RISK',
        };
      case 'GREEN':
        return {
          color: Colors.safeGreen,
          backgroundColor: Colors.white,
          borderColor: Colors.safeGreen,
          icon: '✅',
          label: 'APPEARS SAFE',
          description: 'This message seems legitimate',
          urgency: 'LOW RISK',
        };
    }
  };

  const config = getResultConfig();

  return (
    <View style={[styles.container, { backgroundColor: config.backgroundColor }]}>
      {/* Header with icon and risk level */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { 
          backgroundColor: riskLevel === 'GREEN' ? 'transparent' : Colors.white 
        }]}>
          <Text style={styles.icon}>{config.icon}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.urgency, { color: config.color }]}>{config.urgency}</Text>
          <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={[styles.descriptionContainer, { 
        borderColor: config.color,
        borderStyle: riskLevel === 'GREEN' ? 'solid' : 'dashed'
      }]}>
        <Text style={styles.description}>{config.description}</Text>
      </View>

      {/* Explanation */}
      <View style={styles.explanationContainer}>
        <Text style={styles.explanationLabel}>Analysis:</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>

      {/* Bottom accent */}
      <View style={[styles.accentBar, { backgroundColor: config.color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    marginVertical: Spacing.lg,
    marginHorizontal: Responsive.getScreenMargin(),
    maxWidth: Responsive.getCardWidth(),
    alignSelf: 'center',
    width: '100%',
    borderWidth: 2,
    ...Shadows.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: Spacing.radiusRound,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
    ...Shadows.sm,
  },
  icon: {
    fontSize: Spacing.iconMassive,
  },
  headerText: {
    flex: 1,
  },
  urgency: {
    ...Typography.caption,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  label: {
    ...Typography.largeTitle,
    fontWeight: '700',
  },
  descriptionContainer: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 2,
  },
  description: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  explanationLabel: {
    ...Typography.callout,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  explanation: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 32,
  },
  accentBar: {
    height: 4,
    borderRadius: Spacing.radiusSmall,
    width: '100%',
  },
});