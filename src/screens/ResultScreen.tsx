import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { ResultCard } from '../components/ResultCard';
import { BackButton } from '../components/BackButton';
import { SeniorButton } from '../components/SeniorButton';
import { ScamAnalysisResult } from '../types';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

type ResultScreenRouteProp = RouteProp<{ params: { result: ScamAnalysisResult } }, 'params'>;

/**
 * Result Screen - Shows RED/YELLOW/GREEN result
 * One sentence explanation + optional "Tell Me More" button
 */
const ResultScreen = () => {
  const route = useRoute<ResultScreenRouteProp>();
  const { result } = route.params;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Result</Text>

        <ResultCard
          riskLevel={result.riskLevel}
          explanation={result.explanation}
        />

        {!showDetails && result.detailedExplanation && (
          <SeniorButton
            title="Tell Me More"
            onPress={() => setShowDetails(true)}
            variant="secondary"
            fullWidth
          />
        )}

        {showDetails && result.detailedExplanation && (
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>More Details</Text>
            <Text style={styles.detailsText}>{result.detailedExplanation}</Text>
            
            {result.scamType && (
              <View style={styles.scamTypeContainer}>
                <Text style={styles.scamTypeLabel}>Scam Type:</Text>
                <Text style={styles.scamTypeText}>{result.scamType}</Text>
              </View>
            )}

            <View style={styles.tipsContainer}>
              <Text style={styles.tipsTitle}>What To Do:</Text>
              {result.riskLevel === 'RED' && (
                <>
                  <Text style={styles.tipText}>❌ Do NOT respond</Text>
                  <Text style={styles.tipText}>❌ Do NOT send money</Text>
                  <Text style={styles.tipText}>❌ Do NOT click any links</Text>
                  <Text style={styles.tipText}>✅ Delete the message</Text>
                  <Text style={styles.tipText}>✅ Tell a family member</Text>
                </>
              )}
              {result.riskLevel === 'YELLOW' && (
                <>
                  <Text style={styles.tipText}>⚠️ Verify sender first</Text>
                  <Text style={styles.tipText}>⚠️ Call them on known number</Text>
                  <Text style={styles.tipText}>⚠️ Do NOT click links</Text>
                  <Text style={styles.tipText}>✅ Ask family for advice</Text>
                </>
              )}
              {result.riskLevel === 'GREEN' && (
                <>
                  <Text style={styles.tipText}>✅ Appears safe</Text>
                  <Text style={styles.tipText}>✅ Still verify sender</Text>
                  <Text style={styles.tipText}>⚠️ Never share passwords</Text>
                </>
              )}
            </View>
          </View>
        )}
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
    padding: Spacing.screenPadding,
  },
  title: {
    ...Typography.headline,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    marginTop: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  detailsTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  detailsText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  scamTypeContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.lightBorder,
  },
  scamTypeLabel: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  scamTypeText: {
    ...Typography.body,
    color: Colors.dangerRed,
  },
  tipsContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  tipsTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  tipText: {
    ...Typography.body,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
});

export default ResultScreen;