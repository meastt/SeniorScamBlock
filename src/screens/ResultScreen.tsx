import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ResultCard } from '../components/ResultCard';
import { BackButton } from '../components/BackButton';
import { SeniorButton } from '../components/SeniorButton';
import { ScamAnalysisResult } from '../types';
import { Colors, Shadows } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

type ResultScreenRouteProp = RouteProp<{ params: { result: ScamAnalysisResult } }, 'params'>;

/**
 * Premium Result Screen - Sophisticated result display with actionable insights
 * Clear visual hierarchy and comprehensive guidance
 */
const ResultScreen = () => {
  const route = useRoute<ResultScreenRouteProp>();
  const { result } = route.params;
  const [showDetails, setShowDetails] = useState(false);

  const getRiskColor = () => {
    switch (result.riskLevel) {
      case 'RED': return Colors.dangerRed;
      case 'YELLOW': return Colors.warningYellow;
      case 'GREEN': return Colors.safeGreen;
    }
  };

  const getRiskIcon = () => {
    switch (result.riskLevel) {
      case 'RED': return '⚠️';
      case 'YELLOW': return '🔍';
      case 'GREEN': return '✅';
    }
  };

  const getActionSteps = () => {
    switch (result.riskLevel) {
      case 'RED':
        return [
          { icon: '❌', text: 'Do NOT respond to this message', urgent: true },
          { icon: '❌', text: 'Do NOT send money or personal information', urgent: true },
          { icon: '❌', text: 'Do NOT click any links in the message', urgent: true },
          { icon: '🗑️', text: 'Delete this message immediately', urgent: false },
          { icon: '📞', text: 'Tell a trusted family member about this', urgent: false },
        ];
      case 'YELLOW':
        return [
          { icon: '🔍', text: 'Verify the sender before responding', urgent: true },
          { icon: '📞', text: 'Call them using a known phone number', urgent: true },
          { icon: '❌', text: 'Do NOT click any links in the message', urgent: true },
          { icon: '👥', text: 'Ask a family member for their opinion', urgent: false },
        ];
      case 'GREEN':
        return [
          { icon: '✅', text: 'This message appears to be legitimate', urgent: false },
          { icon: '🔍', text: 'Still verify the sender if unsure', urgent: false },
          { icon: '🔒', text: 'Never share passwords or personal details', urgent: true },
        ];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: getRiskColor() + '20' }]}>
            <Text style={styles.headerIconText}>{getRiskIcon()}</Text>
          </View>
          <Text style={styles.headerTitle}>Analysis Complete</Text>
          <Text style={styles.headerSubtitle}>
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
        <View style={styles.actionStepsCard}>
          <Text style={styles.actionStepsTitle}>What You Should Do</Text>
          <View style={styles.actionStepsList}>
            {getActionSteps().map((step, index) => (
              <View key={index} style={[
                styles.actionStep,
                step.urgent && styles.urgentActionStep
              ]}>
                <Text style={styles.actionStepIcon}>{step.icon}</Text>
                <Text style={[
                  styles.actionStepText,
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
              <SeniorButton
                title="📋 See Detailed Analysis"
                onPress={() => setShowDetails(true)}
                variant="secondary"
                fullWidth
              />
            ) : (
              <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>Detailed Analysis</Text>
                <Text style={styles.detailsText}>{result.detailedExplanation}</Text>
                
                {result.scamType && (
                  <View style={styles.scamTypeCard}>
                    <Text style={styles.scamTypeLabel}>Scam Type Identified:</Text>
                    <Text style={styles.scamTypeText}>{result.scamType}</Text>
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
        <View style={styles.resourcesCard}>
          <Text style={styles.resourcesTitle}>Need More Help?</Text>
          <Text style={styles.resourcesText}>
            If you're still unsure or have been targeted by scammers, contact:
          </Text>
          <View style={styles.resourceList}>
            <Text style={styles.resourceItem}>📞 Your local police department</Text>
            <Text style={styles.resourceItem}>🏦 Your bank's fraud department</Text>
            <Text style={styles.resourceItem}>👨‍👩‍👧‍👦 A trusted family member</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.enormous,
  },
  
  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: Spacing.screenHorizontal,
    paddingTop: Spacing.huge,
    paddingBottom: Spacing.xl,
  },
  headerIcon: {
    width: 100,
    height: 100,
    borderRadius: Spacing.radiusRound,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  headerIconText: {
    fontSize: Spacing.iconEnormous,
  },
  headerTitle: {
    ...Typography.display,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Action Steps Card
  actionStepsCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    ...Shadows.card,
  },
  actionStepsTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    fontWeight: '700',
  },
  actionStepsList: {
    gap: Spacing.lg,
  },
  actionStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.lg,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  urgentActionStep: {
    backgroundColor: Colors.errorLight,
    borderColor: Colors.error,
    borderWidth: 2,
  },
  actionStepIcon: {
    fontSize: Spacing.iconLarge,
    marginRight: Spacing.lg,
    marginTop: Spacing.xs,
  },
  actionStepText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 28,
  },
  urgentActionStepText: {
    color: Colors.error,
    fontWeight: '600',
  },

  // Details Card
  detailsCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.cardBackground,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    ...Shadows.card,
  },
  detailsTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  detailsText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.xl,
    lineHeight: 28,
  },
  scamTypeCard: {
    backgroundColor: Colors.warningLight,
    padding: Spacing.lg,
    borderRadius: Spacing.radiusLarge,
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.warning,
  },
  scamTypeLabel: {
    ...Typography.callout,
    fontWeight: '700',
    color: Colors.warningDark,
    marginBottom: Spacing.sm,
  },
  scamTypeText: {
    ...Typography.bodyLarge,
    color: Colors.warningDark,
    fontWeight: '600',
  },

  // Resources Card
  resourcesCard: {
    marginHorizontal: Spacing.screenHorizontal,
    backgroundColor: Colors.infoLight,
    borderRadius: Spacing.radiusXLarge,
    padding: Spacing.cardPaddingLarge,
    borderWidth: 2,
    borderColor: Colors.info,
  },
  resourcesTitle: {
    ...Typography.subtitle,
    color: Colors.info,
    marginBottom: Spacing.lg,
    fontWeight: '700',
  },
  resourcesText: {
    ...Typography.body,
    color: Colors.info,
    marginBottom: Spacing.lg,
    lineHeight: 28,
  },
  resourceList: {
    gap: Spacing.md,
  },
  resourceItem: {
    ...Typography.body,
    color: Colors.info,
    fontWeight: '500',
  },
});

export default ResultScreen;