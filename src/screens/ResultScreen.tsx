import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ResultCard } from '../components/ResultCard';
import { BackButton } from '../components/BackButton';
import { SeniorButton } from '../components/SeniorButton';
import { ScamAnalysisResult } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';
import { useTheme } from '../context/ThemeContext';
import {
  AlertTriangleIcon,
  SearchIcon,
  CheckCircleIcon,
  XIcon,
  TrashIcon,
  PhoneIcon,
  UsersIcon,
  LockIcon,
  ClipboardIcon,
  BankIcon,
  InfoIcon,
} from '../components/Icons';

type ResultScreenRouteProp = RouteProp<{ params: { result: ScamAnalysisResult } }, 'params'>;

/**
 * Premium Result Screen - Sophisticated result display with actionable insights
 * Clear visual hierarchy and comprehensive guidance
 */
const ResultScreen = () => {
  const route = useRoute<ResultScreenRouteProp>();
  const { result } = route.params;
  const [showDetails, setShowDetails] = useState(false);
  const { colors } = useTheme();

  const getRiskColor = () => {
    switch (result.riskLevel) {
      case 'RED': return Colors.danger;
      case 'YELLOW': return Colors.warning;
      case 'GREEN': return Colors.success;
    }
  };

  const getRiskIcon = () => {
    const iconSize = 32;
    const iconColor = getRiskColor();
    switch (result.riskLevel) {
      case 'RED': return <AlertTriangleIcon size={iconSize} color={iconColor} />;
      case 'YELLOW': return <SearchIcon size={iconSize} color={iconColor} />;
      case 'GREEN': return <CheckCircleIcon size={iconSize} color={iconColor} />;
    }
  };

  const getActionSteps = () => {
    const iconSize = 20;
    switch (result.riskLevel) {
      case 'RED':
        return [
          { icon: <XIcon size={iconSize} color={Colors.danger} />, text: 'Do NOT respond to this message', urgent: true },
          { icon: <XIcon size={iconSize} color={Colors.danger} />, text: 'Do NOT send money or personal information', urgent: true },
          { icon: <XIcon size={iconSize} color={Colors.danger} />, text: 'Do NOT click any links in the message', urgent: true },
          { icon: <TrashIcon size={iconSize} color={Colors.textSecondary} />, text: 'Delete this message immediately', urgent: false },
          { icon: <PhoneIcon size={iconSize} color={Colors.textSecondary} />, text: 'Tell a trusted family member about this', urgent: false },
        ];
      case 'YELLOW':
        return [
          { icon: <SearchIcon size={iconSize} color={Colors.warning} />, text: 'Verify the sender before responding', urgent: true },
          { icon: <PhoneIcon size={iconSize} color={Colors.warning} />, text: 'Call them using a known phone number', urgent: true },
          { icon: <XIcon size={iconSize} color={Colors.warning} />, text: 'Do NOT click any links in the message', urgent: true },
          { icon: <UsersIcon size={iconSize} color={Colors.textSecondary} />, text: 'Ask a family member for their opinion', urgent: false },
        ];
      case 'GREEN':
        return [
          { icon: <CheckCircleIcon size={iconSize} color={Colors.success} />, text: 'This message appears to be legitimate', urgent: false },
          { icon: <SearchIcon size={iconSize} color={Colors.textSecondary} />, text: 'Still verify the sender if unsure', urgent: false },
          { icon: <LockIcon size={iconSize} color={Colors.success} />, text: 'Never share passwords or personal details', urgent: true },
        ];
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <BackButton />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: getRiskColor() + '20' }]}>
            {getRiskIcon()}
          </View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Analysis Complete</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            {result.riskLevel === 'RED' ? 'High Risk Detected' :
             result.riskLevel === 'YELLOW' ? 'Suspicious Activity' :
             'Message Appears Safe'}
          </Text>
        </View>

        {/* Main Result Card */}
        <ResultCard
          riskLevel={result.riskLevel}
          explanation={result.explanation}
        />

        {/* Action Steps */}
        <View style={[styles.actionStepsCard, { backgroundColor: colors.backgroundSecondary }]}>
          <Text style={[styles.actionStepsTitle, { color: colors.textPrimary }]}>What You Should Do</Text>
          <View style={styles.actionStepsList}>
            {getActionSteps().map((step, index) => (
              <View key={index} style={[
                styles.actionStep,
                { backgroundColor: colors.background },
                step.urgent && styles.urgentActionStep
              ]}>
                <View style={styles.actionStepIcon}>{step.icon}</View>
                <Text style={[
                  styles.actionStepText,
                  { color: colors.textPrimary },
                  step.urgent && styles.urgentActionStepText
                ]}>
                  {step.text}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Detailed Analysis */}
        {result.detailedExplanation && (
          <>
            {!showDetails ? (
              <View style={styles.detailsButtonContainer}>
                <SeniorButton
                  title="See Detailed Analysis"
                  onPress={() => setShowDetails(true)}
                  variant="secondary"
                  fullWidth
                  icon={<ClipboardIcon size={20} color={colors.textPrimary} />}
                />
              </View>
            ) : (
              <View style={[styles.detailsCard, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.detailsTitle, { color: colors.textPrimary }]}>Detailed Analysis</Text>
                <Text style={[styles.detailsText, { color: colors.textPrimary }]}>
                  {result.detailedExplanation}
                </Text>

                {result.scamType && (
                  <View style={[styles.scamTypeCard, { backgroundColor: colors.background, borderColor: Colors.warning }]}>
                    <Text style={[styles.scamTypeLabel, { color: Colors.warning }]}>Scam Type Identified:</Text>
                    <Text style={[styles.scamTypeText, { color: colors.textPrimary }]}>{result.scamType}</Text>
                  </View>
                )}

                <SeniorButton
                  title="Hide Details"
                  onPress={() => setShowDetails(false)}
                  variant="ghost"
                  fullWidth
                  size="medium"
                />
              </View>
            )}
          </>
        )}

        {/* Additional Resources */}
        <View style={[styles.resourcesCard, { backgroundColor: colors.backgroundSecondary }]}>
          <View style={styles.resourcesHeader}>
            <InfoIcon size={24} color={colors.primary} />
            <Text style={[styles.resourcesTitle, { color: colors.textPrimary }]}>Need More Help?</Text>
          </View>
          <Text style={[styles.resourcesText, { color: colors.textSecondary }]}>
            If you're still unsure or have been targeted by scammers, contact:
          </Text>
          <View style={styles.resourceList}>
            <View style={[styles.resourceItem, { backgroundColor: colors.background }]}>
              <PhoneIcon size={18} color={colors.primary} />
              <Text style={[styles.resourceItemText, { color: colors.textPrimary }]}>Your local police department</Text>
            </View>
            <View style={[styles.resourceItem, { backgroundColor: colors.background }]}>
              <BankIcon size={18} color={colors.primary} />
              <Text style={[styles.resourceItemText, { color: colors.textPrimary }]}>Your bank's fraud department</Text>
            </View>
            <View style={[styles.resourceItem, { backgroundColor: colors.background }]}>
              <UsersIcon size={18} color={colors.primary} />
              <Text style={[styles.resourceItemText, { color: colors.textPrimary }]}>A trusted family member</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.massive,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    ...Shadows.md,
  },
  headerTitle: {
    ...Typography.largeTitle,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.body,
    textAlign: 'center',
  },

  // Action Steps Card
  actionStepsCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    ...Shadows.card,
  },
  actionStepsTitle: {
    ...Typography.title,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  actionStepsList: {
    gap: Spacing.sm,
  },
  actionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
  },
  urgentActionStep: {
    borderWidth: 2,
    borderColor: Colors.danger,
  },
  actionStepIcon: {
    marginRight: Spacing.md,
  },
  actionStepText: {
    ...Typography.body,
    flex: 1,
  },
  urgentActionStepText: {
    fontWeight: '600',
  },

  // Details Button Container
  detailsButtonContainer: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
  },

  // Details Card
  detailsCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    ...Shadows.card,
  },
  detailsTitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  detailsText: {
    ...Typography.body,
    marginBottom: Spacing.md,
  },
  scamTypeCard: {
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
    marginBottom: Spacing.md,
    borderWidth: 2,
  },
  scamTypeLabel: {
    ...Typography.callout,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  scamTypeText: {
    ...Typography.body,
    fontWeight: '600',
  },

  // Resources Card
  resourcesCard: {
    marginHorizontal: Spacing.screenHorizontal,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    ...Shadows.card,
  },
  resourcesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  resourcesTitle: {
    ...Typography.subtitle,
    fontWeight: '700',
  },
  resourcesText: {
    ...Typography.body,
    marginBottom: Spacing.md,
  },
  resourceList: {
    gap: Spacing.md,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
  },
  resourceItemText: {
    ...Typography.body,
    fontWeight: '500',
    flex: 1,
  },
});

export default ResultScreen;