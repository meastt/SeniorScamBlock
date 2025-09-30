import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SeniorButton } from '../components/SeniorButton';
import { BackButton } from '../components/BackButton';
import { useApp } from '../context/AppContext';
import { Colors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing } from '../theme/spacing';

/**
 * Upgrade Screen - Premium subscription details
 * Clear pricing and benefits for seniors
 */
const UpgradeScreen = () => {
  const navigation = useNavigation();
  const { upgradeToPremium } = useApp();

  const handleUpgrade = () => {
    // In production, this would integrate with app store payments
    Alert.alert(
      'Confirm Upgrade',
      'Upgrade to Premium for $8.99/month?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: async () => {
            await upgradeToPremium();
            Alert.alert(
              'Success!',
              'You are now a Premium member.',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.goBack(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Premium Plan</Text>

        <View style={styles.priceCard}>
          <Text style={styles.priceAmount}>$8.99</Text>
          <Text style={styles.pricePeriod}>per month</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Premium Features:</Text>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureText}>Unlimited message checks</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureText}>Auto-monitor incoming messages</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureText}>Family dashboard for your children</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureText}>Detailed scam explanations</Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureText}>Weekly scam alerts</Text>
          </View>
        </View>

        <View style={styles.comparisonCard}>
          <Text style={styles.comparisonTitle}>Free Plan:</Text>
          <Text style={styles.comparisonText}>
            ⚠️ Only 10 checks per month{'\n'}
            ⚠️ No auto-monitoring{'\n'}
            ⚠️ No family dashboard
          </Text>
        </View>

        <SeniorButton
          title="Subscribe to Premium"
          onPress={handleUpgrade}
          variant="primary"
          fullWidth
        />

        <Text style={styles.disclaimer}>
          Cancel anytime. No commitment required.
        </Text>
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
  priceCard: {
    backgroundColor: Colors.primaryButton,
    padding: Spacing.xl,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.black,
  },
  priceAmount: {
    fontSize: 64,
    fontWeight: '700',
    color: Colors.white,
  },
  pricePeriod: {
    ...Typography.body,
    color: Colors.white,
  },
  featuresContainer: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.lg,
    borderWidth: 2,
    borderColor: Colors.black,
  },
  featuresTitle: {
    ...Typography.subheadline,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  featureIcon: {
    fontSize: Spacing.iconSmall,
    marginRight: Spacing.sm,
  },
  featureText: {
    ...Typography.body,
    color: Colors.textPrimary,
    flex: 1,
  },
  comparisonCard: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: 8,
    marginBottom: Spacing.xl,
    borderWidth: 2,
    borderColor: Colors.warningYellow,
  },
  comparisonTitle: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  comparisonText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  disclaimer: {
    ...Typography.tab,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default UpgradeScreen;