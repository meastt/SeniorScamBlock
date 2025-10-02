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
      case 'RED': return Colors.danger;
      case 'YELLOW': return Colors.warning;
      case 'GREEN': return Colors.success;
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
              <View style={styles.detailsButtonContainer}>
                <SeniorButton
                  title="📋 See Detailed Analysis"
                  onPress={() => setShowDetails(true)}
                  variant="secondary"
                  fullWidth
                />
              </View>
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
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: Spacing.radiusLarge,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  headerIconText: {
    fontSize: Spacing.iconHuge,
  },
  headerTitle: {
    ...Typography.largeTitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
    fontWeight: '700',
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  // Action Steps Card
  actionStepsCard: {
    marginHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  actionStepsTitle: {
    ...Typography.title,
    color: Colors.textPrimary,
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
    backgroundColor: Colors.white,
    borderRadius: Spacing.radiusMedium,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  urgentActionStep: {
    backgroundColor: Colors.dangerLight,
    borderColor: Colors.danger,
  },
  actionStepIcon: {
    fontSize: Spacing.iconMedium,
    marginRight: Spacing.sm,
  },
  actionStepText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  urgentActionStepText: {
    color: Colors.danger,
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
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.card,
  },
  detailsTitle: {
    ...Typography.subtitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  detailsText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  scamTypeCard: {
    backgroundColor: Colors.warningLight,
    padding: Spacing.md,
    borderRadius: Spacing.radiusMedium,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  scamTypeLabel: {
    ...Typography.callout,
    fontWeight: '700',
    color: Colors.warningDark,
    marginBottom: Spacing.xs,
  },
  scamTypeText: {
    ...Typography.body,
    color: Colors.warningDark,
    fontWeight: '600',
  },

  // Resources Card
  resourcesCard: {
    marginHorizontal: Spacing.screenHorizontal,
    backgroundColor: Colors.infoLight,
    borderRadius: Spacing.radiusLarge,
    padding: Spacing.cardPadding,
    borderWidth: 1,
    borderColor: Colors.info,
  },
  resourcesTitle: {
    ...Typography.subtitle,
    color: Colors.infoDark,
    marginBottom: Spacing.md,
    fontWeight: '700',
  },
  resourcesText: {
    ...Typography.body,
    color: Colors.infoDark,
    marginBottom: Spacing.md,
  },
  resourceList: {
    gap: Spacing.sm,
  },
  resourceItem: {
    ...Typography.body,
    color: Colors.infoDark,
    fontWeight: '500',
  },
});

export default ResultScreen;