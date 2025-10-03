import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScamRiskLevel } from '../types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { AlertTriangleIcon, ZapIcon, CheckIcon } from './Icons';
import { useTheme } from '../context/ThemeContext';

interface ResultCardProps {
  riskLevel: ScamRiskLevel;
  explanation: string;
}

/**
 * Result Card - Professional, Clear, Immediate Understanding
 *
 * Design principles:
 * - Instant visual recognition through color + iconography
 * - Clear hierarchy: verdict first, explanation second
 * - Appropriate emotional weight for each risk level
 * - Accessible, senior-friendly presentation
 */
export const ResultCard: React.FC<ResultCardProps> = ({ riskLevel, explanation }) => {
  const { colors } = useTheme();

  const getResultConfig = () => {
    switch (riskLevel) {
      case 'RED':
        return {
          borderColor: Colors.danger,
          iconBg: Colors.danger,
          icon: <AlertTriangleIcon size={28} color="#FFFFFF" />,
          title: 'High Risk',
          subtitle: 'Likely a Scam',
        };
      case 'YELLOW':
        return {
          borderColor: Colors.warning,
          iconBg: Colors.warning,
          icon: <ZapIcon size={28} color="#FFFFFF" />,
          title: 'Suspicious',
          subtitle: 'Proceed with Caution',
        };
      case 'GREEN':
        return {
          borderColor: Colors.success,
          iconBg: Colors.success,
          icon: <CheckIcon size={28} color="#FFFFFF" />,
          title: 'Appears Safe',
          subtitle: 'Low Risk Detected',
        };
    }
  };

  const config = getResultConfig();

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.backgroundSecondary, borderColor: config.borderColor }]}>
        {/* Verdict Header */}
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: config.iconBg }]}>
            {config.icon}
          </View>
          <View style={styles.verdictContainer}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              {config.title}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {config.subtitle}
            </Text>
          </View>
        </View>

        {/* Explanation */}
        <View style={styles.explanationContainer}>
          <Text style={[styles.explanationLabel, { color: colors.textSecondary }]}>Analysis:</Text>
          <Text style={[styles.explanation, { color: colors.textPrimary }]}>{explanation}</Text>
        </View>

        {/* Action hint */}
        {riskLevel === 'RED' && (
          <View style={[styles.actionHint, { backgroundColor: colors.background }]}>
            <Text style={[styles.actionText, { color: colors.textPrimary }]}>
              Do not respond or click any links. Delete this message.
            </Text>
          </View>
        )}
        {riskLevel === 'YELLOW' && (
          <View style={[styles.actionHint, { backgroundColor: colors.background }]}>
            <Text style={[styles.actionText, { color: colors.textPrimary }]}>
              Verify independently before taking any action.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 20,
  },
  card: {
    borderRadius: 16,
    borderWidth: 3,
    overflow: 'hidden',
    ...Colors.shadowMd,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...Colors.shadowSm,
  },
  verdictContainer: {
    flex: 1,
  },
  title: {
    ...Typography.titleLarge,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    ...Typography.body,
    fontWeight: '500',
  },

  // Explanation
  explanationContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  explanationLabel: {
    ...Typography.caption,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  explanation: {
    ...Typography.bodyLarge,
    lineHeight: 28,
  },

  // Action hint
  actionHint: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  actionText: {
    ...Typography.body,
    fontWeight: '500',
    lineHeight: 26,
  },
});
